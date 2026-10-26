import { ScannedQrDetails } from "@/types/qr";
import { isEmvCoPayload, parseEmvCoQr } from "./emv-parser";

/**
 * Universal QR code decoder & parser for Nepal Merchant QRs
 */
export function parseQrPayload(rawPayload: string): ScannedQrDetails {
  const trimmed = rawPayload.trim();

  // 1. EMVCo Standard Merchant QR (NepalPay, Fonepay, SmartQR, etc.)
  if (isEmvCoPayload(trimmed)) {
    return parseEmvCoQr(trimmed);
  }

  // 2. JSON-formatted QR
  if (
    (trimmed.startsWith("{") && trimmed.endsWith("}")) ||
    (trimmed.startsWith("[") && trimmed.endsWith("]"))
  ) {
    try {
      const parsed = JSON.parse(trimmed);
      if (typeof parsed === "object" && parsed !== null) {
        const merchantName =
          parsed.merchantName ||
          parsed.merchant_name ||
          parsed.name ||
          parsed.businessName;
        const merchantIdentifier =
          parsed.merchantId ||
          parsed.merchant_id ||
          parsed.accountNumber ||
          parsed.accountId ||
          parsed.id;
        const rawAmount = parsed.amount || parsed.encodedAmount || parsed.total;
        const encodedAmount =
          typeof rawAmount === "number"
            ? rawAmount
            : typeof rawAmount === "string" && !isNaN(parseFloat(rawAmount))
            ? parseFloat(rawAmount)
            : undefined;
        const paymentNetwork =
          parsed.network ||
          parsed.paymentNetwork ||
          parsed.provider ||
          "Digital Payment";
        const currency =
          parsed.currency === "NPR" || parsed.currency === "524"
            ? "NPR (Nepalese Rupee)"
            : parsed.currency || "NPR (Nepalese Rupee)";

        return {
          rawPayload: trimmed,
          format: "JSON Structured QR",
          merchantName: merchantName ? String(merchantName) : undefined,
          merchantIdentifier: merchantIdentifier
            ? String(merchantIdentifier)
            : undefined,
          bankIdentifier: parsed.bank ? String(parsed.bank) : undefined,
          paymentNetwork: String(paymentNetwork),
          encodedAmount,
          currency,
          reference: parsed.reference || parsed.invoiceNo || parsed.billNumber,
          qrType: encodedAmount ? "dynamic" : "static",
          extraFields: Object.fromEntries(
            Object.entries(parsed).map(([k, v]) => [k, String(v)])
          ),
          isRecognizedFormat: true,
        };
      }
    } catch {
      // not valid JSON, proceed to other checks
    }
  }

  // 3. URL-based QR codes (eSewa, Khalti, connectIPS, Fonepay, etc.)
  if (
    trimmed.startsWith("http://") ||
    trimmed.startsWith("https://") ||
    trimmed.includes("://")
  ) {
    try {
      const url = new URL(trimmed);
      const params = url.searchParams;

      let format: ScannedQrDetails["format"] = "Standard URL";
      let network = "Web Link";
      let merchantName: string | undefined;
      let merchantId: string | undefined;

      const hostname = url.hostname.toLowerCase();
      const protocol = url.protocol.toLowerCase();

      if (hostname.includes("esewa") || protocol.includes("esewa")) {
        format = "eSewa Payment Link";
        network = "eSewa";
        merchantName =
          params.get("merchant_name") ||
          params.get("name") ||
          params.get("merchant") ||
          undefined;
        merchantId =
          params.get("merchant_id") ||
          params.get("scd") ||
          params.get("su") ||
          params.get("id") ||
          undefined;
      } else if (hostname.includes("khalti") || protocol.includes("khalti")) {
        format = "Khalti Payment Link";
        network = "Khalti";
        merchantName =
          params.get("merchant_name") ||
          params.get("name") ||
          params.get("merchant") ||
          undefined;
        merchantId =
          params.get("merchant_code") ||
          params.get("public_key") ||
          params.get("id") ||
          undefined;
      } else if (
        hostname.includes("connectips") ||
        protocol.includes("connectips")
      ) {
        format = "connectIPS Link";
        network = "connectIPS";
        merchantName = params.get("merchant_name") || undefined;
        merchantId = params.get("merchant_id") || undefined;
      } else if (hostname.includes("fonepay")) {
        format = "EMVCo (Fonepay)";
        network = "Fonepay";
        merchantName = params.get("merchant_name") || undefined;
        merchantId = params.get("merchant_id") || undefined;
      }

      // Check amount query param
      const amtStr =
        params.get("amount") ||
        params.get("amt") ||
        params.get("total") ||
        params.get("txAmt");
      const encodedAmount =
        amtStr && !isNaN(parseFloat(amtStr)) ? parseFloat(amtStr) : undefined;

      // Extract general query params as extraFields
      const extraFields: Record<string, string> = {};
      params.forEach((v, k) => {
        extraFields[k] = v;
      });

      return {
        rawPayload: trimmed,
        format,
        merchantName,
        merchantIdentifier: merchantId,
        paymentNetwork: network,
        encodedAmount,
        currency: "NPR (Nepalese Rupee)",
        reference:
          params.get("pid") ||
          params.get("invoice_no") ||
          params.get("ref") ||
          undefined,
        qrType: encodedAmount ? "dynamic" : "static",
        extraFields:
          Object.keys(extraFields).length > 0 ? extraFields : undefined,
        isRecognizedFormat: true,
      };
    } catch {
      // not a valid standard URL
    }
  }

  // 4. Fallback for plain text or unknown format
  return {
    rawPayload: trimmed,
    format: "Plain Text / Custom",
    paymentNetwork: "Unidentified Network",
    currency: "NPR",
    qrType: "unknown",
    warnings: [
      "This QR code does not match a recognized Nepali EMVCo or wallet schema.",
      "Raw payload is preserved below so you can inspect technical details or continue with manual entry.",
    ],
    isRecognizedFormat: false,
  };
}

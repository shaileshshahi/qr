import { ParsedTag, ScannedQrDetails } from "@/types/qr";
import { getMccDescription, getCurrencyLabel } from "./mcc-codes";

interface RawTLV {
  tag: string;
  length: number;
  value: string;
}

const TAG_NAMES: Record<string, string> = {
  "00": "Payload Format Indicator",
  "01": "Point of Initiation Method",
  "52": "Merchant Category Code (MCC)",
  "53": "Transaction Currency",
  "54": "Transaction Amount",
  "55": "Tip or Convenience Indicator",
  "56": "Value of Convenience Fee Fixed",
  "57": "Value of Convenience Fee Percentage",
  "58": "Country Code",
  "59": "Merchant Name",
  "60": "Merchant City",
  "61": "Postal Code",
  "62": "Additional Data Field Template",
  "63": "CRC (Cyclic Redundancy Check)",
};

const SUBTAG_62_NAMES: Record<string, string> = {
  "01": "Bill / Invoice Number",
  "02": "Mobile Number",
  "03": "Store Label",
  "04": "Loyalty Number",
  "05": "Reference Label",
  "06": "Customer Label",
  "07": "Terminal Label",
  "08": "Purpose of Transaction",
  "09": "Additional Consumer Request",
};

const SUBTAG_MERCHANT_NAMES: Record<string, string> = {
  "00": "Globally Unique Identifier (GUID / AID)",
  "01": "Merchant Account / PAN / ID",
  "02": "Bank / Participant Code",
  "03": "Terminal / Store Identifier",
  "04": "Service URL / Additional Info",
};

/**
 * Parses raw EMVCo TLV string into a list of RawTLV
 */
function parseTLV(data: string): RawTLV[] {
  const result: RawTLV[] = [];
  let index = 0;

  while (index < data.length) {
    if (index + 4 > data.length) break;
    const tag = data.substring(index, index + 2);
    const lengthStr = data.substring(index + 2, index + 4);
    const length = parseInt(lengthStr, 10);

    if (isNaN(length) || length < 0) {
      break;
    }

    const valueStart = index + 4;
    const valueEnd = valueStart + length;

    if (valueEnd > data.length) {
      break;
    }

    const value = data.substring(valueStart, valueEnd);
    result.push({ tag, length, value });
    index = valueEnd;
  }

  return result;
}

/**
 * Parses sub-tags within a TLV container (e.g. tag 62 or merchant account templates)
 */
function parseSubTags(
  value: string,
  nameMap: Record<string, string>
): Array<{ tag: string; name: string; length: number; value: string }> {
  const rawSubs = parseTLV(value);
  return rawSubs.map((sub) => ({
    tag: sub.tag,
    name: nameMap[sub.tag] || `Sub-tag ${sub.tag}`,
    length: sub.length,
    value: sub.value,
  }));
}

/**
 * Checks if a string looks like an EMVCo QR code
 * (Must start with 000201 or have 00 followed by valid TLV length and value)
 */
export function isEmvCoPayload(payload: string): boolean {
  if (!payload || payload.length < 10) return false;
  return payload.startsWith("000201") || payload.startsWith("0002");
}

/**
 * Parses an EMVCo payload into structured ScannedQrDetails
 */
export function parseEmvCoQr(payload: string): ScannedQrDetails {
  const tlvs = parseTLV(payload);
  const parsedTags: ParsedTag[] = [];

  let format: ScannedQrDetails["format"] = "EMVCo (Merchant QR)";
  let qrType: "static" | "dynamic" | "unknown" = "unknown";
  let merchantName: string | undefined;
  let merchantIdentifier: string | undefined;
  let bankIdentifier: string | undefined;
  let paymentNetwork: string | undefined;
  let encodedAmount: number | undefined;
  let currency: string | undefined;
  let merchantCategory: string | undefined;
  let merchantCity: string | undefined;
  let reference: string | undefined;
  let billNumber: string | undefined;
  let storeLabel: string | undefined;
  let terminalLabel: string | undefined;
  const extraFields: Record<string, string> = {};
  const warnings: string[] = [];

  for (const tlv of tlvs) {
    const tagName = TAG_NAMES[tlv.tag] || `Tag ${tlv.tag}`;

    // Tag 01: Initiation method
    if (tlv.tag === "01") {
      if (tlv.value === "11") {
        qrType = "static";
      } else if (tlv.value === "12") {
        qrType = "dynamic";
      }
    }

    // Tag 52: MCC
    if (tlv.tag === "52") {
      merchantCategory = getMccDescription(tlv.value);
    }

    // Tag 53: Currency
    if (tlv.tag === "53") {
      currency = getCurrencyLabel(tlv.value);
    }

    // Tag 54: Amount
    if (tlv.tag === "54") {
      const parsedAmount = parseFloat(tlv.value);
      if (!isNaN(parsedAmount) && parsedAmount > 0) {
        encodedAmount = parsedAmount;
      }
    }

    // Tag 58: Country
    if (tlv.tag === "58") {
      extraFields["Country Code"] = tlv.value === "NP" ? "Nepal (NP)" : tlv.value;
    }

    // Tag 59: Merchant Name
    if (tlv.tag === "59") {
      merchantName = tlv.value.trim();
    }

    // Tag 60: Merchant City
    if (tlv.tag === "60") {
      merchantCity = tlv.value.trim();
    }

    // Tag 61: Postal Code
    if (tlv.tag === "61") {
      extraFields["Postal Code"] = tlv.value;
    }

    // Tags 26-51: Merchant Account Information
    const tagNum = parseInt(tlv.tag, 10);
    let subTags: Array<{ tag: string; name: string; length: number; value: string }> | undefined;

    if (tagNum >= 26 && tagNum <= 51) {
      // Try parsing sub-tags
      const subs = parseSubTags(tlv.value, SUBTAG_MERCHANT_NAMES);
      if (subs.length > 0) {
        subTags = subs;
        for (const sub of subs) {
          if (sub.tag === "00") {
            const guid = sub.value.toLowerCase();
            if (guid.includes("fonepay")) {
              paymentNetwork = "Fonepay";
              format = "EMVCo (Fonepay)";
            } else if (guid.includes("nepalpay") || guid.includes("nchl")) {
              paymentNetwork = "NEPALPAY QR";
              format = "EMVCo (NEPALPAY QR)";
            } else if (guid.includes("smartqr")) {
              paymentNetwork = "Smart QR";
            } else if (guid.includes("esewa")) {
              paymentNetwork = "eSewa";
            } else if (guid.includes("khalti")) {
              paymentNetwork = "Khalti";
            }
          }
          if (sub.tag === "01") {
            merchantIdentifier = sub.value;
          }
          if (sub.tag === "02") {
            bankIdentifier = sub.value;
          }
        }
      } else {
        // Flat value in merchant tag
        if (!merchantIdentifier) {
          merchantIdentifier = tlv.value;
        }
      }
    }

    // Tag 62: Additional Data Template
    if (tlv.tag === "62") {
      const subs = parseSubTags(tlv.value, SUBTAG_62_NAMES);
      if (subs.length > 0) {
        subTags = subs;
        for (const sub of subs) {
          if (sub.tag === "01") billNumber = sub.value;
          if (sub.tag === "03") storeLabel = sub.value;
          if (sub.tag === "05") reference = sub.value;
          if (sub.tag === "07") terminalLabel = sub.value;
        }
      }
    }

    // Tag 63: CRC
    if (tlv.tag === "63") {
      extraFields["CRC Checksum"] = tlv.value;
    }

    parsedTags.push({
      tag: tlv.tag,
      name: tagName,
      length: tlv.length,
      value: tlv.value,
      subTags,
    });
  }

  // Fallbacks & heuristics
  if (!paymentNetwork) {
    if (payload.toLowerCase().includes("fonepay")) {
      paymentNetwork = "Fonepay";
      format = "EMVCo (Fonepay)";
    } else if (payload.toLowerCase().includes("nepalpay")) {
      paymentNetwork = "NEPALPAY QR";
      format = "EMVCo (NEPALPAY QR)";
    } else {
      paymentNetwork = "EMVCo Standard QR";
    }
  }

  if (encodedAmount && qrType === "unknown") {
    qrType = "dynamic";
  }

  return {
    rawPayload: payload,
    format,
    merchantName: merchantName || undefined,
    merchantIdentifier: merchantIdentifier || undefined,
    bankIdentifier: bankIdentifier || undefined,
    paymentNetwork,
    encodedAmount,
    currency: currency || "NPR (Nepalese Rupee)",
    merchantCategory,
    merchantCity,
    reference: reference || billNumber || undefined,
    billNumber,
    storeLabel,
    terminalLabel,
    qrType,
    parsedTags,
    extraFields,
    warnings: warnings.length > 0 ? warnings : undefined,
    isRecognizedFormat: true,
  };
}

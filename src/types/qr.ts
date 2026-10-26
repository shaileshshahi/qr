export type QrFormatType =
  | "EMVCo (NEPALPAY QR)"
  | "EMVCo (Fonepay)"
  | "EMVCo (Merchant QR)"
  | "eSewa Payment Link"
  | "Khalti Payment Link"
  | "connectIPS Link"
  | "JSON Structured QR"
  | "Standard URL"
  | "Plain Text / Custom";

export interface ParsedTag {
  tag: string;
  name: string;
  length: number;
  value: string;
  subTags?: Array<{
    tag: string;
    name: string;
    length: number;
    value: string;
  }>;
}

export interface ScannedQrDetails {
  rawPayload: string;
  format: QrFormatType;
  merchantName?: string;
  merchantIdentifier?: string;
  bankIdentifier?: string;
  walletIdentifier?: string;
  paymentNetwork?: string;
  encodedAmount?: number;
  currency?: string;
  merchantCategory?: string;
  merchantCity?: string;
  reference?: string;
  billNumber?: string;
  storeLabel?: string;
  terminalLabel?: string;
  qrType?: "static" | "dynamic" | "unknown";
  parsedTags?: ParsedTag[];
  extraFields?: Record<string, string>;
  warnings?: string[];
  isRecognizedFormat: boolean;
}

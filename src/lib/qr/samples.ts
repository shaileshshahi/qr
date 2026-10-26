export interface SampleQrItem {
  id: string;
  title: string;
  subtitle: string;
  tag: string;
  tagColor: string;
  payload: string;
  description: string;
  expectedAmount?: number;
}

export const SAMPLE_QR_LIST: SampleQrItem[] = [
  {
    id: "fonepay-static",
    title: "Bhatbhateni Supermarket",
    subtitle: "Fonepay Merchant (Static QR • No Amount)",
    tag: "Fonepay",
    tagColor: "bg-red-500/10 text-red-600 border-red-500/20",
    description: "Standard static EMVCo QR code without an encoded amount. Simulates grocery checkout where the user inputs the total.",
    payload:
      "00020101021126460019com.fonepay.merchant011098012345670205FP0015204541153035245802NP5923Bhatbhateni Supermarket6009Kathmandu62140310Naxal-0016304C2E9",
  },
  {
    id: "nepalpay-dynamic",
    title: "Himalayan Java Coffee",
    subtitle: "NEPALPAY QR (Dynamic • NPR 385.00 Pre-filled)",
    tag: "NEPALPAY",
    tagColor: "bg-sky-500/10 text-sky-600 border-sky-500/20",
    description: "EMVCo dynamic QR code with a pre-encoded bill of NPR 385.00 and Invoice #INV-8492.",
    expectedAmount: 385,
    payload:
      "00020101021226510019np.com.nchl.nepalpay0112NPAY987654320208GBIME0015204581253035245406385.005802NP5921Himalayan Java Coffee6008Lalitpur62220108INV-84920706POS-036304F18A",
  },
  {
    id: "esewa-link",
    title: "Mero Pasala Bakery",
    subtitle: "eSewa Pay Link (NPR 650.00 Pre-filled)",
    tag: "eSewa",
    tagColor: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20",
    description: "URL-based merchant payment link with merchant name, identifier, and encoded amount.",
    expectedAmount: 650,
    payload:
      "https://esewa.com.np/payment?merchant_id=9841002233&merchant_name=Mero+Pasala+Bakery&amount=650.00&ref=ORD-5541",
  },
  {
    id: "khalti-link",
    title: "Kathmandu Book House",
    subtitle: "Khalti Merchant QR (NPR 1,200.00)",
    tag: "Khalti",
    tagColor: "bg-purple-500/10 text-purple-600 border-purple-500/20",
    description: "Khalti merchant link containing store code and pre-filled invoice amount.",
    expectedAmount: 1200,
    payload:
      "https://khalti.com/pay/?merchant_code=KHLT-KTM-4412&name=Kathmandu+Book+House&amount=1200.00",
  },
  {
    id: "id-only",
    title: "Account Identifier Only",
    subtitle: "EMVCo Merchant QR (No Merchant Name)",
    tag: "EMVCo",
    tagColor: "bg-amber-500/10 text-amber-600 border-amber-500/20",
    description: "Valid EMVCo QR containing account identifier ACC998822110044 but no merchant name tag (tests fallback display).",
    payload:
      "00020101021126300010com.nepalqr0116ACC9988221100445204599953035245802NP6009Pokhara630488AB",
  },
  {
    id: "unsupported-raw",
    title: "Non-standard QR Payload",
    subtitle: "Plain Text String (Fallback Test)",
    tag: "Fallback",
    tagColor: "bg-slate-500/10 text-slate-600 border-slate-500/20",
    description: "Non-EMVCo plain text payload to demonstrate raw technical display and manual payment input flow.",
    payload:
      "DEMO-STANDALONE-STORE-STATIONERY-THAMEL-01-CODE9941",
  },
];

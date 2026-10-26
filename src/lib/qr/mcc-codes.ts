export const MCC_DIRECTORY: Record<string, string> = {
  "5411": "Grocery Stores, Supermarkets",
  "5812": "Restaurants & Dining",
  "5814": "Fast Food Restaurants",
  "5462": "Bakeries & Cafes",
  "5912": "Drug Stores & Pharmacies",
  "5942": "Book Stores",
  "5651": "Family Clothing Stores",
  "5311": "Department Stores",
  "4121": "Taxicabs & Limousines",
  "4900": "Electric, Gas, Water Utilities",
  "8220": "Colleges, Universities & Schools",
  "8062": "Hospitals & Healthcare",
  "7011": "Hotels, Motels & Resorts",
  "6012": "Financial Institutions & Wallets",
  "5732": "Electronics Stores",
  "5999": "Miscellaneous & Specialty Retail",
  "7999": "Recreation & Entertainment",
  "5541": "Service Stations & Fuel",
};

export function getMccDescription(code?: string): string | undefined {
  if (!code) return undefined;
  const desc = MCC_DIRECTORY[code];
  return desc ? `${desc} (${code})` : `Merchant Category Code: ${code}`;
}

export const CURRENCY_MAP: Record<string, string> = {
  "524": "NPR (Nepalese Rupee)",
  "840": "USD (US Dollar)",
  "356": "INR (Indian Rupee)",
  "978": "EUR (Euro)",
  "826": "GBP (British Pound)",
};

export function getCurrencyLabel(currencyCode?: string): string {
  if (!currencyCode) return "Unknown";
  if (CURRENCY_MAP[currencyCode]) return CURRENCY_MAP[currencyCode];
  if (currencyCode.toUpperCase() === "NPR") return "NPR (Nepalese Rupee)";
  return currencyCode;
}

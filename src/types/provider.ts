export type ProviderCategory = "all" | "wallets" | "qr-networks" | "banks";

export type ProviderLayoutVariant =
  | "esewa"
  | "khalti"
  | "fonepay"
  | "global-ime"
  | "nepalpay"
  | "generic-bank"
  | "generic-wallet";

export interface Provider {
  id: string;
  name: string;
  category: "wallets" | "qr-networks" | "banks";
  code: string;
  primaryColor: string;
  secondaryColor: string;
  badgeBg: string;
  badgeText: string;
  tagline: string;
  layoutVariant: ProviderLayoutVariant;
  accountLabel?: string;
  features?: string[];
  isPopular?: boolean;
}

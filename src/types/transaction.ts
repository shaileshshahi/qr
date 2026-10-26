import { ScannedQrDetails } from "./qr";

export type SimulationOutcome = "success" | "failed" | "cancelled";

export type PaymentPurpose =
  | "food"
  | "shopping"
  | "groceries"
  | "transport"
  | "utilities"
  | "education"
  | "healthcare"
  | "rent"
  | "personal"
  | "family"
  | "bill-sharing"
  | "loan"
  | "office"
  | "other";

export interface PurposeOption {
  value: PaymentPurpose;
  label: string;
  iconName: string;
}

export const PAYMENT_PURPOSES: PurposeOption[] = [
  { value: "food", label: "Food & Dining", iconName: "Utensils" },
  { value: "shopping", label: "Shopping", iconName: "ShoppingBag" },
  { value: "groceries", label: "Groceries", iconName: "ShoppingCart" },
  { value: "transport", label: "Transport", iconName: "Bus" },
  { value: "utilities", label: "Utility Bills", iconName: "Zap" },
  { value: "education", label: "Education", iconName: "GraduationCap" },
  { value: "healthcare", label: "Healthcare", iconName: "HeartPulse" },
  { value: "rent", label: "Rent", iconName: "Home" },
  { value: "personal", label: "Personal Transfer", iconName: "User" },
  { value: "family", label: "Family Expense", iconName: "Users" },
  { value: "bill-sharing", label: "Bill Sharing", iconName: "Split" },
  { value: "loan", label: "Loan Repayment", iconName: "CreditCard" },
  { value: "office", label: "Office Expense", iconName: "Briefcase" },
  { value: "other", label: "Other", iconName: "MoreHorizontal" },
];

export interface PaymentFormData {
  amount: number | null;
  encodedAmountPrefilled: boolean;
  purpose: PaymentPurpose;
  customPurpose: string;
  remarks: string;
}

export interface SimulationTransaction {
  id: string;
  simulationRef: string;
  qrDetails: ScannedQrDetails;
  providerId: string;
  providerName: string;
  amount: number;
  currency: "NPR";
  purpose: PaymentPurpose;
  purposeLabel: string;
  customPurpose?: string;
  remarks?: string;
  createdAt: string;
  outcome: SimulationOutcome;
  failureReason?: string;
  isSimulation: true;
}

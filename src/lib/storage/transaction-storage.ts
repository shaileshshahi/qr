import { SimulationTransaction } from "@/types/transaction";

const STORAGE_KEY = "qr_demo_nepal_transactions_v1";

export function getStoredTransactions(): SimulationTransaction[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) {
      return parsed;
    }
    return [];
  } catch (err) {
    console.error("Failed to load transactions from localStorage", err);
    return [];
  }
}

export function saveStoredTransaction(
  tx: SimulationTransaction
): SimulationTransaction[] {
  if (typeof window === "undefined") return [];
  try {
    const current = getStoredTransactions();
    // Prepend new transaction
    const updated = [tx, ...current.filter((item) => item.id !== tx.id)];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return updated;
  } catch (err) {
    console.error("Failed to save transaction to localStorage", err);
    return [];
  }
}

export function deleteStoredTransaction(id: string): SimulationTransaction[] {
  if (typeof window === "undefined") return [];
  try {
    const current = getStoredTransactions();
    const updated = current.filter((item) => item.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return updated;
  } catch (err) {
    console.error("Failed to delete transaction from localStorage", err);
    return [];
  }
}

export function clearAllStoredTransactions(): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (err) {
    console.error("Failed to clear transactions", err);
  }
}

export function generateSimulationReference(): string {
  const year = 2026;
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let randomCode = "";
  for (let i = 0; i < 6; i++) {
    randomCode += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return `SIM-NP-${year}-${randomCode}`;
}

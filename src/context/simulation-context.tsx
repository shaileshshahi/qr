"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
} from "react";
import { ScannedQrDetails } from "@/types/qr";
import { Provider } from "@/types/provider";
import {
  PaymentFormData,
  PaymentPurpose,
  SimulationOutcome,
  SimulationTransaction,
  PAYMENT_PURPOSES,
} from "@/types/transaction";
import {
  getStoredTransactions,
  saveStoredTransaction,
  deleteStoredTransaction,
  clearAllStoredTransactions,
  generateSimulationReference,
} from "@/lib/storage/transaction-storage";
import {
  AppSettings,
  DEFAULT_SETTINGS,
  getStoredSettings,
  saveStoredSettings,
} from "@/lib/storage/settings-storage";
import { PROVIDERS_REGISTRY, getProviderById } from "@/lib/providers/registry";

interface SimulationContextType {
  scannedQr: ScannedQrDetails | null;
  paymentForm: PaymentFormData;
  selectedProvider: Provider;
  currentTransaction: SimulationTransaction | null;
  transactions: SimulationTransaction[];
  settings: AppSettings;
  setScannedQr: (qr: ScannedQrDetails) => void;
  updatePaymentForm: (updates: Partial<PaymentFormData>) => void;
  setSelectedProvider: (provider: Provider) => void;
  executeSimulation: (
    outcome: SimulationOutcome,
    customFailureReason?: string
  ) => SimulationTransaction;
  resetCurrentSimulation: () => void;
  deleteTransaction: (id: string) => void;
  clearHistory: () => void;
  updateSettings: (updates: Partial<AppSettings>) => void;
}

const DEFAULT_PAYMENT_FORM: PaymentFormData = {
  amount: null,
  encodedAmountPrefilled: false,
  purpose: "food",
  customPurpose: "",
  remarks: "",
};

const SimulationContext = createContext<SimulationContextType | undefined>(
  undefined
);

const DRAFT_STORAGE_KEY = "qr_demo_nepal_draft_v1";

export function SimulationProvider({ children }: { children: ReactNode }) {
  const [scannedQr, setScannedQrState] = useState<ScannedQrDetails | null>(null);
  const [paymentForm, setPaymentForm] = useState<PaymentFormData>(
    DEFAULT_PAYMENT_FORM
  );
  const [settings, setSettingsState] = useState<AppSettings>(DEFAULT_SETTINGS);
  const [selectedProvider, setSelectedProviderState] = useState<Provider>(
    PROVIDERS_REGISTRY[0]
  );
  const [currentTransaction, setCurrentTransaction] =
    useState<SimulationTransaction | null>(null);
  const [transactions, setTransactions] = useState<SimulationTransaction[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);

  // Initialize from storage on mount
  useEffect(() => {
    const loadedSettings = getStoredSettings();
    setSettingsState(loadedSettings);

    const initialProvider =
      getProviderById(loadedSettings.defaultProviderId) ||
      PROVIDERS_REGISTRY[0];
    setSelectedProviderState(initialProvider);

    const loadedTx = getStoredTransactions();
    setTransactions(loadedTx);

    // Check draft in sessionStorage
    try {
      const draft = sessionStorage.getItem(DRAFT_STORAGE_KEY);
      if (draft) {
        const parsed = JSON.parse(draft);
        if (parsed.scannedQr) setScannedQrState(parsed.scannedQr);
        if (parsed.paymentForm) setPaymentForm(parsed.paymentForm);
        if (parsed.providerId) {
          const prov = getProviderById(parsed.providerId);
          if (prov) setSelectedProviderState(prov);
        }
        if (parsed.currentTransaction) {
          setCurrentTransaction(parsed.currentTransaction);
        }
      }
    } catch (err) {
      console.warn("Could not load draft session", err);
    }

    setIsInitialized(true);
  }, []);

  // Sync draft to sessionStorage
  useEffect(() => {
    if (!isInitialized) return;
    try {
      sessionStorage.setItem(
        DRAFT_STORAGE_KEY,
        JSON.stringify({
          scannedQr,
          paymentForm,
          providerId: selectedProvider.id,
          currentTransaction,
        })
      );
    } catch (err) {
      console.warn("Failed to save draft to sessionStorage", err);
    }
  }, [scannedQr, paymentForm, selectedProvider, currentTransaction, isInitialized]);

  // Set scanned QR and pre-fill form
  const setScannedQr = useCallback((qr: ScannedQrDetails) => {
    setScannedQrState(qr);
    if (qr.encodedAmount && qr.encodedAmount > 0) {
      setPaymentForm((prev) => ({
        ...prev,
        amount: qr.encodedAmount!,
        encodedAmountPrefilled: true,
      }));
    } else {
      setPaymentForm((prev) => ({
        ...prev,
        encodedAmountPrefilled: false,
      }));
    }
  }, []);

  const updatePaymentForm = useCallback(
    (updates: Partial<PaymentFormData>) => {
      setPaymentForm((prev) => ({ ...prev, ...updates }));
    },
    []
  );

  const setSelectedProvider = useCallback((provider: Provider) => {
    setSelectedProviderState(provider);
  }, []);

  const executeSimulation = useCallback(
    (
      outcome: SimulationOutcome,
      customFailureReason?: string
    ): SimulationTransaction => {
      const purposeItem = PAYMENT_PURPOSES.find(
        (p) => p.value === paymentForm.purpose
      );
      const purposeLabel =
        paymentForm.purpose === "other" && paymentForm.customPurpose.trim()
          ? paymentForm.customPurpose.trim()
          : purposeItem?.label || "General Payment";

      const defaultFailureReasons = [
        "Simulated demo error: Network connection timeout in sandbox mode.",
        "Simulated demo error: Merchant test terminal temporarily unavailable.",
        "Simulated demo error: Daily demo transaction ceiling reached.",
      ];
      const failureReason =
        outcome === "failed"
          ? customFailureReason ||
            defaultFailureReasons[
              Math.floor(Math.random() * defaultFailureReasons.length)
            ]
          : undefined;

      const tx: SimulationTransaction = {
        id: `tx_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
        simulationRef: generateSimulationReference(),
        qrDetails: scannedQr || {
          rawPayload: "SIMULATED_MANUAL_QR",
          format: "Plain Text / Custom",
          paymentNetwork: selectedProvider.name,
          isRecognizedFormat: true,
        },
        providerId: selectedProvider.id,
        providerName: selectedProvider.name,
        amount: paymentForm.amount || 0,
        currency: "NPR",
        purpose: paymentForm.purpose,
        purposeLabel,
        customPurpose: paymentForm.customPurpose.trim() || undefined,
        remarks: paymentForm.remarks.trim() || undefined,
        createdAt: new Date().toISOString(),
        outcome,
        failureReason,
        isSimulation: true,
      };

      const updatedList = saveStoredTransaction(tx);
      setTransactions(updatedList);
      setCurrentTransaction(tx);
      return tx;
    },
    [scannedQr, paymentForm, selectedProvider]
  );

  const resetCurrentSimulation = useCallback(() => {
    setScannedQrState(null);
    setPaymentForm(DEFAULT_PAYMENT_FORM);
    setCurrentTransaction(null);
    try {
      sessionStorage.removeItem(DRAFT_STORAGE_KEY);
    } catch {
      // ignore
    }
  }, []);

  const deleteTransaction = useCallback((id: string) => {
    const updated = deleteStoredTransaction(id);
    setTransactions(updated);
  }, []);

  const clearHistory = useCallback(() => {
    clearAllStoredTransactions();
    setTransactions([]);
  }, []);

  const updateSettings = useCallback((updates: Partial<AppSettings>) => {
    setSettingsState((prev) => {
      const updated = { ...prev, ...updates };
      saveStoredSettings(updated);
      return updated;
    });
  }, []);

  return (
    <SimulationContext.Provider
      value={{
        scannedQr,
        paymentForm,
        selectedProvider,
        currentTransaction,
        transactions,
        settings,
        setScannedQr,
        updatePaymentForm,
        setSelectedProvider,
        executeSimulation,
        resetCurrentSimulation,
        deleteTransaction,
        clearHistory,
        updateSettings,
      }}
    >
      {children}
    </SimulationContext.Provider>
  );
}

export function useSimulation() {
  const context = useContext(SimulationContext);
  if (!context) {
    throw new Error("useSimulation must be used within a SimulationProvider");
  }
  return context;
}

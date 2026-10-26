export interface AppSettings {
  defaultProviderId: string;
  defaultDemoAmount: number;
  theme: "light" | "dark" | "system";
  cameraFacingMode: "environment" | "user";
  hapticFeedback: boolean;
}

const SETTINGS_KEY = "qr_demo_nepal_settings_v1";

export const DEFAULT_SETTINGS: AppSettings = {
  defaultProviderId: "fonepay",
  defaultDemoAmount: 500,
  theme: "system",
  cameraFacingMode: "environment",
  hapticFeedback: true,
};

export function getStoredSettings(): AppSettings {
  if (typeof window === "undefined") return DEFAULT_SETTINGS;
  try {
    const raw = localStorage.getItem(SETTINGS_KEY);
    if (!raw) return DEFAULT_SETTINGS;
    return { ...DEFAULT_SETTINGS, ...JSON.parse(raw) };
  } catch (err) {
    console.error("Failed to load settings", err);
    return DEFAULT_SETTINGS;
  }
}

export function saveStoredSettings(settings: AppSettings): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
  } catch (err) {
    console.error("Failed to save settings", err);
  }
}

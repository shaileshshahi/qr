# QR Demo Nepal — Mobile-First QR Scanning & Payment UI Simulator

A mobile-first QR scanning and payment UI simulator designed for Nepal's digital payment ecosystem. It scans genuine merchant QR codes, decodes actual EMVCo payloads (Fonepay, NEPALPAY QR, Smart QR, eSewa, Khalti), and renders provider-inspired payment flows in a secure sandbox.

> [!IMPORTANT]
> **SIMULATION ONLY — NOT A REAL PAYMENT**  
> This application is strictly intended for UI/UX prototyping, software development, demonstrations, and sandbox testing. No real bank accounts, wallets, payment gateways, or real money transfers are involved.

---

## 🚀 Key Features

1. **EMVCo Merchant QR Parsing**:
   - Decodes standard EMVCo Tag-Length-Value (TLV) schemas (Tags 00 to 63).
   - Detects Point of Initiation (`Static` vs `Dynamic` QR).
   - Extracts Merchant Name, Merchant Identifier / PAN, Bank Code, Currency (`NPR`), and Merchant Category Code (MCC).
   - Dynamic QR support: Pre-fills encoded bill amounts and invoice references.
   - Collapsible **Technical QR Details** viewer showing raw bytes and nested TLV breakdowns.

2. **Multi-Input Scanning**:
   - **Live Rear Camera**: Auto-focus viewfinder, laser scanning beam, flip camera, and torch support.
   - **Image Upload**: Drag-and-drop or select any screenshot/photo of a QR from your gallery.
   - **Preset Sample QRs**: 1-click test payloads for Bhatbhateni Supermarket, Himalayan Java Coffee, eSewa Direct Pay, Khalti Merchant, and raw fallback QRs.

3. **Payment Details & Validation**:
   - Large NPR amount input with quick presets (`+100`, `+500`, `+1000`).
   - Warning indicators when editing pre-filled amounts from dynamic QRs.
   - 14 selectable payment purposes with custom purpose support.
   - Remarks input with quick suggested pills and 120-character limit.

4. **Nepali Provider Registry & Original UI Previews**:
   - **Digital Wallets**: eSewa, Khalti, IME Pay, connectIPS
   - **QR Networks**: Fonepay, NEPALPAY QR
   - **Commercial Banks**: Global IME Bank, Nabil Bank, NIC ASIA Bank, NMB Bank, Nepal SBI Bank, Himalayan Bank, Kumari Bank, Laxmi Sunrise Bank, Siddhartha Bank, Sanima Bank, Agricultural Development Bank, Everest Bank, Citizens Bank International, Prabhu Bank, Rastriya Banijya Bank.
   - Distinctive brand-inspired layouts (eSewa green, Khalti purple, Fonepay red, Global IME navy, etc.).

5. **Sandbox Simulation Outcomes**:
   - **Simulate Success**: Confetti celebration, simulated reference ID (`SIM-NP-2026-XXXXXX`), and receipt copying.
   - **Simulate Failed**: Realistic error handling and retry options.
   - **Simulate Cancelled**: Clean rollback flow.

6. **Local Persistence & History**:
   - Filter transactions by outcome (Success, Failed, Cancelled) and provider.
   - Search by merchant or reference ID.
   - Persistent across browser reloads via `localStorage`.

---

## 🛠️ Technology Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Icons**: Lucide React
- **QR Decoding**: `jsqr` (Canvas-based offline decoding)
- **Animation & Effects**: `canvas-confetti`

---

## 🏁 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Run the Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📱 Testing on Mobile Phones

- **Via Local Wi-Fi**: Open `http://<YOUR_COMPUTER_IP>:3000` (e.g. `http://10.10.110.227:3000`).
- **Via HTTPS Tunnel** *(Recommended for live camera permissions)*:
  ```bash
  .\cloudflared.exe tunnel --url http://localhost:3000
  ```
- **PWA Experience**: In mobile Safari or Chrome, tap **"Add to Home Screen"** to run full-screen.

---

## 📄 License

MIT License. Designed and developed for demonstration and developer testing in Nepal.

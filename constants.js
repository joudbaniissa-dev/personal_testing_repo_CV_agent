// constants.js
// Central place for keys, defaults, proxy config, and catalog data.

export const CHAT_HISTORY_KEY = "skillMatchChatHistory";
export const CERT_CATALOG_KEY = "skillMatchCertCatalog";
export const USER_RULES_KEY = "skillMatchUserRules";
export const LAST_RECOMMENDATIONS_KEY = "skillMatchLastRecommendations";

// === INTEGRATED: Your Proxy URL ===
export const GEMINI_PROXY_URL = 
  "https://backend-vercel-repo-git-main-jouds-projects-8f56041e.vercel.app/api/gemini-proxy";

// Import the certificates loader
import { loadCertificates, getCertificatesDatabase } from "./certificates-data.js";

// Use ONLY the new certificate database (will be loaded async)
// This will be populated after loadCertificates() is called
export let FINAL_CERTIFICATE_CATALOG = [];

// Initialize certificates (call this early in app startup)
export async function initializeCertificates() {
  FINAL_CERTIFICATE_CATALOG = await loadCertificates();
  return FINAL_CERTIFICATE_CATALOG;
}

// Getter for synchronous access (returns empty array if not loaded yet)
export function getFinalCertificateCatalog() {
  return getCertificatesDatabase();
}

// Default business rules (kept concise as a sensible starting point)
export const DEFAULT_RULES = [
  "Start with foundational certifications before advanced options.",
  "Align recommendations to the candidate's current or target role.",
  "Avoid overlapping certifications unless the user explicitly asks."
];

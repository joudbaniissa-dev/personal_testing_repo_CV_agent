// app.js
// ============================================================================
// 1) CONFIG & CONSTANTS
// ============================================================================

// NOTE: We expect GEMINI_API_KEY to be injected from your config/.env setup,
// for example by including a small config.js that does:
//
//   window.GEMINI_API_KEY = "<your real key>";
//
// This avoids hardcoding secrets in the repo. For quick local testing only,
// you *could* temporarily hardcode it here.
const GEMINI_API_KEY = window.GEMINI_API_KEY || "AIzaSyCYCBfVCy838RxxFJmIITmiBDJU2aVb43Q"; // <-- from your config/env
const GEMINI_MODEL = "gemini-2.5-flash-preview-09-2025";

const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${GEMINI_API_KEY}`;

// LocalStorage keys
const CHAT_HISTORY_KEY = "skillMatchChatHistory";
const CERT_CATALOG_KEY = "skillMatchCertCatalog";

// Default (built-in) certificate catalog.
// This will be used the first time and then stored in localStorage.
// Later, if you build an "admin" UI, you can update it and re-save.
const FINAL_CERTIFICATE_CATALOG = [
  // --- 1. Cloud Infrastructure & Architecture ---
  {
    id: "aws_ccp",
    name: "AWS Certified Cloud Practitioner (CCP)",
    description:
      "Validates fundamental understanding of AWS cloud concepts, security, and pricing.",
    level: "Foundational",
    officialLink: "https://aws.amazon.com/certification/certified-cloud-practitioner/",
  },
  {
    id: "azure_fund",
    name: "Microsoft Certified: Azure Fundamentals (AZ-900)",
    description:
      "Demonstrates foundational knowledge of core Azure services, security, and pricing.",
    level: "Foundational",
    officialLink:
      "https://learn.microsoft.com/en-us/credentials/certifications/azure-fundamentals/",
  },
  {
    id: "gcp_cdl",
    name: "Google Cloud Certified Cloud Digital Leader (CDL)",
    description:
      "Understanding of basic cloud computing and how Google Cloud products enable business transformation.",
    level: "Foundational",
    officialLink: "https://cloud.google.com/learn/certification/cloud-digital-leader",
  },
  {
    id: "aws_saa",
    name: "AWS Certified Solutions Architect - Associate",
    description:
      "Designing and deploying secure, cost-effective, and scalable systems on AWS.",
    level: "Associate",
    officialLink: "https://aws.amazon.com/certification/certified-solutions-architect-associate/",
  },
  {
    id: "azure_admin",
    name: "Microsoft Certified: Azure Administrator Associate (AZ-104)",
    description:
      "Implementation, management, and monitoring of Azure identity, governance, compute, and networking.",
    level: "Associate",
    officialLink:
      "https://learn.microsoft.com/en-us/credentials/certifications/azure-administrator/",
  },
  {
    id: "gcp_pca",
    name: "Professional Cloud Architect (PCA)",
    description:
      "Designing, planning, and managing secure, highly available, and scalable cloud architecture on Google Cloud.",
    level: "Expert",
    officialLink: "https://cloud.google.com/learn/certification/cloud-architect",
  },

  // --- 2. Integration & Digital Workflow (ServiceNow, MuleSoft, Salesforce) ---
  {
    id: "sn_csa",
    name: "ServiceNow Certified System Administrator (CSA)",
    description:
      "Core knowledge of the ServiceNow platform configuration, management, and maintenance.",
    level: "Foundational",
    officialLink:
      "https://learning.servicenow.com/lxp/en/credentials/certified-system-administrator-mainline-exam-blueprint?id=kb_article_view&sysparm_article=KB0011554",
  },
  {
    id: "sn_cis_itsm",
    name: "ServiceNow CIS - IT Service Management (ITSM)",
    description:
      "Expertise in deploying and configuring the core IT Service Management suite (Incident, Problem, Change).",
    level: "Specialist",
    officialLink: "https://learning.servicenow.com/lxp/en/pages/now-learning-get-certified?id=amap_detail&achievement_id=6c8e1d77dbc27f40de3cdb85ca961970",
  },
  {
    id: "mulesoft_dev1",
    name: "MuleSoft Certified Developer - Level 1",
    description:
      "Building, testing, troubleshooting, and deploying basic APIs and integrations using Anypoint Platform (Mule 4).",
    level: "Associate",
    officialLink: "https://trailheadacademy.salesforce.com/certificate/exam-mule-dev---Mule-Dev-201",
  },
  {
    id: "sf_admin",
    name: "Salesforce Certified Platform Administrator",
    description:
      "Foundational knowledge of managing users, security, and standard functionality of a Salesforce organization.",
    level: "Associate",
    officialLink: "https://trailhead.salesforce.com/credentials/administrator",
  },
  {
    id: "sf_app_arch",
    name: "Salesforce Certified Application Architect",
    description:
      "Designing and building technical solutions that are secure, scalable, and tailored for enterprise data management and sharing.",
    level: "Expert",
    officialLink:
      "https://trailhead.salesforce.com/credentials/applicationarchitect",
  },

  // --- 3. Data, AI & Analytics ---
  {
    id: "snowflake_core",
    name: "SnowPro Core Certification",
    description:
      "Core features and implementation of the Snowflake Cloud Data Platform.",
    level: "Foundational",
    officialLink: "https://learn.snowflake.com/en/certifications/snowpro-core/",
  },
  {
    id: "databricks_associate",
    name: "Databricks Certified Data Engineer Associate",
    description:
      "Building and deploying ETL/ELT pipelines using Databricks (PySpark, SQL).",
    level: "Associate",
    officialLink: "https://www.databricks.com/learn/certification/data-engineer-associate",
  },
  {
    id: "power_bi_analyst",
    name: "Microsoft Power BI Data Analyst (PL-300)",
    description:
      "Designing and building scalable data models and reports for business insight using Power BI.",
    level: "Associate",
    officialLink:
      "https://learn.microsoft.com/en-us/credentials/certifications/data-analyst-associate/?practice-assessment-type=certification",
  },
  {
    id: "azure_ai_eng",
    name: "Microsoft Certified: Azure AI Engineer Associate (AI-102)",
    description:
      "Designing and implementing AI solutions using Azure services (Cognitive Services, Azure ML).",
    level: "Professional",
    officialLink:
      "https://learn.microsoft.com/en-us/credentials/certifications/azure-ai-engineer/",
  },

  // --- 4. Business, Process & Strategy (Digital Transformation) ---
  {
    id: "pmp",
    name: "Project Management Professional (PMP)",
    description:
      "Validates skills in leading and directing complex projects, using predictive, agile, and hybrid approaches.",
    level: "Expert",
    officialLink: "https://www.pmi.org/certifications/project-management-pmp",
  },
  {
    id: "itil_f",
    name: "ITIL 4 Foundation",
    description:
      "Core principles and practices for IT Service Management (ITSM) and the Service Value System.",
    level: "Foundational",
    officialLink:
      "https://www.peoplecert.org/browse-certifications/it-governance-and-service-management/ITIL-1/itil-4-foundation-2565",
  },
  {
    id: "csm",
    name: "Certified ScrumMaster (CSM)",
    description:
      "Understanding and application of the Scrum framework to facilitate teams and manage agile delivery.",
    level: "Specialist",
    officialLink:
      "https://www.scrumalliance.org/get-certified/scrum-master-track/certified-scrummaster",
  },
  {
    id: "cbap",
    name: "Certified Business Analysis Professional (CBAP)",
    description:
      "Expertise in defining requirements, driving strategic outcomes, and liaison between business and IT stakeholders.",
    level: "Expert",
    officialLink: "https://www.iiba.org/business-analysis-certifications/cbap/",
  },
  {
    id: "ccmp",
    name: "Certified Change Management Professional (CCMP)",
    description:
      "Structured methodologies for managing the human and organizational side of digital change.",
    level: "Specialist",
    officialLink: "https://www.acmpglobal.org/page/CCMP",
  },
  {
    id: "focp",
    name: "FinOps Certified Practitioner (FOCP)",
    description:
      "Principles for managing cloud financial operations, cost optimization, and financial accountability.",
    level: "Foundational",
    officialLink: "https://learn.finops.org/page/finops-certified-practitioner",
  },

  // --- 5. Cybersecurity, DevOps & Governance ---
  {
    id: "cissp",
    name: "Certified Information Systems Security Professional (CISSP)",
    description:
      "Executive-level knowledge in designing, implementing, and managing a security program.",
    level: "Expert",
    officialLink: "https://www.isc2.org/certifications/CISSP",
  },
  {
    id: "cism",
    name: "Certified Information Security Manager (CISM)",
    description:
      "Focuses on security governance, program development, risk management, and incident management.",
    level: "Expert",
    officialLink: "https://www.isaca.org/credentialing/cism",
  },
  {
    id: "cka",
    name: "Certified Kubernetes Administrator (CKA)",
    description:
      "Hands-on ability to deploy, configure, and manage Kubernetes clusters (Cloud Native App Development).",
    level: "Specialist",
    officialLink:
      "https://trainingportal.linuxfoundation.org/courses/certified-kubernetes-administrator-cka",
  },
  {
    id: "terraform",
    name: "HashiCorp Certified: Terraform Associate",
    description:
      "Foundational skills in Infrastructure as Code (IaC) using Terraform for multi-cloud automation.",
    level: "Associate",
    officialLink: "https://developer.hashicorp.com/certifications/infrastructure-automation",
  },
  {
    id: "github_as",
    name: "GitHub Advanced Security",
    description:
      "Expertise in implementing security tools and practices within GitHub repositories and workflows.",
    level: "Specialist",
    officialLink: "https://github.com/features/security",
  },
];

// This variable will hold the *active* catalog (loaded from localStorage or default)
let certificateCatalog = [];

// ============================================================================
// 2) SYSTEM PROMPTS & AGENT BEHAVIOR (EDIT HERE MOST OFTEN)
// ============================================================================
//
// This section controls how the AI "behaves". You can tweak wording, tone,
// and instructions without touching the rest of the code.
//
// - CHAT_SYSTEM_PROMPT: used for the chat assistant.
// - ANALYSIS_SYSTEM_PROMPT: used for CV → certification analysis.
// - RULES_SYSTEM_PROMPT: used to parse free-text rules.
//

// System / persona prompt for the chat assistant.
// System / persona prompt for the chat assistant.
const CHAT_SYSTEM_PROMPT = `
You are "SkillMatch Pro", an AI-powered assistant that helps people:
- understand training and certification options,
- analyze their CV or experience at a high level,
- discuss skill gaps in a clear, practical way.

You have access to:
- the user's CV (or a summary of it),
- the list of certifications recommended by the recommender engine,
- the business rules that shaped those recommendations.

Behavior:
- ALWAYS ground your answers in the existing recommendations and the user's profile.
- Do NOT invent new or random certifications unless the user explicitly asks for additional alternatives.
- When suggesting alternatives, clearly label them as "additional options" and explain how they differ.
- Explain why each recommended certification fits the user's profile (skills, experience level, goals, gaps).
- Refer to certifications by their exact name (and ID if useful) from the catalog.
- Respect any business rules when discussing or comparing recommendations.
- If something is unclear in the user's question, briefly ask a focused follow-up instead of guessing.

Style:
- concise but helpful,
- friendly and professional,
- focused on practical, actionable guidance (next steps, study paths, exam prep, sequencing of certs).
`;


// System prompt for the CV analysis engine.
// This is combined with the certification catalog, business rules, and CV text.
// You can adjust instructions, strictness of JSON, or the level of explanation here.
const ANALYSIS_SYSTEM_PROMPT = `
You are an expert career counselor and training analyst.
Your job is to:

1. Carefully read the CVs provided to you.
2. Identify, for each candidate:
   - key skills and technologies,
   - experience level (junior / mid / senior / lead),
   - current or past roles and industries,
   - current certifications (if any),
   - stated or implied career goals,
   - clear gaps between current profile and target roles.
3. Recommend ONLY the most relevant training and certifications from the provided catalog.
   - Do NOT invent certifications that are not in the catalog.
   - Prefer 2–6 targeted recommendations per candidate instead of long generic lists.
   - Avoid duplicate or heavily overlapping certifications unless there is a strong reason.
4. Strictly respect the business rules when applicable.
   - If a rule conflicts with a candidate’s profile, still follow the rule and explain it briefly in "rulesApplied".
5. Use the catalog metadata (ID, name, level, domain, etc.) to justify why a certification is a good match:
   - Map recommendations to the candidate’s skills, experience, and goals.
   - Highlight whether the recommendation is for upskilling, reskilling, or career transition.
6. Return a single strict JSON object in EXACTLY the specified structure.
   - The root must be an object with a "candidates" array.
   - Each "candidate" must contain:
     - "candidateName"
     - "recommendations" (an array; can be empty if nothing fits).
   - Each recommendation must contain:
     - "certId" (matching the catalog ID),
     - "certName",
     - "reason" (clear, human-readable, 2–5 sentences),
     - "rulesApplied" (array of rule strings; empty if no rule was relevant).
7. Be precise and deterministic:
   - Do NOT use placeholders like "TBD" or "example".
   - Do NOT include any markdown, comments, or explanation outside the JSON.
   - The entire response must be valid JSON that can be parsed without modification.
`;


// System prompt for parsing natural-language business rules into normalized text.
const RULES_SYSTEM_PROMPT = `
You are a business rules parser.
Your job is to read natural-language rules from the user and convert them into a clean, structured list of rule sentences.

Requirements:
- Return ONLY a JSON array of strings.
- Each rule must be one clean sentence describing a single instruction or constraint.
- Preserve the user's original meaning while removing ambiguity, redundancy, or informal phrasing.
- Do NOT add new rules, assumptions, or interpretations. Only clean and normalize what the user wrote.
- If a rule is unclear or incomplete, rewrite it to the closest clear version without changing intent.

Formatting:
- No explanations, no markdown, no comments.
- The entire response MUST be valid JSON that can be parsed directly.
`;


// ============================================================================
// 3) GLOBAL STATE
// ============================================================================
//
// All cross-section state lives here. This keeps the rest of the code simple.
// ----------------------------------------------------------------------------

// Some default business rules the recommender will follow if the user
// doesn't provide custom ones via the Rules textarea.
const DEFAULT_RULES = [
  "Match beginners with foundation or entry-level certifications before recommending advanced or expert exams.",
  "Prioritize certifications that align with the candidate's current or target job role and industry.",
  "Avoid recommending multiple overlapping certifications with identical scope unless explicitly required.",
  "If the candidate has no prior experience in a domain, suggest a learning path before recommending advanced or expert certifications.",
  "When multiple certifications cover similar skills, prefer the one that aligns best with the candidate’s career goals.",
  "If the candidate already holds a certification in a domain, avoid recommending lower-level certifications in the same domain unless they provide missing fundamentals.",
  "Prioritize certifications that are in-demand or widely recognized in the candidate’s region or industry.",
  "If the candidate indicates a career transition, recommend foundational certifications in the new domain before intermediate or advanced ones.",
  "If a certification requires prerequisites or recommended experience, ensure those requirements match the candidate’s background before recommending it.",
  "Recommend no more than 2-6 certifications per candidate to avoid overwhelming them; focus on the highest-impact options.",
];


let chatHistory = [];                // [{ text: string, isUser: boolean }]
let userRules = [...DEFAULT_RULES];  // [string] - starts with defaults, can be overridden
let uploadedCvs = [];                // [{ name: string, text: string }]
let lastRecommendations = null;      // stores last CV → certifications recommendations


// ===========================================
// 5) CORE GEMINI CALL WRAPPER
// ===========================================
//
// A single helper to call the Gemini API. All "agents" will rely on this.
// We keep it simple: messages array is built from an optional chat history,
// plus a user message, plus an optional system prompt.
//

async function callGeminiAPI(userPrompt, history = [], systemPrompt = "") {
  if (!GEMINI_API_KEY) {
    throw new Error(
      "GEMINI_API_KEY is missing. Please configure it in your env or config.js."
    );
  }

  const contents = [];

  // 1) Include prior chat turns (user/model)
  if (Array.isArray(history) && history.length > 0) {
    history.forEach((msg) => {
      contents.push({
        role: msg.isUser ? "user" : "model",
        parts: [{ text: msg.text }],
      });
    });
  }

  // 2) Embed systemPrompt into the final user message instead of using role "system"
  let finalPrompt = userPrompt;
  if (systemPrompt) {
    finalPrompt = `${systemPrompt.trim()}

--------------------
Conversation context & question:
${userPrompt}`;
  }

  contents.push({
    role: "user",
    parts: [{ text: finalPrompt }],
  });

  const body = {
    contents,
    generationConfig: {
      temperature: 0.3,
      maxOutputTokens: 2048,
    },
  };

  const response = await fetch(GEMINI_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error("Gemini API error:", errorText);
    throw new Error(
      `Gemini API request failed: ${response.status} ${response.statusText}`
    );
  }

  const data = await response.json();
  const candidate = data.candidates?.[0];
  const part = candidate?.content?.parts?.[0];

  if (!part?.text) {
    console.warn("Unexpected Gemini API response format:", data);
    throw new Error("No text returned from Gemini API.");
  }

  return part.text;
}

// ============================================================================
// 6) CERT CATALOG UTILITIES
// ============================================================================

// Load certificate catalog from localStorage OR fallback to the default.
// This is where you can later plug in an "editor" UI that modifies the catalog.
function loadCertificateCatalog() {
  const stored = localStorage.getItem(CERT_CATALOG_KEY);
  if (stored) {
    try {
      const parsed = JSON.parse(stored);
      if (Array.isArray(parsed)) {
        return parsed;
      }
    } catch (err) {
      console.warn("Failed to parse stored certificate catalog, using default.", err);
    }
  }
  // If nothing valid stored → use default, and persist it once.
  saveCertificateCatalog(FINAL_CERTIFICATE_CATALOG);
  return FINAL_CERTIFICATE_CATALOG;
}

// Save a given catalog array to localStorage.
function saveCertificateCatalog(catalogArray) {
  try {
    localStorage.setItem(CERT_CATALOG_KEY, JSON.stringify(catalogArray));
  } catch (err) {
    console.error("Failed to save certificate catalog:", err);
  }
}

// Create a string representation of the catalog to embed in prompts.
function getCatalogAsPromptString() {
  const catalog =
    (certificateCatalog && certificateCatalog.length > 0)
      ? certificateCatalog
      : FINAL_CERTIFICATE_CATALOG;

  return catalog
    .map((cert) => {
      const tagsText = cert.tags && cert.tags.length
        ? `Tags: ${cert.tags.join(", ")}`
        : "";
      return `- ID: ${cert.id}
  Name: ${cert.name}
  Level: ${cert.level}
  Description: ${cert.description}`;
    })
    .join("\n\n");
}


// ============================================================================
// 7) UI HELPERS (CHAT, STATUS, FILES)
// ============================================================================

// Append messages to the chat window.
function addMessage(text, isUser = false) {
  const chatMessages = document.getElementById("chat-messages");
  if (!chatMessages) return;

  const messageDiv = document.createElement("div");
  messageDiv.className = `message ${isUser ? "user-message" : "bot-message"}`;
  // Convert newlines to <br> for simple formatting
  messageDiv.innerHTML = text.replace(/\n/g, "<br>");

  chatMessages.appendChild(messageDiv);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Show status messages (success / error) in a given container element.
function updateStatus(element, message, isError = false) {
  if (!element) return;
  element.innerHTML = `
    <div class="status-message ${isError ? "status-error" : "status-success"}">
      ${message}
    </div>
  `;
  setTimeout(() => {
    element.innerHTML = "";
  }, 8000);
}

// Show a little loader spinner + text.
function showLoading(element, message) {
  if (!element) return;
  element.innerHTML = `<div class="loader"></div>${message}`;
}

// Hide any loader text.
function hideLoading(element) {
  if (!element) return;
  element.innerHTML = "";
}

// Persist the chat history in localStorage.
function saveChatHistory() {
  try {
    localStorage.setItem("skillMatchChatHistory", JSON.stringify(chatHistory));
  } catch (err) {
    console.warn("Failed to save chat history:", err);
  }
}

// Load chat history from localStorage and re-render it.
function loadChatHistory() {
  const chatMessages = document.getElementById("chat-messages");
  if (chatMessages) {
    chatMessages.innerHTML = "";
  }

  // Clear in-memory history
  chatHistory = [];

  // Also clear any previously saved history so every refresh starts fresh
  try {
    localStorage.removeItem("skillMatchChatHistory");
  } catch (err) {
    console.warn("Failed to clear chat history from storage:", err);
  }
}

// ============================================================================
// 6) CV PARSING (PDF, DOCX, TXT)
// ============================================================================
//
// Uses pdf.js and mammoth.js which are loaded via CDN in index.html.
// ----------------------------------------------------------------------------

// Configure PDF.js worker (global pdfjsLib is provided by CDN)
if (window.pdfjsLib) {
  window.pdfjsLib.GlobalWorkerOptions.workerSrc =
    "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";
}

// Extract text from a PDF file using pdf.js
async function extractTextFromPdf(file) {
  const arrayBuffer = await file.arrayBuffer();

  const pdf = await window.pdfjsLib.getDocument({ data: arrayBuffer }).promise;
  let fullText = "";

  for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
    const page = await pdf.getPage(pageNum);
    const content = await page.getTextContent();
    const strings = content.items.map((item) => item.str);
    fullText += strings.join(" ") + "\n\n";
  }

  return fullText;
}

// Extract text from a DOCX file using mammoth.js
async function extractTextFromDocx(file) {
  const arrayBuffer = await file.arrayBuffer();
  const result = await window.mammoth.extractRawText({ arrayBuffer });
  return result.value || "";
}

// Generic extractor for any supported file type
async function extractTextFromFile(file) {
  const name = file.name.toLowerCase();
  const type = file.type;

  // 1. PDF
  if (type === "application/pdf" || name.endsWith(".pdf")) {
    return await extractTextFromPdf(file);
  }

  // 2. DOCX
  if (
    type ===
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
    name.endsWith(".docx")
  ) {
    return await extractTextFromDocx(file);
  }

  // 3. Plain text
  if (type === "text/plain" || name.endsWith(".txt")) {
    return await file.text();
  }

  // 4. Fallback: try text anyway (so we don’t silently do nothing)
  console.warn(
    `Unknown file type (${type}, ${name}); attempting file.text() anyway.`
  );
  return await file.text();
}


// ============================================================================
// 7) RULE ENGINE (Parse + Store Business Rules)
// ============================================================================
//
// userRules is kept in memory. This section only worries about converting
// natural-language rules into a normalized list of strings.
// ----------------------------------------------------------------------------

async function parseAndApplyRules(rulesText) {
  const prompt = `
${RULES_SYSTEM_PROMPT.trim()}

User's rules:
${rulesText}

Remember:
- Respond with ONLY a JSON array of strings.
- No extra commentary or formatting.
`;

  const rawResponse = await callGeminiAPI(prompt, [], ""); // systemPrompt already embedded above
  const cleaned = rawResponse.replace(/```json\s*|\s*```/g, "").trim();

  const parsed = JSON.parse(cleaned);
  if (!Array.isArray(parsed)) {
    throw new Error("Parsed rules are not an array.");
  }

  // Update global rules
  userRules = parsed;

  // Persist in localStorage so next session also uses them
  try {
    localStorage.setItem("skillMatchUserRules", JSON.stringify(userRules));
  } catch (e) {
    console.warn("Failed to persist user rules:", e);
  }

  return userRules;
}

// ============================================================================
// 8) RECOMMENDATION ENGINE (CV → Certs)
// ============================================================================
//
// Builds the large prompt for CV analysis + uses Gemini to return a JSON object.
// Then, renders the recommendations in the UI.
// ----------------------------------------------------------------------------

function buildAnalysisPromptForCvs(cvArray, rulesArray) {
  const catalogString = getCatalogAsPromptString();

  return `
${ANALYSIS_SYSTEM_PROMPT.trim()}

**Catalog of Certifications:**
${catalogString}

**Business Rules to Apply (if any):**
${rulesArray && rulesArray.length > 0 ? rulesArray.map((r, i) => `${i + 1}. ${r}`).join("\n") : "No explicit rules provided. Use good judgement."}

**Candidate CVs:**
${cvArray
  .map(
    (cv, idx) => `
[Candidate ${idx + 1}]
Name (if available in file name or content): ${cv.name || "Unknown"}
CV Text:
${cv.text}
`
  )
  .join("\n\n")}

**Task:**
For each CV, provide recommendations in a structured JSON format. You must return a single JSON object with a "candidates" field, where each candidate is an object.

**JSON Structure:**
{
  "candidates": [
    {
      "candidateName": "Full Name of Candidate",
      "recommendations": [
        {
          "certId": "pmp",
          "certName": "Project Management Professional (PMP)",
          "reason": "Clear explanation of why this certification is relevant.",
          "rulesApplied": ["List of rules that influenced this recommendation"]
        }
      ]
    }
  ]
}

Important:
- Respond with ONLY the JSON object. Do not include any introductory text, explanations, or markdown formatting like \`\`\`json.
- The entire response must be a single, valid JSON object that can be parsed.
- If no recommendations can be made for a candidate, provide an empty array for their "recommendations".
`;
}

// Call Gemini to analyze the CVs and parse the recommendations JSON.
async function analyzeCvsWithAI(cvArray, rulesArray) {
  const analysisPrompt = buildAnalysisPromptForCvs(cvArray, rulesArray || []);
  const rawResponse = await callGeminiAPI(analysisPrompt, [], "");
  const cleaned = rawResponse.replace(/```json\s*|\s*```/g, "").trim();

  let recommendations;
  try {
    recommendations = JSON.parse(cleaned);
  } catch (err) {
    console.error("JSON Parsing Error:", err);
    console.log("RAW GEMINI RESPONSE >>>", rawResponse);   // 👈 add this
    console.log("CLEANED RESPONSE >>>", cleaned);          // 👈 and this
    throw new Error(
      "The AI returned an invalid JSON format. Check the console for the raw response."
    );
  }

  return recommendations;
}

async function analyzeSingleCvWithAI(cv, rulesArray) {
  // Wrap the single CV in an array of length 1
  const cvArray = [cv];
  const analysisPrompt = buildAnalysisPromptForCvs(cvArray, rulesArray || []);

  const rawResponse = await callGeminiAPI(analysisPrompt, [], "");
  const cleaned = rawResponse.replace(/```json\s*|\s*```/g, "").trim();

  let parsed;
  try {
    parsed = JSON.parse(cleaned);
  } catch (err) {
    console.error("JSON Parsing Error (single CV):", err);
    console.log("RAW GEMINI RESPONSE >>>", rawResponse);
    console.log("CLEANED RESPONSE >>>", cleaned);
    throw new Error(
      `The AI returned an invalid JSON format for CV "${cv.name}".`
    );
  }

  return parsed;
}


// Render the recommendations object into the HTML.
function displayRecommendations(recommendations, containerEl, resultsSectionEl) {
  if (!containerEl || !resultsSectionEl) return;

  containerEl.innerHTML = "";

  if (
    !recommendations ||
    !recommendations.candidates ||
    recommendations.candidates.length === 0
  ) {
    containerEl.innerHTML =
      "<p>No recommendations could be generated. Please check the CVs, rules, and the console for errors.</p>";
  } else {
    recommendations.candidates.forEach((candidate) => {
      const candidateDiv = document.createElement("div");
      candidateDiv.className = "candidate-result";

      const candidateTitle = document.createElement("h3");
      candidateTitle.textContent =
        candidate.candidateName || "Candidate (Name not provided)";
      candidateDiv.appendChild(candidateTitle);

      if (candidate.recommendations && candidate.recommendations.length > 0) {
        candidate.recommendations.forEach((rec) => {
          const card = document.createElement("div");
          card.className = "recommendation-card";

          card.innerHTML = `
            <div class="recommendation-header">
              <span class="recommendation-cert-name">${rec.certName || "Certification"}</span>
              ${
                rec.certId
                  ? `<span class="recommendation-cert-id">ID: ${rec.certId}</span>`
                  : ""
              }
            </div>
            ${
              rec.provider || rec.level || rec.domain
                ? `<div class="recommendation-meta">
                     ${rec.provider ? `<span><strong>Provider:</strong> ${rec.provider}</span>` : ""}
                     ${rec.level ? `<span><strong>Level:</strong> ${rec.level}</span>` : ""}
                     ${rec.domain ? `<span><strong>Domain:</strong> ${rec.domain}</span>` : ""}
                   </div>`
                : ""
            }
            ${
              rec.tags && rec.tags.length
                ? `<div class="recommendation-tags">
                     ${rec.tags.map((t) => `<span class="tag">${t}</span>`).join("")}
                   </div>`
                : ""
            }
            <div class="recommendation-reason">
              <i class="fas fa-lightbulb"></i> ${rec.reason}
            </div>
            ${
              rec.rulesApplied && rec.rulesApplied.length > 0
                ? `<div class="recommendation-rule">
                     <i class="fas fa-gavel"></i> Rules Applied: ${rec.rulesApplied.join(
                       ", "
                     )}
                   </div>`
                : ""
            }
          `;
          candidateDiv.appendChild(card);
        });
      } else {
        const noRecP = document.createElement("p");
        noRecP.textContent =
          "No specific recommendations found for this candidate based on the current rules and catalog.";
        candidateDiv.appendChild(noRecP);
      }

      containerEl.appendChild(candidateDiv);
    });
  }

  resultsSectionEl.classList.remove("hidden");
}

// ---------------------------------------------------------------------------
// 8.1) SHARED MEMORY HELPERS (Rules + Recommendations + Chat)
// ---------------------------------------------------------------------------

// Load user rules from localStorage (if user has customized them previously).
function loadUserRulesFromStorage() {
  try {
    const stored = localStorage.getItem("skillMatchUserRules");
    if (stored) {
      const parsed = JSON.parse(stored);
      if (Array.isArray(parsed) && parsed.length > 0) {
        userRules = parsed;
      }
    }
  } catch (e) {
    console.warn("Failed to load stored user rules:", e);
  }
}

// Load last recommendations from localStorage so the chat agent can still
// talk about them even after a refresh.
function loadLastRecommendationsFromStorage() {
  try {
    const stored = localStorage.getItem("skillMatchLastRecommendations");
    if (stored) {
      lastRecommendations = JSON.parse(stored);
    }
  } catch (e) {
    console.warn("Failed to load stored recommendations:", e);
  }
}

// Reset chat so it clearly starts a new conversation about the latest
// recommendations (and we don't carry over previous experiments).
function resetChatForNewRecommendations(recommendations) {
  const chatMessages = document.getElementById("chat-messages");
  if (chatMessages) {
    chatMessages.innerHTML = "";
  }

  chatHistory = [];

  const intro =
    "I've just analyzed your CV(s) and generated certificate recommendations. " +
    "You can now ask me questions about these specific recommendations, why they were chosen, " +
    "how they compare, or how to prepare for them.";

  addMessage(intro, false);
  chatHistory.push({ text: intro, isUser: false });
  saveChatHistory();
}

// Build the user message that will be sent to the chat agent, enriched with
// the current rules + latest recommendations so the LLM stays grounded.
function buildChatPromptWithRecommendations(userMessage) {
  // Prepare rules text
  const rulesList =
    userRules && userRules.length > 0
      ? userRules.map((r, i) => `${i + 1}. ${r}`).join("\n")
      : "No explicit business rules were provided. Use general good practice.";

  // Prepare recommendations summary
  let recSummary = "No certificate recommendations have been generated yet.";
  if (lastRecommendations && Array.isArray(lastRecommendations.candidates)) {
    const lines = [];
    lastRecommendations.candidates.forEach((candidate) => {
      lines.push(
        `Candidate: ${candidate.candidateName || "Candidate"}`
      );
      (candidate.recommendations || []).forEach((rec) => {
        lines.push(
          `- ${rec.certName || "Certification"} (reason: ${
            rec.reason || "No reason provided"
          })`
        );
      });
      lines.push(""); // blank line between candidates
    });
    recSummary = lines.join("\n");
  }

  return `
You are SkillMatch Pro. You MUST base your conversation on the certificate recommendations
already generated by the recommender engine, and the current business rules.

Business rules to respect:
${rulesList}

Current certificate recommendations:
${recSummary}

Guidelines:
- Focus your answers on these recommended certifications and the user's questions about them.
- Explain why they were recommended, how they fit the candidate's profile, how to prepare, and compare them if asked.
- Do NOT invent completely unrelated or random certifications unless the user explicitly asks for alternatives.
- If the user asks "what did you recommend and why?", recap exactly from the recommendations above.

User message:
${userMessage}
`;
}

// ============================================================================
// 9) DOM BINDING & EVENT HANDLERS
// ============================================================================
//
// This section wires everything together once the DOM is ready.
// - Chat send button & Enter key
// - CV upload, drag & drop, analyze button
// - Rules textarea + Update Rules button
// ----------------------------------------------------------------------------

document.addEventListener("DOMContentLoaded", () => {
  // Load the certificate catalog from localStorage or defaults
  certificateCatalog = loadCertificateCatalog();

  // Load user rules and last recommendations (if any) from storage
  loadUserRulesFromStorage();
  loadLastRecommendationsFromStorage();

  // DOM elements
  const userInput = document.getElementById("user-input");
  const sendButton = document.getElementById("send-button");

  const fileInput = document.getElementById("file-input");
  const analyzeButton = document.getElementById("analyze-button");
  const cvUploadArea = document.getElementById("cv-upload-area");

  const rulesInput = document.getElementById("rules-input");
  const updateRulesButton = document.getElementById("update-rules");

  const uploadStatus = document.getElementById("upload-status");
  const rulesStatus = document.getElementById("rules-status");

  const resultsSection = document.getElementById("results-section");
  const recommendationsContainer = document.getElementById(
    "recommendations-container"
  );

  // Load chat history into UI (we reset it each refresh)
  loadChatHistory();

  // --- Chat events ---
  async function handleSendMessage() {
    const message = (userInput.value || "").trim();
    if (!message) return;

    addMessage(message, true);
    chatHistory.push({ text: message, isUser: true });
    saveChatHistory();

    userInput.value = "";
    sendButton.disabled = true;

    try {
      // Wrap the user message with recommendations + rules context
      const contextualMessage = buildChatPromptWithRecommendations(message);

      const reply = await callGeminiAPI(
        contextualMessage,
        chatHistory,
        CHAT_SYSTEM_PROMPT
      );
      addMessage(reply, false);
      chatHistory.push({ text: reply, isUser: false });
      saveChatHistory();
    } catch (err) {
      console.error("Chat API Error:", err);
      addMessage(
        "Sorry, I'm having trouble connecting. Please verify the API key and network.",
        false
      );
    } finally {
      sendButton.disabled = false;
    }
  }

  sendButton.addEventListener("click", handleSendMessage);
  userInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  });

  // --- File upload events ---
  cvUploadArea.addEventListener("click", () => fileInput.click());

  cvUploadArea.addEventListener("dragover", (e) => {
    e.preventDefault();
    cvUploadArea.style.borderColor = "var(--primary)";
  });

  cvUploadArea.addEventListener("dragleave", () => {
    cvUploadArea.style.borderColor = "var(--border-color)";
  });

  cvUploadArea.addEventListener("drop", (e) => {
    e.preventDefault();
    cvUploadArea.style.borderColor = "var(--border-color)";
    const files = Array.from(e.dataTransfer.files || []);
    if (files.length) {
      fileInput.files = e.dataTransfer.files;
      updateStatus(
        uploadStatus,
        `Selected ${files.length} file(s): ${files.map((f) => f.name).join(", ")}`
      );
    }
  });

  fileInput.addEventListener("change", () => {
    uploadedCvs = [];
    const files = Array.from(fileInput.files || []);
    if (files.length > 0) {
      updateStatus(
        uploadStatus,
        `Selected ${files.length} file(s): ${files.map((f) => f.name).join(", ")}`
      );
    } else {
      uploadStatus.innerHTML = "";
    }
  });

  analyzeButton.addEventListener("click", async () => {
    const files = Array.from(fileInput.files || []);
    if (files.length === 0) {
      updateStatus(uploadStatus, "Please select at least one CV file.", true);
      return;
    }

    showLoading(uploadStatus, "Extracting text from CVs...");
    analyzeButton.disabled = true;
    uploadedCvs = [];

    try {
      // 1) Extract text from all files
      for (const file of files) {
        const text = await extractTextFromFile(file);
        console.log(`--- DEBUG: Extracted text from ${file.name} ---`);
        console.log(text);
        uploadedCvs.push({ name: file.name, text });
      }

      showLoading(uploadStatus, "Analyzing CVs with AI...");
      // 2) Analyze with AI using current rules + catalog
      
      const combined = { candidates: [] };

      for (const cv of uploadedCvs) {
        const result = await analyzeSingleCvWithAI(cv, userRules);

        if (result && Array.isArray(result.candidates)) {
          combined.candidates.push(...result.candidates);
        }
      }

      const recommendations = combined;


      // 3) Store recommendations for the chat agent
      lastRecommendations = recommendations;
      try {
        localStorage.setItem(
          "skillMatchLastRecommendations",
          JSON.stringify(recommendations)
        );
      } catch (e) {
        console.warn("Failed to persist last recommendations:", e);
      }

      // 4) Render
      displayRecommendations(
        recommendations,
        recommendationsContainer,
        resultsSection
      );

      // 5) Reset chat so it clearly starts a new conversation about these recs
      resetChatForNewRecommendations(recommendations);

      updateStatus(uploadStatus, `Analysis complete for ${files.length} CV(s).`);
    } catch (err) {
      console.error("Analysis Error:", err);
      updateStatus(
        uploadStatus,
        `Failed to analyze CVs. Error: ${err.message}`,
        true
      );
    } finally {
      hideLoading(uploadStatus);
      analyzeButton.disabled = false;
    }
  });

  // --- Rules events ---
  updateRulesButton.addEventListener("click", async () => {
    const rulesText = (rulesInput.value || "").trim();
    if (!rulesText) {
      updateStatus(
        rulesStatus,
        "Please write at least one rule before updating.",
        true
      );
      return;
    }

    showLoading(rulesStatus, "Parsing rules with AI...");
    updateRulesButton.disabled = true;

    try {
      const parsedRules = await parseAndApplyRules(rulesText);
      updateStatus(
        rulesStatus,
        `Successfully parsed and applied ${parsedRules.length} rules.`
      );
      addMessage(
        "I've updated my recommendation logic based on your new rules.",
        false
      );
    } catch (err) {
      console.error("Rule Parsing Error:", err);
      updateStatus(
        rulesStatus,
        `Failed to parse rules. Error: ${err.message}`,
        true
      );
    } finally {
      hideLoading(rulesStatus);
      updateRulesButton.disabled = false;
    }
  });
});

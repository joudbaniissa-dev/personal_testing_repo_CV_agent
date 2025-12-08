// constants.js
// Central place for keys, defaults, and catalog data.

export const CHAT_HISTORY_KEY = "skillMatchChatHistory";
export const CERT_CATALOG_KEY = "skillMatchCertCatalog";
export const USER_RULES_KEY = "skillMatchUserRules";
export const LAST_RECOMMENDATIONS_KEY = "skillMatchLastRecommendations";

// Default (built-in) certificate catalog.
export const FINAL_CERTIFICATE_CATALOG = [
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

// Default business rules (kept concise as a sensible starting point)
export const DEFAULT_RULES = [
  "Start with foundational certifications before advanced options.",
  "Align recommendations to the candidate's current or target role.",
  "Avoid overlapping certifications unless the user explicitly asks."
];


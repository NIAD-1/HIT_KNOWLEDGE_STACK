/**
 * HIT Founder OS - Complete Operating System Engine
 * Standalone Web Platform for Industrial Founder Progression
 */

// --- 1. CORE DATA STORE & SEED DATA ---

const SCHOOLS_DATA = [
  { id: "s01", code: "01", title: "First Principles", category: "Foundations", purpose: "Reasoning, mathematics, physics, and core mental models for engineering judgment.", unlock: "Mental models, first-principles decomposition, order-of-magnitude estimates.", obsidian: "01_First_Principles", color: "#FFB300" },
  { id: "s02", code: "02", title: "Electronics", category: "Hardware", purpose: "Circuits, analog/digital components, sensor selection, signal conditioning, PCB design.", unlock: "Physical circuit design, schematic capture, PCB layout, instrumentation.", obsidian: "02_Electronics", color: "#FF5252" },
  { id: "s03", code: "03", title: "Embedded Systems", category: "Hardware", purpose: "Microcontrollers, firmware, RTOS, low-level protocols (SPI, I2C, UART), edge devices.", unlock: "Industrial device firmware, RTOS task scheduling, low-power sensing.", obsidian: "03_Embedded_Systems", color: "#FF7043" },
  { id: "s04", code: "04", title: "Computer Engineering", category: "Hardware", purpose: "Processor architecture, digital logic, memory hierarchies, hardware/software boundary.", unlock: "Hardware architecture comprehension, FPGA/ASIC fundamentals.", obsidian: "04-Computer_Engineering", color: "#FF9800" },
  { id: "s05", code: "05", title: "Networking", category: "Connectivity", purpose: "IoT protocols, MQTT, LoRaWAN, Ethernet, industrial fieldbuses (Modbus, CAN bus).", unlock: "Industrial edge gateway communication, secure IoT telemetry paths.", obsidian: "05_Networking", color: "#26A69A" },
  { id: "s06", code: "06", title: "Cloud Engineering", category: "Platform", purpose: "Cloud infrastructure, Kubernetes, edge computing, serverless, microservices.", unlock: "Scalable IIoT ingestion infrastructure, distributed cloud backend.", obsidian: "06_Cloud_Engineering", color: "#29B6F6" },
  { id: "s07", code: "07", title: "Software Engineering", category: "Platform", purpose: "Frontend/backend platforms, API design, system architecture, design patterns, testing.", unlock: "Industrial dashboards, platform APIs, scalable web software.", obsidian: "07_SE", color: "#42A5F5" },
  { id: "s08", code: "08", title: "Databases", category: "Platform", purpose: "Relational DBs, time-series DBs, vector stores, data governance, transactional integrity.", unlock: "Telemetry time-series storage, audit logs, regulatory data immutability.", obsidian: "08_Databases", color: "#5C6BC0" },
  { id: "s09", code: "09", title: "Data Engineering", category: "Platform", purpose: "ETL/ELT data pipelines, stream processing, real-time analytics, data lakehouses.", unlock: "High-throughput telemetry pipelines, industrial analytics platforms.", obsidian: "09_Data_Engineering", color: "#7E57C2" },
  { id: "s10", code: "10", title: "AI Engineering", category: "Intelligence", purpose: "Machine learning, LLMs, anomaly detection, predictive maintenance, RAG architectures.", unlock: "Industrial anomaly detection, automated regulatory document intelligence.", obsidian: "010_AI", color: "#AB47BC" },
  { id: "s11", code: "11", title: "Robotics & Automation", category: "Intelligence", purpose: "Control theory, robotics, PLC automation, industrial computer vision.", unlock: "Autonomous manufacturing monitoring, automated lab robotics.", obsidian: "011_Robotics_and_Automation", color: "#EC407A" },
  { id: "s12", code: "12", title: "Cybersecurity", category: "Reliability", purpose: "Device security, hardware root of trust, network security, zero-trust industrial security.", unlock: "Tamper-evident IIoT devices, compliant encrypted telemetry.", obsidian: "012_Cybersecurity", color: "#26C6DA" },
  { id: "s13", code: "13", title: "DevOps & SRE", category: "Reliability", purpose: "Production reliability, observability, CI/CD, infrastructure as code, zero-downtime.", unlock: "High-availability industrial uptime, automated firmware CI/CD pipelines.", obsidian: "013_Devops_Platforms_Engineering_SRE", color: "#26A69A" },
  { id: "s14", code: "14", title: "Supply Chain", category: "Domains", purpose: "Cold chain logistics, inventory management, warehouse operations, track-and-trace.", unlock: "Supply chain visibility solutions, cold chain monitoring products.", obsidian: "014_Supply_Chain", color: "#66BB6A" },
  { id: "s15", code: "15", title: "Systems Engineering", category: "Domains", purpose: "Requirements engineering, MBSE, verification & validation, system lifecycle.", unlock: "Mission-critical hardware/software integration rigor.", obsidian: "015_System_Engineering", color: "#9CCC65" },
  { id: "s16", code: "16", title: "Industrial Intelligence", category: "Domains", purpose: "Digital twins, predictive asset health, operational analytics, IIoT architecture.", unlock: "HIT core industrial platform thesis & digital twin architecture.", obsidian: "016_School_of_Industrial_Intelligence_Autonomous_Systems_Engineering", color: "#D4E157" },
  { id: "s17A", code: "17A", title: "Biomedical & Pharma", category: "Domains", purpose: "Pharma manufacturing, GxP, cleanrooms, bioprocess monitoring, lab automation.", unlock: "Pharmaceutical-grade cold chain & manufacturing monitoring.", obsidian: "017_Biomedical_Pharmaceutical_Knowledge", color: "#FFCA28" },
  { id: "s17B", code: "17B", title: "Regulatory Science", category: "Domains", purpose: "FDA 21 CFR Part 11, EU Annex 11, GAMP 5, ISO 13485, audit trails, compliance OS.", unlock: "Regulated industry trust, compliant software & hardware certification.", obsidian: "017_Regulatory_Science", color: "#FFA726" },
  { id: "s18", code: "18", title: "Research & IP", category: "Venture", purpose: "R&D methodology, paper synthesis, patent strategy, technical moat creation.", unlock: "Proprietary industrial IP & research-backed defensibility.", obsidian: "018_Research", color: "#8D6E63" },
  { id: "s19", code: "19", title: "Product Design", category: "Venture", purpose: "Industrial product design, UX for operators, enclosure engineering, design systems.", unlock: "Usable industrial hardware enclosures & operator dashboards.", obsidian: "019_Product Design", color: "#78909C" },
  { id: "s20", code: "20", title: "Business & Finance", category: "Venture", purpose: "Unit economics, pricing thesis, SaaS/hardware margin models, financial valuation.", unlock: "Commercial monetization strategy & industrial pricing models.", obsidian: "020_Business", color: "#5C6BC0" },
  { id: "s21", code: "21", title: "Innovation", category: "Venture", purpose: "Opportunity creation, technology transfer, market disruption mapping.", unlock: "High-value industrial market entry strategies.", obsidian: "021_Innovation", color: "#7E57C2" },
  { id: "s22", code: "22", title: "Leadership", category: "Venture", purpose: "Team building, culture of engineering excellence, board management, execution discipline.", unlock: "High-performance industrial R&D team leadership.", obsidian: "022_Leadership", color: "#EC407A" },
  { id: "s23", code: "23", title: "Entrepreneurship", category: "Venture", purpose: "Venture building, customer discovery, pitch design, fundraising, operational setup.", unlock: "HIT enterprise formation & venture scale execution.", obsidian: "023_Entrepreneurship", color: "#FF5252" },
  { id: "s24", code: "24", title: "Global Standards", category: "Domains", purpose: "GS1, ISO/IEC standards, OSHA, EPA environmental tracking, international compliance.", unlock: "Global interoperability & standard compliance certification.", obsidian: "024_Global_Standards", color: "#26A69A" },
  { id: "s25", code: "25", title: "Industry Domains", category: "Domains", purpose: "Food manufacturing, agriculture, healthcare infra, chemical processing, utilities.", unlock: "Domain-specific commercial market selection & GTM execution.", obsidian: "025_Industry_Domains", color: "#FFA726" }
];

const SKILLS_DATA = [
  { id: "sk01", code: "SK-PCB", title: "PCB Design", category: "Hardware", level: 3, schoolId: "s02", description: "Schematic capture, multi-layer routing, signal integrity, microcontrollers." },
  { id: "sk02", code: "SK-CKT", title: "Circuit Design & Sensing", category: "Hardware", level: 4, schoolId: "s02", description: "Precision analog front-ends, power regulation, sensor interfacing." },
  { id: "sk03", code: "SK-FW", title: "Embedded Firmware (C/C++)", category: "Embedded", level: 4, schoolId: "s03", description: "Bare-metal & RTOS firmware, peripheral drivers (SPI/I2C/UART), low-power sleep modes." },
  { id: "sk04", code: "SK-NET", title: "MQTT & Industrial Networks", category: "Connectivity", level: 3, schoolId: "s05", description: "Modbus RTU/TCP, CAN bus, LoRaWAN, MQTT broker architecture, TLS transport." },
  { id: "sk05", code: "SK-CLOUD", title: "Cloud Telemetry Platforms", category: "Platform", level: 3, schoolId: "s06", description: "Time-series data ingestion, Kubernetes deployments, serverless functions, API gateways." },
  { id: "sk06", code: "SK-DB", title: "Industrial Database Design", category: "Platform", level: 4, schoolId: "s08", description: "TimescaleDB, PostgreSQL schemas, audit log immutability, vector search indexing." },
  { id: "sk07", code: "SK-AI", title: "AI Anomaly Detection", category: "Intelligence", level: 3, schoolId: "s10", description: "Time-series ML models, edge inference, LLM RAG pipelines for regulatory documents." },
  { id: "sk08", code: "SK-REG", title: "Regulatory Intelligence", category: "Regulatory", level: 4, schoolId: "s17B", description: "FDA 21 CFR Part 11, GAMP 5, ISO 13485 audit trails, automated compliance mapping." },
  { id: "sk09", code: "SK-FOOD", title: "Food Safety Monitoring", category: "Domain", level: 2, schoolId: "s25", description: "HACCP compliance, environmental pathogen sensing, temperature excursion tracking." },
  { id: "sk10", code: "SK-BIZ", title: "Venture Building & Pricing", category: "Venture", level: 3, schoolId: "s20", description: "POEM evaluation, hardware-enabled SaaS pricing, pilot customer structuring." }
];

const SKILL_DEPENDENCIES = [
  { from: "sk02", to: "sk01" }, // Circuit -> PCB
  { from: "sk01", to: "sk03" }, // PCB -> Firmware
  { from: "sk03", to: "sk04" }, // Firmware -> MQTT/Networking
  { from: "sk04", to: "sk05" }, // Networking -> Cloud Telemetry
  { from: "sk05", to: "sk06" }, // Cloud -> Database
  { from: "sk06", to: "sk07" }, // Database -> AI Anomaly
  { from: "sk07", to: "sk08" }, // AI -> Regulatory
  { from: "sk08", to: "sk09" }, // Regulatory -> Food Safety
  { from: "sk08", to: "sk10" }  // Regulatory -> Venture Building
];

const MISSIONS_DATA = [
  {
    id: "m01",
    code: "M-COLD",
    title: "Smart Pharma Cold Chain Logger",
    productLineId: "p01",
    readiness: 45,
    summary: "Ultra-low power pharmaceutical temperature logger with BLE/NFC, cryptographic audit logs, and cloud excursion alerting.",
    schools: ["Electronics", "Embedded Systems", "Networking", "Cloud", "Biomedical Pharma", "Regulatory Science"],
    requiredSkills: ["Circuit Design & Sensing", "PCB Design", "Embedded Firmware (C/C++)", "MQTT & Industrial Networks", "Regulatory Intelligence"],
    unlockedSkills: ["Pharma Cold Chain Certification", "Excursion Analytics"],
    buildSteps: [
      { id: "bs1", text: "Design precision RTD temperature sensing circuit with ±0.1°C accuracy", completed: true },
      { id: "bs2", text: "Capture schematic & layout 2-layer compact PCB enclosure in KiCad", completed: true },
      { id: "bs3", text: "Develop C++ low-power firmware with cryptographic flash storage log", completed: false },
      { id: "bs4", text: "Integrate MQTT transport over BLE gateway to cloud dashboard", completed: false },
      { id: "bs5", text: "Map temperature excursion alerts to FDA 21 CFR Part 11 audit trails", completed: false }
    ],
    requiredEvidence: ["Circuit schematic PDF", "Firmware code repository", "Thermal test log", "Compliance mapping note"],
    obsidian: "03_Embedded_Systems/Final_Capstone_Projects/Smart_Pharmaceutical_Cold-Chain_Logger"
  },
  {
    id: "m02",
    code: "M-EDGE",
    title: "Industrial Edge Gateway",
    productLineId: "p02",
    readiness: 35,
    summary: "Rugged multi-protocol edge computing gateway converting Modbus/CAN bus telemetry into encrypted cloud MQTT streams.",
    schools: ["Embedded Systems", "Networking", "Cloud Engineering", "Cybersecurity", "DevOps & SRE"],
    requiredSkills: ["Embedded Firmware (C/C++)", "MQTT & Industrial Networks", "Cloud Telemetry Platforms"],
    unlockedSkills: ["Industrial Edge Architecture", "Hardware Security"],
    buildSteps: [
      { id: "bs1", text: "Configure RS-485 transceiver & Modbus RTU polling loop", completed: true },
      { id: "bs2", text: "Build secure dual-bank OTA firmware update engine", completed: false },
      { id: "bs3", text: "Implement TLS 1.3 mutual authentication for cloud telemetry", completed: false },
      { id: "bs4", text: "Containerize edge telemetry daemon for Yocto Linux image", completed: false }
    ],
    requiredEvidence: ["Modbus register map", "Gateway firmware GitHub repo", "Mutual TLS handshake test log"],
    obsidian: "05_Networking/Networking_Final_Projects/Advanced_Projects/Industrial_Edge_Gateway"
  },
  {
    id: "m03",
    code: "M-FOOD",
    title: "Food Safety Monitoring Device",
    productLineId: "p03",
    readiness: 25,
    summary: "Multi-sensor environmental pod tracking temperature, humidity, and gas indicators for food processing clean rooms.",
    schools: ["Electronics", "Embedded Systems", "Food Safety", "Global Standards", "Product Design"],
    requiredSkills: ["Circuit Design & Sensing", "Embedded Firmware (C/C++)", "Food Safety Monitoring"],
    unlockedSkills: ["HACCP Sensor Design"],
    buildSteps: [
      { id: "bs1", text: "Calibrate NDIR CO2 and precision humidity sensor array", completed: true },
      { id: "bs2", text: "Design IP67 water-resistant food-safe enclosure prototype", completed: false },
      { id: "bs3", text: "Create HACCP compliance rules engine for telemetry alerts", completed: false }
    ],
    requiredEvidence: ["Sensor calibration curve", "Enclosure 3D model STL", "HACCP rule spec"],
    obsidian: "025_Industry_Domains/Food_manufacturing"
  },
  {
    id: "m04",
    code: "M-REG",
    title: "AI Regulatory Assistant",
    productLineId: "p06",
    readiness: 50,
    summary: "Domain-specific AI RAG intelligence agent parsing FDA guidance, ISO standards, and regulatory filings for instant audit mapping.",
    schools: ["Software Engineering", "Databases", "AI Engineering", "Regulatory Science", "Research & IP"],
    requiredSkills: ["Industrial Database Design", "AI Anomaly Detection", "Regulatory Intelligence"],
    unlockedSkills: ["Automated Regulatory Mapping"],
    buildSteps: [
      { id: "bs1", text: "Build PDF document ingest & vector indexing pipeline for FDA CFR 21", completed: true },
      { id: "bs2", text: "Implement hybrid dense/sparse RAG query engine with citation tracking", completed: true },
      { id: "bs3", text: "Design inspection checklist generator & gap analysis dashboard", completed: false }
    ],
    requiredEvidence: ["Evaluation dataset benchmark", "API documentation", "Regulatory search test queries"],
    obsidian: "07_SE/Module_5_Software_Architecture/Projects/AI_Regulatory_Assistant"
  },
  {
    id: "m05",
    code: "M-WH",
    title: "Warehouse Environmental Monitoring System",
    productLineId: "p04",
    readiness: 30,
    summary: "Mesh network of wireless environmental nodes providing 3D micro-climate thermal mapping for logistics warehouses.",
    schools: ["Electronics", "Networking", "Cloud Engineering", "Supply Chain", "Business & Finance"],
    requiredSkills: ["MQTT & Industrial Networks", "Cloud Telemetry Platforms", "Venture Building & Pricing"],
    unlockedSkills: ["Microclimate Thermal Analytics"],
    buildSteps: [
      { id: "bs1", text: "Deploy 10-node LoRaWAN mesh testbed across storage zones", completed: true },
      { id: "bs2", text: "Build 3D warehouse thermal heatmap dashboard rendering engine", completed: false },
      { id: "bs3", text: "Calculate HVAC energy optimization & ROI thesis model", completed: false }
    ],
    requiredEvidence: ["Mesh network packet loss log", "Thermal dashboard screenshot", "ROI financial calculator"],
    obsidian: "03_Embedded_Systems/Final_Capstone_Projects/Warehouse_Environmental_Monitoring_System"
  },
  {
    id: "m06",
    code: "M-PHARMA",
    title: "National Drug Registration Platform",
    productLineId: "p05",
    readiness: 40,
    summary: "Enterprise regulatory operating system managing drug dossier submissions, inspection workflows, and manufacturer license tracking.",
    schools: ["Software Engineering", "Databases", "Regulatory Science", "Cybersecurity", "Leadership"],
    requiredSkills: ["Industrial Database Design", "Regulatory Intelligence", "Venture Building & Pricing"],
    unlockedSkills: ["Regulatory Platform Architecture"],
    buildSteps: [
      { id: "bs1", text: "Model relational database schema for drug dossiers & electronic submission CTD format", completed: true },
      { id: "bs2", text: "Build multi-tenant inspector workflow portal with cryptographic signatures", completed: false },
      { id: "bs3", text: "Publish GAMP 5 computer system validation memo", completed: false }
    ],
    requiredEvidence: ["PostgreSQL DDL schema", "Submission portal workflow map", "Validation strategy memo"],
    obsidian: "07_SE/Module_5_Software_Architecture/Projects/National_Drug_Registration_Platform"
  }
];

const PRODUCT_LINES_DATA = [
  {
    id: "p01",
    code: "HIT-COLD",
    name: "HIT Cold Chain Intelligence",
    tagline: "End-to-end continuous thermal telemetry & excursion compliance for pharmaceutical & food logistics.",
    summary: "Combines ultra-low-power edge hardware loggers with cloud excursion prediction algorithms and automated FDA 21 CFR Part 11 audit reports.",
    customerSegments: ["Pharma Manufacturers", "Cold Chain Logistics", "Blood Banks", "High-Value Food Wholesalers"],
    marketThesis: "Regulated cold chains lose $35B annually in product degradation. Automated tamper-proof telemetry converts regulatory burden into operational ROI.",
    mvpScope: "BLE/NFC logger pod + Gateway + Cloud excursion alert portal with automated PDF audit trail generation.",
    deploymentPath: "Direct pilot deployment with regional pharma distributor.",
    status: "PROTOTYPE"
  },
  {
    id: "p02",
    code: "HIT-EDGE",
    name: "HIT Industrial Edge Devices",
    tagline: "Ruggedized multi-protocol gateways & sensor nodes for harsh industrial environments.",
    summary: "Secure edge hardware bridges connecting legacy Modbus/CAN industrial equipment to modern cloud telemetry and AI anomaly detection.",
    customerSegments: ["Industrial Manufacturing", "Chemical Processing", "Utilities", "Automation Integrators"],
    marketThesis: "80% of factory equipment lacks modern network interfaces. Retrofit edge gateways unlock data without replacing expensive machinery.",
    mvpScope: "Dual RS-485 / CAN gateway running Yocto Linux with mutual TLS MQTT telemetry stream.",
    deploymentPath: "OEM partnership with factory automation vendor.",
    status: "PROTOTYPE"
  },
  {
    id: "p03",
    code: "HIT-FOOD",
    name: "HIT Food Safety Monitoring",
    tagline: "Pathogen, gas, and micro-climate surveillance for food processing facilities.",
    summary: "Continuous HACCP compliance platform using calibrated multi-sensor pods to prevent contamination and batch spoilage.",
    customerSegments: ["Food Manufacturing Plants", "Dairy Processors", "Meat Processing Facilities"],
    marketThesis: "Food recalls average $10M+ in direct costs. Real-time environmental monitoring prevents contamination before packaging.",
    mvpScope: "IP67 gas & humidity sensor pod + HACCP compliance dashboard.",
    deploymentPath: "Pilot trial in regional dairy packaging facility.",
    status: "CONCEPT"
  },
  {
    id: "p04",
    code: "HIT-SUPPLY",
    name: "HIT Supply Chain Intelligence",
    tagline: "3D environmental telemetry & predictive condition monitoring across warehouses & transit.",
    summary: "Wireless mesh sensor network delivering continuous visibility into warehouse microclimates, thermal degradation, and transit risks.",
    customerSegments: ["3PL Logistics Providers", "Enterprise Warehouses", "Port Logistics Authorities"],
    marketThesis: "Warehouse thermal hotspots cause silent inventory degradation. 3D spatial telemetry optimizes climate control and preserves goods.",
    mvpScope: "10-node mesh testbed + 3D thermal spatial visualization platform.",
    deploymentPath: "Deployment with enterprise 3PL logistics warehouse.",
    status: "PROTOTYPE"
  },
  {
    id: "p05",
    code: "HIT-PHARMA",
    name: "HIT Pharma Compliance Platform",
    tagline: "Digital compliance operating system for pharmaceutical registration & licensing.",
    summary: "Streamlines drug dossier applications, GxP inspection workflows, and manufacturer license tracking with immutable audit trails.",
    customerSegments: ["National Regulatory Authorities", "Pharma QA/RA Departments", "Contract Manufacturing Orgs"],
    marketThesis: "Manual drug registration delays essential medicine launches by up to 18 months. Digital submission platforms accelerate market access.",
    mvpScope: "eCTD dossier submission portal + Inspector review workflow engine.",
    deploymentPath: "SaaS deployment for national health ministry pilot.",
    status: "PROTOTYPE"
  },
  {
    id: "p06",
    code: "HIT-REG",
    name: "HIT Regulatory Intelligence Platform",
    tagline: "AI-driven regulatory assistant & automated compliance mapping engine.",
    summary: "Domain-adapted RAG AI engine that analyzes regulatory standards, FDA guidance documents, and international filings for fast compliance design.",
    customerSegments: ["Regulated Hardware Startups", "Pharma Consultants", "Medical Device Manufacturers"],
    marketThesis: "Regulatory compliance consulting costs $300+/hour. Automated AI regulatory search cuts verification time by 80%.",
    mvpScope: "FDA 21 CFR vector search RAG engine + Gap analysis report generator.",
    deploymentPath: "Self-service web platform for industrial founders & engineers.",
    status: "PROTOTYPE"
  },
  {
    id: "p07",
    code: "HIT-HEALTH",
    name: "HIT Healthcare Infrastructure Intelligence",
    tagline: "Hospital & lab environmental surveillance, medical equipment telemetry, and infrastructure health.",
    summary: "Integrated monitoring suite for hospital cleanrooms, blood storage units, surgical suites, and critical healthcare assets.",
    customerSegments: ["Hospitals & Medical Centers", "Clinical Trial Labs", "Biotech Research Facilities"],
    marketThesis: "Healthcare infrastructure failure risks patient safety and research samples. Automated telemetry guarantees continuous compliance.",
    mvpScope: "Hospital lab sensor network + Real-time alert dispatch server.",
    deploymentPath: "Pilot partnership with regional medical center.",
    status: "CONCEPT"
  }
];

const FOUNDER_TRAITS_DATA = [
  { id: "t01", code: "TRAIT-SYS", name: "Systems Thinking", score: 68, target: 100, description: "Decomposing complex industrial systems into interconnected physics, hardware, software, and regulatory layers." },
  { id: "t02", code: "TRAIT-HW", name: "Hardware Patience", score: 45, target: 100, description: "Discipline to carefully breadboard, instrument, layout PCBs, test signals, and respect physical realities." },
  { id: "t03", code: "TRAIT-DBG", name: "Debugging Discipline", score: 58, target: 100, description: "Systematic root-cause diagnosis using empirical logs, trace scopes, and logic analyzers without guessing." },
  { id: "t04", code: "TRAIT-RES", name: "Research Depth", score: 62, target: 100, description: "Ability to read datasheets, academic literature, RFCs, and regulatory standards to build proprietary IP." },
  { id: "t05", code: "TRAIT-PRD", name: "Product Judgment", score: 50, target: 100, description: "Uncompromising focus on usable, robust product design that solves real operator pain over technical vanity." },
  { id: "t06", code: "TRAIT-CRG", name: "Technical Courage", score: 55, target: 100, description: "Willingness to build complex hardware, low-level firmware, and deep regulatory systems in hard domains." },
  { id: "t07", code: "TRAIT-OPS", name: "Operational Discipline", score: 52, target: 100, description: "Execution rigor, CI/CD automated testing, documentation standards, and production reliability." },
  { id: "t08", code: "TRAIT-REG", name: "Regulatory Reasoning", score: 60, target: 100, description: "Translating FDA, ISO, and GAMP compliance requirements directly into system architectural constraints." },
  { id: "t09", code: "TRAIT-CLR", name: "Founder Clarity", score: 48, target: 100, description: "Sharp articulation of customer pain, value proposition, pricing thesis, business model, and strategic moat." },
  { id: "t10", code: "TRAIT-LDR", name: "Leadership Maturity", score: 42, target: 100, description: "Team building, culture of engineering excellence, strategic vision alignment, and enterprise execution." }
];

const INITIAL_EVIDENCE = [
  {
    id: "ev-01",
    title: "RTD Sensor Front-End Breadboard Test",
    type: "Test log",
    missionId: "m01",
    schoolId: "s02",
    skillId: "sk02",
    productLineId: "p01",
    link: "https://github.com/hit-industrial/cold-chain-logger/tests/rtd_front_end.log",
    notes: "Verified MAX31865 RTD amplifier SPI interface with PT100 sensor. Recorded temperature stability over 12 hours with ±0.05°C noise floor.",
    tags: ["hardware", "sensors", "pharma"],
    date: "2026-08-10"
  },
  {
    id: "ev-02",
    title: "FDA 21 CFR Part 11 Audit Trail Vector Embeddings",
    type: "Research source",
    missionId: "m04",
    schoolId: "s17B",
    skillId: "sk08",
    productLineId: "p06",
    link: "https://www.fda.gov/regulatory-information/search-fda-guidance-documents/part-11-electronic-records-electronic-signatures-scope-and-application",
    notes: "Indexed FDA guidance on electronic signatures into vector database. Verified retrieval precision of 94% on compliance queries.",
    tags: ["ai", "regulatory", "fda"],
    date: "2026-08-08"
  },
  {
    id: "ev-03",
    title: "Modbus RTU to MQTT Gateway Firmware",
    type: "Firmware/code",
    missionId: "m02",
    schoolId: "s03",
    skillId: "sk03",
    productLineId: "p02",
    link: "https://github.com/hit-industrial/edge-gateway-firmware",
    notes: "Implemented non-blocking Modbus master state machine on ESP32 RTOS. Successfully polled 16 registers at 10Hz and published MQTT telemetry payload.",
    tags: ["embedded", "mqtt", "modbus"],
    date: "2026-08-05"
  }
];

// --- 2. LOCAL STORAGE MANAGEMENT ---

const STORAGE_KEYS = {
  EVIDENCE: "hit_founder_os_evidence_v2",
  MISSIONS: "hit_founder_os_missions_v2",
  TRAITS: "hit_founder_os_traits_v2",
  UNITS: "hit_founder_os_units_v2"
};

function loadState(key, defaultData) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : defaultData;
  } catch (e) {
    console.error("Error loading state for key:", key, e);
    return defaultData;
  }
}

function saveState(key, data) {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (e) {
    console.error("Error saving state for key:", key, e);
  }
}

// Global mutable app state
let state = {
  evidence: loadState(STORAGE_KEYS.EVIDENCE, INITIAL_EVIDENCE),
  missions: loadState(STORAGE_KEYS.MISSIONS, MISSIONS_DATA),
  traits: loadState(STORAGE_KEYS.TRAITS, FOUNDER_TRAITS_DATA),
  learningUnits: loadState(STORAGE_KEYS.UNITS, {}),
  activeSchoolId: "s02",
  activeMissionId: "m01",
  activeProductLineId: "p01"
};

// --- 3. DOM ELEMENTS ---

const elements = {
  // Navigation & Metrics
  navLinks: document.querySelectorAll(".nav-list a"),
  totalNotesMetric: document.querySelector("#metricNotes"),
  totalUnitsMetric: document.querySelector("#metricUnits"),
  activeMissionsMetric: document.querySelector("#metricMissions"),
  readinessScoreMetric: document.querySelector("#metricReadiness"),
  
  // World Map Canvas & Drawer
  mapCanvas: document.querySelector("#mapCanvas"),
  schoolCategoryFilter: document.querySelector("#schoolCategoryFilter"),
  schoolSearchInput: document.querySelector("#schoolSearchInput"),
  schoolsGrid: document.querySelector("#schoolsGrid"),
  schoolDrawer: document.querySelector("#schoolDrawer"),
  closeDrawerBtn: document.querySelector("#closeDrawerBtn"),
  
  // Skill Tree Canvas
  skillCanvas: document.querySelector("#skillCanvas"),
  skillsList: document.querySelector("#skillsList"),
  
  // Missions
  missionSortBtn: document.querySelector("#missionSortBtn"),
  missionsGrid: document.querySelector("#missionsGrid"),
  
  // Evidence Vault
  evidenceForm: document.querySelector("#evidenceForm"),
  evidenceMissionSelect: document.querySelector("#evidenceMissionSelect"),
  evidenceSchoolSelect: document.querySelector("#evidenceSchoolSelect"),
  evidenceSkillSelect: document.querySelector("#evidenceSkillSelect"),
  evidenceProductSelect: document.querySelector("#evidenceProductSelect"),
  evidenceTypeSelect: document.querySelector("#evidenceTypeSelect"),
  evidenceTitleInput: document.querySelector("#evidenceTitleInput"),
  evidenceLinkInput: document.querySelector("#evidenceLinkInput"),
  evidenceNotesInput: document.querySelector("#evidenceNotesInput"),
  evidenceSearchInput: document.querySelector("#evidenceSearchInput"),
  evidenceFilterTypeSelect: document.querySelector("#evidenceFilterTypeSelect"),
  evidenceGrid: document.querySelector("#evidenceGrid"),
  
  // Founder Character Sheet
  radarCanvas: document.querySelector("#radarCanvas"),
  traitsGrid: document.querySelector("#traitsGrid"),
  logTraitBtn: document.querySelector("#logTraitBtn"),
  
  // Products
  productsGrid: document.querySelector("#productsGrid"),
  
  // Backup / Data Controls
  exportDataBtn: document.querySelector("#exportDataBtn"),
  importDataInput: document.querySelector("#importDataInput"),
  resetSeedDataBtn: document.querySelector("#resetSeedDataBtn")
};

// --- 4. COMPUTED METRICS & HELPERS ---

function getObsidianUrl(path) {
  return `obsidian://open?vault=HIT_Knowledge_Stack&file=${encodeURIComponent(path)}`;
}

function calculateOverallReadiness() {
  if (!state.missions.length) return 0;
  const sum = state.missions.reduce((acc, m) => acc + m.readiness, 0);
  return Math.round(sum / state.missions.length);
}

function calculateTraitAverage() {
  if (!state.traits.length) return 0;
  const sum = state.traits.reduce((acc, t) => acc + t.score, 0);
  return Math.round(sum / state.traits.length);
}

function updateTopMetrics() {
  if (elements.totalNotesMetric) elements.totalNotesMetric.textContent = state.evidence.length;
  if (elements.activeMissionsMetric) elements.activeMissionsMetric.textContent = state.missions.length;
  if (elements.readinessScoreMetric) elements.readinessScoreMetric.textContent = `${calculateOverallReadiness()}%`;
}

// --- 5. RENDERERS ---

// A. World Map Canvas Renderer
function drawWorldMap() {
  const canvas = elements.mapCanvas;
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  const ratio = window.devicePixelRatio || 1;
  const rect = canvas.getBoundingClientRect();

  canvas.width = Math.max(1, Math.floor(rect.width * ratio));
  canvas.height = Math.max(1, Math.floor(rect.height * ratio));
  ctx.scale(ratio, ratio);

  const width = rect.width;
  const height = rect.height;

  ctx.clearRect(0, 0, width, height);

  // Background
  ctx.fillStyle = "#0B0F12";
  ctx.fillRect(0, 0, width, height);

  // Grid background lines
  ctx.lineWidth = 1;
  ctx.strokeStyle = "rgba(0, 229, 255, 0.05)";
  const gridSize = 40;
  for (let x = 0; x < width; x += gridSize) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, height);
    ctx.stroke();
  }
  for (let y = 0; y < height; y += gridSize) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(width, y);
    ctx.stroke();
  }

  // Draw Schools as interconnected stages
  const categories = [
    { name: "Foundations", color: "#FFB300", schools: SCHOOLS_DATA.filter(s => s.category === "Foundations") },
    { name: "Hardware", color: "#FF5252", schools: SCHOOLS_DATA.filter(s => s.category === "Hardware") },
    { name: "Connectivity", color: "#26A69A", schools: SCHOOLS_DATA.filter(s => s.category === "Connectivity") },
    { name: "Platform", color: "#42A5F5", schools: SCHOOLS_DATA.filter(s => s.category === "Platform") },
    { name: "Intelligence", color: "#AB47BC", schools: SCHOOLS_DATA.filter(s => s.category === "Intelligence") },
    { name: "Domains", color: "#FFA726", schools: SCHOOLS_DATA.filter(s => s.category === "Domains") },
    { name: "Venture", color: "#FF5252", schools: SCHOOLS_DATA.filter(s => s.category === "Venture") }
  ];

  const colWidth = width / (categories.length + 0.5);
  const nodeCoords = {};

  // Compute node coordinates
  categories.forEach((cat, colIdx) => {
    const x = colWidth * (colIdx + 0.7);
    const totalInCat = cat.schools.length;
    const startY = height * 0.2;
    const stepY = (height * 0.65) / Math.max(1, totalInCat - 1 || 1);

    cat.schools.forEach((s, rowIdx) => {
      const y = totalInCat === 1 ? height * 0.5 : startY + stepY * rowIdx;
      nodeCoords[s.id] = { x, y, school: s, color: cat.color };
    });
  });

  // Draw connecting energy lines between stages
  ctx.lineWidth = 2;
  const keys = Object.keys(nodeCoords);
  for (let i = 0; i < keys.length - 1; i++) {
    const curr = nodeCoords[keys[i]];
    const next = nodeCoords[keys[i + 1]];
    if (curr && next && Math.abs(curr.x - next.x) < colWidth * 1.5) {
      const gradient = ctx.createLinearGradient(curr.x, curr.y, next.x, next.y);
      gradient.addColorStop(0, curr.color);
      gradient.addColorStop(1, next.color);

      ctx.strokeStyle = gradient;
      ctx.globalAlpha = 0.25;
      ctx.beginPath();
      ctx.moveTo(curr.x, curr.y);
      ctx.bezierCurveTo((curr.x + next.x) / 2, curr.y, (curr.x + next.x) / 2, next.y, next.x, next.y);
      ctx.stroke();
      ctx.globalAlpha = 1.0;
    }
  }

  // Draw Nodes
  keys.forEach(key => {
    const node = nodeCoords[key];
    const isSelected = state.activeSchoolId === node.school.id;

    // Outer glow for selected node
    if (isSelected) {
      ctx.shadowColor = node.color;
      ctx.shadowBlur = 16;
    }

    ctx.fillStyle = isSelected ? node.color : "#141E28";
    ctx.strokeStyle = node.color;
    ctx.lineWidth = isSelected ? 3 : 2;

    ctx.beginPath();
    ctx.arc(node.x, node.y, isSelected ? 18 : 14, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    ctx.shadowBlur = 0; // Reset shadow

    // Text Label
    ctx.fillStyle = isSelected ? "#FFFFFF" : "#94A3B8";
    ctx.font = isSelected ? "700 12px Inter, sans-serif" : "600 11px Inter, sans-serif";
    ctx.textAlign = "center";
    ctx.fillText(`${node.school.code} ${node.school.title.split(" ")[0]}`, node.x, node.y + (isSelected ? 32 : 28));
  });
}

// B. Skill Tree Canvas Renderer
function drawSkillTree() {
  const canvas = elements.skillCanvas;
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  const ratio = window.devicePixelRatio || 1;
  const rect = canvas.getBoundingClientRect();

  canvas.width = Math.max(1, Math.floor(rect.width * ratio));
  canvas.height = Math.max(1, Math.floor(rect.height * ratio));
  ctx.scale(ratio, ratio);

  const width = rect.width;
  const height = rect.height;

  ctx.clearRect(0, 0, width, height);

  ctx.fillStyle = "#0B0F12";
  ctx.fillRect(0, 0, width, height);

  // Position skills horizontally across tree levels
  const skillCoords = {};
  const marginX = 80;
  const stepX = (width - marginX * 2) / 5;

  SKILLS_DATA.forEach((sk, idx) => {
    const col = idx % 5;
    const row = Math.floor(idx / 5);
    const x = marginX + col * stepX;
    const y = 80 + row * 130;
    skillCoords[sk.id] = { x, y, skill: sk };
  });

  // Draw skill dependency edges
  SKILL_DEPENDENCIES.forEach(dep => {
    const fromNode = skillCoords[dep.from];
    const toNode = skillCoords[dep.to];
    if (fromNode && toNode) {
      ctx.strokeStyle = "#00E5FF";
      ctx.lineWidth = 2;
      ctx.globalAlpha = 0.4;
      ctx.beginPath();
      ctx.moveTo(fromNode.x, fromNode.y);
      ctx.lineTo(toNode.x, toNode.y);
      ctx.stroke();
      ctx.globalAlpha = 1.0;
    }
  });

  // Draw skill nodes
  Object.keys(skillCoords).forEach(id => {
    const node = skillCoords[id];
    ctx.fillStyle = "#141E28";
    ctx.strokeStyle = "#00E5FF";
    ctx.lineWidth = 2;

    ctx.beginPath();
    ctx.roundRect(node.x - 65, node.y - 25, 130, 50, 8);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = "#00E5FF";
    ctx.font = "800 11px Inter, sans-serif";
    ctx.textAlign = "center";
    ctx.fillText(node.skill.code, node.x, node.y - 6);

    ctx.fillStyle = "#F8FAFC";
    ctx.font = "600 12px Inter, sans-serif";
    ctx.fillText(node.skill.title, node.x, node.y + 12);
  });
}

// C. Founder Radar Chart Renderer
function drawFounderRadar() {
  const canvas = elements.radarCanvas;
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  const ratio = window.devicePixelRatio || 1;
  const rect = canvas.getBoundingClientRect();

  canvas.width = Math.max(1, Math.floor(rect.width * ratio));
  canvas.height = Math.max(1, Math.floor(rect.height * ratio));
  ctx.scale(ratio, ratio);

  const width = rect.width;
  const height = rect.height;
  const centerX = width / 2;
  const centerY = height / 2;
  const radius = Math.min(width, height) * 0.38;

  ctx.clearRect(0, 0, width, height);

  const traits = state.traits;
  const numPoints = traits.length;
  const angleStep = (Math.PI * 2) / numPoints;

  // Concentric radar rings
  ctx.lineWidth = 1;
  ctx.strokeStyle = "rgba(0, 229, 255, 0.15)";
  [0.25, 0.5, 0.75, 1.0].forEach(r => {
    ctx.beginPath();
    for (let i = 0; i < numPoints; i++) {
      const angle = i * angleStep - Math.PI / 2;
      const x = centerX + Math.cos(angle) * (radius * r);
      const y = centerY + Math.sin(angle) * (radius * r);
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.closePath();
    ctx.stroke();
  });

  // Radar axis lines
  for (let i = 0; i < numPoints; i++) {
    const angle = i * angleStep - Math.PI / 2;
    const x = centerX + Math.cos(angle) * radius;
    const y = centerY + Math.sin(angle) * radius;
    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.lineTo(x, y);
    ctx.stroke();

    // Trait Label
    const labelX = centerX + Math.cos(angle) * (radius + 28);
    const labelY = centerY + Math.sin(angle) * (radius + 24);
    ctx.fillStyle = "#94A3B8";
    ctx.font = "600 11px Inter, sans-serif";
    ctx.textAlign = "center";
    ctx.fillText(traits[i].name.split(" ")[0], labelX, labelY);
  }

  // Draw Awakened Trait Polygon
  ctx.beginPath();
  traits.forEach((t, i) => {
    const angle = i * angleStep - Math.PI / 2;
    const valueRatio = t.score / 100;
    const x = centerX + Math.cos(angle) * (radius * valueRatio);
    const y = centerY + Math.sin(angle) * (radius * valueRatio);
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  });
  ctx.closePath();

  const fillGradient = ctx.createRadialGradient(centerX, centerY, 10, centerX, centerY, radius);
  fillGradient.addColorStop(0, "rgba(0, 229, 255, 0.45)");
  fillGradient.addColorStop(1, "rgba(0, 255, 157, 0.15)");

  ctx.fillStyle = fillGradient;
  ctx.fill();
  ctx.lineWidth = 2;
  ctx.strokeStyle = "#00E5FF";
  ctx.stroke();

  // Draw points on polygon
  traits.forEach((t, i) => {
    const angle = i * angleStep - Math.PI / 2;
    const valueRatio = t.score / 100;
    const x = centerX + Math.cos(angle) * (radius * valueRatio);
    const y = centerY + Math.sin(angle) * (radius * valueRatio);

    ctx.fillStyle = "#00FF9D";
    ctx.beginPath();
    ctx.arc(x, y, 4, 0, Math.PI * 2);
    ctx.fill();
  });
}

// D. Render School Catalog Cards
function renderSchools(filterCategory = "All", searchQuery = "") {
  if (!elements.schoolsGrid) return;

  const normalizedQuery = searchQuery.trim().toLowerCase();
  const filtered = SCHOOLS_DATA.filter(s => {
    const matchesCategory = filterCategory === "All" || s.category === filterCategory;
    const matchesSearch = `${s.code} ${s.title} ${s.purpose} ${s.unlock}`.toLowerCase().includes(normalizedQuery);
    return matchesCategory && matchesSearch;
  });

  elements.schoolsGrid.innerHTML = filtered
    .map(s => {
      const isSelected = s.id === state.activeSchoolId;
      return `
        <article class="school-card ${isSelected ? "selected" : ""}" data-id="${s.id}">
          <div class="card-head">
            <span class="school-code" style="color: ${s.color}">${s.code}</span>
            <span class="category-badge">${s.category}</span>
          </div>
          <h3>${s.title}</h3>
          <p class="purpose">${s.purpose}</p>
          <div class="unlock-block">
            <strong>Capability Unlock:</strong>
            <p>${s.unlock}</p>
          </div>
          <div class="card-actions">
            <button class="primary-action inspect-school-btn" data-id="${s.id}">Inspect School</button>
            <a class="secondary-action" href="${getObsidianUrl(s.obsidian)}">Obsidian</a>
          </div>
        </article>
      `;
    })
    .join("");
}

// E. Render School Drawer (4-Level Learning Units)
function openSchoolDrawer(schoolId) {
  const school = SCHOOLS_DATA.find(s => s.id === schoolId);
  if (!school || !elements.schoolDrawer) return;

  state.activeSchoolId = schoolId;
  drawWorldMap(); // Refresh canvas node selection

  const drawerTitle = elements.schoolDrawer.querySelector("#drawerTitle");
  const drawerPurpose = elements.schoolDrawer.querySelector("#drawerPurpose");
  const drawerBody = elements.schoolDrawer.querySelector("#drawerBody");

  if (drawerTitle) drawerTitle.textContent = `${school.code} - ${school.title}`;
  if (drawerPurpose) drawerPurpose.textContent = school.purpose;

  // Render 4-Level Learning Units
  drawerBody.innerHTML = `
    <div class="learning-levels-wrapper">
      <div class="level-tabs">
        <button class="level-tab active" data-level="l1">Level 1: Theory</button>
        <button class="level-tab" data-level="l2">Level 2: Engineering</button>
        <button class="level-tab" data-level="l3">Level 3: Research</button>
        <button class="level-tab" data-level="l4">Level 4: Founder Thinking</button>
      </div>

      <div class="level-content-pane active" id="l1-pane">
        <h4>Level 1 — Fundamental Theory & Principles</h4>
        <p>Master definitions, foundational physics, mathematical limits, and core mental models.</p>
        <ul class="unit-checklist">
          <li><label><input type="checkbox" checked /> First-Principles Decomposition of ${school.title}</label></li>
          <li><label><input type="checkbox" /> Mathematical foundations & order-of-magnitude bounds</label></li>
          <li><label><input type="checkbox" /> Key definitions & system architecture paradigms</label></li>
        </ul>
      </div>

      <div class="level-content-pane" id="l2-pane" style="display:none">
        <h4>Level 2 — Engineering & Implementation</h4>
        <p>Build schematics, code, circuit boards, firmware drivers, and functional prototypes.</p>
        <ul class="unit-checklist">
          <li><label><input type="checkbox" checked /> Design & implement core engineering block</label></li>
          <li><label><input type="checkbox" /> System trade-off analysis & optimization log</label></li>
          <li><label><input type="checkbox" /> Debugging & empirical signal measurement</label></li>
        </ul>
      </div>

      <div class="level-content-pane" id="l3-pane" style="display:none">
        <h4>Level 3 — Research & State-of-the-Art</h4>
        <p>Read primary datasheets, landmark papers, ISO/FDA standards, and technical RFCs.</p>
        <ul class="unit-checklist">
          <li><label><input type="checkbox" /> Read landmark paper & component datasheet</label></li>
          <li><label><input type="checkbox" /> Benchmark industry state-of-the-art implementations</label></li>
        </ul>
      </div>

      <div class="level-content-pane" id="l4-pane" style="display:none">
        <h4>Level 4 — Founder Thinking (POEM Framework)</h4>
        <p>Evaluate commercial viability, customer pain, pricing moat, and productization path.</p>
        <div class="poem-grid">
          <div class="poem-card"><strong>P - Problem:</strong> What industrial pain exists in ${school.title}?</div>
          <div class="poem-card"><strong>O - Owner:</strong> Who pays for the solution?</div>
          <div class="poem-card"><strong>E - Economics:</strong> What is the value & pricing model?</div>
          <div class="poem-card"><strong>M - Moat:</strong> What is the defensible technical advantage?</div>
        </div>
      </div>
    </div>
  `;

  elements.schoolDrawer.classList.add("open");

  // Tab switching inside drawer
  const tabs = drawerBody.querySelectorAll(".level-tab");
  tabs.forEach(tab => {
    tab.addEventListener("click", () => {
      tabs.forEach(t => t.classList.remove("active"));
      tab.classList.add("active");
      const targetLevel = tab.dataset.level;
      drawerBody.querySelectorAll(".level-content-pane").forEach(pane => {
        pane.style.display = pane.id === `${targetLevel}-pane` ? "block" : "none";
      });
    });
  });
}

// F. Render Mission Cards & Checklist
function renderMissions(sorted = false) {
  if (!elements.missionsGrid) return;

  const list = sorted ? [...state.missions].sort((a, b) => b.readiness - a.readiness) : state.missions;

  elements.missionsGrid.innerHTML = list
    .map(m => {
      const product = PRODUCT_LINES_DATA.find(p => p.id === m.productLineId);
      return `
        <article class="mission-card" data-id="${m.id}">
          <div class="mission-head">
            <div>
              <span class="mission-code">${m.code}</span>
              <h3>${m.title}</h3>
            </div>
            <div class="readiness-badge">${m.readiness}% READY</div>
          </div>
          <p class="summary">${m.summary}</p>
          <div class="product-link">
            <span>Targets Product Line:</span>
            <strong>${product ? product.name : "HIT Product Line"}</strong>
          </div>
          <div class="build-steps-block">
            <strong>Build Steps (${m.buildSteps.filter(s => s.completed).length}/${m.buildSteps.length}):</strong>
            <ul class="step-list">
              ${m.buildSteps
                .map(
                  (step, idx) => `
                <li>
                  <label>
                    <input type="checkbox" class="step-checkbox" data-mission-id="${m.id}" data-step-idx="${idx}" ${step.completed ? "checked" : ""} />
                    <span class="${step.completed ? "completed" : ""}">${step.text}</span>
                  </label>
                </li>
              `
                )
                .join("")}
            </ul>
          </div>
          <div class="progress">
            <i style="width: ${m.readiness}%"></i>
          </div>
        </article>
      `;
    })
    .join("");

  // Attach step toggle events
  document.querySelectorAll(".step-checkbox").forEach(chk => {
    chk.addEventListener("change", e => {
      const missionId = e.target.dataset.missionId;
      const stepIdx = Number(e.target.dataset.stepIdx);
      const mission = state.missions.find(m => m.id === missionId);

      if (mission) {
        mission.buildSteps[stepIdx].completed = e.target.checked;
        const completedCount = mission.buildSteps.filter(s => s.completed).length;
        mission.readiness = Math.round((completedCount / mission.buildSteps.length) * 100);

        saveState(STORAGE_KEYS.MISSIONS, state.missions);
        renderMissions();
        updateTopMetrics();
      }
    });
  });
}

// G. Render Evidence Vault
function populateSelects() {
  if (elements.evidenceMissionSelect) {
    elements.evidenceMissionSelect.innerHTML = state.missions.map(m => `<option value="${m.id}">${m.title}</option>`).join("");
  }
  if (elements.evidenceSchoolSelect) {
    elements.evidenceSchoolSelect.innerHTML = SCHOOLS_DATA.map(s => `<option value="${s.id}">${s.code} - ${s.title}</option>`).join("");
  }
  if (elements.evidenceSkillSelect) {
    elements.evidenceSkillSelect.innerHTML = SKILLS_DATA.map(sk => `<option value="${sk.id}">${sk.title}</option>`).join("");
  }
  if (elements.evidenceProductSelect) {
    elements.evidenceProductSelect.innerHTML = PRODUCT_LINES_DATA.map(p => `<option value="${p.id}">${p.name}</option>`).join("");
  }
}

function renderEvidence(searchQuery = "", filterType = "All") {
  if (!elements.evidenceGrid) return;

  const normalized = searchQuery.trim().toLowerCase();
  const filtered = state.evidence.filter(item => {
    const matchesType = filterType === "All" || item.type === filterType;
    const matchesSearch = `${item.title} ${item.notes} ${item.tags.join(" ")}`.toLowerCase().includes(normalized);
    return matchesType && matchesSearch;
  });

  if (!filtered.length) {
    elements.evidenceGrid.innerHTML = `
      <article class="empty-state">
        <h3>No evidence items found</h3>
        <p>Log a YouTube video, PDF datasheet, firmware code link, or test log to prove your work.</p>
      </article>
    `;
    return;
  }

  elements.evidenceGrid.innerHTML = filtered
    .map(
      (item, idx) => `
      <article class="evidence-card">
        <div class="evidence-head">
          <span class="evidence-type">${item.type}</span>
          <span class="evidence-date">${item.date}</span>
        </div>
        <h3>${item.title}</h3>
        ${item.link ? `<p class="evidence-link"><a href="${item.link}" target="_blank" rel="noopener">🔗 ${item.link}</a></p>` : ""}
        <p class="notes">${item.notes}</p>
        <div class="tag-row">
          ${item.tags.map(t => `<span class="tag">#${t}</span>`).join("")}
        </div>
        <button class="delete-evidence-btn text-action" data-idx="${idx}">Delete Item</button>
      </article>
    `
    )
    .join("");

  // Delete event listeners
  document.querySelectorAll(".delete-evidence-btn").forEach(btn => {
    btn.addEventListener("click", e => {
      const idx = Number(e.target.dataset.idx);
      state.evidence.splice(idx, 1);
      saveState(STORAGE_KEYS.EVIDENCE, state.evidence);
      renderEvidence();
      updateTopMetrics();
    });
  });
}

// H. Render Founder Character Traits Grid
function renderTraits() {
  if (!elements.traitsGrid) return;

  elements.traitsGrid.innerHTML = state.traits
    .map(
      t => `
      <article class="trait-card">
        <div class="trait-head">
          <strong>${t.name}</strong>
          <span class="score">${t.score}% AWAKENED</span>
        </div>
        <p>${t.description}</p>
        <div class="progress">
          <i style="width: ${t.score}%"></i>
        </div>
      </article>
    `
    )
    .join("");
}

// I. Render Product Lines Grid
function renderProducts() {
  if (!elements.productsGrid) return;

  elements.productsGrid.innerHTML = PRODUCT_LINES_DATA.map(p => {
    const linkedMissions = state.missions.filter(m => m.productLineId === p.id);
    return `
      <article class="product-card">
        <div class="card-head">
          <span class="product-code">${p.code}</span>
          <span class="status-tag">${p.status}</span>
        </div>
        <h3>${p.name}</h3>
        <p class="tagline">${p.tagline}</p>
        <p class="summary">${p.summary}</p>
        
        <div class="detail-block">
          <strong>Market Thesis:</strong>
          <p>${p.marketThesis}</p>
        </div>

        <div class="detail-block">
          <strong>Target Customers:</strong>
          <div class="chip-row">
            ${p.customerSegments.map(c => `<span>${c}</span>`).join("")}
          </div>
        </div>

        <div class="linked-missions">
          <strong>Connected Mission Arcs:</strong>
          <ul>
            ${linkedMissions.map(m => `<li>${m.title} (${m.readiness}% ready)</li>`).join("")}
          </ul>
        </div>
      </article>
    `;
  }).join("");
}

// --- 6. EVENT HANDLERS & INITIALIZATION ---

function setupEventListeners() {
  // Navigation scrolling
  elements.navLinks.forEach(link => {
    link.addEventListener("click", e => {
      elements.navLinks.forEach(l => l.classList.remove("active"));
      link.classList.add("active");
    });
  });

  // School category filter
  if (elements.schoolCategoryFilter) {
    elements.schoolCategoryFilter.addEventListener("change", e => {
      renderSchools(e.target.value, elements.schoolSearchInput ? elements.schoolSearchInput.value : "");
    });
  }

  // School search
  if (elements.schoolSearchInput) {
    elements.schoolSearchInput.addEventListener("input", e => {
      renderSchools(elements.schoolCategoryFilter ? elements.schoolCategoryFilter.value : "All", e.target.value);
    });
  }

  // Inspect school click
  document.addEventListener("click", e => {
    if (e.target.classList.contains("inspect-school-btn")) {
      openSchoolDrawer(e.target.dataset.id);
    }
  });

  // Close drawer
  if (elements.closeDrawerBtn) {
    elements.closeDrawerBtn.addEventListener("click", () => {
      if (elements.schoolDrawer) elements.schoolDrawer.classList.remove("open");
    });
  }

  // Mission sort
  if (elements.missionSortBtn) {
    let sorted = false;
    elements.missionSortBtn.addEventListener("click", () => {
      sorted = !sorted;
      renderMissions(sorted);
    });
  }

  // Evidence Form submit
  if (elements.evidenceForm) {
    elements.evidenceForm.addEventListener("submit", e => {
      e.preventDefault();
      const item = {
        id: `ev-${Date.now()}`,
        title: elements.evidenceTitleInput.value.trim(),
        type: elements.evidenceTypeSelect.value,
        missionId: elements.evidenceMissionSelect.value,
        schoolId: elements.evidenceSchoolSelect.value,
        skillId: elements.evidenceSkillSelect.value,
        productLineId: elements.evidenceProductSelect.value,
        link: elements.evidenceLinkInput.value.trim(),
        notes: elements.evidenceNotesInput.value.trim(),
        tags: ["evidence", elements.evidenceTypeSelect.value.toLowerCase().replace(/\s+/g, "")],
        date: new Date().toISOString().slice(0, 10)
      };

      state.evidence.unshift(item);
      saveState(STORAGE_KEYS.EVIDENCE, state.evidence);

      // Boost founder trait upon logging evidence
      const randTraitIdx = Math.floor(Math.random() * state.traits.length);
      state.traits[randTraitIdx].score = Math.min(100, state.traits[randTraitIdx].score + 2);
      saveState(STORAGE_KEYS.TRAITS, state.traits);

      elements.evidenceForm.reset();
      populateSelects();
      renderEvidence();
      renderTraits();
      drawFounderRadar();
      updateTopMetrics();
    });
  }

  // Evidence search & filter
  if (elements.evidenceSearchInput) {
    elements.evidenceSearchInput.addEventListener("input", e => {
      renderEvidence(e.target.value, elements.evidenceFilterTypeSelect ? elements.evidenceFilterTypeSelect.value : "All");
    });
  }
  if (elements.evidenceFilterTypeSelect) {
    elements.evidenceFilterTypeSelect.addEventListener("change", e => {
      renderEvidence(elements.evidenceSearchInput ? elements.evidenceSearchInput.value : "", e.target.value);
    });
  }

  // Export JSON backup
  if (elements.exportDataBtn) {
    elements.exportDataBtn.addEventListener("click", () => {
      const blob = new Blob([JSON.stringify(state, null, 2)], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `hit_founder_os_backup_${new Date().toISOString().slice(0, 10)}.json`;
      a.click();
    });
  }

  // Import JSON backup
  if (elements.importDataInput) {
    elements.importDataInput.addEventListener("change", e => {
      const file = e.target.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = evt => {
        try {
          const imported = JSON.parse(evt.target.result);
          if (imported.evidence) state.evidence = imported.evidence;
          if (imported.missions) state.missions = imported.missions;
          if (imported.traits) state.traits = imported.traits;

          saveState(STORAGE_KEYS.EVIDENCE, state.evidence);
          saveState(STORAGE_KEYS.MISSIONS, state.missions);
          saveState(STORAGE_KEYS.TRAITS, state.traits);

          initApp();
        } catch (err) {
          alert("Invalid backup JSON file.");
        }
      };
      reader.readAsText(file);
    });
  }

  // Reset Seed Data
  if (elements.resetSeedDataBtn) {
    elements.resetSeedDataBtn.addEventListener("click", () => {
      if (confirm("Reset state back to initial seed data?")) {
        localStorage.clear();
        state.evidence = INITIAL_EVIDENCE;
        state.missions = MISSIONS_DATA;
        state.traits = FOUNDER_TRAITS_DATA;
        initApp();
      }
    });
  }

  // Canvas resize handler
  window.addEventListener("resize", () => {
    drawWorldMap();
    drawSkillTree();
    drawFounderRadar();
  });
}

function initApp() {
  updateTopMetrics();
  renderSchools();
  renderMissions();
  populateSelects();
  renderEvidence();
  renderTraits();
  renderProducts();

  // Draw Canvases after DOM layout
  setTimeout(() => {
    drawWorldMap();
    drawSkillTree();
    drawFounderRadar();
  }, 100);
}

document.addEventListener("DOMContentLoaded", () => {
  setupEventListeners();
  initApp();
});

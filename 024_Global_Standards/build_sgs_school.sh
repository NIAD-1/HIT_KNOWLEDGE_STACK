#!/usr/bin/env bash
#
# build_sgs_school.sh
#
# Scaffolds a 15-module "School of Global Standards" vault
# (Obsidian-compatible) for Founder's University.
#
# Structure matches the HIT_Knowledge_Stack pattern: every topic inside a
# module gets its own folder, and every topic folder gets three notes —
# Research.md, Assignment.md, Learning.md.
#
# Usage:
#   chmod +x build_sgs_school.sh
#   ./build_sgs_school.sh [target-directory]
#
# Default target directory: ./SGS-School

set -euo pipefail

TARGET="${1:-SGS-School}"

if [ -d "$TARGET" ]; then
  echo "Directory '$TARGET' already exists. Refusing to overwrite. Choose a different target or remove it first."
  exit 1
fi

mkdir -p "$TARGET"

# Turn any string into a filesystem-safe folder/file name.
# Replaces path separators and colons (which macOS silently maps to "/"
# in Finder) with a hyphen, then trims stray whitespace.
sanitize() {
  echo "$1" | sed -E 's#[/:]+#-#g' | sed -E 's/^[[:space:]]+|[[:space:]]+$//g'
}

# ---------------------------------------------------------------------------
# Module data: "NN|Title|Topics (semicolon-separated)|Project"
# ---------------------------------------------------------------------------
MODULES=(
"01|Global Harmonization vs Institutional Enforcement|Navigating the delta between international frameworks and local agencies;Treating regulatory compliance as a feature|Map the regulatory friction points for HIT’s core monitoring device when crossing jurisdictions."
"02|QMS for Hardware-Enabled SaaS|Fusing ISO 9001 with ISO 13485 for an agile startup;Document control for physical BOMs and software repositories|Draft the architecture for HIT’s Quality Management System (QMS) defining synchronous hardware-software control."
"03|IIoT Risk Management & Edge FMEA|Applying ISO 14971 to connected industrial devices;Advanced FMEA for edge computing;Designing graceful degradation for connectivity loss|Complete a comprehensive FMEA for HIT’s IIoT data pipeline and document automated mitigations."
"04|Corporate Governance & Vendor Accountability|Building a scalable compliance culture;Managing the regulatory footprint of third-party cloud and hardware providers|Create a Vendor Quality Agreement template for HIT’s critical infrastructure partners."
"05|Immutability & FDA 21 CFR Part 11|Engineering absolute data integrity (ALCOA+);Cryptographic signing of telemetry data at the edge;Biometric and role-based authentication|Write the technical validation protocol demonstrating zero data alteration for HIT telemetry."
"06|IIoT Security Architectures (ISO 27001)|Threat modeling for distributed cloud-connected hardware;Establishing a Zero-Trust architecture;Defending against sensor spoofing|Define the provisioning and cryptographic key rotation strategy for deploying a new HIT sensor."
"07|Telemetry Privacy & Data Sovereignty|Navigating global data protection (GDPR-CCPA);Anonymizing proprietary client data while pooling telemetry|Draft a data flow matrix detailing exactly where client data is stored, processed, and localized."
"08|Compliant OTA Updates & Change Control|IEC 62304 standards for software lifecycle;Pushing firmware updates without invalidating qualified state|Document a strictly controlled OTA deployment procedure including rollback triggers and audit logging."
"09|Advanced GxP & Pharmaceutical Cold-Chain|Good Distribution Practice (GDP) for sensitive pharmaceuticals;Thermodynamic requirements of biologics|Design the logic and SOP for a multi-tiered automated excursion alerting system."
"10|Sensor Metrology & Automated Calibration|NIST traceability and ISO-IEC 17025;Managing sensor drift over time in harsh industrial environments|Build a lifecycle management plan for HIT’s physical sensors detailing calibration intervals and replacement."
"11|IIoT Validation Qualification (IQ-OQ-PQ)|Translating IQ-OQ-PQ into an IIoT context;Hardware-in-the-loop testing and automated validation scripts|Draft a rigorous Operational Qualification (OQ) test script simulating environmental extremes."
"12|Supply Chain Transparency & Redundancy|Building resilience into the hardware supply chain;Ethical sourcing and tracing critical microprocessors|Map a secondary supply chain strategy for HIT’s most critical hardware components."
"13|Automated CAPA & Root Cause Engineering|Modernizing CAPA;Moving from static spreadsheets to automated relational workflows for active field failures|Design a lean automated CAPA tracking workflow to log, investigate, and close out field deviations immediately."
"14|The Always-Ready Agency Inspection|Building internal structure for institutional surveillance;Front-room defense strategies and back-room data retrieval|Develop a 1-page Inspection Playbook outlining how staff must generate and present secure audit trails."
"15|The Integrated HIT Compliance Operating System (Capstone)|Integrated Quality and Information Security Manual;Edge-to-Cloud Data Integrity schematic;Automated CAPA workflow;Enterprise Vendor Pitch|Graduate with a globally defensible, deployment-ready IIoT compliance framework."
)

INDEX_LINES=""

for entry in "${MODULES[@]}"; do
  IFS='|' read -r NUM TITLE TOPICS PROJECT <<< "$entry"

  MOD_SLUG=$(sanitize "$TITLE")
  MOD_DIR="$TARGET/Module-${NUM}-${MOD_SLUG}"
  mkdir -p "$MOD_DIR"

  TOPIC_LINES=""
  IFS=';' read -ra TOPIC_ARR <<< "$TOPICS"
  for topic in "${TOPIC_ARR[@]}"; do
    TOPIC_NAME=$(sanitize "$topic")
    TOPIC_DIR="$MOD_DIR/$TOPIC_NAME"
    mkdir -p "$TOPIC_DIR"

    {
      echo "# Research — ${topic}"
      echo
      echo "_Module ${NUM}: ${TITLE}_"
      echo
      echo "Sources, references, and findings on **${topic}** go here."
    } > "$TOPIC_DIR/Research.md"

    {
      echo "# Assignment — ${topic}"
      echo
      echo "_Module ${NUM}: ${TITLE}_"
      echo
      echo "Hands-on exercise or deliverable applying **${topic}** to HIT."
      echo
      echo "- [ ] Defined"
      echo "- [ ] In progress"
      echo "- [ ] Done"
    } > "$TOPIC_DIR/Assignment.md"

    {
      echo "# Learning — ${topic}"
      echo
      echo "_Module ${NUM}: ${TITLE}_"
      echo
      echo "Key takeaways and decisions from studying **${topic}**."
    } > "$TOPIC_DIR/Learning.md"

    TOPIC_LINES="${TOPIC_LINES}- [ ] [[${TOPIC_NAME}/Research|${topic}]]\n"
  done

  # Module README — topic index + project brief
  {
    echo "# Module ${NUM} — ${TITLE}"
    echo
    echo "## Topics"
    echo
    echo -e "$TOPIC_LINES"
    echo "## Project"
    echo
    echo "${PROJECT}"
    echo
    echo "## Status"
    echo
    echo "- [ ] Topics reviewed"
    echo "- [ ] Project started"
    echo "- [ ] Project completed"
    echo "- [ ] Notes written up"
    echo
    echo "---"
    echo "[[README|<- Back to School Overview]]"
  } > "$MOD_DIR/README.md"

  INDEX_LINES="${INDEX_LINES}- [ ] [[Module-${NUM}-${MOD_SLUG}/README|Module ${NUM} — ${TITLE}]]\n"

done

# ---------------------------------------------------------------------------
# Top-level README (vault entry point)
# ---------------------------------------------------------------------------
{
  echo "# School of Global Standards (SGS)"
  echo
  echo "> Mission: To forge an unassailable bridge between cutting-edge Industrial"
  echo "> IoT (IIoT) engineering and uncompromising international health regulations."
  echo "> Transforms global standards into an automated, defensible competitive advantage."
  echo
  echo "15 modules organized in four arcs: Enterprise Quality & IIoT Governance (1-4),"
  echo "Industrial Data Integrity & Edge Security (5-8), Cold-Chain Logistics &"
  echo "Sensor Metrology (9-12), and Continuous Audit Readiness (13-15)."
  echo
  echo "Each topic inside a module has its own folder with Research, Assignment,"
  echo "and Learning notes — maintaining the HIT_Knowledge_Stack pattern."
  echo
  echo "## Modules"
  echo
  echo -e "$INDEX_LINES"
  echo "---"
  echo
  echo "School of Global Standards (SGS) — building regulatory supremacy as a core feature for HIT."
} > "$TARGET/README.md"

# ---------------------------------------------------------------------------
# PROGRESS.md — simple tracker across all modules
# ---------------------------------------------------------------------------
{
  echo "# SGS School — Progress Tracker"
  echo
  echo "| Module | Title | Status |"
  echo "|---|---|---|"
  for entry in "${MODULES[@]}"; do
    IFS='|' read -r NUM TITLE TOPICS PROJECT <<< "$entry"
    echo "| ${NUM} | ${TITLE} | Not started |"
  done
} > "$TARGET/PROGRESS.md"

echo "SGS School scaffolded at: $TARGET"
echo "Open '$TARGET' as an Obsidian vault, or start with $TARGET/README.md"

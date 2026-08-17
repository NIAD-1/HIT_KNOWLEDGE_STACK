#!/usr/bin/env bash
#
# build_id_school.sh
#
# Scaffolds a 20-module "School of Industrial Domains" vault (Obsidian-compatible)
# for Founder's University.
#
# Structure matches the HIT_Knowledge_Stack pattern: every topic inside a
# module gets its own folder, and every topic folder gets three notes —
# Research.md, Assignment.md, Learning.md.
#
# Usage:
#   chmod +x build_id_school.sh
#   ./build_id_school.sh [target-directory]
#
# Default target directory: ./ID-School

set -euo pipefail

TARGET="${1:-ID-School}"

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
"01|Introduction to Industrial Domains & Vertical Strategy|What a vertical or domain means in B2B-industrial products;Horizontal platform vs vertical-specific product strategy;Why domain knowledge is a moat in industrial IoT;How to research an unfamiliar industry quickly|Write a one-page framework for how HIT evaluates whether a new industry is worth entering."
"02|Domain Selection & Prioritization Framework|Criteria for prioritizing domains - market size, urgency of pain, regulatory pressure, sales cycle length;Scoring and ranking candidate domains;Sequencing domain entry over time;Recognizing false-positive domains|Score HIT's current target domains against a weighted prioritization matrix."
"03|Cross-Domain Patterns in Industrial IoT|Common patterns across verticals - monitoring, compliance, asset tracking, predictive maintenance;Where the same sensor hardware serves multiple domains vs where it must differ;Shared infrastructure vs domain-specific customization;Platform thinking - one core product, many vertical configurations|Map which parts of HIT's platform are domain-agnostic vs which need per-domain customization."
"04|Pharmaceuticals|How pharmaceutical supply chains operate;Cold chain requirements and GxP expectations;Buyer roles - QA managers, supply chain leads, compliance officers;Sales cycle and procurement patterns in pharma|Build a buyer persona for the pharmaceutical QA manager who would evaluate HIT's cold-chain monitor."
"05|Healthcare|How hospitals and clinics operate day to day;Vaccine and biologics storage requirements;Healthcare procurement and budget cycles;Data privacy expectations in healthcare settings|Identify the top 3 monitoring pain points a mid-size hospital or clinic network would have."
"06|Food Manufacturing|Food production and processing operations;HACCP and food safety monitoring needs;Cold chain for food vs pharma - where requirements diverge;Buyer roles in food manufacturing|Compare a food manufacturer's monitoring requirements against a pharma company's and note where HIT's product needs to flex."
"07|Logistics|Freight, warehousing, and last-mile logistics operations;Cold chain logistics for perishable and sensitive goods;Fleet and asset tracking needs;Buyer roles - logistics managers, fleet operators, 3PL providers|Map the monitoring touchpoints across a shipment's journey from HIT's customer to end destination."
"08|Agriculture|Farm and agri-processing operations;Cold storage for produce and post-harvest handling;Environmental monitoring needs - soil, greenhouse, storage;Buyer roles and procurement realities in agriculture|Identify one agricultural use case in your region where HIT's sensor platform could apply with minimal modification."
"09|Oil & Gas|Oil and gas operations overview;Environmental and safety monitoring requirements;Harsh-environment sensing needs - heat, pressure, hazardous zones;Procurement and vendor qualification in this sector|Assess whether HIT's current hardware could survive an oil & gas field environment, and what would need to change."
"10|Mining|Mining operations overview;Environmental and equipment monitoring needs;Worker safety monitoring;Harsh-environment and remote-connectivity requirements|Identify the connectivity challenges HIT's platform would face in a remote mining site and how to address them."
"11|Utilities|Power, water, and utility operations overview;Infrastructure monitoring needs - grid, water treatment, distribution;Regulatory environment for utilities;Public vs private utility procurement differences|Identify one utility infrastructure monitoring use case adjacent to HIT's current sensor capabilities."
"12|Smart Cities|Smart city infrastructure overview;Municipal procurement processes;Public sector sales cycles and stakeholders;Integration with existing city infrastructure systems|Outline what it would take to pilot HIT's platform with a municipal or public-sector buyer."
"13|Cold Chain & Temperature-Sensitive Logistics (Cross-Domain Deep Dive)|Cold chain as a theme spanning pharma, food, healthcare, and logistics;Comparing cold chain requirements across these four domains;Where a single cold-chain product can serve multiple domains vs where it can't;Positioning HIT as a cold-chain specialist across domains|Build a comparison table of cold-chain requirements across pharma, food, healthcare, and logistics, and identify HIT's strongest entry point."
"14|Manufacturing & Industrial Automation|General manufacturing operations;Predictive maintenance and asset monitoring;Industry 4.0 integration points;How monitoring needs differ between discrete and process manufacturing|Identify one manufacturing use case beyond food-pharma where HIT's platform could apply."
"15|Emerging Industrial Domains|Domains not yet in HIT's target list - aquaculture, veterinary cold-chain, data centers, renewable energy;How to evaluate an emerging domain opportunity;Early signals that a new domain is worth exploring|Identify one emerging domain worth watching for HIT over the next 2-3 years and why."
"16|Domain-Specific Regulatory & Standards Landscape|How regulatory requirements differ by domain;Building a per-domain compliance reference;Domain-specific certifications that unlock sales|Build a one-page compliance summary per active domain, cross-referencing your Global Standards matrix."
"17|Vertical Go-to-Market Strategy|Adapting GTM strategy per domain;Domain-specific sales messaging;Choosing pilot customers per domain;Vertical-specific marketing channels|Write domain-specific GTM messaging for your two highest-priority domains."
"18|Domain Expert Networks & Advisory|Finding and engaging domain experts;Building an informal or formal advisory network per domain;Using domain experts to validate product decisions;Compensating advisors appropriately for an early-stage company|Identify one potential domain advisor per priority vertical and draft outreach messaging."
"19|Multi-Domain Platform Strategy|Managing product complexity across multiple domains;Deciding when to build domain-specific features vs staying horizontal;Pricing and packaging across domains;Avoiding domain sprawl before product-market fit is solid in one domain|Define HIT's rule for when to say yes vs no to a new domain opportunity."
"20|Founder Industrial Domains Studio (Capstone)|Capstone integration of domain prioritization, buyer personas, compliance mapping, and vertical GTM|Graduate with a prioritized and scored list of target domains, buyer personas for your top 2-3 domains, a cross-domain vs domain-specific feature map, a per-domain compliance reference, a vertical GTM plan, and a domain expansion roadmap."
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
  echo "# School of Industrial Domains (ID)"
  echo
  echo "> Mission: Learn the operational realities, buyer behavior, technical"
  echo "> requirements, and market dynamics of every industry HIT's Industrial"
  echo "> Monitoring Platform could serve."
  echo
  echo "20 modules across five arcs: Cross-Domain Foundations (1-3), Core Domains"
  echo "(4-12), Domain Deep Dives (13-16), Vertical Strategy (17-19), and the"
  echo "Capstone (20)."
  echo
  echo "Each topic inside a module has its own folder with Research, Assignment,"
  echo "and Learning notes — same pattern as the rest of the HIT_Knowledge_Stack vault."
  echo
  echo "## Modules"
  echo
  echo -e "$INDEX_LINES"
  echo "---"
  echo
  echo "Related schools: Global Standards (GS) for domain-specific regulation;"
  echo "Entrepreneurship & Venture Building (EVB) for GTM strategy this school builds on."
} > "$TARGET/README.md"

# ---------------------------------------------------------------------------
# PROGRESS.md — simple tracker across all modules
# ---------------------------------------------------------------------------
{
  echo "# ID School — Progress Tracker"
  echo
  echo "| Module | Title | Status |"
  echo "|---|---|---|"
  for entry in "${MODULES[@]}"; do
    IFS='|' read -r NUM TITLE TOPICS PROJECT <<< "$entry"
    echo "| ${NUM} | ${TITLE} | Not started |"
  done
} > "$TARGET/PROGRESS.md"

echo "ID School scaffolded at: $TARGET"
echo "Open '$TARGET' as an Obsidian vault, or start with $TARGET/README.md"

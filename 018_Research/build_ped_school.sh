#!/usr/bin/env bash
#
# build_ped_school.sh
#
# Scaffolds a 20-module "School of Product Engineering & Design" vault
# (Obsidian-compatible) for Founder's University.
#
# Structure matches the HIT_Knowledge_Stack pattern: every topic inside a
# module gets its own folder, and every topic folder gets three notes —
# Research.md, Assignment.md, Learning.md.
#
# Usage:
#   chmod +x build_ped_school.sh
#   ./build_ped_school.sh [target-directory]
#
# Default target directory: ./PED-School

set -euo pipefail

TARGET="${1:-PED-School}"

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
"01|Product Design Foundations|Design principles - form, function, aesthetics;Industrial design fundamentals;User-centered design;Design briefs and PRDs;Concept sketching and ideation;Design critique and iteration|Write a PRD and produce 3 concept sketches for the cold-chain sensor enclosure."
"02|User Research & UX Design|User interviews and contextual inquiry;Personas and journey mapping;Usability testing methods;Information architecture;UX for industrial and embedded interfaces;Accessibility in industrial settings|Map the end-to-end user journey for a warehouse technician installing and reading the sensor."
"03|Industrial Design & Mechanical Design|CAD fundamentals (Fusion 360 - SolidWorks - FreeCAD);Enclosure design for electronics;Mechanical tolerances and fits;Assemblies, fasteners, mounting strategies;Thermal and structural considerations|Model a CAD enclosure for the temperature-logging device, including mounting and cable entry."
"04|Electronics & PCB Design for Product|Schematic capture and component selection;PCB layout fundamentals;DFM in PCB design;Signal integrity and EMI-EMC basics;Panelization and fab-house requirements|Produce a manufacturable PCB layout with a DFM checklist for the current board revision."
"05|Design for Manufacturing & Assembly (DFM-DFA)|Manufacturing processes - injection molding, CNC, 3D printing, sheet metal, die casting;Process selection by volume and cost;Tolerancing and GD&T basics;Design for assembly - fasteners, snap-fits, poka-yoke;DFM-DFA review checklists|Run a DFM/DFA review on the enclosure and revise it for injection-molding readiness."
"06|Prototyping & Rapid Iteration|3D printing (FDM, SLA, SLS);Laser cutting and CNC prototyping;Breadboarding and dev-board iteration;Prototype fidelity levels;Rapid iteration loops and documentation|Build a works-like prototype of the cold-chain monitor and document three iteration cycles."
"07|Materials Science for Product Design|Plastics - ABS, PC, PA, TPU;Metals and composites;Material selection criteria - cost, durability, thermal, chemical resistance;Certifications for pharma-food environments|Select and justify materials for an enclosure that must survive a pharmaceutical cold-chain environment."
"08|Human Factors & Ergonomics|Ergonomic design principles;Accessibility and inclusive design;Safety in industrial and warehouse environments;Physical interaction design - buttons, ports, mounting, cable routing|Conduct an ergonomics review of how a technician installs, charges, and reads the device in the field."
"09|Product Testing & Quality Engineering|Reliability and accelerated life testing;Environmental testing - IP ratings, temp-humidity cycling, vibration-shock;QA-QC processes and inspection plans;FMEA;Root cause analysis|Write an FMEA and an environmental test plan for the cold-chain sensor."
"10|Certification & Regulatory Compliance|Electrical-EMC certifications - CE, FCC, UL, IEC;Environmental compliance - RoHS, REACH;Ingress protection (IP) ratings;Pharma-healthcare compliance - GxP, 21 CFR Part 11 relevance;Certification timelines and test lab selection|Build a certification checklist and timeline for taking the sensor to market in your target regions."
"11|Supply Chain & Component Sourcing|BOM management;Supplier selection and qualification;Sourcing strategy - single vs multi-source;Component lifecycle risk and obsolescence;Lead time and inventory planning|Build a risk-assessed BOM, flagging single-source and long-lead-time parts."
"12|Manufacturing Scale-Up|Prototype to pilot to mass production;Selecting and working with contract manufacturers (CMs);Pilot runs and first article inspection (FAI);Yield management and process control;Manufacturing documentation|Draft a pilot production plan and CM evaluation scorecard."
"13|Design Systems & Branding|Visual identity and brand guidelines;UI design systems for dashboards and apps;Packaging design as brand experience;Consistency across hardware, software, and print|Create a lightweight design system (colors, type, iconography) for the product and dashboard UI."
"14|Software-Firmware-Hardware Co-Design|Integrating firmware and hardware constraints early;Power budgets and their effect on UX;Over-the-air (OTA) update design;Embedded UX - status LEDs, low-battery states, error states;Hardware-software interface documentation|Define the firmware-hardware interface contract and OTA update strategy for the sensor."
"15|Sustainability & Circular Design|Eco-design principles;Recyclability and disassembly for end-of-life;E-waste considerations for IoT hardware;Energy efficiency in design;Lifecycle assessment (LCA) basics|Score the current design against a circularity/sustainability checklist and propose two improvements."
"16|Product Management for Hardware Engineers|Roadmapping for hardware + software products;Prioritization frameworks (RICE, MoSCoW);Cross-functional collaboration;Hardware-adapted agile - sprints around long lead times|Build a 2-quarter product roadmap balancing hardware revisions and software releases."
"17|Packaging & Shipping-Ready Design|Packaging engineering fundamentals;Drop-test and shipping durability standards;Logistics-friendly design;Unboxing experience design|Design packaging for the sensor that passes a basic drop-test protocol and reflects the brand."
"18|Cost Engineering & Should-Cost Analysis|BOM costing and cost roll-ups;Should-cost modeling;Value engineering and cost-down strategies;Balancing cost against reliability and certification requirements|Build a should-cost model for the product at three volume tiers (prototype, pilot, 10k units)."
"19|Product Launch Engineering|Launch readiness reviews;First article inspection and production sign-off;Post-launch support and field-failure feedback loops;Change management for post-launch design revisions|Write a launch readiness checklist and a field-failure feedback process for the first production batch."
"20|Founder Product Studio (Capstone)|Capstone integration of design, DFM, sourcing, certification, cost, and launch|Graduate with production-intent CAD files, a DFM/DFA report, a risk-assessed BOM, a certification checklist, a pilot production plan, a should-cost model, and a packaging and launch readiness plan."
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
  echo "# School of Product Engineering & Design (PED)"
  echo
  echo "> Mission: Learn to take an idea validated by research (School of RDI) and"
  echo "> turn it into a manufacturable, certifiable, sellable physical + digital"
  echo "> product — from sketch to CAD to prototype to production line."
  echo
  echo "20 modules across five arcs: Design Foundations (1-4), Engineering for"
  echo "Production (5-9), Compliance & Supply Chain (10-12), Scale & Commercial"
  echo "Readiness (13-19), and the Capstone (20)."
  echo
  echo "Each topic inside a module has its own folder with Research, Assignment,"
  echo "and Learning notes — same pattern as the rest of the HIT_Knowledge_Stack vault."
  echo
  echo "## Modules"
  echo
  echo -e "$INDEX_LINES"
  echo "---"
  echo
  echo "Previous school: School of Research, Development & Innovation (RDI)."
  echo "After this school: Business Strategy & Corporate Finance -> Leadership &"
  echo "Organizational Excellence -> Entrepreneurship & Venture Building."
} > "$TARGET/README.md"

# ---------------------------------------------------------------------------
# PROGRESS.md — simple tracker across all modules
# ---------------------------------------------------------------------------
{
  echo "# PED School — Progress Tracker"
  echo
  echo "| Module | Title | Status |"
  echo "|---|---|---|"
  for entry in "${MODULES[@]}"; do
    IFS='|' read -r NUM TITLE TOPICS PROJECT <<< "$entry"
    echo "| ${NUM} | ${TITLE} | Not started |"
  done
} > "$TARGET/PROGRESS.md"

echo "PED School scaffolded at: $TARGET"
echo "Open '$TARGET' as an Obsidian vault, or start with $TARGET/README.md"

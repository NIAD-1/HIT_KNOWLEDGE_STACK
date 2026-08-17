#!/usr/bin/env bash
#
# build_rdi_school.sh
#
# Scaffolds a 20-module "School of Research, Development & Innovation" vault
# (Obsidian-compatible) for Founder's University.
#
# Structure matches the HIT_Knowledge_Stack pattern: every topic inside a
# module gets its own folder, and every topic folder gets three notes —
# Research.md, Assignment.md, Learning.md.
#
# Usage:
#   chmod +x build_rdi_school.sh
#   ./build_rdi_school.sh [target-directory]
#
# Default target directory: ./RDI-School

set -euo pipefail

TARGET="${1:-RDI-School}"

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
"01|Research Foundations|What is research?;Types of research;Scientific inquiry;Engineering research;Applied vs basic research;Quantitative research;Qualitative research;Mixed methods;Action research;Design science research;Critical thinking;Systems thinking;First-principles thinking;Scientific skepticism;Bias recognition;Evidence evaluation|Analyze landmark engineering research papers. Critique an IIoT research publication."
"02|Research Methodology|Research design;Problem formulation;Research objectives;Hypothesis development;Variables;Experimental design;Sampling;Data collection;Surveys;Interviews;Observation;Case studies;Research reproducibility;FAIR data principles;Preregistration;Ethics approvals|Develop a complete research proposal. Draft a preregistration document for a planned experiment."
"03|Literature Review|Academic databases;Systematic literature review (SLR);PRISMA methodology;Citation management;Gap analysis;Research synthesis;State-of-the-art analysis;Bibliometric analysis;Living systematic reviews;Citation network analysis;Evidence mapping|Conduct a systematic review on Industrial IoT in pharmaceutical supply chains. Build an evidence map of cold-chain monitoring research."
"04|Experimental Design|Controlled experiments;Factorial design;DOE (Design of Experiments);Statistical significance;Randomization;Replication;Validation;Reproducibility|Design an experiment for an AI-based cold-chain monitoring system."
"05|Statistics for Research|Descriptive statistics;Probability;Hypothesis testing;Confidence intervals;Regression;ANOVA;Correlation;Time-series analysis;Bayesian statistics;Machine learning for research;Causal inference;Uncertainty quantification|Analyze sensor data from an industrial system. Quantify uncertainty in a temperature-logging dataset."
"06|Scientific Writing|Research papers;Technical reports;White papers;Conference papers;Journal publications;Thesis writing;Abstract writing;Visual communication;Data presentation|Write an IEEE-style research paper."
"07|Innovation Engineering|Innovation processes;Technology forecasting;TRIZ fundamentals;Design thinking;Open innovation;User-centered innovation;Lean experimentation;Technology roadmapping;Blue Ocean Strategy;Jobs-to-be-Done;Value Proposition Design|Create a technology roadmap for a new industrial platform. Write a Jobs-to-be-Done statement and value proposition canvas for your first product."
"08|Intellectual Property|Patents;Patent searching;Patent drafting;Trade secrets;Copyright;Trademarks;Licensing;Freedom-to-operate analysis|Prepare a patent-style disclosure for an Industrial IoT device."
"09|Technology Commercialization|Technology Readiness Levels (TRL);Minimum Viable Product (MVP);Market validation;Product-market fit;Licensing;Spin-offs;Technology transfer;Business model development;Regulatory strategy;Reimbursement models;Global market entry|Develop a commercialization plan for a smart compliance platform."
"10|R&D Management|R&D strategy;Innovation portfolios;Research budgeting;Grant management;Team leadership;Research ethics;Collaboration;University-industry partnerships|Design an R&D roadmap for a startup."
"11|Emerging Technologies|Artificial General Intelligence;Quantum computing;Synthetic biology;Advanced robotics;Neuromorphic computing;Smart materials;Digital biology;Autonomous laboratories;Spatial computing;Edge AI;Bioinformatics;Advanced semiconductors|Evaluate how an emerging technology could reshape pharmaceutical regulation. Assess which edge-AI approach fits a cold-chain sensor's power/compute budget."
"12|Future Systems Engineering|Foresight methods;Scenario planning;Megatrends;Weak signals;Technology convergence;Industry 5.0;Human-AI collaboration;Sustainable innovation|Develop a 20-year roadmap for Industrial Intelligence."
"13|Publishing & Scientific Impact|Peer review;Journal selection;Conference presentations;Citation analysis;Research metrics;Open science;Reproducible research;Research integrity;ORCID;Preprints;Open-access publishing|Prepare a conference presentation. Publish a preprint of your systematic review or experiment."
"14|Building an Innovation Organization|Innovation culture;Research laboratories;Innovation pipelines;Corporate venture building;Intrapreneurship;Strategic partnerships|Design the organizational structure of your company's R&D division."
"15|Founder Innovation Lab|Research portfolio management;Product discovery;Prototype development;Pilot deployments;User validation;Patent strategy;Commercialization roadmap;Continuous innovation|Integrate Modules 1-14 into one running innovation engine for your company."
"16|Advanced Research Computing|High-Performance Computing (HPC);Scientific programming;Research data management;Computational modeling;Simulation;Scientific workflows;Cloud computing for research;Reproducible computing|Build a reproducible computational research pipeline (containerized, version-controlled, re-runnable end to end)."
"17|AI for Scientific Discovery|AI-assisted literature review;Scientific foundation models;AI for hypothesis generation;Autonomous experimentation;Scientific knowledge graphs;AI research agents;Laboratory automation;AI-assisted peer review|Develop an AI research assistant for Industrial Intelligence."
"18|Advanced Prototyping & Technology Validation|Rapid prototyping;Proof of Concept (PoC);Alpha & beta prototypes;Engineering validation;Design validation;Production validation;Field trials;Pilot programs|Build and validate an IIoT prototype end-to-end, from PoC through a field trial."
"19|Global Innovation Ecosystems|National innovation systems;Research institutes;Technology clusters;Startup ecosystems;Corporate innovation;Venture capital;Standards organizations;International collaboration|Compare innovation ecosystems across leading countries and identify where your company should plug in first."
"20|Founder Innovation Studio (Capstone)|Capstone integration of research, IP, prototyping, and commercialization|Graduate with a published research paper, a patent-ready invention disclosure, a validated prototype, a pilot deployment, an innovation roadmap, a commercialization plan, a grant proposal, and an investor-ready technical presentation."
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
  echo "# School of Research, Development & Innovation (RDI)"
  echo
  echo "> Mission: Learn how to systematically discover new knowledge, invent new"
  echo "> technologies, validate ideas, protect intellectual property, and transform"
  echo "> research into commercially successful products."
  echo
  echo "20 modules across five arcs: Research Foundations (1-6), Innovation & IP (7-9),"
  echo "R&D Strategy (10-14), Advanced Practice (15-19), and the Capstone (20)."
  echo
  echo "Each topic inside a module has its own folder with Research, Assignment,"
  echo "and Learning notes — same pattern as the rest of the HIT_Knowledge_Stack vault."
  echo
  echo "## Modules"
  echo
  echo -e "$INDEX_LINES"
  echo "---"
  echo
  echo "After this school: Product Engineering & Design -> Business Strategy &"
  echo "Corporate Finance -> Leadership & Organizational Excellence ->"
  echo "Entrepreneurship & Venture Building."
} > "$TARGET/README.md"

# ---------------------------------------------------------------------------
# PROGRESS.md — simple tracker across all modules
# ---------------------------------------------------------------------------
{
  echo "# RDI School — Progress Tracker"
  echo
  echo "| Module | Title | Status |"
  echo "|---|---|---|"
  for entry in "${MODULES[@]}"; do
    IFS='|' read -r NUM TITLE TOPICS PROJECT <<< "$entry"
    echo "| ${NUM} | ${TITLE} | Not started |"
  done
} > "$TARGET/PROGRESS.md"

echo "RDI School scaffolded at: $TARGET"
echo "Open '$TARGET' as an Obsidian vault, or start with $TARGET/README.md"

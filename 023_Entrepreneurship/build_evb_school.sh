#!/usr/bin/env bash
#
# build_evb_school.sh
#
# Scaffolds a 20-module "School of Entrepreneurship & Venture Building" vault
# (Obsidian-compatible) for Founder's University.
#
# Structure matches the HIT_Knowledge_Stack pattern: every topic inside a
# module gets its own folder, and every topic folder gets three notes —
# Research.md, Assignment.md, Learning.md.
#
# Usage:
#   chmod +x build_evb_school.sh
#   ./build_evb_school.sh [target-directory]
#
# Default target directory: ./EVB-School

set -euo pipefail

TARGET="${1:-EVB-School}"

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
"01|Entrepreneurial Mindset|Entrepreneurial thinking and opportunity recognition;Risk tolerance and calculated risk-taking;Founder resilience;Tolerance for ambiguity;Separating founder identity from company outcomes|Write a personal founder manifesto - why HIT, why now, why you."
"02|Startup Fundamentals|The startup lifecycle - idea to exit;Lean Startup methodology;Build-Measure-Learn loops;Common startup failure modes and how to avoid them|Map HIT's current stage on the startup lifecycle and identify the single biggest risk to address next."
"03|Idea Validation & Customer Discovery|Customer discovery process;Problem-solution fit vs product-market fit;MVP testing techniques;Pivot vs persevere decision-making|Run and document 5 customer discovery conversations with potential cold-chain monitoring buyers."
"04|Founding Team & Co-Founder Dynamics|Co-founder selection criteria;Equity split frameworks;Founder agreements and vesting;Dividing roles and responsibilities among founders|Draft a founder agreement outline defining what you'd require of a future co-founder."
"05|Venture Building Playbooks|Venture studio models;Zero-to-one building frameworks;Sequencing decisions for a solo or small founding team;When to build in-house vs outsource vs partner|Write HIT's zero-to-one build sequence for the next 12 months."
"06|Legal Foundations for Startups|Company incorporation basics;Founder agreements and IP assignment;Basic commercial contracts;Employment law fundamentals for first hires|Build a legal checklist covering incorporation, IP assignment, and first-hire contracts for HIT."
"07|Operations Foundations|Building operational processes from scratch;Standard Operating Procedures (SOPs);Tooling stack for early-stage operations;Vendor and supplier management|Write SOPs for HIT's three most repeated operational tasks."
"08|Sales for Founders|Founder-led sales;Designing a sales process for industrial-B2B buyers;Closing early customers;Handling objections from pharma-logistics buyers|Build a founder-led sales script and process for HIT's first 10 customers."
"09|Marketing & Brand Building|Brand strategy for a technical company;Content marketing for industrial-deep-tech products;Community building;Marketing to technical vs business buyers|Draft a 90-day content and brand-building plan for HIT."
"10|Growth Strategy & Metrics|Growth frameworks (AARRR - pirate metrics);Growth loops vs one-off campaigns;Defining a north-star metric;Metrics that matter for hardware + subscription businesses|Define HIT's north-star metric and the 3-5 supporting metrics you'll track weekly."
"11|Customer Success & Retention|Onboarding customers for long-term success;Customer success processes;Churn analysis and reduction;Expansion revenue and upsell paths|Design a customer success playbook for HIT's cold-chain monitoring subscribers."
"12|Scaling Operations|Scaling processes and systems past the founder;Identifying and removing operational bottlenecks;Process documentation as the team grows;Operational metrics and dashboards|Identify HIT's current top operational bottleneck and design a fix that doesn't depend on you personally."
"13|Scaling Sales & Distribution|Building a sales team;Channel and distributor partnerships at scale;Distribution strategy for industrial hardware;Sales operations and pipeline management|Design HIT's distribution strategy for scaling beyond founder-led sales."
"14|Building Repeatable Systems & Playbooks|Playbook creation for repeatable functions;Turning founder knowledge into documented systems;Systematizing decisions so the company doesn't depend on tribal knowledge|Convert one thing only you currently know how to do at HIT into a written playbook."
"15|Later-Stage Capital & VC Ecosystem|Growth equity and later-stage funding rounds;Strategic investors vs financial investors;Preparing for Series B+ conversations;Managing a growing investor base|Outline what HIT's Series A/B story would need to look like."
"16|Corporate Venture Building & Innovation Partnerships|Corporate venture capital (CVC);Strategic partnerships with larger companies;Joint venture structuring;Innovation partnerships with pharma-logistics incumbents|Identify one corporate partner HIT could pursue for a pilot or strategic partnership."
"17|Building for Exit or Legacy|Long-term vision setting - exit vs enduring company;Legacy-building vs exit-optimization trade-offs;Succession planning;What success means for HIT specifically|Write a 10-year vision statement for HIT and identify which milestones matter most."
"18|Serial Entrepreneurship & Portfolio Thinking|Lessons that transfer across multiple ventures;Portfolio approach to entrepreneurship;Capital and knowledge recycling between ventures;Knowing when to start something new|Document the top 5 lessons from building HIT so far."
"19|Ecosystem Building & Giving Back|Contributing to startup ecosystems;Mentoring other founders;Angel investing basics;Building a personal and company reputation in the ecosystem|Identify one way HIT or you personally could contribute to your local startup ecosystem this year."
"20|Founder Venture Studio (Capstone)|Capstone integration of discovery, product, finance, leadership, and venture operations|Graduate with a full venture playbook, a 5-year company vision, a documented operating system, a growth and scaling plan, a capital strategy, and a personal founder philosophy."
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
  echo "# School of Entrepreneurship & Venture Building (EVB)"
  echo
  echo "> Mission: Learn to build, operate, and scale the venture as a whole —"
  echo "> pulling research, product, finance, and leadership into one operating"
  echo "> discipline for taking a company from zero to a durable, scaling business."
  echo
  echo "20 modules across five arcs: Entrepreneurial Foundations (1-4), Venture"
  echo "Building Mechanics (5-9), Growth & Scaling (10-14), Advanced Venture"
  echo "Strategy (15-19), and the Capstone (20)."
  echo
  echo "Each topic inside a module has its own folder with Research, Assignment,"
  echo "and Learning notes — same pattern as the rest of the HIT_Knowledge_Stack vault."
  echo
  echo "## Modules"
  echo
  echo -e "$INDEX_LINES"
  echo "---"
  echo
  echo "Previous schools: Research, Development & Innovation (RDI); Product"
  echo "Engineering & Design (PED); Business Strategy & Corporate Finance (BSCF);"
  echo "Leadership & Organizational Excellence (LOE)."
  echo
  echo "This is the final school in the Founder's University sequence."
} > "$TARGET/README.md"

# ---------------------------------------------------------------------------
# PROGRESS.md — simple tracker across all modules
# ---------------------------------------------------------------------------
{
  echo "# EVB School — Progress Tracker"
  echo
  echo "| Module | Title | Status |"
  echo "|---|---|---|"
  for entry in "${MODULES[@]}"; do
    IFS='|' read -r NUM TITLE TOPICS PROJECT <<< "$entry"
    echo "| ${NUM} | ${TITLE} | Not started |"
  done
} > "$TARGET/PROGRESS.md"

echo "EVB School scaffolded at: $TARGET"
echo "Open '$TARGET' as an Obsidian vault, or start with $TARGET/README.md"

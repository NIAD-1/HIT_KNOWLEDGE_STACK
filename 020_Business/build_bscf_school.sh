#!/usr/bin/env bash
#
# build_bscf_school.sh
#
# Scaffolds a 20-module "School of Business Strategy & Corporate Finance" vault
# (Obsidian-compatible) for Founder's University.
#
# Structure matches the HIT_Knowledge_Stack pattern: every topic inside a
# module gets its own folder, and every topic folder gets three notes —
# Research.md, Assignment.md, Learning.md.
#
# Usage:
#   chmod +x build_bscf_school.sh
#   ./build_bscf_school.sh [target-directory]
#
# Default target directory: ./BSCF-School

set -euo pipefail

TARGET="${1:-BSCF-School}"

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
"01|Business Strategy Foundations|Strategy frameworks - Porter's Five Forces, SWOT, PESTEL;Competitive advantage and moats;Vision, mission, and strategic intent;The strategic planning process;Strategy vs tactics vs execution|Run a Five Forces and SWOT analysis on your position in the cold-chain monitoring market."
"02|Market & Competitive Analysis|Market sizing - TAM, SAM, SOM;Competitive analysis and benchmarking;Market positioning and differentiation;Industry structure analysis|Size the TAM-SAM-SOM for Industrial IoT cold-chain monitoring in your target region and map your top 5 competitors."
"03|Business Model Design|Business Model Canvas;Revenue models - hardware, subscription, hybrid;Pricing strategy and price sensitivity;Unit economics - CAC, LTV, contribution margin|Build a Business Model Canvas and calculate baseline unit economics for the device + monitoring subscription."
"04|Go-to-Market Strategy|GTM planning and sequencing;Channel strategy - direct, distributor, OEM;Sales strategy for B2B-industrial buyers;Marketing fundamentals for technical products|Draft a GTM plan for your first 100 customers in the pharmaceutical cold-chain segment."
"05|Financial Accounting Foundations|The income statement, balance sheet, and cash flow statement;Accrual vs cash accounting;Core accounting principles and terminology;Reading and interpreting financial statements|Build a simplified set of three financial statements for your current operating stage."
"06|Managerial & Cost Accounting|Cost structures - fixed, variable, semi-variable;COGS and gross margin for hardware products;Break-even analysis;Activity-based costing|Calculate COGS, gross margin, and break-even volume for your product at current BOM cost."
"07|Financial Modeling|Building a 3-statement financial model;Revenue projections and driver-based forecasting;Scenario and sensitivity analysis;Modeling hardware + recurring-revenue businesses|Build a 3-year financial model with best-base-worst-case scenarios."
"08|Corporate Finance Fundamentals|Time value of money;NPV and IRR;Capital budgeting decisions;Cost of capital and WACC|Evaluate a capital investment decision (e.g., injection-molding tooling) using NPV/IRR."
"09|Cash Flow & Working Capital Management|Cash flow forecasting;Working capital management for hardware inventory;Runway calculation and burn rate management;Managing supplier terms and receivables|Build a 12-month cash flow forecast and calculate current runway."
"10|Startup Fundraising Fundamentals|Funding stages - pre-seed through Series C;Term sheets and key terms;Cap table basics;SAFE notes and convertible notes|Build a simple cap table model showing dilution across two hypothetical funding rounds."
"11|Valuation|Valuation methods - comparables, DCF, VC method;Pre-money vs post-money valuation;Dilution mechanics;Valuing early-stage hardware-IoT startups|Produce a valuation range using at least two methods and reconcile the difference."
"12|Venture Capital & Investor Relations|The VC landscape and investor types;Pitching and the fundraising process;Due diligence - what investors check;Investor relations and board management|Prepare an investor pitch deck outline and a due diligence data-room checklist."
"13|Alternative Financing & Grants|Government and innovation grants;Debt financing for hardware companies;Revenue-based financing;Crowdfunding and pre-sales|Identify three non-dilutive funding sources and draft a grant application outline."
"14|Corporate Strategy & Growth|Growth strategy - penetration, expansion, diversification;Adjacent market expansion;M&A as a growth lever (overview);Platform strategy - sensor to full monitoring platform|Map your expansion path from a single product to a broader platform."
"15|Strategic Partnerships & Alliances|Partnership strategy and selection;Licensing deals;Joint ventures;Channel and distributor partnerships|Identify and evaluate two potential strategic partners (e.g., a CM, a distributor)."
"16|Risk Management & Corporate Governance|Enterprise risk assessment;Corporate governance structures;Board composition and responsibilities;Regulatory and compliance risk|Build a risk register covering supply chain, regulatory, and financial risks."
"17|International Business & Global Expansion|Market entry strategies;International finance and currency risk;Cross-border operations and logistics;Localization for regulatory and market differences|Draft a market entry plan for expanding beyond your home market."
"18|Mergers, Acquisitions & Exit Strategy|The M&A process;Due diligence from the seller's side;Exit strategies - acquisition vs IPO;Deal structuring basics|Outline a hypothetical exit strategy and the milestones needed to reach it."
"19|Corporate Development & Investment Strategy|The corporate development function;Building an investment thesis;Portfolio strategy as the company scales;Build vs buy vs partner decisions|Write an investment thesis for your next major product or market bet."
"20|Founder Finance & Strategy Studio (Capstone)|Capstone integration of financial modeling, valuation, fundraising, and corporate strategy|Graduate with a 3-statement financial model with scenarios, a valuation analysis, a cap table and fundraising plan, an investor-ready pitch deck, a risk register, and a corporate growth strategy."
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
  echo "# School of Business Strategy & Corporate Finance (BSCF)"
  echo
  echo "> Mission: Learn to build, finance, and strategically steer a company"
  echo "> around a validated, engineered product — from unit economics and"
  echo "> financial modeling through fundraising, valuation, and long-term"
  echo "> corporate strategy."
  echo
  echo "20 modules across five arcs: Strategy Foundations (1-4), Finance &"
  echo "Accounting (5-9), Fundraising & Capital (10-13), Corporate Strategy &"
  echo "Growth (14-19), and the Capstone (20)."
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
  echo "Engineering & Design (PED)."
  echo "After this school: Leadership & Organizational Excellence ->"
  echo "Entrepreneurship & Venture Building."
} > "$TARGET/README.md"

# ---------------------------------------------------------------------------
# PROGRESS.md — simple tracker across all modules
# ---------------------------------------------------------------------------
{
  echo "# BSCF School — Progress Tracker"
  echo
  echo "| Module | Title | Status |"
  echo "|---|---|---|"
  for entry in "${MODULES[@]}"; do
    IFS='|' read -r NUM TITLE TOPICS PROJECT <<< "$entry"
    echo "| ${NUM} | ${TITLE} | Not started |"
  done
} > "$TARGET/PROGRESS.md"

echo "BSCF School scaffolded at: $TARGET"
echo "Open '$TARGET' as an Obsidian vault, or start with $TARGET/README.md"

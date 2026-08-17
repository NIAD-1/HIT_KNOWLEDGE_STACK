#!/usr/bin/env bash
#
# build_loe_school.sh
#
# Scaffolds a 20-module "School of Leadership & Organizational Excellence"
# vault (Obsidian-compatible) for Founder's University.
#
# Structure matches the HIT_Knowledge_Stack pattern: every topic inside a
# module gets its own folder, and every topic folder gets three notes —
# Research.md, Assignment.md, Learning.md.
#
# Usage:
#   chmod +x build_loe_school.sh
#   ./build_loe_school.sh [target-directory]
#
# Default target directory: ./LOE-School

set -euo pipefail

TARGET="${1:-LOE-School}"

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
"01|Leadership Foundations|Leadership styles and when each applies;Self-awareness and emotional intelligence;Leading vs managing;Founder-as-leader identity and default habits;Values-driven leadership|Write a one-page personal leadership philosophy for how you intend to lead HIT."
"02|Communication & Influence|Effective communication fundamentals;Active listening;Persuasion and influence without authority;Having difficult conversations;Public speaking for technical and non-technical audiences|Draft and deliver a 5-minute pitch of HIT's mission to a non-technical audience."
"03|Decision-Making & Problem Solving|Decision-making frameworks;Cognitive biases in leadership decisions;Problem-solving under uncertainty;Prioritization frameworks for a resource-constrained founder|Apply a decision framework to a real open decision facing HIT right now and document the reasoning."
"04|Personal Productivity & Time Management|Time management systems for founders;Delegation as a productivity lever;Energy management vs time management;Preventing founder burnout|Audit a week of your own time and redesign it against HIT's current priorities."
"05|Hiring & Recruiting|Defining roles before hiring;Sourcing candidates for an early-stage startup;Interviewing and technical hiring;Hiring for a one-engineer-to-small-team transition|Write a job description and interview scorecard for HIT's first technical hire."
"06|Onboarding & Team Building|Onboarding design for new hires;Team formation stages;Psychological safety;Remote and hybrid team dynamics|Design a 30-60-90 day onboarding plan for HIT's first hire."
"07|Performance Management|Goal-setting - OKRs and KPIs;Giving and receiving feedback;Performance reviews;Managing underperformance|Set OKRs for HIT for the next quarter and define how you'll review progress."
"08|Compensation & Equity|Compensation structures for startups;Equity and stock option basics;Vesting schedules;Benefits on a startup budget|Draft a compensation and equity framework for HIT's first three hires."
"09|Conflict Resolution & Difficult Conversations|Conflict styles and when each helps or hurts;Mediation basics;Negotiation fundamentals;Handling co-founder or key-hire conflict|Role-play in writing a difficult conversation you anticipate needing to have as HIT grows."
"10|Organizational Design|Organizational structures - flat, hierarchical, matrix;Reporting lines and span of control;Scaling structure from 1 to N employees;When to introduce management layers|Draft HIT's org chart for 5, 15, and 30 people."
"11|Culture Building|Defining core values;Codifying culture into practices, not posters;Hiring for culture fit vs culture add;Building culture in remote-distributed teams|Write HIT's founding culture document - values, norms, and how they show up in daily decisions."
"12|Diversity, Equity & Inclusion|DEI fundamentals for startups;Inclusive hiring practices;Mitigating bias in hiring and promotion;Building genuinely inclusive teams|Review HIT's hiring process against an inclusive-hiring checklist and revise it."
"13|Change Management|Managing organizational change;Communicating change to a small team;Handling resistance to change;Change management during pivots or restructuring|Write a change-communication plan for a hypothetical major shift."
"14|Executive Leadership|C-suite dynamics as the company adds executives;Executive presence;Leading through ambiguity;Crisis leadership basics|Identify which executive functions HIT will need first and when."
"15|Board & Stakeholder Management|Working effectively with a board of directors;Stakeholder mapping;Managing investor relationships day-to-day;Preparing board updates and board decks|Draft a quarterly board update template for HIT."
"16|Delegation & Scaling Yourself|Delegation frameworks;Building a leadership team;Letting go of operational control;Avoiding the founder-as-bottleneck trap|List every task you currently own and mark which should be delegated in the next 6 months, and to whom."
"17|Coaching & Mentorship|Core coaching skills;Mentoring junior team members;Building a learning organization;Manager-as-coach vs manager-as-boss|Design a lightweight mentorship structure for HIT as it adds junior engineers."
"18|Cross-Functional Leadership|Leading across engineering, operations, and sales;Matrix management;Aligning cross-functional teams around shared goals;Resolving cross-functional priority conflicts|Map how a single feature or product decision flows across HIT's engineering, ops, and sales functions today."
"19|Crisis Leadership & Resilience|Crisis management fundamentals;Building personal and organizational resilience;Leading through failure and setbacks;Post-mortems and organizational learning|Write a post-mortem template HIT will use after any significant failure."
"20|Founder Leadership Studio (Capstone)|Capstone integration of leadership philosophy, org design, hiring, culture, and board management|Graduate with a personal leadership philosophy, an org chart for the next 18 months, a hiring plan, a culture document, a board management plan, and a delegation roadmap."
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
  echo "# School of Leadership & Organizational Excellence (LOE)"
  echo
  echo "> Mission: Learn to lead yourself, lead other people, and design the"
  echo "> organization that carries a funded, engineered product to scale —"
  echo "> hiring, culture, management, governance, and executive leadership."
  echo
  echo "20 modules across five arcs: Leadership Foundations (1-4), People & Team"
  echo "Building (5-9), Organizational Design & Culture (10-13), Executive &"
  echo "Strategic Leadership (14-19), and the Capstone (20)."
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
  echo "Engineering & Design (PED); Business Strategy & Corporate Finance (BSCF)."
  echo "After this school: Entrepreneurship & Venture Building."
} > "$TARGET/README.md"

# ---------------------------------------------------------------------------
# PROGRESS.md — simple tracker across all modules
# ---------------------------------------------------------------------------
{
  echo "# LOE School — Progress Tracker"
  echo
  echo "| Module | Title | Status |"
  echo "|---|---|---|"
  for entry in "${MODULES[@]}"; do
    IFS='|' read -r NUM TITLE TOPICS PROJECT <<< "$entry"
    echo "| ${NUM} | ${TITLE} | Not started |"
  done
} > "$TARGET/PROGRESS.md"

echo "LOE School scaffolded at: $TARGET"
echo "Open '$TARGET' as an Obsidian vault, or start with $TARGET/README.md"

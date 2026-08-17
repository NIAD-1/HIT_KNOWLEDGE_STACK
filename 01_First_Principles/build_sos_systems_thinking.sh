#!/usr/bin/env bash
#
# build_sos_systems_thinking.sh
# Scaffolds Module 3: Systems Thinking into the existing School of Science
# (SoS) vault. Matches the pattern used by build_sos_school.sh: every topic
# gets its own folder containing Research.md, Assignment.md, and Learning.md.
#
# Usage:
#   chmod +x build_sos_systems_thinking.sh
#   ./build_sos_systems_thinking.sh [sos_school_dir]
#
# If sos_school_dir is omitted, defaults to ./SoS-School (the same root
# build_sos_school.sh creates), and Module-3-Systems-Thinking is added
# inside it alongside Module-1-Mathematics and Module-2-Physics.

set -euo pipefail

ROOT="${1:-SoS-School}"
MODULE_NAME="Module-3-Systems-Thinking"

echo "Building Systems Thinking module at: $ROOT/$MODULE_NAME"

TOPICS=(
  "Systems-Theory:Systems,Subsystems,Boundaries,Inputs-and-Outputs"
  "Feedback-and-Causality:Feedback-Loops,Reinforcing-vs-Balancing-Loops,Causal-Loop-Diagrams,Delays"
  "System-Dynamics:Stocks-and-Flows,Leverage-Points,Simulation-Models"
  "Complexity-and-Emergence:Emergent-Behavior,Nonlinearity,Self-Organization,Tipping-Points"
  "Cybernetics:Control-and-Communication,Homeostasis,Requisite-Variety"
  "Failure-Modes:Cascading-Failures,Bullwhip-Effect,Unintended-Consequences"
  "Systems-Mapping:Stakeholder-Maps,Value-Stream-Maps,Systems-Archetypes"
)
PROJECTS=("Causal-Loop-Diagram-Toolkit" "Cold-Chain-System-Dynamics-Model" "Failure-Mode-Simulator")
APPLICATIONS="IIoT network design, cold chain resilience, sensor network failure analysis, org design, product/market feedback loops"
FOUNDER_NOTE="Where in the cold chain system is the leverage point — the one change that would ripple through the whole network for the least effort?"

# ---------------------------------------------------------------------------
# Helper: create a topic folder with its three standard files
# ---------------------------------------------------------------------------
make_topic() {
  local module_path="$1"
  local topic="$2"
  local subtopics="$3"

  local topic_dir="$module_path/$topic"
  mkdir -p "$topic_dir"

  cat > "$topic_dir/Research.md" <<EOF
# ${topic//-/ } — Research

## Subtopics
$(echo "$subtopics" | tr ',' '\n' | sed 's/^/- /' | sed 's/-/ /2g')

## Key Resources
- (add papers, textbook chapters, courses)

## Notes
-
EOF

  cat > "$topic_dir/Assignment.md" <<EOF
# ${topic//-/ } — Assignment

## Objective
Demonstrate working understanding of: ${subtopics//,/, }

## Tasks
- [ ]

## Output Artifact
-
EOF

  cat > "$topic_dir/Learning.md" <<EOF
# ${topic//-/ } — Learning Log

## Date Started
-

## Key Takeaways
-

## Open Questions
-

## Links to Product Work
-
EOF
}

# ---------------------------------------------------------------------------
# Build module
# ---------------------------------------------------------------------------
module_path="$ROOT/$MODULE_NAME"
mkdir -p "$module_path"

cat > "$module_path/README.md" <<EOF
# ${MODULE_NAME//-/ }

Part of the School of Science, HIT Founder's University.

## Topics
$(for entry in "${TOPICS[@]}"; do echo "- ${entry%%:*}"; done)
EOF

for entry in "${TOPICS[@]}"; do
  topic="${entry%%:*}"
  subtopics="${entry#*:}"
  make_topic "$module_path" "$topic" "$subtopics"
done

mkdir -p "$module_path/Projects"
for project in "${PROJECTS[@]}"; do
  mkdir -p "$module_path/Projects/$project"
  cat > "$module_path/Projects/$project/README.md" <<EOF
# ${project//-/ }

## Goal
-

## Status
Not started

## Notes
-
EOF
done

mkdir -p "$module_path/Research"
cat > "$module_path/Research/Landmark-Papers.md" <<EOF
# Landmark Papers — ${MODULE_NAME//-/ }

Papers that changed this field for engineering and AI.

| Paper | Author(s) | Year | Why it matters | Status |
|---|---|---|---|---|
|  |  |  |  | Not started |
EOF

cat > "$module_path/Applications.md" <<EOF
# Applications — ${MODULE_NAME//-/ }

How this module powers:
$(echo "$APPLICATIONS" | tr ',' '\n' | sed 's/^ */- /')
EOF

cat > "$module_path/Founder-Notes.md" <<EOF
# Founder Notes — ${MODULE_NAME//-/ }

$FOUNDER_NOTE
EOF

echo "  Built $MODULE_NAME ($(find "$module_path" -type f | wc -l | tr -d ' ') files)"
echo ""
echo "Done. Module added at: $module_path"

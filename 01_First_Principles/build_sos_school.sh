#!/usr/bin/env bash
#
# build_sos_school.sh
# Scaffolds the School of Science (SoS) vault for HIT's Founder's University.
# Follows the same pattern as RDI-School, PED-School, BSCF-School, LOE-School,
# EVB-School, GS-School, ID-School: every topic gets its own folder containing
# Research.md, Assignment.md, and Learning.md.
#
# Usage:
#   chmod +x build_sos_school.sh
#   ./build_sos_school.sh [target_dir]
#
# If target_dir is omitted, the vault is created as ./SoS-School

set -euo pipefail

ROOT="${1:-SoS-School}"

echo "Building School of Science vault at: $ROOT"

# ---------------------------------------------------------------------------
# Module definitions
# Format: "Module Folder|Topic1,Topic2,Topic3,..."
# ---------------------------------------------------------------------------

MODULE_1_NAME="Module-1-Mathematics"
MODULE_1_TOPICS=(
  "Algebra:Variables,Constants,Expressions,Equations,Inequalities,Polynomials,Rational-Expressions,Exponents,Logarithms,Functions,Function-Composition,Inverse-Functions"
  "Trigonometry:Angles,Radians,Unit-Circle,Trigonometric-Functions,Identities,Inverse-Trigonometry"
  "Calculus-I:Limits,Continuity,Derivatives,Applications,Optimization,Related-Rates"
  "Calculus-II:Integration,Numerical-Integration,Differential-Equations,Sequences,Series"
  "Multivariable-Calculus:Partial-Derivatives,Gradient,Jacobian,Hessian,Multiple-Integrals,Vector-Calculus"
  "Linear-Algebra:Vectors,Vector-Spaces,Matrices,Matrix-Operations,Determinants,Eigenvalues,Eigenvectors,Singular-Value-Decomposition,PCA"
  "Discrete-Math:Set-Theory,Logic,Combinatorics,Number-Theory,Recurrence-Relations"
  "Complex-Numbers:Complex-Plane,Polar-Form,Euler-Formula,Complex-Functions"
  "Probability:Probability-Rules,Bayes,Conditional-Probability,Random-Variables,Distributions"
  "Statistics:Descriptive-Statistics,Regression,ANOVA,Confidence-Intervals,Hypothesis-Testing"
  "Numerical-Methods:Root-Finding,Interpolation,Numerical-Differentiation,Error-Analysis"
  "Optimization:Convex-Optimization,Linear-Programming,Dynamic-Programming,Gradient-Descent,Lagrange-Multipliers"
  "Graph-Theory:Trees,Networks,Paths,Flow-Networks,Graph-Algorithms"
  "Information-Theory:Entropy,Compression,Coding-Theory,Mutual-Information"
)
MODULE_1_PROJECTS=("AI-Mathematics-Notebook" "Optimization-Solver" "Statistical-Analysis-Toolkit")
MODULE_1_APPLICATIONS="AI, Robotics, Finance, IIoT, Computer Vision"
MODULE_1_FOUNDER_NOTE="When should you hire a mathematician instead of solving the problem with software?"

MODULE_2_NAME="Module-2-Physics"
MODULE_2_TOPICS=(
  "Classical-Mechanics:Motion,Forces,Energy,Momentum,Rotational-Dynamics,Oscillations"
  "Electricity:Charge,Current,Voltage,Resistance,Power,Capacitance"
  "Magnetism:Magnetic-Fields,Electromagnetic-Induction,Transformers,Motors"
  "Thermodynamics:Heat,Temperature,Entropy,Heat-Transfer"
  "Fluid-Mechanics:Pressure,Flow,Viscosity,Bernoulli-Equation,Flow-Measurement"
  "Waves:Sound,Light,Electromagnetic-Waves"
  "Signal-Processing:Fourier-Analysis,Filtering,Sampling,Noise"
  "Semiconductor-Physics:PN-Junctions,Diodes,Transistors,MOSFETs"
  "Sensors-and-Metrology:Measurement-Theory,Calibration,Error-and-Uncertainty,Sensor-Types"
  "Control-Systems:Feedback-Loops,Transfer-Functions,PID-Control,Stability"
)
MODULE_2_PROJECTS=("Circuit-Simulator" "Sensor-Calibration-Rig" "Physical-Experiment-Log")
MODULE_2_APPLICATIONS="IIoT hardware design, cold chain sensor accuracy, embedded systems, power electronics"
MODULE_2_FOUNDER_NOTE="Build experiments, not just simulations."

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
# Helper: build a full module
# ---------------------------------------------------------------------------
make_module() {
  local module_name="$1"
  shift
  local topics_arr_name="$1"
  shift
  local projects_arr_name="$1"
  shift
  local applications="$1"
  shift
  local founder_note="$1"

  # bash 3.2 (macOS default) has no `local -n` nameref support, so pull the
  # named array's contents into a local array via eval instead.
  local topics_ref=()
  eval "topics_ref=(\"\${${topics_arr_name}[@]}\")"
  local projects_ref=()
  eval "projects_ref=(\"\${${projects_arr_name}[@]}\")"

  local module_path="$ROOT/$module_name"
  mkdir -p "$module_path"

  cat > "$module_path/README.md" <<EOF
# ${module_name//-/ }

Part of the School of Science, HIT Founder's University.

## Topics
$(for entry in "${topics_ref[@]}"; do echo "- ${entry%%:*}"; done)
EOF

  for entry in "${topics_ref[@]}"; do
    local topic="${entry%%:*}"
    local subtopics="${entry#*:}"
    make_topic "$module_path" "$topic" "$subtopics"
  done

  mkdir -p "$module_path/Projects"
  for project in "${projects_ref[@]}"; do
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
# Landmark Papers — ${module_name//-/ }

Papers that changed this field for engineering and AI.

| Paper | Author(s) | Year | Why it matters | Status |
|---|---|---|---|---|
|  |  |  |  | Not started |
EOF

  cat > "$module_path/Applications.md" <<EOF
# Applications — ${module_name//-/ }

How this module powers:
$(echo "$applications" | tr ',' '\n' | sed 's/^ */- /')
EOF

  cat > "$module_path/Founder-Notes.md" <<EOF
# Founder Notes — ${module_name//-/ }

$founder_note
EOF

  echo "  Built $module_name ($(find "$module_path" -type f | wc -l | tr -d ' ') files)"
}

# ---------------------------------------------------------------------------
# Build vault
# ---------------------------------------------------------------------------
mkdir -p "$ROOT"

cat > "$ROOT/README.md" <<EOF
# School of Science

Part of HIT's Founder's University.

## Modules
- Module 1: Mathematics
- Module 2: Physics

Each topic folder contains:
- Research.md — background, resources, notes
- Assignment.md — hands-on task to prove understanding
- Learning.md — running log of takeaways and links to product work
EOF

make_module "$MODULE_1_NAME" MODULE_1_TOPICS MODULE_1_PROJECTS "$MODULE_1_APPLICATIONS" "$MODULE_1_FOUNDER_NOTE"
make_module "$MODULE_2_NAME" MODULE_2_TOPICS MODULE_2_PROJECTS "$MODULE_2_APPLICATIONS" "$MODULE_2_FOUNDER_NOTE"

echo ""
echo "Done. Vault created at: $ROOT"
echo "Total files: $(find "$ROOT" -type f | wc -l | tr -d ' ')"

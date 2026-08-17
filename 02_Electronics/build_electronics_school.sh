#!/usr/bin/env bash
#
# build_electronics_school.sh
# Scaffolds the School of Electronics vault for HIT's Founder's University.
# Follows the same pattern as SoS-School, RDI-School, PED-School, etc.:
# every topic gets its own folder containing Research.md, Assignment.md,
# and Learning.md.
#
# Compatible with bash 3.2 (macOS default) — no namerefs, no assoc arrays.
#
# Usage:
#   chmod +x build_electronics_school.sh
#   ./build_electronics_school.sh [target_dir]
#
# If target_dir is omitted, the vault is created as ./Electronics-School

set -euo pipefail

ROOT="${1:-Electronics-School}"

echo "Building School of Electronics vault at: $ROOT"

# ---------------------------------------------------------------------------
# Module definitions
# Each module has: NAME, TOPICS array ("Topic:Sub1,Sub2,..."), PROJECTS array
# ---------------------------------------------------------------------------

MODULE_COUNT=12

MODULE_1_NAME="Module-1-Electrical-Fundamentals"
MODULE_1_TOPICS=(
  "Atomic-Theory:Structure-of-the-Atom,Electrons,Protons,Neutrons,Valence-Electrons,Conductors,Insulators,Semiconductors,Charge-Movement,Electric-Fields"
  "Electrical-Quantities:Electric-Charge,Current,Voltage,Resistance,Power,Energy,Frequency,Period,Capacitance,Inductance,Impedance,Reactance"
  "Ohms-Law:Ohms-Law,Power-Law,Kirchhoffs-Current-Law,Kirchhoffs-Voltage-Law,Series-Circuits,Parallel-Circuits,Combination-Circuits,Voltage-Divider,Current-Divider"
  "Circuit-Analysis:Node-Analysis,Mesh-Analysis,Superposition,Thevenin-Theorem,Norton-Theorem,Maximum-Power-Transfer"
)
MODULE_1_PROJECTS=("Analyze-Household-Circuits" "Design-LED-Circuits" "Build-Voltage-Divider-Experiments")

MODULE_2_NAME="Module-2-Passive-Components"
MODULE_2_TOPICS=(
  "Resistors:Carbon-Resistors,Metal-Film,Wire-Wound,SMD-Resistors,Color-Coding,Tolerance,Power-Rating,Pull-Up-Resistors,Pull-Down-Resistors"
  "Capacitors:Ceramic,Electrolytic,Film,Tantalum,Supercapacitors,Charging,Discharging,RC-Circuits,Filtering,Decoupling"
  "Inductors:Magnetic-Fields,Coils,Chokes,RL-Circuits,LC-Circuits"
  "Transformers:Step-Up,Step-Down,Isolation,Efficiency,Three-Phase-Transformers"
)
MODULE_2_PROJECTS=("RC-Timer" "LC-Filter" "Power-Supply-Filter")

MODULE_3_NAME="Module-3-Semiconductor-Physics"
MODULE_3_TOPICS=(
  "Semiconductor-Basics:Silicon,Germanium,Crystal-Lattice,Energy-Bands,Intrinsic-Semiconductors,Extrinsic-Semiconductors,Doping,N-Type,P-Type"
  "PN-Junction:Depletion-Region,Forward-Bias,Reverse-Bias,Breakdown,Junction-Capacitance"
  "Diodes:Rectifier-Diode,Zener-Diode,Schottky-Diode,TVS-Diode,LED,Laser-Diode,Photodiode"
  "Diode-Applications:Rectification,Voltage-Regulation,Protection,Signal-Clipping"
)
MODULE_3_PROJECTS=("AC-to-DC-Rectifier" "LED-Driver" "Voltage-Regulator")

MODULE_4_NAME="Module-4-Transistors"
MODULE_4_TOPICS=(
  "Bipolar-Junction-Transistors:NPN,PNP,Active-Region,Saturation,Cutoff,Biasing,Common-Emitter,Common-Collector,Common-Base"
  "MOSFETs:Enhancement-MOSFET,Depletion-MOSFET,Gate,Source,Drain,Threshold-Voltage,Switching,Power-MOSFET"
  "IGBTs-and-Power-Switching:High-Power-Switching,Motor-Control"
)
MODULE_4_PROJECTS=("Motor-Driver" "LED-Dimmer" "Switching-Circuits")

MODULE_5_NAME="Module-5-Analog-Electronics"
MODULE_5_TOPICS=(
  "Amplifiers:Operational-Amplifiers,Gain,Inverting-Amplifier,Non-Inverting-Amplifier,Comparator,Differential-Amplifier,Instrumentation-Amplifier"
  "Filters:Low-Pass,High-Pass,Band-Pass,Band-Stop,Active-Filters,Passive-Filters"
  "Oscillators:RC-Oscillator,Crystal-Oscillator,Phase-Locked-Loop"
)
MODULE_5_PROJECTS=("Audio-Amplifier" "Sensor-Amplifier" "Noise-Filter")

MODULE_6_NAME="Module-6-Digital-Electronics"
MODULE_6_TOPICS=(
  "Number-Systems:Binary,Octal,Decimal,Hexadecimal,BCD,Gray-Code"
  "Boolean-Algebra:AND,OR,NOT,NAND,NOR,XOR,XNOR"
  "Logic-Gates:Truth-Tables,Logic-Simplification,Karnaugh-Maps"
  "Combinational-Logic:Adders,Multiplexers,Demultiplexers,Encoders,Decoders,Comparators"
  "Sequential-Logic:Flip-Flops,Registers,Counters,Finite-State-Machines"
)
MODULE_6_PROJECTS=("Digital-Clock" "Binary-Counter" "Alarm-System")

MODULE_7_NAME="Module-7-Power-Electronics"
MODULE_7_TOPICS=(
  "AC-and-DC-Power:AC-Power,DC-Power,Rectifiers,Inverters"
  "DC-DC-Converters:Buck-Converters,Boost-Converters,Buck-Boost-Converters,Linear-Regulators,Switching-Regulators"
  "Battery-and-Solar-Systems:Battery-Charging,Solar-Power-Systems,UPS-Systems,Battery-Management-Systems"
)
MODULE_7_PROJECTS=("Solar-Charger" "Portable-Power-Station" "LiFePO4-Battery-Pack")

MODULE_8_NAME="Module-8-Sensors-and-Instrumentation"
MODULE_8_TOPICS=(
  "Temperature-Sensors:Thermistors,RTDs,Thermocouples,Digital-Sensors"
  "Pressure-and-Force-Sensors:Piezoelectric,MEMS,Strain-Gauges,Load-Cells"
  "Environmental-Sensors:Humidity-Sensors,Gas-Sensors,Water-Quality-Sensors"
  "Electrical-Sensors:Current-Sensors,Voltage-Sensors"
  "Motion-Sensors:Accelerometers,Gyroscopes,Magnetometers,Vibration-Sensors"
  "Flow-Sensors:Flow-Sensors"
  "Vision-and-Identification:Cameras,CMOS,CCD,Machine-Vision,RFID,NFC,Barcode-Scanners,QR-Code-Readers"
)
MODULE_8_PROJECTS=("Smart-Warehouse-Monitor" "Cold-Chain-Logger" "Smart-Electricity-Meter" "Drug-Transport-Tracker")

MODULE_9_NAME="Module-9-Signal-Processing"
MODULE_9_TOPICS=(
  "Signals-and-Sampling:Analog-Signals,Digital-Signals,Sampling,Nyquist-Theorem,Quantization"
  "Conversion:ADC,DAC"
  "Signal-Conditioning:Noise,Signal-Conditioning,Filtering"
  "Frequency-Analysis:Fast-Fourier-Transform"
)
MODULE_9_PROJECTS=("ECG-Signal-Analysis" "Sensor-Noise-Filtering" "Vibration-Analysis")

MODULE_10_NAME="Module-10-PCB-Design"
MODULE_10_TOPICS=(
  "Schematics-and-Layout:Electronic-Schematics,PCB-Layout,Trace-Routing,Ground-Planes"
  "EMI-EMC-and-High-Speed-Design:EMI-EMC-Basics,High-Speed-Design-Principles,Differential-Pairs"
  "DFM-DFA-and-Testing:Design-for-Manufacturing,Design-for-Assembly,PCB-Testing"
  "PCB-Tools:KiCad,Altium-Designer,EasyEDA"
)
MODULE_10_PROJECTS=("Design-ESP32-Development-Board" "Design-Sensor-Interface-Board" "Design-Power-Distribution-Board")

MODULE_11_NAME="Module-11-Testing-and-Debugging"
MODULE_11_TOPICS=(
  "Bench-Instruments:Multimeter,Oscilloscope,Logic-Analyzer,Signal-Generator,Bench-Power-Supply"
  "Soldering-and-Rework:Soldering,Rework"
  "Fault-Diagnosis-and-Reliability:Fault-Diagnosis,Reliability-Testing"
)
MODULE_11_PROJECTS=("Board-Bring-Up-Checklist" "Fault-Injection-Test-Bench")

MODULE_12_NAME="Module-12-Manufacturing-Electronics"
MODULE_12_TOPICS=(
  "Assembly-Technologies:Surface-Mount-Technology,Through-Hole-Assembly,Pick-and-Place-Machines,Reflow-Soldering,Wave-Soldering"
  "PCB-Fabrication-and-Sourcing:PCB-Fabrication,Component-Sourcing,Bill-of-Materials"
  "Quality-and-Standards:Quality-Control,IPC-Standards"
)
MODULE_12_PROJECTS=("BOM-and-Sourcing-Plan" "First-Article-Inspection-Checklist")

CAPSTONE_PROJECTS=(
  "ESP32-Environmental-Monitoring-Device"
  "Cold-Chain-Temperature-Logger-for-Pharmaceuticals"
  "GPS-and-Sensor-Tracker-for-Medicine-Transport"
  "Battery-Powered-LoRaWAN-Sensor-Node"
  "Smart-Warehouse-Monitoring-System"
  "Custom-PCB-Instead-of-Dev-Board"
  "Field-Testable-Hardware-Prototype"
)

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
- (add datasheets, textbook chapters, courses, app notes)

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
# Helper: build one module from its NAME/TOPICS/PROJECTS variable names
# ---------------------------------------------------------------------------
make_module() {
  local module_name_var="$1"
  local topics_arr_name="$2"
  local projects_arr_name="$3"

  local module_name
  eval "module_name=\"\${$module_name_var}\""

  # bash 3.2 (macOS default) has no `local -n` nameref support, so pull the
  # named arrays' contents into local arrays via eval instead.
  local topics_ref=()
  eval "topics_ref=(\"\${${topics_arr_name}[@]}\")"
  local projects_ref=()
  eval "projects_ref=(\"\${${projects_arr_name}[@]}\")"

  local module_path="$ROOT/$module_name"
  mkdir -p "$module_path"

  cat > "$module_path/README.md" <<EOF
# ${module_name//-/ }

Part of the School of Electronics, HIT Founder's University.

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

  echo "  Built $module_name ($(find "$module_path" -type f | wc -l | tr -d ' ') files)"
}

# ---------------------------------------------------------------------------
# Build vault
# ---------------------------------------------------------------------------
mkdir -p "$ROOT"

cat > "$ROOT/README.md" <<EOF
# School of Electronics

Founder's University — HIT

## Mission
Understand how electricity becomes intelligence: how to go from electrons
moving through a wire to an AI system monitoring a pharmaceutical warehouse.

## Modules
1. Electrical Fundamentals
2. Passive Components
3. Semiconductor Physics
4. Transistors
5. Analog Electronics
6. Digital Electronics
7. Power Electronics
8. Sensors & Instrumentation
9. Signal Processing
10. PCB Design
11. Testing & Debugging
12. Manufacturing Electronics

Each topic folder contains:
- Research.md — background, datasheets, resources, notes
- Assignment.md — hands-on task to prove understanding
- Learning.md — running log of takeaways and links to product work
EOF

for i in $(seq 1 "$MODULE_COUNT"); do
  make_module "MODULE_${i}_NAME" "MODULE_${i}_TOPICS" "MODULE_${i}_PROJECTS"
done

# Final capstone projects (top-level, spans the whole school)
mkdir -p "$ROOT/Capstone-Projects"
cat > "$ROOT/Capstone-Projects/README.md" <<EOF
# Capstone Projects

By the end of the School of Electronics, you should be capable of
designing and building each of the following.
EOF
for project in "${CAPSTONE_PROJECTS[@]}"; do
  mkdir -p "$ROOT/Capstone-Projects/$project"
  cat > "$ROOT/Capstone-Projects/$project/README.md" <<EOF
# ${project//-/ }

## Goal
-

## Status
Not started

## Modules Drawn On
-

## Notes
-
EOF
done

echo ""
echo "Done. Vault created at: $ROOT"
echo "Total files: $(find "$ROOT" -type f | wc -l | tr -d ' ')"

#!/usr/bin/env bash
#
# build_ese_school.sh
#
# Scaffolds a 15-module "School of Embedded Systems Engineering" vault
# (Obsidian-compatible) for Founder's University.
#
# Structure matches the HIT_Knowledge_Stack pattern: every topic inside a
# module gets its own folder, and every topic folder gets three notes —
# Research.md, Assignment.md, Learning.md.
#
# Usage:
#   chmod +x build_ese_school.sh
#   ./build_ese_school.sh [target-directory]
#
# Default target directory: ./ESE-School

set -euo pipefail

TARGET="${1:-ESE-School}"

if [ -d "$TARGET" ]; then
  echo "Directory '$TARGET' already exists. Refusing to overwrite. Choose a different target or remove it first."
  exit 1
fi

mkdir -p "$TARGET"

# Turn any string into a filesystem-safe folder/file name.
sanitize() {
  echo "$1" | sed -E 's#[/:]+#-#g' | sed -E 's/^[[:space:]]+|[[:space:]]+$//g'
}

# ---------------------------------------------------------------------------
# Module data: "NN|Title|Topics (semicolon-separated)|Project"
# ---------------------------------------------------------------------------
MODULES=(
"01|Embedded Systems Architecture for IIoT|Embedded vs general-purpose;Real-time constraints;IIoT edge architecture;Hardware selection criteria|Map the hardware architecture for HIT's next-generation cold-chain edge device."
"02|Systems Programming - C to Rust|Memory layout and pointers;Modern C++ (Smart pointers, RAII);Embedded Rust (Ownership, no_std);Embedded HAL and Embassy|Write a blink and UART echo program in both C and Rust for comparison."
"03|Microcontroller Platforms & Ecosystems|ESP32 architecture and wireless;STM32 (ARM Cortex-M) peripherals;Nordic nRF52 for BLE;TI and NXP industrial MCUs|Select and justify the primary MCU for HIT's temperature monitoring node."
"04|Bare-Metal I-O and Analog Interfaces|GPIO and external interrupts;Debouncing strategies;ADC-DAC fundamentals;Signal quantization and calibration|Build an interrupt-driven button controller and calibrate a thermistor ADC reading."
"05|Digital Communication Buses|I2C multi-master systems;SPI master-slave communication;UART framing and error detection;CAN Bus for industrial automation|Write a custom I2C driver to read a high-precision digital temperature sensor."
"06|Real-Time Operating Systems (RTOS)|Deterministic execution and scheduling;FreeRTOS tasks and queues;Zephyr RTOS device trees;RTIC (Rust) for concurrency|Build a multi-tasking sensor hub using FreeRTOS or Zephyr to read sensors and manage network state."
"07|Embedded Linux & Edge Gateways|Boot process and U-Boot;Yocto Project and Buildroot;Cross-compilation;Writing Linux device drivers|Compile a minimal custom Linux image using Yocto for an industrial edge gateway."
"08|IIoT Connectivity & Wireless Protocols|MQTT and CoAP;LoRaWAN for long-range telemetry;Cellular (LTE-M and NB-IoT);Bluetooth Low Energy (BLE)|Implement an MQTT client on an ESP32 to publish secure telemetry to a cloud broker."
"09|Power Management & Energy Harvesting|Sleep and deep sleep modes;Battery Management Systems (BMS);Power profiling and optimization;Solar and energy harvesting|Profile and optimize a sensor node to achieve a 2-year battery life on a single coin cell."
"10|Embedded Security & Cryptography|Secure boot and OTA updates;Hardware Security Modules (HSM);Trusted Platform Modules (TPM);Anti-tamper design|Implement a cryptographically signed over-the-air (OTA) firmware update over Wi-Fi."
"11|Device Drivers & Abstraction Layers|Writing modular hardware drivers;Memory-mapped I-O;Direct Memory Access (DMA);File systems (LittleFS)|Develop a DMA-backed SPI display driver for local device diagnostics."
"12|TinyML & Edge AI|TensorFlow Lite Micro;Edge Impulse;On-device inference;Model quantization and pruning|Train and deploy a TinyML model to detect compressor vibration anomalies on an MCU."
"13|Firmware Architecture & Reliability|Layered architecture and HALs;State machines and event-driven design;Watchdog timers;Fault handling and logging|Design a robust finite state machine (FSM) for a cold-chain logger."
"14|Hardware Debugging & Testing|JTAG and SWD debugging;Using logic analyzers and oscilloscopes;Hardware-in-the-loop (HIL) testing;Unit testing for embedded|Set up an automated HIL testing pipeline for validating sensor firmware."
"15|DFM & Production Lifecycle (Capstone)|Requirements engineering;Design for Manufacturing (DFM);Environmental testing;Firmware lifecycle management|Integrate the capstone - A smart pharmaceutical cold-chain logger with cellular connectivity, OTA, and secure boot."
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
  echo "# School of Embedded Systems Engineering (ESE)"
  echo
  echo "> Mission: Learn how to build intelligent devices that sense, think, communicate, and act in the physical world."
  echo "> For Health Innovation Technology (HIT), this means engineering highly reliable, secure, and globally compliant IIoT edge infrastructure."
  echo
  echo "15 modules covering Architecture, Systems Programming, Interfacing, RTOS, IIoT Connectivity, Edge AI, Security, and Hardware Lifecycle."
  echo
  echo "Each topic inside a module has its own folder with Research, Assignment,"
  echo "and Learning notes — maintaining the HIT_Knowledge_Stack pattern."
  echo
  echo "## Modules"
  echo
  echo -e "$INDEX_LINES"
  echo "---"
  echo
  echo "School of Embedded Systems Engineering (ESE) — Building the physical foundation for HIT."
} > "$TARGET/README.md"

# ---------------------------------------------------------------------------
# PROGRESS.md — simple tracker across all modules
# ---------------------------------------------------------------------------
{
  echo "# ESE School — Progress Tracker"
  echo
  echo "| Module | Title | Status |"
  echo "|---|---|---|"
  for entry in "${MODULES[@]}"; do
    IFS='|' read -r NUM TITLE TOPICS PROJECT <<< "$entry"
    echo "| ${NUM} | ${TITLE} | Not started |"
  done
} > "$TARGET/PROGRESS.md"

echo "ESE School scaffolded at: $TARGET"
echo "Open '$TARGET' as an Obsidian vault, or start with $TARGET/README.md"

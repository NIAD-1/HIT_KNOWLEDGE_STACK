#!/bin/bash
echo 'Creating School of Systems Engineering'

MODULE="Module 01 - Introduction to Systems Engineering"
CHAPTER="$MODULE/Chapter 1.1 - Systems"
topics=(
"What is a System?"
"Definitions"
"Characteristics"
"System Boundaries"
"Inputs"
"Outputs"
"Interfaces"
"Constraints"
"Objectives"
"Environment"
"Emergent Behavior"
)
for topic in "${topics[@]}"; do
mkdir -p "$CHAPTER/$topic"
touch "$CHAPTER/$topic/Learning.md" "$CHAPTER/$topic/Assignment.md" "$CHAPTER/$topic/Research.md"
done

CHAPTER="$MODULE/Chapter 1.2 - Types of Systems"
topics=(
"Mechanical Systems"
"Electrical Systems"
"Software Systems"
"Information Systems"
"Cyber-Physical Systems"
"System of Systems (SoS)"
"Industrial Systems"
)
for topic in "${topics[@]}"; do
mkdir -p "$CHAPTER/$topic"
touch "$CHAPTER/$topic/Learning.md" "$CHAPTER/$topic/Assignment.md" "$CHAPTER/$topic/Research.md"
done

CHAPTER="$MODULE/Chapter 1.3 - Systems Thinking"
topics=(
"Holistic Thinking"
"Feedback Loops"
"Causal Loops"
"Complexity"
"Interdependencies"
"Emergence"
"Resilience"
)
for topic in "${topics[@]}"; do
mkdir -p "$CHAPTER/$topic"
touch "$CHAPTER/$topic/Learning.md" "$CHAPTER/$topic/Assignment.md" "$CHAPTER/$topic/Research.md"
done

MODULE="Module 02 - Requirements Engineering"
CHAPTER="$MODULE/Chapter 2.1 - Stakeholders"
topics=(
"Users"
"Customers"
"Regulators"
"Operators"
"Maintenance Teams"
"Management"
)
for topic in "${topics[@]}"; do
mkdir -p "$CHAPTER/$topic"
touch "$CHAPTER/$topic/Learning.md" "$CHAPTER/$topic/Assignment.md" "$CHAPTER/$topic/Research.md"
done

CHAPTER="$MODULE/Chapter 2.2 - Requirements"
topics=(
"Functional Requirements"
"Non-functional Requirements"
"Performance Requirements"
"Safety Requirements"
"Security Requirements"
"Regulatory Requirements"
)
for topic in "${topics[@]}"; do
mkdir -p "$CHAPTER/$topic"
touch "$CHAPTER/$topic/Learning.md" "$CHAPTER/$topic/Assignment.md" "$CHAPTER/$topic/Research.md"
done

CHAPTER="$MODULE/Chapter 2.3 - Requirement Quality"
topics=(
"Completeness"
"Consistency"
"Traceability"
"Verification"
"Validation"
)
for topic in "${topics[@]}"; do
mkdir -p "$CHAPTER/$topic"
touch "$CHAPTER/$topic/Learning.md" "$CHAPTER/$topic/Assignment.md" "$CHAPTER/$topic/Research.md"
done

MODULE="Module 03 - Systems Architecture"
CHAPTER="$MODULE/Chapter 3.1 - Architecture"
topics=(
"Functional Architecture"
"Physical Architecture"
"Logical Architecture"
"Service Architecture"
"Enterprise Architecture"
"Platform Architecture"
"Modular Design"
"Layered Architecture"
"Reference Architectures"
)
for topic in "${topics[@]}"; do
mkdir -p "$CHAPTER/$topic"
touch "$CHAPTER/$topic/Learning.md" "$CHAPTER/$topic/Assignment.md" "$CHAPTER/$topic/Research.md"
done

MODULE="Module 04 - Interface Engineering"
CHAPTER="$MODULE/Chapter 4.1 - Interfaces"
topics=(
"Hardware Interfaces"
"Software Interfaces"
"APIs"
"Communication Protocols"
"Mechanical Interfaces"
"Electrical Interfaces"
"Human-Machine Interfaces"
)
for topic in "${topics[@]}"; do
mkdir -p "$CHAPTER/$topic"
touch "$CHAPTER/$topic/Learning.md" "$CHAPTER/$topic/Assignment.md" "$CHAPTER/$topic/Research.md"
done

MODULE="Module 05 - System Modeling & MBSE"
CHAPTER="$MODULE/Chapter 5.1 - Modeling"
topics=(
"Functional Decomposition"
"Block Diagrams"
"Data Flow Diagrams"
"Sequence Diagrams"
"State Diagrams"
"Activity Diagrams"
"SysML Fundamentals"
"Model-Based Systems Engineering (MBSE)"
)
for topic in "${topics[@]}"; do
mkdir -p "$CHAPTER/$topic"
touch "$CHAPTER/$topic/Learning.md" "$CHAPTER/$topic/Assignment.md" "$CHAPTER/$topic/Research.md"
done

MODULE="Module 06 - Trade Studies & Decision Analysis"
CHAPTER="$MODULE/Chapter 6.1 - Decision Analysis"
topics=(
"Trade-off Analysis"
"Multi-criteria Decision Making"
"Cost-Benefit Analysis"
"Value Engineering"
"Technology Selection"
)
for topic in "${topics[@]}"; do
mkdir -p "$CHAPTER/$topic"
touch "$CHAPTER/$topic/Learning.md" "$CHAPTER/$topic/Assignment.md" "$CHAPTER/$topic/Research.md"
done

MODULE="Module 07 - Integration Engineering"
CHAPTER="$MODULE/Chapter 7.1 - Integration"
topics=(
"Hardware Integration"
"Software Integration"
"Network Integration"
"Cloud Integration"
"API Integration"
"Sensor Integration"
"ERP Integration"
"SCADA Integration"
)
for topic in "${topics[@]}"; do
mkdir -p "$CHAPTER/$topic"
touch "$CHAPTER/$topic/Learning.md" "$CHAPTER/$topic/Assignment.md" "$CHAPTER/$topic/Research.md"
done

MODULE="Module 08 - Verification & Validation"
CHAPTER="$MODULE/Chapter 8.1 - V&V"
topics=(
"Verification"
"Unit Testing"
"Integration Testing"
"System Testing"
"Regression Testing"
"Validation"
"User Acceptance Testing"
"Field Testing"
"Operational Testing"
"Compliance Testing"
"Performance"
"Reliability"
"Safety"
"Security"
)
for topic in "${topics[@]}"; do
mkdir -p "$CHAPTER/$topic"
touch "$CHAPTER/$topic/Learning.md" "$CHAPTER/$topic/Assignment.md" "$CHAPTER/$topic/Research.md"
done

MODULE="Module 09 - Reliability Engineering"
CHAPTER="$MODULE/Chapter 9.1 - RAM"
topics=(
"Reliability Concepts"
"Failure Modes"
"MTBF"
"MTTR"
"Availability"
"Maintainability"
"Fault Tolerance"
"Redundancy"
)
for topic in "${topics[@]}"; do
mkdir -p "$CHAPTER/$topic"
touch "$CHAPTER/$topic/Learning.md" "$CHAPTER/$topic/Assignment.md" "$CHAPTER/$topic/Research.md"
done

MODULE="Module 10 - Risk Engineering"
CHAPTER="$MODULE/Chapter 10.1 - Risk"
topics=(
"Risk Identification"
"Risk Assessment"
"Risk Matrix"
"FMEA"
"Fault Tree Analysis (FTA)"
"Hazard Analysis"
"Mitigation Strategies"
)
for topic in "${topics[@]}"; do
mkdir -p "$CHAPTER/$topic"
touch "$CHAPTER/$topic/Learning.md" "$CHAPTER/$topic/Assignment.md" "$CHAPTER/$topic/Research.md"
done

MODULE="Module 11 - Safety Engineering"
CHAPTER="$MODULE/Chapter 11.1 - Safety"
topics=(
"Functional Safety"
"Electrical Safety"
"Operational Safety"
"Industrial Safety"
"Medical Device Safety"
"Safety Integrity Concepts"
"Emergency Systems"
)
for topic in "${topics[@]}"; do
mkdir -p "$CHAPTER/$topic"
touch "$CHAPTER/$topic/Learning.md" "$CHAPTER/$topic/Assignment.md" "$CHAPTER/$topic/Research.md"
done

MODULE="Module 12 - Systems Security Engineering"
CHAPTER="$MODULE/Chapter 12.1 - Security"
topics=(
"Security by Design"
"Threat Modeling"
"Secure Architecture"
"Zero Trust"
"Cyber Resilience"
)
for topic in "${topics[@]}"; do
mkdir -p "$CHAPTER/$topic"
touch "$CHAPTER/$topic/Learning.md" "$CHAPTER/$topic/Assignment.md" "$CHAPTER/$topic/Research.md"
done

MODULE="Module 13 - Lifecycle Engineering"
CHAPTER="$MODULE/Chapter 13.1 - Lifecycle"
topics=(
"Concept"
"Design"
"Development"
"Testing"
"Deployment"
"Operation"
"Maintenance"
"Upgrades"
"End-of-Life"
"Disposal"
)
for topic in "${topics[@]}"; do
mkdir -p "$CHAPTER/$topic"
touch "$CHAPTER/$topic/Learning.md" "$CHAPTER/$topic/Assignment.md" "$CHAPTER/$topic/Research.md"
done

MODULE="Module 14 - Configuration Management"
CHAPTER="$MODULE/Chapter 14.1 - Configuration"
topics=(
"Version Control"
"Hardware Revisions"
"Firmware Versions"
"Software Releases"
"Bills of Materials (BOM)"
"Documentation Management"
"Change Control"
)
for topic in "${topics[@]}"; do
mkdir -p "$CHAPTER/$topic"
touch "$CHAPTER/$topic/Learning.md" "$CHAPTER/$topic/Assignment.md" "$CHAPTER/$topic/Research.md"
done

MODULE="Module 15 - Project & Program Engineering"
CHAPTER="$MODULE/Chapter 15.1 - Project Management"
topics=(
"WBS"
"Scheduling"
"Resource Planning"
"Cost Estimation"
"Technical Reviews"
"Milestones"
"Decision Gates"
"SEMP"
)
for topic in "${topics[@]}"; do
mkdir -p "$CHAPTER/$topic"
touch "$CHAPTER/$topic/Learning.md" "$CHAPTER/$topic/Assignment.md" "$CHAPTER/$topic/Research.md"
done

MODULE="Module 16 - Digital Engineering"
CHAPTER="$MODULE/Chapter 16.1 - Digital"
topics=(
"Digital Thread"
"Digital Twin Integration"
"Simulation"
"Data-driven Engineering"
"Engineering Analytics"
"AI-assisted Design"
)
for topic in "${topics[@]}"; do
mkdir -p "$CHAPTER/$topic"
touch "$CHAPTER/$topic/Learning.md" "$CHAPTER/$topic/Assignment.md" "$CHAPTER/$topic/Research.md"
done

MODULE="Module 17 - Enterprise Systems Engineering"
CHAPTER="$MODULE/Chapter 17.1 - Enterprise"
topics=(
"Enterprise Architecture"
"Business Processes"
"ERP Integration"
"Supply Chain Integration"
"Regulatory Integration"
"Data Governance"
"Cross-functional Collaboration"
)
for topic in "${topics[@]}"; do
mkdir -p "$CHAPTER/$topic"
touch "$CHAPTER/$topic/Learning.md" "$CHAPTER/$topic/Assignment.md" "$CHAPTER/$topic/Research.md"
done

MODULE="Module 18 - Operations & Support Engineering"
CHAPTER="$MODULE/Chapter 18.1 - Operations"
topics=(
"Asset Management"
"Incident Management"
"Field Support"
"Predictive Maintenance"
)
for topic in "${topics[@]}"; do
mkdir -p "$CHAPTER/$topic"
touch "$CHAPTER/$topic/Learning.md" "$CHAPTER/$topic/Assignment.md" "$CHAPTER/$topic/Research.md"
done

MODULE="Module 19 - Human Factors Engineering"
CHAPTER="$MODULE/Chapter 19.1 - Human Factors"
topics=(
"Human-centered Design"
"Ergonomics"
"User Experience"
"Alarm Management"
)
for topic in "${topics[@]}"; do
mkdir -p "$CHAPTER/$topic"
touch "$CHAPTER/$topic/Learning.md" "$CHAPTER/$topic/Assignment.md" "$CHAPTER/$topic/Research.md"
done

MODULE="Module 20 - Sustainability & Resilience Engineering"
CHAPTER="$MODULE/Chapter 20.1 - Sustainability"
topics=(
"Circular Systems"
"Business Continuity"
"Disaster Recovery"
"Resilient Architectures"
)
for topic in "${topics[@]}"; do
mkdir -p "$CHAPTER/$topic"
touch "$CHAPTER/$topic/Learning.md" "$CHAPTER/$topic/Assignment.md" "$CHAPTER/$topic/Research.md"
done

MODULE="Module 21 - Systems Performance Engineering"
CHAPTER="$MODULE/Chapter 21.1 - Performance"
topics=(
"Performance Engineering"
"Scalability"
"Capacity Planning"
"Bottleneck Analysis"
"Throughput"
"Latency"
"Performance Monitoring"
)
for topic in "${topics[@]}"; do
mkdir -p "$CHAPTER/$topic"
touch "$CHAPTER/$topic/Learning.md" "$CHAPTER/$topic/Assignment.md" "$CHAPTER/$topic/Research.md"
done

echo "Systems Engineering school created."


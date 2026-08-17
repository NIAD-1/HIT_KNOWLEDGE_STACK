#!/bin/bash

echo 'Creating School of Supply Chain Engineering...'

MODULE="Module 01 - Supply Chain Fundamentals"
CHAPTER="$MODULE/Chapter 1.1 - Introduction to Supply Chains"
topics=(
"Definition"
"Evolution"
"Importance"
"Supply Chain vs Logistics"
"Supply Chain vs Operations Management"
"Supply Chain Ecosystem"
"Stakeholders"
"Global Supply Networks"
)
for topic in "${topics[@]}"; do
  mkdir -p "$CHAPTER/$topic"
  touch "$CHAPTER/$topic/Learning.md"
  touch "$CHAPTER/$topic/Assignment.md"
  touch "$CHAPTER/$topic/Research.md"
done

CHAPTER="$MODULE/Chapter 1.2 - Supply Chain Flows"
topics=(
"Material Flow"
"Information Flow"
"Financial Flow"
"Reverse Logistics"
"Circular Economy"
"Value Streams"
"Digital Information Flow"
)
for topic in "${topics[@]}"; do
  mkdir -p "$CHAPTER/$topic"
  touch "$CHAPTER/$topic/Learning.md"
  touch "$CHAPTER/$topic/Assignment.md"
  touch "$CHAPTER/$topic/Research.md"
done

CHAPTER="$MODULE/Chapter 1.3 - Supply Chain Design"
topics=(
"Network Design"
"Facility Location"
"Capacity Planning"
"Distribution Networks"
"Customer Segmentation"
"Supply Chain Segmentation"
"Global vs Regional Networks"
)
for topic in "${topics[@]}"; do
  mkdir -p "$CHAPTER/$topic"
  touch "$CHAPTER/$topic/Learning.md"
  touch "$CHAPTER/$topic/Assignment.md"
  touch "$CHAPTER/$topic/Research.md"
done

CHAPTER="$MODULE/Chapter 1.4 - Supply Chain Strategy"
topics=(
"Lean Supply Chains"
"Agile Supply Chains"
"Responsive Supply Chains"
"Efficient Supply Chains"
"Hybrid Strategies"
"Push Systems"
"Pull Systems"
"Just-in-Time (JIT)"
"Just-in-Case (JIC)"
"Postponement"
"Customer Service Strategy"
)
for topic in "${topics[@]}"; do
  mkdir -p "$CHAPTER/$topic"
  touch "$CHAPTER/$topic/Learning.md"
  touch "$CHAPTER/$topic/Assignment.md"
  touch "$CHAPTER/$topic/Research.md"
done

CHAPTER="$MODULE/Chapter 1.5 - Performance Measurement"
topics=(
"KPIs"
"Lead Time"
"Cycle Time"
"Order Cycle Time"
"Perfect Order Rate"
"OTIF"
"Fill Rate"
"Inventory Turnover"
"Cash-to-Cash Cycle"
"Bullwhip Effect"
"SCOR Model"
"Cost-to-Serve"
)
for topic in "${topics[@]}"; do
  mkdir -p "$CHAPTER/$topic"
  touch "$CHAPTER/$topic/Learning.md"
  touch "$CHAPTER/$topic/Assignment.md"
  touch "$CHAPTER/$topic/Research.md"
done

MODULE="Module 02 - Procurement & Strategic Sourcing"
CHAPTER="$MODULE/Chapter 2.1 - Procurement Fundamentals"
topics=(
"Purchasing"
"Strategic Procurement"
"Spend Analysis"
"Supplier Markets"
"Category Management"
)
for topic in "${topics[@]}"; do
  mkdir -p "$CHAPTER/$topic"
  touch "$CHAPTER/$topic/Learning.md"
  touch "$CHAPTER/$topic/Assignment.md"
  touch "$CHAPTER/$topic/Research.md"
done

CHAPTER="$MODULE/Chapter 2.2 - Supplier Management"
topics=(
"Supplier Discovery"
"Qualification"
"Evaluation"
"Audits"
"Performance Monitoring"
"Scorecards"
"Relationship Management"
"Supplier Development"
)
for topic in "${topics[@]}"; do
  mkdir -p "$CHAPTER/$topic"
  touch "$CHAPTER/$topic/Learning.md"
  touch "$CHAPTER/$topic/Assignment.md"
  touch "$CHAPTER/$topic/Research.md"
done

CHAPTER="$MODULE/Chapter 2.3 - Strategic Sourcing"
topics=(
"RFIs"
"RFQs"
"RFPs"
"Negotiation"
"Contract Management"
"Global Sourcing"
"Local Sourcing"
"Nearshoring"
"Reshoring"
)
for topic in "${topics[@]}"; do
  mkdir -p "$CHAPTER/$topic"
  touch "$CHAPTER/$topic/Learning.md"
  touch "$CHAPTER/$topic/Assignment.md"
  touch "$CHAPTER/$topic/Research.md"
done

CHAPTER="$MODULE/Chapter 2.4 - Procurement Risk"
topics=(
"Single Source Risk"
"Multi-source Strategy"
"Supplier Risk"
"Country Risk"
"Financial Risk"
"Political Risk"
"ESG"
"Compliance"
)
for topic in "${topics[@]}"; do
  mkdir -p "$CHAPTER/$topic"
  touch "$CHAPTER/$topic/Learning.md"
  touch "$CHAPTER/$topic/Assignment.md"
  touch "$CHAPTER/$topic/Research.md"
done

MODULE="Module 03 - Manufacturing & Production Systems"
CHAPTER="$MODULE/Chapter 3.1 - Manufacturing Systems"
topics=(
"Manufacturing Processes"
"Production Systems"
"Process Mapping"
"Workflow Design"
)
for topic in "${topics[@]}"; do
  mkdir -p "$CHAPTER/$topic"
  touch "$CHAPTER/$topic/Learning.md"
  touch "$CHAPTER/$topic/Assignment.md"
  touch "$CHAPTER/$topic/Research.md"
done

CHAPTER="$MODULE/Chapter 3.2 - Production Planning"
topics=(
"Production Planning"
"Scheduling"
"Capacity Planning"
"Work Orders"
)
for topic in "${topics[@]}"; do
  mkdir -p "$CHAPTER/$topic"
  touch "$CHAPTER/$topic/Learning.md"
  touch "$CHAPTER/$topic/Assignment.md"
  touch "$CHAPTER/$topic/Research.md"
done

CHAPTER="$MODULE/Chapter 3.3 - Manufacturing Engineering"
topics=(
"Bills of Materials (BOM)"
"MRP"
"MES"
"Shop Floor Control"
)
for topic in "${topics[@]}"; do
  mkdir -p "$CHAPTER/$topic"
  touch "$CHAPTER/$topic/Learning.md"
  touch "$CHAPTER/$topic/Assignment.md"
  touch "$CHAPTER/$topic/Research.md"
done

CHAPTER="$MODULE/Chapter 3.4 - Process Improvement"
topics=(
"Lean Manufacturing"
"Six Sigma"
"Theory of Constraints"
"Overall Equipment Effectiveness (OEE)"
"Industrial Automation"
)
for topic in "${topics[@]}"; do
  mkdir -p "$CHAPTER/$topic"
  touch "$CHAPTER/$topic/Learning.md"
  touch "$CHAPTER/$topic/Assignment.md"
  touch "$CHAPTER/$topic/Research.md"
done

MODULE="Module 04 - Inventory Management"
CHAPTER="$MODULE/Chapter 4.1 - Inventory Fundamentals"
topics=(
"Inventory Types"
"ABC Analysis"
"Safety Stock"
"Reorder Point"
"Economic Order Quantity (EOQ)"
"FIFO"
"FEFO"
"LIFO"
"Cycle Counting"
"Stock Valuation"
"Expiry Management"
"Inventory Optimization"
)
for topic in "${topics[@]}"; do
  mkdir -p "$CHAPTER/$topic"
  touch "$CHAPTER/$topic/Learning.md"
  touch "$CHAPTER/$topic/Assignment.md"
  touch "$CHAPTER/$topic/Research.md"
done

MODULE="Module 05 - Warehousing"
CHAPTER="$MODULE/Chapter 5.1 - Warehouse Operations"
topics=(
"Warehouse Design"
"Warehouse Layouts"
"Receiving"
"Put-away"
"Picking"
"Packing"
"Shipping"
"Cross-docking"
"Slotting Optimization"
"Warehouse Management Systems (WMS)"
"Automation"
"Robotics"
"Cold Storage"
)
for topic in "${topics[@]}"; do
  mkdir -p "$CHAPTER/$topic"
  touch "$CHAPTER/$topic/Learning.md"
  touch "$CHAPTER/$topic/Assignment.md"
  touch "$CHAPTER/$topic/Research.md"
done

MODULE="Module 06 - Transportation & Distribution"
CHAPTER="$MODULE/Chapter 6.1 - Logistics"
topics=(
"Transportation Modes"
"Route Planning"
"Fleet Management"
"Last-mile Delivery"
"Cold-chain Logistics"
"Freight Costing"
"GPS Tracking"
"Customs"
"Cross-border Logistics"
"Incoterms"
)
for topic in "${topics[@]}"; do
  mkdir -p "$CHAPTER/$topic"
  touch "$CHAPTER/$topic/Learning.md"
  touch "$CHAPTER/$topic/Assignment.md"
  touch "$CHAPTER/$topic/Research.md"
done

MODULE="Module 07 - Demand Planning & Forecasting"
CHAPTER="$MODULE/Chapter 7.1 - Forecasting"
topics=(
"Demand Forecasting"
"Sales & Operations Planning (S&OP)"
"Forecast Accuracy"
"Time-series Forecasting"
"Seasonality"
"Promotions"
"Inventory Balancing"
)
for topic in "${topics[@]}"; do
  mkdir -p "$CHAPTER/$topic"
  touch "$CHAPTER/$topic/Learning.md"
  touch "$CHAPTER/$topic/Assignment.md"
  touch "$CHAPTER/$topic/Research.md"
done

MODULE="Module 08 - Quality & Compliance"
CHAPTER="$MODULE/Chapter 8.1 - Compliance"
topics=(
"Quality Assurance"
"Quality Control"
"Traceability"
"Serialization"
"Recall Management"
"CAPA"
"Audits"
"Risk Management"
"Documentation"
"Electronic Records"
)
for topic in "${topics[@]}"; do
  mkdir -p "$CHAPTER/$topic"
  touch "$CHAPTER/$topic/Learning.md"
  touch "$CHAPTER/$topic/Assignment.md"
  touch "$CHAPTER/$topic/Research.md"
done

MODULE="Module 09 - Pharmaceutical Supply Chains"
CHAPTER="$MODULE/Chapter 9.1 - Pharmaceutical Logistics"
topics=(
"Active Pharmaceutical Ingredients (API)"
"Drug Manufacturing"
"Batch Records"
"Stability Studies"
"Cold Chain"
"Vaccines"
"Controlled Medicines"
"Medical Devices"
"Good Manufacturing Practice (GMP)"
"Good Distribution Practice (GDP)"
"Product Authentication"
"Anti-counterfeiting"
"Warehouse Inspections"
"Import Controls"
"Product Recalls"
)
for topic in "${topics[@]}"; do
  mkdir -p "$CHAPTER/$topic"
  touch "$CHAPTER/$topic/Learning.md"
  touch "$CHAPTER/$topic/Assignment.md"
  touch "$CHAPTER/$topic/Research.md"
done

MODULE="Module 10 - Digital Supply Chains"
CHAPTER="$MODULE/Chapter 10.1 - Digital Technologies"
topics=(
"ERP"
"WMS"
"Transportation Management Systems (TMS)"
"RFID"
"Barcodes"
"QR Codes"
"IoT"
"AI"
"Blockchain"
"Digital Twins"
"Predictive Analytics"
"Autonomous Warehouses"
)
for topic in "${topics[@]}"; do
  mkdir -p "$CHAPTER/$topic"
  touch "$CHAPTER/$topic/Learning.md"
  touch "$CHAPTER/$topic/Assignment.md"
  touch "$CHAPTER/$topic/Research.md"
done

MODULE="Module 11 - Sustainable Supply Chains"
CHAPTER="$MODULE/Chapter 11.1 - Sustainability"
topics=(
"Circular Economy"
"Green Logistics"
"Carbon Footprint"
"ESG"
"Resilient Supply Chains"
)
for topic in "${topics[@]}"; do
  mkdir -p "$CHAPTER/$topic"
  touch "$CHAPTER/$topic/Learning.md"
  touch "$CHAPTER/$topic/Assignment.md"
  touch "$CHAPTER/$topic/Research.md"
done

MODULE="Module 12 - Supply Chain Analytics"
CHAPTER="$MODULE/Chapter 12.1 - Analytics"
topics=(
"Excel"
"SQL"
"Python"
"Power BI"
"Tableau"
"Statistics"
"Optimization"
"Simulation"
"Machine Learning"
)
for topic in "${topics[@]}"; do
  mkdir -p "$CHAPTER/$topic"
  touch "$CHAPTER/$topic/Learning.md"
  touch "$CHAPTER/$topic/Assignment.md"
  touch "$CHAPTER/$topic/Research.md"
done

echo "School created successfully."


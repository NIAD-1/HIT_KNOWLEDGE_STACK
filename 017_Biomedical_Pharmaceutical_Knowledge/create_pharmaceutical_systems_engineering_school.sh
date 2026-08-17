#!/bin/bash
echo 'Creating School of Pharmaceutical Systems Engineering'

MODULE="Module 01 - Introduction to the Pharmaceutical Industry"
CHAPTER="$MODULE/Chapter 1.1 - Pharmaceutical Industry Fundamentals"
topics=(
"History of Pharmaceuticals"
"Global Pharmaceutical Ecosystem"
"Pharmaceutical Value Chain"
"Innovator Companies"
"Generic Manufacturers"
"CMOs"
"CDMOs"
"Biotechnology Companies"
"Vaccine Manufacturers"
"Medical Device Manufacturers"
"Nutraceutical Companies"
"Cosmetics Industry"
"OTC Products"
"Prescription Medicines"
"Biological Products"
"Biosimilars"
"Orphan Drugs"
)
for topic in "${topics[@]}"; do
 mkdir -p "$CHAPTER/$topic"
 touch "$CHAPTER/$topic/Learning.md"
 touch "$CHAPTER/$topic/Assignment.md"
 touch "$CHAPTER/$topic/Research.md"
done

MODULE="Module 02 - Drug Discovery & Development"
CHAPTER="$MODULE/Chapter 2.1 - Drug Discovery"
topics=(
"Disease Biology"
"Drug Targets"
"Target Validation"
"High-throughput Screening"
"Lead Identification"
"Lead Optimization"
"Medicinal Chemistry"
"Pharmacology"
"Toxicology"
"Biomarkers"
)
for topic in "${topics[@]}"; do
 mkdir -p "$CHAPTER/$topic"
 touch "$CHAPTER/$topic/Learning.md"
 touch "$CHAPTER/$topic/Assignment.md"
 touch "$CHAPTER/$topic/Research.md"
done

CHAPTER="$MODULE/Chapter 2.2 - Drug Development"
topics=(
"Preclinical Studies"
"IND Applications"
"Clinical Trials"
"Bioequivalence Studies"
"Pharmacokinetics (PK)"
"Pharmacodynamics (PD)"
"Drug Metabolism"
"Safety Assessment"
"Efficacy Assessment"
)
for topic in "${topics[@]}"; do
 mkdir -p "$CHAPTER/$topic"
 touch "$CHAPTER/$topic/Learning.md"
 touch "$CHAPTER/$topic/Assignment.md"
 touch "$CHAPTER/$topic/Research.md"
done

MODULE="Module 03 - Pharmaceutical Chemistry"
CHAPTER="$MODULE/Chapter 3.1 - Chemistry"
topics=(
"Organic Chemistry"
"Medicinal Chemistry"
"Pharmaceutical Analysis"
"APIs"
"Excipients"
"Impurities"
"Stability Chemistry"
"Drug Degradation"
"Analytical Chemistry"
"Spectroscopy"
"Chromatography"
)
for topic in "${topics[@]}"; do
 mkdir -p "$CHAPTER/$topic"
 touch "$CHAPTER/$topic/Learning.md"
 touch "$CHAPTER/$topic/Assignment.md"
 touch "$CHAPTER/$topic/Research.md"
done

MODULE="Module 04 - Pharmaceutical Manufacturing"
CHAPTER="$MODULE/Chapter 4.1 - Manufacturing"
topics=(
"Tablet Manufacturing"
"Capsule Manufacturing"
"Syrup Production"
"Creams and Ointments"
"Sterile Injectables"
"Ophthalmic Products"
"Inhalation Products"
"Biotechnology Manufacturing"
"Vaccine Manufacturing"
"Packaging Operations"
"Batch Manufacturing"
"Continuous Manufacturing"
"MES"
"Production Scheduling"
"Equipment Qualification"
"Process Validation"
"Cleaning Validation"
"Utilities"
)
for topic in "${topics[@]}"; do
 mkdir -p "$CHAPTER/$topic"
 touch "$CHAPTER/$topic/Learning.md"
 touch "$CHAPTER/$topic/Assignment.md"
 touch "$CHAPTER/$topic/Research.md"
done

MODULE="Module 05 - Pharmaceutical Quality Systems"
CHAPTER="$MODULE/Chapter 5.1 - Quality"
topics=(
"Quality Assurance"
"Quality Control"
"Quality by Design"
"PAT"
"GMP"
"Documentation Systems"
"Batch Manufacturing Records"
"SOPs"
"CAPA"
"Deviations"
"Change Control"
"Internal Audits"
"Product Release"
)
for topic in "${topics[@]}"; do
 mkdir -p "$CHAPTER/$topic"
 touch "$CHAPTER/$topic/Learning.md"
 touch "$CHAPTER/$topic/Assignment.md"
 touch "$CHAPTER/$topic/Research.md"
done

MODULE="Module 06 - Pharmaceutical Laboratories"
CHAPTER="$MODULE/Chapter 6.1 - Labs"
topics=(
"Analytical Laboratories"
"Microbiology Laboratories"
"Stability Laboratories"
"LIMS"
"Method Validation"
"Calibration"
"Instrument Qualification"
"Sample Management"
"Data Integrity"
)
for topic in "${topics[@]}"; do
 mkdir -p "$CHAPTER/$topic"
 touch "$CHAPTER/$topic/Learning.md"
 touch "$CHAPTER/$topic/Assignment.md"
 touch "$CHAPTER/$topic/Research.md"
done

MODULE="Module 07 - Pharmaceutical Supply Chain"
CHAPTER="$MODULE/Chapter 7.1 - Supply Chain"
topics=(
"API Sourcing"
"Procurement"
"Warehousing"
"Cold Chain"
"Inventory Management"
"FEFO"
"Serialization"
"Distribution"
"Import and Export"
"Product Recalls"
"Reverse Logistics"
)
for topic in "${topics[@]}"; do
 mkdir -p "$CHAPTER/$topic"
 touch "$CHAPTER/$topic/Learning.md"
 touch "$CHAPTER/$topic/Assignment.md"
 touch "$CHAPTER/$topic/Research.md"
done

MODULE="Module 08 - Pharmaceutical Packaging Engineering"
CHAPTER="$MODULE/Chapter 8.1 - Packaging"
topics=(
"Primary Packaging"
"Secondary Packaging"
"Blister Packs"
"Bottles"
"Ampoules"
"Vials"
"Cartons"
"Tamper-evident Packaging"
"Child-resistant Packaging"
"Smart Packaging"
"RFID-enabled Packaging"
"QR Code Systems"
"Serialization"
)
for topic in "${topics[@]}"; do
 mkdir -p "$CHAPTER/$topic"
 touch "$CHAPTER/$topic/Learning.md"
 touch "$CHAPTER/$topic/Assignment.md"
 touch "$CHAPTER/$topic/Research.md"
done

MODULE="Module 09 - Pharmaceutical Warehousing & Distribution"
CHAPTER="$MODULE/Chapter 9.1 - Warehousing"
topics=(
"Warehouse Design"
"Environmental Monitoring"
"Temperature Mapping"
"Cold Rooms"
"Controlled Substances Storage"
"Inventory Optimization"
"WMS"
"Distribution Centers"
"Fleet Management"
"Last-mile Delivery"
)
for topic in "${topics[@]}"; do
 mkdir -p "$CHAPTER/$topic"
 touch "$CHAPTER/$topic/Learning.md"
 touch "$CHAPTER/$topic/Assignment.md"
 touch "$CHAPTER/$topic/Research.md"
done

MODULE="Module 10 - Pharmaceutical Data & Digital Systems"
CHAPTER="$MODULE/Chapter 10.1 - Digital"
topics=(
"ERP"
"MES"
"LIMS"
"WMS"
"eQMS"
"Electronic Batch Records"
"SCADA"
"Historian Systems"
"ALCOA+"
"Master Data Management"
"Data Governance"
"Digital Transformation"
)
for topic in "${topics[@]}"; do
 mkdir -p "$CHAPTER/$topic"
 touch "$CHAPTER/$topic/Learning.md"
 touch "$CHAPTER/$topic/Assignment.md"
 touch "$CHAPTER/$topic/Research.md"
done

MODULE="Module 11 - Pharmaceutical Automation"
CHAPTER="$MODULE/Chapter 11.1 - Automation"
topics=(
"Industrial Automation"
"PLCs"
"SCADA"
"Robotics"
"Vision Systems"
"Automated Inspection"
"Conveyor Systems"
"AGVs/AMRs"
"Digital Twins"
"Predictive Maintenance"
)
for topic in "${topics[@]}"; do
 mkdir -p "$CHAPTER/$topic"
 touch "$CHAPTER/$topic/Learning.md"
 touch "$CHAPTER/$topic/Assignment.md"
 touch "$CHAPTER/$topic/Research.md"
done

MODULE="Module 12 - Pharmaceutical AI & Industrial Intelligence"
CHAPTER="$MODULE/Chapter 12.1 - AI"
topics=(
"AI in Drug Discovery"
"AI in Manufacturing"
"AI in Quality Control"
"AI in Predictive Maintenance"
"AI in Supply Chain"
"AI for Regulatory Compliance"
"Digital Twins"
"IoT"
"Edge AI"
"Intelligent Factories"
)
for topic in "${topics[@]}"; do
 mkdir -p "$CHAPTER/$topic"
 touch "$CHAPTER/$topic/Learning.md"
 touch "$CHAPTER/$topic/Assignment.md"
 touch "$CHAPTER/$topic/Research.md"
done

MODULE="Module 13 - Pharmaceutical Business & Economics"
CHAPTER="$MODULE/Chapter 13.1 - Business"
topics=(
"Business Models"
"Pricing"
"Market Access"
"Health Economics"
"Procurement Systems"
"Tendering"
"Generic Competition"
"Intellectual Property"
"Patents"
"Product Lifecycle Management"
)
for topic in "${topics[@]}"; do
 mkdir -p "$CHAPTER/$topic"
 touch "$CHAPTER/$topic/Learning.md"
 touch "$CHAPTER/$topic/Assignment.md"
 touch "$CHAPTER/$topic/Research.md"
done

MODULE="Module 14 - Global Pharmaceutical Systems"
CHAPTER="$MODULE/Chapter 14.1 - Global"
topics=(
"WHO Prequalification"
"Global Supply Chains"
"Cross-border Distribution"
"International Harmonization"
"Pandemic Preparedness"
"Vaccine Distribution Networks"
"Humanitarian Logistics"
)
for topic in "${topics[@]}"; do
 mkdir -p "$CHAPTER/$topic"
 touch "$CHAPTER/$topic/Learning.md"
 touch "$CHAPTER/$topic/Assignment.md"
 touch "$CHAPTER/$topic/Research.md"
done

MODULE="Module 15 - Future of Pharmaceutical Engineering"
CHAPTER="$MODULE/Chapter 15.1 - Future"
topics=(
"Personalized Medicine"
"Precision Medicine"
"Cell & Gene Therapy"
"mRNA Technologies"
"Continuous Manufacturing"
"AI-driven Laboratories"
"Autonomous Factories"
"Digital Ecosystems"
"Sustainable Manufacturing"
"Industry 5.0"
)
for topic in "${topics[@]}"; do
 mkdir -p "$CHAPTER/$topic"
 touch "$CHAPTER/$topic/Learning.md"
 touch "$CHAPTER/$topic/Assignment.md"
 touch "$CHAPTER/$topic/Research.md"
done

MODULE="Module 16 - Pharmaceutical Regulatory Affairs"
CHAPTER="$MODULE/Chapter 16.1 - Regulatory"
topics=(
"Global Regulatory Frameworks"
"Drug Registration"
"CTD"
"eCTD"
"Dossier Preparation"
"Product Variations"
"Labeling"
"Regulatory Intelligence"
"Post-Approval Changes"
"Regulatory Strategy"
)
for topic in "${topics[@]}"; do
 mkdir -p "$CHAPTER/$topic"
 touch "$CHAPTER/$topic/Learning.md"
 touch "$CHAPTER/$topic/Assignment.md"
 touch "$CHAPTER/$topic/Research.md"
done

MODULE="Module 17 - Pharmacovigilance & Drug Safety"
CHAPTER="$MODULE/Chapter 17.1 - Safety"
topics=(
"Adverse Event Reporting"
"Signal Detection"
"Risk Management Plans"
"Benefit-Risk Assessment"
"Post-Marketing Surveillance"
"Safety Databases"
"Case Processing"
"Medication Errors"
"Product Complaints"
"Recall Management"
)
for topic in "${topics[@]}"; do
 mkdir -p "$CHAPTER/$topic"
 touch "$CHAPTER/$topic/Learning.md"
 touch "$CHAPTER/$topic/Assignment.md"
 touch "$CHAPTER/$topic/Research.md"
done

MODULE="Module 18 - Medical Devices & Diagnostics"
CHAPTER="$MODULE/Chapter 18.1 - Devices"
topics=(
"Medical Device Classification"
"IVDs"
"SaMD"
"Device Lifecycle"
"UDI Systems"
"Sterilization"
"Validation"
"Quality Systems"
)
for topic in "${topics[@]}"; do
 mkdir -p "$CHAPTER/$topic"
 touch "$CHAPTER/$topic/Learning.md"
 touch "$CHAPTER/$topic/Assignment.md"
 touch "$CHAPTER/$topic/Research.md"
done

MODULE="Module 19 - Biotechnology & Advanced Therapies"
CHAPTER="$MODULE/Chapter 19.1 - Biotech"
topics=(
"Biopharmaceuticals"
"Monoclonal Antibodies"
"Gene Therapy"
"Cell Therapy"
"CAR-T"
"mRNA"
"Bioprocess Engineering"
"Bioreactors"
)
for topic in "${topics[@]}"; do
 mkdir -p "$CHAPTER/$topic"
 touch "$CHAPTER/$topic/Learning.md"
 touch "$CHAPTER/$topic/Assignment.md"
 touch "$CHAPTER/$topic/Research.md"
done

MODULE="Module 20 - Digital Pharmaceutical Enterprise"
CHAPTER="$MODULE/Chapter 20.1 - Enterprise"
topics=(
"Smart Factories"
"Pharma 4.0"
"Digital Twins"
"Industrial Intelligence"
"AI Copilots"
"Enterprise Architecture"
"Data Platforms"
"Cybersecurity"
"Knowledge Management"
"Executive Decision Support"
)
for topic in "${topics[@]}"; do
 mkdir -p "$CHAPTER/$topic"
 touch "$CHAPTER/$topic/Learning.md"
 touch "$CHAPTER/$topic/Assignment.md"
 touch "$CHAPTER/$topic/Research.md"
done

echo "School created successfully."

export const pilotSchool = {
  id: '02_Electronics',
  name: 'School of Electronics',
  shortName: 'Electronics',
  eyebrow: 'HIT UNIVERSITY · SCHOOL 02',
  description: 'Learn electronics by connecting physical principles to circuits, instruments, and products you can build.',
  accent: 'amber',
  modules: [
    { id: 'Module-1-Electrical-Fundamentals', number: '01', title: 'Electrical Fundamentals', topics: ['Atomic Theory', 'Electrical Quantities', "Ohm’s Law", 'Circuit Analysis'], progress: 36 },
    { id: 'Module-2-Passive-Components', number: '02', title: 'Passive Components', topics: ['Resistors', 'Capacitors', 'Inductors', 'Transformers'], progress: 0 },
    { id: 'Module-3-Semiconductor-Physics', number: '03', title: 'Semiconductors', topics: ['Diodes', 'PN Junctions', 'Semiconductor basics'], progress: 0 },
    { id: 'Module-4-Transistors', number: '04', title: 'Transistors & Switching', topics: ['BJTs', 'MOSFETs', 'IGBTs', 'Switching circuits'], progress: 0 },
    { id: 'Module-8-Sensors-and-Instrumentation', number: '08', title: 'Sensors & Instrumentation', topics: ['Temperature', 'Humidity', 'Pressure', 'Vibration'], progress: 0 },
    { id: 'Module-10-PCB-Design', number: '10', title: 'PCB Design', topics: ['Schematics', 'Layout', 'EMI / EMC', 'DFM'], progress: 0 },
  ],
  projects: [
    { title: 'Cold-chain temperature logger', stage: 'Capstone', description: 'Design a battery-powered sensor that records temperature excursions during medicine transport.', path: 'Physics → Sensors → Firmware → Data → Pharmaceutical quality' },
    { title: 'Button-controlled relay', stage: 'Build challenge', description: 'Use a digital input to switch a load safely and explain every current path.', path: 'GPIO → Transistors → Protection → Testing' },
  ],
  lesson: {
    title: 'Electrical Quantities',
    module: 'Electrical Fundamentals',
    notePath: '02_Electronics/Electronics-School/Module-1-Electrical-Fundamentals/Electrical-Quantities/Learning.md',
    objectives: ['Explain charge, current, voltage, and resistance in plain language.', 'Use conventional current consistently when analyzing circuits.', 'Relate a sensor circuit to a real product requirement.'],
    sections: [
      { heading: 'Current is charge in motion', body: 'Electric current describes how quickly electric charge passes a point. If charge is steady, current is charge divided by time. If the flow changes, instantaneous current is the rate of change of charge: I = dQ/dt.', callout: 'One ampere is one coulomb of charge passing a point each second.' },
      { heading: 'Voltage is energy per charge', body: 'Voltage describes the difference in electrical potential energy between two points. A voltage difference can transfer energy to charges and drive current around a complete circuit. A source alone is not enough: the circuit needs a closed path.' },
      { heading: 'Choose a direction and keep it', body: 'Circuit analysis uses conventional current, defined as the direction positive charge would move. In metal wires, electrons drift in the opposite direction. A calculated current of −2 A means 2 A flowing opposite to the direction you selected.' },
      { heading: 'Connect the ideas', body: 'A battery-powered temperature logger depends on these quantities at every step: the battery provides voltage, the circuit draws current, and component resistance affects power use and signal levels. Estimating them helps you predict battery life and choose safe component values.' },
    ],
    resources: [
      { title: 'Open the HIT library learning note', kind: 'Library note', href: '/vault?path=02_Electronics%2FElectronics-School%2FModule-1-Electrical-Fundamentals%2FElectrical-Quantities%2FLearning.md' },
      { title: 'Watch a lesson on electrical quantities', kind: 'YouTube', href: 'https://www.youtube.com/results?search_query=voltage+current+resistance+beginner+electronics+lesson' },
      { title: 'Review circuit fundamentals', kind: 'Reference', href: 'https://www.allaboutcircuits.com/textbook/direct-current/' },
    ],
  },
};

export const otherSchools = [
  { id: '017_Regulatory_Science', name: 'Regulatory Science', domain: 'Health systems & public trust', color: 'violet', mark: 'RS' },
  { id: '03_Embedded_Systems', name: 'Embedded Systems', domain: 'Firmware, devices & control', color: 'blue', mark: 'ES' },
  { id: '010_AI', name: 'AI & Machine Learning', domain: 'Intelligent systems & data', color: 'rose', mark: 'AI' },
  { id: '06_Cloud_Engineering', name: 'Cloud Engineering', domain: 'Infrastructure & distributed systems', color: 'sky', mark: 'CE' },
];

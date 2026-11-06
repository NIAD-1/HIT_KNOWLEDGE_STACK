import { useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, BookOpen, Lightbulb, RotateCcw, Sparkles, Zap } from 'lucide-react';
import { pilotSchool } from '../data/pilotSchool';

const powerRatings = [0.125, 0.25, 0.5, 1, 2];

function formatResistance(value) {
  return value >= 1000 ? `${(value / 1000).toFixed(value % 1000 ? 2 : 0)} kΩ` : `${value.toFixed(0)} Ω`;
}

function formatCurrent(value) {
  if (value < 0.001) return `${(value * 1_000_000).toFixed(1)} µA`;
  return `${(value * 1000).toFixed(2)} mA`;
}

function formatPower(value) {
  return value >= 1 ? `${value.toFixed(2)} W` : `${(value * 1000).toFixed(1)} mW`;
}

function currentDuration(current) {
  const fraction = Math.min(1, current / 0.12);
  return `${(5 - fraction * 4).toFixed(2)}s`;
}

function CircuitDiagram({ topology, voltage, resistors, currents, powers, rating }) {
  const hotColor = power => power > rating ? '#e26c50' : power > rating * 0.7 ? '#d19a42' : '#3f805b';
  const movingDots = (pathId, current, count = 5) => current > 0.000001 && Array.from({ length: count }, (_, index) =>
    <circle key={`${pathId}-${index}`} r="4.5" fill="#f4ad4d" stroke="#fff8e8" strokeWidth="1.5">
      <animateMotion dur={currentDuration(current)} begin={`${index * 0.22}s`} repeatCount="indefinite"><mpath href={`#${pathId}`}/></animateMotion>
    </circle>);

  return <svg className="lab-circuit-svg" viewBox="0 0 640 360" role="img" aria-label={`${topology} circuit with a ${voltage.toFixed(1)} volt source and two resistors`}>
    <defs>
      <linearGradient id="wire-gradient" x1="0" x2="1"><stop stopColor="#7c9d82"/><stop offset="1" stopColor="#426b50"/></linearGradient>
      <filter id="resistor-glow" x="-60%" y="-60%" width="220%" height="220%"><feGaussianBlur stdDeviation="7"/></filter>
      <marker id="current-arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L0,6 L7,3 z" fill="#d7973c"/></marker>
    </defs>
    <path className="lab-wire" d="M68 80 H580 V280 H68"/>
    <path className="lab-wire" d="M68 80 V153 M68 197 V280"/>
    <g className="lab-battery">
      <rect x="28" y="145" width="80" height="60" rx="17" fill="#fffdf6" stroke="#d9dfd1" strokeWidth="2"/>
      <path d="M49 165 H87 M57 185 H79" stroke="#416a4d" strokeWidth="5" strokeLinecap="round"/>
      <text x="42" y="170" className="lab-battery-sign">+</text><text x="44" y="191" className="lab-battery-sign">−</text>
      <circle cx="94" cy="164" r="2" fill="#527356"/><circle cx="101" cy="164" r="2" fill="#527356"/><path d="M93 174 Q98 179 103 174" fill="none" stroke="#527356" strokeWidth="1.7" strokeLinecap="round"/>
      <text x="68" y="226" textAnchor="middle" className="lab-svg-label">{voltage.toFixed(1)} V</text>
    </g>

    {topology === 'series' ? <>
      <rect x="220" y="61" width="80" height="38" rx="5" fill="#fbfcf9"/>
      <rect x="370" y="61" width="80" height="38" rx="5" fill="#fbfcf9"/>
      <path className="lab-component-glow" d="M222 80 H298" stroke={hotColor(powers[0])} opacity={Math.min(0.65, powers[0] / rating * 0.45)} filter="url(#resistor-glow)"/>
      <path className="lab-component-glow" d="M372 80 H448" stroke={hotColor(powers[1])} opacity={Math.min(0.65, powers[1] / rating * 0.45)} filter="url(#resistor-glow)"/>
      <path className="lab-wire" d="M222 80 l9 -12 14 24 14 -24 14 24 14 -24 11 12 M372 80 l9 -12 14 24 14 -24 14 24 14 -24 11 12"/>
      <text x="260" y="42" textAnchor="middle" className="lab-svg-label">R₁ · {formatResistance(resistors[0])}</text>
      <text x="410" y="42" textAnchor="middle" className="lab-svg-label">R₂ · {formatResistance(resistors[1])}</text>
      <path id="current-path-series" d="M68 153 V80 H580 V280 H68 V197" fill="none"/>
      {movingDots('current-path-series', currents[0])}
      {voltage > 0 && <path d="M130 80 H183" className="lab-current-arrow" markerEnd="url(#current-arrow)"/>}
      <text x="153" y="104" textAnchor="middle" className="lab-current-label">I = {formatCurrent(currents[0])}</text>
    </> : <>
      <path className="lab-wire" d="M245 80 V133 M245 227 V280 M425 80 V133 M425 227 V280"/>
      <path className="lab-component-glow" d="M245 133 V227" stroke={hotColor(powers[0])} opacity={Math.min(0.65, powers[0] / rating * 0.45)} filter="url(#resistor-glow)"/>
      <path className="lab-component-glow" d="M425 133 V227" stroke={hotColor(powers[1])} opacity={Math.min(0.65, powers[1] / rating * 0.45)} filter="url(#resistor-glow)"/>
      <path className="lab-wire" d="M245 133 l-12 9 24 14 -24 14 24 14 -24 14 12 9 M425 133 l-12 9 24 14 -24 14 24 14 -24 14 12 9"/>
      <text x="218" y="180" textAnchor="end" className="lab-svg-label">R₁ · {formatResistance(resistors[0])}</text>
      <text x="452" y="180" textAnchor="start" className="lab-svg-label">R₂ · {formatResistance(resistors[1])}</text>
      <path id="current-path-one" d="M68 153 V80 H245 V280 H68 V197" fill="none"/>
      <path id="current-path-two" d="M68 153 V80 H425 V280 H68 V197" fill="none"/>
      {movingDots('current-path-one', currents[0], 4)}{movingDots('current-path-two', currents[1], 4)}
      {voltage > 0 && <><path d="M245 94 V119" className="lab-current-arrow" markerEnd="url(#current-arrow)"/><path d="M425 94 V119" className="lab-current-arrow" markerEnd="url(#current-arrow)"/></>}
      <text x="245" y="252" textAnchor="middle" className="lab-current-label">I₁ {formatCurrent(currents[0])}</text>
      <text x="425" y="252" textAnchor="middle" className="lab-current-label">I₂ {formatCurrent(currents[1])}</text>
    </>}
    <text x="322" y="323" textAnchor="middle" className="lab-diagram-caption">CONVENTIONAL CURRENT · POSITIVE TERMINAL THROUGH THE EXTERNAL CIRCUIT</text>
  </svg>;
}

function SimulationLab() {
  const { schoolId } = useParams();
  const [voltage, setVoltage] = useState(9);
  const [r1, setR1] = useState(1000);
  const [r2, setR2] = useState(2200);
  const [topology, setTopology] = useState('series');
  const [rating, setRating] = useState(0.25);

  const circuit = useMemo(() => {
    if (topology === 'series') {
      const equivalent = r1 + r2;
      const current = voltage / equivalent;
      const powers = [current * current * r1, current * current * r2];
      return { equivalent, totalCurrent: current, currents: [current, current], drops: [current * r1, current * r2], powers };
    }
    const conductance = 1 / r1 + 1 / r2;
    const equivalent = 1 / conductance;
    const currents = [voltage / r1, voltage / r2];
    return { equivalent, totalCurrent: currents[0] + currents[1], currents, drops: [voltage, voltage], powers: [voltage * voltage / r1, voltage * voltage / r2] };
  }, [topology, voltage, r1, r2]);

  const totalPower = voltage * circuit.totalCurrent;
  const overload = circuit.powers.some(power => power > rating);

  function reset() { setVoltage(9); setR1(1000); setR2(2200); setTopology('series'); setRating(0.25); }

  return <div className="site-shell lab-shell">
    <header className="topbar"><Link to="/" className="brand-lockup"><span className="brand-mark"><Zap size={18}/></span><span>HIT <b>University</b></span></Link><nav className="top-nav"><Link to={`/school/${schoolId}`}>Electronics</Link><Link to="/vault">Library</Link></nav><Link to={`/school/${schoolId}`} className="back-link"><ArrowLeft size={15}/> Electronics School</Link></header>
    <main className="lab-page">
      <div className="lab-breadcrumb"><Link to={`/school/${schoolId}`}>Electronics School</Link><span>/</span><span>Simulation Lab</span></div>
      <section className="lab-hero"><div><p className="eyebrow">HIT UNIVERSITY · SCHOOL OF ELECTRONICS</p><h1>Circuit Simulation Lab</h1><p>Change the circuit and components. Watch current flow and see how the electrical quantities respond.</p></div><span className="lab-hero-icon"><Sparkles size={26}/></span></section>

      <div className="lab-workbench">
        <section className="lab-card lab-controls"><div className="lab-card-heading"><div><p className="eyebrow">YOUR EXPERIMENT</p><h2>Set the circuit</h2></div><button type="button" className="lab-reset" onClick={reset} aria-label="Reset experiment"><RotateCcw size={15}/></button></div>
          <div className="lab-topology-picker" role="group" aria-label="Circuit topology"><button type="button" className={topology === 'series' ? 'active' : ''} onClick={() => setTopology('series')}>Series</button><button type="button" className={topology === 'parallel' ? 'active' : ''} onClick={() => setTopology('parallel')}>Parallel</button></div>
          <label className="lab-control"><span><b>Source voltage</b><output>{voltage.toFixed(1)} V</output></span><input type="range" min="0" max="12" step="0.1" value={voltage} onChange={event => setVoltage(Number(event.target.value))}/><small>Ideal DC battery · 0–12 volts</small></label>
          <label className="lab-control"><span><b>Resistor R₁</b><output>{formatResistance(r1)}</output></span><input type="range" min="100" max="10000" step="100" value={r1} onChange={event => setR1(Number(event.target.value))}/><small>100 Ω–10 kΩ</small></label>
          <label className="lab-control"><span><b>Resistor R₂</b><output>{formatResistance(r2)}</output></span><input type="range" min="100" max="10000" step="100" value={r2} onChange={event => setR2(Number(event.target.value))}/><small>100 Ω–10 kΩ</small></label>
          <label className="lab-select-control"><span>Resistor power rating</span><select value={rating} onChange={event => setRating(Number(event.target.value))}>{powerRatings.map(value => <option key={value} value={value}>{value} W</option>)}</select></label>
        </section>

        <section className="lab-card lab-visual-card"><div className="lab-card-heading"><div><p className="eyebrow">LIVE CIRCUIT</p><h2>{topology === 'series' ? 'One path · same current' : 'Shared voltage · split current'}</h2></div><span className="lab-live-dot">LIVE</span></div>
          <CircuitDiagram topology={topology} voltage={voltage} resistors={[r1, r2]} currents={circuit.currents} powers={circuit.powers} rating={rating}/>
          <div className="lab-visual-note"><span><Lightbulb size={15}/></span><p>Animated dots show <b>conventional current</b> (positive to negative). Their speed is exaggerated and scaled for visibility; electrons drift in the opposite direction.</p></div>
        </section>
      </div>

      <section className="lab-results"><div className="lab-section-heading"><div><p className="eyebrow">CALCULATED FROM CIRCUIT LAWS</p><h2>What the circuit is doing</h2></div><span>Ideal source · steady-state DC · ohmic resistors</span></div>
        <div className="lab-metric-grid"><article className="lab-metric"><small>Equivalent resistance</small><b>{formatResistance(circuit.equivalent)}</b><span>Rₑq</span></article><article className="lab-metric"><small>Total current</small><b>{formatCurrent(circuit.totalCurrent)}</b><span>I = V ÷ Rₑq</span></article><article className="lab-metric"><small>Source power</small><b>{formatPower(totalPower)}</b><span>P = V × I</span></article></div>
        <div className="lab-component-grid">{[0, 1].map(index => <article className={`lab-component-card ${circuit.powers[index] > rating ? 'overloaded' : ''}`} key={index}><div><span className="lab-component-dot" style={{ background: circuit.powers[index] > rating ? '#e26c50' : '#d19a42' }}/><b>Resistor R{index + 1}</b><small>{formatResistance(index === 0 ? r1 : r2)}</small></div><dl><div><dt>Voltage across</dt><dd>{circuit.drops[index].toFixed(3)} V</dd></div><div><dt>Current through</dt><dd>{formatCurrent(circuit.currents[index])}</dd></div><div><dt>Power dissipated</dt><dd>{formatPower(circuit.powers[index])}</dd></div></dl><p>{circuit.powers[index] > rating ? `Over rating (${rating} W): this resistor would overheat in a real circuit.` : `Within the selected ${rating} W rating.`}</p></article>)}</div>
        {overload && <p className="lab-safety-note"><Zap size={15}/> Reduce the voltage, increase resistance, or choose a higher-rated resistor. The simulator calculates electrical power; it does not model temperature rise.</p>}
      </section>

      <section className="lab-explainer"><div className="lab-explainer-title"><BookOpen size={18}/><div><p className="eyebrow">CONNECT TO YOUR LESSON</p><h2>Check the physics</h2></div></div><div className="lab-law-grid"><article><b>Ohm’s law</b><p>For an ohmic resistor at constant physical conditions, V = I R. Double the voltage across a fixed resistor and its current doubles.</p></article><article><b>Series circuit</b><p>The same current passes through each component. Voltage drops add to the source voltage; resistances add.</p></article><article><b>Parallel circuit</b><p>Each branch has the source voltage. Branch currents add at the junction, and equivalent conductance is the sum of branch conductances.</p></article><article><b>Energy conservation</b><p>Source power equals the sum of resistor dissipation: V I = Σ(I²R). The circuit values update from these equations without rounding the internal calculations.</p></article></div><Link className="lab-lesson-link" to={`/classroom/${pilotSchool.id}/${pilotSchool.modules[0].id}`}><BookOpen size={14}/> Continue Electrical Fundamentals <ArrowLeft size={13}/></Link></section>
      <footer className="lab-footer">This is an ideal, low-voltage DC teaching model. Real batteries have internal resistance; real components have tolerances and thermal limits.</footer>
    </main>
  </div>;
}

export default SimulationLab;

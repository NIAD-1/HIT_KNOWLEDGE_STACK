import { Link } from 'react-router-dom';
import { ArrowUpRight, BookOpen, BrainCircuit, Check, ChevronRight, Compass, GraduationCap, Map, Play, Search, Sparkles } from 'lucide-react';
import { otherSchools, pilotSchool } from '../data/pilotSchool';

function Dashboard() {
  return (
    <div className="site-shell">
      <header className="topbar">
        <Link to="/" className="brand-lockup"><span className="brand-mark"><GraduationCap size={21} /></span><span>HIT <b>University</b></span></Link>
        <nav className="top-nav" aria-label="Main navigation"><Link to="/curriculum">Curriculum</Link><Link to="/vault">Library</Link><Link to="/tutor">AI Tutor</Link><a href="#projects">Projects</a><Link to="/listen">Listen</Link><a href="#map">Knowledge map</a></nav>
        <div className="top-actions"><button className="icon-button" aria-label="Search"><Search size={18} /></button><span className="avatar">H</span></div>
      </header>

      <main className="dashboard-page">
        <section className="welcome-row">
          <div><p className="eyebrow">SUNDAY, OCTOBER 18 · YOUR LEARNING CAMPUS</p><h1>Good morning, scholar<span className="period">.</span></h1><p className="welcome-copy">A little progress every day compounds into something remarkable.</p></div>
          <div className="streak-pill"><span className="streak-flame">✳</span><span><b>Learning, your way</b><small>Pick up where curiosity leads</small></span></div>
        </section>

        <section className="continue-card">
          <div className="continue-art" aria-hidden="true"><span className="orbit orbit-one" /><span className="orbit orbit-two" /><div className="art-core"><span>V</span></div><span className="art-node node-one">I</span><span className="art-node node-two">R</span><span className="art-node node-three">Q</span></div>
          <div className="continue-content"><p className="eyebrow light">PILOT PREVIEW <span className="live-dot" /> SAMPLE LEARNING PROGRESS</p><h2>{pilotSchool.lesson.title}</h2><p>Electrical Fundamentals <span className="middot">·</span> School of Electronics</p><div className="progress-line"><span style={{ width: '36%' }} /></div><div className="progress-meta"><span>Progress tracking is not connected yet</span><span>36%</span></div><Link to={`/classroom/${pilotSchool.id}/Module-1-Electrical-Fundamentals`} className="button button-light">Open lesson <ArrowUpRight size={16} /></Link></div>
          <div className="continue-side"><div className="side-note"><span className="mini-icon"><BrainCircuit size={17} /></span><p><b>Your next step</b><small>Explore how voltage drives current in a closed circuit.</small></p><ChevronRight size={16} /></div><div className="side-note"><span className="mini-icon mint"><Map size={17} /></span><p><b>Project connection</b><small>Cold-chain temperature logger</small></p><ChevronRight size={16} /></div></div>
        </section>

        <section className="section-block" id="schools">
          <div className="section-heading"><div><p className="eyebrow">FIND YOUR NEXT CLASS</p><h2>Explore your schools</h2></div><a href="#all-schools" className="text-link">View all schools <ArrowUpRight size={15} /></a></div>
          <Link to={`/school/${pilotSchool.id}`} className="featured-school">
            <div className="featured-badge">HIT KNOWLEDGE LIBRARY</div><div className="school-icon amber-icon"><span>e</span></div><div className="featured-copy"><h3>School of Electronics</h3><p>From charge and circuits to connected products in the real world.</p><div className="school-meta"><span><BookOpen size={14} /> Library folders</span><span><Check size={14} /> Library notes</span><span><Compass size={14} /> Projects & resources</span></div></div><span className="round-arrow"><ArrowUpRight size={19} /></span>
          </Link>
          <div className="school-grid" id="all-schools">{otherSchools.map((school) => <Link key={school.id} to={`/school/${school.id}`} className="school-tile"><span className={`school-monogram ${school.color}`}>{school.mark}</span><span className="school-tile-copy"><b>{school.name}</b><small>{school.domain}</small></span><ArrowUpRight size={16} /></Link>)}</div>
        </section>

        <section className="bottom-grid">
          <div className="panel projects-panel" id="projects"><div className="section-heading compact"><div><p className="eyebrow">LEARN BY MAKING</p><h2>Project studio</h2></div><Link to={`/school/${pilotSchool.id}#projects`} className="text-link">Explore <ArrowUpRight size={15} /></Link></div><div className="project-feature"><div className="project-art"><span className="sensor-ring ring-a"/><span className="sensor-ring ring-b"/><span className="sensor-dot"/><span className="project-signal">⌁</span></div><div className="project-info"><span className="project-tag">CAPSTONE · IN PROGRESS</span><h3>Cold-chain temperature logger</h3><p>Build a device that protects medicine as it travels.</p><div className="project-path"><span>Electronics</span><ChevronRight size={13}/><span>Embedded</span><ChevronRight size={13}/><span>Regulatory science</span></div><Link to={`/school/${pilotSchool.id}#projects`} className="arrow-link">Open project <ArrowUpRight size={15}/></Link></div></div></div>
          <div className="panel map-panel" id="map"><div className="section-heading compact"><div><p className="eyebrow">IDEAS CONNECT</p><h2>Your knowledge map</h2></div><Map size={19} className="muted-icon" /></div><div className="map-preview"><span className="map-edge edge-a"/><span className="map-edge edge-b"/><span className="map-edge edge-c"/><span className="map-edge edge-d"/><span className="map-node main-node"><Sparkles size={15}/> Safe medicine</span><span className="map-node map-n1">Sensors</span><span className="map-node map-n2">Cold chain</span><span className="map-node map-n3">Regulation</span><span className="map-node map-n4">Data</span><span className="map-node map-n5">Circuit design</span></div><p className="map-caption">Electronics connects with 3 other schools through your capstone work.</p><Link to={`/school/${pilotSchool.id}#map`} className="text-link">Explore the connections <ArrowUpRight size={15}/></Link></div>
        </section>

        <footer className="site-footer"><span>HIT University <span className="middot">·</span> Built around your knowledge</span><span><Sparkles size={14}/> Learn something that matters.</span></footer>
      </main>
    </div>
  );
}

export default Dashboard;

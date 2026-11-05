import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import { Headphones, Home, School as SchoolIcon, Wrench, Sparkles, FolderOpen } from 'lucide-react';
import Dashboard from './pages/Dashboard';
import Classroom from './pages/Classroom';
import School from './pages/School';
import Library from './pages/Library';
import Assignments from './pages/Assignments';
import Progress from './pages/Progress';
import Listen from './pages/Listen';
import Tutor from './pages/Tutor';
import Vault from './pages/Vault';
import Curriculum from './pages/Curriculum';
import { AudioPlayerProvider } from './components/AudioPlayer';
import AuthGate from './components/AuthGate';

function MobileNav() {
  return <nav className="mobile-app-nav" aria-label="App navigation">
    <NavLink to="/" end><Home size={18}/><span>Campus</span></NavLink>
    <NavLink to="/curriculum"><SchoolIcon size={18}/><span>Curriculum</span></NavLink>
    <NavLink to="/listen"><Headphones size={18}/><span>Listen</span></NavLink>
    <NavLink to="/tutor"><Sparkles size={18}/><span>Tutor</span></NavLink>
    <NavLink to="/vault"><FolderOpen size={18}/><span>Library</span></NavLink>
    <NavLink to="/school/02_Electronics#projects"><Wrench size={18}/><span>Projects</span></NavLink>
  </nav>;
}

function App() {
  return (
    <AuthGate><AudioPlayerProvider>
    <Router basename={import.meta.env.BASE_URL}>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/school/:schoolId" element={<School />} />
        <Route path="/curriculum" element={<Curriculum />} />
        <Route path="/listen" element={<Listen />} />
        <Route path="/tutor" element={<Tutor />} />
        <Route path="/vault" element={<Vault />} />
        <Route path="/classroom/:schoolId/:moduleId" element={<Classroom />} />
        <Route path="/library" element={<Library />} />
        <Route path="/assignments" element={<Assignments />} />
        <Route path="/progress" element={<Progress />} />
      </Routes>
      <MobileNav />
    </Router>
    </AudioPlayerProvider></AuthGate>
  );
}

export default App;

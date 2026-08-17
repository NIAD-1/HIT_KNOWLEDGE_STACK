import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Classroom from './pages/Classroom';
import Library from './pages/Library';
import Assignments from './pages/Assignments';
import Progress from './pages/Progress';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/classroom/:schoolId/:moduleId" element={<Classroom />} />
        <Route path="/library" element={<Library />} />
        <Route path="/assignments" element={<Assignments />} />
        <Route path="/progress" element={<Progress />} />
      </Routes>
    </Router>
  );
}

export default App;

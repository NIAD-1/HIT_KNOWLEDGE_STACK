import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Brain, Code, Shield, Cpu, Database, Cloud, Globe, Zap, Award, MessageSquare } from 'lucide-react';

const schools = [
  { id: '010_AI', name: 'AI & Machine Learning', icon: Brain, color: 'bg-purple-500', description: 'Deep learning, NLP, computer vision, and AI safety' },
  { id: '012_Cybersecurity', name: 'Cybersecurity', icon: Shield, color: 'bg-red-500', description: 'Network security, cryptography, and ethical hacking' },
  { id: '011_Robotics_and_Automation', name: 'Robotics & Automation', icon: Cpu, color: 'bg-blue-500', description: 'Autonomous systems, control theory, and mechatronics' },
  { id: '08_Databases', name: 'Database Engineering', icon: Database, color: 'bg-green-500', description: 'SQL, NoSQL, distributed databases, and data architecture' },
  { id: '06_Cloud_Engineering', name: 'Cloud Engineering', icon: Cloud, color: 'bg-sky-500', description: 'AWS, Azure, GCP, and cloud-native architectures' },
  { id: '07_SE', name: 'Software Engineering', icon: Code, color: 'bg-indigo-500', description: 'SDLC, agile methodologies, and software architecture' },
  { id: '05_Networking', name: 'Network Engineering', icon: Globe, color: 'bg-cyan-500', description: 'Network protocols, infrastructure, and security' },
  { id: '013_Devops_Platforms_Engineering_SRE', name: 'DevOps & SRE', icon: Zap, color: 'bg-orange-500', description: 'CI/CD, infrastructure as code, and site reliability' },
];

function Dashboard() {
  const [greeting, setGreeting] = useState('');
  
  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting('Good Morning');
    else if (hour < 18) setGreeting('Good Afternoon');
    else setGreeting('Good Evening');
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-slate-900">🎓 HIT University AI Faculty</h1>
              <p className="text-slate-600 mt-1">{greeting}, Scholar! Ready to learn today?</p>
            </div>
            <div className="flex items-center space-x-4">
              <button className="p-2 rounded-lg bg-primary-100 text-primary-700 hover:bg-primary-200">
                <MessageSquare className="w-6 h-6" />
              </button>
              <div className="flex items-center space-x-2 px-4 py-2 bg-academic-gold/10 rounded-lg">
                <Award className="w-5 h-5 text-academic-gold" />
                <span className="font-semibold text-academic-gold">Level 1</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Card */}
        <div className="bg-gradient-to-r from-primary-600 to-primary-700 rounded-2xl p-8 mb-8 text-white shadow-lg">
          <h2 className="text-2xl font-bold mb-2">Your Personal AI-Powered University</h2>
          <p className="text-primary-100 mb-4 max-w-3xl">
            Access 26+ schools with specialized AI professors, interactive lessons, assignments, 
            and a vast knowledge base of 11,940+ learning resources. Your journey to mastery starts here.
          </p>
          <div className="flex space-x-4">
            <Link to="/library" className="bg-white text-primary-700 px-6 py-3 rounded-lg font-semibold hover:bg-primary-50 transition">
              Browse Library
            </Link>
            <Link to="/assignments" className="bg-primary-800 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-900 transition">
              View Assignments
            </Link>
          </div>
        </div>

        {/* Schools Grid */}
        <h3 className="text-xl font-bold text-slate-900 mb-6">Choose Your School</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {schools.map((school) => {
            const Icon = school.icon;
            return (
              <Link
                key={school.id}
                to={`/classroom/${school.id}/Module_1`}
                className="group bg-white rounded-xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 border border-slate-200 hover:border-primary-300"
              >
                <div className={`${school.color} w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h4 className="font-bold text-slate-900 mb-2 group-hover:text-primary-600 transition-colors">
                  {school.name}
                </h4>
                <p className="text-sm text-slate-600 line-clamp-2">
                  {school.description}
                </p>
              </Link>
            );
          })}
        </div>

        {/* Quick Stats */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
            <div className="text-3xl font-bold text-primary-600">26+</div>
            <div className="text-slate-600">Schools</div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
            <div className="text-3xl font-bold text-primary-600">11,940+</div>
            <div className="text-slate-600">Learning Resources</div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
            <div className="text-3xl font-bold text-primary-600">4</div>
            <div className="text-slate-600">Learning Levels</div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
            <div className="text-3xl font-bold text-primary-600">∞</div>
            <div className="text-slate-600">Possibilities</div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Dashboard;

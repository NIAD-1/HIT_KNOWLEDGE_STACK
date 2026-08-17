import { useState } from 'react';
import { Search, BookOpen, FileText, Filter } from 'lucide-react';

function Library() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSchool, setSelectedSchool] = useState('all');

  const schools = [
    { id: 'all', name: 'All Schools' },
    { id: '010_AI', name: 'AI & ML' },
    { id: '012_Cybersecurity', name: 'Cybersecurity' },
    { id: '08_Databases', name: 'Databases' },
  ];

  // Mock resources - will be replaced with actual API
  const resources = [
    { id: 1, title: 'Introduction to Neural Networks', school: '010_AI', type: 'markdown', level: 'L1' },
    { id: 2, title: 'Advanced Cryptography', school: '012_Cybersecurity', type: 'pdf', level: 'L3' },
    { id: 3, title: 'SQL Fundamentals', school: '08_Databases', type: 'markdown', level: 'L1' },
    { id: 4, title: 'Deep Learning Patterns', school: '010_AI', type: 'video', level: 'L4' },
  ];

  const filteredResources = resources.filter(resource => {
    const matchesSearch = resource.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSchool = selectedSchool === 'all' || resource.school === selectedSchool;
    return matchesSearch && matchesSchool;
  });

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-3xl font-bold text-slate-900">📚 Digital Library</h1>
          <p className="text-slate-600 mt-1">Access 11,940+ learning resources</p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filters */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search textbooks, papers, tutorials..."
                className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
            <div className="flex items-center space-x-2">
              <Filter className="w-5 h-5 text-slate-400" />
              <select
                value={selectedSchool}
                onChange={(e) => setSelectedSchool(e.target.value)}
                className="px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                {schools.map(school => (
                  <option key={school.id} value={school.id}>{school.name}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Resources Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredResources.map(resource => (
            <div key={resource.id} className="bg-white rounded-xl p-6 shadow-sm border border-slate-200 hover:shadow-md transition">
              <div className="flex items-start justify-between mb-4">
                {resource.type === 'pdf' ? (
                  <FileText className="w-8 h-8 text-red-500" />
                ) : resource.type === 'video' ? (
                  <BookOpen className="w-8 h-8 text-blue-500" />
                ) : (
                  <BookOpen className="w-8 h-8 text-green-500" />
                )}
                <span className={`px-2 py-1 text-xs font-semibold rounded ${
                  resource.level === 'L1' ? 'bg-green-100 text-green-700' :
                  resource.level === 'L2' ? 'bg-blue-100 text-blue-700' :
                  resource.level === 'L3' ? 'bg-orange-100 text-orange-700' :
                  'bg-red-100 text-red-700'
                }`}>
                  {resource.level}
                </span>
              </div>
              <h3 className="font-bold text-slate-900 mb-2">{resource.title}</h3>
              <p className="text-sm text-slate-600 mb-4">School: {resource.school}</p>
              <button className="w-full px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition">
                Open Resource
              </button>
            </div>
          ))}
        </div>

        {filteredResources.length === 0 && (
          <div className="text-center py-12">
            <Search className="w-16 h-16 text-slate-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-slate-900 mb-2">No resources found</h3>
            <p className="text-slate-600">Try adjusting your search or filters</p>
          </div>
        )}
      </main>
    </div>
  );
}

export default Library;

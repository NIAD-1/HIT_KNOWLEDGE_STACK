import { TrendingUp, Award, BookOpen, Clock } from 'lucide-react';

function Progress() {
  const stats = {
    modulesCompleted: 12,
    assignmentsSubmitted: 8,
    hoursStudied: 47,
    averageScore: 87
  };

  const schoolProgress = [
    { school: 'AI & ML', progress: 65, color: 'bg-purple-500' },
    { school: 'Cybersecurity', progress: 40, color: 'bg-red-500' },
    { school: 'Databases', progress: 80, color: 'bg-green-500' },
    { school: 'Cloud Engineering', progress: 25, color: 'bg-sky-500' },
  ];

  const recentActivity = [
    { date: '2024-01-18', action: 'Completed module', detail: 'Neural Network Basics', school: 'AI & ML' },
    { date: '2024-01-17', action: 'Submitted assignment', detail: 'AES Encryption Implementation', school: 'Cybersecurity' },
    { date: '2024-01-16', action: 'Started module', detail: 'Advanced SQL Patterns', school: 'Databases' },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-3xl font-bold text-slate-900">📊 Your Progress</h1>
          <p className="text-slate-600 mt-1">Track your learning journey and achievements</p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
            <div className="flex items-center justify-between mb-4">
              <BookOpen className="w-8 h-8 text-primary-500" />
              <TrendingUp className="w-5 h-5 text-green-500" />
            </div>
            <p className="text-sm text-slate-600">Modules Completed</p>
            <p className="text-3xl font-bold text-slate-900">{stats.modulesCompleted}</p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
            <div className="flex items-center justify-between mb-4">
              <Award className="w-8 h-8 text-yellow-500" />
              <TrendingUp className="w-5 h-5 text-green-500" />
            </div>
            <p className="text-sm text-slate-600">Assignments Submitted</p>
            <p className="text-3xl font-bold text-slate-900">{stats.assignmentsSubmitted}</p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
            <div className="flex items-center justify-between mb-4">
              <Clock className="w-8 h-8 text-blue-500" />
              <TrendingUp className="w-5 h-5 text-green-500" />
            </div>
            <p className="text-sm text-slate-600">Hours Studied</p>
            <p className="text-3xl font-bold text-slate-900">{stats.hoursStudied}h</p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
            <div className="flex items-center justify-between mb-4">
              <TrendingUp className="w-8 h-8 text-green-500" />
              <TrendingUp className="w-5 h-5 text-green-500" />
            </div>
            <p className="text-sm text-slate-600">Average Score</p>
            <p className="text-3xl font-bold text-slate-900">{stats.averageScore}%</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* School Progress */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <h3 className="font-bold text-slate-900 mb-6">Progress by School</h3>
            <div className="space-y-6">
              {schoolProgress.map((item, idx) => (
                <div key={idx}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-slate-700">{item.school}</span>
                    <span className="text-sm text-slate-600">{item.progress}%</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-3">
                    <div 
                      className={`${item.color} h-3 rounded-full transition-all duration-500`}
                      style={{ width: `${item.progress}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <h3 className="font-bold text-slate-900 mb-6">Recent Activity</h3>
            <div className="space-y-4">
              {recentActivity.map((activity, idx) => (
                <div key={idx} className="flex items-start space-x-4 pb-4 border-b last:border-0">
                  <div className="w-2 h-2 mt-2 rounded-full bg-primary-500"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-slate-900">{activity.action}</p>
                    <p className="text-sm text-slate-600">{activity.detail}</p>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className="text-xs text-slate-500">{activity.date}</span>
                      <span className="text-xs px-2 py-0.5 bg-slate-100 rounded text-slate-600">
                        {activity.school}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Learning Level Badge */}
        <div className="mt-8 bg-gradient-to-r from-academic-gold/20 to-academic-gold/10 rounded-xl p-6 border border-academic-gold/30">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-slate-900 mb-1">Current Level: L1 - Foundation</h3>
              <p className="text-slate-600">Complete 8 more modules to reach Level 2</p>
            </div>
            <Award className="w-16 h-16 text-academic-gold" />
          </div>
          <div className="mt-4">
            <div className="w-full bg-slate-200 rounded-full h-4">
              <div className="bg-academic-gold h-4 rounded-full transition-all duration-500" style={{ width: '30%' }}></div>
            </div>
            <p className="text-sm text-slate-600 mt-2">30% to Level 2</p>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Progress;

import { CheckCircle, Clock, AlertCircle } from 'lucide-react';

function Assignments() {
  const assignments = [
    { 
      id: 1, 
      title: 'Build a Neural Network from Scratch', 
      school: '010_AI', 
      level: 'L2',
      status: 'pending',
      dueDate: '2024-01-20'
    },
    { 
      id: 2, 
      title: 'Implement AES Encryption', 
      school: '012_Cybersecurity', 
      level: 'L3',
      status: 'completed',
      dueDate: '2024-01-15'
    },
    { 
      id: 3, 
      title: 'Design a Distributed Database', 
      school: '08_Databases', 
      level: 'L4',
      status: 'submitted',
      dueDate: '2024-01-18'
    },
  ];

  const getStatusIcon = (status) => {
    switch(status) {
      case 'completed': return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'submitted': return <Clock className="w-5 h-5 text-blue-500" />;
      default: return <AlertCircle className="w-5 h-5 text-orange-500" />;
    }
  };

  const getStatusBadge = (status) => {
    switch(status) {
      case 'completed': return 'bg-green-100 text-green-700';
      case 'submitted': return 'bg-blue-100 text-blue-700';
      default: return 'bg-orange-100 text-orange-700';
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-3xl font-bold text-slate-900">📝 Assignments</h1>
          <p className="text-slate-600 mt-1">Track your learning tasks and submissions</p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">Pending</p>
                <p className="text-3xl font-bold text-orange-600">1</p>
              </div>
              <AlertCircle className="w-12 h-12 text-orange-200" />
            </div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">Submitted</p>
                <p className="text-3xl font-bold text-blue-600">1</p>
              </div>
              <Clock className="w-12 h-12 text-blue-200" />
            </div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">Completed</p>
                <p className="text-3xl font-bold text-green-600">1</p>
              </div>
              <CheckCircle className="w-12 h-12 text-green-200" />
            </div>
          </div>
        </div>

        {/* Assignments List */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50 border-b">
                <tr>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-slate-900">Assignment</th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-slate-900">School</th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-slate-900">Level</th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-slate-900">Due Date</th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-slate-900">Status</th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-slate-900">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {assignments.map(assignment => (
                  <tr key={assignment.id} className="hover:bg-slate-50">
                    <td className="px-6 py-4">
                      <p className="font-medium text-slate-900">{assignment.title}</p>
                    </td>
                    <td className="px-6 py-4 text-slate-600">{assignment.school}</td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-1 text-xs font-semibold bg-primary-100 text-primary-700 rounded">
                        {assignment.level}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-slate-600">{assignment.dueDate}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        {getStatusIcon(assignment.status)}
                        <span className={`px-2 py-1 text-xs font-semibold rounded ${getStatusBadge(assignment.status)}`}>
                          {assignment.status}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <button className="text-primary-600 hover:text-primary-700 font-medium text-sm">
                        {assignment.status === 'pending' ? 'Start' : 'View'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Assignments;

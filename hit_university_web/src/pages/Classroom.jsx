import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { ArrowLeft, MessageSquare, PlayCircle, FileText, BookOpen, CheckCircle, Send } from 'lucide-react';

// Mock data - will be replaced with actual API calls
const mockModules = {
  'Module_1': {
    title: 'Introduction to Fundamentals',
    lessons: [
      { id: 1, title: 'Core Concepts', type: 'markdown', content: '# Core Concepts\n\nWelcome to the fundamentals...' },
      { id: 2, title: 'Video Lecture', type: 'video', videoId: 'dQw4w9WgXcQ' },
      { id: 3, title: 'Reading Material', type: 'pdf', url: '/sample.pdf' },
    ]
  }
};

function Classroom() {
  const { schoolId, moduleId } = useParams();
  const [module, setModule] = useState(null);
  const [activeLesson, setActiveLesson] = useState(0);
  const [chatMessage, setChatMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([]);

  useEffect(() => {
    // In production, fetch from API
    setModule(mockModules['Module_1'] || mockModules['Module_1']);
  }, [schoolId, moduleId]);

  const handleSendMessage = async () => {
    if (!chatMessage.trim()) return;
    
    const newHistory = [...chatHistory, { role: 'user', content: chatMessage }];
    setChatHistory(newHistory);
    setChatMessage('');
    
    // TODO: Call AI tutor API
    // For now, mock response
    setTimeout(() => {
      setChatHistory(prev => [...prev, { 
        role: 'assistant', 
        content: `Great question about ${chatMessage}! Let me explain...` 
      }]);
    }, 500);
  };

  if (!module) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link to="/" className="p-2 hover:bg-slate-100 rounded-lg">
                <ArrowLeft className="w-5 h-5 text-slate-600" />
              </Link>
              <div>
                <h1 className="text-xl font-bold text-slate-900">{schoolId}</h1>
                <p className="text-sm text-slate-600">{module.title}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <button className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 flex items-center space-x-2">
                <CheckCircle className="w-4 h-4" />
                <span>Complete Module</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content Area */}
          <div className="lg:col-span-2 space-y-6">
            {/* Lesson Content */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
              {module.lessons[activeLesson]?.type === 'video' && (
                <div className="aspect-video bg-slate-900">
                  <iframe
                    className="w-full h-full"
                    src={`https://www.youtube.com/embed/${module.lessons[activeLesson].videoId}`}
                    title="Lesson Video"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              )}
              
              {module.lessons[activeLesson]?.type === 'markdown' && (
                <div className="p-6 markdown-body">
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {module.lessons[activeLesson].content}
                  </ReactMarkdown>
                </div>
              )}

              {module.lessons[activeLesson]?.type === 'pdf' && (
                <div className="p-6 text-center">
                  <BookOpen className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-slate-900 mb-2">PDF Textbook</h3>
                  <p className="text-slate-600 mb-4">Access your reading material</p>
                  <a 
                    href={module.lessons[activeLesson].url}
                    className="inline-flex items-center space-x-2 px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
                  >
                    <FileText className="w-5 h-5" />
                    <span>Open PDF</span>
                  </a>
                </div>
              )}
            </div>

            {/* Lesson Navigation */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
              <h3 className="font-bold text-slate-900 mb-4">Lessons</h3>
              <div className="space-y-2">
                {module.lessons.map((lesson, index) => (
                  <button
                    key={lesson.id}
                    onClick={() => setActiveLesson(index)}
                    className={`w-full text-left px-4 py-3 rounded-lg flex items-center space-x-3 transition ${
                      activeLesson === index 
                        ? 'bg-primary-100 text-primary-700' 
                        : 'hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    {lesson.type === 'video' ? (
                      <PlayCircle className="w-5 h-5" />
                    ) : lesson.type === 'pdf' ? (
                      <FileText className="w-5 h-5" />
                    ) : (
                      <BookOpen className="w-5 h-5" />
                    )}
                    <span>{lesson.title}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* AI Tutor Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 sticky top-24">
              <div className="p-4 border-b bg-gradient-to-r from-primary-600 to-primary-700 rounded-t-xl">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                    <MessageSquare className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white">AI Tutor</h3>
                    <p className="text-xs text-primary-100">Always here to help</p>
                  </div>
                </div>
              </div>
              
              <div className="h-96 overflow-y-auto p-4 space-y-4">
                {chatHistory.length === 0 ? (
                  <div className="text-center text-slate-500 py-8">
                    <MessageSquare className="w-12 h-12 mx-auto mb-3 opacity-50" />
                    <p className="text-sm">Ask me anything about this lesson!</p>
                  </div>
                ) : (
                  chatHistory.map((msg, idx) => (
                    <div
                      key={idx}
                      className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[85%] px-4 py-3 rounded-2xl ${
                          msg.role === 'user'
                            ? 'bg-primary-600 text-white'
                            : 'bg-slate-100 text-slate-900'
                        }`}
                      >
                        <p className="text-sm">{msg.content}</p>
                      </div>
                    </div>
                  ))
                )}
              </div>

              <div className="p-4 border-t">
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={chatMessage}
                    onChange={(e) => setChatMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    placeholder="Ask a question..."
                    className="flex-1 px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                  <button
                    onClick={handleSendMessage}
                    className="p-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
                  >
                    <Send className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Classroom;

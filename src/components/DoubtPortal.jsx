import React, { useState } from 'react';
import { MessageCircle, CheckCircle2, ChevronDown, ChevronUp, Send } from 'lucide-react';
import { useData } from '../context/DataContext';

const DoubtPortal = () => {
  const { doubts, addDoubt, addAnswer } = useData();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [expandedId, setExpandedId] = useState(null);
  const [replyText, setReplyText] = useState("");

  const handleRaiseDoubt = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    addDoubt({
      subject: formData.get('subject'),
      question: formData.get('question'),
      author: "Current User"
    });
    setIsModalOpen(false);
  };

  const handleReply = (e, doubtId) => {
    e.preventDefault();
    if (!replyText.trim()) return;
    addAnswer(doubtId, replyText);
    setReplyText("");
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Doubt Portal</h2>
          <p className="text-slate-500">Get help from peers and professors.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="vedam-button flex items-center gap-2"
        >
          <MessageCircle className="w-4 h-4" />
          Raise Query
        </button>
      </div>

      {/* Doubts List */}
      <div className="space-y-4">
        {doubts.map(doubt => (
          <div key={doubt.id} className="vedam-card overflow-hidden">
            <div 
              className="p-6 cursor-pointer hover:bg-slate-50 transition-colors"
              onClick={() => setExpandedId(expandedId === doubt.id ? null : doubt.id)}
            >
              <div className="flex items-start gap-4">
                <div className={`mt-1 p-1.5 rounded-full ${doubt.resolved ? 'bg-green-100 text-green-600' : 'bg-amber-100 text-amber-600'}`}>
                  {doubt.resolved ? <CheckCircle2 className="w-5 h-5" /> : <MessageCircle className="w-5 h-5" />}
                </div>
                <div className="flex-grow">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-semibold text-vedam-primary bg-blue-50 px-2 py-0.5 rounded-full">
                      {doubt.subject}
                    </span>
                    <span className="text-xs text-slate-400">• Posted by {doubt.author}</span>
                  </div>
                  <h3 className="text-lg font-medium text-slate-900">{doubt.question}</h3>
                </div>
                {expandedId === doubt.id ? <ChevronUp className="text-slate-400" /> : <ChevronDown className="text-slate-400" />}
              </div>
            </div>

            {/* Answers Section */}
            {expandedId === doubt.id && (
              <div className="bg-slate-50 border-t border-slate-200 p-6">
                <h4 className="text-sm font-bold text-slate-700 mb-4 uppercase tracking-wider">
                  {doubt.answers.length} Answers
                </h4>
                
                <div className="space-y-4 mb-6">
                  {doubt.answers.length > 0 ? (
                    doubt.answers.map(answer => (
                      <div key={answer.id} className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm">
                        <p className="text-slate-700 mb-2">{answer.text}</p>
                        <p className="text-xs text-slate-400 font-medium">Answered by {answer.author}</p>
                      </div>
                    ))
                  ) : (
                    <p className="text-slate-500 italic text-sm">No answers yet. Be the first to help!</p>
                  )}
                </div>

                <form onSubmit={(e) => handleReply(e, doubt.id)} className="flex gap-2">
                  <input 
                    type="text" 
                    placeholder="Type your answer..." 
                    className="vedam-input bg-white"
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                  />
                  <button type="submit" className="vedam-button px-4">
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Raise Doubt Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-6 relative animate-in fade-in zoom-in duration-200">
            <button 
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600"
            >
              ✕
            </button>
            
            <h3 className="text-xl font-bold mb-6">Raise a Query</h3>
            
            <form onSubmit={handleRaiseDoubt} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Subject</label>
                <select name="subject" className="vedam-input bg-white">
                  <option>Data Structures</option>
                  <option>Web Development</option>
                  <option>Database Management</option>
                  <option>Mathematics</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Question</label>
                <textarea name="question" required className="vedam-input h-32" placeholder="Describe your doubt in detail..."></textarea>
              </div>
              <button type="submit" className="w-full vedam-button">
                Post Query
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default DoubtPortal;


import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserProfile, JournalEntry } from '../types';

interface MyMindProps {
  profile: UserProfile;
  setProfile: React.Dispatch<React.SetStateAction<UserProfile>>;
}

const MyMind: React.FC<MyMindProps> = ({ profile, setProfile }) => {
  const navigate = useNavigate();
  const [activeTool, setActiveTool] = useState<'yoga' | 'meditation' | 'journal' | null>(null);
  
  // Meditation Timer State
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes
  const [isTimerActive, setIsTimerActive] = useState(false);
  const timerRef = useRef<number | null>(null);

  // Journal State
  const [note, setNote] = useState('');
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    if (isTimerActive && timeLeft > 0) {
      timerRef.current = window.setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsTimerActive(false);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isTimerActive, timeLeft]);

  const toggleTimer = () => setIsTimerActive(!isTimerActive);
  const resetTimer = () => {
    setIsTimerActive(false);
    setTimeLeft(300);
  };

  const saveJournal = () => {
    if (!note.trim()) return;
    const entry: JournalEntry = {
      id: Date.now().toString(),
      date: new Date().toISOString(),
      text: note,
      category: 'Wellness'
    };
    setProfile({ ...profile, journal: [entry, ...profile.journal] });
    setIsSaved(true);
    setNote('');
    setTimeout(() => setIsSaved(false), 2000);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const affirmations = [
    "I am growing a tiny, beautiful human being.",
    "My body is capable, strong, and wise.",
    "I deserve rest and peace during this journey.",
    "Every breath I take brings calm to me and my baby."
  ];

  return (
    <div className="min-h-screen pt-20 pb-32 px-6 max-w-4xl mx-auto space-y-10">
      {/* Tool Overlays */}
      {activeTool && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-md z-[100] flex items-center justify-center p-6">
          <div className="bg-white rounded-[3rem] p-8 max-w-lg w-full shadow-2xl relative">
            <button 
              onClick={() => setActiveTool(null)}
              className="absolute top-6 right-6 w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-500 hover:bg-gray-200 transition-colors"
            >
              <i className="fa-solid fa-xmark"></i>
            </button>

            {activeTool === 'yoga' && (
              <div className="space-y-6">
                <div className="w-16 h-16 bg-purple-100 text-purple-600 rounded-2xl flex items-center justify-center mx-auto">
                  <i className="fa-solid fa-person-running text-3xl"></i>
                </div>
                <h3 className="text-2xl font-black text-center text-gray-800">Prenatal Yoga</h3>
                <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                   <div className="p-4 bg-purple-50 rounded-2xl">
                      <h4 className="font-bold text-purple-700">1. Cat-Cow Stretch</h4>
                      <p className="text-sm text-gray-600 mt-1">Get on all fours. Inhale, drop your belly and look up. Exhale, round your spine and look at your bump. Relieves back tension.</p>
                   </div>
                   <div className="p-4 bg-purple-50 rounded-2xl">
                      <h4 className="font-bold text-purple-700">2. Bound Angle Pose</h4>
                      <p className="text-sm text-gray-600 mt-1">Sit with feet together, knees out. Hold your ankles. Improves hip flexibility for delivery.</p>
                   </div>
                   <div className="p-4 bg-purple-50 rounded-2xl">
                      <h4 className="font-bold text-purple-700">3. Standing Side Stretch</h4>
                      <p className="text-sm text-gray-600 mt-1">Stand tall, reach one arm over your head and lean. Helps create space for the growing baby.</p>
                   </div>
                </div>
                <p className="text-[10px] text-gray-400 text-center italic">Move gently. If anything feels uncomfortable, please stop immediately.</p>
              </div>
            )}

            {activeTool === 'meditation' && (
              <div className="text-center space-y-8">
                <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mx-auto">
                  <i className="fa-solid fa-moon text-3xl"></i>
                </div>
                <h3 className="text-2xl font-black text-gray-800">Safe Meditation</h3>
                <div className="py-10">
                   <div className={`text-6xl font-black transition-all ${isTimerActive ? 'text-blue-500 scale-110' : 'text-gray-300'}`}>
                      {formatTime(timeLeft)}
                   </div>
                   <p className="text-sm text-gray-500 mt-4 uppercase tracking-widest font-bold">
                      {isTimerActive ? (timeLeft % 10 < 5 ? 'Breathe In...' : 'Breathe Out...') : 'Ready to start?'}
                   </p>
                </div>
                <div className="flex gap-4">
                  <button 
                    onClick={toggleTimer}
                    className={`flex-1 py-4 rounded-2xl font-bold text-white shadow-lg transition-all ${isTimerActive ? 'bg-orange-500 shadow-orange-100' : 'bg-blue-600 shadow-blue-100'}`}
                  >
                    {isTimerActive ? 'Pause' : 'Start Session'}
                  </button>
                  <button 
                    onClick={resetTimer}
                    className="w-16 bg-gray-100 text-gray-500 rounded-2xl font-bold flex items-center justify-center"
                  >
                    <i className="fa-solid fa-rotate-right"></i>
                  </button>
                </div>
              </div>
            )}

            {activeTool === 'journal' && (
              <div className="space-y-6">
                <div className="w-16 h-16 bg-pink-100 text-pink-600 rounded-2xl flex items-center justify-center mx-auto">
                  <i className="fa-solid fa-book-open text-3xl"></i>
                </div>
                <h3 className="text-2xl font-black text-gray-800 text-center">Wellness Journal</h3>
                <textarea 
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="How are you feeling today? Share your thoughts, fears, or joys..."
                  className="w-full bg-gray-50 border-none rounded-2xl p-6 text-sm focus:ring-2 focus:ring-pink-100 min-h-[200px] resize-none outline-none"
                />
                <button 
                  onClick={saveJournal}
                  className="w-full py-4 bg-pink-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-pink-100 active:scale-95 transition-all"
                >
                  {isSaved ? 'Thought Saved ✨' : 'Save Entry'}
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Daily Affirmation */}
      <div className="text-center py-8">
        <h2 className="text-sm font-bold text-pink-500 uppercase tracking-widest mb-4">Daily Affirmation</h2>
        <div className="p-10 bg-white rounded-[3rem] shadow-xl shadow-pink-100/50 border border-pink-100 relative overflow-hidden">
          <i className="fa-solid fa-quote-left absolute top-6 left-6 text-pink-50 text-6xl"></i>
          <p className="text-2xl md:text-3xl font-semibold text-gray-800 leading-relaxed italic relative z-10">
            "{affirmations[Math.floor(Math.random() * affirmations.length)]}"
          </p>
          <i className="fa-solid fa-quote-right absolute bottom-6 right-6 text-pink-50 text-6xl"></i>
        </div>
      </div>

      {/* Mental Well-being Tips */}
      <section className="space-y-6">
        <div className="flex justify-between items-center">
          <h3 className="text-2xl font-black text-gray-800">Mindfulness Tools</h3>
          <span className="text-xs font-black text-gray-400 uppercase tracking-widest">3 Tools Available</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-8 rounded-[2rem] border border-gray-100 hover:shadow-xl transition-all flex flex-col items-center text-center group cursor-pointer" onClick={() => setActiveTool('yoga')}>
            <div className="w-16 h-16 rounded-[1.5rem] flex items-center justify-center mb-6 bg-purple-100 text-purple-600 group-hover:scale-110 transition-transform">
              <i className="fa-solid fa-person-running text-2xl"></i>
            </div>
            <h4 className="font-bold text-gray-800 mb-2">Prenatal Yoga</h4>
            <p className="text-xs text-gray-500 leading-relaxed">Safe stretches tailored for your current trimester.</p>
            <div className="mt-6 text-[10px] font-black text-purple-600 uppercase tracking-tighter">View Guidance →</div>
          </div>

          <div className="bg-white p-8 rounded-[2rem] border border-gray-100 hover:shadow-xl transition-all flex flex-col items-center text-center group cursor-pointer" onClick={() => setActiveTool('meditation')}>
            <div className="w-16 h-16 rounded-[1.5rem] flex items-center justify-center mb-6 bg-blue-100 text-blue-600 group-hover:scale-110 transition-transform">
              <i className="fa-solid fa-moon text-2xl"></i>
            </div>
            <h4 className="font-bold text-gray-800 mb-2">Safe Meditation</h4>
            <p className="text-xs text-gray-500 leading-relaxed">Interactive timer with breathing focus guidance.</p>
            <div className="mt-6 text-[10px] font-black text-blue-600 uppercase tracking-tighter">Start Timer →</div>
          </div>

          <div className="bg-white p-8 rounded-[2rem] border border-gray-100 hover:shadow-xl transition-all flex flex-col items-center text-center group cursor-pointer" onClick={() => setActiveTool('journal')}>
            <div className="w-16 h-16 rounded-[1.5rem] flex items-center justify-center mb-6 bg-pink-100 text-pink-600 group-hover:scale-110 transition-transform">
              <i className="fa-solid fa-book-open text-2xl"></i>
            </div>
            <h4 className="font-bold text-gray-800 mb-2">Quick Journal</h4>
            <p className="text-xs text-gray-500 leading-relaxed">Save your immediate thoughts to ease anxieties.</p>
            <div className="mt-6 text-[10px] font-black text-pink-600 uppercase tracking-tighter">Write Note →</div>
          </div>
        </div>
      </section>

      {/* Community Section */}
      <section className="bg-white p-8 rounded-[2.5rem] border border-purple-100 bg-gradient-to-br from-white to-purple-50/30">
        <div className="flex flex-col md:flex-row gap-8 items-center">
          <div className="flex-1 space-y-4">
            <h3 className="text-3xl font-black text-gray-800 leading-tight">Sister Circle</h3>
            <p className="text-gray-600 leading-relaxed">You are not alone. Join our verified community of mothers-to-be to share experiences and find support.</p>
            <div className="flex -space-x-3 mb-6">
              {[1, 2, 3, 4, 5].map((i) => (
                <img 
                  key={i} 
                  src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i + 123}`} 
                  className="w-12 h-12 rounded-full border-2 border-white bg-pink-100 shadow-sm" 
                  alt="User"
                />
              ))}
              <div className="w-12 h-12 rounded-full bg-indigo-600 text-white flex items-center justify-center text-xs font-black border-2 border-white">+12k</div>
            </div>
            <button 
              onClick={() => navigate('/sister-circle')}
              className="bg-indigo-600 text-white px-10 py-4 rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl shadow-indigo-100 hover:bg-indigo-700 transition-all active:scale-95"
            >
              Enter Community
            </button>
          </div>
          <div className="w-full md:w-1/3 bg-white p-6 rounded-[2rem] shadow-sm border border-purple-50">
            <h4 className="font-black text-xs uppercase tracking-widest text-gray-400 mb-6 border-b pb-4">Top Circles</h4>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                 <span className="text-lg">🧘‍♀️</span>
                 <p className="text-sm font-bold text-gray-700">Yoga Preppers</p>
              </div>
              <div className="flex items-center gap-3">
                 <span className="text-lg">🥗</span>
                 <p className="text-sm font-bold text-gray-700">Healthy Eaters</p>
              </div>
              <div className="flex items-center gap-3">
                 <span className="text-lg">😴</span>
                 <p className="text-sm font-bold text-gray-700">Sleep Solutions</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default MyMind;

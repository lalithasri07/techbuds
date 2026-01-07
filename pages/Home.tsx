
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserProfile, PregnancyStage } from '../types';

interface HomeProps {
  profile: UserProfile;
}

const Home: React.FC<HomeProps> = ({ profile }) => {
  const navigate = useNavigate();
  
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  };

  const dayOfPregnancy = profile.currentWeek * 7;
  const totalPregnancyWeeks = 40;
  const weeksToGo = totalPregnancyWeeks - profile.currentWeek;
  
  const getStageImage = (week: number) => {
    // Using verified, high-availability Unsplash IDs for motherhood and babies
    // First trimester: Focus on serenity/early stages
    if (week <= 12) return "https://images.unsplash.com/photo-1555252333-9f8e92e65df9?auto=format&fit=crop&q=80&w=1000";
    // Second trimester: Focus on the growing bump and health
    if (week <= 26) return "https://images.unsplash.com/photo-1519689680058-324335c77eba?auto=format&fit=crop&q=80&w=1000";
    // Third trimester: Focus on late stage preparation
    return "https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&q=80&w=1000";
  };

  const getBabySize = (week: number) => {
    if (week < 4) return { name: "Poppy Seed", icon: "🌱" };
    if (week < 8) return { name: "Lentil", icon: "🥜" };
    if (week < 12) return { name: "Lime", icon: "🍋" };
    if (week < 16) return { name: "Avocado", icon: "🥑" };
    if (week < 20) return { name: "Banana", icon: "🍌" };
    if (week < 24) return { name: "Corn", icon: "🌽" };
    if (week < 28) return { name: "Eggplant", icon: "🍆" };
    if (week < 32) return { name: "Pineapple", icon: "🍍" };
    if (week < 36) return { name: "Cantaloupe", icon: "🍈" };
    return { name: "Watermelon", icon: "🍉" };
  };

  const babySize = getBabySize(profile.currentWeek);

  const getTrimester = (week: number) => {
    if (week <= 12) return PregnancyStage.FIRST_TRIMESTER;
    if (week <= 26) return PregnancyStage.SECOND_TRIMESTER;
    return PregnancyStage.THIRD_TRIMESTER;
  };

  const formatDate = (dateStr: string) => {
    if (!dateStr) return "Not set";
    return new Date(dateStr).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
  };

  return (
    <div className="min-h-screen bg-pink-50/10 pt-16 pb-32 px-5 max-w-lg mx-auto md:max-w-none">
      {/* Top Header */}
      <div className="flex justify-between items-center py-4 mb-2">
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Today</h1>
        <div className="flex gap-2">
          {/* Chatbot Button added to screen header for extra visibility */}
          <button 
            onClick={() => navigate('/ai')}
            className="w-10 h-10 bg-gradient-to-br from-pink-400 to-purple-500 text-white rounded-full flex items-center justify-center shadow-lg active:scale-90 transition-transform"
            title="AI Chatbot"
          >
            <i className="fa-solid fa-robot text-sm"></i>
          </button>
          {/* Quick Call Button */}
          <button 
            onClick={() => navigate('/emergency')}
            className="w-10 h-10 bg-red-600 text-white rounded-full flex items-center justify-center shadow-lg active:scale-90 transition-transform"
            title="Emergency Call"
          >
            <i className="fa-solid fa-phone text-sm"></i>
          </button>
          <Link to="/setup" className="w-10 h-10 bg-white rounded-full flex items-center justify-center overflow-hidden border border-gray-200">
             <i className="fa-solid fa-user text-gray-400"></i>
          </Link>
        </div>
      </div>

      {/* Hero Image Section - Letterbox style to reduce height but remain immersive */}
      <div className="relative w-full aspect-[16/7] rounded-[2rem] overflow-hidden shadow-md mb-6 bg-pink-100">
        <img 
          src={getStageImage(profile.currentWeek)} 
          alt="Motherhood Journey"
          className="absolute inset-0 w-full h-full object-cover"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60"></div>
        
        <div className="absolute top-4 left-6 text-white">
          <p className="text-[10px] font-bold opacity-80 uppercase tracking-widest">{getGreeting()}</p>
          <h2 className="text-lg font-bold leading-tight">{profile.name}</h2>
        </div>

        <div className="absolute bottom-4 left-6 right-6 flex justify-between items-end">
          <div className="text-white">
            <h3 className="text-base font-bold leading-none">Day {dayOfPregnancy}</h3>
            <span className="text-[9px] font-black uppercase tracking-widest text-pink-300">{weeksToGo} Weeks to Go</span>
          </div>
          <button 
            onClick={() => navigate('/journal')}
            className="bg-white/95 backdrop-blur-sm px-4 py-1.5 rounded-full flex items-center gap-2 font-black text-[9px] uppercase text-gray-900 shadow-xl active:scale-95 transition-all"
          >
            Log Today <i className="fa-solid fa-plus text-[8px]"></i>
          </button>
        </div>
      </div>

      {/* Progress & Stats Card */}
      <div className="bg-white rounded-[2rem] p-5 shadow-sm border border-pink-50 mb-6">
        <div className="flex justify-between items-center mb-4">
          <div className="space-y-0.5">
            <h4 className="text-lg font-black text-gray-900 leading-none">{profile.currentWeek} Weeks</h4>
            <p className="text-[9px] text-pink-600 font-black uppercase tracking-widest">{getTrimester(profile.currentWeek)}</p>
          </div>
          <div className="text-right">
             <p className="text-[9px] font-bold text-gray-400 uppercase">Due Date</p>
             <p className="text-xs font-bold text-gray-700">{formatDate(profile.dueDate)}</p>
          </div>
        </div>
        
        <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden mb-2">
          <div 
            className="h-full bg-pink-500 rounded-full transition-all duration-1000" 
            style={{ width: `${(profile.currentWeek / 40) * 100}%` }}
          ></div>
        </div>
        <div className="flex justify-between items-center px-1">
            <span className="text-[8px] font-black text-gray-300 uppercase">Start</span>
            <span className="text-[8px] font-black text-pink-400 uppercase">Delivery</span>
        </div>
      </div>

      {/* Baby Size Comparison - Ultra Compact */}
      <div className="bg-white rounded-[1.5rem] p-4 border border-indigo-50 mb-6 flex items-center gap-4 shadow-sm">
         <div className="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center text-2xl shadow-inner border border-white shrink-0">
            {babySize.icon}
         </div>
         <div className="flex-1">
            <p className="text-[8px] font-black uppercase tracking-widest text-indigo-400 mb-0.5">Your Baby is a</p>
            <h4 className="text-sm font-black text-gray-800 leading-tight">{babySize.name}</h4>
            <p className="text-[9px] text-gray-400 mt-0.5">Growing beautifully every day.</p>
         </div>
      </div>

      {/* Quick Tools Grid - Reduced Padding */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        {[
          { icon: 'fa-list-check', label: 'Tasks', color: 'text-blue-500', bg: 'bg-blue-50', path: '/tasks' },
          { icon: 'fa-camera-retro', label: 'Journal', color: 'text-purple-500', bg: 'bg-purple-50', path: '/journal' },
          { icon: 'fa-baby-carriage', label: 'Names', color: 'text-pink-500', bg: 'bg-pink-50', path: '/baby-names' }
        ].map((tool, i) => (
          <Link key={i} to={tool.path} className="flex flex-col items-center gap-1.5 group">
            <div className={`${tool.bg} ${tool.color} w-full aspect-square rounded-[1.5rem] flex items-center justify-center text-xl shadow-sm group-hover:bg-white group-hover:shadow-md transition-all border border-transparent group-hover:border-gray-100`}>
              <i className={`fa-solid ${tool.icon}`}></i>
            </div>
            <span className="text-[8px] font-black uppercase tracking-widest text-gray-400 group-hover:text-gray-800">{tool.label}</span>
          </Link>
        ))}
      </div>

      {/* Emergency Call Action - Slim Banner */}
      <div 
        onClick={() => navigate('/emergency')}
        className="bg-red-50 p-3.5 rounded-[1.5rem] border border-red-100 flex items-center gap-4 cursor-pointer hover:bg-red-100 transition-colors group shadow-sm"
      >
         <div className="w-9 h-9 bg-red-600 rounded-full flex items-center justify-center text-white text-sm shadow-md group-hover:scale-110 transition-transform">
           <i className="fa-solid fa-phone-volume"></i>
         </div>
         <div className="flex-1">
            <h4 className="font-bold text-red-900 text-[11px] uppercase tracking-wide">Emergency Call</h4>
            <p className="text-[9px] text-red-700/60 font-medium leading-none">Instant help when you need it.</p>
         </div>
         <i className="fa-solid fa-chevron-right text-red-200 text-[10px]"></i>
      </div>
    </div>
  );
};

export default Home;

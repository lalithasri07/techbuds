
import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import MyBody from './pages/MyBody';
import MyMind from './pages/MyMind';
import MyNeeds from './pages/MyNeeds';
import MyAI from './pages/MyAI';
import NearbyServices from './pages/NearbyServices';
import Emergency from './pages/Emergency';
import ProfileSetup from './pages/ProfileSetup';
import MyTasks from './pages/MyTasks';
import MyJournal from './pages/MyJournal';
import BabyNames from './pages/BabyNames';
import SisterCircle from './pages/SisterCircle';
import { UserProfile } from './types';

const App: React.FC = () => {
  const [profile, setProfile] = useState<UserProfile>(() => {
    const saved = localStorage.getItem('maasakhi_profile_v6');
    return saved ? JSON.parse(saved) : {
      name: 'Maa',
      dueDate: '2025-09-01',
      currentWeek: 6,
      personalPhone: '',
      location: 'Mumbai, Maharashtra, India',
      emergencyContacts: [
        { id: '1', name: 'Partner', role: 'Primary', phone: '' },
        { id: '2', name: 'Doctor', role: 'OB-GYN', phone: '' }
      ],
      tasks: [
        { id: '1', title: 'Start Folic Acid', completed: true, trimester: 1 },
        { id: '2', title: 'Schedule First Scan', completed: false, trimester: 1 },
        { id: '3', title: 'Plan Nursery Decor', completed: false, trimester: 2 }
      ],
      journal: [],
      weightLog: [],
      symptoms: [
        { id: 's1', date: 'Today', symptom: 'Mild Morning Sickness', severity: 'Mild' }
      ]
    };
  });

  useEffect(() => {
    localStorage.setItem('maasakhi_profile_v6', JSON.stringify(profile));
  }, [profile]);

  return (
    <Router>
      <div className="min-h-screen bg-white pb-24">
        <Navbar profile={profile} />
        <main className="md:pl-64">
          <Routes>
            <Route path="/" element={<Home profile={profile} />} />
            <Route path="/body" element={<MyBody profile={profile} setProfile={setProfile} />} />
            <Route path="/mind" element={<MyMind profile={profile} setProfile={setProfile} />} />
            <Route path="/needs" element={<MyNeeds profile={profile} />} />
            <Route path="/ai" element={<MyAI />} />
            <Route path="/nearby" element={<NearbyServices profile={profile} />} />
            <Route path="/emergency" element={<Emergency profile={profile} setProfile={setProfile} />} />
            <Route path="/setup" element={<ProfileSetup profile={profile} setProfile={setProfile} />} />
            <Route path="/tasks" element={<MyTasks profile={profile} setProfile={setProfile} />} />
            <Route path="/journal" element={<MyJournal profile={profile} setProfile={setProfile} />} />
            <Route path="/baby-names" element={<BabyNames />} />
            <Route path="/sister-circle" element={<SisterCircle />} />
          </Routes>
        </main>
        
        {/* Floating Actions - Persistent Buttons */}
        <div className="fixed bottom-24 right-6 flex flex-col gap-4 z-50">
           <Link to="/ai" title="Ask MaaSakhi AI" className="w-14 h-14 bg-gradient-to-br from-pink-400 to-purple-500 text-white rounded-full flex items-center justify-center shadow-xl shadow-pink-200 hover:scale-110 active:scale-90 transition-all border-2 border-white">
             <i className="fa-solid fa-robot text-xl"></i>
           </Link>
           <Link to="/emergency" title="Emergency Help" className="w-14 h-14 bg-red-600 text-white rounded-full flex items-center justify-center shadow-xl shadow-red-200 hover:scale-110 active:scale-90 transition-all border-2 border-white">
             <i className="fa-solid fa-phone-volume text-xl"></i>
           </Link>
        </div>
      </div>
    </Router>
  );
};

export default App;

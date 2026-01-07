
import React, { useState } from 'react';
import { UserProfile, WeightRecord, SymptomRecord } from '../types';

interface MyBodyProps {
  profile: UserProfile;
  setProfile: React.Dispatch<React.SetStateAction<UserProfile>>;
}

const MyBody: React.FC<MyBodyProps> = ({ profile, setProfile }) => {
  const [water, setWater] = useState(4);
  const [weight, setWeight] = useState('');
  
  // Local state for symptom form
  const [showSymptomForm, setShowSymptomForm] = useState(false);
  const [newSymptom, setNewSymptom] = useState('');
  const [newSeverity, setNewSeverity] = useState<'Mild' | 'Moderate' | 'Severe'>('Mild');

  const addWeight = () => {
    if (!weight) return;
    const record: WeightRecord = {
      date: new Date().toISOString(),
      weight: parseFloat(weight)
    };
    setProfile({ ...profile, weightLog: [record, ...profile.weightLog] });
    setWeight('');
  };

  const addSymptom = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSymptom.trim()) return;
    const symptom: SymptomRecord = {
      id: Date.now().toString(),
      date: 'Today',
      symptom: newSymptom,
      severity: newSeverity
    };
    setProfile({ ...profile, symptoms: [symptom, ...profile.symptoms] });
    setNewSymptom('');
    setShowSymptomForm(false);
  };

  const getTrimester = (week: number) => {
    if (week <= 12) return 'First Trimester';
    if (week <= 26) return 'Second Trimester';
    return 'Third Trimester';
  };

  return (
    <div className="min-h-screen pt-20 pb-32 px-6 max-w-4xl mx-auto space-y-8">
      {/* Week Progress Card */}
      <div className="bg-gradient-to-br from-indigo-600 to-purple-700 p-8 rounded-[3rem] text-white shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32 blur-[100px]"></div>
        <div className="relative z-10 flex justify-between items-end mb-6">
          <div>
            <h2 className="text-4xl font-black mb-1">Week {profile.currentWeek}</h2>
            <p className="opacity-80 font-bold uppercase tracking-widest text-xs">{getTrimester(profile.currentWeek)}</p>
          </div>
          <div className="text-right">
            <span className="text-[10px] bg-white/20 px-3 py-1 rounded-full font-black uppercase tracking-tighter">Day {profile.currentWeek * 7}</span>
          </div>
        </div>
        <div className="w-full bg-white/20 h-3 rounded-full overflow-hidden relative z-10">
          <div className="bg-white h-full transition-all duration-1000" style={{ width: `${(profile.currentWeek / 40) * 100}%` }}></div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Hydration */}
        <div className="bg-white p-6 rounded-[2.5rem] shadow-sm border border-gray-100">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-black text-gray-800 uppercase tracking-tight">Hydration</h3>
            <span className="text-blue-500 font-black">{water}/10 Cups</span>
          </div>
          <div className="flex flex-wrap gap-2 justify-center mb-6">
            {[...Array(10)].map((_, i) => (
              <button
                key={i}
                onClick={() => setWater(i + 1)}
                className={`w-10 h-10 rounded-2xl flex items-center justify-center transition-all ${
                  i < water ? 'bg-blue-500 text-white shadow-lg' : 'bg-blue-50 text-blue-100'
                }`}
              >
                <i className="fa-solid fa-droplet"></i>
              </button>
            ))}
          </div>
        </div>

        {/* Weight Log */}
        <div className="bg-white p-6 rounded-[2.5rem] shadow-sm border border-gray-100">
          <h3 className="text-lg font-black text-gray-800 uppercase tracking-tight mb-6">Weight Log</h3>
          <div className="flex gap-2 mb-6">
            <input 
              type="number" 
              value={weight}
              onChange={e => setWeight(e.target.value)}
              placeholder="Kg"
              className="flex-1 bg-gray-50 border-none rounded-2xl px-4 py-3 text-sm focus:ring-2 focus:ring-purple-100 outline-none"
            />
            <button 
              onClick={addWeight}
              className="bg-purple-600 text-white px-6 rounded-2xl font-bold shadow-lg shadow-purple-100"
            >
              Add
            </button>
          </div>
          <div className="max-h-32 overflow-y-auto space-y-2 pr-2 custom-scrollbar">
            {profile.weightLog.slice(0, 3).map((w, idx) => (
              <div key={idx} className="flex justify-between items-center text-xs p-3 bg-gray-50 rounded-xl font-bold">
                <span className="text-gray-400">{new Date(w.date).toLocaleDateString()}</span>
                <span className="text-purple-600">{w.weight} kg</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Symptoms Tracking Section */}
      <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-black text-gray-800 uppercase tracking-tight">Symptom Track</h3>
          <button 
            onClick={() => setShowSymptomForm(!showSymptomForm)}
            className="text-pink-500 font-bold text-sm bg-pink-50 px-4 py-1 rounded-full"
          >
            {showSymptomForm ? 'Cancel' : '+ Add New'}
          </button>
        </div>

        {showSymptomForm && (
          <form onSubmit={addSymptom} className="mb-8 p-6 bg-pink-50/30 rounded-3xl space-y-4">
            <div>
              <label className="text-xs font-bold text-gray-500 block mb-1">What are you feeling?</label>
              <input 
                type="text"
                required
                value={newSymptom}
                onChange={(e) => setNewSymptom(e.target.value)}
                placeholder="e.g. Back pain, Nausea"
                className="w-full bg-white border border-pink-100 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-pink-200"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-gray-500 block mb-1">Severity</label>
              <div className="flex gap-2">
                {['Mild', 'Moderate', 'Severe'].map(sev => (
                  <button
                    key={sev}
                    type="button"
                    onClick={() => setNewSeverity(sev as any)}
                    className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all ${
                      newSeverity === sev ? 'bg-pink-600 text-white' : 'bg-white border border-pink-100 text-pink-600'
                    }`}
                  >
                    {sev}
                  </button>
                ))}
              </div>
            </div>
            <button 
              type="submit"
              className="w-full bg-pink-600 text-white py-3 rounded-xl font-bold shadow-lg shadow-pink-100"
            >
              Log Symptom
            </button>
          </form>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {profile.symptoms.length > 0 ? profile.symptoms.map(s => (
            <div key={s.id} className="p-4 bg-gray-50 rounded-2xl flex items-center justify-between">
              <div>
                <p className="text-sm font-black text-gray-800">{s.symptom}</p>
                <p className="text-[10px] text-gray-400 uppercase font-bold">{s.date}</p>
              </div>
              <span className={`text-[9px] font-black uppercase px-2 py-1 rounded-full ${
                s.severity === 'Mild' ? 'bg-green-100 text-green-600' : 
                s.severity === 'Moderate' ? 'bg-yellow-100 text-yellow-600' : 'bg-red-100 text-red-600'
              }`}>{s.severity}</span>
            </div>
          )) : (
            <div className="col-span-full text-center py-6 text-gray-400 italic text-sm">
              No symptoms logged yet.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyBody;


import React, { useState, useRef } from 'react';
import { UserProfile, JournalEntry } from '../types';

interface MyJournalProps {
  profile: UserProfile;
  setProfile: React.Dispatch<React.SetStateAction<UserProfile>>;
}

const MyJournal: React.FC<MyJournalProps> = ({ profile, setProfile }) => {
  const [activeTab, setActiveTab] = useState<'Bump' | 'Scan' | 'Nursery' | 'Wellness'>('Bump');
  const [note, setNote] = useState('');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const addEntry = () => {
    if (!note.trim() && !selectedImage) return;
    
    const entry: JournalEntry = {
      id: Date.now().toString(),
      date: new Date().toISOString(),
      text: note,
      category: activeTab,
      imageUrl: selectedImage || undefined
    };
    
    setProfile({ ...profile, journal: [entry, ...profile.journal] });
    setNote('');
    setSelectedImage(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const filteredJournal = profile.journal.filter(j => j.category === activeTab);

  return (
    <div className="min-h-screen pt-20 pb-32 px-6 max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold text-gray-900 mb-8">Pregnancy Journal</h2>

      {/* Navigation Tabs */}
      <div className="grid grid-cols-4 gap-1 mb-10 bg-gray-100 p-1 rounded-2xl">
        {['Bump', 'Scan', 'Nursery', 'Wellness'].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab as any)}
            className={`py-3 rounded-xl font-bold text-[10px] uppercase tracking-tighter transition-all ${
              activeTab === tab ? 'bg-white text-pink-600 shadow-sm' : 'text-gray-400'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Entry Input Area */}
      <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-50 mb-10">
        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder={`Write something about your ${activeTab.toLowerCase()} today...`}
          className="w-full bg-gray-50/50 border-none rounded-2xl p-4 text-sm focus:ring-2 focus:ring-pink-100 min-h-[100px] resize-none outline-none mb-4"
        />
        
        {/* Image Preview */}
        {selectedImage && (
          <div className="relative w-full aspect-video rounded-2xl overflow-hidden mb-4 border border-pink-100 bg-pink-50">
            <img src={selectedImage} alt="Preview" className="w-full h-full object-cover" />
            <button 
              onClick={() => setSelectedImage(null)}
              className="absolute top-2 right-2 w-8 h-8 bg-black/50 text-white rounded-full flex items-center justify-center hover:bg-black/70 transition-colors"
            >
              <i className="fa-solid fa-xmark"></i>
            </button>
          </div>
        )}

        <div className="flex justify-between items-center">
           <input 
             type="file" 
             accept="image/*" 
             className="hidden" 
             ref={fileInputRef}
             onChange={handleImageUpload}
           />
           <button 
             onClick={() => fileInputRef.current?.click()}
             className="text-gray-500 hover:text-pink-500 flex items-center gap-2 text-sm font-bold bg-gray-50 px-4 py-2 rounded-xl transition-colors"
           >
             <i className="fa-solid fa-camera"></i> 
             {activeTab === 'Scan' ? 'Scan' : activeTab === 'Bump' ? 'Bump' : 'Photo'}
           </button>
           <button 
             onClick={addEntry}
             className="bg-pink-600 text-white px-8 py-3 rounded-full font-bold shadow-lg shadow-pink-100 active:scale-95 transition-all disabled:opacity-50 disabled:scale-100"
             disabled={!note.trim() && !selectedImage}
           >
             Save Entry
           </button>
        </div>
      </div>

      {/* Grid Display for Logs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {filteredJournal.length > 0 ? (
          filteredJournal.map(j => (
            <div key={j.id} className="bg-white rounded-[2rem] border border-gray-100 shadow-sm overflow-hidden flex flex-col hover:shadow-md transition-shadow">
              {j.imageUrl && (
                <div className="aspect-square w-full overflow-hidden bg-gray-50">
                  <img 
                    src={j.imageUrl} 
                    alt="Journal Entry" 
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <div className="p-6">
                <div className="flex justify-between items-start mb-3">
                   <span className="text-[10px] uppercase font-black tracking-widest text-pink-500 bg-pink-50 px-3 py-1 rounded-full">
                     {new Date(j.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                   </span>
                   <button className="text-gray-300 hover:text-gray-600">
                     <i className="fa-solid fa-ellipsis"></i>
                   </button>
                </div>
                {j.text && (
                  <p className="text-gray-700 leading-relaxed text-sm italic">
                    "{j.text}"
                  </p>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-20 opacity-20">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <i className="fa-solid fa-images text-4xl"></i>
            </div>
            <p className="font-bold text-xl">No {activeTab.toLowerCase()} entries yet</p>
            <p className="text-sm">Start building your beautiful memory book today.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyJournal;

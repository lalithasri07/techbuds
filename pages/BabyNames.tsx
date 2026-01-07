
import React, { useState } from 'react';
// Fix: Use correct import for GoogleGenAI and include Type for schema definition
import { GoogleGenAI, Type } from '@google/genai';

const BabyNames: React.FC = () => {
  const [pref, setPref] = useState('modern');
  const [culture, setCulture] = useState('any');
  const [loading, setLoading] = useState(false);
  const [names, setNames] = useState<any[]>([]);

  const fetchNames = async () => {
    setLoading(true);
    try {
      // Fix: Correct initialization with named apiKey parameter
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const prompt = `Suggest 5 baby names that are ${pref} and from ${culture} culture. For each name, provide its meaning and origin.`;
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: prompt,
        config: { 
          responseMimeType: 'application/json',
          // Fix: Using responseSchema for robust JSON extraction as per guidelines
          responseSchema: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                name: { type: Type.STRING },
                meaning: { type: Type.STRING },
                origin: { type: Type.STRING }
              },
              required: ['name', 'meaning', 'origin']
            }
          }
        }
      });
      // Fix: Access response.text as a property, not a method
      const jsonStr = response.text?.trim() || '[]';
      setNames(JSON.parse(jsonStr));
    } catch (e) {
      console.error(e);
      setNames([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-20 pb-32 px-6 max-w-2xl mx-auto">
      <div className="bg-gradient-to-br from-pink-400 to-indigo-500 p-10 rounded-[3rem] text-white shadow-xl mb-10">
        <h2 className="text-3xl font-bold mb-4">Baby Name Assistant</h2>
        <p className="opacity-90 text-sm leading-relaxed mb-8">Our AI helps you find the perfect name based on your preferences and heritage.</p>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-widest opacity-80">Style</label>
            <select 
              value={pref} 
              onChange={e => setPref(e.target.value)}
              className="w-full bg-white/20 border border-white/20 rounded-xl px-4 py-3 text-sm focus:bg-white/30 outline-none"
            >
              <option value="modern" className="text-gray-900">Modern</option>
              <option value="traditional" className="text-gray-900">Traditional</option>
              <option value="unique" className="text-gray-900">Unique</option>
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-widest opacity-80">Culture</label>
            <input 
              type="text" 
              value={culture} 
              onChange={e => setCulture(e.target.value)}
              placeholder="e.g. Indian, Greek"
              className="w-full bg-white/20 border border-white/20 rounded-xl px-4 py-3 text-sm placeholder:text-white/50 focus:bg-white/30 outline-none"
            />
          </div>
        </div>

        <button 
          onClick={fetchNames}
          disabled={loading}
          className="w-full mt-8 bg-white text-indigo-600 py-4 rounded-2xl font-bold shadow-lg hover:bg-gray-100 transition-all disabled:opacity-50"
        >
          {loading ? 'Finding names...' : 'Suggest Names'}
        </button>
      </div>

      <div className="space-y-4">
        {names.map((n, i) => (
          <div key={i} className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-xl font-bold text-gray-800">{n.name}</h3>
              <i className="fa-regular fa-heart text-pink-400 cursor-pointer"></i>
            </div>
            <p className="text-sm text-gray-500 font-medium italic mb-1">{n.origin}</p>
            <p className="text-sm text-gray-600">{n.meaning}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BabyNames;

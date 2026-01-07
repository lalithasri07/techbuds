
import React, { useState } from 'react';
import { findNearbyServices } from '../services/gemini';
import { UserProfile } from '../types';

interface NearbyServicesProps {
  profile: UserProfile;
}

const NearbyServices: React.FC<NearbyServicesProps> = ({ profile }) => {
  const [loading, setLoading] = useState(false);
  const [services, setServices] = useState<any[]>([]);

  const handleFind = async (type: string) => {
    setLoading(true);
    try {
      const locationToSearch = profile.location || "India";
      const response = await findNearbyServices(type, locationToSearch);
      
      const chunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
      const extracted = chunks
        .filter((chunk: any) => chunk.maps)
        .map((chunk: any) => ({
          name: chunk.maps.title,
          type: type === 'hospitals' ? 'Hospital' : type === 'clinics' ? 'Clinic' : 'Pharmacy',
          address: chunk.maps.title,
          uri: chunk.maps.uri,
          distance: 'Location Verified',
          rating: 'N/A'
        }));
      
      setServices(extracted);
    } catch (e) {
      console.error(e);
      setServices([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-20 pb-32 px-6 max-w-4xl mx-auto">
      <div className="text-center mb-10 space-y-4">
        <h2 className="text-3xl font-bold text-gray-800 tracking-tight">Nearby Care</h2>
        <p className="text-gray-500">Searching services near <span className="text-pink-600 font-bold">{profile.location || "India"}</span></p>
      </div>

      <div className="flex flex-wrap gap-4 justify-center mb-12">
        <button 
          onClick={() => handleFind('maternity hospitals')}
          className="bg-white border-2 border-pink-100 px-6 py-4 rounded-3xl font-bold text-gray-700 hover:border-pink-500 hover:text-pink-600 transition-all flex items-center gap-3 shadow-sm"
        >
          <i className="fa-solid fa-hospital text-pink-500"></i>
          Maternity Hospitals
        </button>
        <button 
          onClick={() => handleFind('pediatric clinics')}
          className="bg-white border-2 border-purple-100 px-6 py-4 rounded-3xl font-bold text-gray-700 hover:border-purple-500 hover:text-purple-600 transition-all flex items-center gap-3 shadow-sm"
        >
          <i className="fa-solid fa-house-medical text-purple-500"></i>
          Baby Clinics
        </button>
        <button 
          onClick={() => handleFind('24/7 pharmacies')}
          className="bg-white border-2 border-blue-100 px-6 py-4 rounded-3xl font-bold text-gray-700 hover:border-blue-500 hover:text-blue-600 transition-all flex items-center gap-3 shadow-sm"
        >
          <i className="fa-solid fa-prescription-bottle-med text-blue-500"></i>
          Pharmacies
        </button>
      </div>

      {loading ? (
        <div className="flex flex-col items-center py-20 gap-4">
          <div className="w-12 h-12 border-4 border-pink-100 border-t-pink-600 rounded-full animate-spin"></div>
          <p className="text-pink-600 font-bold animate-pulse uppercase tracking-widest text-xs">Finding best care in India...</p>
        </div>
      ) : services.length > 0 ? (
        <div className="space-y-4">
          {services.map((s, i) => (
            <div key={i} className="bg-white p-6 rounded-[2rem] border border-gray-50 flex items-center gap-6 group hover:shadow-xl transition-all shadow-sm">
              <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center group-hover:bg-pink-50 transition-colors">
                <i className={`fa-solid ${s.type === 'Hospital' ? 'fa-hospital' : s.type === 'Clinic' ? 'fa-house-medical' : 'fa-pills'} text-2xl text-gray-400 group-hover:text-pink-500`}></i>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="font-bold text-gray-800 text-lg leading-tight">{s.name}</h4>
                  <span className="text-[9px] bg-green-50 text-green-600 px-2 py-0.5 rounded-full font-black uppercase tracking-tighter">Verified</span>
                </div>
                <p className="text-xs text-gray-500">{s.address}</p>
                {s.uri && (
                  <a 
                    href={s.uri} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-[10px] text-blue-600 font-black uppercase tracking-widest hover:underline flex items-center gap-1 mt-2"
                  >
                    <i className="fa-solid fa-arrow-up-right-from-square"></i> View on Maps
                  </a>
                )}
              </div>
              <a 
                href={s.uri} 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-12 h-12 bg-gray-50 text-gray-400 rounded-full flex items-center justify-center hover:bg-pink-600 hover:text-white transition-all shadow-inner"
              >
                <i className="fa-solid fa-location-arrow"></i>
              </a>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 opacity-20 flex flex-col items-center gap-4">
          <i className="fa-solid fa-map-location-dot text-7xl"></i>
          <p className="font-bold text-sm uppercase tracking-widest">Select a category to see results for {profile.location || "India"}</p>
        </div>
      )}
    </div>
  );
};

export default NearbyServices;


import React from 'react';
import { Link } from 'react-router-dom';
import { UserProfile } from '../types';

interface EmergencyProps {
  profile: UserProfile;
  setProfile: React.Dispatch<React.SetStateAction<UserProfile>>;
}

const Emergency: React.FC<EmergencyProps> = ({ profile }) => {
  const hasValidNumbers = profile.emergencyContacts.some(c => c.phone.trim() !== '');

  return (
    <div className="min-h-screen pt-20 pb-32 px-6 max-w-lg mx-auto text-center space-y-8">
      <div className="p-8 bg-red-50 rounded-[3rem] border-2 border-red-100 flex flex-col items-center gap-6 shadow-2xl shadow-red-100">
        <div 
          onClick={() => {
            const first = profile.emergencyContacts.find(c => c.phone !== '');
            if(first) window.location.href = `tel:${first.phone}`;
            else alert("Please setup your emergency contacts first.");
          }}
          className="w-24 h-24 bg-red-600 rounded-full flex items-center justify-center text-white text-4xl shadow-lg shadow-red-200 animate-pulse cursor-pointer hover:scale-110 transition-transform"
        >
          <i className="fa-solid fa-phone"></i>
        </div>
        <div>
          <h2 className="text-2xl font-bold text-red-700">Call My Numbers Now</h2>
          <p className="text-red-600/80 font-medium">Instantly notify your configured contacts.</p>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex justify-between items-center px-4">
          <h3 className="text-xl font-bold text-gray-800">Your Trusted Contacts</h3>
          <Link to="/setup" className="text-xs font-bold text-pink-600 flex items-center gap-1">
             <i className="fa-solid fa-pen-to-square"></i> Edit
          </Link>
        </div>
        
        {profile.emergencyContacts.map((contact, i) => (
          <div key={contact.id} className={`glass-card p-6 rounded-3xl border border-gray-100 flex items-center justify-between hover:shadow-lg transition-all ${!contact.phone ? 'opacity-50' : ''}`}>
            <div className="text-left">
              <h4 className="font-bold text-gray-800">{contact.name || `Configure ${contact.role}`}</h4>
              <p className="text-sm text-gray-500">{contact.role}</p>
            </div>
            {contact.phone ? (
              <a href={`tel:${contact.phone}`} className="w-12 h-12 bg-green-500 text-white rounded-full flex items-center justify-center shadow-lg shadow-green-100">
                <i className="fa-solid fa-phone"></i>
              </a>
            ) : (
              <Link to="/setup" className="w-12 h-12 bg-gray-100 text-gray-400 rounded-full flex items-center justify-center">
                <i className="fa-solid fa-plus"></i>
              </Link>
            )}
          </div>
        ))}

        {!hasValidNumbers && (
          <p className="text-xs text-red-500 bg-red-50 p-4 rounded-2xl border border-red-100">
            <i className="fa-solid fa-circle-info mr-2"></i>
            No emergency numbers configured. Please update your profile.
          </p>
        )}
      </div>

      <div className="space-y-4">
        <Link to="/nearby" className="block w-full py-4 bg-gray-800 text-white rounded-2xl font-bold hover:bg-gray-900 transition-all flex items-center justify-center gap-2">
          <i className="fa-solid fa-map-pin"></i>
          Find Nearest Hospital
        </Link>
        <Link to="/" className="block w-full py-4 text-gray-500 font-bold hover:text-gray-700 transition-all">
          Go Back Home
        </Link>
      </div>

      <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100 text-left">
        <p className="text-[10px] text-gray-500 italic">
          <i className="fa-solid fa-circle-exclamation mr-1 text-gray-400"></i>
          Note: Calls are placed only to numbers configured by the mother. Ensure your contacts are up to date.
        </p>
      </div>
    </div>
  );
};

export default Emergency;

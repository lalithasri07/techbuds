
import React, { useState } from 'react';
import { UserProfile } from '../types';
import { useNavigate } from 'react-router-dom';

interface ProfileSetupProps {
  profile: UserProfile;
  setProfile: React.Dispatch<React.SetStateAction<UserProfile>>;
}

const ProfileSetup: React.FC<ProfileSetupProps> = ({ profile, setProfile }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState(profile);
  const [isSaved, setIsSaved] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setProfile(formData);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  return (
    <div className="min-h-screen pt-20 pb-32 px-6 max-w-2xl mx-auto">
      <div className="bg-white rounded-[2.5rem] shadow-xl p-8 border border-pink-50">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-12 h-12 bg-pink-100 rounded-2xl flex items-center justify-center text-pink-600">
            <i className="fa-solid fa-user-gear text-2xl"></i>
          </div>
          <h2 className="text-3xl font-bold text-gray-800">Mother Profile Setup</h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700 ml-1">Mother Name</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-pink-200 transition-all"
                placeholder="Enter your name"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700 ml-1">Due Date</label>
              <input
                type="date"
                required
                value={formData.dueDate}
                onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-pink-200 transition-all"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700 ml-1">Current Week</label>
              <input
                type="number"
                min="1"
                max="42"
                required
                value={formData.currentWeek}
                onChange={(e) => setFormData({ ...formData, currentWeek: parseInt(e.target.value) })}
                className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-pink-200 transition-all"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-700 ml-1">Location (City, India)</label>
              <input
                type="text"
                required
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-pink-200 transition-all"
                placeholder="e.g. Mumbai, Maharashtra"
              />
            </div>
            <div className="space-y-2 md:col-span-2">
              <label className="text-sm font-bold text-gray-700 ml-1">Personal Phone Number</label>
              <input
                type="tel"
                required
                value={formData.personalPhone}
                onChange={(e) => setFormData({ ...formData, personalPhone: e.target.value })}
                className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-pink-200 transition-all"
                placeholder="+91 12345 67890"
              />
            </div>
          </div>

          <div className="pt-6 border-t border-gray-100">
            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <i className="fa-solid fa-phone-flip text-pink-500"></i> Emergency Contacts Setup
            </h3>
            <div className="space-y-4">
              {formData.emergencyContacts.map((contact, index) => (
                <div key={contact.id} className="p-6 bg-pink-50/30 rounded-3xl border border-pink-50 space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold text-pink-600 uppercase tracking-widest">{contact.role}</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="Name"
                      value={contact.name}
                      onChange={(e) => {
                        const newContacts = [...formData.emergencyContacts];
                        newContacts[index].name = e.target.value;
                        setFormData({ ...formData, emergencyContacts: newContacts });
                      }}
                      className="bg-white border border-pink-100 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-pink-200"
                    />
                    <input
                      type="tel"
                      placeholder="Phone Number"
                      value={contact.phone}
                      onChange={(e) => {
                        const newContacts = [...formData.emergencyContacts];
                        newContacts[index].phone = e.target.value;
                        setFormData({ ...formData, emergencyContacts: newContacts });
                      }}
                      className="bg-white border border-pink-100 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-pink-200"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-5 bg-pink-600 text-white rounded-[2rem] font-bold text-lg shadow-xl shadow-pink-200 hover:bg-pink-700 transition-all"
          >
            {isSaved ? 'Profile Updated Successfully!' : 'Save Profile Changes'}
          </button>
          
          <button
            type="button"
            onClick={() => navigate('/')}
            className="w-full py-4 text-gray-400 font-bold text-sm hover:text-gray-600"
          >
            Cancel and Return Home
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProfileSetup;

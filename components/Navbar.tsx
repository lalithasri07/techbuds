
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { UserProfile } from '../types';

interface NavbarProps {
  profile: UserProfile;
}

const Navbar: React.FC<NavbarProps> = ({ profile }) => {
  const location = useLocation();

  const navItems = [
    { path: '/body', label: 'My Body', icon: 'fa-person-breastfeeding' },
    { path: '/mind', label: 'My Mind', icon: 'fa-heart' },
    { path: '/ai', label: 'My AI', icon: 'fa-robot' },
    { path: '/needs', label: 'My Needs', icon: 'fa-basket-shopping' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      {/* Top Navbar for branding */}
      <nav className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md z-50 px-6 py-4 border-b border-pink-100 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full flex items-center justify-center">
            <i className="fa-solid fa-hands-holding-child text-white text-sm"></i>
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent leading-none">MaaSakhi</span>
            {profile.name && <span className="text-[10px] text-gray-500 font-bold uppercase tracking-tighter">Hi, {profile.name}</span>}
          </div>
        </Link>
        <div className="flex gap-4">
          <Link to="/setup" className="hidden sm:flex items-center text-gray-400 hover:text-pink-600 transition-colors">
            <i className="fa-solid fa-circle-user text-xl"></i>
          </Link>
          <Link to="/emergency" className="text-red-500 bg-red-50 px-3 py-1 rounded-full text-sm font-bold flex items-center gap-1 border border-red-100 hover:bg-red-100 transition-colors">
            <i className="fa-solid fa-circle-exclamation"></i>
            SOS
          </Link>
        </div>
      </nav>

      {/* Bottom Navbar for Mobile Experience */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-pink-50 px-4 py-3 z-50 md:hidden flex justify-around items-center">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex flex-col items-center gap-1 ${
              isActive(item.path) ? 'text-pink-600' : 'text-gray-400'
            }`}
          >
            <i className={`fa-solid ${item.icon} text-xl`}></i>
            <span className="text-[10px] font-medium">{item.label}</span>
          </Link>
        ))}
        <Link to="/setup" className={`flex flex-col items-center gap-1 ${isActive('/setup') ? 'text-pink-600' : 'text-gray-400'}`}>
          <i className="fa-solid fa-user-gear text-xl"></i>
          <span className="text-[10px] font-medium">Profile</span>
        </Link>
      </nav>

      {/* Desktop Sidebar / Navbar Alternative */}
      <nav className="hidden md:flex fixed left-0 top-16 bottom-0 w-64 bg-white border-r border-pink-50 p-6 flex-col gap-4">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center gap-3 px-4 py-3 rounded-2xl transition-all ${
              isActive(item.path)
                ? 'bg-pink-50 text-pink-600 font-semibold shadow-sm'
                : 'text-gray-500 hover:bg-gray-50'
            }`}
          >
            <i className={`fa-solid ${item.icon} text-lg w-6`}></i>
            <span>{item.label}</span>
          </Link>
        ))}
        <div className="mt-auto pt-6 border-t border-gray-100">
          <Link to="/nearby" className="flex items-center gap-3 px-4 py-3 text-gray-500 hover:bg-gray-50 rounded-2xl">
            <i className="fa-solid fa-map-location-dot text-lg w-6"></i>
            <span>Nearby Care</span>
          </Link>
          <Link to="/setup" className={`flex items-center gap-3 px-4 py-3 rounded-2xl ${isActive('/setup') ? 'bg-pink-50 text-pink-600' : 'text-gray-500 hover:bg-gray-50'}`}>
            <i className="fa-solid fa-user-gear text-lg w-6"></i>
            <span>Profile Setup</span>
          </Link>
          <Link to="/" className="flex items-center gap-3 px-4 py-3 text-gray-500 hover:bg-gray-50 rounded-2xl">
            <i className="fa-solid fa-house text-lg w-6"></i>
            <span>Home</span>
          </Link>
        </div>
      </nav>
    </>
  );
};

export default Navbar;

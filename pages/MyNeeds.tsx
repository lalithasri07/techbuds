
import React, { useState } from 'react';
// Added missing Link import
import { Link } from 'react-router-dom';
import { UserProfile, Product } from '../types';

interface MyNeedsProps {
  profile: UserProfile;
}

const MyNeeds: React.FC<MyNeedsProps> = ({ profile }) => {
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = ['All', 'Nutrition', 'Hygiene', 'Maternity', 'Medical'];

  const products: Product[] = [
    { id: '1', name: 'Prenatal Multivitamins', category: 'Nutrition', price: '$24.99', image: 'https://images.unsplash.com/photo-1550573105-df2795744ed8?auto=format&fit=crop&q=80&w=400', stage: 'All Trimesters', description: 'Essential nutrients for you and baby.' },
    { id: '2', name: 'Comfort Belly Band', category: 'Maternity', price: '$18.50', image: 'https://images.unsplash.com/photo-1590649839127-c1a5e008d16a?auto=format&fit=crop&q=80&w=400', stage: 'Second Trimester', description: 'Gentle support for your growing bump.' },
    { id: '3', name: 'Stretch Mark Oil', category: 'Hygiene', price: '$35.00', image: 'https://images.unsplash.com/photo-1612817288484-6f916006741a?auto=format&fit=crop&q=80&w=400', stage: 'All Trimesters', description: 'Deep hydration for changing skin.' },
    { id: '4', name: 'Omega-3 Plant Base', category: 'Nutrition', price: '$12.99', image: 'https://images.unsplash.com/photo-1626242854241-3d440aa1644c?auto=format&fit=crop&q=80&w=400', stage: 'Third Trimester', description: 'Brain development support.' },
    { id: '5', name: 'Fetal Doppler', category: 'Medical', price: '$89.00', image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=400', stage: 'Second Trimester', description: 'Bond with baby\'s heartbeat at home.' },
    { id: '6', name: 'Compression Socks', category: 'Maternity', price: '$22.00', image: 'https://images.unsplash.com/photo-1582845512747-e42001c95638?auto=format&fit=crop&q=80&w=400', stage: 'Third Trimester', description: 'Reduce swelling and fatigue.' },
    { id: '7', name: 'Organic Almonds', category: 'Nutrition', price: '$14.00', image: 'https://images.unsplash.com/photo-1508817628294-5a453fa0b8fb?auto=format&fit=crop&q=80&w=400', stage: 'All Trimesters', description: 'Healthy snacking for energy.' },
    { id: '8', name: 'Safe Hand Sanitizer', category: 'Hygiene', price: '$5.00', image: 'https://images.unsplash.com/photo-1584467541268-b040f83be3fd?auto=format&fit=crop&q=80&w=400', stage: 'All Trimesters', description: 'Alcohol-free, gentle protection.' }
  ];

  const filteredProducts = activeCategory === 'All' 
    ? products 
    : products.filter(p => p.category === activeCategory);

  return (
    <div className="min-h-screen pt-20 pb-32 px-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-end mb-8 gap-4">
        <div>
          <h2 className="text-3xl font-bold text-gray-800">My Needs</h2>
          <p className="text-gray-500">Visual recommendations for week {profile.currentWeek}.</p>
        </div>
        <div className="bg-pink-50 p-1 rounded-2xl flex gap-1 overflow-x-auto w-full md:w-auto hide-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-xl text-sm font-bold transition-all whitespace-nowrap ${
                activeCategory === cat 
                  ? 'bg-white text-pink-600 shadow-sm' 
                  : 'text-gray-500 hover:text-pink-400'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {filteredProducts.map((product) => (
          <div key={product.id} className="group bg-white rounded-[2rem] overflow-hidden border border-pink-50 hover:shadow-2xl hover:shadow-pink-100/30 transition-all duration-300 flex flex-col">
            <div className="relative aspect-square overflow-hidden bg-gray-50">
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm px-3 py-1 rounded-full text-[9px] font-black text-pink-600 uppercase shadow-sm tracking-widest">
                {product.category}
              </div>
            </div>
            <div className="p-5 flex-1 flex flex-col gap-2">
              <div className="flex justify-between items-start gap-2">
                <h4 className="font-bold text-gray-800 leading-tight text-base">{product.name}</h4>
                <span className="text-pink-600 font-bold text-sm whitespace-nowrap">{product.price}</span>
              </div>
              <p className="text-xs text-gray-500 line-clamp-2">{product.description}</p>
              <div className="flex items-center gap-1 mt-auto pt-2">
                 <span className="text-[10px] bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full font-bold">
                   <i className="fa-solid fa-clock mr-1"></i> {product.stage}
                 </span>
              </div>
              <div className="flex gap-2 pt-3">
                <button className="flex-1 bg-pink-50 text-pink-600 py-3 rounded-xl font-bold text-xs hover:bg-pink-100 transition-colors">
                  Details
                </button>
                <button className="w-10 h-10 bg-pink-600 text-white rounded-xl flex items-center justify-center hover:bg-pink-700 transition-all shadow-lg shadow-pink-100">
                  <i className="fa-solid fa-cart-plus text-xs"></i>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Bottom info */}
      <div className="mt-12 text-center p-8 glass-card rounded-[2.5rem] border border-pink-100">
        <i className="fa-solid fa-heart-pulse text-pink-400 text-3xl mb-4"></i>
        <h3 className="text-xl font-bold text-gray-800">Need something else, {profile.name || 'Mother'}?</h3>
        <p className="text-gray-500 text-sm max-w-md mx-auto mt-2">Our AI can help you find specific pregnancy-safe products. Try asking in the AI Assistant chat!</p>
        {/* Fixed: Link component used correctly after import */}
        <Link to="/ai" className="mt-6 inline-block bg-pink-600 text-white px-8 py-3 rounded-2xl font-bold shadow-lg shadow-pink-100">
          Ask My AI Assistant
        </Link>
      </div>
    </div>
  );
};

export default MyNeeds;

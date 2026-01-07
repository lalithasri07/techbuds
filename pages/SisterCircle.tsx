
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const SisterCircle: React.FC = () => {
  const [posts, setPosts] = useState([
    { id: 1, user: 'Sarah M.', avatar: 'Sarah', time: '2h ago', content: 'Does anyone else have weird cravings for pickles and peanut butter? 🥒🥜', likes: 12, comments: 4 },
    { id: 2, user: 'Elena K.', avatar: 'Elena', time: '5h ago', content: 'Just had my 20-week scan! Everything looks perfect. So relieved. ❤️', likes: 45, comments: 8 },
    { id: 3, user: 'Priya R.', avatar: 'Priya', time: '1d ago', content: 'Any tips for back pain during the third trimester? It is getting tough to sleep.', likes: 21, comments: 15 },
  ]);

  const [newPost, setNewPost] = useState('');

  const handlePost = () => {
    if (!newPost.trim()) return;
    const post = {
      id: Date.now(),
      user: 'You',
      avatar: 'Me',
      time: 'Just now',
      content: newPost,
      likes: 0,
      comments: 0,
    };
    setPosts([post, ...posts]);
    setNewPost('');
  };

  return (
    <div className="min-h-screen pt-20 pb-32 px-6 max-w-2xl mx-auto">
      <div className="flex items-center gap-4 mb-8">
        <Link to="/mind" className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 hover:bg-gray-200">
           <i className="fa-solid fa-arrow-left"></i>
        </Link>
        <h2 className="text-3xl font-black text-gray-800 tracking-tight">Sister Circle</h2>
      </div>

      <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-gray-100 mb-8">
        <textarea 
          value={newPost}
          onChange={(e) => setNewPost(e.target.value)}
          placeholder="Share your journey with other mothers..."
          className="w-full bg-gray-50 border-none rounded-2xl p-4 text-sm focus:ring-2 focus:ring-indigo-100 min-h-[100px] resize-none outline-none"
        />
        <div className="flex justify-end mt-4">
           <button 
             onClick={handlePost}
             className="bg-indigo-600 text-white px-8 py-2.5 rounded-full font-black text-xs uppercase tracking-widest shadow-lg shadow-indigo-100 active:scale-95 transition-all"
           >
             Post
           </button>
        </div>
      </div>

      <div className="space-y-6">
        {posts.map(post => (
          <div key={post.id} className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center">
                 <i className="fa-solid fa-user text-indigo-500"></i>
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-gray-800 leading-none">{post.user}</h4>
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1">{post.time}</p>
              </div>
            </div>
            <p className="text-gray-700 text-sm leading-relaxed mb-6">{post.content}</p>
            <div className="flex gap-6 border-t border-gray-50 pt-4">
               <button className="flex items-center gap-2 text-xs font-black text-gray-400 hover:text-red-500 transition-colors">
                 <i className="fa-regular fa-heart"></i> {post.likes}
               </button>
               <button className="flex items-center gap-2 text-xs font-black text-gray-400 hover:text-indigo-500 transition-colors">
                 <i className="fa-regular fa-comment"></i> {post.comments}
               </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SisterCircle;


import React, { useState } from 'react';
import { UserProfile, Task } from '../types';

interface MyTasksProps {
  profile: UserProfile;
  setProfile: React.Dispatch<React.SetStateAction<UserProfile>>;
}

const MyTasks: React.FC<MyTasksProps> = ({ profile, setProfile }) => {
  const [filter, setFilter] = useState<1 | 2 | 3>(1);
  const [newTask, setNewTask] = useState('');

  const toggleTask = (taskId: string) => {
    const updatedTasks = profile.tasks.map(t => 
      t.id === taskId ? { ...t, completed: !t.completed } : t
    );
    setProfile({ ...profile, tasks: updatedTasks });
  };

  const addTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTask.trim()) return;
    const task: Task = {
      id: Date.now().toString(),
      title: newTask,
      completed: false,
      trimester: filter
    };
    setProfile({ ...profile, tasks: [...profile.tasks, task] });
    setNewTask('');
  };

  const filteredTasks = profile.tasks.filter(t => t.trimester === filter);
  const progress = Math.round((filteredTasks.filter(t => t.completed).length / (filteredTasks.length || 1)) * 100);

  return (
    <div className="min-h-screen pt-20 pb-32 px-6 max-w-2xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900">My Tasks</h2>
        <div className="text-right">
          <span className="text-sm font-bold text-blue-600">{progress}% Done</span>
        </div>
      </div>

      <div className="flex gap-2 mb-8 overflow-x-auto pb-2 hide-scrollbar">
        {[1, 2, 3].map(t => (
          <button
            key={t}
            onClick={() => setFilter(t as 1|2|3)}
            className={`px-6 py-2 rounded-full whitespace-nowrap font-bold text-sm transition-all ${
              filter === t ? 'bg-blue-600 text-white shadow-lg' : 'bg-blue-50 text-blue-600'
            }`}
          >
            Trimester {t}
          </button>
        ))}
      </div>

      <form onSubmit={addTask} className="mb-8 relative">
        <input 
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Add a custom task..."
          className="w-full bg-white border border-gray-100 rounded-2xl px-6 py-4 pr-16 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-100"
        />
        <button type="submit" className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-blue-600 text-white rounded-xl">
           <i className="fa-solid fa-plus"></i>
        </button>
      </form>

      <div className="space-y-4">
        {filteredTasks.map(task => (
          <div 
            key={task.id}
            onClick={() => toggleTask(task.id)}
            className={`p-6 rounded-3xl border transition-all cursor-pointer flex items-center gap-4 ${
              task.completed ? 'bg-gray-50 border-transparent opacity-60' : 'bg-white border-gray-50 shadow-sm'
            }`}
          >
            <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
              task.completed ? 'bg-green-500 border-green-500 text-white' : 'border-gray-200'
            }`}>
              {task.completed && <i className="fa-solid fa-check text-[10px]"></i>}
            </div>
            <span className={`flex-1 font-bold ${task.completed ? 'line-through text-gray-400' : 'text-gray-800'}`}>
              {task.title}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyTasks;

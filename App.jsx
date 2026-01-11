// src/App.jsx
import React, { useState, useEffect } from 'react';
import { protocolData } from './data';
import { CheckCircle, Circle, ChevronLeft, ChevronRight, Droplet } from 'lucide-react'; // Make sure to install lucide-react if needed, or remove icons

// Simple Card Component
const Card = ({ children, className = "" }) => (
  <div className={`bg-white rounded-2xl shadow-sm p-5 mb-4 ${className}`}>
    {children}
  </div>
);

export default function App() {
  const [currentDay, setCurrentDay] = useState(1);
  const [rations, setRations] = useState(protocolData.userSettings.dailyRations);
  const [morningTasks, setMorningTasks] = useState(protocolData.userSettings.morningRoutine);

  // Get the specific menu for the selected day
  // If day 4-10 are missing in data.js, it falls back to Day 1 to prevent crashing
  const dayData = protocolData.days.find(d => d.dayId === currentDay) || protocolData.days[0];
  const menu = dayData.meals;

  const toggleTask = (id) => {
    setMorningTasks(tasks => tasks.map(t => 
      t.id === id ? { ...t, completed: !t.completed } : t
    ));
  };

  const decrementRation = (type) => {
    setRations(prev => {
      const current = prev[type].total;
      if (current <= 0) return prev;
      return {
        ...prev,
        [type]: { ...prev[type], total: current - 1 }
      };
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 font-sans text-slate-800 max-w-md mx-auto">
      
      {/* HEADER */}
      <header className="flex justify-between items-center mb-6 mt-2">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Maria's Protocol</h1>
          <p className="text-slate-500 text-sm">Healing & Nutrition</p>
        </div>
        <div className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm font-bold">
          Day {currentDay}
        </div>
      </header>

      {/* 1. SUPPLEMENTS */}
      <Card>
        <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Morning Routine</h2>
        <div className="space-y-3">
          {morningTasks.map(task => (
            <div 
              key={task.id} 
              onClick={() => toggleTask(task.id)}
              className="flex items-center cursor-pointer p-2 hover:bg-slate-50 rounded-lg transition"
            >
              {task.completed ? 
                <CheckCircle className="text-green-500 w-6 h-6 mr-3" /> : 
                <Circle className="text-slate-300 w-6 h-6 mr-3" />
              }
              <div>
                <p className={`font-medium ${task.completed ? 'text-slate-400 line-through' : 'text-slate-700'}`}>
                  {task.task}
                </p>
                <p className="text-xs text-slate-400">{task.time}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* 2. RATION BANK */}
      <Card>
        <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Daily Rations Left</h2>
        <div className="grid grid-cols-2 gap-3">
          {Object.entries(rations).map(([key, data]) => (
            <button 
              key={key}
              onClick={() => decrementRation(key)}
              className={`${data.color} p-3 rounded-xl flex flex-col items-center justify-center transition active:scale-95`}
            >
              <span className="text-2xl font-bold">{data.total}</span>
              <span className="text-xs uppercase font-medium">{key}</span>
            </button>
          ))}
        </div>
        <p className="text-center text-xs text-slate-400 mt-3">Tap to use a ration</p>
      </Card>

      {/* 3. MEAL PLAN */}
      <Card className="pb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold text-slate-800">Today's Menu</h2>
          <div className="flex space-x-2">
            <button 
              onClick={() => setCurrentDay(d => d > 1 ? d - 1 : 10)}
              className="p-1 bg-slate-100 rounded hover:bg-slate-200"
            >
              <ChevronLeft size={20} />
            </button>
            <button 
              onClick={() => setCurrentDay(d => d < 10 ? d + 1 : 1)}
              className="p-1 bg-slate-100 rounded hover:bg-slate-200"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* Breakfast */}
        <div className="mb-6">
          <h3 className="text-sm font-bold text-orange-500 uppercase mb-2">Breakfast</h3>
          <div className="bg-orange-50 p-3 rounded-lg border border-orange-100">
            <p className="font-medium text-slate-800">{menu?.breakfast?.protein}</p>
            <p className="text-sm text-slate-600">+ {menu?.breakfast?.carb}</p>
            <p className="text-sm text-slate-600">+ {menu?.breakfast?.fat}</p>
            <div className="mt-2 pt-2 border-t border-orange-200 flex items-center text-xs text-orange-700">
              <Droplet size={12} className="mr-1"/> {menu?.breakfast?.drink}
            </div>
          </div>
        </div>

        {/* Lunch */}
        <div className="mb-6">
          <h3 className="text-sm font-bold text-green-600 uppercase mb-2">Lunch</h3>
          <div className="bg-green-50 p-3 rounded-lg border border-green-100">
            <p className="font-medium text-slate-800">{menu?.lunch?.protein}</p>
            <p className="text-sm text-slate-600">+ {menu?.lunch?.carb}</p>
            <p className="text-sm text-slate-600">+ {menu?.lunch?.veggie}</p>
          </div>
        </div>

        {/* Dinner */}
        <div>
          <h3 className="text-sm font-bold text-blue-600 uppercase mb-2">Dinner</h3>
          <div className="bg-blue-50 p-3 rounded-lg border border-blue-100">
            <p className="font-medium text-slate-800">{menu?.dinner?.protein}</p>
            <p className="text-sm text-slate-600">+ {menu?.dinner?.carb}</p>
            <p className="text-sm text-slate-600">+ {menu?.dinner?.veggie}</p>
          </div>
        </div>

      </Card>
    </div>
  );
}

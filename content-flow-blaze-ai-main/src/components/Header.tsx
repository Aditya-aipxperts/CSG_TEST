
import React from 'react';
import { Sparkles } from 'lucide-react';

export const Header = () => {
  return (
    <header className="bg-white/90 backdrop-blur-xl border-b border-purple-200/60 sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-6 py-5 max-w-7xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 via-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg shadow-purple-500/25">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                ContentFlow
              </h1>
              <p className="text-xs text-slate-600 font-medium">AI Content Strategy</p>
            </div>
          </div>
          <div className="flex items-center space-x-6">
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#" className="text-slate-700 hover:text-purple-600 font-medium transition-colors">Features</a>
              <a href="#" className="text-slate-700 hover:text-purple-600 font-medium transition-colors">Pricing</a>
              <a href="#" className="text-slate-700 hover:text-purple-600 font-medium transition-colors">Help</a>
            </nav>
            <div className="flex items-center space-x-3">
              <div className="px-4 py-2 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-xl text-sm font-semibold shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 transition-all duration-200">
                ✓ Connected
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

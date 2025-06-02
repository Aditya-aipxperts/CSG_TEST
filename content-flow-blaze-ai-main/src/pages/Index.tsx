
import React from 'react';
import { StrategyGenerator } from '@/components/StrategyGenerator';
import { ContentCalendar } from '@/components/ContentCalendar';
import { Header } from '@/components/Header';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
      <Header />
      <main className="container mx-auto px-6 py-12 max-w-7xl">
        <div className="space-y-20">
          <div className="text-center space-y-8 mb-16">
            <h1 className="text-6xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent leading-tight">
              AI-Powered Content Strategy
            </h1>
            <p className="text-xl text-slate-700 max-w-3xl mx-auto leading-relaxed font-medium">
              Generate, schedule, and automate your social media content with intelligent AI that understands your brand voice and drives engagement.
            </p>
            <div className="flex items-center justify-center space-x-8 pt-4">
              <div className="flex items-center space-x-2 text-emerald-600">
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-semibold">AI-Powered</span>
              </div>
              <div className="flex items-center space-x-2 text-blue-600">
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-semibold">Auto-Scheduling</span>
              </div>
              <div className="flex items-center space-x-2 text-purple-600">
                <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-semibold">Multi-Platform</span>
              </div>
            </div>
          </div>
          <StrategyGenerator />
          <ContentCalendar />
        </div>
      </main>
    </div>
  );
};

export default Index;

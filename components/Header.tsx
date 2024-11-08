import React from 'react';
import { PartyPopper, Menu, Search } from 'lucide-react';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2">
            <PartyPopper className="h-8 w-8 text-red-500 animate-bounce" />
            <h1 className="text-xl font-bold text-gray-900">Ironic JD</h1>
          </div>
          
          
          </div>

          <button className="p-2 rounded-lg hover:bg-gray-100">
            <Menu className="h-6 w-6 text-gray-600" />
          </button>
        </div>
      </div>
    </header>
  );
}
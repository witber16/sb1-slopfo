import React from 'react';
import { Link } from 'react-router-dom';
import { PartyPopper } from 'lucide-react';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <PartyPopper className="h-8 w-8 text-red-500 animate-bounce" />
            <h1 className="text-xl font-bold text-gray-900">Ironic JD</h1>
          </Link>
          
          <nav className="flex items-center space-x-4">
            <Link 
              to="/about"
              className="text-gray-600 hover:text-red-500 transition-colors duration-200 font-semibold"
            >
              About
            </Link>
            <Link 
              to="/disclaimer"
              className="text-gray-600 hover:text-red-500 transition-colors duration-200 font-semibold"
            >
              Disclaimer
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
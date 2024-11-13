import React from 'react';
import { Link } from 'react-router-dom';
import { LogOut, User } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

const LOGO_URL = "https://firebasestorage.googleapis.com/v0/b/ironic-jd.firebasestorage.app/o/assets%2FFullLogo_Transparent_NoBuffer.png?alt=media&token=77bb0b29-b0e0-4e06-815a-85a7310f7f45";

export default function Header() {
  const { user, signOut } = useAuth();

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-primary-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <img 
              src={LOGO_URL}
              alt="Ironic JD" 
              className="h-8 w-auto"
            />
          </Link>
          
          <nav className="flex items-center space-x-4">
            <Link 
              to="/about"
              className="text-secondary-600 hover:text-primary-500 transition-colors duration-200 font-medium"
            >
              About
            </Link>
            <Link 
              to="/disclaimer"
              className="text-secondary-600 hover:text-primary-500 transition-colors duration-200 font-medium"
            >
              Disclaimer
            </Link>

            {user ? (
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2 text-secondary-600">
                  <User className="h-4 w-4" />
                  <span className="font-medium">{user.displayName}</span>
                </div>
                <button
                  onClick={() => signOut()}
                  className="text-secondary-600 hover:text-primary-500 transition-colors duration-200"
                  title="Sign out"
                >
                  <LogOut className="h-5 w-5" />
                </button>
              </div>
            ) : (
              <>
                <Link 
                  to="/sign-in"
                  className="text-secondary-600 hover:text-primary-500 transition-colors duration-200 font-medium"
                >
                  Sign In
                </Link>
                <Link 
                  to="/sign-up"
                  className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors duration-200 font-medium"
                >
                  Sign Up
                </Link>
              </>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}

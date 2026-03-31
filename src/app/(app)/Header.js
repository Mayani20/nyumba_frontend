"use client";
import React, { useState, useEffect } from 'react';
import LoginLinks from '../LoginLinks'
import { Home, Menu, X } from 'lucide-react';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Define the navigation items with text labels
  const navItems = [
    {
      label: 'About',
      href: '/about',
    },
    {
      label: 'Contact',
      href: '/contact',
    },
    {
      label: 'Help',
      href: '/help',
    },
    {
      label: 'Blog',
      href: '/blog',
    }
  ];

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Navigation handler
  const handleNavigation = (href) => {
    console.log('Navigating to:', href);
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-[9999] w-full transition-all duration-500 ${
        isScrolled
          ? 'bg-gray-100 backdrop-blur-xl shadow-lg border-b border-gray-200/20'
          : 'bg-gradient-to-r from-white/95 to-gray-50/95 backdrop-blur-md shadow-sm'
      }`}>
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="flex justify-between items-center py-2 md:py-4">
            {/* Logo Section */}
            <div className="flex items-center space-x-3 group cursor-pointer">
              <div className="relative">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-2xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg">
                  <Home className="w-5 h-5 md:w-6 md:h-6 text-white" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-2xl opacity-0 group-hover:opacity-30 blur-xl transition-all duration-300" />
              </div>
              <div className="flex flex-col">
                <h2 className="text-lg md:text-2xl font-bold bg-gradient-to-r from-gray-900 via-cyan-600 to-blue-500 bg-clip-text text-transparent group-hover:from-blue-600 group-hover:to-purple-600 transition-all duration-300">
                  Nyumba Hub
                </h2>
                <span className="text-xs text-gray-500 font-medium hidden md:block">Your Home Search Starts Here.</span>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {/* Navigation Items as Text Links */}
              <div className="flex items-center space-x-8">
                {navItems.map((item) => (
                  <button
                    key={item.label}
                    onClick={() => handleNavigation(item.href)}
                    className="text-gray-700 hover:text-blue-600 font-medium text-sm transition-colors duration-300 relative group"
                  >
                    {item.label}
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300"></span>
                  </button>
                ))}
              </div>

              {/* Login Links with gradient text */}
              <div className="bg-gradient-to-r from-white/80 to-gray-50/80 backdrop-blur-sm rounded-2xl px-6 py-2 shadow-lg border border-gray-200/50 hover:shadow-xl transition-all duration-300 group">
                <LoginLinks />
              </div>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden relative p-3 rounded-xl bg-white/80 backdrop-blur-sm shadow-lg border border-gray-200/50 hover:shadow-xl transition-all duration-300 group"
            >
              <div className="relative w-5 h-5">
                <Menu className={`absolute inset-0 w-5 h-5 text-gray-700 transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0 rotate-180' : 'opacity-100 rotate-0'}`} />
                <X className={`absolute inset-0 w-5 h-5 text-gray-700 transition-all duration-300 ${isMobileMenuOpen ? 'opacity-100 rotate-0' : 'opacity-0 -rotate-180'}`} />
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        <div className={`md:hidden fixed inset-x-0 top-full transition-all duration-500 ${
          isMobileMenuOpen
            ? 'opacity-100 translate-y-0 pointer-events-auto'
            : 'opacity-0 -translate-y-4 pointer-events-none'
        }`}>
          <div className="mx-4 mt-2 bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-gray-200/50 overflow-hidden">
            <div className="p-6">
              {/* Navigation Items as Text Buttons */}
              <div className="space-y-3 mb-8">
                {navItems.map((item) => (
                  <button
                    key={item.label}
                    onClick={() => handleNavigation(item.href)}
                    className="w-full text-left px-4 py-3 rounded-xl bg-gray-50/80 hover:bg-white transition-all duration-300 text-gray-700 hover:text-blue-600 font-medium"
                  >
                    {item.label}
                  </button>
                ))}
              </div>

              {/* Login Section */}
              <div className="text-center">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Welcome to Nyumba App</h3>
                <div className="bg-gradient-to-r from-white/80 to-gray-50/80 backdrop-blur-sm rounded-2xl px-6 py-2 shadow-lg border border-gray-200/50 hover:shadow-xl transition-all duration-300">
                  <LoginLinks />
                </div>
              </div>
            </div>

            {/* Decorative gradient bar */}
            <div className="h-1 bg-gradient-to-r from-blue-500 to-cyan-600" />
          </div>
        </div>
      </header>

      {/* Mobile Menu Backdrop */}
      {isMobileMenuOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/20 backdrop-blur-sm z-[5999] transition-opacity duration-300"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </>
  );
};

export default Header;

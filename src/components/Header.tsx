import React, { useState, useEffect } from 'react';
import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import algotLogo from '@/assets/algot-logo.png';

interface HeaderProps {
  onMenuClick: () => void;
  isScrolled: boolean;
}

const Header: React.FC<HeaderProps> = ({ onMenuClick, isScrolled }) => {
  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'transform -translate-y-full' : 'transform translate-y-0'
      }`}
    >
      <div className="bg-white/10 backdrop-blur-md shadow-elegant">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-start justify-between">
            {/* Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={onMenuClick}
              className="text-gray-800 hover:bg-gray-200/50 p-2"
            >
              <Menu className="h-6 w-6" />
            </Button>
            
            {/* Logo and Institute Name - Center */}
            <div className="flex flex-col items-center flex-1">
              <div className="w-16 h-16 rounded-full bg-white/60 backdrop-blur-sm flex items-center justify-center shadow-glow mb-2 overflow-hidden">
                <img 
                  src={algotLogo} 
                  alt="Algot Academy Logo" 
                  className="w-12 h-12 object-contain"
                />
              </div>
              <h1 className="text-xl font-bold text-gradient text-center leading-tight">
                Algot Academy
              </h1>
            </div>
            
            {/* Spacer for balance */}
            <div className="w-10"></div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
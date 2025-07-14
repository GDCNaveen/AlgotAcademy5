import React from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  activeTab: string;
  onTabChange: (tab: string) => void;
  onLogout: () => void;
}

const chapters = [
  { name: 'Chapter-1 Real Numbers', emoji: '🔢' },
  { name: 'Chapter-2 Sets', emoji: '🎯' }, 
  { name: 'Chapter-3 Polynomials', emoji: '📈' },
  { name: 'Chapter-4 Pair of Linear Equations in Two Variables', emoji: '⚖️' },
  { name: 'Chapter-5 Quadratic Equations', emoji: '📊' },
  { name: 'Chapter-6 Progressions', emoji: '🔄' },
  { name: 'Chapter-7 Coordinate Geometry', emoji: '📐' },
  { name: 'Chapter-8 Similar Triangles', emoji: '🔺' },
  { name: 'Chapter-9 Tangents and Secants to a Circle', emoji: '⭕' },
  { name: 'Chapter-10 Mensuration', emoji: '📏' },
  { name: 'Chapter-11 Trigonometry', emoji: '📐' },
  { name: 'Chapter-12 Applications of Trigonometry', emoji: '🌍' },
  { name: 'Chapter-13 Probability', emoji: '🎲' },
  { name: 'Chapter-14 Statistics', emoji: '📊' }
];

const Sidebar: React.FC<SidebarProps> = ({ 
  isOpen, 
  onClose, 
  activeTab, 
  onTabChange, 
  onLogout 
}) => {
  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <div className={`
        fixed top-0 left-0 h-full w-80 bg-white shadow-elegant z-50 transform transition-transform duration-300
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="flex items-center justify-between p-4 border-b gradient-header">
          <h2 className="text-lg font-semibold text-white">Menu</h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="text-white hover:bg-white/20"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>
        
        <ScrollArea className="h-[calc(100vh-80px)]">
          <div className="p-2">
            {/* Chapters */}
            {chapters.map((chapter) => (
              <Button
                key={chapter.name}
                variant={activeTab === chapter.name ? "default" : "ghost"}
                className={`w-full justify-start mb-1 text-left h-auto p-3 whitespace-normal ${
                  activeTab === chapter.name 
                    ? 'gradient-primary text-white' 
                    : 'hover:bg-primary/10'
                }`}
                onClick={() => {
                  onTabChange(chapter.name);
                  onClose();
                }}
              >
                <span className="text-lg mr-2">{chapter.emoji}</span>
                <span className="text-sm leading-relaxed break-words">{chapter.name}</span>
              </Button>
            ))}
            
            {/* Downloads */}
            <Button
              variant={activeTab === 'Downloads' ? "default" : "ghost"}
              className={`w-full justify-start mb-1 text-left h-auto p-3 ${
                activeTab === 'Downloads' 
                  ? 'gradient-primary text-white' 
                  : 'hover:bg-primary/10'
              }`}
              onClick={() => {
                onTabChange('Downloads');
                onClose();
              }}
              >
                <span className="text-lg mr-2">📥</span>
                Downloads
            </Button>
            
            {/* Contact */}
            <Button
              variant={activeTab === 'Contact' ? "default" : "ghost"}
              className={`w-full justify-start mb-1 text-left h-auto p-3 ${
                activeTab === 'Contact' 
                  ? 'gradient-primary text-white' 
                  : 'hover:bg-primary/10'
              }`}
              onClick={() => {
                onTabChange('Contact');
                onClose();
              }}
              >
                <span className="text-lg mr-2">📞</span>
                Contact
            </Button>
            
            {/* Logout */}
            <div className="border-t mt-4 pt-4">
              <Button
                variant="destructive"
                className="w-full justify-start"
                onClick={onLogout}
              >
                <span className="text-lg mr-2">🚪</span>
                Logout
              </Button>
            </div>
          </div>
        </ScrollArea>
      </div>
    </>
  );
};

export default Sidebar;
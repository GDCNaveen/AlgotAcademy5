import React, { useState, useEffect } from 'react';
import LoginPage from '@/components/LoginPage';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import MainContent from '@/components/MainContent';
import Footer from '@/components/Footer';
import { useToast } from '@/hooks/use-toast';

const Index = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState(() => {
    // Restore active tab from localStorage on refresh
    return localStorage.getItem('algot_active_tab') || 'Chapter-1 Real Numbers';
  });
  const [isScrolled, setIsScrolled] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const { toast } = useToast();

  // Check for existing login and expiry
  useEffect(() => {
    const checkLoginStatus = () => {
      const isLogged = localStorage.getItem('algot_logged_in') === 'true';
      const expiryDate = new Date('2025-12-31T08:00:00');
      const now = new Date();

      if (now >= expiryDate) {
        // Expired - logout
        localStorage.removeItem('algot_logged_in');
        localStorage.removeItem('algot_login_time');
        setIsLoggedIn(false);
        toast({
          title: "Session Expired",
          description: "Your session has expired. Please login again.",
          variant: "destructive"
        });
        return;
      }

      setIsLoggedIn(isLogged);
    };

    checkLoginStatus();
    
    // Check expiry every minute
    const interval = setInterval(checkLoginStatus, 60000);
    
    return () => clearInterval(interval);
  }, [toast]);

  // Handle scroll behavior for header
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('algot_logged_in');
    localStorage.removeItem('algot_login_time');
    setIsLoggedIn(false);
    setIsSidebarOpen(false);
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out."
    });
  };

  const handleMenuClick = () => {
    setIsSidebarOpen(true);
  };

  const handleSidebarClose = () => {
    setIsSidebarOpen(false);
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    // Persist active tab to localStorage
    localStorage.setItem('algot_active_tab', tab);
  };

  if (!isLoggedIn) {
    return <LoginPage onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen gradient-main-bg">
      <Header onMenuClick={handleMenuClick} isScrolled={isScrolled} />
      
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={handleSidebarClose}
        activeTab={activeTab}
        onTabChange={handleTabChange}
        onLogout={handleLogout}
      />
      
      <MainContent activeTab={activeTab} />
      
      <Footer />
    </div>
  );
};

export default Index;

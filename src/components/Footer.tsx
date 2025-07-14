import React from 'react';
// Using the uploaded image URL directly
const naveenPhoto = '/lovable-uploads/22a68d6b-ce14-47f5-a50f-17337879a300.png';

const Footer: React.FC = () => {
  return (
    <footer className="bg-black text-white mt-12">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Educators Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {/* Naveen */}
          <div className="flex items-start space-x-4">
            <div className="w-16 h-16 rounded-full gradient-primary flex items-center justify-center flex-shrink-0 overflow-hidden">
              <img 
                src={naveenPhoto} 
                alt="Naveen" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-semibold">Naveen</h3>
              <p className="text-gray-300">Educator</p>
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <span className="text-lg">📞</span>
                  <span className="text-sm">9494719306</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-lg">📧</span>
                  <span className="text-sm">algotnaveen@gmail.com</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-lg">🌐</span>
                  <span className="text-sm">www.algotnaveen.com</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* O. Srinivas */}
          <div className="flex items-start space-x-4">
            <div className="w-16 h-16 rounded-full gradient-secondary flex items-center justify-center flex-shrink-0">
              <span className="text-2xl">👨‍🏫</span>
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-semibold">O. Srinivas</h3>
              <p className="text-gray-300">Educator</p>
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <span className="text-lg">📞</span>
                  <span className="text-sm">9948954811</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-lg">📧</span>
                  <span className="text-sm">gdcmorthad@gmail.com</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-lg">🌐</span>
                  <span className="text-sm">www.gdcmorthad.edu</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Copyright Section */}
        <div className="border-t border-gray-800 pt-6 mb-6">
          <p className="text-sm text-gray-400 text-justify leading-relaxed">
            © 2024 Algot Academy. All rights reserved. This educational platform is designed to provide comprehensive learning materials for mathematics students. No part of this content may be reproduced, distributed, or transmitted in any form or by any means without the prior written permission of the institution.
          </p>
        </div>
        
        {/* Quotation Section */}
        <div className="border-t border-gray-800 pt-6">
          <blockquote className="text-center">
            <p className="text-lg italic text-gray-300 mb-4 text-justify leading-relaxed">
              "Education is the most powerful weapon which you can use to change the world. At Algot Academy, we believe that every student has the potential to excel in mathematics when provided with the right guidance, resources, and support. Our mission is to make learning accessible, engaging, and transformative for every learner."
            </p>
            <footer className="text-gray-400">
              <cite>— Algot Academy Philosophy</cite>
            </footer>
          </blockquote>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
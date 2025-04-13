import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { scrollY } = useScroll();
  
  // Transform scroll position to opacity value (1 at top, 0.8 when scrolled)
  const opacity = useTransform(scrollY, [0, 100], [1, 0.8]);
  
  // Transform scroll position to background blur value
  const blur = useTransform(scrollY, [0, 100], [0, 5]);
  
  // Transform scroll position to background color (transparent to slightly visible)
  const backgroundColor = useTransform(
    scrollY, 
    [0, 100], 
    ['rgba(17, 24, 39, 0)', 'rgba(17, 24, 39, 0.7)']
  );

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isOpen && !event.target.closest('.navbar-container')) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  // Function to scroll to a section
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80, // Offset for navbar height
        behavior: 'smooth'
      });
    }
    setIsOpen(false); // Close mobile menu after clicking
  };

  return (
    <motion.nav 
      className="fixed w-full z-50 navbar-container"
      style={{ 
        opacity,
        backdropFilter: `blur(${blur}px)`,
        backgroundColor
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <img 
                src="/images/logo.png" 
                alt="OneThrive Logo" 
                className="h-12 w-auto"
              />
            </Link>
          </div>
          
          {/* Desktop menu */}
          <div className="hidden md:flex md:items-center md:space-x-8">
            <motion.button
              onClick={() => scrollToSection('hero')}
              className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Home
            </motion.button>
            <motion.button
              onClick={() => scrollToSection('about')}
              className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              About Us
            </motion.button>
            <motion.button
              onClick={() => scrollToSection('contact')}
              className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Contact
            </motion.button>
            <Link 
              to="/contact" 
              className="bg-[#22C55E] text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-[#1a9e4a] transition-colors duration-300"
            >
              Get Started
            </Link>
          </div>
          
          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {!isOpen ? (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <motion.div 
          className="md:hidden"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-gray-800 bg-opacity-95 rounded-b-lg shadow-lg">
            <motion.button
              onClick={() => scrollToSection('hero')}
              className="text-white block px-3 py-2 rounded-md text-base font-medium"
              whileTap={{ scale: 0.95 }}
            >
              Home
            </motion.button>
            <motion.button
              onClick={() => scrollToSection('about')}
              className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
              whileTap={{ scale: 0.95 }}
            >
              About Us
            </motion.button>
            <motion.button
              onClick={() => scrollToSection('contact')}
              className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
              whileTap={{ scale: 0.95 }}
            >
              Contact
            </motion.button>
            <Link 
              to="/contact" 
              className="bg-[#22C55E] text-white block px-3 py-2 rounded-md text-base font-medium hover:bg-[#1a9e4a] transition-colors duration-300"
            >
              Get Started
            </Link>
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
};

export default Navbar; 
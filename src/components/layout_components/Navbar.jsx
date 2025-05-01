import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation, Link } from 'react-router-dom';
import { ChevronDown, ChevronUp } from 'lucide-react';

// Updated Color Scheme
const COLORS = {
  primary: "#38a169",       // Vibrant green
  primaryDark: "#2f855a",   // Darker green
  primaryLight: "#9ae6b4",  // Light green
  secondary: "#f6e05e",     // Yellow
  secondaryDark: "#ecc94b", // Darker yellow
  accent: "#2d3748",        // Dark gray/black
  text: "#f7fafc",          // Very light gray/white
  background: "#ffffff",    // White
  hover: "#2f855a",         // Dark green for hover
  border: "#e2e8f0"         // Light gray
};

const routes = [
  { label: 'Home', path: '/' },
  { label: 'About', path: '/about' },
  { 
    label: 'Registration', 
    path: '',
    subItems: [
      { label: "Worker Registration", path: "/worker-registration" },
      { label: "Apply for Jobs Now", path: "/apply-jobs-now" },
      { label: "Agent Registration", path: "/agent-registration" },
    ]
  },
  { label: 'Contact', path: '/contact' },
  // { label: 'Demand Submission', path: '/demand-submission' },
  { label: 'Training', path: '/training' },
  { label: 'Gallery', path: '/gallery' },
];

const Navbar = () => {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const [logo, setLogo] = useState('');
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchLogo = async () => {
      try {
        const response = await fetch(`${apiUrl}/layout/navbar/`);
        if (!response.ok) throw new Error('Failed to fetch logo');
        const data = await response.json();
        setLogo(data.logo);
      } catch (error) {
        console.error("Error loading navbar logo:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLogo();

    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleDropdown = (index) => {
    setActiveDropdown(activeDropdown === index ? null : index);
  };

  const closeAllDropdowns = () => {
    setActiveDropdown(null);
    setMobileMenuOpen(false);
  };

  if (loading) {
    return (
      <motion.nav
        className="fixed w-full z-50 py-2"
        style={{ backgroundColor: COLORS.accent }}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="container mx-auto px-4 h-16"></div>
      </motion.nav>
    );
  }

  return (
    <motion.nav
      className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'py-1 shadow-lg' : 'py-2'}`}
      style={{
        backgroundColor: COLORS.accent,
        boxShadow: scrolled ? `0 2px 15px rgba(0,0,0,0.1)` : 'none'
      }}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center" onClick={closeAllDropdowns}>
            <img 
              src={logo} 
              alt="Company Logo" 
              className="h-16 object-contain"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {routes.map((route, index) => (
              <div key={index} className="relative">
                {route.subItems ? (
                  <>
                    <button
                      onClick={() => toggleDropdown(index)}
                      className={`px-4 py-2 rounded-md font-medium flex items-center transition-all ${
                        location.pathname.startsWith(route.path) && route.path !== ''
                          ? `text-white bg-[${COLORS.primary}]`
                          : `text-${COLORS.text} hover:text-white hover:bg-[${COLORS.primary}]`
                      }`}
                    >
                      {route.label}
                      {activeDropdown === index ? (
                        <ChevronUp className="ml-1 w-4 h-4" />
                      ) : (
                        <ChevronDown className="ml-1 w-4 h-4" />
                      )}
                    </button>

                    <AnimatePresence>
                      {activeDropdown === index && (
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 20 }}
                          transition={{ duration: 0.2 }}
                          className="absolute top-full left-0 mt-1 w-56 rounded-lg shadow-lg z-50"
                          style={{ 
                            backgroundColor: COLORS.accent,
                            border: `1px solid ${COLORS.primaryLight}`
                          }}
                        >
                          <div className="py-1">
                            {route.subItems.map((subItem, subIndex) => (
                              <Link
                                key={subIndex}
                                to={subItem.path}
                                onClick={closeAllDropdowns}
                                className={`block px-4 py-2 text-sm transition-all ${
                                  location.pathname === subItem.path
                                    ? `text-white bg-[${COLORS.primary}]`
                                    : `text-${COLORS.text} hover:text-white hover:bg-[${COLORS.primary}]`
                                }`}
                              >
                                {subItem.label}
                              </Link>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </>
                ) : (
                  <Link
                    to={route.path}
                    className={`px-4 py-2 rounded-md font-medium transition-all ${
                      location.pathname === route.path
                        ? `text-white bg-[${COLORS.primary}]`
                        : `text-${COLORS.text} hover:text-white hover:bg-[${COLORS.primary}]`
                    }`}
                    onClick={closeAllDropdowns}
                  >
                    {route.label}
                  </Link>
                )}
              </div>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-lg focus:outline-none"
            style={{ color: COLORS.text }}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {mobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden mt-2 rounded-lg overflow-hidden"
              style={{ 
                backgroundColor: COLORS.accent,
                border: `1px solid ${COLORS.primaryLight}`
              }}
            >
              <div className="px-2 pt-2 pb-4 space-y-1">
                {routes.map((route, index) => (
                  <div key={index}>
                    {route.subItems ? (
                      <>
                        <button
                          onClick={() => toggleDropdown(index)}
                          className={`w-full flex justify-between items-center px-4 py-3 rounded-md font-medium ${
                            location.pathname.startsWith(route.path) && route.path !== ''
                              ? `text-white bg-[${COLORS.primary}]`
                              : `text-${COLORS.text} hover:text-white hover:bg-[${COLORS.primary}]`
                          }`}
                        >
                          {route.label}
                          {activeDropdown === index ? (
                            <ChevronUp className="w-4 h-4" />
                          ) : (
                            <ChevronDown className="w-4 h-4" />
                          )}
                        </button>

                        {activeDropdown === index && (
                          <div className="pl-6 py-1 space-y-1">
                            {route.subItems.map((subItem, subIndex) => (
                              <Link
                                key={subIndex}
                                to={subItem.path}
                                onClick={closeAllDropdowns}
                                className={`block px-4 py-2 rounded-md text-sm ${
                                  location.pathname === subItem.path
                                    ? `text-white bg-[${COLORS.primary}]`
                                    : `text-${COLORS.text} hover:text-white hover:bg-[${COLORS.primary}]`
                                }`}
                              >
                                {subItem.label}
                              </Link>
                            ))}
                          </div>
                        )}
                      </>
                    ) : (
                      <Link
                        to={route.path}
                        onClick={closeAllDropdowns}
                        className={`block px-4 py-3 rounded-md font-medium ${
                          location.pathname === route.path
                            ? `text-white bg-[${COLORS.primary}]`
                            : `text-${COLORS.text} hover:text-white hover:bg-[${COLORS.primary}]`
                        }`}
                      >
                        {route.label}
                      </Link>
                    )}
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

export default Navbar;
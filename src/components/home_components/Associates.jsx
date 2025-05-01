import React, { useState, useEffect, useRef } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';
import { Divider } from 'antd';

// Enhanced color scheme with better contrast
const colors = {
  primary: '#38a169',       // Vibrant green
  primaryLight: '#9ae6b4',  // Light green
  primaryDark: '#2f855a',   // Dark green
  secondary: '#f6e05e',     // Yellow
  secondaryHover: '#ecc94b', // Darker yellow
  accent: '#2d3748',        // Dark gray/black
  text: '#2d3748',          // Dark gray/black
  lightText: '#f7fafc',     // Very light gray/white
  border: '#e2e8f0',        // Light gray
  background: '#ffffff',    // Pure white
  overlay: 'rgba(255,255,255,0.9)' // For text readability
};

const Associates = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const apiUrl = import.meta.env.VITE_API_URL;
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: false, amount: 0.1 });
  const controls = useAnimation();
  const associatesContainerRef = useRef(null);

  // Infinite scroll animation
  useEffect(() => {
    if (!data?.associates?.length) return;

    const container = associatesContainerRef.current;
    if (!container) return;

    const duration = data.associates.length * 5;

    const animate = async () => {
      await controls.start({
        x: ['0%', '-100%'],
        transition: {
          duration: duration,
          ease: 'linear',
          repeat: Infinity,
          repeatType: 'loop'
        }
      });
    };

    animate();

    // Pause on hover
    const handleMouseEnter = () => controls.stop();
    const handleMouseLeave = () => animate();

    container.addEventListener('mouseenter', handleMouseEnter);
    container.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      container.removeEventListener('mouseenter', handleMouseEnter);
      container.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [data, controls]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${apiUrl}/home/associates/`);
        if (!response.ok) throw new Error('Failed to fetch data');
        const jsonData = await response.json();
        setData(jsonData);
      } catch (error) {
        console.error("Error fetching associates data:", error);
        // Fallback to demo data
        setData({
          title: "OUR GLOBAL OFFICES",
          associates: [
            {
              logo: "https://via.placeholder.com/150x80?text=Stephhr",
              link: "#",
              name: "Stephhr"
            },
            {
              logo: "https://via.placeholder.com/150x80?text=JG+Healthcare",
              link: "#",
              name: "JG Healthcare"
            },
            {
              logo: "https://via.placeholder.com/150x80?text=Bitsch",
              link: "#",
              name: "Bitsch"
            },
            {
              logo: "https://via.placeholder.com/150x80?text=Global+HR",
              link: "#",
              name: "Global HR"
            },
            {
              logo: "https://via.placeholder.com/150x80?text=Talent+Solutions",
              link: "#",
              name: "Talent Solutions"
            }
          ]
        });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [apiUrl]);

  if (loading || !data) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
      </div>
    );
  }

  return (
    <section 
      ref={containerRef}
      className="py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden"
      style={{ backgroundColor: colors.background }}
    >
      {/* Background pattern for visual interest */}
      <div className="absolute inset-0 opacity-5 z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-green-100 to-yellow-100"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header - Now with better visibility */}
        <motion.div 
          className="text-center mb-12 relative"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { 
            opacity: 1, 
            y: 0,
            transition: { duration: 0.6 }
          } : {}}
        >
          <div className="inline-block px-8 py-2 rounded-full mb-4" style={{ backgroundColor: colors.primaryLight }}>
            <h2 
              className="text-4xl font-bold"
              style={{ 
                color: colors.primaryDark,
                textShadow: '0 2px 4px rgba(0,0,0,0.05)',
                lineHeight: '1.2'
              }}
            >
              {data.title}
            </h2>
          </div>
          <Divider 
            style={{ 
              borderColor: colors.primaryDark,
              width: '100px',
              margin: '0 auto',
              borderWidth: '2px',
              backgroundColor: colors.primaryDark
            }}
          />
        </motion.div>

        {/* Associates Logos - Infinite Scroller */}
        <div 
          ref={associatesContainerRef}
          className="relative overflow-hidden py-8"
          style={{
            maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
            zIndex: 1,
            margin: '0 -2rem' // Allow logos to bleed to edges
          }}
        >
          <motion.div
            className="flex items-center"
            animate={controls}
            style={{ width: 'max-content' }}
          >
            {/* Double the array to create seamless loop */}
            {[...data.associates, ...data.associates].map((associate, index) => (
              <motion.div
                key={`${associate.link}-${index}`}
                className="px-6 flex flex-col items-center"
                whileHover={{ scale: 1.05 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <a 
                  href={associate.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="group relative block"
                >
                  <div 
                    className="p-6 rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl"
                    style={{ 
                      backgroundColor: colors.background,
                      border: `1px solid ${colors.border}`,
                      minWidth: '200px',
                      height: '140px',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <img 
                      src={associate.logo} 
                      alt={`${associate.name} logo`}
                      className="h-14 object-contain mb-3 transition-all duration-300 group-hover:filter-none"
                      style={{ filter: 'grayscale(100%) opacity(0.8)' }}
                    />
                    <p 
                      className="text-md font-medium mt-2 text-center"
                      style={{ 
                        color: colors.accent,
                        transition: 'color 0.3s ease'
                      }}
                    >
                      {associate.name}
                    </p>
                  </div>
                  <div 
                    className="absolute -bottom-2 -right-2 bg-white rounded-full p-2 shadow-md opacity-0 group-hover:opacity-100 transition-all duration-300"
                    style={{ color: colors.primary }}
                  >
                    <FontAwesomeIcon icon={faExternalLinkAlt} size="sm" />
                  </div>
                </a>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* CTA Button - More prominent */}
        <motion.div 
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { 
            opacity: 1, 
            y: 0,
            transition: { delay: 0.3, duration: 0.6 }
          } : {}}
        >
          <motion.button
            className="px-10 py-4 rounded-full font-bold text-lg shadow-lg hover:shadow-xl transition-all"
            style={{
              background: `linear-gradient(135deg, ${colors.secondary}, ${colors.primaryLight})`,
              color: colors.accent,
              boxShadow: `0 4px 0 ${colors.primaryDark}`
            }}
            whileHover={{ 
              scale: 1.05,
              boxShadow: `0 6px 0 ${colors.primaryDark}`
            }}
            whileTap={{ 
              scale: 0.98,
              boxShadow: `0 2px 0 ${colors.primaryDark}`
            }}
          >
            Become a Partner
            <span className="ml-2">→</span>
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default Associates;
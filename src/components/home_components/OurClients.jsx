import React, { useState, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

// Color constants
const COLORS = {
  primary: '#2ecc71',       // Vibrant green
  primaryDark: '#27ae60',    // Darker green
  secondary: '#f39c12',      // Yellow/orange
  textDark: '#2c3e50',       // Dark blue/black
  textLight: '#ecf0f1',      // Light gray
  backgroundLight: '#ffffff',
  backgroundDark: '#34495e', // Dark slate
  border: '#bdc3c7'          // Light gray border
};

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.1
    }
  }
};

const marqueeVariants = {
  animate: {
    x: ['-100%', '0%'],
    transition: {
      x: {
        repeat: Infinity,
        repeatType: "loop",
        duration: 20,
        ease: "linear",
      }
    }
  }
};

const titleVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 100,
      delay: 0.2
    }
  }
};

const OurClients = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const apiUrl = import.meta.env.VITE_API_URL;
  const controls = useAnimation();
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: false });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${apiUrl}/home/our-clients/`);
        if (!response.ok) throw new Error('Failed to fetch data');
        const jsonData = await response.json();
        setData(jsonData);
      } catch (error) {
        console.error("Error fetching clients data:", error);
        setData({
          title: "Trusted By Global Leaders",
          clients: [
            {
              "logo": "https://logo.clearbit.com/google.com",
              "link": "https://google.com"
            },
            {
              "logo": "https://logo.clearbit.com/microsoft.com",
              "link": "https://microsoft.com"
            },
            {
              "logo": "https://logo.clearbit.com/apple.com",
              "link": "https://apple.com"
            },
            {
              "logo": "https://logo.clearbit.com/amazon.com",
              "link": "https://amazon.com"
            },
            {
              "logo": "https://logo.clearbit.com/facebook.com",
              "link": "https://facebook.com"
            }
          ]
        });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [apiUrl]);

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    } else {
      controls.start('hidden');
    }
  }, [controls, inView]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <motion.div
          animate={{ 
            rotate: 360,
            scale: [1, 1.2, 1]
          }}
          transition={{ 
            repeat: Infinity, 
            duration: 1.5,
            ease: 'linear'
          }}
          className="rounded-full h-12 w-12 border-t-4 border-b-4"
          style={{ borderColor: COLORS.primary }}
        ></motion.div>
      </div>
    );
  }

  if (!data || !data.clients || data.clients.length === 0) {
    return (
      <div className="py-16 text-center">
        <p className="text-gray-500">No client data available</p>
      </div>
    );
  }

  // Duplicate clients for seamless looping
  const duplicatedClients = [...data.clients, ...data.clients];

  return (
    <motion.section 
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={containerVariants}
      className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-gray-50"
      style={{ backgroundColor: COLORS.backgroundLight }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Title with animation */}
        <motion.div 
          variants={titleVariants}
          className="text-center mb-12"
        >
          <motion.h2
            className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent"
            style={{ 
              backgroundImage: 'linear-gradient(to right, #2ecc71, #3498db)',
              lineHeight: '1.2'
            }}
          >
            {data.title}
          </motion.h2>
          <motion.div 
            className="w-20 h-1 mx-auto rounded-full"
            style={{ backgroundColor: COLORS.primary }}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          ></motion.div>
        </motion.div>

        {/* Marquee container */}
        <div className="relative overflow-hidden py-4">
          <motion.div
            className="flex"
            variants={marqueeVariants}
            animate="animate"
          >
            {duplicatedClients.map((client, index) => (
              <motion.a
                key={`${index}-${client.link}`}
                href={client.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-shrink-0 mx-4 p-4 rounded-xl shadow-sm hover:shadow-md transition-all"
                style={{
                  backgroundColor: COLORS.backgroundLight,
                  border: `1px solid ${COLORS.border}`,
                  minWidth: '200px'
                }}
                whileHover={{
                  y: -5,
                  scale: 1.05,
                  transition: { duration: 0.3 }
                }}
              >
                <div className="relative h-16 w-full flex items-center justify-center">
                  <img
                    src={client.logo}
                    alt={`${client.link} logo`}
                    className="max-h-12 w-auto object-contain"
                  />
                  {/* Hover overlay */}
                  <motion.div
                    className="absolute inset-0 bg-black bg-opacity-0 rounded-xl flex items-center justify-center"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 0.1 }}
                    transition={{ duration: 0.3 }}
                  ></motion.div>
                </div>
              </motion.a>
            ))}
          </motion.div>
        </div>

        {/* CTA Button */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <motion.button
            className="px-8 py-3 rounded-lg font-bold text-lg shadow-lg transition-all"
            style={{
              backgroundColor: COLORS.primary,
              color: 'white'
            }}
            whileHover={{ 
              scale: 1.05,
              backgroundColor: COLORS.primaryDark,
              boxShadow: `0 10px 20px ${COLORS.primary}40`
            }}
            whileTap={{ scale: 0.98 }}
          >
            Become Our Client
          </motion.button>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default OurClients;
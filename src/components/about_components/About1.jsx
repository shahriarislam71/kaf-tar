import React, { useState, useEffect } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';

// Updated Color Scheme
const COLORS = {
  primary: '#38a169',       // Vibrant green
  primaryDark: '#2f855a',   // Darker green
  primaryLight: '#9ae6b4',  // Light green
  secondary: '#f6e05e',     // Yellow
  secondaryDark: '#ecc94b', // Darker yellow
  accent: '#2d3748',        // Dark gray/black
  text: '#2d3748',          // Dark gray/black
  lightText: '#f7fafc',     // Very light gray/white
  background: '#ffffff',    // White
  border: '#e2e8f0'         // Light gray
};

const About1 = () => {
  const [aboutData, setAboutData] = useState({
    title: "",
    description: "",
    image1: "",
    image2: "",
    buttonLabel: "",
    buttonLink: "",
    bgColor: COLORS.background,
    textColor: COLORS.accent
  });

  // STECH HR Consultant dummy data
  const stechData = {
    title: "Who We Are",
    description: "We're not just recruiters - we're workforce architects. STECH HR Consultant pioneered the 360° Talent Ecosystem, blending cutting-edge technology with deep human insight to transform how companies build teams. Our proprietary matching algorithm considers 37 competency dimensions, while our cultural alignment framework ensures lasting placements.",
    image1: "https://stechhr.com.bd/wp-content/uploads/2022/05/silhouette-construction-workers-fabricating-steel-reinforcement-bar-construction-si.jpeg",
    image2: "https://images.unsplash.com/photo-1521791136064-7986c2920216?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    buttonLabel: "Download Company Profile",
    buttonLink: "/stech-method",
    bgColor: COLORS.background,
    textColor: COLORS.accent
  };

  const apiUrl = import.meta.env.VITE_API_URL;
  const [error, setError] = useState(null);

  // Preserved existing motion values
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-100, 100], [10, -10]);
  const rotateY = useTransform(x, [-100, 100], [-10, 10]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${apiUrl}/about/about1`);
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        setAboutData(data);
      } catch (err) {
        setError('Content loading innovatively - presenting STECH signature experience');
        setAboutData(stechData);
      }
    };
    fetchData();
  }, [apiUrl]);

  return (
    <section 
      className="py-28 px-4 sm:px-6 lg:px-8 relative overflow-hidden"
      style={{ backgroundColor: aboutData.bgColor || COLORS.background }}
    >
      {/* Animated background elements */}
      <motion.div 
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          background: `linear-gradient(135deg, ${COLORS.primary} 0%, ${COLORS.secondary} 100%)`,
          zIndex: 0
        }}
        animate={{
          backgroundPosition: ['0% 0%', '100% 100%']
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          repeatType: 'reverse',
          ease: 'linear'
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
          style={{
            x,
            y,
            rotateX,
            rotateY
          }}
          whileHover={{
            scale: 1.02,
            transition: { duration: 0.5 }
          }}
        >
          {/* Left Column - Image */}
          <motion.div 
            className="relative rounded-2xl overflow-hidden shadow-2xl"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <img 
              src={aboutData.image1 || stechData.image1} 
              alt="About STECH HR" 
              className="w-full h-auto object-cover"
              style={{ minHeight: '400px' }}
            />
            <div 
              className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"
              style={{ mixBlendMode: 'multiply' }}
            />
          </motion.div>

          {/* Right Column - Content */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            style={{ color: aboutData.textColor || COLORS.accent }}
          >
            <motion.h2 
              className="text-4xl font-bold"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              {aboutData.title || stechData.title}
            </motion.h2>

            <motion.div 
              className="h-1 w-20 rounded-full"
              style={{ backgroundColor: COLORS.primary }}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            />

            <motion.p
              className="text-lg leading-relaxed"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 1 }}
            >
              {aboutData.description || stechData.description}
            </motion.p>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 1.2 }}
            >
              <motion.a
                href={aboutData.buttonLink || stechData.buttonLink}
                className="inline-flex items-center px-8 py-3 rounded-full font-semibold shadow-lg transition-all"
                style={{
                  backgroundColor: COLORS.primary,
                  color: COLORS.lightText,
                  boxShadow: `0 4px 0 ${COLORS.primaryDark}`
                }}
                whileHover={{ 
                  y: -2,
                  boxShadow: `0 6px 0 ${COLORS.primaryDark}`,
                  backgroundColor: COLORS.primaryDark
                }}
                whileTap={{ 
                  y: 2,
                  boxShadow: `0 2px 0 ${COLORS.primaryDark}`
                }}
              >
                {aboutData.buttonLabel || stechData.buttonLabel}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 ml-2"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </motion.a>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Secondary Image - Reduced height */}
        {aboutData.image2 && (
          <motion.div
            className="mt-16 rounded-2xl overflow-hidden shadow-2xl max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.4 }}
          >
            <img 
              src={aboutData.image2} 
              alt="Our Team" 
              className="w-full h-auto object-cover"
              style={{ maxHeight: '200px', width: '100%', objectPosition: 'center' }}
            />
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default About1;
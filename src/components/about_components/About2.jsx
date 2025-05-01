import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const COLORS = {
  primary: "#F15A24",
  primaryLight: "#FF7A45",
  secondary: "#FFC20E",
  secondaryLight: "#FFD95E",
  lightGray: "#F8F8F8",
  darkGray: "#2D2D2D",
  white: "#FFFFFF",
  black: "#000000"
};

const About2 = () => {
  const [about2, setAbout2] = useState({
    "title": "Empowering Global Workforce from Bangladesh",
    "description": "At Stech HR, we go beyond recruitment. We connect skilled Bangladeshi talent to global opportunities, driving growth through precision hiring and people-first strategies.",
    "keyPoints": [
      {
        "icon": "🤝",
        "title": "Trusted Recruitment Partner",
        "description": "Reliable manpower solutions tailored for international employers."
      },
      {
        "icon": "🌍",
        "title": "Skilled Workforce Export",
        "description": "Deploying trained, certified professionals across the Middle East, Europe, and Asia."
      },
      {
        "icon": "📊",
        "title": "Transparent Hiring Process",
        "description": "Data-driven screening and compliance for ethical recruitment."
      }
    ],
    "buttonLabel": "Partner with Stech HR",
    "buttonLink": "/about",
    "bgColor": "darkgray",
    "textColor": "white"
  }
  );

  const [error, setError] = useState(null);
  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${apiUrl}/about/about2`);
        const data2 = await response.json();
        setAbout2(data2);
      } catch (err) {
        setError('Failed to fetch data');
        console.error(err);
      }
    };

    fetchData();
  }, [apiUrl]);

  return (
    <div 
      className="min-h-screen flex items-center justify-center py-16 relative overflow-hidden text-justify"
      style={{ 
        backgroundColor:  COLORS.darkGray,
        color: COLORS.white
      }}
    >
      {/* Geometric Background Overlay */}
      <div 
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(135deg, 
              ${COLORS.primary}20, 
              ${COLORS.secondary}20),
            repeating-linear-gradient(
              45deg, 
              transparent, 
              transparent 50px, 
              ${COLORS.primaryLight}10 50px, 
              ${COLORS.primaryLight}10 100px
            )
          `,
          mixBlendMode: 'overlay'
        }}
      />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Content Section with Innovative Presentation */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div 
              className="text-5xl font-bold mb-8 relative inline-block"
              style={{ color: COLORS.primary }}
            >
              {about2.title}
              <div 
                className="absolute -bottom-2 left-0 h-2 w-1/2"
                style={{ 
                  background: `linear-gradient(to right, ${COLORS.primary}, ${COLORS.secondary})`,
                  borderRadius: '10px'
                }}
              />
            </div>
            
            <p 
              className="text-xl mb-8 leading-relaxed"
              style={{ color: COLORS.lightGray }}
            >
              {about2.description}
            </p>

            {/* Key Points with Dynamic Interaction */}
            <div className="space-y-6">
              {about2.keyPoints.map((point, index) => (
                <motion.div
                  key={index}
                  className="flex items-center space-x-6 p-6 rounded-2xl transition-all duration-300"
                  style={{
                    background: `linear-gradient(145deg, ${COLORS.primaryLight}20, ${COLORS.secondary}20)`,
                    border: `2px solid ${COLORS.primary}40`
                  }}
                  whileHover={{ 
                    scale: 1.05,
                    boxShadow: `0 10px 25px -5px ${COLORS.primary}40`
                  }}
                >
                  <div 
                    className="text-4xl"
                    style={{ 
                      textShadow: `2px 2px 4px ${COLORS.primary}40`
                    }}
                  >
                    {point.icon}
                  </div>
                  <div>
                    <h3 
                      className="text-xl font-bold mb-2"
                      style={{ color: COLORS.primary }}
                    >
                      {point.title}
                    </h3>
                    <p 
                      className="text-sm"
                      style={{ color: COLORS.lightGray }}
                    >
                      {point.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="mt-8 px-10 py-4 rounded-full text-lg font-bold shadow-2xl transform transition-all duration-300 hover:rotate-3"
              style={{
                background: `linear-gradient(135deg, ${COLORS.primary}, ${COLORS.secondary})`,
                color: COLORS.white,
                boxShadow: `0 15px 30px -10px ${COLORS.primary}60`
              }}
              onClick={() => window.location.href = about2.buttonLink}
            >
              {about2.buttonLabel}
            </motion.button>
          </motion.div>

          {/* Interactive 3D-like Image Section */}
          <motion.div 
            className="relative group"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div 
              className="absolute -inset-4 bg-gradient-to-r from-primary to-secondary rounded-3xl blur-xl opacity-30 group-hover:opacity-50 transition duration-500"
            />
            <div 
              className="relative rounded-3xl overflow-hidden shadow-2xl transform transition-transform duration-500 group-hover:scale-105 group-hover:rotate-3"
              style={{ 
                border: `4px solid ${COLORS.primary}`,
                boxShadow: `0 25px 50px -12px ${COLORS.primary}40`
              }}
            >
              <img 
                src="https://stechhr.com.bd/wp-content/uploads/2022/05/construction-worker-truss-installation.jpeg" 
                alt="Innovative Workforce Solutions" 
                className="w-full h-full object-cover"
              />
              <div 
                className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-50 group-hover:opacity-70 transition duration-500"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default About2;
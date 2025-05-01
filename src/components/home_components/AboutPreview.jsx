import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from 'antd';

const DEFAULT_DATA = {
  "title": "About Stech Builders",
  "summary": "With over 15 years of experience in the construction industry, Stech Builders has established itself as a leader in quality construction and innovative design. Our team of skilled professionals is dedicated to delivering exceptional results on every project, from residential homes to commercial complexes.",
  "mission": "To build spaces that inspire and endure through quality craftsmanship and sustainable practices",
  "button": {
    "text": "Our Story",
    "link": "/about-us",
    "color": "#3498db"
  },
  "image": "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
};

const AboutPreview = ({ isEditing = false, onEdit }) => {
  const [aboutData, setAboutData] = useState(DEFAULT_DATA);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false); // Start with false since we're using default data

  useEffect(() => {
    const fetchAboutData = async () => {
      try {
        setIsLoading(true);
        const apiUrl = import.meta.env.VITE_API_URL;
        
        // First check if API URL is configured
        if (!apiUrl) {
          console.warn('API URL not configured, using default data');
          setAboutData(DEFAULT_DATA);
          return;
        }

        const response = await fetch(`${apiUrl}/home/about-preview/`);
        
        // If endpoint doesn't exist (404), use default data
        if (response.status === 404) {
          console.warn('About preview endpoint not found, using default data');
          setAboutData(DEFAULT_DATA);
          return;
        }

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setAboutData(data);
      } catch (err) {
        console.error('Error fetching about data:', err);
        setError(err.message);
        setAboutData(DEFAULT_DATA); // Fallback to default data
      } finally {
        setIsLoading(false);
      }
    };

    fetchAboutData();
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <section className="relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-teal-400 opacity-10 -rotate-1 scale-105"></div>
      
      <div className="container mx-auto px-4 py-16 md:py-24 relative z-10">
        {error && (
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-8">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-yellow-700">
                  Couldn't load live data. Showing default content. {error}
                </p>
              </div>
            </div>
          </div>
        )}
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col lg:flex-row gap-12 items-center"
        >
          {/* Image section */}
          <div className="lg:w-1/2">
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="relative rounded-xl overflow-hidden shadow-2xl"
            >
              <div className="aspect-w-16 aspect-h-9">
                <img 
                  src={aboutData.image} 
                  alt="About Stech Builders" 
                  className="w-full h-full object-cover rounded-xl transform transition-all duration-500 hover:scale-105"
                  onError={(e) => {
                    e.target.src = 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80';
                  }}
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
            </motion.div>
          </div>

          {/* Content section */}
          <div className="lg:w-1/2 space-y-6">
            <motion.h2 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-4xl md:text-5xl font-bold text-gray-800"
            >
              {aboutData.title}
            </motion.h2>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-lg text-gray-600 leading-relaxed"
            >
              {aboutData.summary}
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500"
            >
              <p className="text-blue-800 font-medium italic">{aboutData.mission}</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              <Button
                type="primary"
                size="large"
                shape="round"
                style={{ 
                  backgroundColor: aboutData.button.color,
                  borderColor: aboutData.button.color
                }}
                className="px-8 h-12 text-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                href={aboutData.button.link}
              >
                {aboutData.button.text}
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Floating decorative elements */}
      <motion.div 
        animate={{
          y: [0, -15, 0],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-1/4 left-10 w-16 h-16 rounded-full bg-blue-400 opacity-20 blur-xl"
      ></motion.div>
      <motion.div 
        animate={{
          y: [0, 15, 0],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
        className="absolute bottom-1/3 right-20 w-20 h-20 rounded-full bg-teal-400 opacity-20 blur-xl"
      ></motion.div>
    </section>
  );
};

export default AboutPreview;
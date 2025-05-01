import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const CoreValues = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const apiUrl = import.meta.env.VITE_API_URL

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${apiUrl}/about/core-values`);
        if (!response.ok) throw new Error('Failed to fetch data');
        const jsonData = await response.json();
        setData(jsonData);
      } catch (error) {
        console.error('Error fetching core values:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div className="text-center py-20">Loading...</div>;
  if (!data) return <div className="text-center py-20">Failed to load core values</div>;

  return (
    <div className="relative py-32 px-4 overflow-hidden text-justify" style={{ backgroundColor: data.colors.white }}>
      {/* Binary code background pattern */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(90deg, ${data.colors.darkGray} 1px, transparent 1px),
            linear-gradient(${data.colors.darkGray} 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
          backgroundPosition: '0 0, 20px 20px'
        }} />
      </div>

      <div className="container mx-auto relative z-10">
        {/* STECH signature header */}
        <motion.div 
          className="text-center mb-20"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center px-6 py-3 rounded-full mb-6"
            style={{ backgroundColor: data.colors.secondaryLight }}>
            <span className="text-sm font-bold uppercase tracking-wider" style={{ color: data.colors.darkGray }}>
              {data.subtitle}
            </span>
          </div>
          <h2 className="text-5xl font-bold" style={{ color: data.colors.darkGray }}>
            {data.title}
          </h2>
          <div className="mx-auto mt-6 h-1 w-24" style={{ backgroundColor: data.colors.primary }} />
        </motion.div>

        {/* Interactive value cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {data.values.map((value, index) => (
            <motion.div
              key={index}
              className="relative p-8 rounded-2xl overflow-hidden"
              style={{ 
                backgroundColor: data.colors.lightGray,
                boxShadow: `0 10px 30px ${data.colors.darkGray}08`
              }}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -10 }}
            >
              {/* Pulsing orb */}
              <motion.div
                className="absolute -top-20 -right-20 w-40 h-40 rounded-full opacity-10"
                style={{ backgroundColor: value.color }}
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.1, 0.2, 0.1]
                }}
                transition={{
                  duration: 4 + index,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              
              {/* Value icon */}
              <motion.div
                className="w-16 h-16 rounded-2xl mb-6 flex items-center justify-center text-3xl"
                style={{ 
                  backgroundColor: data.colors.white,
                  boxShadow: `0 10px 20px ${data.colors.darkGray}10`
                }}
                whileHover={{ 
                  rotate: 10,
                  scale: 1.1
                }}
              >
                {value.icon}
              </motion.div>
              
              <h3 className="text-2xl font-bold mb-4" style={{ color: data.colors.darkGray }}>
                {value.title}
              </h3>
              <p className="leading-relaxed" style={{ color: data.colors.darkGray }}>
                {value.description}
              </p>
              
              {/* Animated underline */}
              <motion.div
                className="absolute bottom-0 left-0 right-0 h-1"
                style={{ backgroundColor: value.color }}
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              />
            </motion.div>
          ))}
        </div>

  
      </div>
    </div>
  );
};

export default CoreValues;
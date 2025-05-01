import React, { useState, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaArrowRight } from 'react-icons/fa';

const Contact1 = ({ onScrollToContact2, bgColor, textColor }) => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: false
  });

  // Sample data - in a real app you would fetch this from the API
  const sampleData = {
    header: "Contact Us Today",
    subHeader: "Get in touch with our team to discuss your construction and training needs",
    buttonText: "View Our Locations",
    buttonLink: "#locations",
    email: "info@stechbuilders.com",
    phone: "+880 1234 567890",
    bgColor: "#2ecc71", // Vibrant green
    textColor: "#ffffff", // White text
    locations: [
      {
        city: "Dhaka",
        address: "123 Construction Lane, Tejgaon Industrial Area"
      },
      {
        city: "Chittagong",
        address: "456 Builder Street, Agrabad Commercial Area"
      }
    ]
  };

  const [content, setContent] = useState(sampleData);

  useEffect(() => {
    // Simulate API fetch
    fetch(`${apiUrl}/contact/contact1`)
      .then(res => res.json())
      .then(data => setContent(data));
  }, [apiUrl]);

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    } else {
      controls.start('hidden');
    }
  }, [controls, inView]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10
      }
    }
  };

  const buttonVariants = {
    hover: {
      scale: 1.05,
      backgroundColor: "#27ae60", // Darker green
      boxShadow: "0 5px 15px rgba(0,0,0,0.2)",
      transition: {
        duration: 0.3
      }
    },
    tap: {
      scale: 0.98
    }
  };

  return (
    <motion.section
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={containerVariants}
      className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden"
      style={{
        backgroundColor: content.bgColor || bgColor || '#2ecc71',
        color: content.textColor || textColor || '#ffffff'
      }}
    >
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-repeat" style={{ 
          backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'20\' height=\'20\' viewBox=\'0 0 20 20\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M0 0h20L0 20z\' fill=\'%23ffffff\' fill-opacity=\'0.2\' /%3E%3C/svg%3E")'
        }}></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10 pt-20">
        {/* Header */}
        <motion.div 
          variants={itemVariants}
          className="text-center mb-12"
        >
          <motion.h2 
            className="text-4xl md:text-5xl font-bold mb-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            {content.header}
          </motion.h2>
          <motion.p 
            className="text-xl md:text-2xl max-w-3xl mx-auto"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            {content.subHeader}
          </motion.p>
        </motion.div>

        {/* Contact Info */}
        <motion.div 
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12"
        >
          {/* Phone */}
          <motion.div 
            variants={itemVariants}
            className="bg-white/10 backdrop-blur-sm p-6 rounded-xl shadow-lg"
            whileHover={{ y: -5 }}
          >
            <div className="flex items-center mb-4">
              <div className="p-3 rounded-full mr-4" style={{ backgroundColor: 'rgba(255,255,255,0.2)' }}>
                <FaPhone className="text-2xl" />
              </div>
              <h3 className="text-xl font-semibold">Phone</h3>
            </div>
            <p className="text-lg">{content.phone}</p>
          </motion.div>

          {/* Email */}
          <motion.div 
            variants={itemVariants}
            className="bg-white/10 backdrop-blur-sm p-6 rounded-xl shadow-lg"
            whileHover={{ y: -5 }}
          >
            <div className="flex items-center mb-4">
              <div className="p-3 rounded-full mr-4" style={{ backgroundColor: 'rgba(255,255,255,0.2)' }}>
                <FaEnvelope className="text-2xl" />
              </div>
              <h3 className="text-xl font-semibold">Email</h3>
            </div>
            <p className="text-lg">{content.email}</p>
          </motion.div>

          {/* Locations */}
          <motion.div 
            variants={itemVariants}
            className="bg-white/10 backdrop-blur-sm p-6 rounded-xl shadow-lg"
            whileHover={{ y: -5 }}
          >
            <div className="flex items-center mb-4">
              <div className="p-3 rounded-full mr-4" style={{ backgroundColor: 'rgba(255,255,255,0.2)' }}>
                <FaMapMarkerAlt className="text-2xl" />
              </div>
              <h3 className="text-xl font-semibold">Locations</h3>
            </div>
            <p className="text-lg">{content.locations.length} offices nationwide</p>
          </motion.div>
        </motion.div>

        {/* CTA Button */}
        <motion.div 
          className="text-center"
          variants={itemVariants}
        >
          <motion.button
            onClick={onScrollToContact2}
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
            className="px-8 py-4 rounded-lg font-semibold text-lg flex items-center mx-auto"
            style={{
              backgroundColor: '#f39c12', // Orange/yellow
              color: '#ffffff'
            }}
          >
            {content.buttonText}
            <FaArrowRight className="ml-2" />
          </motion.button>
        </motion.div>

        {/* Locations Preview */}
        {content.locations.length > 0 && (
          <motion.div 
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16"
          >
            {content.locations.map((location, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="bg-white/10 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-white/20"
                whileHover={{ 
                  y: -5,
                  boxShadow: '0 10px 25px rgba(0,0,0,0.1)'
                }}
              >
                <h3 className="text-xl font-bold mb-2">{location.city}</h3>
                <p className="opacity-90">{location.address}</p>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </motion.section>
  );
};

export default Contact1;
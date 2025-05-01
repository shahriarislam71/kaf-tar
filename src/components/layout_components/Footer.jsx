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
  backgroundDark: '#1a1a1a', // Dark footer background
  border: '#bdc3c7'          // Light gray border
};

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 10
    }
  }
};

const socialIconVariants = {
  hover: {
    scale: 1.2,
    y: -3,
    transition: { duration: 0.3 }
  }
};

const Footer = () => {
  const [data, setData] = useState({ 
    logo: { url: '', alt: '' },
    socials: [], 
    addresses: [], 
    copyText: "",
    backgroundImage: ""
  });
  const [loading, setLoading] = useState(true);
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });
  const controls = useAnimation();
  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${apiUrl}/layout/footer/`);
        const footerData = await response.json();
        setData(footerData);
      } catch (error) {
        console.error("Error loading footer data:", error);
        // Fallback data
        setData({
          logo: {
            url: "https://stechhr.com.bd/wp-content/uploads/2020/12/logo-Header.png",
            alt: "STECH HR Logo"
          },
          socials: [
            { icon: "facebook", link: "https://www.facebook.com/jgalfalahmanagement/" },
            { icon: "youtube", link: "#" },
            { icon: "linkedin", link: "https://www.linkedin.com/company/jg-alfalah/" },
            { icon: "instagram", link: "https://www.instagram.com/jgalfalah1861/" }
          ],
          addresses: [
            { 
              heading: "Malaysia Office", 
              detail: "VIDA Bukit Ceylon, 10-03, 1d, Jalan Ceylon, Bukit Ceylon, 50200 Kuala Lumpur", 
              email: "admin@jgalfalah.com", 
              phoneNumber: "+601111499040" 
            }
          ],
          copyText: "© Copyright 2024 by Stechhrbd. All Rights Reserved. Developed By Blockchain Technology",
          backgroundImage: "https://img.freepik.com/free-vector/worldwide-global-map-outline-black-background_1017-46153.jpg"
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
    }
  }, [controls, inView]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64 bg-gray-900">
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

  const getSocialIcon = (icon) => {
    switch (icon) {
      case 'facebook':
        return (
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"/>
          </svg>
        );
      case 'youtube':
        return (
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
          </svg>
        );
      case 'linkedin':
        return (
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
          </svg>
        );
      case 'instagram':
        return (
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <motion.footer
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={containerVariants}
      className="relative overflow-hidden"
      style={{ backgroundColor: COLORS.backgroundDark }}
    >
      {/* Background image with overlay */}
      {data.backgroundImage && (
        <div className="absolute inset-0 z-0 opacity-20">
          <img 
            src={data.backgroundImage} 
            alt="Footer background" 
            className="w-full h-full object-cover"
          />
        </div>
      )}

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Logo and Socials */}
          <motion.div 
            variants={itemVariants}
            className="flex flex-col items-center md:items-start"
          >
            {data.logo.url && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className="mb-6"
              >
                <img 
                  src={data.logo.url} 
                  alt={data.logo.alt} 
                  className="h-16 object-contain"
                />
              </motion.div>
            )}
            
            <motion.div 
              variants={itemVariants}
              className="flex space-x-4 mb-6"
            >
              {data.socials.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  variants={socialIconVariants}
                  whileHover="hover"
                  className="flex items-center justify-center w-10 h-10 rounded-full"
                  style={{ 
                    backgroundColor: COLORS.primary,
                    color: 'white'
                  }}
                >
                  {getSocialIcon(social.icon)}
                </motion.a>
              ))}
            </motion.div>

            <motion.p 
              variants={itemVariants}
              className="text-sm text-center md:text-left"
              style={{ color: COLORS.textLight }}
            >
              Connecting talent with opportunity across borders.
            </motion.p>
          </motion.div>

          {/* Addresses */}
          <motion.div 
            variants={itemVariants}
            className="space-y-6"
          >
            <motion.h3 
              className="text-lg font-semibold"
              style={{ color: COLORS.primary }}
            >
              Our Offices
            </motion.h3>
            
            {data.addresses.map((address, index) => (
              <motion.div 
                key={index}
                variants={itemVariants}
                className="space-y-2"
              >
                <motion.h4 
                  className="font-medium"
                  style={{ color: COLORS.textLight }}
                >
                  {address.heading}
                </motion.h4>
                <motion.p 
                  className="text-sm whitespace-pre-line"
                  style={{ color: COLORS.textLight }}
                >
                  {address.detail}
                </motion.p>
                <motion.a 
                  href={`mailto:${address.email}`}
                  className="block text-sm hover:underline"
                  style={{ color: COLORS.primary }}
                  whileHover={{ x: 5 }}
                >
                  {address.email}
                </motion.a>
                <motion.a 
                  href={`tel:${address.phoneNumber.replace(/\D/g, '')}`}
                  className="block text-sm hover:underline"
                  style={{ color: COLORS.primary }}
                  whileHover={{ x: 5 }}
                >
                  {address.phoneNumber}
                </motion.a>
              </motion.div>
            ))}
          </motion.div>

          {/* Quick Links */}
          <motion.div 
            variants={itemVariants}
            className="space-y-6"
          >
            <motion.h3 
              className="text-lg font-semibold"
              style={{ color: COLORS.primary }}
            >
              Quick Links
            </motion.h3>
            
            <motion.ul className="space-y-3">
              {['Home', 'About Us', 'Services', 'Training', 'Contact'].map((item, index) => (
                <motion.li 
                  key={index}
                  variants={itemVariants}
                  whileHover={{ x: 5 }}
                >
                  <motion.a
                    href="#"
                    className="text-sm hover:underline"
                    style={{ color: COLORS.textLight }}
                  >
                    {item}
                  </motion.a>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>
        </div>

        {/* Copyright */}
        <motion.div 
          variants={itemVariants}
          className="mt-12 pt-6 border-t text-center"
          style={{ borderColor: '#333' }}
        >
          <motion.p 
            className="text-sm"
            style={{ color: COLORS.textLight }}
          >
            {data.copyText}
          </motion.p>
        </motion.div>
      </div>
    </motion.footer>
  );
};

export default Footer;
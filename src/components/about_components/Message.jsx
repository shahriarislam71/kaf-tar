import React, { useState, useEffect } from 'react';
import { motion, useMotionValue, useTransform, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const COLORS = {
  primary: "#2E8B57",       // Sea Green (primary)
  primaryDark: "#1E6F47",    // Darker Green
  primaryLight: "#4CAF7D",   // Lighter Green
  secondary: "#FFD700",      // Gold (secondary)
  secondaryLight: "#FFE55C", // Light Gold
  accent: "#FF7F50",         // Coral (accent)
  lightGray: "#F5F5F5",
  darkGray: "#333333",
  white: "#FFFFFF",
  black: "#000000",
  overlay: "rgba(0,0,0,0.7)"
};

const Message = () => {
  const [data, setData] = useState({
    heading: "From The Chairman's Desk",
    subheading: "Redefining Workforce Solutions",
    description: "At STECH, we've built more than an HR consultancy - we've engineered a talent revolution. Our 360° Talent Ecosystem represents a fundamental shift in how organizations acquire and retain top talent. By combining cutting-edge AI with deep human insight, we're delivering placement accuracy rates that redefine industry standards.",
    image: "",
    chairman: {
      name: "MD Sohel Rana",
      position: "Founder & Chairman",
      image: "https://jgfacility.com/backend/media/uploaded_images/message.jpg"
    }
  });

  // Animation controls
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.3,
    triggerOnce: false
  });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    } else {
      controls.start("hidden");
    }
  }, [controls, inView]);

  // Parallax effect
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-100, 100], [5, -5]);
  const rotateY = useTransform(x, [-100, 100], [-5, 5]);

  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [messageData] = await Promise.all([
          fetch(`${apiUrl}/about/message`).then(res => res.json()),
        ]);
        setData(prevData => ({
          ...prevData,
          ...messageData
        }));
      } catch (err) {
        console.error('Content loading innovatively - presenting STECH signature experience');
      }
    };
    fetchData();
  }, [apiUrl]);

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
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        damping: 10,
        stiffness: 100
      }
    }
  };

  return (
    <motion.section 
      className="relative py-20 px-4 overflow-hidden"
      style={{ backgroundColor: data.bgColor || COLORS.white }}
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={containerVariants}
    >
      {/* Decorative elements */}
      <div className="absolute inset-0 opacity-5 pointer-events-none" style={{
        backgroundImage: `repeating-radial-gradient(circle at 50% 50%, ${COLORS.primaryLight} 0px, ${COLORS.primaryLight} 2px, transparent 2px, transparent 100%)`,
        backgroundSize: '40px 40px'
      }} />

      <div className="container mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text content */}
          <motion.div 
            className="lg:pr-12"
            variants={itemVariants}
          >
            <div className="inline-flex items-center px-5 py-2 rounded-full mb-6"
              style={{ 
                backgroundColor: COLORS.secondaryLight,
                boxShadow: `0 4px 15px ${COLORS.secondaryLight}80`
              }}>
              <span className="text-sm font-medium uppercase tracking-wider" style={{ color: COLORS.black }}>
                Leadership Message
              </span>
            </div>

            <motion.h2 
              className="text-4xl md:text-5xl font-bold mb-6 leading-tight"
              style={{ color: data.textColor || COLORS.darkGray }}
              variants={itemVariants}
            >
              {data.heading}
            </motion.h2>

            <motion.h3 
              className="text-2xl font-semibold mb-6"
              style={{ color: COLORS.primary }}
              variants={itemVariants}
            >
              {data.subheading}
            </motion.h3>

            <motion.p 
              className="text-lg mb-8 leading-relaxed"
              style={{ color: data.textColor || COLORS.darkGray }}
              variants={itemVariants}
            >
              {data.description}
            </motion.p>

            <motion.div 
              className="flex items-center"
              variants={itemVariants}
            >
              <div className="w-1 h-12 mr-4" style={{ backgroundColor: COLORS.primary }} />
              <div>
                <h4 className="text-xl font-bold" style={{ color: data.textColor || COLORS.darkGray }}>
                  {data.chairman.name}
                </h4>
                <p className="text-sm" style={{ color: COLORS.primary }}>
                  {data.chairman.position}
                </p>
              </div>
            </motion.div>
          </motion.div>

          {/* Image with parallax effect */}
          <motion.div 
            className="relative"
            style={{
              x,
              y,
              rotateX,
              rotateY,
              z: 100
            }}
            whileHover={{ scale: 1.03 }}
            transition={{ type: "spring", stiffness: 300 }}
            variants={itemVariants}
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              {/* Main image */}
              <img
                src={data.chairman.image || data.image}
                alt={data.chairman.name}
                className="w-full h-auto object-cover"
                style={{ minHeight: '500px' }}
                onMouseMove={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  x.set(e.clientX - rect.left - rect.width / 2);
                  y.set(e.clientY - rect.top - rect.height / 2);
                }}
                onMouseLeave={() => {
                  x.set(0);
                  y.set(0);
                }}
              />
              
              {/* Decorative border */}
              <div className="absolute inset-0 border-8 pointer-events-none" style={{
                borderColor: COLORS.primary,
                opacity: 0.3,
                borderRadius: '1rem'
              }} />
            </div>

            {/* Floating signature */}
            <motion.div 
              className="absolute -bottom-6 -right-6 bg-white p-4 rounded-lg shadow-lg"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.8, type: "spring" }}
              style={{
                border: `2px solid ${COLORS.secondary}`
              }}
            >
              <div className="text-center">
                <div className="text-xs mb-1" style={{ color: COLORS.primary }}>
                  Signature
                </div>
                <div className="font-signature text-2xl" style={{ color: COLORS.black }}>
                  {data.chairman.name.split(' ')[0]}
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Animated decorative elements */}
        <motion.div 
          className="absolute -left-20 -top-20 w-40 h-40 rounded-full opacity-20"
          style={{ backgroundColor: COLORS.primary }}
          animate={{
            x: [0, 20, 0],
            y: [0, 20, 0],
            scale: [1, 1.2, 1]
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        <motion.div 
          className="absolute -right-10 -bottom-10 w-32 h-32 rounded-full opacity-20"
          style={{ backgroundColor: COLORS.secondary }}
          animate={{
            x: [0, -20, 0],
            y: [0, -20, 0],
            scale: [1, 1.3, 1]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        />
      </div>
    </motion.section>
  );
};

export default Message;
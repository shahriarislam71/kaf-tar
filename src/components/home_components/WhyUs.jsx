import React, { useState, useEffect } from 'react';
import { 
  Target, 
  RefreshCcw, 
  Zap, 
  PenTool, 
  Layers, 
  CheckCircle 
} from 'lucide-react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const WhyUs = () => {
  const [hoveredCard, setHoveredCard] = useState(null);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: false
  });
  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${apiUrl}/home/why-us/`);
        if (!response.ok) throw new Error('Failed to fetch data');
        const jsonData = await response.json();
        setData(jsonData);
      } catch (error) {
        console.error("Error fetching why-us data:", error);
        // Fallback to default data if API fails
        setData({
          heading: "Why Choose JG Alfalah?",
          subtitle: "Distinct advantages that set our HR solutions apart from conventional approaches",
          items: [
            {
              icon: "Target",
              title: "Precision Hiring",
              description: "Our targeted recruitment ensures perfect candidate matches for your specific needs"
            },
            {
              icon: "RefreshCcw",
              title: "Continuous Support",
              description: "24/7 assistance and regular follow-ups to ensure smooth operations"
            },
            {
              icon: "Zap",
              title: "Fast Turnaround",
              description: "Quick response times and efficient processing of all HR requirements"
            },
            {
              icon: "PenTool",
              title: "Custom Solutions",
              description: "Tailored HR strategies designed specifically for your business"
            },
            {
              icon: "Layers",
              title: "Comprehensive Services",
              description: "End-to-end HR solutions covering all aspects of human resource management"
            },
            {
              icon: "CheckCircle",
              title: "Proven Track Record",
              description: "Trusted by hundreds of businesses for reliable HR solutions"
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
      controls.start("visible");
    } else {
      controls.start("hidden");
    }
  }, [controls, inView]);

  const iconComponents = {
    Target,
    RefreshCcw,
    Zap,
    PenTool,
    Layers,
    CheckCircle
  };

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
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-600"></div>
      </div>
    );
  }

  return (
    <section 
      ref={ref}
      className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-green-50"
      id="why-us"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial="hidden"
          animate={controls}
          variants={containerVariants}
          className="text-center mb-16"
        >
          <motion.h2 
            variants={itemVariants}
            className="text-4xl font-bold text-gray-900 mb-4"
          >
            {data.heading}
          </motion.h2>
          <motion.p 
            variants={itemVariants}
            className="text-xl text-gray-600 max-w-3xl mx-auto"
          >
            {data.subtitle}
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          animate={controls}
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {data.items.map((item, index) => {
            const IconComponent = iconComponents[item.icon];
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ 
                  y: -10,
                  boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)"
                }}
                onMouseEnter={() => setHoveredCard(index)}
                onMouseLeave={() => setHoveredCard(null)}
                className={`bg-white rounded-xl p-8 transition-all duration-300 border-2 ${
                  hoveredCard === index 
                    ? 'border-green-500 shadow-xl' 
                    : 'border-transparent shadow-lg'
                }`}
              >
                <div className={`w-14 h-14 rounded-full flex items-center justify-center mb-6 ${
                  hoveredCard === index 
                    ? 'bg-green-600 text-white' 
                    : 'bg-green-100 text-green-600'
                }`}>
                  <IconComponent className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-3">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed">{item.description}</p>
                <div className={`mt-6 w-12 h-1 ${
                  hoveredCard === index ? 'bg-yellow-400' : 'bg-green-600'
                } transition-all duration-300`}></div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default WhyUs;
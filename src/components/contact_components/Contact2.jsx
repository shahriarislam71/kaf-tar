import React, { useState, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { FaPhone, FaMapMarkerAlt, FaEnvelope, FaClock, FaFacebook, FaLinkedin, FaInstagram } from "react-icons/fa";

const Contact2 = () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: false
  });

  // Sample data - in a real app you would fetch this from API
  const sampleData = {
    title: "Contact Us",
    subtitle: "Reach Out To Us",
    phoneNumbers: [
      "Main office: +880 1234-567890",
      "Support line: +880 9876-543210"
    ],
    email: "Pagedone1234@gmail.com",
    addresses: [
      {
        heading: "Headquarters",
        details: "123 Construction Lane, Tejgaon Industrial Area, Dhaka"
      },
      {
        heading: "Training Center",
        details: "456 Builder Street, Agrabad Commercial Area, Chittagong"
      }
    ],
    businessHours: [
      "Monday - Friday: 9:00 AM - 6:00 PM",
      "Saturday: 10:00 AM - 4:00 PM",
      "Sunday: Closed"
    ],
    socialMedia: [
      {
        name: "Facebook",
        url: "https://facebook.com/stechbuilders"
      },
      {
        name: "LinkedIn",
        url: "https://linkedin.com/company/stechbuilders"
      },
      {
        name: "Instagram",
        url: "https://instagram.com/stechbuilders"
      }
    ],
    imageUrl: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
    bgColor: "#2ecc71",
    textColor: "#ffffff",
    accentColor: "#f39c12"
  };

  const [contactData, setContactData] = useState(sampleData);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  useEffect(() => {
    // In real app: fetch(`${apiUrl}/contact/contact2`).then(res => res.json()).then(data => setContactData(data));
    if (inView) {
      controls.start("visible");
    }
  }, [inView]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Submit form logic here
    console.log("Form submitted:", formData);
  };

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

  const cardVariants = {
    hover: {
      y: -5,
      boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
      transition: { duration: 0.3 }
    }
  };

  return (
    <motion.section
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={containerVariants}
      className="py-16 px-4 sm:px-6 lg:px-8"
      style={{ backgroundColor: contactData.bgColor }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div 
          variants={itemVariants}
          className="text-center mb-12"
        >
          <motion.h2 
            className="text-4xl md:text-5xl font-bold mb-4"
            style={{ color: contactData.textColor }}
          >
            {contactData.title}
          </motion.h2>
          <motion.p 
            className="text-xl md:text-2xl max-w-3xl mx-auto"
            style={{ color: contactData.textColor }}
          >
            {contactData.subtitle}
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <motion.div 
            variants={itemVariants}
            className="space-y-8"
          >
            {/* Phone Numbers */}
            <motion.div 
              variants={cardVariants}
              whileHover="hover"
              className="bg-white/10 backdrop-blur-sm p-6 rounded-xl shadow-lg border-2 border-white/20"
            >
              <div className="flex items-center mb-4">
                <div className="p-3 rounded-full mr-4" style={{ backgroundColor: 'rgba(255,255,255,0.2)' }}>
                  <FaPhone className="text-2xl" style={{ color: contactData.textColor }} />
                </div>
                <h3 className="text-xl font-semibold" style={{ color: contactData.textColor }}>Phone Numbers</h3>
              </div>
              <ul className="space-y-2">
                {contactData.phoneNumbers.map((phone, index) => (
                  <li key={index} className="flex items-center">
                    <span className="text-lg" style={{ color: contactData.textColor }}>{phone}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Email */}
            <motion.div 
              variants={cardVariants}
              whileHover="hover"
              className="bg-white/10 backdrop-blur-sm p-6 rounded-xl shadow-lg border-2 border-white/20"
            >
              <div className="flex items-center mb-4">
                <div className="p-3 rounded-full mr-4" style={{ backgroundColor: 'rgba(255,255,255,0.2)' }}>
                  <FaEnvelope className="text-2xl" style={{ color: contactData.textColor }} />
                </div>
                <h3 className="text-xl font-semibold" style={{ color: contactData.textColor }}>Email Address</h3>
              </div>
              <p className="text-lg" style={{ color: contactData.textColor }}>{contactData.email}</p>
            </motion.div>

            {/* Addresses */}
            <motion.div 
              variants={cardVariants}
              whileHover="hover"
              className="bg-white/10 backdrop-blur-sm p-6 rounded-xl shadow-lg border-2 border-white/20"
            >
              <div className="flex items-center mb-4">
                <div className="p-3 rounded-full mr-4" style={{ backgroundColor: 'rgba(255,255,255,0.2)' }}>
                  <FaMapMarkerAlt className="text-2xl" style={{ color: contactData.textColor }} />
                </div>
                <h3 className="text-xl font-semibold" style={{ color: contactData.textColor }}>Our Locations</h3>
              </div>
              <div className="space-y-4">
                {contactData.addresses.map((address, index) => (
                  <div key={index} className="space-y-1">
                    <h4 className="font-medium" style={{ color: contactData.textColor }}>{address.heading}</h4>
                    <p className="text-lg" style={{ color: contactData.textColor }}>{address.details}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Business Hours */}
            <motion.div 
              variants={cardVariants}
              whileHover="hover"
              className="bg-white/10 backdrop-blur-sm p-6 rounded-xl shadow-lg border-2 border-white/20"
            >
              <div className="flex items-center mb-4">
                <div className="p-3 rounded-full mr-4" style={{ backgroundColor: 'rgba(255,255,255,0.2)' }}>
                  <FaClock className="text-2xl" style={{ color: contactData.textColor }} />
                </div>
                <h3 className="text-xl font-semibold" style={{ color: contactData.textColor }}>Business Hours</h3>
              </div>
              <ul className="space-y-2">
                {contactData.businessHours.map((hours, index) => (
                  <li key={index} className="text-lg" style={{ color: contactData.textColor }}>{hours}</li>
                ))}
              </ul>
            </motion.div>

            {/* Social Media */}
            <motion.div 
              variants={cardVariants}
              whileHover="hover"
              className="bg-white/10 backdrop-blur-sm p-6 rounded-xl shadow-lg border-2 border-white/20"
            >
              <h3 className="text-xl font-semibold mb-4" style={{ color: contactData.textColor }}>Connect With Us</h3>
              <div className="flex space-x-4">
                {contactData.socialMedia.map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="p-3 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
                    style={{ color: contactData.textColor }}
                  >
                    {social.name === "Facebook" && <FaFacebook size={24} />}
                    {social.name === "LinkedIn" && <FaLinkedin size={24} />}
                    {social.name === "Instagram" && <FaInstagram size={24} />}
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div 
            variants={itemVariants}
            className="bg-white rounded-xl shadow-2xl p-8"
          >
            <h3 className="text-2xl font-bold mb-6 text-gray-800">Send Us a Message</h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition-colors"
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition-colors"
                  required
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition-colors"
                  required
                ></textarea>
              </div>
              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-3 px-6 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold rounded-lg transition-colors shadow-md"
              >
                Send Message
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default Contact2;
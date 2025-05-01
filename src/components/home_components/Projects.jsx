import React, { useState } from "react";
import { FaMapMarkerAlt, FaPhone, FaClock, FaGraduationCap, FaArrowRight } from 'react-icons/fa';
import { motion } from "framer-motion";

const TrainingPrograms = () => {
  const [expandedId, setExpandedId] = useState(null);

  const programs = [
    {
      id: 1,
      title: "Construction Mastery",
      tagline: "Build the future with expert skills",
      description: "Comprehensive training in modern construction techniques using cutting-edge tools and safety protocols. Our 200-hour certification includes hands-on workshops with industry-standard equipment.",
      imageUrl: "https://images.unsplash.com/photo-1581093450021-4a7360e9a7e8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      location: "Dhaka Central Campus",
      phone: "+880 1234 567890",
      schedule: "Mon-Fri: 8AM-6PM | Weekends: 9AM-3PM",
      highlights: [
        "10,000 sqft training facility",
        "OSHA-certified instructors",
        "Job placement assistance"
      ],
      accentColor: "#F15A24"
    },
    {
      id: 2,
      title: "Heavy Machinery Pro",
      tagline: "Operate with precision & safety",
      description: "Master heavy equipment operation on our 5-acre training ground with 50+ machines. Certification includes 250 practice hours and simulator training for complex scenarios.",
      imageUrl: "https://images.unsplash.com/photo-1581094271901-8022df4466f9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      location: "Chittagong Industrial Zone",
      phone: "+880 9876 543210",
      schedule: "Daily: 7AM-7PM",
      highlights: [
        "Crane/Excavator/Forklift specialties",
        "Real-world obstacle courses",
        "Maintenance basics included"
      ],
      accentColor: "#FFC20E"
    },
    {
      id: 3,
      title: "Electrical Systems",
      tagline: "Power up your technical skills",
      description: "From residential wiring to commercial installations, our program combines NEC code training with 150+ hours of hands-on practice in fully equipped labs.",
      imageUrl: "https://images.unsplash.com/photo-1581093057305-5e0d60e2b53b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      location: "Sylhet Technical Hub",
      phone: "+880 1122 334455",
      schedule: "Sun-Thu: 9AM-5PM",
      highlights: [
        "Smart home technology training",
        "Solar installation modules",
        "Licensing exam prep"
      ],
      accentColor: "#00A0DC"
    },
    {
      id: 4,
      title: "Industrial Safety",
      tagline: "Protect your team & workplace",
      description: "Certification programs covering OSHA standards, emergency response, and hazard prevention. Features live fire simulations and virtual reality training scenarios.",
      imageUrl: "https://images.unsplash.com/photo-1581094271900-7dcc8d475d84?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      location: "Khulna Safety Academy",
      phone: "+880 5566 778899",
      schedule: "Mon-Sat: 8AM-4PM",
      highlights: [
        "15 specialized training labs",
        "CPR/First Aid certification",
        "Multilingual instructors"
      ],
      accentColor: "#8A2BE2"
    }
  ];

  return (
    <div className="bg-gradient-to-b from-gray-100 to-white min-h-screen py-20 px-6">
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto text-center mb-16"
      >
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          Professional Training Programs
        </h1>
        <div className="w-24 h-1 bg-orange-500 mx-auto mb-6" />
        <p className="text-xl text-gray-600">
          Equal opportunity excellence across all our specialized centers
        </p>
      </motion.div>

      {/* Programs Grid */}
      <div className="max-w-7xl mx-auto grid gap-10 md:grid-cols-2 lg:grid-cols-4">
        {programs.map((program) => (
          <motion.div
            key={program.id}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            whileHover={{ y: -10 }}
            className={`relative rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 ${expandedId === program.id ? 'ring-2' : ''}`}
            style={{ 
              maxWidth: '400px',
              minHeight: '550px',
              borderTop: `6px solid ${program.accentColor}`,
              borderColor: expandedId === program.id ? program.accentColor : 'transparent'
            }}
          >
            {/* Program Image */}
            <div className="h-48 overflow-hidden">
              <img
                src={program.imageUrl}
                alt={program.title}
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent" />
            </div>

            {/* Program Content */}
            <div className="p-6">
              <div className="flex items-start mb-4">
                <div 
                  className="p-3 rounded-lg mr-4"
                  style={{ backgroundColor: `${program.accentColor}20` }}
                >
                  <FaGraduationCap 
                    className="text-xl" 
                    style={{ color: program.accentColor }} 
                  />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900">{program.title}</h2>
                  <p className="text-sm text-gray-500">{program.tagline}</p>
                </div>
              </div>

              <p className={`text-gray-600 mb-4 ${expandedId === program.id ? '' : 'line-clamp-3'}`}>
                {program.description}
              </p>

              {expandedId === program.id && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="mb-4"
                >
                  <h3 className="font-semibold text-gray-800 mb-2">Program Highlights:</h3>
                  <ul className="space-y-2">
                    {program.highlights.map((item, i) => (
                      <li key={i} className="flex items-start">
                        <div 
                          className="w-5 h-5 rounded-full flex items-center justify-center mt-0.5 mr-2 flex-shrink-0"
                          style={{ backgroundColor: `${program.accentColor}20` }}
                        >
                          <div 
                            className="w-2 h-2 rounded-full"
                            style={{ backgroundColor: program.accentColor }}
                          />
                        </div>
                        <span className="text-gray-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )}

              <div className="absolute bottom-6 left-6 right-6">
                <div className="flex flex-wrap gap-3 mb-4">
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="px-4 py-2 rounded-lg text-sm font-medium flex items-center"
                    style={{ 
                      backgroundColor: program.accentColor,
                      color: 'white'
                    }}
                  >
                    Enroll Now <FaArrowRight className="ml-2" />
                  </motion.button>
                  <button
                    onClick={() => setExpandedId(expandedId === program.id ? null : program.id)}
                    className="px-4 py-2 rounded-lg text-sm font-medium border"
                    style={{ 
                      borderColor: program.accentColor,
                      color: program.accentColor
                    }}
                  >
                    {expandedId === program.id ? 'Less Info' : 'More Info'}
                  </button>
                </div>

                <div className="border-t border-gray-200 pt-3">
                  <div className="flex items-center text-xs text-gray-500 mb-1">
                    <FaMapMarkerAlt className="mr-2" />
                    <span>{program.location}</span>
                  </div>
                  <div className="flex items-center text-xs text-gray-500">
                    <FaClock className="mr-2" />
                    <span>{program.schedule}</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="text-center mt-20"
      >
        <h3 className="text-2xl font-bold text-gray-900 mb-4">
          Ready to advance your career?
        </h3>
        <motion.a
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          href="#"
          className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold rounded-lg shadow-lg"
        >
          Compare All Programs <FaArrowRight className="ml-3" />
        </motion.a>
      </motion.div>
    </div>
  );
};

export default TrainingPrograms;
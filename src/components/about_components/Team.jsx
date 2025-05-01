import React, { useState, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

// Color scheme constants
const COLORS = {
  primary: "#2E8B57", // Green
  primaryLight: "#3CB371", // Lighter Green
  primaryDark: "#1E5A3A", // Darker Green
  secondary: "#FFD700", // Gold/Yellow
  secondaryLight: "#FFEC8B", // Lighter Yellow
  secondaryDark: "#FFC125", // Darker Yellow
  accent: "#FF7F50", // Coral/Orange
  lightGray: "#F8F8F8",
  darkGray: "#2D2D2D",
  white: "#FFFFFF",
  black: "#000000"
};

const GRADIENTS = {
  primary: `linear-gradient(135deg, ${COLORS.primary} 0%, ${COLORS.primaryLight} 100%)`,
  secondary: `linear-gradient(135deg, ${COLORS.secondary} 0%, ${COLORS.secondaryLight} 100%)`,
  dark: `linear-gradient(135deg, ${COLORS.darkGray} 0%, ${COLORS.black} 100%)`
};

const TeamMemberCard = ({ member, index }) => {
  console.log(member)
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

  const variants = {
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.5,
        delay: index * 0.1
      } 
    },
    hidden: { 
      opacity: 0, 
      y: 50 
    }
  };

  // Safe image URL handling
  const getImageUrl = () => {
    if (!member?.image) return 'https://via.placeholder.com/150';
    try {
      return member.image.replace(/([^:]\/)\/+/g, "$1");
    } catch {
      return 'https://via.placeholder.com/150';
    }
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={variants}
      whileHover={{ y: -10 }}
      className="flex flex-col items-center p-6 rounded-xl shadow-lg"
      style={{
        background: COLORS.white,
        border: `2px solid ${COLORS.lightGray}`,
        boxShadow: `0 10px 30px ${COLORS.darkGray}10`
      }}
    >
      <div className="relative mb-4">
        <div className="w-32 h-32 rounded-full overflow-hidden border-4" 
          style={{ borderColor: COLORS.secondary }}>
          <img 
            src={getImageUrl()} 
            alt={member?.name || "Team member"}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = 'https://via.placeholder.com/150';
            }}
          />
        </div>
        <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 px-4 py-1 rounded-full"
          style={{ background: GRADIENTS.primary }}>
          <span className="text-xs font-bold text-white">{member?.years || "Experienced"}</span>
        </div>
      </div>
      <h3 className="text-xl font-bold mb-1" style={{ color: COLORS.primaryDark }}>
        {member?.name || "Team Member"}
      </h3>
      <p className="text-sm mb-2" style={{ color: COLORS.primary }}>
        {member?.position || "Position"}
      </p>
      <div className="flex items-center justify-center mb-3">
        <div className="w-4 h-4 rounded-full mr-2" style={{ background: COLORS.secondary }} />
        <p className="text-sm font-medium" style={{ color: COLORS.darkGray }}>
          {member?.expertise || "Expertise"}
        </p>
      </div>
      <button 
        className="px-4 py-2 rounded-full text-sm font-medium transition-all hover:bg-green-600 hover:text-white"
        style={{ 
          background: COLORS.lightGray,
          color: COLORS.primaryDark,
          border: `1px solid ${COLORS.primary}20`
        }}
      >
        View Profile
      </button>
    </motion.div>
  );
};

const Team = () => {
  const [team, setTeam] = useState({
    bgColor: COLORS.white,
    textColor: COLORS.darkGray,
    teamInfo: {
      headings: {
        title: "Our Recruitment Experts",
        subheading: "The team connecting exceptional talent with outstanding opportunities"
      },
      members: [
        {
          name: "Sarah Johnson",
          position: "Senior Recruitment Partner",
          image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=500&auto=format&fit=crop&q=60",
          expertise: "Healthcare Staffing",
          years: "12+ years experience"
        },
        {
          name: "Michael Chen",
          position: "Talent Acquisition Head",
          image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=500&auto=format&fit=crop&q=60",
          expertise: "Engineering Recruitment",
          years: "15+ years experience"
        },
        {
          name: "Priya Patel",
          position: "Client Relations Director",
          image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=500&auto=format&fit=crop&q=60",
          expertise: "Executive Search",
          years: "10+ years experience"
        },
        {
          name: "David Wilson",
          position: "Workforce Solutions Manager",
          image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&auto=format&fit=crop&q=60",
          expertise: "Industrial Staffing",
          years: "8+ years experience"
        }
      ]
    }
  });

  const apiUrl = import.meta.env.VITE_API_URL;
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: false
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [teamData] = await Promise.all([
          fetch(`${apiUrl}/about/team`).then(res => res.json()),
        ]);
        console.log(teamData)
        // Safely update the state with fallbacks
        setTeam(prev => ({
          bgColor: teamData?.bgColor || prev.bgColor,
          textColor: teamData?.textColor || prev.textColor,
          teamInfo: {
            headings: {
              title: teamData?.teamInfo?.headings?.title || prev.teamInfo.headings.title,
              subheading: teamData?.teamInfo?.headings?.subheading || prev.teamInfo.headings.subheading
            },
            members: teamData?.teamInfo?.members?.map(member => ({
              name: member?.name || "Team Member",
              position: member?.position || "Position",
              image: member?.imageUrl|| 'https://via.placeholder.com/150',
              expertise: member?.expertise || "Expertise",
              years: member?.years || "Experience"
            })) || prev.teamInfo.members
          }
        }));
      } catch (err) {
        console.log('Using default team data');
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

  const containerVariants = {
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    },
    hidden: { opacity: 0 }
  };

  return (
    <section 
      className="py-20 px-4 relative overflow-hidden"
      style={{ backgroundColor: team.bgColor || COLORS.white }}
      ref={ref}
    >
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
        <div className="absolute top-20 left-10 w-40 h-40 rounded-full" 
          style={{ background: GRADIENTS.primary }} />
        <div className="absolute bottom-10 right-10 w-60 h-60 rounded-full" 
          style={{ background: GRADIENTS.secondary }} />
      </div>

      <motion.div
        initial="hidden"
        animate={controls}
        variants={containerVariants}
        className="container mx-auto relative z-10"
      >
        {/* Section header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <motion.div 
            className="inline-block px-6 py-2 rounded-full mb-4"
            style={{ background: GRADIENTS.secondary }}
            initial={{ scale: 0 }}
            animate={inView ? { scale: 1 } : {}}
            transition={{ delay: 0.2 }}
          >
            <span className="text-sm font-bold uppercase tracking-wider text-black">
              Meet The Experts
            </span>
          </motion.div>
          <h2 
            className="text-4xl md:text-5xl font-bold mb-4"
            style={{ color: team.textColor || COLORS.darkGray }}
          >
            {team.teamInfo.headings.title}
          </h2>
          <div className="w-20 h-1 mx-auto mb-6" style={{ background: GRADIENTS.primary }} />
          <p 
            className="text-xl max-w-3xl mx-auto"
            style={{ color: team.textColor || COLORS.darkGray }}
          >
            {team.teamInfo.headings.subheading}
          </p>
        </motion.div>

        {/* Team members grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {team.teamInfo.members.map((member, index) => (
            <TeamMemberCard key={index} member={member} index={index} />
          ))}
        </div>

        {/* CTA section */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
        >
          <motion.button 
            className="px-8 py-3 rounded-full font-bold uppercase tracking-wider"
            style={{ 
              background: GRADIENTS.primary,
              color: COLORS.white,
              boxShadow: `0 5px 15px ${COLORS.primary}40`
            }}
            whileHover={{ 
              y: -3,
              boxShadow: `0 8px 25px ${COLORS.primary}60`
            }}
            whileTap={{ scale: 0.95 }}
          >
            Join Our Team
          </motion.button>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Team;
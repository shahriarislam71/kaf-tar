import React, { useState, useEffect } from 'react';
import { Button, Spin, Statistic, Row, Col, Tag } from 'antd';
import { PlayCircleOutlined, CheckCircleOutlined } from '@ant-design/icons';

const DEFAULT_DATA = {
  headline: "Building Dreams, Crafting Reality",
  subheadline: "Premium Construction Services",
  tagline: "Stech Builders delivers exceptional construction services with 15+ years of experience in residential and commercial projects.",
  primaryButton: {
    text: "Get Free Quote",
    link: "/contact"
  },
  secondaryButton: {
    text: "View Projects",
    link: "/projects"
  },
  backgroundImage: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
  stats: [
    {
      value: "15+",
      label: "Years Experience"
    },
    {
      value: "200+",
      label: "Projects Completed"
    },
    {
      value: "50+",
      label: "Happy Clients"
    }
  ],
  featuredServices: [
    "Residential Construction",
    "Commercial Projects",
    "Renovations"
  ],
  ctaStyle: {
    primaryColor: "#2ecc71", // Vibrant green
    secondaryColor: "#f1c40f", // Vibrant yellow
    textColor: "#ffffff"
  }
};

const Hero = ({ isEditing = false, onEdit }) => {
  const [heroData, setHeroData] = useState(DEFAULT_DATA);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchHeroData = async () => {
      try {
        setIsLoading(true);
        const apiUrl = import.meta.env.VITE_API_URL;
        const response = await fetch(`${apiUrl}/home/hero/`);
        if (!response.ok) {
          throw new Error('Failed to fetch hero data');
        }
        const data = await response.json();
        setHeroData(data);
      } catch (err) {
        console.error('Error fetching hero data:', err);
        setError(err.message);
        // Fall back to default data
        setHeroData(DEFAULT_DATA);
      } finally {
        setIsLoading(false);
      }
    };

    fetchHeroData();
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-96">
        <Spin size="large" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-10 text-red-500">
        Error loading hero section: {error}
      </div>
    );
  }

  return (
    <section 
      className="relative h-screen min-h-[600px] flex items-center overflow-hidden"
      style={{
        backgroundImage: `linear-gradient(135deg, rgba(0, 0, 0, 0.7) 0%, rgba(46, 204, 113, 0.3) 100%), url(${heroData.backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* Edit Button (only shown in admin mode) */}
      {isEditing && (
        <button 
          onClick={onEdit}
          className="absolute top-4 right-4 z-10 bg-white text-green-600 px-4 py-2 rounded-lg shadow-md hover:bg-green-50 transition-all font-semibold"
        >
          Edit Hero
        </button>
      )}

      <div className="container mx-auto px-6 z-10">
        <div className="max-w-2xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight drop-shadow-lg">
            {heroData.headline}
            <span className="block w-20 h-2 bg-green-400 mt-4 rounded-full"></span>
          </h1>
          
          <h2 className="text-xl md:text-2xl text-green-300 mb-6 font-medium">
            {heroData.subheadline}
          </h2>
          
          <p className="text-white text-lg mb-8 max-w-lg leading-relaxed">
            {heroData.tagline}
          </p>
          
          {/* Featured Services */}
          <div className="flex flex-wrap gap-2 mb-8">
            {heroData?.featuredServices?.map((service, index) => (
              <Tag 
                key={index} 
                icon={<CheckCircleOutlined className="text-green-400" />}
                className="bg-black bg-opacity-40 text-white border border-green-400 rounded-full px-4 py-1 text-sm md:text-base hover:bg-green-500 hover:bg-opacity-30 transition-all"
              >
                {service}
              </Tag>
            ))}
          </div>
          
          {/* Call to Action Buttons */}
          <div className="flex flex-wrap gap-4 mb-12">
            <Button
              href={heroData.primaryButton.link}
              size="large"
              style={{
                backgroundColor: heroData.ctaStyle.primaryColor,
                color: heroData.ctaStyle.textColor,
                border: 'none',
                fontWeight: 600,
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
              }}
              className="px-8 h-12 hover:bg-green-600 hover:transform hover:scale-105 transition-all duration-300 rounded-lg"
            >
              {heroData.primaryButton.text}
            </Button>
            
            <Button
              href={heroData.secondaryButton.link}
              size="large"
              style={{
                backgroundColor: heroData.ctaStyle.secondaryColor,
                color: '#2c3e50',
                border: 'none',
                fontWeight: 600,
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
              }}
              className="px-8 h-12 hover:bg-yellow-500 hover:transform hover:scale-105 transition-all duration-300 rounded-lg"
            >
              {heroData.secondaryButton.text}
            </Button>
          </div>
          
          {/* Statistics */}
          <Row gutter={16} className="bg-black bg-opacity-40 backdrop-blur-sm rounded-lg p-6 max-w-3xl border border-green-400 border-opacity-30">
            {heroData.stats.map((stat, index) => (
              <Col xs={24} sm={8} key={index} className="mb-4 sm:mb-0">
                <Statistic
                  title={<span className="text-green-300 font-medium">{stat.label}</span>}
                  value={stat.value}
                  valueStyle={{ 
                    color: '#fff', 
                    fontSize: '32px', 
                    fontWeight: 'bold',
                    textShadow: '0 2px 4px rgba(0,0,0,0.3)'
                  }}
                  className="text-center"
                  prefix={
                    <span className="inline-block w-2 h-2 bg-green-400 rounded-full mr-2"></span>
                  }
                />
              </Col>
            ))}
          </Row>
        </div>
      </div>
      
      {/* Decorative Elements */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <svg 
          className="w-10 h-10 text-green-400 drop-shadow-lg" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
          style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))' }}
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
        </svg>
      </div>
    </section>
  );
};

export default Hero;
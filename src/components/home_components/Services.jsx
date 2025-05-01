import { useState, useEffect } from 'react';
import { message, Card, Row, Col, Typography, Button, Divider } from 'antd';
import { RightOutlined, LeftOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

const ServiceExplorer = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const apiUrl = import.meta.env.VITE_API_URL;

  // Fetch services data
  useEffect(() => {
    const fetchServices = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${apiUrl}/home/services/`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch services');
        }
        
        const data = await response.json();
        setServices(data.services || []);
      } catch (error) {
        console.error('Error fetching services:', error);
        message.warning('Using demo services data');
        setServices([
          {
            "title": "Residential Construction",
            "icon": "🏠",
            "description": "Custom home building and remodeling services tailored to your unique vision and lifestyle needs.",
            "features": [
              "Custom home design",
              "Energy-efficient construction",
              "Luxury finishes"
            ]
          },
          {
            "title": "Commercial Construction",
            "icon": "🏢",
            "description": "Professional commercial building services for offices, retail spaces, and industrial facilities.",
            "features": [
              "Project management",
              "Timely delivery",
              "Commercial zoning compliance"
            ]
          },
          {
            "title": "Renovation Services",
            "icon": "🛠️",
            "description": "Transform your existing space with our comprehensive renovation solutions.",
            "features": [
              "Kitchen remodeling",
              "Bathroom upgrades",
              "Structural improvements"
            ]
          },
          {
            "title": "Construction Management",
            "icon": "📊",
            "description": "Professional oversight of your construction project from start to finish.",
            "features": [
              "Budget control",
              "Schedule management",
              "Quality assurance"
            ]
          }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, [apiUrl]);

  const nextService = () => {
    setActiveIndex((prevIndex) => 
      prevIndex === services.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevService = () => {
    setActiveIndex((prevIndex) => 
      prevIndex === 0 ? services.length - 1 : prevIndex - 1
    );
  };

  if (loading) {
    return <div style={{ textAlign: 'center', padding: '40px' }}>Loading services...</div>;
  }

  if (!services.length) {
    return <div style={{ textAlign: 'center', padding: '40px' }}>No services available</div>;
  }

  const activeService = services[activeIndex];

  return (
    <div style={{ 
      background: 'linear-gradient(135deg, #f5f7fa 0%, #e4efe9 100%)',
      padding: '40px 20px',
      borderRadius: '12px',
      margin: '20px 0'
    }}>
      <Title level={2} style={{ 
        textAlign: 'center', 
        marginBottom: '40px',
        color: '#2c3e50',
        fontWeight: '600'
      }}>
        Our Construction Services
      </Title>
      
      <Row justify="center" gutter={[24, 24]}>
        <Col xs={24} md={18} lg={16}>
          <Card
            hoverable
            style={{
              borderRadius: '16px',
              boxShadow: '0 8px 24px rgba(0, 0, 0, 0.1)',
              border: 'none',
              overflow: 'hidden'
            }}
            bodyStyle={{ padding: '32px' }}
          >
            <div style={{ 
              display: 'flex', 
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center'
            }}>
              <div style={{
                fontSize: '48px',
                marginBottom: '20px',
                background: 'linear-gradient(45deg, #27ae60, #2ecc71)',
                width: '80px',
                height: '80px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white'
              }}>
                {activeService.icon}
              </div>
              
              <Title level={3} style={{ 
                color: '#2c3e50',
                marginBottom: '16px'
              }}>
                {activeService.title}
              </Title>
              
              <Text style={{ 
                fontSize: '16px',
                color: '#7f8c8d',
                marginBottom: '24px',
                maxWidth: '600px'
              }}>
                {activeService.description}
              </Text>
              
              <Divider style={{ borderColor: '#e0e0e0' }} />
              
              <div style={{ 
                width: '100%',
                textAlign: 'left',
                marginBottom: '24px'
              }}>
                <Title level={4} style={{ 
                  color: '#27ae60',
                  marginBottom: '16px'
                }}>
                  Key Features:
                </Title>
                <ul style={{ 
                  paddingLeft: '20px',
                  listStyleType: 'none'
                }}>
                  {activeService.features.map((feature, index) => (
                    <li key={index} style={{ 
                      marginBottom: '8px',
                      position: 'relative',
                      paddingLeft: '24px',
                      color: '#34495e'
                    }}>
                      <span style={{
                        position: 'absolute',
                        left: 0,
                        color: '#27ae60'
                      }}>✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
              
              <div style={{ 
                display: 'flex',
                justifyContent: 'center',
                gap: '16px',
                marginTop: '24px'
              }}>
                <Button 
                  shape="circle" 
                  icon={<LeftOutlined />} 
                  onClick={prevService}
                  style={{
                    background: '#f39c12',
                    color: 'white',
                    border: 'none',
                    width: '40px',
                    height: '40px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                />
                
                <Button 
                  type="primary" 
                  size="large"
                  style={{
                    background: 'linear-gradient(45deg, #27ae60, #2ecc71)',
                    border: 'none',
                    borderRadius: '24px',
                    padding: '0 32px',
                    height: '40px',
                    fontWeight: '500',
                    boxShadow: '0 4px 12px rgba(39, 174, 96, 0.3)'
                  }}
                >
                  Learn More
                </Button>
                
                <Button 
                  shape="circle" 
                  icon={<RightOutlined />} 
                  onClick={nextService}
                  style={{
                    background: '#f39c12',
                    color: 'white',
                    border: 'none',
                    width: '40px',
                    height: '40px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                />
              </div>
            </div>
          </Card>
        </Col>
      </Row>
      
      <div style={{ 
        display: 'flex',
        justifyContent: 'center',
        marginTop: '24px',
        gap: '8px'
      }}>
        {services.map((_, index) => (
          <div 
            key={index}
            onClick={() => setActiveIndex(index)}
            style={{
              width: '12px',
              height: '12px',
              borderRadius: '50%',
              background: index === activeIndex ? '#27ae60' : '#bdc3c7',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default ServiceExplorer;
import React, { useState, useEffect, useRef } from 'react';
import { Layout, Typography, Row, Col, Card, Button, Space, Divider } from 'antd';
import { useNavigate } from 'react-router-dom';
import { RocketOutlined, TrophyOutlined, TeamOutlined, GlobalOutlined, ContactsTwoTone, ContactsOutlined } from '@ant-design/icons';
const { Header, Content } = Layout;
const { Title, Text, Paragraph } = Typography;

const AboutPage = () => {
  const navigate = useNavigate();
  const [animated, setAnimated] = useState(false);
  const statsRef = useRef(null);

  useEffect(() => {
    setAnimated(true);
  }, []);

  // Brand colors - adjust these to match your exact brand
  const brandColors = {
    primary: '#C1272D', // Your red
    secondary: '#1C2951', // Your blue
    accent: '#667eea', // Purple accent
    background: '#f8f9fa',
    text: '#333333'
  };

  return (
    <Layout style={{ 
      minHeight: "100vh", 
      background: brandColors.background,
      position: 'relative'
    }}>
      {/* Subtle background pattern */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: `linear-gradient(135deg, ${brandColors.secondary}15 0%, ${brandColors.primary}10 100%)`,
        zIndex: 0
      }}></div>

      <Header
        style={{
          background: 'rgba(255, 255, 255, 0.95)',
          padding: "0 50px",
          height: "80px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          borderBottom: `1px solid ${brandColors.primary}20`,
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          backdropFilter: "blur(10px)",
          boxShadow: "0 2px 20px rgba(0, 0, 0, 0.08)"
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <div style={{
            width: '45px',
            height: '45px',
            background: `linear-gradient(135deg, ${brandColors.primary} 0%, ${brandColors.secondary} 100%)`,
            borderRadius: '10px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontSize: '18px',
            marginRight: '12px',
            fontWeight: 'bold'
          }}>
            CA
          </div>
          <Title level={3} style={{ 
            color: brandColors.secondary, 
            margin: 0, 
            fontWeight: 700,
            background: `linear-gradient(135deg, ${brandColors.primary}, ${brandColors.secondary})`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}>
            Cordova Academy
          </Title>
        </div>
  <Button 
          onClick={() => navigate('/')} 
          type="primary"
          style={{ 
            background: 'rgba(193, 39, 45, 0.8)',
            borderColor: 'rgba(255, 255, 255, 0.3)',
            borderRadius: '25px',
            color: 'white',
            fontWeight: 600,
            backdropFilter: 'blur(10px)'
          }}
        >
          🏠 Back to Home
        </Button>
      </Header>

      <Content style={{ padding: '0', marginTop: '80px', position: 'relative', zIndex: 1 }}>
        
        {/* Hero Section */}
        <div style={{ 
          background: `linear-gradient(135deg, ${brandColors.secondary} 0%, ${brandColors.primary} 100%)`,
          padding: '100px 50px',
          textAlign: 'center',
          color: 'white',
          position: 'relative'
        }}>
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <Title level={1} style={{ 
              color: 'white', 
              fontSize: '3.5rem', 
              marginBottom: '24px',
              fontWeight: 700
            }}>
              About Cordova Academy
            </Title>
            
            <Paragraph style={{ 
              color: 'rgba(255,255,255,0.9)', 
              fontSize: '1.3rem', 
              lineHeight: 1.6,
              marginBottom: '40px'
            }}>
              Where excellence in education meets innovation, creating tomorrow's leaders through 
              personalized learning and cutting-edge curriculum.
            </Paragraph>

            <Button 
              size="large"
              onClick={() => navigate('/contact')} 
              style={{ 
                background: 'rgba(255, 255, 255, 0.2)',
                border: '2px solid rgba(255, 255, 255, 0.3)',
                borderRadius: '25px',
                padding: '0 40px',
                height: '50px',
                fontSize: '16px',
                fontWeight: 600,
                color: 'white',
                backdropFilter: 'blur(10px)',
                transition: 'all 0.3s ease'
              }}
              icon={<ContactsOutlined />}
              onMouseEnter={(e) => {
                e.target.style.background = 'rgba(255, 255, 255, 0.3)';
                e.target.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.target.style.background = 'rgba(255, 255, 255, 0.2)';
                e.target.style.transform = 'translateY(0)';
              }}
            >
              Contact Us
            </Button>
          </div>
        </div>

        {/* Mission & Vision Section */}
        <div style={{ margin: '80px 50px' }}>
          <Row gutter={[40, 40]} justify="center">
            <Col xs={24} md={12}>
              <Card 
                style={{ 
                  borderRadius: '20px',
                  border: 'none',
                  background: 'white',
                  boxShadow: '0 10px 30px rgba(0, 0, 0, 0.08)',
                  height: '100%',
                  transition: 'all 0.3s ease'
                }}
                hoverable
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-5px)';
                  e.currentTarget.style.boxShadow = '0 15px 40px rgba(0, 0, 0, 0.12)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.08)';
                }}
              >
                <div style={{ textAlign: 'center', marginBottom: '30px' }}>
                  <div style={{
                    width: '70px',
                    height: '70px',
                    background: `linear-gradient(135deg, ${brandColors.primary}20, ${brandColors.secondary}20)`,
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 20px',
                    color: brandColors.primary,
                    fontSize: '30px',
                    border: `2px solid ${brandColors.primary}30`
                  }}>
                    🎯
                  </div>
                  <Title level={2} style={{ color: brandColors.secondary, marginBottom: '16px' }}>Our Mission</Title>
                </div>
                <Paragraph style={{ 
                  color: brandColors.text, 
                  fontSize: '16px', 
                  lineHeight: 1.7,
                  textAlign: 'center'
                }}>
                  To provide exceptional education that empowers students to achieve their full potential, 
                  fostering intellectual curiosity, creativity, and lifelong learning in a supportive community.
                </Paragraph>
              </Card>
            </Col>

            <Col xs={24} md={12}>
              <Card 
                style={{ 
                  borderRadius: '20px',
                  border: 'none',
                  background: 'white',
                  boxShadow: '0 10px 30px rgba(0, 0, 0, 0.08)',
                  height: '100%',
                  transition: 'all 0.3s ease'
                }}
                hoverable
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-5px)';
                  e.currentTarget.style.boxShadow = '0 15px 40px rgba(0, 0, 0, 0.12)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.08)';
                }}
              >
                <div style={{ textAlign: 'center', marginBottom: '30px' }}>
                  <div style={{
                    width: '70px',
                    height: '70px',
                    background: `linear-gradient(135deg, ${brandColors.secondary}20, ${brandColors.accent}20)`,
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 20px',
                    color: brandColors.secondary,
                    fontSize: '30px',
                    border: `2px solid ${brandColors.secondary}30`
                  }}>
                    🌟
                  </div>
                  <Title level={2} style={{ color: brandColors.secondary, marginBottom: '16px' }}>Our Vision</Title>
                </div>
                <Paragraph style={{ 
                  color: brandColors.text, 
                  fontSize: '16px', 
                  lineHeight: 1.7,
                  textAlign: 'center'
                }}>
                  To be a leading educational institution that shapes innovative thinkers and responsible 
                  global citizens, driving positive change through excellence in teaching and learning.
                </Paragraph>
              </Card>
            </Col>
          </Row>
        </div>

        {/* Features Section */}
        <div style={{ margin: '80px 50px' }}>
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <Title level={2} style={{ color: brandColors.secondary, marginBottom: '16px' }}>
              Why Choose Cordova Academy?
            </Title>
            <Text style={{ color: brandColors.text, fontSize: '18px' }}>
              Discover what makes our educational experience exceptional
            </Text>
          </div>

          <Row gutter={[30, 30]}>
            <Col xs={24} md={12}>
              <Card 
                bordered={false}
                style={{ 
                  borderRadius: '15px',
                  background: 'white',
                  boxShadow: '0 5px 20px rgba(0, 0, 0, 0.06)',
                  height: '100%',
                  transition: 'all 0.3s ease'
                }}
                hoverable
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-3px)';
                  e.currentTarget.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.1)';
                }}
              >
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '20px' }}>
                  <div style={{
                    width: '50px',
                    height: '50px',
                    background: `linear-gradient(135deg, ${brandColors.primary}15, ${brandColors.primary}30)`,
                    borderRadius: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: brandColors.primary,
                    fontSize: '20px',
                    flexShrink: 0
                  }}>
                    🚀
                  </div>
                  <div>
                    <Title level={4} style={{ color: brandColors.secondary, marginBottom: '8px' }}>
                      Future-Ready Curriculum
                    </Title>
                    <Paragraph style={{ color: brandColors.text, margin: 0, lineHeight: 1.6 }}>
                      Our curriculum integrates cutting-edge technologies and 21st-century skills, 
                      preparing students for the challenges and opportunities of tomorrow's world.
                    </Paragraph>
                  </div>
                </div>
              </Card>
            </Col>

            <Col xs={24} md={12}>
              <Card 
                bordered={false}
                style={{ 
                  borderRadius: '15px',
                  background: 'white',
                  boxShadow: '0 5px 20px rgba(0, 0, 0, 0.06)',
                  height: '100%',
                  transition: 'all 0.3s ease'
                }}
                hoverable
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-3px)';
                  e.currentTarget.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.1)';
                }}
              >
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '20px' }}>
                  <div style={{
                    width: '50px',
                    height: '50px',
                    background: `linear-gradient(135deg, ${brandColors.secondary}15, ${brandColors.secondary}30)`,
                    borderRadius: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: brandColors.secondary,
                    fontSize: '20px',
                    flexShrink: 0
                  }}>
                    🌈
                  </div>
                  <div>
                    <Title level={4} style={{ color: brandColors.secondary, marginBottom: '8px' }}>
                      Student Wellness Focus
                    </Title>
                    <Paragraph style={{ color: brandColors.text, margin: 0, lineHeight: 1.6 }}>
                      We prioritize mental health and well-being with comprehensive support systems, 
                      mindfulness programs, and a nurturing community environment.
                    </Paragraph>
                  </div>
                </div>
              </Card>
            </Col>
          </Row>
        </div>

        {/* Stats Section */}
        <div style={{ 
          background: `linear-gradient(135deg, ${brandColors.secondary}05 0%, ${brandColors.primary}05 100%)`,
          borderRadius: '20px',
          padding: '60px 50px',
          margin: '0 50px 80px',
          textAlign: 'center'
        }}>
          <Title level={2} style={{ color: brandColors.secondary, marginBottom: '50px' }}>
            Our Impact in Numbers
          </Title>
          <Row gutter={[40, 40]}>
            {[
              { icon: '🏆', value: '98%', label: 'Graduation Rate' },
              { icon: '👨‍🏫', value: '150+', label: 'Expert Educators' },
              { icon: '🌍', value: 'In Ethiopia', label: 'Pride of ethiopia' }
                 ].map((stat, index) => (
              <Col xs={12} md={6} key={index}>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ 
                    fontSize: '40px', 
                    marginBottom: '16px',
                    color: brandColors.primary
                  }}>
                    {stat.icon}
                  </div>
                  <Title level={1} style={{ 
                    color: brandColors.secondary, 
                    margin: 0,
                    fontSize: '2.5rem',
                    fontWeight: 700
                  }}>
                    {stat.value}
                  </Title>
                  <Text style={{ 
                    color: brandColors.text,
                    fontSize: '14px',
                    fontWeight: 600
                  }}>
                    {stat.label}
                  </Text>
                </div>
              </Col>
            ))}
          </Row>
        </div>

      </Content>
    </Layout>
  );
};

export default AboutPage;
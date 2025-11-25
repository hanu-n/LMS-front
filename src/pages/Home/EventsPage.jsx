import React, { useState, useEffect } from 'react';
import { Layout, Typography, Row, Col, Card, Button, Space, Tag, Input } from 'antd';

import { useNavigate } from 'react-router-dom';
import { CalendarOutlined, RocketOutlined, BellOutlined, TeamOutlined, TrophyOutlined, GlobalOutlined } from '@ant-design/icons';
import toast from 'react-hot-toast';

const { Header, Content } = Layout;
const { Title, Text, Paragraph } = Typography;

const EventsPage = () => {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [email, setEmail] = useState('');

  // Brand colors
  const brandColors = {
    primary: '#C1272D',
    secondary: '#1C2951',
    accent: '#667eea',
    background: '#f8f9fa',
    text: '#333333'
  };

  // Countdown to a future date (e.g., 30 days from now)
  useEffect(() => {
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + 30);

    const timer = setInterval(() => {
      const now = new Date();
      const difference = targetDate - now;

      if (difference > 0) {
        setCountdown({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000)
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const upcomingEvents = [
    {
      title: "Annual Science Fair",
      description: "Showcasing innovative projects from our talented students",
      date: "Coming Soon",
      type: "academic",
      icon: "🔬"
    },
    {
      title: "Sports Championship",
      description: "Inter-school athletic competition and team spirit showcase",
      date: "Coming Soon",
      type: "sports",
      icon: "⚽"
    },
    {
      title: "Cultural Festival",
      description: "Celebrating diversity through art, music, and performances",
      date: "Coming Soon",
      type: "cultural",
      icon: "🎭"
    },
    {
      title: "Career Guidance Week",
      description: "Industry experts sharing insights about future opportunities",
      date: "Coming Soon",
      type: "academic",
      icon: "💼"
    }
  ];

  const eventTypes = [
    { name: "Academic", color: brandColors.primary, icon: "📚" },
    { name: "Sports", color: "#10b981", icon: "🏆" },
    { name: "Cultural", color: "#8b5cf6", icon: "🎨" },
    { name: "Community", color: "#f59e0b", icon: "🤝" }
  ];

  return (
    <Layout style={{ 
      minHeight: "100vh", 
      background: brandColors.background,
      position: 'relative'
    }}>
      {/* Animated Background Elements */}
      <div style={{
        position: 'absolute',
        top: '10%',
        left: '5%',
        width: '100px',
        height: '100px',
        background: `radial-gradient(circle, ${brandColors.primary}15 0%, transparent 70%)`,
        borderRadius: '50%',
        animation: 'float 8s ease-in-out infinite',
        zIndex: 0
      }}></div>
      <div style={{
        position: 'absolute',
        top: '60%',
        right: '10%',
        width: '150px',
        height: '150px',
        background: `radial-gradient(circle, ${brandColors.secondary}10 0%, transparent 70%)`,
        borderRadius: '50%',
        animation: 'float 10s ease-in-out infinite 2s',
        zIndex: 0
      }}></div>

      <style>
        {`
          @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
          }
          @keyframes pulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.05); }
          }
          @keyframes glow {
            0%, 100% { box-shadow: 0 0 20px ${brandColors.primary}30; }
            50% { box-shadow: 0 0 30px ${brandColors.primary}50; }
          }
        `}
      </style>

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
          position: 'relative',
          overflow: 'hidden'
        }}>
          {/* Floating particles */}
          {[...Array(15)].map((_, i) => (
            <div
              key={i}
              style={{
                position: 'absolute',
                width: `${Math.random() * 8 + 4}px`,
                height: `${Math.random() * 8 + 4}px`,
                background: 'rgba(255, 255, 255, 0.3)',
                borderRadius: '50%',
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animation: `float ${Math.random() * 8 + 4}s ease-in-out infinite`,
                animationDelay: `${Math.random() * 3}s`
              }}
            />
          ))}

          <div style={{ maxWidth: '800px', margin: '0 auto', position: 'relative', zIndex: 2 }}>
            <div style={{
              fontSize: '80px',
              marginBottom: '20px',
              animation: 'pulse 2s ease-in-out infinite'
            }}>
              🎉
            </div>
            <Title level={1} style={{ 
              color: 'white', 
              fontSize: '3.5rem', 
              marginBottom: '16px',
              fontWeight: 700
            }}>
              Amazing Events Are Coming!
            </Title>
            
            <Paragraph style={{ 
              color: 'rgba(255,255,255,0.9)', 
              fontSize: '1.3rem', 
              lineHeight: 1.6,
              marginBottom: '40px'
            }}>
              We're preparing something extraordinary! Get ready for unforgettable experiences, 
              learning opportunities, and community celebrations at Cordova Academy.
            </Paragraph>

            <Space size="middle">
              <Button 
                size="large"
                style={{ 
                  background: 'rgba(255, 255, 255, 0.2)',
                  border: '2px solid rgba(255, 255, 255, 0.3)',
                  borderRadius: '25px',
                  padding: '0 30px',
                  height: '50px',
                  fontSize: '16px',
                  fontWeight: 600,
                  color: 'white',
                  backdropFilter: 'blur(10px)'
                }}
                icon={<BellOutlined />}
              >
                Notify Me
              </Button>
              <Button 
                size="large"
                style={{ 
                  background: 'rgba(255, 255, 255, 0.9)',
                  border: 'none',
                  borderRadius: '25px',
                  padding: '0 30px',
                  height: '50px',
                  fontSize: '16px',
                  fontWeight: 600,
                  color: brandColors.primary
                }}
                icon={<CalendarOutlined />}
              >
                View Calendar
              </Button>
            </Space>
          </div>
        </div>

        {/* Countdown Timer */}
        <div style={{ 
          background: 'white',
          margin: '-40px 50px 60px',
          borderRadius: '20px',
          padding: '40px',
          boxShadow: '0 15px 35px rgba(0, 0, 0, 0.1)',
          textAlign: 'center',
          position: 'relative',
          zIndex: 3
        }}>
          <Title level={3} style={{ color: brandColors.secondary, marginBottom: '30px' }}>
            Launching In...
          </Title>
          <Row gutter={[20, 20]} justify="center">
            {[
              { label: 'Days', value: countdown.days },
              { label: 'Hours', value: countdown.hours },
              { label: 'Minutes', value: countdown.minutes },
              { label: 'Seconds', value: countdown.seconds }
            ].map((item, index) => (
              <Col xs={6} sm={3} key={index}>
                <div style={{
                  background: `linear-gradient(135deg, ${brandColors.primary}15, ${brandColors.secondary}15)`,
                  borderRadius: '15px',
                  padding: '20px 10px',
                  border: `2px solid ${brandColors.primary}20`
                }}>
                  <Title level={1} style={{ 
                    color: brandColors.primary, 
                    margin: 0,
                    fontSize: '2.5rem',
                    fontWeight: 700
                  }}>
                    {item.value.toString().padStart(2, '0')}
                  </Title>
                  <Text style={{ color: brandColors.text, fontWeight: 600 }}>
                    {item.label}
                  </Text>
                </div>
              </Col>
            ))}
          </Row>
        </div>

        {/* Upcoming Events Preview */}
        <div style={{ margin: '60px 50px' }}>
          <div style={{ textAlign: 'center', marginBottom: '50px' }}>
            <Title level={2} style={{ color: brandColors.secondary, marginBottom: '16px' }}>
              What's Coming Up
            </Title>
            <Text style={{ color: brandColors.text, fontSize: '18px' }}>
              A glimpse of the exciting events we're preparing for you
            </Text>
          </div>

          <Row gutter={[30, 30]}>
            {upcomingEvents.map((event, index) => (
              <Col xs={24} md={12} key={index}>
                <Card 
                  style={{ 
                    borderRadius: '20px',
                    border: 'none',
                    background: 'white',
                    boxShadow: '0 8px 25px rgba(0, 0, 0, 0.08)',
                    height: '100%',
                    transition: 'all 0.3s ease'
                  }}
                  hoverable
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-5px)';
                    e.currentTarget.style.boxShadow = '0 15px 35px rgba(0, 0, 0, 0.12)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.08)';
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '20px' }}>
                    <div style={{
                      width: '60px',
                      height: '60px',
                      background: `linear-gradient(135deg, ${brandColors.primary}20, ${brandColors.secondary}20)`,
                      borderRadius: '15px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '24px',
                      flexShrink: 0
                    }}>
                      {event.icon}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                        <Title level={4} style={{ color: brandColors.secondary, margin: 0 }}>
                          {event.title}
                        </Title>
                        <Tag color={brandColors.primary} style={{ margin: 0 }}>
                          {event.date}
                        </Tag>
                      </div>
                      <Paragraph style={{ color: brandColors.text, margin: 0, lineHeight: 1.6 }}>
                        {event.description}
                      </Paragraph>
                    </div>
                  </div>
                </Card>
              </Col>
            ))}
          </Row>
        </div>

        {/* Event Types */}
        <div style={{ 
          background: `linear-gradient(135deg, ${brandColors.secondary}05 0%, ${brandColors.primary}05 100%)`,
          borderRadius: '20px',
          padding: '60px 50px',
          margin: '60px 50px',
          textAlign: 'center'
        }}>
          <Title level={2} style={{ color: brandColors.secondary, marginBottom: '50px' }}>
            Types of Events You Can Expect
          </Title>
          <Row gutter={[30, 30]} justify="center">
            {eventTypes.map((type, index) => (
              <Col xs={12} md={6} key={index}>
                <div style={{
                  background: 'white',
                  borderRadius: '15px',
                  padding: '30px 20px',
                  boxShadow: '0 5px 15px rgba(0, 0, 0, 0.08)',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-5px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
                >
                  <div style={{ fontSize: '40px', marginBottom: '16px' }}>
                    {type.icon}
                  </div>
                  <Title level={4} style={{ color: brandColors.secondary, margin: 0 }}>
                    {type.name}
                  </Title>
                </div>
              </Col>
            ))}
          </Row>
        </div>

        {/* Stay Updated Section */}
        <div style={{ margin: '60px 50px' }}>
          <Card 
            style={{ 
              borderRadius: '25px',
              border: 'none',
              background: `linear-gradient(135deg, ${brandColors.primary} 0%, ${brandColors.secondary} 100%)`,
              color: 'white',
              textAlign: 'center',
              padding: '50px'
            }}
          >
            <Title level={2} style={{ color: 'white', marginBottom: '16px' }}>
              Don't Miss Out!
            </Title>
            <Paragraph style={{ color: 'rgba(255,255,255,0.9)', fontSize: '18px', marginBottom: '30px' }}>
              Be the first to know when we announce our exciting events calendar
            </Paragraph>
            
            <Space.Compact style={{ width: '100%', maxWidth: '400px', margin: '0 auto' }}>
              <Input 
                size="large"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{
                  borderRadius: '25px 0 0 25px',
                  border: 'none',
                  padding: '12px 20px'
                }}
              />
              <Button 
              onClick={()=>{setEmail(''),toast.success('You will be notified when event is healed')}}
                type="primary"
                size="large"
                style={{
                  background: 'white',
                  border: 'none',
                  borderRadius: '0 25px 25px 0',
                  color: brandColors.primary,
                  fontWeight: 600,
                  padding: '0 30px'
                }}
                icon={<BellOutlined />}
              >
                Subscribe
              </Button>
            </Space.Compact>
          </Card>
        </div>

      </Content>
    </Layout>
  );
};

export default EventsPage;
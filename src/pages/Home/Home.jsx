import React, { useState, useEffect } from 'react';
import { Layout, Button, Typography, Row, Col, Card, Space, Divider, Dropdown, Menu } from 'antd';
import { UserOutlined, ArrowRightOutlined, PlayCircleOutlined, DownOutlined, DashboardOutlined, ProfileOutlined, LogoutOutlined, DeleteOutlined, DollarOutlined } from '@ant-design/icons';
import logo from '../../assets/images/logo.png'; 
import { useNavigate } from 'react-router-dom';

const { Header, Content } = Layout;
const { Title, Text } = Typography;

const HomePage = () => {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const user = JSON.parse(localStorage.getItem("sms-user")) || null;

  const menuItemStyle = {
    fontSize: 15,
    cursor: "pointer",
    color: "#1C2951",
    padding: "5px 0"
  };

  const handleLogout = () => {
    localStorage.removeItem("sms-user");
    window.location.reload();
  };

  // Role-based menu generator - ONLY THIS PART IS CHANGED
  const getUserMenu = () => {
    const userMenu = (
      <div
        style={{
          width: 280,
          background: "#fff",
          borderRadius: 16,
          padding: "20px",
          boxShadow: "0 8px 25px rgba(0,0,0,0.12)"
        }}
      >
        {/* Top User Info - EXACTLY AS BEFORE */}
        <div style={{ display: "flex", alignItems: "center", marginBottom: 15 }}>
          <div
            style={{
              width: 55,
              height: 55,
              borderRadius: "50%",
              background: "linear-gradient(135deg, #C1272D, #1C2951)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#fff",
              fontSize: 26,
              fontWeight: 600,
              textTransform: "uppercase",
              marginRight: 15
            }}
          >
            {user?.name?.charAt(0) || "U"}
          </div>

          <div>
            <p style={{ margin: 0, fontWeight: 700, fontSize: 16 }}>
              {user?.name}
            </p>
            <p style={{ margin: 0, fontSize: 13, color: "#666" }}>
              {user?.email}
            </p>
            {/* Added role display */}
            <p style={{ margin: "5px 0 0 0", fontSize: 12, color: "#C1272D", fontWeight: 600 }}>
              {user?.role?.toUpperCase() || "USER"}
            </p>
          </div>
        </div>

        <div style={{ borderBottom: "1px solid #f0f0f0", marginBottom: 15 }} />

        {/* Menu Items - CHANGED TO ROLE-BASED */}
        <div style={{ display: "flex", flexDirection: "column", gap: 15 }}>
          {/* Profile - Common for all roles */}
<div 
  style={menuItemStyle}
  onClick={() => {
    // All roles go to the same profile page
    navigate('/profile');
  }}
>
  👤 My Profile
</div>

          {/* Role-specific items */}
          {user?.role === 'student' && (
            <div 
              style={menuItemStyle}
              onClick={() => navigate('/fee-status')}
            >
              💳 Fee Status
            </div>
          )}

          {user?.role === 'teacher' && (
            <div 
              style={menuItemStyle}
              onClick={() => navigate('/teacher-dashboard')}
            >
              📊 Teacher Dashboard
            </div>
          )}

          {user?.role === 'admin' && (
            <div 
              style={menuItemStyle}
              onClick={() => navigate('/admin-dashboard')}
            >
              ⚙️ Admin Dashboard
            </div>
          )}
        </div>

        <div style={{ borderBottom: "1px solid #f0f0f0", margin: "15px 0" }} />

        {/* Logout - Common for all */}
        <div
          style={{ ...menuItemStyle, fontWeight: 600 }}
          onClick={handleLogout}
        >
          ↪️ Logout
        </div>

        {/* Delete Account - Common for all */}
        <div
          style={{
            ...menuItemStyle,
            color: "#b00020",
            marginTop: 10
          }}
        >
          🗑 Delete Account
        </div>
      </div>
    );

    return userMenu;
  };

  // ALL YOUR EXISTING CODE BELOW REMAINS EXACTLY THE SAME
  const studentMenu = (
    <Menu
      items={[
        {
          key: "1",
          label: "View Report Card",
          onClick: () => navigate("/student-info"),
        },
        {
          key: "2",
          label: "View Fee Status",
          onClick: () => navigate("/fee-status"),
        },
        {
          key: "3",
          label: "View Student Profile",
          onClick: () => navigate("/student-profile"),
        },
      ]}
    />
  );

  const slides = [
    {
      id: 1,
      background: 'linear-gradient(135deg, rgba(28, 41, 81, 0.8) 0%, rgba(193, 39, 45, 0.8) 100%), url("https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80")',
      title: "Welcome to Cordova Academy",
      subtitle: "Where excellence meets innovation in education. Join our community of learners, educators, and visionaries shaping the future.",
      buttonText: "Get Started",
      buttonColor: "#C1272D"
    },
    {
      id: 2,
      background: 'linear-gradient(135deg, rgba(193, 39, 45, 0.8) 0%, rgba(28, 41, 81, 0.8) 100%), url("https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80")',
      title: "Excellence in Education",
      subtitle: "Discover a world-class learning environment with state-of-the-art facilities and dedicated faculty members.",
      buttonText: "Explore Programs",
      buttonColor: "#1C2951"
    },
    {
      id: 3,
      background: 'linear-gradient(135deg, rgba(28, 41, 81, 0.8) 0%, rgba(52, 152, 219, 0.8) 100%), url("https://images.unsplash.com/photo-1523580494863-6f3031224c94?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80")',
      title: "Shape Your Future",
      subtitle: "Empowering students to reach their full potential through personalized learning and innovative teaching methods.",
      buttonText: "Learn More",
      buttonColor: "#C1272D"
    },
    {
      id: 4,
      background: 'linear-gradient(135deg, rgba(193, 39, 45, 0.8) 0%, rgba(155, 89, 182, 0.8) 100%), url("https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2022&q=80")',
      title: "Join Our Community",
      subtitle: "Become part of a vibrant educational community that values diversity, creativity, and academic achievement.",
      buttonText: "Join Now",
      buttonColor: "#1C2951"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [slides.length]);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50;
      setScrolled(isScrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  return (
    <Layout
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #f9f9f9 0%, #ffffff 100%)",
      }}
    >
      {/* Enhanced Header - EXACTLY AS BEFORE */}
      <Header
        style={{
          background: scrolled 
            ? 'rgba(255, 255, 255, 0.95)' 
            : 'linear-gradient(135deg, rgba(255, 255, 255, 0.98) 0%, rgba(255, 255, 255, 0.95) 100%)',
          padding: "0 50px",
          height: "80px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          borderBottom: scrolled ? "1px solid rgba(28, 41, 81, 0.1)" : "none",
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          backdropFilter: "blur(10px)",
          boxShadow: scrolled ? "0 4px 20px rgba(28, 41, 81, 0.1)" : "none",
          transition: "all 0.3s ease-in-out",
        }}
      >
        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center" }}>
          <img
            src={logo}
            alt="School Logo"
            style={{
              width: 180,
              filter: scrolled ? "none" : "drop-shadow(0 2px 8px rgba(0,0,0,0.1))",
            }}
          />
        </div>

        {/* Navigation Links - EXACTLY AS BEFORE */}
        <div style={{ display: "flex", gap: "40px", alignItems: "center" }}>
          <Dropdown overlay={studentMenu} placement="bottomLeft" trigger={["click"]}>
            <Text
              style={{
                color: scrolled ? "#C1272D" : "#C1272D",
                cursor: "pointer",
                fontWeight: 600,
                marginRight: "50px",
                fontSize: "15px"
              }}
            >
              View Student Info <DownOutlined style={{ fontSize: 12 }} />
            </Text>
          </Dropdown>

          <Text
            strong
            style={{ 
              color: scrolled ? "#1C2951" : "#1C2951", 
              cursor: "pointer",
              fontSize: "15px"
            }}
            onClick={() => navigate("/")}
          >
            Home
          </Text>

          <Text style={{ 
            color: scrolled ? "#1C2951" : "#1C2951", 
            cursor: "pointer", 
            opacity: 0.8,
            fontSize: "15px"
          }}>
            About
          </Text>
          <Text style={{ 
            color: scrolled ? "#1C2951" : "#1C2951", 
            cursor: "pointer", 
            opacity: 0.8,
            fontSize: "15px"
          }}>
            Event
          </Text>
          <Text style={{ 
            color: scrolled ? "#1C2951" : "#1C2951", 
            cursor: "pointer", 
            opacity: 0.8,
            fontSize: "15px"
          }}>
            Contact
          </Text>
        </div>

        {/* Sign Up Button - ONLY CHANGED THE DROPDOWN CONTENT */}
        {user ? (
          <Dropdown overlay={getUserMenu()} trigger={["click"]}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                cursor: "pointer",
                padding: "10px 15px",
                background: "#f5f5f5",
                borderRadius: 30,
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)"
              }}
            >
              <div
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: "50%",
                  background: "linear-gradient(135deg,#1C2951,#C1272D)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#fff",
                  fontWeight: 700,
                  marginRight: 10
                }}
              >
                {user?.name?.charAt(0)}
              </div>

              <span
                style={{
                  fontWeight: 600,
                  fontSize: 15,
                  color: "#1c5130ff"
                }}
              >
                Hi, {user?.name.split(" ")[0]}!
              </span>
            </div>
          </Dropdown>
        ) : (
          <Button
            onClick={() => navigate("/register")}
            type="primary"
            size="large"
            icon={<UserOutlined />}
            style={{
              background: "#C1272D",
              borderColor: "#C1272D",
              borderRadius: "25px",
              padding: "0 30px",
              height: "45px",
              fontWeight: 600,
              boxShadow: "0 4px 12px rgba(193, 39, 45, 0.3)",
            }}
          >
            Sign Up
          </Button>
        )}
      </Header>

      {/* ALL YOUR EXISTING CONTENT BELOW - EXACTLY THE SAME */}
      <Content style={{ padding: '0', marginTop: '80px' }}>
        {/* Hero Section with Slider */}
        <div style={{ 
          height: 'calc(100vh - 80px)', 
          position: 'relative',
          overflow: 'hidden'
        }}>
          {/* Slides */}
          {slides.map((slide, index) => (
            <div
              key={slide.id}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                background: slide.background,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                opacity: index === currentSlide ? 1 : 0,
                transition: 'opacity 1s ease-in-out',
                padding: '0 50px'
              }}
            >
              <div style={{ 
                position: 'relative', 
                zIndex: 2, 
                maxWidth: '800px',
                color: 'white'
              }}>
                <Title 
                  level={1} 
                  style={{ 
                    color: 'white', 
                    fontSize: '4rem', 
                    marginBottom: '20px',
                    fontWeight: 800,
                    lineHeight: 1.1,
                    textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
                  }}
                >
                  {slide.title}
                </Title>
                
                <Text style={{ 
                  color: 'white', 
                  fontSize: '1.5rem', 
                  opacity: 0.9,
                  lineHeight: 1.6,
                  display: 'block',
                  marginBottom: '40px',
                  textShadow: '1px 1px 2px rgba(0,0,0,0.3)'
                }}>
                  {slide.subtitle}
                </Text>

                <Space size="large" style={{ marginTop: '40px' }}>
                  <Button 
                    type="primary" 
                    size="large"
                    onClick={() => navigate('/register')}
                    style={{ 
                      background: slide.buttonColor, 
                      borderColor: slide.buttonColor,
                      borderRadius: '25px',
                      padding: '0 40px',
                      height: '50px',
                      fontSize: '16px',
                      fontWeight: 600,
                      boxShadow: '0 6px 20px rgba(0, 0, 0, 0.3)'
                    }}
                    icon={<ArrowRightOutlined />}
                  >
                    {slide.buttonText}
                  </Button>
                  
                  <Button 
                    size="large"
                    style={{ 
                      background: 'transparent', 
                      borderColor: 'white',
                      color: 'white',
                      borderRadius: '25px',
                      padding: '0 40px',
                      height: '50px',
                      fontSize: '16px',
                      fontWeight: 600
                    }}
                    icon={<PlayCircleOutlined />}
                  >
                    Read More
                  </Button>
                </Space>
              </div>

              {/* Overlay for better text readability */}
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'rgba(0, 0, 0, 0.3)',
                zIndex: 1
              }}></div>
            </div>
          ))}

          {/* Navigation Arrows */}
          <Button
            onClick={prevSlide}
            style={{
              position: 'absolute',
              left: '30px',
              top: '50%',
              transform: 'translateY(-50%)',
              background: 'rgba(255, 255, 255, 0.2)',
              border: 'none',
              color: 'white',
              width: '50px',
              height: '50px',
              borderRadius: '50%',
              zIndex: 3,
              backdropFilter: 'blur(10px)',
              fontSize: '18px',
              fontWeight: 'bold',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            ‹
          </Button>
          
          <Button
            onClick={nextSlide}
            style={{
              position: 'absolute',
              right: '30px',
              top: '50%',
              transform: 'translateY(-50%)',
              background: 'rgba(255, 255, 255, 0.2)',
              border: 'none',
              color: 'white',
              width: '50px',
              height: '50px',
              borderRadius: '50%',
              zIndex: 3,
              backdropFilter: 'blur(10px)',
              fontSize: '18px',
              fontWeight: 'bold',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            ›
          </Button>

          {/* Slide Indicators */}
          <div style={{
            position: 'absolute',
            bottom: '30px',
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            gap: '10px',
            zIndex: 3
          }}>
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                style={{
                  width: '12px',
                  height: '12px',
                  borderRadius: '50%',
                  border: 'none',
                  background: index === currentSlide ? '#C1272D' : 'rgba(255, 255, 255, 0.5)',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
              />
            ))}
          </div>
        </div>

        {/* Features Section - EXACTLY AS BEFORE */}
        <div style={{ margin: '100px 50px' }}>
          <Row gutter={[60, 60]} justify="center">
            <Col xs={24}>
              <div style={{ textAlign: 'center', marginBottom: '60px' }}>
                <Title level={2} style={{ color: '#1C2951', marginBottom: '20px' }}>
                  Why Cordova Academy Stands Out
                </Title>
                <Text style={{ color: '#1C2951', opacity: 0.8, fontSize: '18px', maxWidth: '600px', margin: '0 auto' }}>
                  Discover what makes our educational approach different and how we're shaping the future of learning
                </Text>
                <div >
                 <Button
                  onClick={() => navigate("/about")}
                  type="primary"
                  size="large"
                  style={{
                    background: "#C1272D",
                    borderColor: "#C1272D",
                    borderRadius: "25px",
                    padding: "0 30px",
                    height: "45px",
                    fontWeight: 600,
                    boxShadow: "0 4px 12px rgba(193, 39, 45, 0.3)",
                    marginTop:'30px'
                    
                  }}
                >
                 Discover
                </Button>
                </div>
              </div>
            </Col>
          </Row>

          {/* Interactive Learning Journey */}
          <div style={{ 
            background: 'linear-gradient(135deg, rgba(28, 41, 81, 0.03) 0%, rgba(193, 39, 45, 0.03) 100%)',
            borderRadius: '24px',
            padding: '60px 40px',
            marginBottom: '80px',
            border: '1px solid rgba(28, 41, 81, 0.1)'
          }}>
            <Row gutter={[40, 40]} align="middle">
              <Col xs={24} lg={12}>
                <Title level={3} style={{ color: '#1C2951', marginBottom: '30px' }}>
                  Our Learning Ecosystem
                </Title>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '15px' }}>
                    <div style={{
                      width: '50px',
                      height: '50px',
                      background: 'linear-gradient(135deg, #C1272D 0%, #ff6b6b 100%)',
                      borderRadius: '12px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white',
                      fontSize: '20px',
                      flexShrink: 0
                    }}>
                      🎯
                    </div>
                    <div>
                      <Text strong style={{ color: '#1C2951', fontSize: '18px', display: 'block', marginBottom: '8px' }}>
                        Personalized Learning Paths
                      </Text>
                      <Text style={{ color: '#1C2951', opacity: 0.8, lineHeight: 1.6 }}>
                        Every student receives a customized educational journey tailored to their unique strengths, interests, and learning style.
                      </Text>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '15px' }}>
                    <div style={{
                      width: '50px',
                      height: '50px',
                      background: 'linear-gradient(135deg, #1C2951 0%, #3498db 100%)',
                      borderRadius: '12px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white',
                      fontSize: '20px',
                      flexShrink: 0
                    }}>
                      🌍
                    </div>
                    <div>
                      <Text strong style={{ color: '#1C2951', fontSize: '18px', display: 'block', marginBottom: '8px' }}>
                        Global Classroom Experience
                      </Text>
                      <Text style={{ color: '#1C2951', opacity: 0.8, lineHeight: 1.6 }}>
                        Connect with students and educators worldwide through our international collaboration programs and virtual exchange initiatives.
                      </Text>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '15px' }}>
                    <div style={{
                      width: '50px',
                      height: '50px',
                      background: 'linear-gradient(135deg, #C1272D 0%, #1C2951 100%)',
                      borderRadius: '12px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white',
                      fontSize: '20px',
                      flexShrink: 0
                    }}>
                      💡
                    </div>
                    <div>
                      <Text strong style={{ color: '#1C2951', fontSize: '18px', display: 'block', marginBottom: '8px' }}>
                        Innovation Lab & Makerspace
                      </Text>
                      <Text style={{ color: '#1C2951', opacity: 0.8, lineHeight: 1.6 }}>
                        Hands-on learning in our state-of-the-art innovation lab where students bring ideas to life through technology and creativity.
                      </Text>
                    </div>
                  </div>
                </div>
              </Col>

              <Col xs={24} lg={12}>
                <div style={{
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  borderRadius: '20px',
                  padding: '40px',
                  color: 'white',
                  textAlign: 'center',
                  boxShadow: '0 20px 40px rgba(102, 126, 234, 0.3)'
                }}>
                  <Title level={3} style={{ color: 'white', marginBottom: '20px' }}>
                    Student Success Metrics
                  </Title>
                  <Row gutter={[20, 20]} style={{ marginBottom: '30px' }}>
                    <Col xs={10}>
                      <div>
                        <Title level={2} style={{ color: 'white', margin: 0 }}>95%</Title>
                        <Text style={{ color: 'rgba(255,255,255,0.9)' }}>Graduation Rate</Text>
                      </div>
                    </Col>
                    <Col xs={10}>
                      <div>
                        <Title level={2} style={{ color: 'white', margin: 0 }}>100%</Title>
                        <Text style={{ color: 'rgba(255,255,255,0.9)' }}>University Acceptance</Text>
                      </div>
                    </Col>
                    
                  </Row>
                  
                </div>
              </Col>
            </Row>
          </div>
        </div>

        {/* Interactive CTA Section - EXACTLY AS BEFORE */}
        <div style={{ 
          background: 'linear-gradient(135deg, #1C2951 0%, #2c3e6e 100%)',
          borderRadius: '30px',
          padding: '80px 50px',
          margin: '0 50px 60px',
          color: 'white',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden'
        }}>
          {/* Background Elements */}
          <div style={{
            position: 'absolute',
            top: '-50px',
            right: '-50px',
            width: '200px',
            height: '200px',
            background: 'rgba(255,255,255,0.05)',
            borderRadius: '50%'
          }}></div>
          <div style={{
            position: 'absolute',
            bottom: '-30px',
            left: '-30px',
            width: '150px',
            height: '150px',
            background: 'rgba(193, 39, 45, 0.1)',
            borderRadius: '50%'
          }}></div>

          <div style={{ position: 'relative', zIndex: 2 }}>
            <Title level={2} style={{ color: 'white', marginBottom: '20px' }}>
              Ready to Join Our Innovative Learning Community?
            </Title>
            <Text style={{ 
              color: 'rgba(255,255,255,0.9)', 
              fontSize: '18px', 
              display: 'block', 
              marginBottom: '40px',
              maxWidth: '600px',
              margin: '0 auto',
              lineHeight: 1.6
            }}>
              Be part of an educational revolution where traditional learning meets cutting-edge innovation. 
              Your journey to extraordinary education starts here.
            </Text>
            
            <Space size="large" style={{ marginBottom: '30px' }}>
              <Button 
                type="primary" 
                size="large"
                onClick={() => navigate('/register')}
                style={{ 
                  background: '#C1272D', 
                  borderColor: '#C1272D',
                  borderRadius: '25px',
                  padding: '0 40px',
                  height: '55px',
                  fontSize: '16px',
                  fontWeight: 600,
                  boxShadow: '0 8px 25px rgba(193, 39, 45, 0.4)'
                }}
                icon={<ArrowRightOutlined />}
              >
                Start Your Journey
              </Button>
              
              <Button 
                size="large"
                style={{ 
                  background: 'rgba(255,255,255,0.1)', 
                  borderColor: 'rgba(255,255,255,0.3)',
                  color: 'white',
                  borderRadius: '25px',
                  padding: '0 40px',
                  height: '55px',
                  fontSize: '16px',
                  fontWeight: 600,
                  backdropFilter: 'blur(10px)'
                }}
                icon={<PlayCircleOutlined />}
              >
                Virtual Campus Tour
              </Button>
            </Space>
          </div>
        </div>
      </Content>
    </Layout>
  );
};

export default HomePage;
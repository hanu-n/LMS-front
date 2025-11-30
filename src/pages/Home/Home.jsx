import React, { useState, useEffect } from 'react';
import { Layout, Button, Typography, Row, Col, Card, Space, Divider, Dropdown, Menu, Drawer, Grid } from 'antd';
import { UserOutlined, ArrowRightOutlined, PlayCircleOutlined, DownOutlined, DashboardOutlined, ProfileOutlined, LogoutOutlined, DeleteOutlined, DollarOutlined, MenuOutlined } from '@ant-design/icons';
import logo from '../../assets/images/logo.png'; 
import { useNavigate } from 'react-router-dom';

const { Header, Content } = Layout;
const { Title, Text } = Typography;
const { useBreakpoint } = Grid;

const HomePage = () => {
  const navigate = useNavigate();
  const screens = useBreakpoint();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuVisible, setMobileMenuVisible] = useState(false);
  const user = JSON.parse(localStorage.getItem("sms-user")) || null;

  const isMobile = !screens.md;
  const isTablet = !screens.lg && screens.md;

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

  // Role-based menu generator - EXACTLY THE SAME
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
        {/* Top User Info */}
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
            <p style={{ margin: "5px 0 0 0", fontSize: 12, color: "#C1272D", fontWeight: 600 }}>
              {user?.role?.toUpperCase() || "USER"}
            </p>
          </div>
        </div>

        <div style={{ borderBottom: "1px solid #f0f0f0", marginBottom: 15 }} />

        {/* Menu Items */}
        <div style={{ display: "flex", flexDirection: "column", gap: 15 }}>
          <div 
            style={menuItemStyle}
            onClick={() => navigate('/profile')}
          >
            👤 My Profile
          </div>

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

        {/* Logout */}
        <div
          style={{ ...menuItemStyle, fontWeight: 600 }}
          onClick={handleLogout}
        >
          ↪️ Logout
        </div>

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

  // Mobile menu component
  const MobileMenu = () => (
    <div style={{ padding: '20px 0' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <Dropdown overlay={studentMenu} placement="bottomLeft" trigger={["click"]}>
          <Text style={{ color: "#1C2951", cursor: "pointer", fontWeight: 600, fontSize: "16px" }}>
            View Student Info <DownOutlined style={{ fontSize: 12 }} />
          </Text>
        </Dropdown>

        <Text strong style={{ color: "#1C2951", cursor: "pointer", fontSize: "16px" }} onClick={() => navigate("/")}>
          Home
        </Text>

        <Text style={{ color: "#1C2951", cursor: "pointer", opacity: 0.8, fontSize: "16px" }}>
          About
        </Text>
        <Text style={{ color: "#1C2951", cursor: "pointer", opacity: 0.8, fontSize: "16px" }}>
          Event
        </Text>
        <Text style={{ color: "#1C2951", cursor: "pointer", opacity: 0.8, fontSize: "16px" }}>
          Contact
        </Text>
      </div>
    </div>
  );

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
      {/* Responsive Header */}
      <Header
        style={{
          background: scrolled 
            ? 'rgba(255, 255, 255, 0.95)' 
            : 'linear-gradient(135deg, rgba(255, 255, 255, 0.98) 0%, rgba(255, 255, 255, 0.95) 100%)',
          padding: isMobile ? "0 15px" : "0 50px",
          height: isMobile ? "60px" : "80px",
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
              width: isMobile ? 120 : 180,
              filter: scrolled ? "none" : "drop-shadow(0 2px 8px rgba(0,0,0,0.1))",
            }}
          />
        </div>

        {/* Desktop Navigation - Hidden on mobile */}
        {!isMobile && (
          <div style={{ display: "flex", gap: "30px", alignItems: "center" }}>
            <Dropdown overlay={studentMenu} placement="bottomLeft" trigger={["click"]}>
              <Text
                style={{
                  color: scrolled ? "#C1272D" : "#C1272D",
                  cursor: "pointer",
                  fontWeight: 600,
                  marginRight: "30px",
                  fontSize: "14px"
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
                fontSize: "14px"
              }}
              onClick={() => navigate("/")}
            >
              Home
            </Text>

            <Text style={{ 
              color: scrolled ? "#1C2951" : "#1C2951", 
              cursor: "pointer", 
              opacity: 0.8,
              fontSize: "14px"
            }}>
              About
            </Text>
            <Text style={{ 
              color: scrolled ? "#1C2951" : "#1C2951", 
              cursor: "pointer", 
              opacity: 0.8,
              fontSize: "14px"
            }}>
              Event
            </Text>
            <Text style={{ 
              color: scrolled ? "#1C2951" : "#1C2951", 
              cursor: "pointer", 
              opacity: 0.8,
              fontSize: "14px"
            }}>
              Contact
            </Text>
          </div>
        )}

        {/* Right Section - User or Sign Up */}
        <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
          {/* Mobile Menu Button - Visible only on mobile */}
          {isMobile && (
            <Button
              type="text"
              icon={<MenuOutlined />}
              onClick={() => setMobileMenuVisible(true)}
              style={{ 
                fontSize: '18px',
                color: '#1C2951'
              }}
            />
          )}

          {user ? (
            <Dropdown overlay={getUserMenu()} trigger={["click"]}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  cursor: "pointer",
                  padding: isMobile ? "6px 10px" : "8px 15px",
                  background: "#f5f5f5",
                  borderRadius: 30,
                  boxShadow: "0 4px 12px rgba(0,0,0,0.1)"
                }}
              >
                <div
                  style={{
                    width: isMobile ? 32 : 40,
                    height: isMobile ? 32 : 40,
                    borderRadius: "50%",
                    background: "linear-gradient(135deg,#1C2951,#C1272D)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#fff",
                    fontWeight: 700,
                    marginRight: isMobile ? 6 : 10,
                    fontSize: isMobile ? '12px' : '14px'
                  }}
                >
                  {user?.name?.charAt(0)}
                </div>

                {!isMobile && (
                  <span
                    style={{
                      fontWeight: 600,
                      fontSize: 14,
                      color: "#1c5130ff",
                    }}
                  >
                    Hi, {user?.name.split(" ")[0]}!
                  </span>
                )}
              </div>
            </Dropdown>
          ) : (
            <Button
              onClick={() => navigate("/register")}
              type="primary"
              size={isMobile ? "middle" : "large"}
              icon={!isMobile && <UserOutlined />}
              style={{
                background: "#C1272D",
                borderColor: "#C1272D",
                borderRadius: "25px",
                padding: isMobile ? "0 15px" : "0 30px",
                height: isMobile ? "35px" : "45px",
                fontWeight: 600,
                boxShadow: "0 4px 12px rgba(193, 39, 45, 0.3)",
                fontSize: isMobile ? '12px' : '14px'
              }}
            >
              {isMobile ? "Sign Up" : "Sign Up"}
            </Button>
          )}
        </div>
      </Header>

      {/* Mobile Menu Drawer */}
      <Drawer
        title="Menu"
        placement="right"
        onClose={() => setMobileMenuVisible(false)}
        open={mobileMenuVisible}
        width={280}
      >
        <MobileMenu />
      </Drawer>

      {/* Responsive Content */}
      <Content style={{ padding: '0', marginTop: isMobile ? '60px' : '80px' }}>
        {/* Hero Section with Slider */}
        <div style={{ 
          height: isMobile ? '70vh' : 'calc(100vh - 80px)', 
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
                padding: isMobile ? '0 20px' : '0 50px'
              }}
            >
              <div style={{ 
                position: 'relative', 
                zIndex: 2, 
                maxWidth: '800px',
                color: 'white',
                width: '100%'
              }}>
                <Title 
                  level={1} 
                  style={{ 
                    color: 'white', 
                    fontSize: isMobile ? '2rem' : '4rem', 
                    marginBottom: isMobile ? '15px' : '20px',
                    fontWeight: 800,
                    lineHeight: 1.1,
                    textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
                  }}
                >
                  {slide.title}
                </Title>
                
                <Text style={{ 
                  color: 'white', 
                  fontSize: isMobile ? '1rem' : '1.5rem', 
                  opacity: 0.9,
                  lineHeight: 1.6,
                  display: 'block',
                  marginBottom: isMobile ? '25px' : '40px',
                  textShadow: '1px 1px 2px rgba(0,0,0,0.3)'
                }}>
                  {slide.subtitle}
                </Text>

                <Space 
                  size="large" 
                  style={{ marginTop: isMobile ? '20px' : '40px' }} 
                  direction={isMobile ? "vertical" : "horizontal"}
                >
                  <Button 
                    type="primary" 
                    size={isMobile ? "middle" : "large"}
                    onClick={() => navigate('/register')}
                    style={{ 
                      background: slide.buttonColor, 
                      borderColor: slide.buttonColor,
                      borderRadius: '25px',
                      padding: isMobile ? '0 25px' : '0 40px',
                      height: isMobile ? '40px' : '50px',
                      fontSize: isMobile ? '14px' : '16px',
                      fontWeight: 600,
                      boxShadow: '0 6px 20px rgba(0, 0, 0, 0.3)',
                      width: isMobile ? '200px' : 'auto'
                    }}
                    icon={!isMobile && <ArrowRightOutlined />}
                  >
                    {slide.buttonText}
                  </Button>
                  
                  <Button 
                    size={isMobile ? "middle" : "large"}
                    style={{ 
                      background: 'transparent', 
                      borderColor: 'white',
                      color: 'white',
                      borderRadius: '25px',
                      padding: isMobile ? '0 25px' : '0 40px',
                      height: isMobile ? '40px' : '50px',
                      fontSize: isMobile ? '14px' : '16px',
                      fontWeight: 600,
                      width: isMobile ? '200px' : 'auto'
                    }}
                    icon={!isMobile && <PlayCircleOutlined />}
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

          {/* Navigation Arrows - Hidden on mobile */}
          {!isMobile && (
            <>
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
            </>
          )}

          {/* Slide Indicators */}
          <div style={{
            position: 'absolute',
            bottom: isMobile ? '15px' : '30px',
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            gap: '8px',
            zIndex: 3
          }}>
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                style={{
                  width: isMobile ? '8px' : '12px',
                  height: isMobile ? '8px' : '12px',
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

        {/* Features Section */}
        <div style={{ margin: isMobile ? '40px 20px' : '100px 50px' }}>
          <Row gutter={[30, 30]} justify="center">
            <Col xs={24}>
              <div style={{ textAlign: 'center', marginBottom: isMobile ? '30px' : '60px' }}>
                <Title level={2} style={{ color: '#1C2951', marginBottom: '20px', fontSize: isMobile ? '1.5rem' : '2rem' }}>
                  Why Cordova Academy Stands Out
                </Title>
                <Text style={{ 
                  color: '#1C2951', 
                  opacity: 0.8, 
                  fontSize: isMobile ? '14px' : '18px', 
                  maxWidth: '600px', 
                  margin: '0 auto',
                  lineHeight: 1.6 
                }}>
                  Discover what makes our educational approach different and how we're shaping the future of learning
                </Text>
                <div>
                 <Button
                  onClick={() => navigate("/about")}
                  type="primary"
                  size={isMobile ? "middle" : "large"}
                  style={{
                    background: "#C1272D",
                    borderColor: "#C1272D",
                    borderRadius: "25px",
                    padding: isMobile ? "0 20px" : "0 30px",
                    height: isMobile ? "38px" : "45px",
                    fontWeight: 600,
                    boxShadow: "0 4px 12px rgba(193, 39, 45, 0.3)",
                    marginTop: '30px',
                    fontSize: isMobile ? '13px' : '16px'
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
            borderRadius: isMobile ? '16px' : '24px',
            padding: isMobile ? '30px 20px' : '60px 40px',
            marginBottom: isMobile ? '40px' : '80px',
            border: '1px solid rgba(28, 41, 81, 0.1)'
          }}>
            <Row gutter={[30, 30]} align="middle">
              <Col xs={24} lg={12}>
                <Title level={3} style={{ color: '#1C2951', marginBottom: '25px', fontSize: isMobile ? '1.25rem' : '1.75rem' }}>
                  Our Learning Ecosystem
                </Title>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                    <div style={{
                      width: isMobile ? 40 : 50,
                      height: isMobile ? 40 : 50,
                      background: 'linear-gradient(135deg, #C1272D 0%, #ff6b6b 100%)',
                      borderRadius: isMobile ? '10px' : '12px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white',
                      fontSize: isMobile ? '16px' : '20px',
                      flexShrink: 0
                    }}>
                      🎯
                    </div>
                    <div>
                      <Text strong style={{ color: '#1C2951', fontSize: isMobile ? '15px' : '18px', display: 'block', marginBottom: '6px' }}>
                        Personalized Learning Paths
                      </Text>
                      <Text style={{ color: '#1C2951', opacity: 0.8, lineHeight: 1.6, fontSize: isMobile ? '13px' : '16px' }}>
                        Every student receives a customized educational journey tailored to their unique strengths, interests, and learning style.
                      </Text>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                    <div style={{
                      width: isMobile ? 40 : 50,
                      height: isMobile ? 40 : 50,
                      background: 'linear-gradient(135deg, #1C2951 0%, #3498db 100%)',
                      borderRadius: isMobile ? '10px' : '12px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white',
                      fontSize: isMobile ? '16px' : '20px',
                      flexShrink: 0
                    }}>
                      🌍
                    </div>
                    <div>
                      <Text strong style={{ color: '#1C2951', fontSize: isMobile ? '15px' : '18px', display: 'block', marginBottom: '6px' }}>
                        Global Classroom Experience
                      </Text>
                      <Text style={{ color: '#1C2951', opacity: 0.8, lineHeight: 1.6, fontSize: isMobile ? '13px' : '16px' }}>
                        Connect with students and educators worldwide through our international collaboration programs and virtual exchange initiatives.
                      </Text>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                    <div style={{
                      width: isMobile ? 40 : 50,
                      height: isMobile ? 40 : 50,
                      background: 'linear-gradient(135deg, #C1272D 0%, #1C2951 100%)',
                      borderRadius: isMobile ? '10px' : '12px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white',
                      fontSize: isMobile ? '16px' : '20px',
                      flexShrink: 0
                    }}>
                      💡
                    </div>
                    <div>
                      <Text strong style={{ color: '#1C2951', fontSize: isMobile ? '15px' : '18px', display: 'block', marginBottom: '6px' }}>
                        Innovation Lab & Makerspace
                      </Text>
                      <Text style={{ color: '#1C2951', opacity: 0.8, lineHeight: 1.6, fontSize: isMobile ? '13px' : '16px' }}>
                        Hands-on learning in our state-of-the-art innovation lab where students bring ideas to life through technology and creativity.
                      </Text>
                    </div>
                  </div>
                </div>
              </Col>

              <Col xs={24} lg={12}>
                <div style={{
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  borderRadius: isMobile ? '16px' : '20px',
                  padding: isMobile ? '25px 20px' : '40px',
                  color: 'white',
                  textAlign: 'center',
                  boxShadow: '0 20px 40px rgba(102, 126, 234, 0.3)'
                }}>
                  <Title level={3} style={{ color: 'white', marginBottom: '20px', fontSize: isMobile ? '1.1rem' : '1.5rem' }}>
                    Student Success Metrics
                  </Title>
                  <Row gutter={[15, 15]} style={{ marginBottom: '25px' }}>
                    <Col xs={12}>
                      <div>
                        <Title level={2} style={{ color: 'white', margin: 0, fontSize: isMobile ? '1.5rem' : '2rem' }}>95%</Title>
                        <Text style={{ color: 'rgba(255,255,255,0.9)', fontSize: isMobile ? '12px' : '14px' }}>Graduation Rate</Text>
                      </div>
                    </Col>
                    <Col xs={12}>
                      <div>
                        <Title level={2} style={{ color: 'white', margin: 0, fontSize: isMobile ? '1.5rem' : '2rem' }}>100%</Title>
                        <Text style={{ color: 'rgba(255,255,255,0.9)', fontSize: isMobile ? '12px' : '14px' }}>University Acceptance</Text>
                      </div>
                    </Col>
                  </Row>
                </div>
              </Col>
            </Row>
          </div>
        </div>

        {/* Interactive CTA Section */}
        <div style={{ 
          background: 'linear-gradient(135deg, #1C2951 0%, #2c3e6e 100%)',
          borderRadius: isMobile ? '20px' : '30px',
          padding: isMobile ? '40px 20px' : '80px 50px',
          margin: isMobile ? '0 20px 40px' : '0 50px 60px',
          color: 'white',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden'
        }}>
          {/* Background Elements */}
          <div style={{
            position: 'absolute',
            top: isMobile ? '-20px' : '-50px',
            right: isMobile ? '-20px' : '-50px',
            width: isMobile ? '100px' : '200px',
            height: isMobile ? '100px' : '200px',
            background: 'rgba(255,255,255,0.05)',
            borderRadius: '50%'
          }}></div>
          <div style={{
            position: 'absolute',
            bottom: isMobile ? '-15px' : '-30px',
            left: isMobile ? '-15px' : '-30px',
            width: isMobile ? '80px' : '150px',
            height: isMobile ? '80px' : '150px',
            background: 'rgba(193, 39, 45, 0.1)',
            borderRadius: '50%'
          }}></div>

          <div style={{ position: 'relative', zIndex: 2 }}>
            <Title level={2} style={{ color: 'white', marginBottom: '15px', fontSize: isMobile ? '1.25rem' : '2rem' }}>
              Ready to Join Our Innovative Learning Community?
            </Title>
            <Text style={{ 
              color: 'rgba(255,255,255,0.9)', 
              fontSize: isMobile ? '14px' : '18px', 
              display: 'block', 
              marginBottom: isMobile ? '25px' : '40px',
              maxWidth: '600px',
              margin: '0 auto',
              lineHeight: 1.6
            }}>
              Be part of an educational revolution where traditional learning meets cutting-edge innovation. 
              Your journey to extraordinary education starts here.
            </Text>
            
            <Space 
              size="large" 
              style={{ marginBottom: '20px' }} 
              direction={isMobile ? "vertical" : "horizontal"}
            >
              <Button 
                type="primary" 
                size={isMobile ? "middle" : "large"}
                onClick={() => navigate('/register')}
                style={{ 
                  background: '#C1272D', 
                  borderColor: '#C1272D',
                  borderRadius: '25px',
                  padding: isMobile ? '0 25px' : '0 40px',
                  height: isMobile ? '40px' : '55px',
                  fontSize: isMobile ? '14px' : '16px',
                  fontWeight: 600,
                  boxShadow: '0 8px 25px rgba(193, 39, 45, 0.4)',
                  width: isMobile ? '200px' : 'auto'
                }}
                icon={!isMobile && <ArrowRightOutlined />}
              >
                Start Your Journey
              </Button>
              
              <Button 
                size={isMobile ? "middle" : "large"}
                style={{ 
                  background: 'rgba(255,255,255,0.1)', 
                  borderColor: 'rgba(255,255,255,0.3)',
                  color: 'white',
                  borderRadius: '25px',
                  padding: isMobile ? '0 25px' : '0 40px',
                  height: isMobile ? '40px' : '55px',
                  fontSize: isMobile ? '14px' : '16px',
                  fontWeight: 600,
                  backdropFilter: 'blur(10px)',
                  width: isMobile ? '200px' : 'auto'
                }}
                icon={!isMobile && <PlayCircleOutlined />}
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
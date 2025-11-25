import React, { useState } from 'react';
import { Layout, Typography, Row, Col, Card, Form, Input, Button, Space } from 'antd';
import { useNavigate } from 'react-router-dom';
import { EnvironmentOutlined, PhoneOutlined, MailOutlined, SendOutlined } from '@ant-design/icons';

const { Header, Content } = Layout;
const { Title, Text, Paragraph } = Typography;
const { TextArea } = Input;

const ContactPage = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  // Brand colors
  const brandColors = {
    primary: '#C1272D',
    secondary: '#1C2951',
    accent: '#667eea',
    background: '#f8f9fa',
    text: '#333333'
  };

  const onFinish = async (values) => {
    setLoading(true);
    // Simulate form submission
    setTimeout(() => {
      setLoading(false);
      console.log('Form values:', values);
      // Add your form submission logic here
    }, 1500);
  };

  const contactInfo = [
    {
      icon: <EnvironmentOutlined style={{ fontSize: '24px', color: brandColors.primary }} />,
      title: '📍 Address',
      content: 'Addis Ababa, Ethiopia',
      description: 'Visit our campus anytime'
    },
    {
      icon: <PhoneOutlined style={{ fontSize: '24px', color: brandColors.primary }} />,
      title: '📞 Phone',
      content: '+251 900 00 0000',
      description: 'Mon-Fri from 8am to 5pm'
    },
    {
      icon: <MailOutlined style={{ fontSize: '24px', color: brandColors.primary }} />,
      title: '📧 Email',
      content: 'info@cordovaacademy.com',
      description: 'We reply within 24 hours'
    }
  ];

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
        background: `linear-gradient(135deg, ${brandColors.secondary}08 0%, ${brandColors.primary}05 100%)`,
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
        uc   </div>
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
          padding: '80px 50px',
          textAlign: 'center',
          color: 'white'
        }}>
          <div style={{ maxWidth: '600px', margin: '0 auto' }}>
            <Title level={1} style={{ 
              color: 'white', 
              fontSize: '3rem', 
              marginBottom: '16px',
              fontWeight: 700
            }}>
              Get In Touch
            </Title>
            
            <Paragraph style={{ 
              color: 'rgba(255,255,255,0.9)', 
              fontSize: '1.2rem', 
              lineHeight: 1.6,
              margin: 0
            }}>
              We're here to help and answer any questions you might have. 
              We look forward to hearing from you.
            </Paragraph>
          </div>
        </div>

        {/* Contact Info Cards */}
        <div style={{ margin: '60px 50px' }}>
          <Row gutter={[30, 30]} justify="center">
            {contactInfo.map((item, index) => (
              <Col xs={24} md={8} key={index}>
                <Card 
                  style={{ 
                    borderRadius: '15px',
                    border: 'none',
                    background: 'white',
                    boxShadow: '0 5px 20px rgba(0, 0, 0, 0.08)',
                    height: '100%',
                    transition: 'all 0.3s ease',
                    textAlign: 'center'
                  }}
                  hoverable
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-5px)';
                    e.currentTarget.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.12)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.08)';
                  }}
                >
                  <div style={{ marginBottom: '20px' }}>
                    {item.icon}
                  </div>
                  <Title level={4} style={{ color: brandColors.secondary, marginBottom: '8px' }}>
                    {item.title}
                  </Title>
                  <Paragraph style={{ 
                    color: brandColors.text, 
                    fontSize: '16px', 
                    fontWeight: 600,
                    marginBottom: '8px'
                  }}>
                    {item.content}
                  </Paragraph>
                  <Text style={{ color: '#666', fontSize: '14px' }}>
                    {item.description}
                  </Text>
                </Card>
              </Col>
            ))}
          </Row>
        </div>

        {/* Contact Form & Map Section */}
        <div style={{ margin: '60px 50px' }}>
          <Row gutter={[60, 40]}>
            {/* Contact Form */}
            <Col xs={24} lg={12}>
              <Card 
                style={{ 
                  borderRadius: '20px',
                  border: 'none',
                  background: 'white',
                  boxShadow: '0 8px 25px rgba(0, 0, 0, 0.08)',
                  height: '100%'
                }}
              >
                <div style={{ textAlign: 'center', marginBottom: '30px' }}>
                  <Title level={2} style={{ color: brandColors.secondary, marginBottom: '8px' }}>
                    Send Us a Message
                  </Title>
                  <Text style={{ color: '#666', fontSize: '16px' }}>
                    Fill in the form below and our team will get back to you shortly.
                  </Text>
                </div>

                <Form
                  form={form}
                  name="contact"
                  onFinish={onFinish}
                  layout="vertical"
                  size="large"
                >
                  <Form.Item
                    name="name"
                    label="Full Name"
                    rules={[{ required: true, message: 'Please enter your name' }]}
                  >
                    <Input 
                      placeholder="Enter your full name" 
                      style={{
                        borderRadius: '10px',
                        padding: '12px'
                      }}
                    />
                  </Form.Item>

                  <Form.Item
                    name="email"
                    label="Email Address"
                    rules={[
                      { required: true, message: 'Please enter your email' },
                      { type: 'email', message: 'Please enter a valid email' }
                    ]}
                  >
                    <Input 
                      placeholder="Enter your email address" 
                      style={{
                        borderRadius: '10px',
                        padding: '12px'
                      }}
                    />
                  </Form.Item>

                  <Form.Item
                    name="message"
                    label="Your Message"
                    rules={[{ required: true, message: 'Please enter your message' }]}
                  >
                    <TextArea 
                      rows={5}
                      placeholder="Write your message here..."
                      style={{
                        borderRadius: '10px',
                        padding: '12px',
                        resize: 'vertical'
                      }}
                    />
                  </Form.Item>

                  <Form.Item>
                    <Button 
                      type="primary"
                      htmlType="submit"
                      loading={loading}
                      icon={<SendOutlined />}
                      style={{
                        background: brandColors.primary,
                        border: 'none',
                        borderRadius: '10px',
                        padding: '12px 40px',
                        height: 'auto',
                        fontSize: '16px',
                        fontWeight: 600,
                        width: '100%',
                        boxShadow: `0 4px 15px ${brandColors.primary}40`,
                        transition: 'all 0.3s ease'
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.transform = 'translateY(-2px)';
                        e.target.style.boxShadow = `0 6px 20px ${brandColors.primary}60`;
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.transform = 'translateY(0)';
                        e.target.style.boxShadow = `0 4px 15px ${brandColors.primary}40`;
                      }}
                    >
                      Send Message
                    </Button>
                  </Form.Item>
                </Form>
              </Card>
            </Col>

            {/* Map Section */}
            <Col xs={24} lg={12}>
              <Card 
                style={{ 
                  borderRadius: '20px',
                  border: 'none',
                  background: 'white',
                  boxShadow: '0 8px 25px rgba(0, 0, 0, 0.08)',
                  height: '100%'
                }}
              >
                <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                  <Title level={2} style={{ color: brandColors.secondary, marginBottom: '8px' }}>
                    Find Us
                  </Title>
                  <Text style={{ color: '#666', fontSize: '16px' }}>
                    Visit our campus in Addis Ababa
                  </Text>
                </div>

                {/* Map Placeholder */}
                <div style={{
                  background: `linear-gradient(135deg, ${brandColors.secondary}10, ${brandColors.primary}10)`,
                  borderRadius: '15px',
                  height: '400px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: `2px dashed ${brandColors.primary}30`,
                  color: brandColors.text,
                  fontSize: '16px',
                  fontWeight: 500
                }}>
                  <div style={{ textAlign: 'center' }}>
                    <EnvironmentOutlined style={{ fontSize: '48px', color: brandColors.primary, marginBottom: '16px' }} />
                    <div>Google Maps Integration</div>
                    <Text style={{ color: '#666', fontSize: '14px' }}>
                      Map will be embedded here
                    </Text>
                  </div>
                </div>

                {/* Additional Location Info */}
                <div style={{ marginTop: '20px', padding: '20px', background: `${brandColors.background}`, borderRadius: '10px' }}>
                  <Title level={5} style={{ color: brandColors.secondary, marginBottom: '8px' }}>
                    📍 Campus Location
                  </Title>
                  <Text style={{ color: brandColors.text, fontSize: '14px' }}>
                    Our main campus is located in the heart of Addis Ababa, easily accessible 
                    from all major transportation routes. Ample parking available.
                  </Text>
                </div>
              </Card>
            </Col>
          </Row>
        </div>

        {/* Quick Contact Banner */}
        <div style={{ 
          background: `linear-gradient(135deg, ${brandColors.secondary} 0%, ${brandColors.primary} 100%)`,
          borderRadius: '20px',
          margin: '60px 50px',
          padding: '40px',
          textAlign: 'center',
          color: 'white'
        }}>
          <Title level={3} style={{ color: 'white', marginBottom: '16px' }}>
            Need Immediate Assistance?
          </Title>
          <Paragraph style={{ color: 'rgba(255,255,255,0.9)', marginBottom: '24px', fontSize: '16px' }}>
            Call us directly at +251 900 00 0000 or email info@cordovaacademy.com
          </Paragraph>
          <Space size="middle">
            <Button 
              type="default"
              style={{ 
                background: 'rgba(255, 255, 255, 0.2)',
                border: '2px solid rgba(255, 255, 255, 0.3)',
                borderRadius: '20px',
                color: 'white',
                fontWeight: 600,
                backdropFilter: 'blur(10px)'
              }}
            >
              Call Now
            </Button>
            <Button 
              type="default"
              style={{ 
                background: 'rgba(255, 255, 255, 0.2)',
                border: '2px solid rgba(255, 255, 255, 0.3)',
                borderRadius: '20px',
                color: 'white',
                fontWeight: 600,
                backdropFilter: 'blur(10px)'
              }}
            >
              Send Email
            </Button>
          </Space>
        </div>

      </Content>
    </Layout>
  );
};

export default ContactPage;
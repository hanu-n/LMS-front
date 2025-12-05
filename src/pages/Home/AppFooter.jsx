import React from 'react';
import { Layout, Row, Col, Typography, Input, Button, Divider, Space } from 'antd';
import { 
  FacebookOutlined, 
  TwitterOutlined, 
  InstagramOutlined, 
  LinkedinOutlined,
  YoutubeOutlined,
  MailOutlined,
  PhoneOutlined,
  EnvironmentOutlined,
  ArrowRightOutlined
} from '@ant-design/icons';

const { Footer } = Layout;
const { Title, Text, Link } = Typography;
const { TextArea } = Input;

const AppFooter = () => {
  return (
    <Footer style={{ 
      background: 'linear-gradient(135deg, #1C2951 0%, #0f1a3a 100%)', 
      color: 'white',
      padding: '60px 50px 30px'
    }}>
      {/* Main Footer Content */}
      <Row gutter={[40, 40]}>
        {/* Brand Column */}
        <Col xs={24} md={8}>
          <div style={{ marginBottom: '30px' }}>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
              <div 
                style={{ 
                  width: '40px', 
                  height: '40px', 
                  background: '#C1272D', 
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: '12px'
                }}
              >
                <Text strong style={{ color: 'white', fontSize: '16px' }}>CA</Text>
              </div>
              <Title level={3} style={{ color: 'white', margin: 0 }}>Cordova Academy</Title>
            </div>
            <Text style={{ color: 'rgba(255,255,255,0.8)', lineHeight: 1.6 }}>
              Empowering minds, shaping futures. Join our community of learners and educators 
              dedicated to academic excellence and personal growth.
            </Text>
          </div>

          {/* Social Links */}
          <Space size="middle">
            <div 
              style={{ 
                width: '40px', 
                height: '40px', 
                background: 'rgba(255,255,255,0.1)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'all 0.3s'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#C1272D';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <FacebookOutlined style={{ color: 'white', fontSize: '16px' }} />
            </div>
            <div 
              style={{ 
                width: '40px', 
                height: '40px', 
                background: 'rgba(255,255,255,0.1)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'all 0.3s'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#C1272D';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <TwitterOutlined style={{ color: 'white', fontSize: '16px' }} />
            </div>
            <div 
              style={{ 
                width: '40px', 
                height: '40px', 
                background: 'rgba(255,255,255,0.1)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'all 0.3s'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#C1272D';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <InstagramOutlined style={{ color: 'white', fontSize: '16px' }} />
            </div>
            <div 
              style={{ 
                width: '40px', 
                height: '40px', 
                background: 'rgba(255,255,255,0.1)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'all 0.3s'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#C1272D';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <LinkedinOutlined style={{ color: 'white', fontSize: '16px' }} />
            </div>
          </Space>
        </Col>

        {/* Quick Links */}
        <Col xs={24} sm={8} md={4}>
          <Title level={4} style={{ color: 'white', marginBottom: '20px' }}>Quick Links</Title>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <Link style={{ color: 'rgba(255,255,255,0.8)' }} href="/home">Home</Link>
            <Link style={{ color: 'rgba(255,255,255,0.8)' }} href="/about">About Us</Link>
            <Link style={{ color: 'rgba(255,255,255,0.8)' }} href="/events">Academic Programs</Link>
            <Link style={{ color: 'rgba(255,255,255,0.8)' }} href="/events">Events</Link>
          </div>
        </Col>

        {/* Resources */}
        <Col xs={24} sm={8} md={4}>
          <Title level={4} style={{ color: 'white', marginBottom: '20px' }}>Resources</Title>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <Link style={{ color: 'rgba(255,255,255,0.8)' }} href="#">Student Portal</Link>
            <Link style={{ color: 'rgba(255,255,255,0.8)' }} href="#">Parent Portal</Link>
            <Link style={{ color: 'rgba(255,255,255,0.8)' }} href="#">Faculty Portal</Link>
            <Link style={{ color: 'rgba(255,255,255,0.8)' }} href="#">Library</Link>
            <Link style={{ color: 'rgba(255,255,255,0.8)' }} href="#">Careers</Link>
            <Link style={{ color: 'rgba(255,255,255,0.8)' }} href="#">Support</Link>
          </div>
        </Col>

        {/* Contact & Newsletter */}
        <Col xs={24} md={8}>
          <Title level={4} style={{ color: 'white', marginBottom: '20px' }}>Stay Connected</Title>
          
          {/* Contact Info */}
          <div style={{ marginBottom: '25px' }}>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '12px' }}>
              <EnvironmentOutlined style={{ color: '#C1272D', marginRight: '10px' }} />
              <Text style={{ color: 'rgba(255,255,255,0.8)' }}>
               Kera / Jemo2
              </Text>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '12px' }}>
              <PhoneOutlined style={{ color: '#C1272D', marginRight: '10px' }} />
              <Text style={{ color: 'rgba(255,255,255,0.8)' }}>+2519 01002300</Text>
            </div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <MailOutlined style={{ color: '#C1272D', marginRight: '10px' }} />
              <Text style={{ color: 'rgba(255,255,255,0.8)' }}>info@cordovaacademy.edu</Text>
            </div>
          </div>

          {/* Newsletter Subscription */}
          <div>
            <Text strong style={{ color: 'white', display: 'block', marginBottom: '10px' }}>
              Contact with our staff members
            </Text>
            <Space.Compact style={{ width: '100%' }}>
              <Input 
                placeholder="Enter your email" 
                style={{ 
                  background: 'rgba(255,255,255,0.1)',
                  border: '1px solid rgba(255,255,255,0.2)',
                  color: 'white',
                  borderRadius: '25px 0 0 25px'
                }}
              />
              <Button 
                type="primary" 
                style={{ 
                  background: '#C1272D', 
                  borderColor: '#C1272D',
                  borderRadius: '0 25px 25px 0'
                }}
                icon={<ArrowRightOutlined />}
              >
                Contact
              </Button>
            </Space.Compact>
          </div>
        </Col>
      </Row>

      {/* Bottom Bar */}
      <Divider style={{ borderColor: 'rgba(255,255,255,0.2)', margin: '40px 0 20px' }} />
      
      <Row justify="space-between" align="middle">
        <Col>
          <Text style={{ color: 'rgba(255,255,255,0.6)' }}>
            © 2024 Cordova Academy. All rights reserved.
          </Text>
        </Col>
        <Col>
          <Space size="middle">
            <Link style={{ color: 'rgba(255,255,255,0.6)', fontSize: '12px' }} href="#">
              Privacy Policy
            </Link>
            <Link style={{ color: 'rgba(255,255,255,0.6)', fontSize: '12px' }} href="#">
              Terms of Service
            </Link>
            <Link style={{ color: 'rgba(255,255,255,0.6)', fontSize: '12px' }} href="#">
              Cookie Policy
            </Link>
          </Space>
        </Col>
      </Row>
    </Footer>
  );
};

export default AppFooter;
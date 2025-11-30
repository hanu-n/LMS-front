import React from "react";
import {
  Row,
  Col,
  Card,
  Typography,
  Button,
  Space,
  List,
  Avatar,
  Grid,
} from "antd";
import {
  CalendarOutlined,
  BookOutlined,
  FileTextOutlined,
  TeamOutlined,
  ArrowRightOutlined,
  UserOutlined,
  ClockCircleOutlined,
  MenuOutlined
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const { Title, Text } = Typography;

const DashboardHome = ({ onMenuToggle, isSidebarCollapsed }) => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("sms-user")) || {};
  const screens = Grid.useBreakpoint();
  const isMobile = !screens.md;

  const quickActions = [
    {
      title: "Take Attendance",
      description: "Mark student attendance for your classes",
      icon: "📝",
      action: () => navigate('/attendance'),
      color: "#1C2951"
    },
    {
      title: "See Schedule",
      description: "View and manage your assigned classes",
      icon: "👨‍🏫",
      action: () => navigate('/schedule'),
      color: "#1890ff"
    },
    {
      title: "Enter Grades",
      description: "Grade assignments and examinations",
      icon: "📊",
      action: () => navigate('/result-entry'),
      color: "#52c41a"
    }
  ];

  return (
    <div style={{
      padding: "16px",
      background: "linear-gradient(135deg, #f9f9f9 0%, #ffffff 100%)",
      minHeight: "100vh"
    }}>
      {/* Welcome Header */}
      <div style={{ marginBottom: '32px' }}>
        <Row gutter={[16, 16]} align="middle">
          <Col xs={24} md={12}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div>
                <Title level={2} style={{ color: '#1C2951', marginBottom: '8px', margin: 0 }}>
                  Hello, {user.name || 'Teacher'}!
                </Title>
                <Text style={{ color: '#1C2951', opacity: 0.7, fontSize: '16px' }}>
                  Welcome to your teaching dashboard
                </Text>
              </div>
            </div>
          </Col>
          <Col xs={24} md={12}>
            <div style={{ textAlign: screens.md ? 'right' : 'left' }}>
              <Button 
                type="primary" 
                size="large"
                style={{ 
                  background: '#1C2951',
                  borderColor: '#1C2951',
                  borderRadius: '25px',
                  fontWeight: 600,
                  padding: '0 20px',
                  height: '45px',
                  width: screens.md ? 'auto' : '100%'
                }}
                icon={<CalendarOutlined />}
                onClick={() => navigate('/schedule')}
              >
                View Full Schedule
              </Button>
            </div>
          </Col>
        </Row>
      </div>

      {/* Quick Actions */}
      <Row gutter={[16, 16]} style={{ marginBottom: '32px' }}>
        <Col xs={24}>
          <Title level={3} style={{ color: '#1C2951', marginBottom: '16px' }}>
            Quick Actions
          </Title>
        </Col>
        {quickActions.map((action, index) => (
          <Col xs={24} sm={12} lg={8} key={index}>
            <Card 
              style={{ 
                borderRadius: '16px',
                border: '1px solid rgba(28, 41, 81, 0.1)',
                boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                height: '100%'
              }}
              hoverable
              onClick={action.action}
            >
              <div style={{ textAlign: 'center', padding: '20px 16px' }}>
                <div style={{ 
                  fontSize: '48px', 
                  marginBottom: '16px',
                  transition: 'transform 0.3s ease'
                }}>
                  {action.icon}
                </div>
                <Title level={4} style={{ color: action.color, marginBottom: '8px' }}>
                  {action.title}
                </Title>
                <Text style={{ color: '#1C2951', opacity: 0.7, fontSize: '14px' }}>
                  {action.description}
                </Text>
              </div>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Teaching Resources */}
      <Row gutter={[16, 16]} style={{ marginTop: '24px' }}>
        <Col xs={24}>
          <Card 
            style={{ 
              borderRadius: '16px',
              border: '1px solid rgba(28, 41, 81, 0.1)',
              background: 'linear-gradient(135deg, #f8f9ff 0%, #f0f2ff 100%)'
            }}
          >
            <Row gutter={[16, 16]} align="middle">
              <Col xs={24} md={16}>
                <Title level={4} style={{ color: '#1C2951', marginBottom: '8px' }}>
                  Teaching Resources
                </Title>
                <Text style={{ color: '#1C2951', opacity: 0.7 }}>
                  Access curriculum materials, teaching guides, and educational resources to enhance your classroom experience.
                </Text>
              </Col>
              <Col xs={24} md={8}>
                <div style={{ textAlign: screens.md ? 'right' : 'left' }}>
                  <Button 
                    size="large"
                    style={{ 
                      background: '#1C2951',
                      borderColor: '#1C2951',
                      color: 'white',
                      borderRadius: '25px',
                      fontWeight: 600,
                      padding: '0 20px',
                      height: '45px',
                      width: screens.md ? 'auto' : '100%'
                    }}
                    icon={<BookOutlined />}
                    onClick={() => navigate('/resources')}
                  >
                    Explore Resources
                  </Button>
                </div>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default DashboardHome;
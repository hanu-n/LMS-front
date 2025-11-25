import React from "react";
import {
  Row,
  Col,
  Card,
  Typography,
  Button,
  Space,
  List,
  Avatar
} from "antd";
import {
  CalendarOutlined,
  BookOutlined,
  FileTextOutlined,
  TeamOutlined,
  ArrowRightOutlined,
  UserOutlined,
  ClockCircleOutlined
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const { Title, Text } = Typography;

const DashboardHome = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("sms-user")) || {};

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
      padding: "32px",
      background: "linear-gradient(135deg, #f9f9f9 0%, #ffffff 100%)",
      minHeight: "100vh",
    }}>
      {/* Welcome Header */}
      <div style={{ marginBottom: '48px' }}>
        <Row gutter={[24, 24]} align="middle">
          <Col xs={24} md={12}>
            <Title level={1} style={{ color: '#1C2951', marginBottom: '8px' }}>
             Hello, {user.name || 'Teacher'}!
            </Title>
            <Text style={{ color: '#1C2951', opacity: 0.7, fontSize: '18px' }}>
              Welcome to your teaching dashboard
            </Text>
          </Col>
          <Col xs={24} md={12}>
            <div style={{ textAlign: 'right' }}>
              <Button 
                type="primary" 
                size="large"
                style={{ 
                  background: '#1C2951',
                  borderColor: '#1C2951',
                  borderRadius: '25px',
                  fontWeight: 600,
                  padding: '0 30px',
                  height: '50px'
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
      <Row gutter={[24, 24]} style={{ marginBottom: '40px' }}>
        <Col xs={24}>
          <Title level={3} style={{ color: '#1C2951', marginBottom: '24px' }}>
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
              <div style={{ textAlign: 'center', padding: '24px 16px' }}>
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
      <Row gutter={[24, 24]} style={{ marginTop: '32px' }}>
        <Col xs={24}>
          <Card 
            style={{ 
              borderRadius: '16px',
              border: '1px solid rgba(28, 41, 81, 0.1)',
              background: 'linear-gradient(135deg, #f8f9ff 0%, #f0f2ff 100%)'
            }}
          >
            <Row gutter={[24, 24]} align="middle">
              <Col xs={24} md={16}>
                <Title level={4} style={{ color: '#1C2951', marginBottom: '8px' }}>
                  Teaching Resources
                </Title>
                <Text style={{ color: '#1C2951', opacity: 0.7 }}>
                  Access curriculum materials, teaching guides, and educational resources to enhance your classroom experience.
                </Text>
              </Col>
              <Col xs={24} md={8}>
                <div style={{ textAlign: 'right' }}>
                  <Button 
                    size="large"
                    style={{ 
                      background: '#1C2951',
                      borderColor: '#1C2951',
                      color: 'white',
                      borderRadius: '25px',
                      fontWeight: 600,
                      padding: '0 24px',
                      height: '45px'
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
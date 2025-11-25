import React from "react";
import { 
  Layout, 
  Menu, 
  Card, 
  Row, 
  Col, 
  Typography,
  Button,
  Space,
  Avatar,
  Statistic
} from "antd";
import { 
  TeamOutlined, 
  UserOutlined,
  DollarOutlined,
  BookOutlined,
  SettingOutlined,
  CalendarOutlined,
  ArrowRightOutlined,
  RocketOutlined,
  DashboardOutlined,
  CrownOutlined
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const { Header, Content, Sider } = Layout;
const { Title, Text } = Typography;

const Dashboard = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("sms-user")) || {};
  
  const menuItems = [
    { key: "dashboard", label: "Dashboard", icon: <DashboardOutlined />, onClick: () => navigate("/dashboard") },
    { key: "students", label: "Students", icon: <TeamOutlined />, onClick: () => navigate("/students") },
    { key: "attendance", label: "Attendance", icon: <CalendarOutlined />, onClick: () => navigate("/attendance") },
    { key: "fees", label: "Fees", icon: <DollarOutlined />, onClick: () => navigate("/FeeManagement") },
    { key: "users", label: "Users", icon: <UserOutlined />, onClick: () => navigate("/UserManagement") },
    { key: "settings", label: "Settings", icon: <SettingOutlined />, onClick: () => navigate("/settings") },
  ];

  const quickStats = [
    {
      title: "Total Students",
      value: 5740,
      icon: <TeamOutlined />,
      color: "#1C2951",
      description: "Active enrollments",
      action: () => navigate('/students')
    },
    {
      title: "Teachers",
      value: 56,
      icon: <UserOutlined />,
      color: "#1890ff",
      description: "Teaching staff",
      action: () => navigate('/UserManagement')
    },
    {
      title: "Classes",
      value: 108,
      icon: <BookOutlined />,
      color: "#52c41a",
      description: "Active classes",
      action: () => navigate('/attendance')
    },
    {
      title: "Collection Rate",
      value: 92,
      suffix: "%",
      icon: <DollarOutlined />,
      color: "#faad14",
      description: "Fee collection",
      action: () => navigate('/FeeManagement')
    }
  ];

  const quickActions = [
    {
      title: "Manage Students",
      description: "Add, edit, or view student records",
      icon: "👨‍🎓",
      action: () => navigate('/students'),
      color: "#1C2951"
    },
    {
      title: "User Management",
      description: "Manage teachers and admin accounts",
      icon: "👥",
      action: () => navigate('/user-management'),
      color: "#1890ff"
    },
    {
      title: "Fee Records",
      description: "View and manage fee payments",
      icon: "💰",
      action: () => navigate('/fee-management'),
      color: "#52c41a"
    },
    {
      title: "System Settings",
      description: "Configure system preferences",
      icon: "⚙️",
      action: () => navigate('/settings'),
      color: "#faad14"
    }
  ];

  return (
    <Layout style={{ minHeight: "100vh", background: 'linear-gradient(135deg, #f9f9f9 0%, #ffffff 100%)' }}>
      <Sider 
        style={{ 
          background: 'linear-gradient(135deg, #1C2951 0%, #0f1a3a 100%)',
          boxShadow: '4px 0 20px rgba(28, 41, 81, 0.1)'
        }}
      >
        <div style={{
          color: "white", 
          padding: "1.5rem 1rem", 
          textAlign: "center", 
          fontWeight: "bold",
          fontSize: "20px", 
          borderBottom: '1px solid rgba(255,255,255,0.1)',
          background: 'rgba(255,255,255,0.05)'
        }}>
          🎓 Cordova Academy
        </div>
        <Menu 
          theme="dark" 
          mode="inline" 
          defaultSelectedKeys={["dashboard"]} 
          items={menuItems}
          style={{ background: 'transparent', padding: '8px', marginTop: '16px' }}
        />
      </Sider>

      <Layout>
        <Header style={{ 
          background: "#fff", 
          padding: "0 32px", 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between',
          boxShadow: '0 2px 12px rgba(28, 41, 81, 0.08)', 
          borderBottom: '1px solid #f0f0f0' ,
          marginTop:'20px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{
              width: '48px',
              height: '48px',
              background: 'linear-gradient(135deg, #C1272D 0%, #1C2951 100%)',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontSize: '20px'
            }}>
              <CrownOutlined />
            </div>
            <div>
              <Title level={3} style={{ color: "#1C2951", margin: 0, fontWeight: 700 }}>Admin Dashboard</Title>
              <Text style={{ color: '#1C2951', opacity: 0.7 }}>Welcome back, {user.name || 'Admin'}! 👋</Text>
            </div>
          </div>
          
          <Space>
            <Avatar 
              size="large"
              style={{ 
                background: 'linear-gradient(135deg, #C1272D 0%, #1C2951 100%)',
                cursor: 'pointer'
              }}
              onClick={() => navigate('/profile')}
            >
              {user.name?.charAt(0) || 'A'}
            </Avatar>
          </Space>
        </Header>

        <Content style={{ margin: "32px", background: 'transparent' }}>
          {/* Welcome Section */}
          <Card 
            style={{ 
              marginBottom: '32px',
              borderRadius: '20px',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white',
              border: 'none',
              boxShadow: '0 8px 32px rgba(102, 126, 234, 0.3)',
              overflow: 'hidden',
              position: 'relative'
            }}
          >
            <div style={{ position: 'absolute', top: '-50px', right: '-50px', width: '200px', height: '200px', background: 'rgba(255,255,255,0.1)', borderRadius: '50%' }}></div>
            <div style={{ position: 'absolute', bottom: '-30px', left: '-30px', width: '150px', height: '150px', background: 'rgba(255,255,255,0.05)', borderRadius: '50%' }}></div>
            
            <div style={{ position: 'relative', zIndex: 2 }}>
              <Row gutter={[24, 24]} align="middle">
                <Col xs={24} md={16}>
                  <Title level={2} style={{ color: 'white', marginBottom: '16px' }}>
                    Welcome to Cordova Academy Admin Panel
                  </Title>
                  <Text style={{ color: 'rgba(255,255,255,0.9)', fontSize: '16px', lineHeight: 1.6 }}>
                    Manage your school efficiently with our comprehensive admin tools. 
                    Everything you need to run your institution is right here.
                  </Text>
                  <div style={{ marginTop: '24px' }}>
                    <Space>
                      <Button 
                        onClick={() => window.open('https://ha9nan.netlify.app/', '_blank', 'noopener,noreferrer')}
                        type="primary" 
                        size="large"
                        style={{ 
                          background: 'rgba(255,255,255,0.2)', 
                          borderColor: 'rgba(255,255,255,0.3)',
                          borderRadius: '25px',
                          height: '48px',
                          fontWeight: 600,
                          backdropFilter: 'blur(10px)'
                        }}
                        icon={<RocketOutlined />}
                      >
                        Quick Tour
                      </Button>
                      <Button 
                      onClick={() => window.open('https://ha9nan.netlify.app/', '_blank', 'noopener,noreferrer')}
                        size="large"
                        style={{ 
                          background: 'white', 
                          color: '#764ba2',
                          border: 'none',
                          borderRadius: '25px',
                          height: '48px',
                          fontWeight: 600
                        }}
                        icon={<ArrowRightOutlined />}
                      >
                        Get Started
                      </Button>
                    </Space>
                  </div>
                </Col>
                <Col xs={24} md={8}>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '80px' }}>🎯</div>
                  </div>
                </Col>
              </Row>
            </div>
          </Card>

          {/* Quick Stats */}
          <Row gutter={[24, 24]} style={{ marginBottom: '32px' }}>
            {quickStats.map((stat, index) => (
              <Col xs={24} sm={12} lg={6} key={index}>
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
                  onClick={stat.action}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div>
                      <Text style={{ color: '#1C2951', opacity: 0.8, fontSize: '14px', fontWeight: 500 }}>
                        {stat.title}
                      </Text>
                      <div style={{ marginTop: '8px' }}>
                        <Statistic
                          value={stat.value}
                          suffix={stat.suffix}
                          valueStyle={{ color: stat.color, fontSize: '28px', fontWeight: 700 }}
                        />
                      </div>
                      <Text style={{ color: '#1C2951', opacity: 0.6, fontSize: '12px' }}>
                        {stat.description}
                      </Text>
                    </div>
                    <div style={{
                      width: '50px',
                      height: '50px',
                      background: `${stat.color}15`,
                      borderRadius: '12px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: stat.color,
                      fontSize: '20px'
                    }}>
                      {stat.icon}
                    </div>
                  </div>
                </Card>
              </Col>
            ))}
          </Row>

          {/* Quick Actions */}
          <Row gutter={[24, 24]}>
            <Col xs={24}>
              <Card 
                title={
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <RocketOutlined style={{ color: '#1C2951', fontSize: '18px' }} />
                    <span style={{ color: '#1C2951', fontWeight: 600, fontSize: '18px' }}>Quick Actions</span>
                  </div>
                }
                style={{ 
                  borderRadius: '16px',
                  border: '1px solid rgba(28, 41, 81, 0.1)',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
                }}
              >
                <Row gutter={[24, 24]}>
                  {quickActions.map((action, index) => (
                    <Col xs={24} sm={12} lg={6} key={index}>
                      <Card 
                        style={{ 
                          borderRadius: '12px',
                          border: `2px solid ${action.color}20`,
                          background: `${action.color}05`,
                          cursor: 'pointer',
                          transition: 'all 0.3s ease',
                          height: '100%'
                        }}
                        hoverable
                        onClick={action.action}
                      >
                        <div style={{ textAlign: 'center', padding: '16px' }}>
                          <div style={{ fontSize: '40px', marginBottom: '12px' }}>
                            {action.icon}
                          </div>
                          <Title level={5} style={{ color: action.color, marginBottom: '8px' }}>
                            {action.title}
                          </Title>
                          <Text style={{ color: '#1C2951', opacity: 0.7, fontSize: '13px' }}>
                            {action.description}
                          </Text>
                        </div>
                      </Card>
                    </Col>
                  ))}
                </Row>
              </Card>
            </Col>
          </Row>

          {/* System Status */}
          <Row gutter={[24, 24]} style={{ marginTop: '32px' }}>
            <Col xs={24}>
              <Card 
                style={{ 
                  borderRadius: '16px',
                  border: '1px solid rgba(28, 41, 81, 0.1)',
                  background: 'linear-gradient(135deg, #f8f9ff 0%, #f0f2ff 100%)'
                }}
              >
                <div style={{ textAlign: 'center', padding: '20px' }}>
                  <div style={{ fontSize: '48px', marginBottom: '16px' }}>✅</div>
                  <Title level={4} style={{ color: '#1C2951', marginBottom: '8px' }}>
                    System Running Smoothly
                  </Title>
                  <Text style={{ color: '#1C2951', opacity: 0.7 }}>
                    All systems operational. No issues reported.
                  </Text>
                </div>
              </Card>
            </Col>
          </Row>
        </Content>
      </Layout>
    </Layout>
  );
};

export default Dashboard;
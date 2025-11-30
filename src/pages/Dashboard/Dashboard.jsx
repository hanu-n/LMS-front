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
  Statistic,
  Drawer,
  Grid,
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
  CrownOutlined,
  MenuOutlined,
  CloseOutlined // Add this import
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const { Header, Content, Sider } = Layout;
const { Title, Text } = Typography;

const Dashboard = () => {
  const navigate = useNavigate();
  const [mobileMenuVisible, setMobileMenuVisible] = React.useState(false);
  const user = JSON.parse(localStorage.getItem("sms-user")) || {};
  const screens = Grid.useBreakpoint();
  
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
      {/* Desktop Sidebar - Hidden on mobile */}
      <Sider 
        breakpoint="lg"
        collapsedWidth="0"
        trigger={null}
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
          padding: "0 16px", 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between',
          boxShadow: '0 2px 12px rgba(28, 41, 81, 0.08)', 
          borderBottom: '1px solid #f0f0f0',
          height: '70px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            {/* Mobile Menu Button - visible on small screens */}
            {!screens.lg && (
              <Button
                type="text"
                icon={mobileMenuVisible ? <CloseOutlined /> : <MenuOutlined />}
                onClick={() => setMobileMenuVisible(!mobileMenuVisible)}
              />
            )}
            
            <div style={{
              width: '40px',
              height: '40px',
              background: 'linear-gradient(135deg, #C1272D 0%, #1C2951 100%)',
              borderRadius: '10px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontSize: '16px'
            }}>
              <CrownOutlined />
            </div>
            <div>
              <Title level={4} style={{ color: "#1C2951", margin: 0, fontWeight: 700, fontSize: '18px' }}>Admin Dashboard</Title>
              <Text style={{ color: '#1C2951', opacity: 0.7, fontSize: '14px' }}>Welcome back, {user.name || 'Admin'}! 👋</Text>
            </div>
          </div>
          
          <Space>
            <Avatar 
              size="default"
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

        {/* Mobile Menu Drawer */}
        <Drawer
          title={
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span>Menu</span>
              <Button 
                type="text" 
                icon={<CloseOutlined />} 
                onClick={() => setMobileMenuVisible(false)}
                style={{ color: '#1C2951' }}
              />
            </div>
          }
          placement="left"
          onClose={() => setMobileMenuVisible(false)}
          open={mobileMenuVisible}
          width={280}
          closable={false}
          styles={{
            body: { 
              padding: 0,
              background: 'linear-gradient(135deg, #1C2951 0%, #0f1a3a 100%)'
            },
            header: {
              background: 'white',
              borderBottom: '1px solid #f0f0f0'
            }
          }}
        >
          <div style={{
            color: "white", 
            padding: "1.5rem 1rem", 
            textAlign: "center", 
            fontWeight: "bold",
            fontSize: "18px", 
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
            onClick={() => setMobileMenuVisible(false)}
          />
        </Drawer>

        <Content style={{ margin: "16px", background: 'transparent' }}>
          {/* Welcome Section */}
          <Card 
            style={{ 
              marginBottom: '24px',
              borderRadius: '16px',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white',
              border: 'none',
              boxShadow: '0 8px 32px rgba(102, 126, 234, 0.3)',
              overflow: 'hidden',
              position: 'relative'
            }}
          >
            <div style={{ position: 'absolute', top: '-30px', right: '-30px', width: '120px', height: '120px', background: 'rgba(255,255,255,0.1)', borderRadius: '50%' }}></div>
            <div style={{ position: 'absolute', bottom: '-20px', left: '-20px', width: '80px', height: '80px', background: 'rgba(255,255,255,0.05)', borderRadius: '50%' }}></div>
            
            <div style={{ position: 'relative', zIndex: 2 }}>
              <Row gutter={[16, 16]} align="middle">
                <Col xs={24} md={16}>
                  <Title level={3} style={{ color: 'white', marginBottom: '12px', fontSize: '20px' }}>
                    Welcome to Cordova Academy Admin Panel
                  </Title>
                  <Text style={{ color: 'rgba(255,255,255,0.9)', fontSize: '14px', lineHeight: 1.6, display: 'block' }}>
                    Manage your school efficiently with our comprehensive admin tools. 
                    Everything you need to run your institution is right here.
                  </Text>
                  <div style={{ marginTop: '16px' }}>
                    <Space direction="vertical" style={{ width: '100%' }} size="middle">
                      <Button 
                        onClick={() => window.open('https://ha9nan.netlify.app/', '_blank', 'noopener,noreferrer')}
                        type="primary" 
                        size="middle"
                        style={{ 
                          background: 'rgba(255,255,255,0.2)', 
                          borderColor: 'rgba(255,255,255,0.3)',
                          borderRadius: '20px',
                          height: '40px',
                          fontWeight: 600,
                          backdropFilter: 'blur(10px)',
                          width: '100%'
                        }}
                        icon={<RocketOutlined />}
                      >
                        Quick Tour
                      </Button>
                      <Button 
                        onClick={() => window.open('https://ha9nan.netlify.app/', '_blank', 'noopener,noreferrer')}
                        size="middle"
                        style={{ 
                          background: 'white', 
                          color: '#764ba2',
                          border: 'none',
                          borderRadius: '20px',
                          height: '40px',
                          fontWeight: 600,
                          width: '100%'
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
                    <div style={{ fontSize: '60px' }}>🎯</div>
                  </div>
                </Col>
              </Row>
            </div>
          </Card>

          {/* Quick Stats */}
          <Row gutter={[16, 16]} style={{ marginBottom: '24px' }}>
            {quickStats.map((stat, index) => (
              <Col xs={24} sm={12} lg={6} key={index}>
                <Card 
                  style={{ 
                    borderRadius: '12px',
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
                      <Text style={{ color: '#1C2951', opacity: 0.8, fontSize: '13px', fontWeight: 500 }}>
                        {stat.title}
                      </Text>
                      <div style={{ marginTop: '6px' }}>
                        <Statistic
                          value={stat.value}
                          suffix={stat.suffix}
                          valueStyle={{ color: stat.color, fontSize: '22px', fontWeight: 700 }}
                        />
                      </div>
                      <Text style={{ color: '#1C2951', opacity: 0.6, fontSize: '11px' }}>
                        {stat.description}
                      </Text>
                    </div>
                    <div style={{
                      width: '40px',
                      height: '40px',
                      background: `${stat.color}15`,
                      borderRadius: '10px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: stat.color,
                      fontSize: '16px'
                    }}>
                      {stat.icon}
                    </div>
                  </div>
                </Card>
              </Col>
            ))}
          </Row>

          {/* Quick Actions */}
          <Row gutter={[16, 16]}>
            <Col xs={24}>
              <Card 
                title={
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <RocketOutlined style={{ color: '#1C2951', fontSize: '16px' }} />
                    <span style={{ color: '#1C2951', fontWeight: 600, fontSize: '16px' }}>Quick Actions</span>
                  </div>
                }
                style={{ 
                  borderRadius: '12px',
                  border: '1px solid rgba(28, 41, 81, 0.1)',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
                }}
              >
                <Row gutter={[16, 16]}>
                  {quickActions.map((action, index) => (
                    <Col xs={24} sm={12} lg={6} key={index}>
                      <Card 
                        style={{ 
                          borderRadius: '10px',
                          border: `2px solid ${action.color}20`,
                          background: `${action.color}05`,
                          cursor: 'pointer',
                          transition: 'all 0.3s ease',
                          height: '100%'
                        }}
                        hoverable
                        onClick={action.action}
                      >
                        <div style={{ textAlign: 'center', padding: '12px' }}>
                          <div style={{ fontSize: '32px', marginBottom: '8px' }}>
                            {action.icon}
                          </div>
                          <Title level={5} style={{ color: action.color, marginBottom: '6px', fontSize: '14px' }}>
                            {action.title}
                          </Title>
                          <Text style={{ color: '#1C2951', opacity: 0.7, fontSize: '12px' }}>
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
          <Row gutter={[16, 16]} style={{ marginTop: '24px' }}>
            <Col xs={24}>
              <Card 
                style={{ 
                  borderRadius: '12px',
                  border: '1px solid rgba(28, 41, 81, 0.1)',
                  background: 'linear-gradient(135deg, #f8f9ff 0%, #f0f2ff 100%)'
                }}
              >
                <div style={{ textAlign: 'center', padding: '16px' }}>
                  <div style={{ fontSize: '36px', marginBottom: '12px' }}>✅</div>
                  <Title level={5} style={{ color: '#1C2951', marginBottom: '6px', fontSize: '16px' }}>
                    System Running Smoothly
                  </Title>
                  <Text style={{ color: '#1C2951', opacity: 0.7, fontSize: '14px' }}>
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
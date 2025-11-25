import React from 'react';
import { 
  Card, 
  Row, 
  Col, 
  Typography, 
  Avatar, 
  Tag, 
  Divider, 
  Button, 
  Space,
  Descriptions,
  Statistic,
  List
} from 'antd';
import { 
  UserOutlined, 
  MailOutlined, 
  PhoneOutlined, 
  CalendarOutlined,
  BookOutlined,
  TeamOutlined,
  EditOutlined,
  SafetyCertificateOutlined,
  DashboardOutlined,
  SettingOutlined,
  AuditOutlined
} from '@ant-design/icons';

const { Title, Text } = Typography;

const Profile = () => {
  const user = JSON.parse(localStorage.getItem("sms-user")) || {};
  
  // Role-based data
  const getProfileData = () => {
    const baseData = {
      name: user.name || "User Name",
      email: user.email || "user@school.edu",
      phone: "+251 91 234 5678",
      joinDate: "2023-09-01",
      status: "Active"
    };

    if (user.role === 'teacher') {
      return {
        ...baseData,
        employeeId: "TEA001",
        department: "Mathematics",
        subjects: ["Algebra", "Geometry", "Calculus"],
        classes: ["Grade 10-A", "Grade 11-B", "Grade 12-C"],
        qualifications: ["MSc in Mathematics", "BEd in Education"],
        experience: "5 years",
        studentsCount: 45,
        attendanceRate: "98%"
      };
    }

    if (user.role === 'admin') {
      return {
        ...baseData,
        employeeId: "ADM001",
        department: "Administration",
        responsibilities: ["User Management", "System Configuration", "Reports"],
        accessLevel: "Full System Access",
        managedTeachers: 24,
        managedStudents: 480,
        systemHealth: "Optimal"
      };
    }

    return baseData;
  };

  const profileData = getProfileData();
  const isTeacher = user.role === 'teacher';
  const isAdmin = user.role === 'admin';

  const getRoleColor = () => {
    return isTeacher ? "#1890ff" : isAdmin ? "#52c41a" : "#faad14";
  };

  const getRoleGradient = () => {
    return isTeacher 
      ? 'linear-gradient(135deg, #1890ff 0%, #36cfc9 100%)'
      : 'linear-gradient(135deg, #52c41a 0%, #73d13d 100%)';
  };

  return (
    <div style={{ padding: '24px', background: '#f5f5f5', minHeight: '100vh' }}>
      {/* Header Section */}
      <Card 
        style={{ 
          marginBottom: 24, 
          borderRadius: 16,
          background: getRoleGradient(),
          color: 'white',
          border: 'none'
        }}
      >
        <Row gutter={[24, 24]} align="middle">
          <Col xs={24} sm={8}>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <Avatar 
                size={120} 
                style={{ 
                  background: 'rgba(255,255,255,0.2)',
                  border: '4px solid rgba(255,255,255,0.3)',
                  fontSize: '40px'
                }}
                icon={<UserOutlined />}
              >
                {user.name?.charAt(0)}
              </Avatar>
            </div>
          </Col>
          <Col xs={24} sm={16}>
            <Title level={2} style={{ color: 'white', marginBottom: 8 }}>
              {profileData.name}
            </Title>
            <Text style={{ color: 'rgba(255,255,255,0.9)', fontSize: '16px' }}>
              {isTeacher && `${profileData.department} Department`}
              {isAdmin && `System Administrator`}
            </Text>
            <div style={{ marginTop: 16 }}>
              <Tag color="green" style={{ fontSize: '14px', padding: '4px 12px', background: 'rgba(255,255,255,0.2)' }}>
                {profileData.status}
              </Tag>
              <Tag color={getRoleColor()} style={{ fontSize: '14px', padding: '4px 12px', background: 'rgba(255,255,255,0.2)' }}>
                {user.role?.toUpperCase()}
              </Tag>
              <Tag color="blue" style={{ fontSize: '14px', padding: '4px 12px', background: 'rgba(255,255,255,0.2)' }}>
                ID: {profileData.employeeId}
              </Tag>
            </div>
          </Col>
        </Row>
      </Card>

      <Row gutter={[24, 24]}>
        {/* Personal Information */}
        <Col xs={24} lg={24}>
          <Card 
            title={
              <span>
                <UserOutlined style={{ marginRight: 8 }} />
                Personal Information
              </span>
            }
            extra={<Button type="link" icon={<EditOutlined />}>Edit</Button>}
            style={{ borderRadius: 12 }}
          >
            <Descriptions column={1} bordered>
              <Descriptions.Item label="Full Name">
                <UserOutlined style={{ marginRight: 8 }} />
                {profileData.name}
              </Descriptions.Item>
              <Descriptions.Item label="Email">
                <MailOutlined style={{ marginRight: 8 }} />
                {profileData.email}
              </Descriptions.Item>
              <Descriptions.Item label="Phone">
                <PhoneOutlined style={{ marginRight: 8 }} />
                {profileData.phone}
              </Descriptions.Item>
              <Descriptions.Item label="Join Date">
                <CalendarOutlined style={{ marginRight: 8 }} />
                {profileData.joinDate}
              </Descriptions.Item>
              <Descriptions.Item label="Employee ID">
                <SafetyCertificateOutlined style={{ marginRight: 8 }} />
                {profileData.employeeId}
              </Descriptions.Item>
            </Descriptions>
          </Card>
        </Col>
      </Row>
      {/* Quick Actions */}
      <Card 
        title={
          <span>
            <DashboardOutlined style={{ marginRight: 8 }} />
            Quick Actions
          </span>
        }
        style={{ marginTop: 24, borderRadius: 12 }}
      >
        <Row gutter={[16, 16]}>
          {isTeacher && (
            <>
              <Col xs={24} sm={8}>
                <Button 
                  type="primary" 
                  block 
                  size="large"
                  icon={<BookOutlined />}
                  onClick={() => window.location.href = '/attendance'}
                >
                  Take Attendance
                </Button>
              </Col>
              <Col xs={24} sm={8}>
                <Button 
                  block 
                  size="large"
                  icon={<TeamOutlined />}
                  onClick={() => window.location.href = '/teacher'}
                >
                Go to Dashboard
                </Button>
              </Col>
              <Col xs={24} sm={8}>
                <Button 
                  block 
                  size="large"
                  icon={<EditOutlined />}
                  onClick={() => window.location.href = '/result-entry'}
                >
                  Enter Grades
                </Button>
              </Col>
            </>
          )}

          {isAdmin && (
            <>
              <Col xs={24} sm={6}>
                <Button 
                  type="primary" 
                  block 
                  size="large"
                  icon={<UserOutlined />}
                  onClick={() => window.location.href = '/user-management'}
                >
                  Manage Users
                </Button>
              </Col>
              <Col xs={24} sm={6}>
                <Button 
                  block 
                  size="large"
                  icon={<TeamOutlined />}
                  onClick={() => window.location.href = '/reports'}
                >
                  View Reports
                </Button>
              </Col>
              <Col xs={24} sm={6}>
                <Button 
                  block 
                  size="large"
                  icon={<SettingOutlined />}
                  onClick={() => window.location.href = '/system-settings'}
                >
                  System Settings
                </Button>
              </Col>
              <Col xs={24} sm={6}>
                <Button 
                  block 
                  size="large"
                  icon={<AuditOutlined />}
                  onClick={() => window.location.href = '/audit-logs'}
                >
                  Audit Logs
                </Button>
              </Col>
            </>
          )}
        </Row>
      </Card>
    </div>
  );
};

export default Profile;
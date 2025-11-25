import React from "react";
import { 
  Card, 
  Typography, 
  Button, 
  Row,
  Col
} from "antd";
import { 
  RocketOutlined,
  CalendarOutlined
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const { Title, Text } = Typography;

const Schedule = () => {
  const navigate = useNavigate();

  return (
    <div style={{
      minHeight: "100vh",
      background: `linear-gradient(135deg, rgba(28, 41, 81, 0.9) 0%, rgba(193, 39, 45, 0.8) 100%), url('https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundAttachment: 'fixed',
      padding: "32px",
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      
      {/* Animated Main Card */}
      <Card 
        style={{ 
          borderRadius: '30px',
          border: 'none',
          background: 'rgba(255,255,255,0.95)',
          backdropFilter: 'blur(20px)',
          boxShadow: `
            0 25px 50px rgba(0,0,0,0.25),
            0 0 100px rgba(193, 39, 45, 0.1),
            inset 0 1px 0 rgba(255,255,255,0.6)
          `,
          overflow: 'hidden',
          position: 'relative',
          maxWidth: '600px',
          width: '100%',
          animation: 'float 6s ease-in-out infinite'
        }}
        bodyStyle={{ 
          padding: '60px 40px',
          textAlign: 'center'
        }}
      >
        <style>
          {`
            @keyframes float {
              0%, 100% { transform: translateY(0px) scale(1); }
              50% { transform: translateY(-10px) scale(1.02); }
            }
            @keyframes glow {
              0%, 100% { box-shadow: 0 25px 50px rgba(0,0,0,0.25), 0 0 100px rgba(193, 39, 45, 0.1); }
              50% { box-shadow: 0 30px 60px rgba(0,0,0,0.3), 0 0 120px rgba(193, 39, 45, 0.2); }
            }
            @keyframes spin {
              0% { transform: rotate(0deg) scale(1); }
              50% { transform: rotate(180deg) scale(1.1); }
              100% { transform: rotate(360deg) scale(1); }
            }
            @keyframes pulse {
              0%, 100% { transform: scale(1); opacity: 1; }
              50% { transform: scale(1.05); opacity: 0.8; }
            }
          `}
        </style>

        {/* Animated Background Elements */}
        <div style={{
          position: 'absolute',
          top: '-100px',
          right: '-100px',
          width: '200px',
          height: '200px',
          background: 'linear-gradient(135deg, #C1272D20 0%, #1C295120 100%)',
          borderRadius: '50%',
          animation: 'spin 20s linear infinite'
        }}></div>
        
        <div style={{
          position: 'absolute',
          bottom: '-80px',
          left: '-80px',
          width: '160px',
          height: '160px',
          background: 'linear-gradient(135deg, #1C295120 0%, #C1272D20 100%)',
          borderRadius: '50%',
          animation: 'spin 15s linear infinite reverse'
        }}></div>

        {/* Floating Icon */}
        <div style={{
          fontSize: '80px',
          marginBottom: '30px',
          animation: 'pulse 3s ease-in-out infinite',
          filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.1))'
        }}>
          🚀
        </div>

        {/* Main Content */}
        <div style={{ position: 'relative', zIndex: 2 }}>
          <Title level={1} style={{ 
            color: '#1C2951', 
            marginBottom: '16px',
            fontWeight: 800,
            background: 'linear-gradient(135deg, #1C2951 0%, #C1272D 100%)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            fontSize: '3rem'
          }}>
            Schedule Coming Soon
          </Title>
          
          <Text style={{ 
            color: '#1C2951', 
            opacity: 0.8, 
            fontSize: '18px', 
            lineHeight: 1.6,
            display: 'block',
            marginBottom: '40px'
          }}>
            We're crafting something extraordinary for your teaching experience. 
            Stay tuned for the ultimate scheduling solution!
          </Text>

          {/* Animated Progress Bar */}
          <div style={{
            height: '6px',
            background: 'rgba(28, 41, 81, 0.1)',
            borderRadius: '10px',
            margin: '40px 0',
            overflow: 'hidden',
            position: 'relative'
          }}>
            <div style={{
              height: '100%',
              width: '65%',
              background: 'linear-gradient(90deg, #C1272D 0%, #1C2951 100%)',
              borderRadius: '10px',
              animation: 'pulse 2s ease-in-out infinite',
              position: 'relative'
            }}>
              <div style={{
                position: 'absolute',
                top: '0',
                right: '0',
                height: '100%',
                width: '20%',
                background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.4) 50%, transparent 100%)',
                animation: 'shimmer 2s ease-in-out infinite'
              }}></div>
            </div>
          </div>

          <style>
            {`
              @keyframes shimmer {
                0% { transform: translateX(-100%); }
                100% { transform: translateX(400%); }
              }
            `}
          </style>

          {/* Action Buttons */}
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Button 
              type="primary"
              size="large"
              style={{ 
                background: 'linear-gradient(135deg, #C1272D 0%, #1C2951 100%)',
                border: 'none',
                borderRadius: '25px',
                fontWeight: 700,
                padding: '0 35px',
                height: '55px',
                fontSize: '16px',
                boxShadow: '0 10px 30px rgba(193, 39, 45, 0.4)',
                animation: 'pulse 2s ease-in-out infinite'
              }}
              icon={<RocketOutlined />}
              onClick={() => navigate('/attendance')}
            >
              Explore Features
            </Button>
            
            <Button 
              size="large"
              style={{ 
                background: 'transparent',
                border: '2px solid #1C2951',
                borderRadius: '25px',
                fontWeight: 600,
                padding: '0 30px',
                height: '55px',
                fontSize: '16px',
                color: '#1C2951',
                transition: 'all 0.3s ease'
              }}
              icon={<CalendarOutlined />}
              onMouseEnter={(e) => {
                e.target.style.background = '#1C2951';
                e.target.style.color = 'white';
                e.target.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.target.style.background = 'transparent';
                e.target.style.color = '#1C2951';
                e.target.style.transform = 'translateY(0)';
              }}
            >
              Notify Me
            </Button>
          </div>

          {/* Mini Feature Dots */}
          <div style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            gap: '12px', 
            marginTop: '40px',
            opacity: 0.7
          }}>
            {['⏰', '📅', '🔔', '📊', '👥'].map((icon, index) => (
              <div 
                key={index}
                style={{
                  fontSize: '20px',
                  animation: `pulse 2s ease-in-out infinite ${index * 0.2}s`
                }}
              >
                {icon}
              </div>
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Schedule;
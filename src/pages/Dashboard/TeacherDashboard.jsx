import React, { useState } from "react";
import { Layout, Menu, Select } from "antd";
import { Outlet, useNavigate } from "react-router-dom";
import {
  DashboardOutlined,
  TeamOutlined,
  BellOutlined,
  UserOutlined,
  LogoutOutlined,
  BookOutlined,
  MenuOutlined,
  CloseOutlined
} from "@ant-design/icons";
import DashboardHome from "./DashboardHome";

const { Header, Sider, Content } = Layout;
const { Option } = Select;

const TeacherDashboard = () => {
  const navigate = useNavigate();
  const [selectedGrade, setSelectedGrade] = useState(localStorage.getItem("grade") || "");
  const [selectedSection, setSelectedSection] = useState(localStorage.getItem("section") || "");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuVisible, setMobileMenuVisible] = useState(false);

  const handleClassChange = (grade, section) => {
    setSelectedGrade(grade);
    setSelectedSection(section);
    localStorage.setItem("grade", grade);
    localStorage.setItem("section", section);
  };

  const handleMenuToggle = () => {
    setSidebarCollapsed(!sidebarCollapsed);
    setMobileMenuVisible(!mobileMenuVisible);
  };

  const items = [
    { key: "dashboard", icon: <DashboardOutlined />, label: "Dashboard", path: "/teacher" },
    { key: "students", icon: <TeamOutlined />, label: "Manage Students", path: "/students" },
    { key: "attendance", icon: <BookOutlined />, label: "Attendance", path: "/Attendance" },
    { key: "schedule", icon: <BellOutlined />, label: "Schedule", path: "/schedule" },
    { key: "profile", icon: <UserOutlined />, label: "Profile Settings", path: "/profile" },
    { key: "logout", icon: <LogoutOutlined />, label: "Logout", path: "/logout" },
  ];

  const handleClick = (e) => {
    const selected = items.find((item) => item.key === e.key);
    if (selected) {
      navigate(selected.path);
      // Close mobile menu when item is clicked
      setMobileMenuVisible(false);
      setSidebarCollapsed(true);
    }
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      {/* Sidebar - Hidden on mobile when collapsed */}
      <Sider 
        collapsible
        collapsed={sidebarCollapsed}
        breakpoint="md"
        collapsedWidth="0"
        onCollapse={(collapsed) => {
          setSidebarCollapsed(collapsed);
          setMobileMenuVisible(!collapsed);
        }}
        style={{
          zIndex: 1000
        }}
      >
        <div
          style={{
            color: "#fff",
            textAlign: "center",
            padding: "16px",
            fontWeight: "bold",
            fontSize: "18px",
          }}
        >
          Teacher Panel
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["dashboard"]}
          items={items.map(({ key, icon, label }) => ({ key, icon, label }))}
          onClick={handleClick}
        />
      </Sider>

      {/* Main layout */}
      <Layout>
        <Header
          style={{
            background: "#fff",
            padding: "0 16px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
            position: "sticky",
            top: 0,
            zIndex: 999
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            {/* Mobile Menu Toggle Button */}
            <div style={{ 
              display: "block",
              "@media (min-width: 768px)": {
                display: "none"
              }
            }}>
              <button
                onClick={handleMenuToggle}
                style={{
                  background: "none",
                  border: "none",
                  fontSize: "18px",
                  cursor: "pointer",
                  color: "#1C2951",
                  padding: "8px",
                  borderRadius: "4px"
                }}
              >
                {mobileMenuVisible ? <CloseOutlined /> : <MenuOutlined />}
              </button>
            </div>
            
            <h2 style={{ margin: 0, fontSize: "18px" }}>
              📘 {selectedGrade && selectedSection
                ? `${selectedGrade} ${selectedSection} Dashboard`
                : "Teacher Dashboard"}
            </h2>
          </div>

          {/* Grade and Section selector - Hidden on mobile when no class selected */}
          {selectedGrade && (
            <div style={{ 
              display: "flex", 
              alignItems: "center", 
              gap: "8px",
              "@media (max-width: 768px)": {
                display: selectedGrade ? "flex" : "none"
              }
            }}>
              <Select
                placeholder="Select Grade"
                value={selectedGrade || undefined}
                style={{ width: 120 }}
                onChange={(val) => handleClassChange(val, selectedSection)}
                size="small"
              >
                {[1,2,3,4,5,6,7,8,9,10,11,12].map((g) => (
                  <Option key={g} value={`Grade ${g}`}>
                    Grade {g}
                  </Option>
                ))}
              </Select>
              <Select
                placeholder="Section"
                value={selectedSection || undefined}
                style={{ width: 100 }}
                onChange={(val) => handleClassChange(selectedGrade, val)}
                size="small"
              >
                {["A", "B", "C", "D"].map((s) => (
                  <Option key={s} value={s}>
                    {s}
                  </Option>
                ))}
              </Select>
            </div>
          )}
        </Header>

        {/* Main Content */}
        <Content
          style={{
            margin: "16px",
            padding: "16px",
            background: "#fff",
            borderRadius: "8px",
            "@media (min-width: 768px)": {
              padding: "24px",
              margin: "24px"
            }
          }}
        >
          {selectedGrade && selectedSection ? (
            <DashboardHome 
              grade={selectedGrade} 
              section={selectedSection}
              onMenuToggle={handleMenuToggle}
              isSidebarCollapsed={sidebarCollapsed}
            />
          ) : (
            <div style={{ textAlign: "center", marginTop: "100px" }}>
              <h3>Please select your class to view dashboard 📘</h3>
            </div>
          )}
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default TeacherDashboard;
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
} from "@ant-design/icons";
import DashboardHome from "./DashboardHome";

const { Header, Sider, Content } = Layout;
const { Option } = Select;

const TeacherDashboard = () => {
  const navigate = useNavigate();
  const [selectedGrade, setSelectedGrade] = useState(localStorage.getItem("grade") || "");
  const [selectedSection, setSelectedSection] = useState(localStorage.getItem("section") || "");

  const handleClassChange = (grade, section) => {
    setSelectedGrade(grade);
    setSelectedSection(section);
    localStorage.setItem("grade", grade);
    localStorage.setItem("section", section);
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
    if (selected) navigate(selected.path);
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      {/* Sidebar */}
      <Sider collapsible>
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
            padding: "0 24px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
          }}
        >
          <h2 style={{ margin: 0 }}>
            📘 {selectedGrade && selectedSection
              ? `${selectedGrade} ${selectedSection} Dashboard`
              : "Teacher Dashboard"}
          </h2>

          {/* Grade and Section selector */}
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <Select
              placeholder="Select Grade"
              value={selectedGrade || undefined}
              style={{ width: 120 }}
              onChange={(val) => handleClassChange(val, selectedSection)}
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
            >
              {["A", "B", "C", "D"].map((s) => (
                <Option key={s} value={s}>
                  {s}
                </Option>
              ))}
            </Select>
          </div>
        </Header>

        {/* Main Content */}
        <Content
          style={{
            margin: "16px",
            padding: "24px",
            background: "#fff",
            borderRadius: "8px",
          }}
        >
          {selectedGrade && selectedSection ? (
            <DashboardHome grade={selectedGrade} section={selectedSection} />
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

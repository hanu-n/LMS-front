import React, { useEffect, useMemo, useState } from "react";
import {
  Card,
  Select,
  DatePicker,
  Row,
  Col,
  Button,
  Input,
  Table,
  Tag,
  Space,
  message,
  Typography,
  Avatar,
  Tooltip
} from "antd";
import dayjs from "dayjs";
import axiosInstance from "../../axiosInstance";
import { 
  SaveOutlined, 
  SearchOutlined, 
  TeamOutlined,
  CalendarOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  UserOutlined,
  FileTextOutlined,
  BookOutlined,
  ReloadOutlined
} from "@ant-design/icons";
import { toast } from "react-hot-toast";

const { Option } = Select;
const { Title, Text } = Typography;

export default function AttendanceMonthly() {
  const [grade, setGrade] = useState("");
  const [section, setSection] = useState("");
  const [month, setMonth] = useState(dayjs().format("YYYY-MM"));
  const [search, setSearch] = useState("");
  const [students, setStudents] = useState([]);
  const [attendance, setAttendance] = useState({});
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [dataLoaded, setDataLoaded] = useState(false);

  const grades = ["Grade 1", "Grade 2", "Grade 3", "Grade 4", "Grade 5", "Grade 6", "Grade 7", "Grade 8", "Grade 9", "Grade 10","Grade 11","Grade 12"];
  const sections = ["A", "B", "C","D","E","F","G","H","I","J"];

  // Helper function for localStorage key
  const getStorageKey = () => `attendance_${grade}_${section}_${month}`;

  // Compute weekdays for the selected month
  const days = useMemo(() => {
    const year = dayjs(month, "YYYY-MM").year();
    const monthIdx = dayjs(month, "YYYY-MM").month();
    const daysInMonth = dayjs(new Date(year, monthIdx + 1, 0)).date();

    const weekdayMap = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    return Array.from({ length: daysInMonth }, (_, i) => {
      const d = dayjs(new Date(year, monthIdx, i + 1));
      const weekdayName = weekdayMap[d.day()];
      const isWeekend = d.day() === 0 || d.day() === 6;
      return { 
        dateISO: d.format("YYYY-MM-DD"), 
        weekdayLabel: weekdayName,
        isWeekend 
      };
    });
  }, [month]);

  // Fetch students when grade and section are selected
  useEffect(() => {
    const fetchStudents = async () => {
      if (!grade || !section) {
        setStudents([]);
        setAttendance({});
        setDataLoaded(false);
        return;
      }
      setLoading(true);
      try {
        const res = await axiosInstance.get(
          `/students/class/${encodeURIComponent(grade)}/${encodeURIComponent(section)}`
        );
        setStudents(res.data || []);
        setDataLoaded(false); // Reset to trigger attendance fetch
      } catch (err) {
        console.error("❌ Error fetching students:", err);
        message.error("Failed to load students");
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, [grade, section]);

  // Load attendance data when students are loaded or month changes
  useEffect(() => {
    const fetchSavedAttendance = async () => {
      if (!grade || !section || !month || students.length === 0) {
        return;
      }

      try {
        console.log("🔄 Fetching saved attendance from server...");
        const res = await axiosInstance.get(
          `/attendance/monthly/${encodeURIComponent(grade)}/${encodeURIComponent(section)}/${month}`
        );

        if (res.data.attendanceData) {
          console.log("✅ Loaded attendance records:", Object.keys(res.data.attendanceData).length);
          setAttendance(res.data.attendanceData);
          localStorage.setItem(getStorageKey(), JSON.stringify(res.data.attendanceData));
        } else {
          setAttendance({});
          localStorage.removeItem(getStorageKey());
        }
        setDataLoaded(true);
      } catch (err) {
        console.log("No previous attendance found or error:", err);
        setAttendance({});
        setDataLoaded(true);
      }
    };

    if (students.length > 0 && !dataLoaded) {
      fetchSavedAttendance();
    }
  }, [students, month, grade, section, dataLoaded]);

  // Handle status change
  const handleStatusChange = (studentId, dateISO, newStatus) => {
    const key = `${studentId}_${dateISO}`;
    console.log("🔄 Changing status:", { key, newStatus });
    
    setAttendance(prev => ({
      ...prev,
      [key]: newStatus
    }));
  };

  // Save attendance
  const handleSave = async () => {
    if (!grade || !section) {
      message.warning("Please select grade and section first");
      return;
    }

    const entriesToSave = Object.entries(attendance).filter(
      ([key, status]) => status && status !== "Not Marked" && status !== ""
    );

    if (entriesToSave.length === 0) {
      message.warning("No attendance data to save");
      return;
    }

    setSaving(true);
    try {
      const payload = {
        grade,
        section,
        month,
        attendanceData: Object.fromEntries(entriesToSave),
      };

      const response = await axiosInstance.post(
        "/attendance/save",
        payload
      );

      if (response.data.success) {
        toast.success(`✅ ${entriesToSave.length} records saved successfully!`);

        // Refresh data from server to ensure consistency
        const refreshRes = await axiosInstance.get(
          `/attendance/monthly/${encodeURIComponent(grade)}/${encodeURIComponent(section)}/${month}`
        );

        if (refreshRes.data.attendanceData) {
          setAttendance(refreshRes.data.attendanceData);
          localStorage.setItem(getStorageKey(), JSON.stringify(refreshRes.data.attendanceData));
        }

        toast.success("💾 Attendance saved and updated successfully!");
      } else {
        throw new Error(response.data.message || "Failed to save attendance");
      }
    } catch (error) {
      console.error("❌ Save error:", error);
      toast.error("❌ Failed to save attendance");
      message.error(error.response?.data?.message || "Save failed");
    } finally {
      setSaving(false);
    }
  };

  // Reload function
  const handleReload = async () => {
    if (!grade || !section) {
      message.warning("Please select grade and section first");
      return;
    }

    setLoading(true);
    setDataLoaded(false);
    try {
      console.log("🔄 Force reloading from server...");
      
      // Clear current data
      setAttendance({});
      localStorage.removeItem(getStorageKey());
      
      // Fetch fresh from server
      const response = await axiosInstance.get(
        `/attendance/monthly/${encodeURIComponent(grade)}/${encodeURIComponent(section)}/${month}`
      );
      
      const serverData = response.data?.attendanceData || {};
      console.log("✅ Fresh server data:", Object.keys(serverData).length, "records");
      
      setAttendance(serverData);
      localStorage.setItem(getStorageKey(), JSON.stringify(serverData));
      
      toast.success("🔄 Data reloaded successfully!");
      
    } catch (error) {
      console.error("❌ Reload error:", error);
      toast.error("❌ Failed to reload data");
    } finally {
      setLoading(false);
    }
  };

  // Helper functions
  const getStatus = (studentId, dateISO) => {
    return attendance[`${studentId}_${dateISO}`] || null;
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Present': return '#52c41a';
      case 'Absent': return '#ff4d4f';
      case 'Permission': return '#faad14';
      default: return '#d9d9d9';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Present': return <CheckCircleOutlined />;
      case 'Absent': return <CloseCircleOutlined />;
      case 'Permission': return <FileTextOutlined />;
      default: return null;
    }
  };

  // Table columns
  const columns = [
    {
      title: "Roll No",
      key: "rollNo",
      fixed: "left",
      width: 80,
      align: "center",
      render: (_, __, index) => (
        <div style={{
          width: 32,
          height: 32,
          background: 'linear-gradient(135deg, #C1272D 0%, #1C2951 100%)',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontSize: '14px',
          fontWeight: 'bold',
          margin: '0 auto'
        }}>
          {index + 1}
        </div>
      ),
    },
    {
      title: "Student Info",
      key: "info",
      fixed: "left",
      width: 240,
      render: (record) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <Avatar 
            size="large"
            style={{ 
              background: 'linear-gradient(135deg, #C1272D 0%, #1C2951 100%)',
              boxShadow: '0 4px 12px rgba(28, 41, 81, 0.2)'
            }}
            icon={<UserOutlined />}
          />
          <div>
            <Text strong style={{ color: '#1C2951', display: 'block', fontSize: '15px' }}>
              {record.name}
            </Text>
            <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginTop: 2 }}>
              <Text type="secondary" style={{ fontSize: '12px' }}>
                ID: {record.studentId}
              </Text>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Gender",
      dataIndex: "gender",
      key: "gender",
      width: 100,
      align: "center",
      render: (g) => (
        <Tag 
          color={g === "Male" ? "blue" : "pink"}
          style={{ 
            borderRadius: '12px',
            fontWeight: 500,
            margin: 0,
            minWidth: 60
          }}
        >
          {g}
        </Tag>
      ),
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
      width: 80,
      align: "center",
      render: (age) => (
        <div style={{
          background: 'linear-gradient(135deg, #1890ff15 0%, #1890ff08 100%)',
          border: '1px solid #1890ff20',
          borderRadius: '8px',
          padding: '4px 8px'
        }}>
          <Text strong style={{ color: '#1890ff' }}>
            {age}
          </Text>
        </div>
      ),
    },
    
...days
  .filter((d) => !d.isWeekend)
  .map((d) => ({
    title: (
      <Tooltip title={d.dateISO}>
        <div style={{ 
          textAlign: "center", 
          background: 'linear-gradient(135deg, #f0f8ff 0%, #e6f7ff 100%)',
          padding: '6px 2px',
          borderRadius: '6px',
          border: '1px solid #bae7ff',
          margin: '2px'
        }}>
          <div style={{ 
            fontSize: '10px', 
            color: '#1890ff',
            lineHeight: 1.2,
            fontWeight: 600
          }}>
            {d.weekdayLabel}
          </div>
          <div style={{ 
            fontSize: '12px', 
            color: '#1C2951',
            fontWeight: 'bold'
          }}>
            {d.dateISO.split('-')[2]}
          </div>
        </div>
      </Tooltip>
    ),
    key: d.dateISO,
    width: 70,
    align: "center",
    render: (_, record) => {
      const status = getStatus(record._id, d.dateISO);
      
      return (
        <Select
          value={status} // 🔥 CRITICAL FIX: Use status directly, not status || undefined
          onChange={(newStatus) => handleStatusChange(record._id, d.dateISO, newStatus)}
          placeholder="-"
          style={{ 
            width: 60,
            background: status ? `${getStatusColor(status)}15` : 'white',
            border: `2px solid ${status ? getStatusColor(status) : '#e8e8e8'}`,
            borderRadius: '8px',
            fontWeight: 600
          }}
          size="small"
          suffixIcon={getStatusIcon(status)}
          dropdownMatchSelectWidth={false}
        >
          <Option value={null}>
            <span style={{ color: '#d9d9d9', fontWeight: 600 }}>-</span>
          </Option>
          <Option value="Present">
            <span style={{ color: '#52c41a', fontWeight: 600 }}>P</span>
          </Option>
          <Option value="Absent">
            <span style={{ color: '#ff4d4f', fontWeight: 600 }}>A</span>
          </Option>
          <Option value="Permission">
            <span style={{ color: '#faad14', fontWeight: 600 }}>Perm</span>
          </Option>
        </Select>
      );
    },
  })),
  ];

  return (
    <div style={{ 
      padding: "24px", 
      background: 'linear-gradient(135deg, #f9f9f9 0%, #ffffff 100%)',
      minHeight: '100vh'
    }}>
      {/* Header Section */}
      <Card 
        style={{ 
          marginBottom: 24, 
          borderRadius: 16,
          background: 'linear-gradient(135deg, #ffffff 0%, #fafafa 100%)',
          boxShadow: '0 8px 32px rgba(28, 41, 81, 0.08)',
          border: '1px solid rgba(28, 41, 81, 0.1)'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 24 }}>
          <div style={{
            width: '56px',
            height: '56px',
            background: 'linear-gradient(135deg, #C1272D 0%, #1C2951 100%)',
            borderRadius: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontSize: '24px',
            boxShadow: '0 6px 20px rgba(193, 39, 45, 0.3)'
          }}>
            📅
          </div>
          <div>
            <Title level={2} style={{ color: "#1C2951", margin: 0, fontWeight: 700 }}>
              Monthly Attendance Tracker
            </Title>
            <Text style={{ color: '#1C2951', opacity: 0.8, fontSize: '16px' }}>
              Manage and track student attendance by class and section
            </Text>
          </div>
        </div>

        {/* Filters Row */}
        <Row gutter={[16, 16]} align="middle">
          <Col xs={24} sm={8} md={6}>
            <div>
              <Text strong style={{ display: 'block', marginBottom: 8, color: '#1C2951' }}>
                <TeamOutlined style={{ marginRight: 8 }} />
                Grade
              </Text>
              <Select
                placeholder="Select Grade"
                value={grade || undefined}
                onChange={(value) => {
                  setGrade(value);
                  setDataLoaded(false);
                }}
                style={{ width: '100%' }}
                suffixIcon={<TeamOutlined />}
              >
                {grades.map((g) => (
                  <Option key={g}>{g}</Option>
                ))}
              </Select>
            </div>
          </Col>

          <Col xs={24} sm={8} md={6}>
            <div>
              <Text strong style={{ display: 'block', marginBottom: 8, color: '#1C2951' }}>
                Section
              </Text>
              <Select
                placeholder="Select Section"
                value={section || undefined}
                onChange={(value) => {
                  setSection(value);
                  setDataLoaded(false);
                }}
                style={{ width: '100%' }}
              >
                {sections.map((s) => (
                  <Option key={s}>{s}</Option>
                ))}
              </Select>
            </div>
          </Col>

          <Col xs={24} sm={8} md={6}>
            <div>
              <Text strong style={{ display: 'block', marginBottom: 8, color: '#1C2951' }}>
                <CalendarOutlined style={{ marginRight: 8 }} />
                Month
              </Text>
              <DatePicker
                picker="month"
                value={dayjs(month, "YYYY-MM")}
                onChange={(d) => {
                  setMonth(d ? d.format("YYYY-MM") : dayjs().format("YYYY-MM"));
                  setDataLoaded(false);
                }}
                style={{ width: '100%' }}
                suffixIcon={<CalendarOutlined />}
              />
            </div>
          </Col>

          <Col xs={24} sm={12} md={6}>
            <div>
              <Text strong style={{ display: 'block', marginBottom: 8, color: '#1C2951' }}>
                <SearchOutlined style={{ marginRight: 8 }} />
                Search Student
              </Text>
              <Input
                placeholder="Enter student name..."
                prefix={<SearchOutlined />}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                allowClear
                style={{ width: '100%' }}
              />
            </div>
          </Col>
        </Row>
      </Card>

      {/* Save Button and Table Section */}
      {!grade || !section ? (
        <Card 
          style={{ 
            borderRadius: 20,
            textAlign: 'center',
            padding: '80px 40px',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            border: 'none',
            boxShadow: '0 12px 40px rgba(102, 126, 234, 0.3)'
          }}
        >
          <div style={{ color: 'white' }}>
            <BookOutlined style={{ fontSize: 80, marginBottom: 24, opacity: 0.9 }} />
            <Title level={2} style={{ color: 'white', marginBottom: 16, fontWeight: 700 }}>
              SELECT GRADE & SECTION
            </Title>
            <Text style={{ 
              fontSize: '18px', 
              color: 'rgba(255,255,255,0.9)',
              fontWeight: 500,
              display: 'block',
              lineHeight: 1.6
            }}>
              Please choose a grade and section from the filters above<br />
              to view and manage the student attendance sheet
            </Text>
          </div>
        </Card>
      ) : (
        <>
          {/* Action Buttons */}
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            marginBottom: 16 
          }}>
            <div>
              <Text strong style={{ color: '#1C2951', fontSize: '16px' }}>
                💡 Select status then click "Save to Database"
              </Text>
              <div style={{ marginTop: 4 }}>
                <Text type="secondary" style={{ fontSize: '14px' }}>
                  Current records: {Object.keys(attendance).length} | Students: {students.length}
                </Text>
              </div>
            </div>
            <Space>
              <Button 
                icon={<ReloadOutlined />} 
                onClick={handleReload}
                disabled={loading || saving}
              >
                Force Reload
              </Button>
              <Button 
                type="primary" 
                icon={<SaveOutlined />} 
                onClick={handleSave}
                loading={saving}
                disabled={loading || Object.keys(attendance).length === 0}
                size="large"
                style={{ 
                  background: 'linear-gradient(135deg, #52c41a 0%, #73d13d 100%)',
                  border: 'none',
                  borderRadius: '10px',
                  height: '48px',
                  fontWeight: 600,
                  boxShadow: '0 6px 20px rgba(82, 196, 26, 0.4)',
                  padding: '0 32px',
                  fontSize: '16px'
                }}
              >
                💾 Save to Database
              </Button>
            </Space>
          </div>

          {/* Attendance Table */}
          <Card
            style={{
              borderRadius: 16,
              boxShadow: '0 8px 32px rgba(28, 41, 81, 0.08)',
              border: '1px solid rgba(28, 41, 81, 0.1)',
              background: 'linear-gradient(135deg, #ffffff 0%, #fafafa 100%)'
            }}
            loading={loading}
          >
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center', 
              marginBottom: 20,
              padding: '16px 20px',
              background: 'linear-gradient(135deg, #1C2951 0%, #2c3e6e 100%)',
              borderRadius: '12px',
              color: 'white'
            }}>
              <div>
                <Title level={4} style={{ color: 'white', margin: 0 }}>
                  {grade} - Section {section}
                </Title>
                <Text style={{ color: 'rgba(255,255,255,0.8)' }}>
                  {students.length} students • {dayjs(month, 'YYYY-MM').format('MMMM YYYY')}
                </Text>
              </div>
              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: 16,
                background: 'rgba(255,255,255,0.1)',
                padding: '8px 16px',
                borderRadius: '8px'
              }}>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '12px', opacity: 0.8 }}>Weekdays</div>
                  <div style={{ fontSize: '18px', fontWeight: 'bold' }}>
                    {days.filter(d => !d.isWeekend).length}
                  </div>
                </div>
                <div style={{ width: '1px', height: 30, background: 'rgba(255,255,255,0.3)' }}></div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '12px', opacity: 0.8 }}>Students</div>
                  <div style={{ fontSize: '18px', fontWeight: 'bold' }}>
                    {students.length}
                  </div>
                </div>
                <div style={{ width: '1px', height: 30, background: 'rgba(255,255,255,0.3)' }}></div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '12px', opacity: 0.8 }}>Saved Records</div>
                  <div style={{ fontSize: '18px', fontWeight: 'bold' }}>
                    {Object.keys(attendance).length}
                  </div>
                </div>
              </div>
            </div>

            <Table
              columns={columns}
              dataSource={students.filter((s) =>
                s.name.toLowerCase().includes(search.toLowerCase())
              )}
              rowKey={(r) => r._id}
              pagination={false}
              loading={loading}
              scroll={{ x: days.filter(d => !d.isWeekend).length * 70 + 500 }}
              bordered
              size="middle"
            />
          </Card>
        </>
      )}
    </div>
  );
}
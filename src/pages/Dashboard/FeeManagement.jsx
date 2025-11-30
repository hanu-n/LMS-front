import React, { useState } from "react";
import { 
  Card, 
  Table, 
  Button, 
  Select, 
  Modal, 
  Checkbox, 
  Input, 
  message, 
  Typography, 
  Row, 
  Col, 
  Tag, 
  Avatar, 
  Space,
  Divider,
  Statistic,
  Progress
} from "antd";
import axiosInstance from "../../axiosInstance";
import {
  TeamOutlined,
  UserOutlined,
  DollarOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  SaveOutlined
} from "@ant-design/icons";

const { Option } = Select;
const { Title, Text } = Typography;

const FeeManagement = () => {
  const [grade, setGrade] = useState("");
  const [section, setSection] = useState("");
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();

  const [selectedStudent, setSelectedStudent] = useState(null);
  const [feeModal, setFeeModal] = useState(false);

  const months = [
    "September", "October", "November", "December",
    "January", "February", "March", "April", "May", "June",
  ];

  // Each month fee state
  const [monthFees, setMonthFees] = useState(
    months.map((m) => ({
      month: m,
      paid: false,
      feeAmount: "",
      paidAmount: "",
    }))
  );

  // Fetch students
  const loadStudents = async () => {
    if (!grade || !section) return messageApi.warning("Select class & section");

    setLoading(true);
    try {
      const res = await axiosInstance.get(`/students/class/${grade}/${section}`);
      setStudents(res.data);
      if (res.data.length === 0) {
        messageApi.info("No students found for this class");
      } else {
        messageApi.success(`Loaded ${res.data.length} students`);
      }
    } catch (err) {
      if (err?.response?.status === 404) {
        messageApi.info("No students found for this class");
      } else {
        messageApi.error("Failed to load students");
      }
    }
    setLoading(false);
  };



const openFeeModal = async (student) => {
  setSelectedStudent(student);
  setFeeModal(true);

  try {
    // Fetch existing fee records for this student
    const res = await axiosInstance.get(`/fees`, {
      params: { studentId: student._id }
    });

    const savedFees = Array.isArray(res.data) ? res.data : [];

    // Create initial month fees array
    const initialMonthFees = months.map(month => {
      // Find if this month exists in saved fees
      const existingFee = savedFees.find(fee => 
        fee.month?.toLowerCase() === month.toLowerCase()
      );

      return {
        month: month,
        paid: existingFee?.paid || false, // This is the key - use the paid boolean
        feeAmount: "", // Remove these if not in schema
        paidAmount: "", // Remove these if not in schema
      };
    });

    setMonthFees(initialMonthFees);
    messageApi.success("Fee records loaded successfully");

  } catch (err) {
    messageApi.error("Failed to load fee records");
    // Set default empty state
    setMonthFees(months.map(m => ({ 
      month: m, 
      paid: false,
      feeAmount: "",
      paidAmount: "" 
    })));
  }
};
  const saveFees = async () => {
  if (!selectedStudent) return;

  try {    
    // Save each month's payment status
    for (const monthFee of monthFees) {
      const payload = {
        student: selectedStudent._id,
        month: monthFee.month,
        paid: monthFee.paid,
        paidDate: monthFee.paid ? new Date() : null,
        referenceNumber: monthFee.paid ? `REF-${Date.now()}-${Math.random().toString(36).substr(2, 9)}` : "",
        remarks: monthFee.paid ? "Marked as paid" : "Pending payment"
      };      
      await axiosInstance.post("/fees", payload);
    }

    messageApi.success("Fee status saved successfully!");
    await openFeeModal(selectedStudent);

  } catch (err) {
    messageApi.error("Failed to save fee status");
  }
};
  const calculateFeeStats = () => {
    const totalFeeAmount = monthFees.reduce((sum, month) => sum + (Number(month.feeAmount) || 0), 0);
    const totalPaidAmount = monthFees.reduce((sum, month) => sum + (Number(month.paidAmount) || 0), 0);
    const paidMonths = monthFees.filter(month => month.paid).length;
    
    return {
      totalFeeAmount,
      totalPaidAmount,
      paidMonths,
      totalMonths: monthFees.length,
      paymentProgress: totalFeeAmount > 0 ? (totalPaidAmount / totalFeeAmount) * 100 : 0
    };
  };

  const feeStats = calculateFeeStats();

  const columns = [
    {
      title: "Roll No",
      key: "rollNo",
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
      render: (record) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <Avatar 
            size="large"
            style={{ 
              background: 'linear-gradient(135deg, #C1272D 0%, #1C2951 100%)'
            }}
            icon={<UserOutlined />}
          />
          <div>
            <Text strong style={{ color: '#1C2951', fontSize: '15px', display: 'block' }}>
              {record.name}
            </Text>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 2 }}>
              <Text type="secondary" style={{ fontSize: '12px' }}>
                ID: {record.studentId}
              </Text>
              <Tag color={record.gender === 'Male' ? 'blue' : 'pink'} style={{ fontSize: '11px' }}>
                {record.gender}
              </Tag>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Grade & Section",
      key: "class",
      width: 150,
      render: (record) => (
        <Tag color="green" style={{ fontWeight: 500 }}>
          {record.grade} - {record.section}
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
    {
      title: "Action",
      key: "action",
      width: 120,
      align: "center",
      render: (_, record) => (
        <Button 
          type="primary" 
          icon={<DollarOutlined />}
          onClick={() => openFeeModal(record)}
          style={{ 
            background: '#52c41a', 
            borderColor: '#52c41a',
            borderRadius: '6px',
            fontWeight: 500
          }}
        >
          Manage Fee
        </Button>
      ),
    },
  ];

  return (
    <div style={{ 
      padding: "24px", 
      background: 'linear-gradient(135deg, #f9f9f9 0%, #ffffff 100%)',
      minHeight: '100vh'
    }}>
      {contextHolder}
      
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
            💰
          </div>
          <div>
            <Title level={2} style={{ color: "#1C2951", margin: 0, fontWeight: 700 }}>
              Fee Management System
            </Title>
            <Text style={{ color: '#1C2951', opacity: 0.8, fontSize: '16px' }}>
              Manage student fees by class and section
            </Text>
          </div>
        </div>

        {/* Class Selection */}
        <Row gutter={[16, 16]} align="middle">
          <Col xs={24} sm={8} md={6}>
            <div>
              <Text strong style={{ display: 'block', marginBottom: 8, color: '#1C2951' }}>
                <TeamOutlined style={{ marginRight: 8 }} />
                Grade
              </Text>
              <Select
                placeholder="Select Grade"
                value={grade}
                onChange={setGrade}
                style={{ width: '100%' }}
                suffixIcon={<TeamOutlined />}
              >
                <Option value="1">Grade 1</Option>
                <Option value="2">Grade 2</Option>
                <Option value="3">Grade 3</Option>
                <Option value="4">Grade 4</Option>
                <Option value="5">Grade 5</Option>
                <Option value="6">Grade 6</Option>
                <Option value="7">Grade 7</Option>
                <Option value="8">Grade 8</Option>
                <Option value="9">Grade 9</Option>
                <Option value="10">Grade 10</Option>
                <Option value="11">Grade 11</Option>
                <Option value="12">Grade 12</Option>
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
                value={section}
                onChange={setSection}
                style={{ width: '100%' }}
              >
                <Option value="A">Section A</Option>
                <Option value="B">Section B</Option>
                <Option value="C">Section C</Option>
                <Option value="D">Section D</Option>
                <Option value="E">Section E</Option>
                <Option value="F">Section F</Option>
                <Option value="G">Section G</Option>
                <Option value="H">Section H</Option>
                <Option value="I">Section I</Option>
                <Option value="J">Section J</Option>
                <Option value="K">Section K</Option>
              </Select>
            </div>
          </Col>

          <Col xs={24} sm={8} md={6}>
            <Button
              type="primary"
              icon={<TeamOutlined />}
              onClick={loadStudents}
              loading={loading}
              style={{ 
                background: '#C1272D', 
                borderColor: '#C1272D',
                borderRadius: '8px',
                height: '40px',
                fontWeight: 600,
                boxShadow: '0 4px 12px rgba(193, 39, 45, 0.3)',
                marginTop: 30
              }}
              block
            >
              Load Students
            </Button>
          </Col>

          <Col xs={24} sm={24} md={6}>
            <div style={{ 
              background: 'linear-gradient(135deg, #f0f8ff 0%, #e6f7ff 100%)',
              padding: '16px',
              borderRadius: '12px',
              border: '1px solid #bae7ff',
              textAlign: 'center'
            }}>
              <Text strong style={{ color: '#1C2951', display: 'block' }}>
                Students Loaded
              </Text>
              <Title level={3} style={{ color: '#C1272D', margin: 0 }}>
                {students.length}
              </Title>
            </div>
          </Col>
        </Row>
      </Card>

      {/* Students Table */}
      {students.length > 0 ? (
        <Card
          style={{
            borderRadius: 16,
            boxShadow: '0 8px 32px rgba(28, 41, 81, 0.08)',
            border: '1px solid rgba(28, 41, 81, 0.1)'
          }}
        >
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center', 
            marginBottom: 20 
          }}>
            <div>
              <Title level={4} style={{ color: '#1C2951', margin: 0 }}>
                Students List - Grade {grade} Section {section}
              </Title>
              <Text type="secondary">
                {students.length} students found
              </Text>
            </div>
            <Tag color="blue" style={{ fontSize: '14px', fontWeight: 600 }}>
              💰 Ready for Fee Management
            </Tag>
          </div>

          <Table
            dataSource={students}
            columns={columns}
            rowKey="_id"
            pagination={false}
            loading={loading}
          />
        </Card>
      ) : (
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
            <TeamOutlined style={{ fontSize: 80, marginBottom: 24, opacity: 0.9 }} />
            <Title level={2} style={{ color: 'white', marginBottom: 16, fontWeight: 700 }}>
              {grade && section ? 'NO STUDENTS FOUND' : 'SELECT GRADE & SECTION'}
            </Title>
            <Text style={{ 
              fontSize: '18px', 
              color: 'rgba(255,255,255,0.9)',
              fontWeight: 500,
              display: 'block',
              lineHeight: 1.6
            }}>
              {grade && section 
                ? `No students found in Grade ${grade} - Section ${section}`
                : 'Please select a grade and section to view students'
              }
            </Text>
          </div>
        </Card>
      )}

      {/* Fee Management Modal */}
      <Modal
        title={
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <DollarOutlined style={{ color: '#52c41a', fontSize: '20px' }} />
            <div>
              <div style={{ color: '#1C2951', fontWeight: 600, fontSize: '18px' }}>
                Fee Management - {selectedStudent?.name}
              </div>
              <div style={{ color: '#666', fontSize: '14px' }}>
                ID: {selectedStudent?.studentId} • {selectedStudent?.grade} - Section {selectedStudent?.section}
              </div>
            </div>
          </div>
        }
        open={feeModal}
        onCancel={() => setFeeModal(false)}
        onOk={saveFees}
        okText="Save Fee Records"
        cancelText="Cancel"
        width={800}
        okButtonProps={{
          icon: <SaveOutlined />,
          style: { 
            background: '#52c41a', 
            borderColor: '#52c41a',
            borderRadius: '6px',
            fontWeight: 600
          }
        }}
      >
        {/* Fee Statistics */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(4, 1fr)', 
          gap: 12, 
          marginBottom: 24,
          padding: '16px',
          background: 'linear-gradient(135deg, #f6ffed 0%, #f0fff3 100%)',
          borderRadius: '12px',
          border: '1px solid #b7eb8f'
        }}>
          <div style={{ textAlign: 'center' }}>
            <Text strong style={{ color: '#1C2951', display: 'block' }}>Total Fee</Text>
            <Title level={4} style={{ color: '#C1272D', margin: 0 }}>
              {feeStats.totalFeeAmount}
            </Title>
          </div>
          <div style={{ textAlign: 'center' }}>
            <Text strong style={{ color: '#1C2951', display: 'block' }}>Paid Amount</Text>
            <Title level={4} style={{ color: '#52c41a', margin: 0 }}>
              {feeStats.totalPaidAmount}
            </Title>
          </div>
          <div style={{ textAlign: 'center' }}>
            <Text strong style={{ color: '#1C2951', display: 'block' }}>Paid Months</Text>
            <Title level={4} style={{ color: '#1890ff', margin: 0 }}>
              {feeStats.paidMonths}/{feeStats.totalMonths}
            </Title>
          </div>
          <div style={{ textAlign: 'center' }}>
            <Text strong style={{ color: '#1C2951', display: 'block' }}>Progress</Text>
            <Progress 
              percent={Math.round(feeStats.paymentProgress)} 
              size="small" 
              strokeColor={{
                '0%': '#C1272D',
                '100%': '#52c41a',
              }}
            />
          </div>
        </div>

        {/* Monthly Fee Inputs */}
        <div style={{ maxHeight: 400, overflowY: 'auto', paddingRight: 8 }}>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: '120px 80px 1fr 1fr',
            gap: 12,
            marginBottom: 12,
            padding: '8px 16px',
            background: 'linear-gradient(135deg, #1C2951 0%, #2c3e6e 100%)',
            borderRadius: '8px',
            color: 'white',
            fontWeight: 600
          }}>
            <div>Month</div>
            <div style={{ textAlign: 'center' }}>Status</div>
            <div>Fee Amount ()</div>
            <div>Extra Paid Amount ()</div>
          </div>

          {monthFees.map((item, index) => (
            <div
              key={item.month}
              style={{
                display: 'grid',
                gridTemplateColumns: '120px 80px 1fr 1fr',
                alignItems: 'center',
                gap: 12,
                marginBottom: 12,
                padding: '12px 16px',
                background: index % 2 === 0 ? '#fafafa' : 'white',
                borderRadius: '8px',
                border: '1px solid #f0f0f0'
              }}
            >
              <Text strong style={{ color: '#1C2951' }}>{item.month}</Text>

              <div style={{ textAlign: 'center' }}>
                <Checkbox
                  checked={item.paid}
                  onChange={(e) => {
                    const updated = [...monthFees];
                    updated[index].paid = e.target.checked;
                    setMonthFees(updated);
                  }}
                >
                  {item.paid ? (
                    <CheckCircleOutlined style={{ color: '#52c41a' }} />
                  ) : (
                    <CloseCircleOutlined style={{ color: '#ff4d4f' }} />
                  )}
                </Checkbox>
              </div>

              <Input
                placeholder="3400"
                value={item.feeAmount}
                onChange={(e) => {
                  const updated = [...monthFees];
                  updated[index].feeAmount = e.target.value;
                  setMonthFees(updated);
                }}
                prefix=""
                style={{ border: '1px solid #d9d9d9', borderRadius: '6px' }}
              />

              <Input
                placeholder="0"
                value={item.paidAmount}
                onChange={(e) => {
                  const updated = [...monthFees];
                  updated[index].paidAmount = e.target.value;
                  setMonthFees(updated);
                }}
                prefix=""
                style={{ border: '1px solid #d9d9d9', borderRadius: '6px' }}
              />
            </div>
          ))}
        </div>

        <div style={{ 
          marginTop: 16, 
          padding: '12px 16px',
          background: 'linear-gradient(135deg, #fff7e6 0%, #fff1e6 100%)',
          borderRadius: '8px',
          border: '1px solid #ffd591'
        }}>
          <Text type="secondary" style={{ fontSize: '12px' }}>
            💡 <strong>Tip:</strong> Mark "Paid" to automatically set paid amount equal to fee amount, or enter custom amounts for partial payments.
          </Text>
        </div>
      </Modal>
    </div>
  );
};

export default FeeManagement;
import React, { useEffect, useState } from "react";
import { 
  Table, 
  Button, 
  Modal, 
  Form, 
  Input, 
  Select, 
  message, 
  Card,
  Row,
  Col,
  Typography,
  Space,
  Tag
} from "antd";
import axiosInstance from "../axiosInstance";
import { 
  PlusOutlined, 
  EditOutlined, 
  DeleteOutlined, 
  UserOutlined,
  IdcardOutlined,
  BookOutlined,
  TeamOutlined,
  PhoneOutlined
} from "@ant-design/icons";

const { Option } = Select;
const { Title, Text } = Typography;

const Students = () => {
  const [students, setStudents] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();

  const fetchStudents = async () => {
    try {
      const res = await axiosInstance.get("/students/");
      setStudents(res.data);
    } catch (err) {
      console.error(err);
      message.error("Failed to fetch students");
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const handleEditStudent = (student) => {
    setIsModalOpen(true);
    form.setFieldsValue(student); // pre-fill the form
  };

  const handleAddStudent = async (values) => {
    if (values._id) {
      // Editing existing student
      try {
        await axiosInstance.put(`/students/${values._id}`, values);
        message.success("Student updated successfully!");
        setIsModalOpen(false);
        form.resetFields();
        fetchStudents();
      } catch (err) {
        console.error(err);
        message.error("Failed to update student");
      }
    } else {
      // Adding new student
      try {
        await axiosInstance.post("/students", values);
        message.success("Student added successfully!");
        setIsModalOpen(false);
        form.resetFields();
        fetchStudents();
      } catch (err) {
        console.error(err);
        message.error("Failed to add student");
      }
    }
  };

  const handleDeleteStudent = async (id) => {
    try {
      await axiosInstance.delete(`students/${id}`);
      message.success("Student deleted successfully!");
      fetchStudents(); // refresh table
    } catch (err) {
      console.error(err);
      message.error("Failed to delete student");
    }
  };

  const columns = [
    { 
      title: "Student Name", 
      dataIndex: "name", 
      key: "name",
      render: (name) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{
            width: '32px',
            height: '32px',
            background: 'linear-gradient(135deg, #C1272D 0%, #1C2951 100%)',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontSize: '12px'
          }}>
            <UserOutlined />
          </div>
          <Text strong style={{ color: '#1C2951' }}>{name}</Text>
        </div>
      )
    },
    { 
      title: "Student ID", 
      dataIndex: "studentId", 
      key: "studentId",
      render: (id) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <IdcardOutlined style={{ color: '#1C2951', opacity: 0.7 }} />
          <Tag color="blue" style={{ borderRadius: '12px' }}>{id}</Tag>
        </div>
      )
    },
    { 
      title: "Grade", 
      dataIndex: "grade", 
      key: "grade",
      render: (grade) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <BookOutlined style={{ color: '#1C2951', opacity: 0.7 }} />
          <Text>Grade {grade}</Text>
        </div>
      )
    },
    {
  title: "Age",
  dataIndex: "age",
  key: "age",
  render: (age) =>(
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Text><UserOutlined />  {age}</Text>
        </div>
  )
},

    { 
      title: "Section", 
      dataIndex: "section", 
      key: "section",
      render: (section) => (
        <Tag 
          style={{ 
            borderRadius: '12px',
            background: 'rgba(28, 41, 81, 0.1)',
            color: '#1C2951',
            border: 'none'
          }}
        >
          Section {section}
        </Tag>
      )
    },
    { 
      title: "Gender", 
      dataIndex: "gender", 
      key: "gender",
      render: (gender) => (
        <Tag 
          color={gender === 'Male' ? 'blue' : 'pink'}
          style={{ borderRadius: '12px' }}
        >
          {gender}
        </Tag>
      )
    },
    { 
      title: "Contact", 
      dataIndex: "contactNumber", 
      key: "contactNumber",
      render: (contact) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <PhoneOutlined style={{ color: '#1C2951', opacity: 0.7 }} />
          <Text>{contact}</Text>
        </div>
      )
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space>
          <Button 
            type="link" 
            onClick={() => handleEditStudent(record)}
            icon={<EditOutlined />}
            style={{ color: '#1C2951' }}
          >
            Edit
          </Button>
          <Button 
            type="link" 
            danger 
            onClick={() => handleDeleteStudent(record._id)}
            icon={<DeleteOutlined />}
          >
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #f9f9f9 0%, #ffffff 100%)",
      padding: "40px",
    }}>
      <Card
        style={{
          borderRadius: "16px",
          boxShadow: "0 8px 32px rgba(28, 41, 81, 0.1)",
          background: "#fff",
          border: 'none',
          padding: '32px'
        }}
      >
        {/* Header Section */}
        <div style={{ marginBottom: "32px" }}>
          <Row justify="space-between" align="middle">
            <Col>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div style={{
                  width: '60px',
                  height: '60px',
                  background: 'linear-gradient(135deg, #C1272D 0%, #1C2951 100%)',
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontSize: '24px'
                }}>
                  🎓
                </div>
                <div>
                  <Title level={2} style={{ color: "#1C2951", margin: 0 }}>
                    Student Management
                  </Title>
                  <Text style={{ color: '#1C2951', opacity: 0.8, fontSize: '16px' }}>
                    Manage student records and information
                  </Text>
                </div>
              </div>
            </Col>
            <Col>
              <Button
                type="primary"
                icon={<PlusOutlined />}
                size="large"
                style={{
                  background: "#C1272D",
                  borderColor: "#C1272D",
                  borderRadius: "8px",
                  fontWeight: 600,
                  boxShadow: '0 4px 12px rgba(193, 39, 45, 0.3)'
                }}
                onClick={() => {
                  setIsModalOpen(true);
                  form.resetFields();
                }}
              >
                Add Student
              </Button>
            </Col>
          </Row>
        </div>

        {/* Students Table */}
        <Table
          dataSource={students}
          columns={columns}
          rowKey="_id"
          bordered
          style={{
            borderRadius: "12px",
            overflow: "hidden",
          }}
          pagination={{
            pageSize: 5,
            showSizeChanger: false,
          }}
        />
      </Card>

      {/* Add/Edit Student Modal */}
      <Modal
        title={
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <UserOutlined style={{ color: '#1C2951' }} />
            <span style={{ color: '#1C2951', fontSize: '18px', fontWeight: 600 }}>
              {form.getFieldValue('_id') ? 'Edit Student' : 'Add New Student'}
            </span>
          </div>
        }
        open={isModalOpen}
        onCancel={() => {
          setIsModalOpen(false);
          form.resetFields();
        }}
        onOk={() => form.submit()}
        okText="Save Student"
        cancelText="Cancel"
        okButtonProps={{
          style: {
            background: '#C1272D',
            borderColor: '#C1272D',
            borderRadius: '6px'
          }
        }}
        cancelButtonProps={{
          style: {
            borderRadius: '6px'
          }
        }}
        width={600}
      >
        <Form 
          form={form} 
          layout="vertical" 
          onFinish={handleAddStudent}
          style={{ marginTop: '20px' }}
        >
          {/* Hidden ID for editing */}
          <Form.Item name="_id" hidden>
            <Input />
          </Form.Item>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="name"
                label="Student Name"
                rules={[{ required: true, message: "Please enter student name" }]}
              >
                <Input 
                  placeholder="Enter student name" 
                  prefix={<UserOutlined style={{ color: '#1C2951', opacity: 0.7 }} />}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="studentId"
                label="Student ID"
                rules={[{ required: true, message: "Please enter student ID" }]}
              >
                <Input 
                  placeholder="Enter student ID" 
                  prefix={<IdcardOutlined style={{ color: '#1C2951', opacity: 0.7 }} />}
                />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="grade"
                label="Grade"
                rules={[{ required: true, message: "Please enter grade" }]}
              >
                <Input 
                  placeholder="Enter grade (e.g. 10)" 
                  prefix={<BookOutlined style={{ color: '#1C2951', opacity: 0.7 }} />}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="section" label="Section">
                <Input placeholder="A / B / C" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="gender" label="Gender">
                <Select placeholder="Select gender">
                  <Option value="Male">Male</Option>
                  <Option value="Female">Female</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
  <Form.Item
    name="age"
    label="Age"
    rules={[{ required: true, message: "Please enter age" }]}
  >
    <Input 
      type="number" 
      placeholder="Enter student age"
    />
  </Form.Item>
</Col>

            <Col span={12}>
              <Form.Item name="contactNumber" label="Contact Number">
                <Input 
                  placeholder="Enter contact number" 
                  prefix={<PhoneOutlined style={{ color: '#1C2951', opacity: 0.7 }} />}
                />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </div>
  );
};

export default Students;
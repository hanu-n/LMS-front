import React, { useEffect, useState } from "react";
import {
  Table,
  Tag,
  Button,
  Input,
  Space,
  Select,
  Modal,
  Form,
  Popconfirm,
  Card,
  Typography,
  Row,
  Col,
  Alert,
  App,
  Switch,
  message,
} from "antd";
import {
  SearchOutlined,
  EditOutlined,
  DeleteOutlined,
  PlusOutlined,
  ExclamationCircleOutlined,
  ReloadOutlined,
  CheckOutlined,
  CloseOutlined,
  UserSwitchOutlined,
} from "@ant-design/icons";
import axiosInstance from "../../axiosInstance";

const { Option } = Select;
const { Title, Text } = Typography;

const roleColors = {
  admin: "#C1272D",
  teacher: "#1C2951", 
  student: "#2db7f5",
};

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [searchText, setSearchText] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");

  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);

  const [editingUser, setEditingUser] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);

  const [formAdd] = Form.useForm();
  const [formEdit] = Form.useForm();

  // fetch users
  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError("");
      
      console.log("🔄 Starting to fetch users...");
      
      const token = localStorage.getItem("sms-token");
      const headers = token ? { Authorization: `Bearer ${token}` } : {};

      const res = await axiosInstance.get("/users", { 
        headers,
        timeout: 10000
      });
      
      console.log("✅ Users API response:", res.data);
      
      if (res.data && Array.isArray(res.data.users)) {
        setUsers(res.data.users);
      } else if (Array.isArray(res.data)) {
        setUsers(res.data);
      } else {
        setUsers([]);
        setError("Unexpected response format from server");
      }
    } catch (err) {
      console.error("❌ fetchUsers error:", err);
      
      let errorMessage = "Failed to fetch users";
      
      if (err.response) {
        errorMessage = `Server error: ${err.response.status} - ${err.response.data?.message || 'Unknown error'}`;
      } else if (err.request) {
        errorMessage = "No response from server. Check if backend is running.";
      } else {
        errorMessage = err.message;
      }
      
      setError(errorMessage);
      message.error(errorMessage);
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Safe filters
  const filteredUsers = users.filter((u) => {
    if (!u) return false;
    
    const matchesRole = roleFilter === "all" ? true : u.role === roleFilter;
    const q = searchText.trim().toLowerCase();
    const matchesSearch =
      !q ||
      (u.name && u.name.toLowerCase().includes(q)) ||
      (u.email && u.email.toLowerCase().includes(q));
    return matchesRole && matchesSearch;
  });

  // Add user
  const handleAdd = async () => {
    setActionLoading(true);
    try {
      const values = await formAdd.validateFields();
      const token = localStorage.getItem("sms-token");
      const headers = token ? { Authorization: `Bearer ${token}` } : {};
      
      const response = await axiosInstance.post(
        "/users",
        {
          name: values.name,
          email: values.email,
          password: values.password,
          role: values.role,
          gradeLevel: values.gradeLevel || null,
          age: values.age || null,
        },
        { headers }
      );
      
      message.success("User added successfully!");
      formAdd.resetFields();
      setIsAddOpen(false);
      fetchUsers();
    } catch (err) {
      console.error("add user error:", err);
      const errorMessage = err.response?.data?.message || "Failed to add user";
      message.error(errorMessage);
    } finally {
      setActionLoading(false);
    }
  };

  // Edit user - Open modal
  const handleOpenEdit = (user) => {
    if (!user || !user._id) {
      message.error("Invalid user data");
      return;
    }
    
    setEditingUser(user);
    formEdit.setFieldsValue({
      name: user.name || '',
      email: user.email || '',
      gradeLevel: user.gradeLevel || null,
      age: user.age || null,
      isApproved: user.isApproved || false,
    });
    setIsEditOpen(true);
  };

  // Save edited user
  const handleSaveEdit = async () => {
    if (!editingUser || !editingUser._id) {
      message.error("No user selected for editing");
      return;
    }

    setActionLoading(true);
    try {
      const values = await formEdit.validateFields();
      const token = localStorage.getItem("sms-token");
      const headers = token ? { Authorization: `Bearer ${token}` } : {};
      
      const response = await axiosInstance.put(
        `/users/${editingUser._id}`,
        values,
        { headers }
      );
      
      message.success("User updated successfully!");
      setIsEditOpen(false);
      setEditingUser(null);
      fetchUsers();
    } catch (err) {
      console.error("edit user error:", err);
      const errorMessage = err.response?.data?.message || "Failed to update user";
      message.error(errorMessage);
    } finally {
      setActionLoading(false);
    }
  };

  // Delete user
  const handleDelete = async (id) => {
    if (!id) {
      message.error("Invalid user ID");
      return;
    }

    setActionLoading(true);
    try {
      const token = localStorage.getItem("sms-token");
      const headers = token ? { Authorization: `Bearer ${token}` } : {};
      
      await axiosInstance.delete(`/users/${id}`, { headers });
      message.success("User deleted successfully!");
      fetchUsers();
    } catch (err) {
      console.error("delete user error:", err);
      const errorMessage = err.response?.data?.message || "Failed to delete user";
      message.error(errorMessage);
    } finally {
      setActionLoading(false);
    }
  };

  // Change role
  const handleRoleChange = async (id, role) => {
    if (!id || !role) {
      message.error("Invalid user ID or role");
      return;
    }

    setActionLoading(true);
    try {
      const token = localStorage.getItem("sms-token");
      const headers = token ? { Authorization: `Bearer ${token}` } : {};
      
      const response = await axiosInstance.put(
        `/users/${id}/role`,
        { role },
        { headers }
      );
      
      message.success(`Role changed to ${role} successfully!`);
      fetchUsers();
    } catch (err) {
      console.error("change role error:", err);
      const errorMessage = err.response?.data?.message || "Failed to change role";
      message.error(errorMessage);
    } finally {
      setActionLoading(false);
    }
  };

  // Toggle approval status
  const handleToggleApproval = async (id, currentStatus) => {
    setActionLoading(true);
    try {
      const token = localStorage.getItem("sms-token");
      const headers = token ? { Authorization: `Bearer ${token}` } : {};
      
      const response = await axiosInstance.put(
        `/users/${id}`,
        { isApproved: !currentStatus },
        { headers }
      );
      
      message.success(`User ${!currentStatus ? 'approved' : 'unapproved'} successfully!`);
      fetchUsers();
    } catch (err) {
      console.error("toggle approval error:", err);
      const errorMessage = err.response?.data?.message || "Failed to update approval status";
      message.error(errorMessage);
    } finally {
      setActionLoading(false);
    }
  };

  // Reset password function
  const handleResetPassword = async (userId) => {
    Modal.confirm({
      title: 'Reset Password',
      content: (
        <div>
          <p>Are you sure you want to reset this user's password?</p>
          <p>A temporary password will be generated and sent to their email.</p>
        </div>
      ),
      okText: 'Reset Password',
      cancelText: 'Cancel',
      onOk: async () => {
        try {
          const token = localStorage.getItem("sms-token");
          const headers = token ? { Authorization: `Bearer ${token}` } : {};
          
          // You'll need to create this endpoint in your backend
          const response = await axiosInstance.post(
            `/users/${userId}/reset-password`,
            {},
            { headers }
          );
          
          message.success("Password reset instructions sent to user's email!");
        } catch (err) {
          console.error("reset password error:", err);
          const errorMessage = err.response?.data?.message || "Failed to reset password";
          message.error(errorMessage);
        }
      }
    });
  };

  // Bulk actions
  const handleBulkAction = (action, selectedUsers) => {
    if (selectedUsers.length === 0) {
      message.warning("Please select users first");
      return;
    }

    switch (action) {
      case 'approve':
        selectedUsers.forEach(user => {
          if (!user.isApproved) {
            handleToggleApproval(user._id, user.isApproved);
          }
        });
        break;
      case 'disapprove':
        selectedUsers.forEach(user => {
          if (user.isApproved) {
            handleToggleApproval(user._id, user.isApproved);
          }
        });
        break;
      default:
        break;
    }
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      sorter: (a, b) => (a.name || "").localeCompare(b.name || ""),
      render: (text, record) => (
        
          <div style={{ fontWeight: 600 }}>{text || "No Name"}</div>
         
      ),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      render: (email) => email || "No Email",
    },
    {
      title: "Role",
      key: "role",
      render: (_, record) => (
        <Tag style={{ fontWeight: 700 }} color={roleColors[record.role] || "default"}>
          {(record.role || "unknown").toUpperCase()}
        </Tag>
      ),
      filters: [
        { text: "Admin", value: "admin" },
        { text: "Teacher", value: "teacher" },
      ],
      onFilter: (value, record) => record.role === value,
    },
    {
      title: "Grade Level",
      dataIndex: "gradeLevel",
      key: "gradeLevel",
      render: (gradeLevel) => gradeLevel || "-",
    },
    {
      title: "Status",
      key: "status",
      render: (_, record) => (
        <Space>
          <Tag color={record.isApproved ? "green" : "orange"}>
            {record.isApproved ? "Approved" : "Pending"}
          </Tag>
          <Switch
            size="small"
            checked={record.isApproved}
            onChange={() => handleToggleApproval(record._id, record.isApproved)}
            loading={actionLoading}
            checkedChildren={<CheckOutlined />}
            unCheckedChildren={<CloseOutlined />}
          />
        </Space>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      width: 420,
      render: (_, record) => (
        <Space wrap>
          {/* Edit Button */}
          <Button
            icon={<EditOutlined />}
            onClick={() => handleOpenEdit(record)}
            type="default"
            style={{ borderRadius: 6 }}
            size="small"
          >
            Edit
          </Button>

          {/* Delete Button */}
          <Popconfirm
            title={`Delete ${record.name || 'this user'}?`}
            description="This action cannot be undone. All user data will be permanently removed."
            onConfirm={() => handleDelete(record._id)}
            okText="Yes, Delete"
            cancelText="Cancel"
            okType="danger"
            icon={<ExclamationCircleOutlined style={{ color: '#ff4d4f' }} />}
          >
            <Button 
              icon={<DeleteOutlined />} 
              danger 
              style={{ borderRadius: 6 }}
              size="small"
            >
              Delete
            </Button>
          </Popconfirm>

          {/* Change Role Section */}
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div
              style={{
                padding: "6px 10px",
                background: "#f5f5f5",
                borderRadius: 6,
                fontSize: 12,
                color: "#333",
                userSelect: "none",
              }}
            >
              Role
            </div>

            <Select
              value={record.role}
              onChange={(newRole) => handleRoleChange(record._id, newRole)}
              style={{ width: 120 }}
              size="small"
              suffixIcon={<UserSwitchOutlined />}
            >
              <Option value="admin">Admin</Option>
              <Option value="teacher">Teacher</Option>
            </Select>
          </div>

          {/* Reset Password Button */}
          <Button
            type="link"
            size="small"
            onClick={() => handleResetPassword(record._id)}
            style={{ color: '#1890ff' }}
          >
            Reset PW
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div style={{ padding: 24, background: "#f7fafc", minHeight: "100vh" }}>
      <Card
        style={{
          borderRadius: 12,
          boxShadow: "0 8px 30px rgba(22,39,81,0.06)",
          padding: 18,
        }}
      >
        <Row justify="space-between" align="middle" style={{ marginBottom: 16 }}>
          <Col>
            <Title level={4} style={{ margin: 0, color: "#1C2951" }}>
              Users Management
            </Title>
            <div style={{ color: "#666", marginTop: 6 }}>
              Manage system users, roles, and permissions
            </div>
          </Col>

          <Col>
            <Space>
              <Button
                icon={<ReloadOutlined />}
                onClick={fetchUsers}
                loading={loading}
                style={{ borderRadius: 8 }}
              >
                Refresh
              </Button>
              
              <Input
                placeholder="Search name or email"
                prefix={<SearchOutlined />}
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                style={{ width: 300 }}
                allowClear
              />

              <Select
                value={roleFilter}
                onChange={(val) => setRoleFilter(val)}
                style={{ width: 160 }}
                placeholder="Filter by role"
              >
                <Option value="all">All Roles</Option>
                <Option value="admin">Admin</Option>
                <Option value="teacher">Teacher</Option>
              </Select>

              <Button
                type="primary"
                icon={<PlusOutlined />}
                onClick={() => setIsAddOpen(true)}
                style={{ borderRadius: 8 }}
              >
                Add User
              </Button>
            </Space>
          </Col>
        </Row>

        {error && (
          <Alert
            message="Error"
            description={error}
            type="error"
            showIcon
            style={{ marginBottom: 16 }}
            closable
            onClose={() => setError("")}
          />
        )}

        <Table
          dataSource={filteredUsers}
          columns={columns}
          rowKey={(record) => record._id || record.id || Math.random()}
          loading={loading || actionLoading}
          pagination={{ 
            pageSize: 10,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total, range) => 
              `${range[0]}-${range[1]} of ${total} users`
          }}
          bordered
          style={{ borderRadius: 10, overflow: "hidden" }}
          locale={{
            emptyText: loading ? "Loading users..." : "No users found"
          }}
        />
      </Card>

      {/* Add User Modal */}
      <Modal
        title="Add New User"
        open={isAddOpen}
        onCancel={() => {
          setIsAddOpen(false);
          formAdd.resetFields();
        }}
        onOk={handleAdd}
        okText="Create User"
        cancelText="Cancel"
        confirmLoading={actionLoading}
        width={600}
      >
        <Form form={formAdd} layout="vertical">
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="name"
                label="Full Name"
                rules={[{ required: true, message: "Please enter full name" }]}
              >
                <Input placeholder="Enter full name" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="age"
                label="Age"
              >
                <Input type="number" placeholder="Age" min={1} max={100} />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            name="email"
            label="Email Address"
            rules={[
              { required: true, message: "Please enter email" },
              { type: "email", message: "Enter a valid email" },
            ]}
          >
            <Input placeholder="email@domain.com" />
          </Form.Item>

          <Form.Item
            name="password"
            label="Password"
            rules={[
              { required: true, message: "Please set a password" },
              { min: 6, message: "At least 6 characters" },
            ]}
          >
            <Input.Password placeholder="Enter password" />
          </Form.Item>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item 
                name="role" 
                label="Role" 
                initialValue="teacher"
                rules={[{ required: true, message: "Please select a role" }]}
              >
                <Select>
                  <Option value="admin">Administrator</Option>
                  <Option value="teacher">Teacher</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="gradeLevel" label="Grade Level">
                <Select placeholder="Select grade level" allowClear>
                  <Option value="Grade 9">Grade 9</Option>
                  <Option value="Grade 10">Grade 10</Option>
                  <Option value="Grade 11">Grade 11</Option>
                  <Option value="Grade 12">Grade 12</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>

      {/* Edit User Modal */}
      <Modal
        title={`Edit User - ${editingUser?.name || ''}`}
        open={isEditOpen}
        onCancel={() => {
          setIsEditOpen(false);
          setEditingUser(null);
          formEdit.resetFields();
        }}
        onOk={handleSaveEdit}
        okText="Save Changes"
        cancelText="Cancel"
        confirmLoading={actionLoading}
        width={600}
      >
        <Form form={formEdit} layout="vertical">
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="name"
                label="Full Name"
                rules={[{ required: true, message: "Please enter name" }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="age"
                label="Age"
              >
                <Input type="number" min={1} max={100} />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            name="email"
            label="Email"
            rules={[
              { required: true, message: "Please enter email" },
              { type: "email", message: "Enter a valid email" },
            ]}
          >
            <Input />
          </Form.Item>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="gradeLevel" label="Grade Level">
                <Select placeholder="Select grade level" allowClear>
                  <Option value="Grade 9">Grade 9</Option>
                  <Option value="Grade 10">Grade 10</Option>
                  <Option value="Grade 11">Grade 11</Option>
                  <Option value="Grade 12">Grade 12</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="isApproved" label="Approval Status" valuePropName="checked">
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <Switch />
                  <span>{formEdit.getFieldValue('isApproved') ? 'Approved' : 'Pending'}</span>
                </div>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </div>
  );
};

export default UserManagement;

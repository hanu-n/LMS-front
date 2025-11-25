// Login.jsx
import React, { useState } from "react";
import { Form, Input, Button, Typography } from "antd";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../../axiosInstance";
import Swal from "sweetalert2";

const { Title } = Typography;

const Login = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const response = await axiosInstance.post("auth/login", {
        email: values.email,
        password: values.password,
      });

      const { token, user } = response.data;

      localStorage.setItem("sms-token", token);
      localStorage.setItem("sms-user", JSON.stringify(user));

      // ✅ SweetAlert on success
      Swal.fire({
        icon: "success",
        title: `Welcome back, ${user.name}!`,
        showConfirmButton: false,
        timer: 1500,
      });

      // ✅ Redirect based on approval
     if (user.role === "teacher" && !user.isApproved) {
  Swal.fire({
    icon: "info",
    title: "Account Pending Approval",
    text: "If you are a teacher or admin Your account is awaiting for admin approval. You can login but have limited access for now.",
    confirmButtonColor: "#3085d6",
  }).then(() => navigate("/")); // redirect to home page
} else if (user.role === "teacher" && user.isApproved) {
        navigate("/teacher");
      } else if (user.role === "admin") {
        navigate("/dashboard");
      } else {
        navigate("/");
      }
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text:
          error.response?.data?.message || 
          "Invalid credentials. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#f0f2f5",
      }}
    >
      <div
        style={{
          padding: "40px",
          background: "#fff",
          borderRadius: "8px",
          width: "400px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
        }}
      >
        <Title level={2} style={{ textAlign: "center", marginBottom: "24px" }}>
          Login
        </Title>

        <Form name="login" layout="vertical" onFinish={onFinish} autoComplete="off">
          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Please enter your email!" },
              { type: "email", message: "Please enter a valid email!" },
            ]}
          >
            <Input placeholder="Enter your email" />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please enter your password!" }]}
          >
            <Input.Password placeholder="Enter your password" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block loading={loading}>
              Login
            </Button>
          </Form.Item>

          <Form.Item style={{ textAlign: "center", marginBottom: 0 }}>
            Don’t have an account? <Link to="/register">Register</Link>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Login;

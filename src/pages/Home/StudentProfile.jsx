import { useState } from "react";
import {
  Input,
  Button,
  Card,
  Typography,
  message,
  Spin,
  Descriptions,
  Avatar,
  Divider,
} from "antd";
import { UserOutlined } from "@ant-design/icons";
import axiosInstance from "../../axiosInstance";


const { Title, Text } = Typography;

const StudentProfile = () => {
  const [studentId, setStudentId] = useState("");
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchStudent = async () => {
    if (!studentId.trim()) {
      message.warning("Please enter a student ID");
      return;
    }

      try {
      setLoading(true);
      // backend route is /api/public/student/:studentId/profile
      const { data } = await axiosInstance.get(
        `/public/student/${studentId}/profile`
      );
      setStudent(data);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setStudent(null);
      setLoading(false);
      message.error("Student not found or server error.");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f8f9fa",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        paddingTop: "80px",
      }}
    >
      <Card
        style={{
          width: 700,
          textAlign: "center",
          boxShadow: "0 10px 30px rgba(193,39,45,0.15)",
          borderRadius: 20,
          padding: "40px 60px",
        }}
      >
        <Title level={2} style={{ color: "#C1272D", marginBottom: 10 }}>
          Student Profile
        </Title>

        <Text style={{ color: "#555" }}>
          Enter your <strong>Student ID</strong> to view your profile.
        </Text>

        <div style={{ marginTop: 20, marginBottom: 30 }}>
          <Input
            placeholder="e.g. STU-001"
            value={studentId}
            onChange={(e) => setStudentId(e.target.value)}
            style={{
              width: "60%",
              borderRadius: 10,
              marginRight: 10,
            }}
          />
          <Button
            type="primary"
            size="large"
            onClick={fetchStudent}
            loading={loading}
            style={{
              background: "#C1272D",
              borderColor: "#C1272D",
              borderRadius: "25px",
              padding: "0 30px",
              fontWeight: 600,
            }}
          >
            View Profile
          </Button>
        </div>

        {loading && <Spin style={{ marginTop: 20 }} />}

        {student && (
          <>
            <Divider style={{ borderColor: "#C1272D" }}>Profile Info</Divider>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 15,
                marginBottom: 30,
              }}
            >
              <Avatar
                size={120}
                src={student.image}
                icon={<UserOutlined />}
                style={{
                  border: "3px solid #C1272D",
                  backgroundColor: "#fff",
                }}
              />
              <div>
                <Title
                  level={3}
                  style={{ margin: 0, color: "#1C2951", fontWeight: "bold" }}
                >
                  {student.name}
                </Title>
                <Text style={{ color: "#C1272D", fontWeight: 600 }}>
                 {student.gradeLevel} {student.section}
                </Text>
              </div>
            </div>

            <Descriptions
              bordered
              column={1}
              labelStyle={{ fontWeight: 600, color: "#1C2951" }}
              contentStyle={{ color: "#555" }}
              style={{
                borderRadius: 10,
                background: "#fff",
              }}
            >
              <Descriptions.Item label="Full Name">
                {student.name}
              </Descriptions.Item>
              <Descriptions.Item label="Gender">
                {student.gender || "N/A"}
              </Descriptions.Item>
              <Descriptions.Item label="Date of Birth">
                {student.dateOfBirth || "N/A"}
              </Descriptions.Item>
              <Descriptions.Item label="Parent Name">
                {student.parentName || "N/A"}
              </Descriptions.Item>
              <Descriptions.Item label="Parent Contact">
                {student.parentPhone || student.contactNumber || "N/A"}
              </Descriptions.Item>
              <Descriptions.Item label="Address">
                {student.address || "N/A"}
              </Descriptions.Item>
              <Descriptions.Item label="Admission No.">
                {student.admissionNumber || student.studentId}
              </Descriptions.Item>
              <Descriptions.Item label="Section">
                {student.section || "N/A"}
              </Descriptions.Item>
            </Descriptions>
          </>
        )}
      </Card>
    </div>
  );
};

export default StudentProfile;


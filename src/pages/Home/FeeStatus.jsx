import React, { useState, useRef } from "react";
import { Input, Button, Card, Typography, message, Spin, Table } from "antd";
import axiosInstance from "../../axiosInstance";

// use the message hook to avoid static-function warnings
const { Title, Text } = Typography;

const FeeStatus = () => {
  const [studentId, setStudentId] = useState("");
  const [studentData, setStudentData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const printRef = useRef();

  const [messageApi, contextHolder] = message.useMessage();

  const fetchFees = async () => {
    const id = studentId.trim();
    if (!id) {
      messageApi.warning("Please enter a valid Student ID");
      return;
    }
    setLoading(true);
    setSubmitted(true);

    try {
      // encode the trimmed id to be safe for URLs
      const encoded = encodeURIComponent(id);
      const res = await axiosInstance.get(
        `/public/student/${encoded}/fees`
      );

      // ensure data is in correct shape
      if (res.data && Array.isArray(res.data.fees)) {
        setStudentData(res.data);
        messageApi.success("Fee records loaded successfully");
      } else {
        throw new Error("Invalid response format");
      }
    } catch (error) {
      console.error("❌ Error fetching fee data:", error);
      messageApi.error(error.response?.data?.message || "Failed to load fee data");
      setStudentData(null);
    } finally {
      setLoading(false);
    }
  };

  const handlePrint = () => {
    const printContents = printRef.current.innerHTML;
    const originalContents = document.body.innerHTML;
    document.body.innerHTML = printContents;
    window.print();
    document.body.innerHTML = originalContents;
    window.location.reload();
  };

  const columns = [
    {
      title: "Month",
      dataIndex: "month",
      key: "month",
      align: "center",
    },
    {
      title: "Amount (ETB)",
      dataIndex: "amount",
      key: "amount",
      align: "center",
    },
    {
      title: "Paid",
      dataIndex: "paid",
      key: "paid",
      align: "center",
      render: (paid) =>
        paid ? (
          <span style={{ color: "green", fontWeight: 600 }}>✅ Yes</span>
        ) : (
          <span style={{ color: "red", fontWeight: 600 }}>❌ No</span>
        ),
    },
    {
      title: "Due Date",
      dataIndex: "dueDate",
      key: "dueDate",
      align: "center",
      render: (date) =>
        date ? new Date(date).toLocaleDateString() : <span>—</span>,
    },
    {
      title: "Extra Fee (ETB)",
      dataIndex: "extraFee",
      key: "extraFee",
      align: "center",
      render: (fee) => <span style={{ color: "#d4a017" }}>{fee}</span>,
    },
    {
      title: "Total Due (ETB)",
      dataIndex: "totalDue",
      key: "totalDue",
      align: "center",
      render: (total) => <strong>{total}</strong>,
    },
  ];

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
          width: 800,
          textAlign: "center",
          boxShadow: "0 10px 30px rgba(193,39,45,0.15)",
          borderRadius: 15,
          padding: "30px 50px",
        }}
      >
        <Title level={2} style={{ color: "#C1272D" }}>
          Fee Status Checker
        </Title>

        <Text style={{ color: "#555" }}>
          Enter your <strong>Student ID</strong> to view your fee records.
        </Text>

        <Input
          placeholder="e.g. STU-001"
          value={studentId}
          onChange={(e) => setStudentId(e.target.value)}
          style={{
            marginTop: 20,
            marginBottom: 20,
            borderRadius: 10,
            width: "60%",
          }}
        />

        <Button
          type="primary"
          size="large"
          onClick={fetchFees}
          loading={loading}
          style={{
            background: "#C1272D",
            borderColor: "#C1272D",
            borderRadius: "25px",
            padding: "0 40px",
            fontWeight: 600,
          }}
        >
          View Fee Status
        </Button>

    {contextHolder}
    {loading && <Spin style={{ marginTop: 20 }} />}

        {submitted && !loading && (
          <div ref={printRef} style={{ marginTop: 40 }}>
            {!studentData ? (
              <Text type="secondary">No fee records found.</Text>
            ) : (
              <>
                <Title
                  level={4}
                  style={{
                    color: "#1C2951",
                    textAlign: "center",
                    marginBottom: 20,
                  }}
                >
                  {studentData.name} ------------ {studentData.gradeLevel} (
                  {studentData.section})
                </Title>

                <Table
                  columns={columns}
                  dataSource={studentData.fees}
                  pagination={false}
                  bordered
                  style={{ marginTop: 20 }}
                  rowKey={(record) => record.month}
                />
              </>
            )}
          </div>
        )}

        {studentData && studentData.fees?.length > 0 && (
          <Button
            onClick={handlePrint}
            style={{
              marginTop: 30,
              background: "#1C2951",
              color: "#fff",
              borderRadius: 25,
              padding: "0 30px",
            }}
          >
            🖨️ Print Fee Record
          </Button>
        )}
      </Card>
    </div>
  );
};

export default FeeStatus;

import React, { useState, useRef } from "react";
import { Input, Button, Card, Typography, message, Spin } from "antd";
import axiosInstance from "../../axiosInstance";

const { Title, Text } = Typography;

const StudentInfo = () => {
  const [studentId, setStudentId] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const printRef = useRef();

  const fetchResult = async () => {
    if (!studentId.trim()) {
      message.warning("Please enter a student ID");
      return;
    }

    try {
      setLoading(true);
      const { data } = await axiosInstance.get(
        `/public/student/${studentId}/result`
      );
      setResult(data);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
      setResult(null);
      message.error("Student not found or server error.");
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
          borderRadius: 15,
          padding: "30px 50px",
        }}
      >
        <Title level={2} style={{ color: "#C1272D" }}>
          Student Result Sheet
        </Title>

        <Text style={{ color: "#555" }}>
          Enter your <strong>Student ID</strong> to view your result.
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
          onClick={fetchResult}
          loading={loading}
          style={{
            background: "#C1272D",
            borderColor: "#C1272D",
            borderRadius: "25px",
            padding: "0 40px",
            fontWeight: 600,
          }}
        >
          View Result
        </Button>

        {loading && <Spin style={{ marginTop: 20 }} />}

        {result && (
          <>
            <div ref={printRef} style={{ marginTop: 40, textAlign: "left" }}>
              <Title
                level={4}
                style={{
                  color: "#1C2951",
                  textAlign: "center",
                  marginBottom: 20,
                }}
              >
                Report Card
              </Title>

              <p><strong>Name:</strong> {result.studentName}</p>
              <p><strong>Grade:</strong> {result.gradeLevel}{result.section}</p>
              <p><strong>Gender:</strong> {result.gender}</p>

              <table
                style={{
                  width: "100%",
                  borderCollapse: "collapse",
                  marginTop: 20,
                }}
              >
                <thead>
                  <tr style={{ background: "#f4f4f4" }}>
                    <th style={styles.th}>Subject</th>
                    <th style={styles.th}>Score</th>
                    <th style={styles.th}>Grade</th>
                    <th style={styles.th}>Remarks</th>
                  </tr>
                </thead>
                <tbody>
                  {result.subjects.map((subj, index) => (
                    <tr key={index}>
                      <td style={styles.td}>{subj.subject}</td>
                      <td style={styles.td}>{subj.score}</td>
                      <td style={styles.td}>{subj.grade}</td>
                      <td style={styles.td}>{subj.remarks}</td>
                    </tr>
                  ))}

                  <tr>
                    <td style={styles.td}><strong>Total</strong></td>
                    <td style={styles.td}><strong>{result.totalMarks}</strong></td>
                    <td style={styles.td}></td>
                    <td style={styles.td}></td>
                  </tr>
                  <tr>
                    <td style={styles.td}><strong>Average</strong></td>
                    <td style={styles.td}><strong>{result.average}</strong></td>
                    <td style={styles.td}></td>
                    <td style={styles.td}></td>
                  </tr>
                  <tr>
                    <td style={styles.td}><strong>Rank</strong></td>
                    <td style={styles.td}>
                      <strong>
                        {result.rank} / {result.totalStudents}
                      </strong>
                    </td>
                    <td style={styles.td}></td>
                    <td style={styles.td}></td>
                  </tr>
                  <tr>
                    <td style={styles.td}><strong>Absent</strong></td>
                    <td style={styles.td}><strong>{result.daysAbsent}</strong></td>
                    <td style={styles.td}></td>
                    <td style={styles.td}></td>
                  </tr>
                </tbody>
              </table>
               <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: 30,
                fontStyle: "italic",
                color: "#555",
              }}
            >
              <Text>Teacher’s Signature: __________________</Text>
              <Text>Principal’s Signature: __________________</Text>
            </div>
            </div>

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
              🖨️ Print Result
            </Button>
          </>
        )}
      </Card>
    </div>
  );
};

const styles = {
  th: {
    border: "1px solid #ccc",
    padding: "8px",
    textAlign: "center",
    fontWeight: 600,
  },
  td: {
    border: "1px solid #ccc",
    padding: "8px",
    textAlign: "center",
  },
};

export default StudentInfo;

import React, { useState, useEffect } from "react";
import axiosInstance from "../../axiosInstance";
import { toast } from "react-hot-toast";
import {
  Card,
  Select,
  Button,
  Table,
  Input,
  Modal,
  Typography,
  Row,
  Col,
  Tag,
  Avatar,
  Space,
  Divider,
  Progress
} from "antd";
import {
  TeamOutlined,
  UserOutlined,
  BookOutlined,
  SaveOutlined,
  EyeOutlined,
  ArrowLeftOutlined,
  CheckCircleOutlined,
  FileTextOutlined,
  StarOutlined,
  SearchOutlined
} from "@ant-design/icons";

const { Option } = Select;
const { Title, Text } = Typography;
const { TextArea } = Input;

const ResultEntry = () => {
  const [grade, setGrade] = useState("");
  const [section, setSection] = useState("");
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [results, setResults] = useState([]);
  const [showSummary, setShowSummary] = useState(false);
  const [semister, setSemister] = useState("");
  const [loading, setLoading] = useState(false);
  const [hasFetchedStudents, setHasFetchedStudents] = useState(false);

  // Hardcoded subjects by grade (you can expand as needed)
  const subjectsByGrade = {
    "Grade 1": ["English", "Math", "Science", "Amharic", "Civics"],
    "Grade 2": ["English", "Math", "Science", "Amharic", "Civics", "ICT"],
    "Grade 3": ["English", "Math", "Biology", "Chemistry", "Physics"],
  };

  const grades = ["Grade 1", "Grade 2", "Grade 3","Grade 4","Grade 5","Grade 6","Grade 7","Grade 8","Grade 9","Grade 10","Grade 11","Grade 12"];
  const sections = ["A", "B", "C","D","E","F","G","H","I","J","K"];

  // ✅ Load students for selected class/section
  const fetchStudents = async () => {
    if (!grade || !section) {
      toast.error("Please select grade and section");
      return;
    }

    setLoading(true);
    try {
      const res = await axiosInstance.get(`/students/class/${grade}/${section}`);
      setStudents(res.data);
      setHasFetchedStudents(true);
      toast.success("✅ Students loaded successfully");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to fetch students");
      setStudents([]);
      setHasFetchedStudents(true);
    } finally {
      setLoading(false);
    }
  };

  // Reset fetched state when grade or section changes
  useEffect(() => {
    setHasFetchedStudents(false);
    setStudents([]);
  }, [grade, section]);

  // ✅ Open result entry for selected student
  const handleStudentClick = (student) => {
    setSelectedStudent(student);
    const subjects = subjectsByGrade[grade] || [];
    setResults(subjects.map((subject) => ({ subject, score: "", remark: "" })));
  };

  const handleChange = (index, field, value) => {
    const updated = [...results];
    updated[index][field] = value;
    setResults(updated);
  };

  // ✅ Summary before saving
  const handleShowSummary = () => {
    if (results.every((r) => !r.score && !r.remark)) {
      return toast.error("Please fill at least one subject result!");
    }
    if (!semister) {
      return toast.error("Please select a semester!");
    }
    setShowSummary(true);
  };

  // ✅ Save all subjects' grades
  const handleSave = async () => {
    if (!semister) {
      toast.error("Please select a semester before saving!");
      return;
    }

    if (!selectedStudent) {
      toast.error("No student selected!");
      return;
    }

    setLoading(true);
    try {
      for (const r of results) {
        if (!r.score && !r.remark) continue;

        // validate and coerce values
        const scoreVal = r.score === "" || r.score == null ? undefined : Number(r.score);
        const remarksVal = r.remark || (scoreVal >= 90 ? "Excellent" : scoreVal >= 75 ? "Good" : "Needs Improvement");

        if (scoreVal === undefined && !remarksVal) {
          // nothing to save for this subject
          continue;
        }

        const payload = {
          student: selectedStudent._id,
          subject: r.subject,
          score: scoreVal,
          remarks: remarksVal,
          semister,
        };

        // extra client-side guard; server expects semister, student, subject and score (score may be number)
        if (!payload.student || !payload.subject || payload.score === undefined || !payload.semister) {
          throw new Error('Missing required grade fields before sending payload: ' + JSON.stringify(payload));
        }

        await axiosInstance.post("/grades", payload);
      }

      toast.success("✅ Results saved successfully!");
      setShowSummary(false);
      setSelectedStudent(null);
    } catch (err) {
      // log full response for debugging
      const resp = err.response?.data;
      console.error("❌ Error saving result:", resp || err.message || err);
      try {
        console.error("Full error:", JSON.stringify(err.response?.data, null, 2));
      } catch (e) {}
      toast.error(resp?.message || resp?.error || "Error saving results!");
    } finally {
      setLoading(false);
    }
  };

  // Calculate average score for summary
  const calculateAverage = () => {
    const validScores = results.filter(r => r.score).map(r => parseInt(r.score));
    if (validScores.length === 0) return 0;
    return (validScores.reduce((a, b) => a + b, 0) / validScores.length).toFixed(1);
  };

  const getGradeColor = (score) => {
    if (!score) return 'default';
    const numScore = parseInt(score);
    if (numScore >= 90) return 'green';
    if (numScore >= 75) return 'blue';
    if (numScore >= 50) return 'orange';
    return 'red';
  };

  const getGradeText = (score) => {
    if (!score) return 'Not Graded';
    const numScore = parseInt(score);
    if (numScore >= 90) return 'A+';
    if (numScore >= 80) return 'A';
    if (numScore >= 70) return 'B';
    if (numScore >= 60) return 'C';
    if (numScore >= 50) return 'D';
    return 'F';
  };

  const resultColumns = [
    {
      title: 'Subject',
      dataIndex: 'subject',
      key: 'subject',
      width: 200,
      render: (subject) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <BookOutlined style={{ color: '#1C2951' }} />
          <Text strong>{subject}</Text>
        </div>
      ),
    },
    {
      title: 'Score',
      dataIndex: 'score',
      key: 'score',
      width: 150,
      render: (score, record, index) => (
        <Input
          type="number"
          min="0"
          max="100"
          value={score}
          onChange={(e) => handleChange(index, "score", e.target.value)}
          placeholder="Enter score (0-100)"
          style={{ width: '100%' }}
          suffix="/100"
        />
      ),
    },
    {
      title: 'Grade',
      key: 'grade',
      width: 100,
      render: (_, record) => (
        <Tag color={getGradeColor(record.score)} style={{ fontWeight: 600, minWidth: 50, textAlign: 'center' }}>
          {getGradeText(record.score)}
        </Tag>
      ),
    },
    {
      title: 'Remarks',
      dataIndex: 'remark',
      key: 'remark',
      render: (remark, record, index) => (
        <Input
          value={remark}
          onChange={(e) => handleChange(index, "remark", e.target.value)}
          placeholder="Optional remarks"
          style={{ width: '100%' }}
        />
      ),
    },
  ];

  // Determine which empty state to show
  const renderEmptyState = () => {
    // Case 1: No grade or section selected
    if (!grade || !section) {
      return (
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
            <SearchOutlined style={{ fontSize: 80, marginBottom: 24, opacity: 0.9 }} />
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
              to prepare and manage student report cards
            </Text>
            <div style={{ 
              marginTop: 32,
              padding: '16px',
              background: 'rgba(255,255,255,0.1)',
              borderRadius: '12px',
              border: '1px solid rgba(255,255,255,0.2)'
            }}>
              <Text style={{ color: 'rgba(255,255,255,0.9)', fontSize: '14px' }}>
                💡 <strong>Tip:</strong> Select both grade and section, then click "Load Students"
              </Text>
            </div>
          </div>
        </Card>
      );
    }

    // Case 2: Grade and section selected but not fetched yet
    if (!hasFetchedStudents) {
      return (
        <Card 
          style={{ 
            borderRadius: 20,
            textAlign: 'center',
            padding: '80px 40px',
            background: 'linear-gradient(135deg, #ffd89b 0%, #19547b 100%)',
            border: 'none',
            boxShadow: '0 12px 40px rgba(255, 216, 155, 0.3)'
          }}
        >
          <div style={{ color: 'white' }}>
            <TeamOutlined style={{ fontSize: 80, marginBottom: 24, opacity: 0.9 }} />
            <Title level={2} style={{ color: 'white', marginBottom: 16, fontWeight: 700 }}>
              READY TO LOAD STUDENTS
            </Title>
            <Text style={{ 
              fontSize: '18px', 
              color: 'rgba(255,255,255,0.9)',
              fontWeight: 500,
              display: 'block',
              lineHeight: 1.6
            }}>
              You've selected {grade} - Section {section}<br />
              Click the "Load Students" button to fetch the student list
            </Text>
            <div style={{ 
              marginTop: 32,
              padding: '16px',
              background: 'rgba(255,255,255,0.1)',
              borderRadius: '12px',
              border: '1px solid rgba(255,255,255,0.2)'
            }}>
              <Text style={{ color: 'rgba(255,255,255,0.9)', fontSize: '14px' }}>
                📝 <strong>Next:</strong> Click the red "Load Students" button above
              </Text>
            </div>
          </div>
        </Card>
      );
    }

    // Case 3: Grade and section selected, fetched, but no students found
    if (hasFetchedStudents && students.length === 0) {
      return (
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
              NO STUDENTS FOUND
            </Title>
            <Text style={{ 
              fontSize: '18px', 
              color: 'rgba(255,255,255,0.9)',
              fontWeight: 500,
              display: 'block',
              lineHeight: 1.6
            }}>
              No students found in {grade} - Section {section}<br />
              Please check if the class has registered students
            </Text>
            <div style={{ 
              marginTop: 32,
              padding: '16px',
              background: 'rgba(255,255,255,0.1)',
              borderRadius: '12px',
              border: '1px solid rgba(255,255,255,0.2)'
            }}>
              <Text style={{ color: 'rgba(255,255,255,0.9)', fontSize: '14px' }}>
                🔄 <strong>Action:</strong> Try loading students again or check different class/section
              </Text>
            </div>
          </div>
        </Card>
      );
    }

    return null;
  };

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
            📊
          </div>
          <div>
            <Title level={2} style={{ color: "#1C2951", margin: 0, fontWeight: 700 }}>
              Student Results Entry
            </Title>
            <Text style={{ color: '#1C2951', opacity: 0.8, fontSize: '16px' }}>
              Enter and manage student academic results by class and section
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
                value={grade || undefined}
                onChange={setGrade}
                style={{ width: '100%' }}
                suffixIcon={<TeamOutlined />}
              >
                {grades.map((g) => (
                  <Option key={g} value={g}>{g}</Option>
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
                onChange={setSection}
                style={{ width: '100%' }}
              >
                {sections.map((s) => (
                  <Option key={s} value={s}>{s}</Option>
                ))}
              </Select>
            </div>
          </Col>

          <Col xs={24} sm={8} md={6}>
            <Button
              type="primary"
              icon={<TeamOutlined />}
              onClick={fetchStudents}
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
        </Row>
      </Card>

      {/* Students List */}
      {!selectedStudent && students.length > 0 && (
        <Card
          title={
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <UserOutlined style={{ color: '#1C2951' }} />
              <span style={{ color: '#1C2951', fontWeight: 600 }}>
                Students List - {grade} Section {section}
              </span>
              <Tag color="blue" style={{ marginLeft: 'auto' }}>
                {students.length} Students
              </Tag>
            </div>
          }
          style={{ 
            borderRadius: 16,
            boxShadow: '0 8px 32px rgba(28, 41, 81, 0.08)',
            border: '1px solid rgba(28, 41, 81, 0.1)',
            marginBottom: 24
          }}
        >
          <div style={{ display: 'grid', gap: 12 }}>
            {students.map((student, index) => (
              <Card
                key={student._id}
                hoverable
                onClick={() => handleStudentClick(student)}
                style={{ 
                  borderRadius: 12,
                  border: '1px solid #e8e8e8',
                  transition: 'all 0.3s'
                }}
                bodyStyle={{ padding: '16px' }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <Avatar 
                    size="large"
                    style={{ 
                      background: 'linear-gradient(135deg, #C1272D 0%, #1C2951 100%)'
                    }}
                    icon={<UserOutlined />}
                  />
                  <div style={{ flex: 1 }}>
                    <Text strong style={{ color: '#1C2951', fontSize: '16px', display: 'block' }}>
                      {index + 1}. {student.name}
                    </Text>
                    <div style={{ display: 'flex', gap: 12, marginTop: 4 }}>
                      <Text type="secondary" style={{ fontSize: '12px' }}>
                        ID: {student.studentId}
                      </Text>
                      <Text type="secondary" style={{ fontSize: '12px' }}>
                        Age: {student.age}
                      </Text>
                      <Tag color={student.gender === 'Male' ? 'blue' : 'pink'} style={{ fontSize: '11px' }}>
                        {student.gender}
                      </Tag>
                    </div>
                  </div>
                  <Button 
                    type="link" 
                    icon={<FileTextOutlined />}
                    style={{ color: '#1C2951' }}
                  >
                    Enter Results
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </Card>
      )}

      {/* Result Entry Form */}
      {selectedStudent && (
        <Card
          title={
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <FileTextOutlined style={{ color: '#1C2951' }} />
              <span style={{ color: '#1C2951', fontWeight: 600 }}>
                Enter Results for {selectedStudent.name}
              </span>
            </div>
          }
          style={{ 
            borderRadius: 16,
            boxShadow: '0 8px 32px rgba(28, 41, 81, 0.08)',
            border: '1px solid rgba(28, 41, 81, 0.1)'
          }}
        >
          {/* Student Info and Semester Selection */}
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            marginBottom: 24,
            padding: '16px',
            background: 'linear-gradient(135deg, #f0f8ff 0%, #e6f7ff 100%)',
            borderRadius: '12px',
            border: '1px solid #bae7ff'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <Avatar 
                size="large"
                style={{ 
                  background: 'linear-gradient(135deg, #C1272D 0%, #1C2951 100%)'
                }}
                icon={<UserOutlined />}
              />
              <div>
                <Text strong style={{ color: '#1C2951', fontSize: '16px', display: 'block' }}>
                  {selectedStudent.name}
                </Text>
                <div style={{ display: 'flex', gap: 12, marginTop: 4 }}>
                  <Text type="secondary">ID: {selectedStudent.studentId}</Text>
                  <Text type="secondary">Grade: {selectedStudent.grade}</Text>
                  <Text type="secondary">Section: {selectedStudent.section}</Text>
                </div>
              </div>
            </div>
            
            <div style={{ minWidth: 200 }}>
              <Text strong style={{ display: 'block', marginBottom: 8, color: '#1C2951' }}>
                Select Semester
              </Text>
              <Select
                value={semister}
                onChange={setSemister}
                style={{ width: '100%' }}
                placeholder="Choose Semester"
              >
                <Option value="I">Semester I</Option>
                <Option value="II">Semester II</Option>
              </Select>
            </div>
          </div>

          {/* Results Table */}
          <Table
            columns={resultColumns}
            dataSource={results.map((item, index) => ({ ...item, key: index }))}
            pagination={false}
            size="middle"
            bordered
          />

          {/* Action Buttons */}
          <div style={{ display: 'flex', gap: 12, marginTop: 24, justifyContent: 'flex-end' }}>
            <Button
              icon={<ArrowLeftOutlined />}
              onClick={() => setSelectedStudent(null)}
              size="large"
            >
              Back to Students
            </Button>
            <Button
              type="primary"
              icon={<EyeOutlined />}
              onClick={handleShowSummary}
              size="large"
              style={{ 
                background: '#1890ff', 
                borderColor: '#1890ff'
              }}
            >
              Review Summary
            </Button>
          </div>
        </Card>
      )}

      {/* Empty States - Show when no students are selected and conditions are met */}
      {!selectedStudent && renderEmptyState()}

      {/* Summary Modal */}
      <Modal
        title={
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <CheckCircleOutlined style={{ color: '#52c41a' }} />
            <span>Confirm Results Submission</span>
          </div>
        }
        open={showSummary}
        onCancel={() => setShowSummary(false)}
        footer={[
          <Button key="cancel" onClick={() => setShowSummary(false)}>
            Cancel
          </Button>,
          <Button 
            key="save" 
            type="primary" 
            icon={<SaveOutlined />}
            loading={loading}
            onClick={handleSave}
            style={{ 
              background: '#52c41a', 
              borderColor: '#52c41a'
            }}
          >
            Confirm & Save Results
          </Button>,
        ]}
        width={600}
      >
        <div style={{ padding: '16px 0' }}>
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: 12, 
            marginBottom: 20,
            padding: '16px',
            background: 'linear-gradient(135deg, #f6ffed 0%, #f0fff3 100%)',
            borderRadius: '8px',
            border: '1px solid #b7eb8f'
          }}>
            <Avatar 
              size="large"
              style={{ 
                background: 'linear-gradient(135deg, #C1272D 0%, #1C2951 100%)'
              }}
              icon={<UserOutlined />}
            />
            <div>
              <Text strong style={{ color: '#1C2951', fontSize: '16px', display: 'block' }}>
                {selectedStudent?.name}
              </Text>
              <Text type="secondary">
                {grade} - Section {section} • Semester {semister}
              </Text>
            </div>
            <div style={{ marginLeft: 'auto', textAlign: 'center' }}>
              <Text strong style={{ color: '#1C2951', display: 'block' }}>
                Average Score
              </Text>
              <Title level={3} style={{ color: '#C1272D', margin: 0 }}>
                {calculateAverage()}%
              </Title>
            </div>
          </div>

          <Divider />

          <Text strong style={{ display: 'block', marginBottom: 12, color: '#1C2951' }}>
            Results Summary:
          </Text>
          <div style={{ maxHeight: 300, overflowY: 'auto' }}>
            {results
              .filter((r) => r.score || r.remark)
              .map((r, i) => (
                <div 
                  key={i} 
                  style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center',
                    padding: '12px',
                    borderBottom: '1px solid #f0f0f0'
                  }}
                >
                  <div>
                    <Text strong style={{ color: '#1C2951' }}>{r.subject}</Text>
                    <br />
                    <Text type="secondary" style={{ fontSize: '12px' }}>
                      {r.remark || 'No remarks'}
                    </Text>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <Tag color={getGradeColor(r.score)} style={{ fontWeight: 600 }}>
                      {r.score || '0'}/100
                    </Tag>
                    <br />
                    <Text type="secondary" style={{ fontSize: '12px' }}>
                      {getGradeText(r.score)}
                    </Text>
                  </div>
                </div>
              ))}
          </div>

          {results.filter((r) => r.score || r.remark).length === 0 && (
            <div style={{ textAlign: 'center', padding: 20, color: '#d9d9d9' }}>
              <FileTextOutlined style={{ fontSize: 32, marginBottom: 8 }} />
              <div>No results entered</div>
            </div>
          )}
        </div>
      </Modal>
    </div>
  );
};

export default ResultEntry;
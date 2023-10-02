import React, { useState } from 'react';
import './LoginPage.css';

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);

  function handleLogin(e) {
    e.preventDefault();
    if (username === 'username' && password === '123456') {
      setLoggedIn(true);
    } else {
      alert('Login failed. Please check your username and password.');
    }
  }

  const [studentName, setStudentName] = useState('');
  const [marks, setMarks] = useState({
    tamil: '',
    english: '',
    maths: '',
    science: '',
    social: '',
  });

  const [studentData, setStudentData] = useState([]);
  const [totalMarks, setTotalMarks] = useState(0);
  const [percentage, setPercentage] = useState(0);

  const [studentErrors, setStudentErrors] = useState({});
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleSubmit = () => {
    const errors = {};

    if (studentName.trim() === '') {
      errors.studentName = 'Student Name is required';
    }

    const subjectErrors = {};

    for (const subject in marks) {
      if (marks[subject] < 0 || marks[subject] > 100) {
        subjectErrors[subject] = `${subject} marks should be between 0 and 100`;
      }
    }

    Object.assign(errors, subjectErrors);

    if (Object.keys(errors).length === 0) {
      const newData = { studentName, ...marks };
      setStudentData([...studentData, newData]);
      setStudentName('');
      setMarks({
        tamil: '',
        english: '',
        maths: '',
        science: '',
        social: '',
      });
      setFormSubmitted(true);

      // Calculate total marks and percentage
      const total = Object.values(marks).reduce((acc, curr) => acc + parseInt(curr), 0);
      const totalSubjects = Object.keys(marks).length;
      const calculatedPercentage = total / (totalSubjects * 100) * 100;
      setTotalMarks(total);
      setPercentage(calculatedPercentage);
    } else {
      setStudentErrors(errors);
    }
  };

  const handleLogout = () => {
    setLoggedIn(false);
    setStudentName('');
    setMarks({
      tamil: '',
      english: '',
      maths: '',
      science: '',
      social: '',
    });
    setFormSubmitted(false);
    setTotalMarks(0);
    setPercentage(0);
  };

  if (loggedIn) {
    return (
      <div className="login-page">
        <div className="student-details">
          <h2>Student Details</h2>
          <div className="form-group">
            <label htmlFor="studentName">Student Name</label>
            <input
              type="text"
              id="studentName"
              placeholder="Enter student name"
              value={studentName}
              onChange={(e) => setStudentName(e.target.value)}
              required
            />
            {studentErrors.studentName && (
              <div className="error">{studentErrors.studentName}</div>
            )}
          </div>
          <div className="subject-marks">
            <h3>Subject Marks</h3>
            {Object.keys(marks).map((subject) => (
              <div className="form-group" key={subject}>
                <label htmlFor={subject}>{subject}</label>
                <input
                  type="number"
                  id={subject}
                  value={marks[subject]}
                  onChange={(e) =>
                    setMarks({ ...marks, [subject]: e.target.value })
                  }
                  required
                />
                {studentErrors[subject] && (
                  <div className="error">{studentErrors[subject]}</div>
                )}
              </div>
            ))}
          </div>
          <button onClick={handleSubmit}>Submit</button>
          <button onClick={handleLogout}>Logout</button>
        </div>

        {formSubmitted && (
          <div className="student-table">
            <h2>Student Data</h2>
            <table>
              <thead>
                <tr>
                  <th>Serial No</th>
                  <th>Student Name</th>
                  {Object.keys(marks).map((subject) => (
                    <th key={subject}>{subject}</th>
                  ))}
                  <th>Total Marks</th>
                  <th>Percentage</th>
                </tr>
              </thead>
              <tbody>
                {studentData.map((data, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    {/* <td>{data.studentName}</td> */}
                    {Object.values(data).map((value, i) => (
                      <td key={i}>{value}</td>
                    ))}
                    <td>{totalMarks}</td>
                    <td>{percentage.toFixed(2)}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    );
  } else {
    return (
      <div className="login-page">
        <div className="login-container">
          <h2>Login</h2>
          <form onSubmit={handleLogin}>
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit">Login</button>
          </form>
        </div>
      </div>
    );
  }
}

export default LoginPage;

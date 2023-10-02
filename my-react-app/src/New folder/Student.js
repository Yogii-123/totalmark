import  { useState } from 'react';
import './LoginPage.css'; 

function Student() {

      const [studentName, setStudentName] = useState('');
      const [marks, setMarks] = useState({
      tamil: '',
      english: '',
      maths: '',
      science: '',
      social: '',
    });
  
    const [studentData, setStudentData] = useState([]);


  const [studentErrors, setStudentErrors] = useState({});
  const [formSubmitted, setFormSubmitted] = useState(false); 

  const handleSubmit = () => {
    const errors = {};

    if (studentName.trim() === '') {
      errors.studentName = 'Student Name is required';
    }

    const subjectErrors = {};
  
    if (marks.tamil < 0 || marks.tamil > 100) {
      subjectErrors.tamil = 'Tamil marks should be between 0 and 100';
    }
    if (marks.english < 0 || marks.english > 100) {
      subjectErrors.english = 'English marks should be between 0 and 100';
    }
    if (marks.maths < 0 || marks.maths > 100) {
      subjectErrors.maths = 'Maths marks should be between 0 and 100';
    }
    if (marks.science < 0 || marks.science > 100) {
      subjectErrors.science = 'Science marks should be between 0 and 100';
    }
    if (marks.social < 0 || marks.social > 100) {
      subjectErrors.social = 'Social marks should be between 0 and 100';
    }

    Object.assign(errors, subjectErrors);

    if (Object.keys(errors).length === 0) {
      const newData = { studentName, ...marks };
      setStudentData([...studentData, newData]);
      setStudentName('');
      setMarks({
        tamil: 0,
        english: 0,
        maths: 0,
        science: 0,
        social: 0,
      });
      setFormSubmitted(true); 
    } else {
      setStudentErrors(errors);
    }
  };

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
              />
              {studentErrors.studentName && (
                <div className="error">{studentErrors.studentName}</div>
              )}
            </div>
            <div className="subject-marks">
              <h3>Subject Marks</h3>
              <div className="form-group">
                <label htmlFor="tamil">Tamil</label>
                <input
                  type="number"
                  id="tamil"
                  value={marks.tamil}
                  onChange={(e) =>
                    setMarks({ ...marks, tamil: parseInt(e.target.value) })
                  } required/>
                {studentErrors.tamil && (
                  <div className="error">{studentErrors.tamil}</div>
                )}

<label htmlFor="english">English</label>
              <input
                type="number"
                id="english"
                value={marks.english}
                onChange={(e) => setMarks({ ...marks, english: parseInt(e.target.value) })} required/>
                              {studentErrors.english && (
                  <div className="error">{studentErrors.english}</div>
                )}

<label htmlFor="maths">Maths</label>
              <input
                type="number"
                id="maths"
                value={marks.maths}
                onChange={(e) => setMarks({ ...marks, maths: parseInt(e.target.value) })} required/>

{studentErrors.maths && (
                  <div className="error">{studentErrors.maths}</div>
                )}

<label htmlFor="science">Science</label>
              <input
                type="number"
                id="science"
                value={marks.science}
                onChange={(e) => setMarks({ ...marks, science: parseInt(e.target.value) })} required/>

                {studentErrors.science && (
                  <div className="error">{studentErrors.science}</div>
                )}

<label htmlFor="social">Social</label>
              <input
                type="number"
                id="social"
                value={marks.social}
                onChange={(e) => setMarks({ ...marks, social: parseInt(e.target.value) })} required/>

                {studentErrors.social && (
                  <div className="error">{studentErrors.social}</div>
                )}



              </div>
            </div>
            <button onClick={handleSubmit}>Submit</button>
          
    
      </div>

      {formSubmitted && (
        <div className="student-table">
          <h2>Student Data</h2>
          <table>
            <thead>
              <tr>
                <th>Student Name</th>
                <th>Tamil</th>
                <th>English</th>
                <th>Maths</th>
                <th>Science</th>
                <th>Social</th>
              </tr>
            </thead>
            <tbody>
              {studentData.map((data, index) => (
                <tr key={index}>
                  <td>{data.studentName}</td>
                  <td>{data.tamil}</td>
                  <td>{data.english}</td>
                  <td>{data.maths}</td>
                  <td>{data.science}</td>
                  <td>{data.social}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

    </div>
  );
}

export default Student;

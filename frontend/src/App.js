import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import './App.css';
import './index.css';

const API_URL = 'http://localhost:5000/students';

function App() {
  const [students, setStudents] = useState([]);
  const [currentStudentId, setCurrentStudentId] = useState(null);
  const [formData, setFormData] = useState({ name: '', email: '', course: '' });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setStudents(data);
    } catch (error) {
      console.error('Error fetching students:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        await fetch(`${API_URL}/update/${currentStudentId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        });
      } else {
        await fetch(`${API_URL}/add`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        });
      }
      fetchStudents();
      resetForm();
    } catch (error) {
      console.error('Error saving student:', error);
    }
  };

  const editStudent = async (id) => {
    try {
      const response = await fetch(`${API_URL}/${id}`);
      const student = await response.json();
      setFormData({ name: student.name, email: student.email, course: student.course });
      setCurrentStudentId(id);
      setIsEditing(true);
    } catch (error) {
      console.error('Error fetching student:', error);
    }
  };

  const deleteStudent = async (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await fetch(`${API_URL}/delete/${id}`, { method: 'DELETE' });
          fetchStudents();
          Swal.fire(
            'Deleted!',
            'The student record has been deleted.',
            'success'
          );
        } catch (error) {
          console.error('Error deleting student:', error);
          Swal.fire(
            'Error!',
            'There was an error deleting the student.',
            'error'
          );
        }
      }
    });
  };

  const resetForm = () => {
    setFormData({ name: '', email: '', course: '' });
    setCurrentStudentId(null);
    setIsEditing(false);
  };

  return (
    <div className="App">
      {/* HEADER SECTION */}
      <div className="app-header">
        <h1 className="app-title">📚 Student Management</h1>
        <p className="app-subtitle">Manage your students efficiently and professionally</p>
      </div>

      <div className="app-wrapper">
        {/* FORM SECTION - TOP */}
        <div className="form-section">
          <div className="form-wrapper">
            <h2 className="form-title">{isEditing ? '✏️ Edit Student Details' : '➕ Add New Student'}</h2>
            
            <form onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">📛 Full Name</label>
                  <input
                    type="text"
                    className="form-input"
                    id="name"
                    name="name"
                    placeholder="Enter student's full name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">📧 Email Address</label>
                  <input
                    type="email"
                    className="form-input"
                    id="email"
                    name="email"
                    placeholder="Enter email address"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              <div className="form-row full">
                <div className="form-group">
                  <label className="form-label">🎓 Course Name</label>
                  <input
                    type="text"
                    className="form-input"
                    id="course"
                    name="course"
                    placeholder="Enter course name (e.g., Web Development, Data Science)"
                    value={formData.course}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              <div className="form-actions">
                <button type="submit" className="btn-submit">
                  {isEditing ? '💾 Update Student' : '✅ Add Student'}
                </button>
                {isEditing && (
                  <button type="button" className="btn-reset" onClick={resetForm}>
                    ❌ Cancel
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>

        {/* STUDENTS LIST SECTION - BOTTOM */}
        <div className="list-section">
          <div className="students-header">
            <h2 className="students-title">📋 Enrolled Students</h2>
            <div className="students-count">{students.length} Student{students.length !== 1 ? 's' : ''}</div>
          </div>

          {students.length === 0 ? (
            <div className="empty-state">
              <div className="empty-state-icon">📭</div>
              <div className="empty-state-title">No Students Yet</div>
              <div className="empty-state-text">Start by adding your first student using the form above!</div>
            </div>
          ) : (
            <div className="students-list">
              {students.map(student => (
                <div key={student._id} className="student-card">
                  <div className="student-avatar">
                    {student.name.charAt(0).toUpperCase()}
                  </div>
                  <div className="student-name-card">{student.name}</div>
                  <div className="student-details">
                    <div className="student-detail-item">
                      <span className="student-detail-label">📧 Email:</span>
                      <span className="student-detail-value">{student.email}</span>
                    </div>
                    <div className="student-detail-item">
                      <span className="student-detail-label">🎓 Course:</span>
                      <span className="student-detail-value">{student.course}</span>
                    </div>
                  </div>
                  <div className="student-actions">
                    <button
                      className="btn-edit"
                      onClick={() => editStudent(student._id)}
                    >
                      ✏️ Edit
                    </button>
                    <button
                      className="btn-delete"
                      onClick={() => deleteStudent(student._id)}
                    >
                      🗑️ Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;

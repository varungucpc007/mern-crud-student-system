# mern-crud-student-system

# 🎓 MERN Student Portal (CRUD)

A full-stack **Student Management System** built using the **MERN Stack (MongoDB, Express, React, Node.js)** with complete CRUD operations and Nodemon for backend development.

---

## 🚀 Features

* ➕ Add new students
* 📄 View all students
* 🔍 View single student by ID
* ✏️ Update student details
* ❌ Delete student
* ⚡ Fast backend development using Nodemon
* 🌐 RESTful API integration

---

## 🛠️ Tech Stack

**Frontend:**

* React.js
* SweetAlert2

**Backend:**

* Node.js
* Express.js
* MongoDB (Mongoose)
* Nodemon

---

## 📁 Project Structure

```
project-root/
│
├── backend/
│   ├── models/
│   │   └── Student.js
│   ├── routes/
│   │   └── studentRoutes.js
│   ├── server.js
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   └── App.js
│   └── package.json
```

---

## ⚙️ Backend Setup

```bash
# Create backend folder
mkdir backend
cd backend

# Initialize project
npm init -y

# Install dependencies
npm install express cors mongoose nodemon
```

### ▶️ Run Backend Server

```bash
npx nodemon server.js
```

Server will run at:

```
http://localhost:5000
```

Test API:

```
http://localhost:5000/students
```

---

## 🧩 API Endpoints

| Method | Endpoint               | Description       |
| ------ | ---------------------- | ----------------- |
| POST   | `/students/add`        | Add new student   |
| GET    | `/students`            | Get all students  |
| GET    | `/students/:id`        | Get student by ID |
| PUT    | `/students/update/:id` | Update student    |
| DELETE | `/students/delete/:id` | Delete student    |

---

## 💻 Frontend Setup

```bash
# Create frontend
npx create-react-app frontend
cd frontend

# Install dependencies
npm install sweetalert2
```

### ▶️ Run Frontend

```bash
npm start
```

App will run at:

```
http://localhost:3000
```

---

## 🗄️ MongoDB Setup

Make sure MongoDB is running locally:

```
mongodb://127.0.0.1:27017/mern_demo
```

---

## 📌 Notes

* Ensure MongoDB service is running before starting backend
* Backend runs on port **5000**
* Frontend runs on port **3000**
* Nodemon auto-restarts server on file changes

---

🚗 Parking Management System
    A full-stack QR-based Parking Management System built using MERN Stack (MongoDB, Express, React, Node.js) with Role-Based Authentication and Redux Toolkit for global state management.
    
    This system allows secure vehicle registration, QR-based entry/exit scanning, and parking history tracking for residential societies or gated communities.

📌 Project Overview
The Parking Management System provides:

  👮 Admin Panel
    
    Register vehicles & generate QR codes
    
    Scan QR for entry/exit
    
    View dashboard statistics
    
    View complete parking history
    
    Search and manage registered vehicles

  👤 User Panel
    
    View registered vehicle details
    
    Download personal QR code
    
    View parking activity (future enhancement)

🔐 Role-Based Access Control (RBAC)

📊 Dashboard analytics

📱 QR-based scanning system

🏗️ Tech Stack
Frontend
React.js

React Router DOM

Redux Toolkit

Tailwind CSS

Axios

JWT Decode

React Hot Toast

html5-qrcode

Backend
Node.js

Express.js

MongoDB

Mongoose

JWT (Authentication)

Bcrypt (Password hashing)

UUID (QR ID generation)

QRCode (QR image generation)

🔐 Authentication & Authorization
The system uses JWT-based authentication.

Each token contains:

User ID

Role (admin / user)

Frontend Protection
Custom ProtectedRoute

Role-based route access

Redux global auth state

Backend Protection
JWT verification middleware

Role-based authorization middleware

Only Admins can:

Access dashboard

Register vehicles

Scan vehicles

View all history

Users can:

View only their own vehicle details

📂 Project Structure
Parking-Management-System/
│
├── backend/
│   ├── models/
│   ├── controllers/
│   ├── routes/
│   ├── middleware/
│   └── server.js
│
├── frontend/
│   ├── pages/
│   │   ├── admin/
│   │   └── user/
│   ├── layouts/
│   ├── components/
│   ├── redux/
│   │   ├── store.js
│   │   └── slices/
│   └── routes/
│
└── README.md
⚙️ Installation Guide
1️⃣ Clone Repository
git clone https://github.com/your-username/parking-management-system.git
cd parking-management-system
2️⃣ Backend Setup
cd backend
npm install
Create .env file:

PORT=4000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
Start backend:

npm start
3️⃣ Frontend Setup
cd frontend
npm install
npm run dev
🧩 Features Breakdown
🔹 Admin Dashboard
Total Vehicles

Entries Today

Exits Today

Currently Inside Vehicles

🔹 QR Generation
Unique UUID generated per vehicle

QR stored as Base64 image

Download option available

🔹 Scanner
Uses html5-qrcode

Detects Entry or Exit automatically

Prevents multiple scans

Updates scan history

🔹 History
Filter by:

Date

Entry/Exit

Vehicle number

Tabular clean layout

🔹 Redux Implementation
Global authentication state

Token stored centrally

Role-based route control

Logout clears Redux state

📊 Database Schema (Simplified)
User
name

email

password (hashed)

role

vehicleId

Vehicle
ownerName

vehicleNumber

flatNumber

vehicleType

contact

qrId

qrImage

user

ScanHistory
vehicleId

scanType (Entry / Exit)

date

time

🔄 Application Flow
Admin Flow
Login → Dashboard → Register Vehicle → Generate QR → Scan Entry/Exit → View History

User Flow
Login → View Profile → Download QR → View History

🎯 Learning Outcomes
JWT Authentication

Role-Based Access Control

Redux Toolkit state management

QR code generation and scanning

REST API development

Protected routing in React

MERN stack integration

🚀 Future Enhancements
Multiple vehicles per user

Real-time socket updates

Email notification system

Parking slot allocation system

Payment integration

Mobile responsive optimization

👨‍💻 Developed By
Kishor Pashte
Full Stack Developer (MERN)

📜 License
This project is developed for academic and learning purposes.


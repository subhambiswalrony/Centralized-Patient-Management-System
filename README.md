# Centralized Patient Management System (CPMS)

A comprehensive healthcare management solution designed to streamline patient care, doctor appointments, and administrative tasks through an intuitive web-based platform.

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [API Documentation](#api-documentation)
- [Contributing](#contributing)
- [License](#license)

## 🏥 Overview

The Centralized Patient Management System is a full-stack web application that facilitates seamless interaction between patients, doctors, and administrators. The system provides role-based access control, appointment management, patient history tracking, and comprehensive reporting features.

## ✨ Features

### For Patients
- **User Registration & Authentication**: Secure signup and login with JWT authentication
- **Profile Management**: Complete patient profile with personal and medical information
- **QR Code Generation**: Unique QR code for each patient for quick identification
- **Appointment Booking**: Schedule appointments with doctors across different departments
- **Medical History**: Access complete medical history and reports
- **Dashboard**: Personalized dashboard with upcoming appointments and health summary

### For Doctors
- **Doctor Portal**: Dedicated dashboard for managing patient consultations
- **Schedule Management**: Set availability and manage appointment slots
- **Patient Records**: Access patient history and medical reports
- **Department Association**: Organized by medical specialties
- **Appointment Management**: View and manage patient appointments

### For Administrators
- **User Management**: Manage patients, doctors, and admin accounts
- **Department Management**: Create and organize medical departments
- **System Analytics**: Overview of system usage and statistics
- **Data Management**: Comprehensive control over all system data

### General Features
- **Role-Based Access Control**: Separate interfaces for patients, doctors, and admins
- **Responsive Design**: Mobile-friendly interface using modern UI components
- **Dark Mode Support**: Theme switching capability
- **Real-time Updates**: Live data synchronization
- **Secure Authentication**: JWT-based authentication with bcrypt password hashing

## 🛠️ Tech Stack

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js v5.1.0
- **Database**: MongoDB with Mongoose ODM v8.19.2
- **Authentication**: JSON Web Tokens (JWT) v9.0.2
- **Password Hashing**: Bcrypt v6.0.0
- **QR Code Generation**: qrcode v1.5.4
- **CORS**: cors v2.8.5

### Frontend
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **UI Library**: shadcn/ui with Radix UI components
- **Styling**: Tailwind CSS
- **State Management**: React Query (@tanstack/react-query v5.83.0)
- **Routing**: React Router
- **HTTP Client**: Axios v1.13.2
- **Forms**: React Hook Form with Zod validation
- **Animations**: Framer Motion v12.23.24
- **Date Handling**: date-fns v3.6.0
- **Charts**: Recharts
- **Icons**: Lucide React

## 📁 Project Structure

```
Centralized-Patient-Management-System/
│
├── Backend/
│   ├── controllers/           # Request handlers
│   │   ├── adminDataController.js
│   │   ├── appointmentController.js
│   │   ├── authController.js
│   │   ├── departmentController.js
│   │   ├── doctorDataController.js
│   │   ├── patientDataController.js
│   │   ├── patientHistoryController.js
│   │   ├── patientReportController.js
│   │   └── userDataController.js
│   │
│   ├── models/                # Database schemas
│   │   ├── adminModel.js
│   │   ├── appointmentModel.js
│   │   ├── departmentModel.js
│   │   ├── doctorModel.js
│   │   ├── doctorScheduleModel.js
│   │   ├── patientHistoryModel.js
│   │   ├── patientModel.js
│   │   └── patientReportModel.js
│   │
│   ├── routes/                # API routes
│   │   ├── addDepartmentRoute.js
│   │   ├── adminDetailsRoute.js
│   │   ├── appointmentRoute.js
│   │   ├── authRoutes.js
│   │   ├── doctorDetailsRoute.js
│   │   ├── patientDetailsRoute.js
│   │   ├── patientHistoryRoutes.js
│   │   └── userDetailsRoute.js
│   │
│   ├── services/              # Business logic
│   │   └── availability.js
│   │
│   ├── utils/                 # Utility functions
│   │   └── jwtConfig.js
│   │
│   ├── dbConnect.js           # Database connection
│   ├── index.js               # Application entry point
│   └── package.json
│
└── Frontend/
    ├── src/
    │   ├── API/               # API integration
    │   │   └── api.js
    │   │
    │   ├── components/        # Reusable components
    │   │   ├── ui/            # shadcn/ui components
    │   │   ├── bookingPanel.tsx
    │   │   ├── DashboardLayout.tsx
    │   │   ├── DashboardSidebar.tsx
    │   │   ├── DashboardTopbar.tsx
    │   │   ├── Footer.tsx
    │   │   ├── Navbar.tsx
    │   │   ├── ProtectedRoute.tsx
    │   │   ├── QRCodeDisplay.tsx
    │   │   └── StatCard.tsx
    │   │
    │   ├── contexts/          # React contexts
    │   │   ├── AuthContext.tsx
    │   │   └── ThemeContext.tsx
    │   │
    │   ├── hooks/             # Custom hooks
    │   │   ├── use-mobile.tsx
    │   │   └── use-toast.ts
    │   │
    │   ├── pages/             # Application pages
    │   │   ├── AdminDashboard.tsx
    │   │   ├── DoctorDashboard.tsx
    │   │   ├── Home.tsx
    │   │   ├── Index.tsx
    │   │   ├── Login.tsx
    │   │   ├── ManagePatients.tsx
    │   │   ├── NotFound.tsx
    │   │   ├── PatientDashboard.tsx
    │   │   ├── PatientHistory.tsx
    │   │   ├── PatientProfile.tsx
    │   │   ├── Register.tsx
    │   │   └── Settings.tsx
    │   │
    │   ├── utils/             # Utility functions
    │   │   └── mockData.ts
    │   │
    │   ├── App.tsx            # Main application component
    │   ├── main.tsx           # Application entry point
    │   └── index.css          # Global styles
    │
    ├── public/
    │   └── robots.txt
    │
    ├── index.html
    ├── package.json
    ├── vite.config.ts
    ├── tailwind.config.ts
    └── tsconfig.json
```

## 🚀 Installation

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- npm or yarn package manager

### Backend Setup

1. Navigate to the Backend directory:
```bash
cd Backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the Backend directory:
```env
PORT=5000
MONGODB_CONNECTION_STRING=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRES_IN=7d
```

4. Start the development server:
```bash
npm run dev
```

The backend server will run on `http://localhost:5000` (or your specified PORT).

### Frontend Setup

1. Navigate to the Frontend directory:
```bash
cd Frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the Frontend directory:
```env
VITE_API_URL=http://localhost:5000
```

4. Start the development server:
```bash
npm run dev
```

The frontend application will run on `http://localhost:5173`.

## ⚙️ Configuration

### Backend Configuration

The backend uses environment variables for configuration. Key variables include:

- `PORT`: Server port (default: 5000)
- `MONGODB_CONNECTION_STRING`: MongoDB connection URI
- `JWT_SECRET`: Secret key for JWT token generation
- `JWT_EXPIRES_IN`: Token expiration time

### Frontend Configuration

The frontend uses Vite for build configuration. Key files:

- `vite.config.ts`: Vite configuration
- `tailwind.config.ts`: Tailwind CSS configuration
- `tsconfig.json`: TypeScript configuration

## 💻 Usage

### User Roles

1. **Patient**
   - Register with personal and medical information
   - Login to access personalized dashboard
   - Book appointments with doctors
   - View medical history and reports
   - Access unique QR code for identification

2. **Doctor**
   - Register with professional credentials
   - Manage appointment schedule
   - Access patient records
   - View and manage consultations

3. **Administrator**
   - Manage all system users
   - Create and manage departments
   - View system analytics
   - Oversee overall system operations

### Key Workflows

#### Patient Registration
1. Navigate to the registration page
2. Select "Patient" role
3. Fill in personal details (name, age, gender, address)
4. Provide medical information (blood group)
5. Enter contact details (email, phone)
6. Create a secure password
7. Submit registration

#### Booking an Appointment
1. Login to patient dashboard
2. Navigate to appointment booking section
3. Select department and doctor
4. Choose available time slot
5. Confirm booking
6. Receive confirmation

#### Doctor Schedule Management
1. Login to doctor portal
2. Navigate to schedule management
3. Set available time slots
4. Update availability as needed
5. View upcoming appointments

## 📚 API Documentation

### Authentication Endpoints

#### Register User
```http
POST /api/auth/register
Content-Type: application/json

{
  "fullName": "John Doe",
  "email": "john@example.com",
  "password": "securePassword123",
  "role": "patient",
  "phone": "+1234567890",
  "age": 30,
  "gender": "Male",
  "address": "123 Main St",
  "bloodGroup": "A+"
}
```

#### Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "securePassword123"
}
```

### Patient Endpoints
- `GET /api/patients` - Get all patients
- `GET /api/patients/:id` - Get patient by ID
- `PUT /api/patients/:id` - Update patient details
- `DELETE /api/patients/:id` - Delete patient

### Doctor Endpoints
- `GET /api/doctors` - Get all doctors
- `GET /api/doctors/:id` - Get doctor by ID
- `GET /api/doctors/department/:deptId` - Get doctors by department
- `PUT /api/doctors/:id` - Update doctor details

### Appointment Endpoints
- `POST /api/appointments` - Create appointment
- `GET /api/appointments` - Get all appointments
- `GET /api/appointments/:id` - Get appointment by ID
- `PUT /api/appointments/:id` - Update appointment
- `DELETE /api/appointments/:id` - Cancel appointment

### Department Endpoints
- `POST /api/departments` - Create department
- `GET /api/departments` - Get all departments
- `PUT /api/departments/:id` - Update department
- `DELETE /api/departments/:id` - Delete department

### Patient History Endpoints
- `POST /api/patient-history` - Add patient history
- `GET /api/patient-history/:patientId` - Get patient history
- `PUT /api/patient-history/:id` - Update history entry

## 🔒 Security Features

- **Password Hashing**: Bcrypt with salt rounds for secure password storage
- **JWT Authentication**: Stateless authentication with token-based access
- **CORS Configuration**: Configured for secure cross-origin requests
- **Input Validation**: Server-side validation for all inputs
- **Role-Based Access Control**: Restricted access based on user roles
- **Protected Routes**: Frontend route protection for authenticated users

## 🎨 UI/UX Features

- **Modern Design**: Clean and intuitive interface
- **Responsive Layout**: Optimized for desktop, tablet, and mobile
- **Dark Mode**: Toggle between light and dark themes
- **Accessibility**: ARIA-compliant components
- **Interactive Components**: Smooth animations and transitions
- **Form Validation**: Real-time validation with helpful error messages
- **Toast Notifications**: User-friendly feedback messages

## 🧪 Testing

```bash
# Backend tests (to be implemented)
cd Backend
npm test

# Frontend tests (to be implemented)
cd Frontend
npm test
```

## 📦 Building for Production

### Backend
```bash
cd Backend
npm start
```

### Frontend
```bash
cd Frontend
npm run build
npm run preview
```

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the ISC License.

## 👥 Authors

- Subham Biswal - [GitHub](https://github.com/subhambiswalrony)

## 🙏 Acknowledgments

- shadcn/ui for the beautiful component library
- Radix UI for accessible component primitives
- The open-source community for various tools and libraries

## 📞 Support

For support, email your-email@example.com or create an issue in the repository.

## 🗺️ Roadmap

- [ ] Implement unit and integration tests
- [ ] Add email notifications for appointments
- [ ] Implement real-time chat between patients and doctors
- [ ] Add prescription management system
- [ ] Implement payment gateway integration
- [ ] Add multi-language support
- [ ] Implement advanced analytics and reporting
- [ ] Mobile application (React Native)
- [ ] Telemedicine video consultation feature
- [ ] Integration with medical devices for vital signs

---

**Note**: This is an active project under development. Features and documentation may be updated regularly.

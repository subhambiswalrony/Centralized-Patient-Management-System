export interface Patient {
  id: string;
  name: string;
  age: number;
  gender: 'Male' | 'Female' | 'Other';
  phone: string;
  email: string;
  address: string;
  bloodGroup: string;
  uniqueId: string;
  avatar?: string;
  reports?: Report[];
  prescriptions?: Prescription[];
  appointments?: Appointment[];
}

export interface Doctor {
  id: string;
  name: string;
  email: string;
  specialty: string;
  phone: string;
  experience: number;
  avatar?: string;
}

export interface Report {
  id: string;
  patientId: string;
  title: string;
  type: string;
  date: string;
  doctor: string;
  findings: string;
  fileUrl?: string;
}

export interface Prescription {
  id: string;
  patientId: string;
  doctorName: string;
  date: string;
  medications: Medication[];
  notes: string;
}

export interface Medication {
  name: string;
  dosage: string;
  frequency: string;
  duration: string;
}

export interface Appointment {
  id: string;
  patientId: string;
  patientName: string;
  doctorName: string;
  date: string;
  time: string;
  type: string;
  status: 'scheduled' | 'completed' | 'cancelled';
}

export const mockPatients: Patient[] = [
  {
    id: 'PT-1001',
    name: 'Rahul Kumar',
    age: 32,
    gender: 'Male',
    phone: '+91 9999999999',
    email: 'rahul@example.com',
    address: '123 MG Road, Delhi',
    bloodGroup: 'A+',
    uniqueId: 'PT-1001',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=rahul',
    reports: [],
    prescriptions: [],
    appointments: []
  },
  {
    id: 'PT-1002',
    name: 'Priya Sharma',
    age: 28,
    gender: 'Female',
    phone: '+91 9888888888',
    email: 'priya@example.com',
    address: '456 Park Street, Mumbai',
    bloodGroup: 'O+',
    uniqueId: 'PT-1002',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=priya',
  },
  {
    id: 'PT-1003',
    name: 'Amit Patel',
    age: 45,
    gender: 'Male',
    phone: '+91 9777777777',
    email: 'amit@example.com',
    address: '789 Brigade Road, Bangalore',
    bloodGroup: 'B+',
    uniqueId: 'PT-1003',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=amit',
  },
];

export const mockDoctors: Doctor[] = [
  {
    id: 'DR-001',
    name: 'Dr. Rekha Sharma',
    email: 'dr.rekha@cpms.test',
    specialty: 'Cardiology',
    phone: '+91 9876543210',
    experience: 15,
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=rekha',
  },
  {
    id: 'DR-002',
    name: 'Dr. Arjun Mehta',
    email: 'dr.arjun@cpms.test',
    specialty: 'Neurology',
    phone: '+91 9876543211',
    experience: 12,
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=arjun',
  },
  {
    id: 'DR-003',
    name: 'Dr. Sneha Reddy',
    email: 'dr.sneha@cpms.test',
    specialty: 'Pediatrics',
    phone: '+91 9876543212',
    experience: 10,
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=sneha',
  },
];

export const mockAppointments: Appointment[] = [
  {
    id: 'APT-001',
    patientId: 'PT-1001',
    patientName: 'Rahul Kumar',
    doctorName: 'Dr. Rekha Sharma',
    date: new Date().toISOString().split('T')[0],
    time: '10:00 AM',
    type: 'Check-up',
    status: 'scheduled',
  },
  {
    id: 'APT-002',
    patientId: 'PT-1002',
    patientName: 'Priya Sharma',
    doctorName: 'Dr. Arjun Mehta',
    date: new Date().toISOString().split('T')[0],
    time: '02:00 PM',
    type: 'Follow-up',
    status: 'scheduled',
  },
];

export const mockReports: Report[] = [
  {
    id: 'REP-001',
    patientId: 'PT-1001',
    title: 'Blood Test Report',
    type: 'Laboratory',
    date: '2024-01-15',
    doctor: 'Dr. Rekha Sharma',
    findings: 'All parameters within normal range',
  },
];

export const mockPrescriptions: Prescription[] = [
  {
    id: 'PRE-001',
    patientId: 'PT-1001',
    doctorName: 'Dr. Rekha Sharma',
    date: '2024-01-15',
    medications: [
      {
        name: 'Aspirin',
        dosage: '75mg',
        frequency: 'Once daily',
        duration: '30 days',
      },
    ],
    notes: 'Take with food',
  },
];

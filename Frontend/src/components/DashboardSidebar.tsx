import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  UserPlus, 
  Calendar, 
  FileText, 
  Settings,
  Activity,
  Hospital,
  Stethoscope,
  QrCode,
  User
} from 'lucide-react';
import { AuthContext } from '@/contexts/AuthContext';
import { motion } from 'framer-motion';
import { useContext } from 'react';

interface DashboardSidebarProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

export const DashboardSidebar: React.FC<DashboardSidebarProps> = ({ isOpen, setIsOpen }) => {
  const { user } = useContext(AuthContext);

  const adminLinks = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/admin' },
    { icon: Users, label: 'Manage Patients', path: '/admin/patients' },
    { icon: Stethoscope, label: 'Manage Doctors', path: '/admin/doctors' },
    { icon: Hospital, label: 'Resources', path: '/admin/resources' },
    { icon: FileText, label: 'Analytics', path: '/admin/analytics' },
  ];

  const doctorLinks = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/doctor' },
    { icon: Users, label: 'Patients', path: '/doctor/patients' },
    { icon: QrCode, label: 'QR Scanner', path: '/doctor/scanner' },
    { icon: Calendar, label: 'Appointments', path: '/doctor/appointments' },
  ];

  const patientLinks = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/patient' },
    { icon: User, label: 'My Profile', path: '/patient/profile' },
    { icon: Stethoscope, label: 'My History', path: '/patient/history' },
    // { icon: FileText, label: 'Reports', path: '/patient/reports' },
    // { icon: Calendar, label: 'Appointments', path: '/patient/appointments' },
  ];

  const getLinks = () => {
    switch (user?.role) {
      case 'admin': return adminLinks;
      case 'doctor': return doctorLinks;
      case 'patient': return patientLinks;
      default: return [];
    }
  };

  const links = getLinks();

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{ x: isOpen ? 0 : '-100%' }}
        className={`fixed top-0 left-0 h-full bg-card border-r border-border z-50 transition-all duration-300
          ${isOpen ? 'w-64' : 'w-20'} md:translate-x-0`}
      >
        {/* Logo */}
        <div className="h-16 flex items-center justify-center border-b border-border">
          <div className="flex items-center space-x-2">
            <div className="p-2 bg-primary rounded-lg shadow-glow">
              <Activity className="h-5 w-5 text-primary-foreground" />
            </div>
            {isOpen && <span className="text-xl font-bold text-gradient">CPMS</span>}
          </div>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-2">
          {links.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              end={link.path === `/admin` || link.path === `/doctor` || link.path === `/patient`}
              className={({ isActive }) =>
                `flex items-center space-x-3 px-4 py-3 rounded-lg transition-all ${
                  isActive
                    ? 'bg-primary text-primary-foreground shadow-glow'
                    : 'hover:bg-accent text-muted-foreground hover:text-foreground'
                }`
              }
            >
              <link.icon className="h-5 w-5 flex-shrink-0" />
              {isOpen && <span className="text-sm font-medium">{link.label}</span>}
            </NavLink>
          ))}

          {/* Settings */}
          <NavLink
            to={`/${user?.role}/settings`}
            className={({ isActive }) =>
              `flex items-center space-x-3 px-4 py-3 rounded-lg transition-all ${
                isActive
                  ? 'bg-primary text-primary-foreground shadow-glow'
                  : 'hover:bg-accent text-muted-foreground hover:text-foreground'
              }`
            }
          >
            <Settings className="h-5 w-5 flex-shrink-0" />
            {isOpen && <span className="text-sm font-medium">Settings</span>}
          </NavLink>
        </nav>
      </motion.aside>
    </>
  );
};

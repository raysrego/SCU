import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Home, 
  FileText, 
  LogOut, 
  Menu, 
  X,
  Activity
} from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import Button from '../ui/Button';

interface PatientLayoutProps {
  children: React.ReactNode;
  title: string;
}

const PatientLayout: React.FC<PatientLayoutProps> = ({ children, title }) => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = React.useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="flex h-screen bg-neutral-50">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-neutral-800 bg-opacity-50 z-20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <motion.aside
        className={`fixed inset-y-0 left-0 z-30 w-64 bg-white border-r border-neutral-200 transform ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 transition-transform duration-300 ease-in-out`}
        initial={false}
      >
        <div className="flex items-center justify-between h-16 px-4 border-b border-neutral-200">
          <div className="flex items-center">
            <Activity className="w-6 h-6 text-primary-600" />
            <span className="ml-2 text-lg font-semibold text-primary-600">USS Patient</span>
          </div>
          <button
            className="p-1 text-neutral-500 hover:text-neutral-700 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          >
            <X size={20} />
          </button>
        </div>
        <nav className="py-4 overflow-y-auto">
          <ul className="space-y-1 px-2">
            <li>
              <a
                href="/patient/dashboard"
                className="flex items-center px-3 py-2 text-sm font-medium text-neutral-600 rounded-md hover:bg-neutral-100 hover:text-neutral-800"
              >
                <Home size={20} />
                <span className="ml-3">Dashboard</span>
              </a>
            </li>
            <li>
              <a
                href="/patient/quotes"
                className="flex items-center px-3 py-2 text-sm font-medium text-neutral-600 rounded-md hover:bg-neutral-100 hover:text-neutral-800"
              >
                <FileText size={20} />
                <span className="ml-3">My Quotes</span>
              </a>
            </li>
          </ul>
        </nav>
        <div className="absolute bottom-0 w-full p-4 border-t border-neutral-200">
          <Button
            variant="outline"
            className="w-full justify-start text-neutral-700"
            onClick={handleLogout}
            icon={<LogOut size={18} />}
          >
            Logout
          </Button>
        </div>
      </motion.aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col lg:ml-64">
        <header className="flex items-center justify-between h-16 px-4 sm:px-6 bg-white border-b border-neutral-200">
          <div className="flex items-center">
            <button
              className="p-1 mr-4 text-neutral-500 hover:text-neutral-700 lg:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu size={24} />
            </button>
            <h1 className="text-xl font-semibold text-neutral-800">{title}</h1>
          </div>
        </header>
        <main className="flex-1 overflow-y-auto p-4 sm:p-6">{children}</main>
      </div>
    </div>
  );
};

export default PatientLayout;
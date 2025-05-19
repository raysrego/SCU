import { Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

// Pages
import LandingPage from './pages/LandingPage';
import Login from './pages/auth/Login';
import MedicalDashboard from './pages/medical/Dashboard';
import PatientDashboard from './pages/patient/Dashboard';
import RegisterMedicalTeam from './pages/registration/RegisterMedicalTeam';
import RegisterMaterials from './pages/registration/RegisterMaterials';
import RegisterProcedures from './pages/registration/RegisterProcedures';
import RegisterSuppliers from './pages/registration/RegisterSuppliers';
import NewQuote from './pages/quotes/NewQuote';
import QuoteResponse from './pages/quotes/QuoteResponse';
import QuoteReport from './pages/quotes/QuoteReport';

// Components
import ProtectedRoute from './components/auth/ProtectedRoute';
import AuthProvider from './context/AuthContext';
import { Toaster } from './components/ui/Toaster';

function App() {
  return (
    <AuthProvider>
      <AnimatePresence mode="wait">
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          
          {/* Medical team routes */}
          <Route element={<ProtectedRoute role="medical" />}>
            <Route path="/medical/dashboard" element={<MedicalDashboard />} />
            <Route path="/medical/team/register" element={<RegisterMedicalTeam />} />
            <Route path="/medical/materials/register" element={<RegisterMaterials />} />
            <Route path="/medical/procedures/register" element={<RegisterProcedures />} />
            <Route path="/medical/suppliers/register" element={<RegisterSuppliers />} />
            <Route path="/medical/quotes/new" element={<NewQuote />} />
            <Route path="/medical/quotes/response/:id" element={<QuoteResponse />} />
            <Route path="/medical/quotes/report/:id" element={<QuoteReport />} />
          </Route>
          
          {/* Patient routes */}
          <Route element={<ProtectedRoute role="patient" />}>
            <Route path="/patient/dashboard" element={<PatientDashboard />} />
            <Route path="/patient/quotes/:id" element={<QuoteReport />} />
          </Route>
        </Routes>
      </AnimatePresence>
      <Toaster />
    </AuthProvider>
  );
}

export default App;
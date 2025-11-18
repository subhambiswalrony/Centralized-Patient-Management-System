import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthContext, AuthProvider } from "@/contexts/AuthContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { DashboardLayout } from "@/components/DashboardLayout";

// Pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AdminDashboard from "./pages/AdminDashboard";
import DoctorDashboard from "./pages/DoctorDashboard";
import PatientDashboard from "./pages/PatientDashboard";
import ManagePatients from "./pages/ManagePatients";
import Settings from "./pages/Settings";
import PatientProfile from "./pages/PatientProfile";
import NotFound from "./pages/NotFound";
import BookingPanel from "./components/bookingPanel";
import { useContext } from "react";
import PatientHistory from "./pages/PatientHistory";

const queryClient = new QueryClient();


const App = () => {
  return (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />

              {/* Admin Routes */}
              <Route
                path="/admin"
                element={
                  <ProtectedRoute allowedRoles={['admin']}>
                    <DashboardLayout />
                  </ProtectedRoute>
                }
              >
                <Route index element={<AdminDashboard />} />
                <Route path="patients" element={<ManagePatients />} />
                <Route path="doctors" element={<ManagePatients />} />
                <Route path="resources" element={<ManagePatients />} />
                <Route path="analytics" element={<AdminDashboard />} />
                <Route path="settings" element={<Settings />} />
              </Route>

              {/* Doctor Routes */}
              <Route
                path="/doctor"
                element={
                  <ProtectedRoute allowedRoles={['doctor']}>
                    <DashboardLayout />
                  </ProtectedRoute>
                }
              >
                <Route index element={<DoctorDashboard />} />
                <Route path="patients" element={<ManagePatients />} />
                <Route path="scanner" element={<DoctorDashboard />} />
                <Route path="appointments" element={<DoctorDashboard />} />
                <Route path="settings" element={<Settings />} />
              </Route>

              {/* Patient Routes */}
              <Route
                path="/patient"
                element={
                  <ProtectedRoute allowedRoles={['patient']}>
                    <DashboardLayout />
                  </ProtectedRoute>
                }
              >
                <Route index element={<PatientDashboard />} />
                <Route path="profile" element={<PatientProfile />} />
                <Route path="reports" element={<PatientDashboard />} />
                <Route path="appointments" element={<PatientDashboard />} />
                <Route path="settings" element={<Settings />} />
                <Route path="booking" element={<BookingPanel />} />
                <Route path="history" element={<PatientHistory />} />
              </Route>

              {/* Catch-all route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </ThemeProvider>
  </QueryClientProvider>
  );
};

export default App;

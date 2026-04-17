import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import CreateTransferPage from './pages/CreateTransferPage';
import TransferRequestsPage from './pages/TransferRequestsPage';
import ReviewRequestsPage from './pages/ReviewRequestsPage';
import AllStudentsPage from './pages/AllStudentsPage';
import TransferredPage from './pages/TransferredPage';
import Layout from './components/Layout';

const PrivateRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  return user ? <>{children}</> : <Navigate to="/login" replace />;
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/"
            element={
              <PrivateRoute>
                <Layout />
              </PrivateRoute>
            }
          >
            <Route index element={<Navigate to="/dashboard" replace />} />
            <Route path="dashboard" element={<DashboardPage />} />
            <Route path="create-transfer" element={<CreateTransferPage />} />
            <Route path="outgoing" element={<TransferRequestsPage />} />
            <Route path="incoming" element={<TransferRequestsPage defaultTab="incoming" />} />
            <Route path="review" element={<ReviewRequestsPage />} />
            <Route path="students" element={<AllStudentsPage />} />
            <Route path="transferred" element={<TransferredPage />} />
          </Route>
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;

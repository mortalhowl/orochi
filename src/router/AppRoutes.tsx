// src/router/AppRoutes.tsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ErrorBoundary from '@/components/common/ErrorBoundary';
import ScrollToTop from '@/components/common/ScrollToTop';
import NotFoundPage from '@/pages/NotFoundPage';
import { AdminLoginPage } from '@/pages/admin/AdminLoginPage';
import { AdminAuthGuard } from './AdminAuthGuard';
import { ROUTES } from '@/constants/routes'; // <--- SỬA LỖI 1: Thêm import này

// Giả sử có 2 trang placeholder
const DashboardPage = () => <div>Admin Dashboard</div>;
const ForgotPasswordPage = () => <div>Forgot Password Page</div>;

const AppRoutes = () => {
  return (
    <ErrorBoundary>
      <Router>
        <ScrollToTop />
        <Routes>
          {/* ... client routes ... */}

          {/* Admin Routes */}
          <Route path={ROUTES.ADMIN.LOGIN} element={<AdminLoginPage />} />
          
          {/* SỬA LỖI 2: Bỏ comment dòng dưới đây */}
          <Route path="/admin/forgot-password" element={<ForgotPasswordPage />} /> 

          <Route element={<AdminAuthGuard />}>
            <Route path={ROUTES.ADMIN.DASHBOARD} element={<DashboardPage />} />
            {/* ... các route admin được bảo vệ khác sẽ ở đây ... */}
          </Route>
          
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Router>
    </ErrorBoundary>
  );
};

export default AppRoutes;
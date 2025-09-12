// src/router/AppRoutes.tsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ErrorBoundary from '@/components/common/ErrorBoundary';
import ScrollToTop from '@/components/common/ScrollToTop';
import NotFoundPage from '@/pages/NotFoundPage';
import { AdminLoginPage } from '@/pages/admin/AdminLoginPage';
import { AdminAuthGuard } from './AdminAuthGuard';
import { ROUTES } from '@/constants/routes'; // <--- SỬA LỖI 1: Thêm import này
import { AdminLayout } from '@/pages/admin/AdminLayout';

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
        <Route element={<AdminLayout />}>  {/* Bọc các trang admin bằng layout */}
          <Route path={ROUTES.ADMIN.DASHBOARD} element={<DashboardPage />} />
          {/* Thêm các route admin khác ở đây, ví dụ: */}
          {/* <Route path={ROUTES.ADMIN.ORDERS} element={<AdminOrdersPage />} /> */}
        </Route>
      </Route>
          
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Router>
    </ErrorBoundary>
  );
};

export default AppRoutes;
// src/router/AdminAuthGuard.tsx
import { useAuth } from '@/hooks/useAuth';
import { Navigate, Outlet } from 'react-router-dom';
import { ROUTES } from '@/constants/routes';
import { LoadingSpinner } from '@/components/ui/loading-spinner'; // Component đã tạo

export const AdminAuthGuard = () => {
    const { isAuthenticated, user, isLoading } = useAuth();

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <LoadingSpinner className="w-12 h-12" />
            </div>
        );
    }

    // User phải được xác thực VÀ phải là staff
    if (isAuthenticated && user?.staff) {
        return <Outlet />; // Cho phép truy cập
    }

    return <Navigate to={ROUTES.ADMIN.LOGIN} replace />; // Chuyển hướng về trang đăng nhập
};
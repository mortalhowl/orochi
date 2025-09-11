// src/pages/admin/AdminLoginPage.tsx
import { AdminLoginForm } from "@/components/pages/admin/login/AdminLoginForm";
import { LoginEventBanner } from "@/components/pages/admin/login/LoginEventBanner";
import { useLatestEvent } from "@/hooks/useLatestEvent";
import { BannerSkeleton } from "@/components/common/BannerSkeleton"; // <-- Thay đổi ở đây

export const AdminLoginPage = () => {
    const { data: event, isLoading } = useLatestEvent();

    return (
        <div className="container relative h-screen flex-col items-center justify-center grid lg:max-w-none lg:grid-cols-2 lg:px-0">
            {isLoading ? (
                <BannerSkeleton /> // <-- Sử dụng skeleton mới
            ) : (
                <LoginEventBanner event={event} /> // <-- Luôn render component này
            )}
            <AdminLoginForm />
        </div>
    );
}
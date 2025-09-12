// src/pages/admin/AdminLayout.tsx
import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { AdminSidebar } from '@/components/layout/AdminSidebar';
import { AdminHeader } from '@/components/layout/AdminHeader';
import { cn } from '@/lib/utils';

export const AdminLayout = () => {
  // Thêm state để quản lý việc đóng/mở sidebar
  const [isSidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    // Thay đổi class grid một cách linh hoạt dựa trên state
    <div
      className={cn(
        "grid min-h-screen w-full transition-[grid-template-columns]",
        isSidebarCollapsed 
          ? "md:grid-cols-[56px_1fr]" // Khi thu gọn
          : "md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]" // Khi mở rộng
      )}
    >
      {/* Truyền state và hàm set state xuống cho component con */}
      <AdminSidebar
        isCollapsed={isSidebarCollapsed}
        setCollapsed={setSidebarCollapsed}
      />
      <div className="flex flex-col">
        <AdminHeader />
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
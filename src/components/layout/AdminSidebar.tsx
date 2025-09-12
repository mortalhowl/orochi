// src/components/layout/AdminSidebar.tsx
import { AdminNavLinks } from './AdminNavLinks';
import { Button } from '@/components/ui/button';
import { Bell, ChevronLeft, ChevronRight } from 'lucide-react';

interface AdminSidebarProps {
  isCollapsed: boolean;
  setCollapsed: (isCollapsed: boolean) => void;
}

export const AdminSidebar = ({ isCollapsed, setCollapsed }: AdminSidebarProps) => {
  return (
    <div className="hidden border-r bg-muted/40 md:block relative">
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
          <a href="/" className="flex items-center gap-2 font-semibold">
            <img src="/logo.png" alt="Orochi Logo" className="h-8 w-8" />
            {!isCollapsed && <span>Orochi Admin</span>}
          </a>
          {/* Nút toggle sẽ không hiển thị trên mobile, chỉ trên desktop/tablet */}
        </div>
        <div className="flex-1">
          <AdminNavLinks isCollapsed={isCollapsed} />
        </div>
      </div>
      {/* Nút toggle được đặt ở vị trí tuyệt đối */}
      <div className="absolute -right-4 top-1/2">
        <Button
          onClick={() => setCollapsed(!isCollapsed)}
          variant="outline"
          size="icon"
          className="rounded-full"
        >
          {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </Button>
      </div>
    </div>
  );
};
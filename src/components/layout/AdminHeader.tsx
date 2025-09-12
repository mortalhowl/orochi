// src/components/layout/AdminHeader.tsx
import { useNavigate } from 'react-router-dom';
import { Menu, UserCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { AdminNavLinks } from './AdminNavLinks';
import { ThemeToggle } from '../common/ThemeToggle'; // <-- Import
import { Notifications } from './Notifications'; // <-- Import
import { useAuthStore } from '@/stores/authStore';
import { signOut } from '@/lib/auth';
import { ROUTES } from '@/constants/routes';
import { useToast } from '@/hooks/use-toast';

export const AdminHeader = () => {
  const navigate = useNavigate();
  const clearSession = useAuthStore((state) => state.clearSession);
  const { toast } = useToast();

  const handleLogout = async () => {
    try {
      await signOut();
      clearSession();
      toast({ title: 'Đã đăng xuất thành công.' });
      navigate(ROUTES.ADMIN.LOGIN);
    } catch (error) {
      toast({ title: 'Đăng xuất thất bại', description: (error as Error).message, variant: 'destructive' });
    }
  };
  return (
    <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="shrink-0 md:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Mở menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="flex flex-col">
          <AdminNavLinks isCollapsed={false} /> {/* Sidebar mobile luôn mở rộng */}
        </SheetContent>
      </Sheet>
      <div className="w-full flex-1">
        {/* Có thể thêm thanh tìm kiếm ở đây */}
      </div>
      
      {/* Thêm các component mới vào đây */}
      <div className="flex items-center gap-4">
        <Notifications />
        <ThemeToggle />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="secondary" size="icon" className="rounded-full">
              <UserCircle className="h-5 w-5" />
              <span className="sr-only">Mở menu người dùng</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Tài khoản</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Cài đặt</DropdownMenuItem>
            <DropdownMenuItem>Hỗ trợ</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout}>
              Đăng xuất
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};
// src/components/layout/AdminNavLinks.tsx
import { NavLink } from 'react-router-dom';
import { ADMIN_NAV_LINKS } from '@/constants/admin-nav.tsx'; // Đảm bảo đuôi file là .tsx
import { cn } from '@/lib/utils';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

interface AdminNavLinksProps {
  isCollapsed: boolean;
}

export const AdminNavLinks = ({ isCollapsed }: AdminNavLinksProps) => {
  return (
    <TooltipProvider>
      <nav className="grid items-start gap-1 px-2 text-sm font-medium lg:px-4">
        {ADMIN_NAV_LINKS.map((link) => (
          <Tooltip key={link.title} delayDuration={0}>
            <TooltipTrigger asChild>
              <NavLink
                to={link.href}
                className={({ isActive }) =>
                  cn(
                    'flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary',
                    isCollapsed && 'justify-center', // Căn giữa icon khi thu gọn
                    isActive && 'bg-muted text-primary'
                  )
                }
              >
                {link.icon}
                <span
                  className={cn(
                    'transition-opacity',
                    isCollapsed ? 'opacity-0 w-0' : 'opacity-100' // Ẩn chữ một cách mượt mà
                  )}
                >
                  {link.title}
                </span>
              </NavLink>
            </TooltipTrigger>
            {isCollapsed && ( // Chỉ hiển thị tooltip khi đã thu gọn
              <TooltipContent side="right">
                {link.title}
              </TooltipContent>
            )}
          </Tooltip>
        ))}
      </nav>
    </TooltipProvider>
  );
};
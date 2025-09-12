// src/constants/admin-nav.tsx

import {
  LayoutDashboard, ShoppingCart, Ticket, Users, Calendar, BarChart2, Settings, Newspaper, GalleryHorizontal
} from 'lucide-react';
import { ROUTES } from './routes';
import { PERMISSIONS } from './permissions';
import type { ReactNode } from 'react';

export interface AdminNavLink {
  title: string;
  href: string;
  icon: ReactNode;
  permission?: string;
}

export const ADMIN_NAV_LINKS: AdminNavLink[] = [
  {
    title: 'Dashboard',
    href: ROUTES.ADMIN.DASHBOARD,
    icon: <LayoutDashboard className="h-5 w-5" />,
  },
  {
    title: 'Sự kiện',
    href: ROUTES.ADMIN.EVENTS,
    icon: <Calendar className="h-5 w-5" />,
    permission: PERMISSIONS.EVENTS_READ,
  },
  {
    title: 'Đơn hàng',
    href: ROUTES.ADMIN.ORDERS,
    icon: <ShoppingCart className="h-5 w-5" />,
    permission: PERMISSIONS.ORDERS_READ,
  },
  {
    title: 'Khách hàng',
    href: ROUTES.ADMIN.CUSTOMERS,
    icon: <Users className="h-5 w-5" />,
  },
  {
    title: 'Quét vé',
    href: ROUTES.ADMIN.SCANNER,
    icon: <Ticket className="h-5 w-5" />,
    permission: PERMISSIONS.TICKETS_CHECKIN,
  },
  {
    title: 'Tin tức',
    href: '#', 
    icon: <Newspaper className="h-5 w-5" />,
  },
  {
    title: 'Gallery',
    href: '#', 
    icon: <GalleryHorizontal className="h-5 w-5" />,
  },
  {
    title: 'Báo cáo',
    href: '#',
    icon: <BarChart2 className="h-5 w-5" />,
  },
  {
    title: 'Cài đặt',
    href: ROUTES.ADMIN.SETTINGS,
    icon: <Settings className="h-5 w-5" />,
  },
];
// src/types/admin.ts

// [cite_start]// Type cho dữ liệu thống kê trên dashboard [cite: 66, 67, 68]
export interface DashboardStats {
  totalRevenue: number;
  ticketsSold: number;
  totalOrders: number;
  checkIns: number;
  salesData: {
    date: string;
    value: number;
  }[];
}

// Type cho một item trong sidebar của trang admin
export interface AdminSidebarItem {
  path: string;
  label: string;
  icon: React.ReactNode;
  permission?: string; // Quyền cần có để thấy item này
  children?: AdminSidebarItem[];
}
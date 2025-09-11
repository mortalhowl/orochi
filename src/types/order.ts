// src/types/order.ts

import type { Database } from './database';
import type { TicketType } from './ticket';
import type { Profile } from './user';

// Type cho một mục trong đơn hàng
export type OrderItem = Database['public']['Tables']['order_items']['Row'];

// Type cho một đơn hàng
export type Order = Database['public']['Tables']['orders']['Row'];

// Type kết hợp chi tiết một đơn hàng để hiển thị
export type OrderWithDetails = Order & {
  order_items: (OrderItem & {
    ticket_types: TicketType | null;
  })[];
  profiles: Pick<Profile, 'name' | 'email' | 'phone'> | null;
};
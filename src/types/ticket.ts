// src/types/ticket.ts

import type { Database } from './database';
import type { Event } from './event';

// Type cho loại vé
export type TicketType = Database['public']['Tables']['ticket_types']['Row'];

// Type cho một vé điện tử đã phát hành
export type Ticket = Database['public']['Tables']['tickets']['Row'];

// Type kết hợp thông tin chi tiết để hiển thị
export type TicketWithDetails = Ticket & {
  ticket_types: TicketType | null;
  events: Pick<Event, 'id' | 'name' | 'start_date' | 'location'> | null;
};
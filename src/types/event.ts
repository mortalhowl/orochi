// src/types/event.ts

import type { Database } from './database';

// Type cho một sự kiện
export type Event = Database['public']['Tables']['events']['Row'];

// Type cho khách mời của sự kiện
export type Guest = Database['public']['Tables']['guests']['Row'];
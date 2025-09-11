// src/constants/status.ts

export const TICKET_STATUS = {
  ACTIVE: 'active',
  USED: 'used',
  EXPIRED: 'expired',
  CANCELLED: 'cancelled',
} as const;

export const ORDER_STATUS = {
  PENDING: 'pending',
  PAID: 'paid',
  CANCELLED: 'cancelled',
  REFUNDED: 'refunded',
} as const;

export const PAYMENT_STATUS = {
  UNPAID: 'unpaid',
  PAID: 'paid',
  FAILED: 'failed',
} as const;
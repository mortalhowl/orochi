// src/constants/routes.ts

export const ROUTES = {
  // Public routes
  HOME: '/',
  EVENTS: '/events',
  EVENT_DETAIL: (slug: string) => `/events/${slug}`,
  CART: '/cart',
  CHECKOUT: '/checkout',
  PAYMENT_SUCCESS: '/checkout/success',
  GALLERY: '/gallery',
  NEWS: '/news',
  NEWS_DETAIL: (slug: string) => `/news/${slug}`,

  // Auth routes
  LOGIN: '/login',
  REGISTER: '/register',
  FORGOT_PASSWORD: '/forgot-password',

  // Protected routes
  PROFILE: '/profile',
  PROFILE_TICKETS: '/profile/tickets',
  PROFILE_ORDERS: '/profile/orders',

  // Admin routes
  ADMIN: {
    DASHBOARD: '/admin',
    LOGIN: '/admin/login',
    FORGOT_PASSWORD: '/admin/forgot-password',
    EVENTS: '/admin/events',
    EVENT_CREATE: '/admin/events/create',
    EVENT_EDIT: (id: string) => `/admin/events/${id}/edit`,
    ORDERS: '/admin/orders',
    ORDER_DETAIL: (id: string) => `/admin/orders/${id}`,
    CUSTOMERS: '/admin/customers',
    STAFF: '/admin/staff',
    SCANNER: '/admin/scanner',
    SETTINGS: '/admin/settings',
  },
} as const;
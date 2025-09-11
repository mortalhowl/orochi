// src/main.tsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

// Tạo một instance của QueryClient
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Cấu hình mặc định cho tất cả các query
      staleTime: 1000 * 60 * 5, // Dữ liệu được coi là "cũ" sau 5 phút
      refetchOnWindowFocus: false, // Không tự động fetch lại khi focus vào cửa sổ
    },
  },
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {/* Bọc toàn bộ App trong Provider */}
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </React.StrictMode>,
)
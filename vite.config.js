import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// ✅ antd config plugin
import { theme } from 'antd'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
        modifyVars: {
          // 🎨 Cordova School Colors
          'primary-color': '#C1272D',   // main red color
          'link-color': '#C1272D',      // link color
          'success-color': '#52c41a',
          'warning-color': '#faad14',
          'error-color': '#f5222d',
          'font-size-base': '15px',
          'heading-color': '#1C2951',   // dark blue for headings
          'text-color': '#1C2951',      // dark blue text
          'border-radius-base': '6px',
          'layout-header-background': '#1C2951', // header background
          'layout-body-background': '#f9f9f9',   // light bg
        },
      },
    },
  },
})

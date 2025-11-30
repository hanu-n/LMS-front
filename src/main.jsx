import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx';
import './index.css';
import { ConfigProvider } from 'antd'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#C1272D', // Cordova red
          colorTextHeading: '#1C2951', // dark blue for headings
          colorText: '#1C2951', // dark blue text
          fontSize: 15,
          borderRadius: 6,
          colorLink: '#C1272D',
        },
        components: {
          Layout: {
            headerBg: '#1C2951', // dark blue header background
            headerColor: '#ffffff', // white text in header
          },
          Button: {
            colorPrimaryHover: '#a32025', // slightly darker red hover
          },
        },
      }}
    >
      <App />
    </ConfigProvider>
  </StrictMode>,
)

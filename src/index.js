import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';

// Global CSS Variables and Styling
const style = document.createElement('style');
style.textContent = `
  :root {
    --color-background-primary: #ffffff;
    --color-background-secondary: #f6f6f6;
    --color-background-tertiary: #efefef;
    
    --color-text-primary: #000000;
    --color-text-secondary: #666666;
    --color-text-tertiary: #999999;
    
    --color-border-tertiary: rgba(0, 0, 0, 0.1);
    --color-border-secondary: rgba(0, 0, 0, 0.2);
    --color-border-primary: rgba(0, 0, 0, 0.3);
    
    --color-info: #0066cc;
    --color-success: #00aa66;
    --color-danger: #cc0000;
    --color-warning: #ff9900;
    
    --font-sans: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
    --font-serif: 'Georgia', 'Times New Roman', serif;
    --font-mono: 'SFMono-Regular', 'Consolas', 'Liberation Mono', 'Menlo', monospace;
    
    --border-radius-md: 8px;
    --border-radius-lg: 12px;
    --border-radius-xl: 16px;
  }

  @media (prefers-color-scheme: dark) {
    :root {
      --color-background-primary: #1a1a1a;
      --color-background-secondary: #2d2d2d;
      --color-background-tertiary: #0f0f0f;
      
      --color-text-primary: #ffffff;
      --color-text-secondary: #a0a0a0;
      --color-text-tertiary: #666666;
      
      --color-border-tertiary: rgba(255, 255, 255, 0.1);
      --color-border-secondary: rgba(255, 255, 255, 0.2);
      --color-border-primary: rgba(255, 255, 255, 0.3);
      
      --color-info: #3399ff;
      --color-success: #33cc99;
      --color-danger: #ff3333;
      --color-warning: #ffcc00;
    }
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html, body {
    font-family: var(--font-sans);
    color: var(--color-text-primary);
    background-color: var(--color-background-tertiary);
    line-height: 1.6;
    -webkit-font-smoothing: antialiased;
  }

  #root {
    min-height: 100vh;
  }

  button {
    font-family: var(--font-sans);
  }

  input, select, textarea {
    font-family: var(--font-sans);
  }

  code {
    font-family: var(--font-mono);
    background-color: var(--color-background-secondary);
    padding: 0.2rem 0.4rem;
    border-radius: 3px;
  }

  /* Scrollbar styling */
  ::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }

  ::-webkit-scrollbar-track {
    background: var(--color-background-secondary);
  }

  ::-webkit-scrollbar-thumb {
    background: var(--color-border-secondary);
    border-radius: 4px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: var(--color-border-primary);
  }
`;

document.head.appendChild(style);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

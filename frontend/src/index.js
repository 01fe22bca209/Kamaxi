import React from 'react';
import ReactDOM from 'react-dom/client';  // Updated import for React 18
import './index.css';  // Global styles for the app
import App from './App';  // Main App component
import { BrowserRouter as Router } from 'react-router-dom'; // For routing

// Create a root container and render the App component
const root = ReactDOM.createRoot(document.getElementById('root'));  // Using createRoot instead of render
root.render(
  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>
);

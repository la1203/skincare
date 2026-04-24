import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; 
import App from './App';
import reportWebVitals from './reportWebVitals';

// ملاحظة: لا داعي لاستيراد Bootstrap الآن لأننا سنعتمد على Tailwind في هذا التصميم الجديد
// import 'bootstrap/dist/css/bootstrap.min.css'; 

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

reportWebVitals();
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import App from './App';
import PropertyPage from './pages/PropertyPage.jsx';
import './index.css';

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <Router>
            <Routes>
                <Route path="/" element={<App />} />
                <Route path="/property/:id" element={<PropertyPage />} />
            </Routes>
        </Router>
    </StrictMode>
);

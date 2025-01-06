import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import App from './App';
import PropertyPage from './pages/PropertyPage.jsx';
import './index.css';

// Create the root element for the React application and render the app
createRoot(document.getElementById('root')).render(
    <StrictMode>
        {/* Use React Router to handle routing within the application */}
        <Router>
            <Routes>
                {/* Define the route for the main application component */}
                <Route path="/" element={<App />} />
                {/* Define the route for the property page component, with a dynamic property ID */}
                <Route path="/property/:id" element={<PropertyPage />} />
            </Routes>
        </Router>
    </StrictMode>
);
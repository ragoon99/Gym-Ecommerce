import ReactDOM from 'react-dom/client';
import React, { StrictMode } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

import App from './app';

// ----------------------------------------------------------------------

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <StrictMode>
        <HelmetProvider>
            <BrowserRouter basename="/">
                <App />
            </BrowserRouter>
        </HelmetProvider>
    </StrictMode>
);

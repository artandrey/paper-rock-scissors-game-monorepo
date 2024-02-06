import React from 'react';
import ReactDOM from 'react-dom/client';
import { WrappedApp } from './app/App.tsx';
import './app/index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <WrappedApp />
    </React.StrictMode>
);

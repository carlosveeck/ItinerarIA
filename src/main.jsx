import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

import "./global.css";

// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     <App />
//   </StrictMode>,
// )


// usando context para suportar o login
import React from "react";
import ReactDOM from "react-dom/client";
// import App from "./App.jsx";
import { AuthProvider } from "./context/AuthContext"; // Importa o AuthProvider
import { TokenProvider } from './context/TokenContext';

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <AuthProvider> {/* Envolve a aplicação com o contexto */}
            <TokenProvider>
                <App />
            </TokenProvider>
        </AuthProvider>
    </React.StrictMode>
);

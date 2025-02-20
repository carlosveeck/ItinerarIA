import { createContext, useContext, useState, useEffect } from "react";

// Criando o contexto de autenticação
const TokenContext = createContext();

// Criando o provedor de autenticação
export const TokenProvider = ({ children }) => {
    const [token, setToken] = useState(null);

    // Carregar usuário do localStorage ao iniciar
    useEffect(() => {
        const storedToken = localStorage.getItem("token");
        if (storedToken) {
            setToken(storedToken);
        }
    }, []);

    // Função para login
    const call = (userData) => {
        setToken(userData);
        localStorage.setItem("token", userData); // Salva no localStorage
    };

    // Função para logout
    const reset = () => {
        setToken(null);
        localStorage.removeItem("token"); // Remove do localStorage
    };

    return (
        <TokenContext.Provider value={{ token, call, reset }}>
            {children}
        </TokenContext.Provider>
    );
};

// Hook personalizado para usar o contexto
export const useToken = () => {
    return useContext(TokenContext);
};

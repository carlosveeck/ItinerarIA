import { createContext, useContext, useState, useEffect } from "react";

// Criando o contexto de autenticação
const AuthContext = createContext();

// Criando o provedor de autenticação
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    // Carregar usuário do localStorage ao iniciar
    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    // Função para login
    const login = (userData) => {
        setUser(userData);
        localStorage.setItem("user", JSON.stringify(userData)); // Salva no localStorage
    };

    // Função para logout
    const logout = () => {
        setUser(null);
        localStorage.removeItem("user"); // Remove do localStorage
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

// Hook personalizado para usar o contexto
export const useAuth = () => {
    return useContext(AuthContext);
};

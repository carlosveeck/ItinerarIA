import { createContext, useContext, useState, useEffect } from "react";

// Criando o contexto de autenticação
const AuthContext = createContext();

// Criando o provedor de autenticação
export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const [isAuthLoaded, setIsAuthLoaded] = useState(false);

    // Carregar usuário do localStorage ao iniciar
    useEffect(() => {
        const storedUser = localStorage.getItem("user");

        if (storedUser) {
            const parsedUser = JSON.parse(storedUser);
            console.log("Usuário carregado:", parsedUser); // Debug
            setUser(parsedUser);
        }
        setIsAuthLoaded(true);
    }, []);

    useEffect(() => {
        console.log("AuthContext atualizado → isAuthLoaded:", isAuthLoaded, "user:", user);
    }, [isAuthLoaded, user]);


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
        <AuthContext.Provider value={{ user, login, logout, isAuthLoaded }}>
            {children}
        </AuthContext.Provider>
    );
};

// Hook personalizado para usar o contexto
export const useAuth = () => {
    return useContext(AuthContext);
};

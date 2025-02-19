import { ArrowLeft, Eye, EyeOff } from "lucide-react";
import "./LoginPage.css"
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

import { useAuth } from "../../../context/AuthContext";

function LoginPage() {

    const { login } = useAuth();
    const navigate = useNavigate();

    const [mostrarSenha, setMostrarSenha] = useState(false);
    const toggleSenha = () => setMostrarSenha(!mostrarSenha);

    // variaveis para guardar o input do usuario e da senha
    const [user, setUser] = useState("");
    const [senha, setSenha] = useState("");

    const handleChangeUser = (e) => setUser(e.target.value);
    const handleChangeSenha = (e) => setSenha(e.target.value);

    const handleLogin = () => {
        if (user && senha)
        {
            const userData = { user };
            login(userData); // Salva no contexto e localStorage

            navigate("/chatbot"); // Redireciona após login
        }
        else
        {
            alert("Preencha todos os campos!");
        }
    };


    return (
        <div className="login-full-page">
            <header className="login-header">
                <Button onClick={() => navigate("/")}>
                    <ArrowLeft strokeWidth={3}/> Home
                </Button>
            </header>

            <div className="login-main-div">
                <h1>Entrar em ItinerarIA</h1>

                <hr />

                <div className="login-main-div-inputs">
                    <input type="text" placeholder="Usuário" onChange={handleChangeUser}/>

                    <div className="login-password-container">
                        <input
                            type={mostrarSenha ? "text" : "password"}
                            onChange={handleChangeSenha}
                            placeholder="Senha"
                        />
                        <button onClick={toggleSenha} className="login-eye-button">
                            {mostrarSenha ? <Eye /> : <EyeOff />}
                        </button>
                    </div>
                </div>

                <div className="login-main-div-buttons">
                    <button className="login-main-div-buttons-normal" onClick={handleLogin}>
                        Entrar
                    </button>

                    <button
                        className="login-main-div-buttons-special-button"
                        onClick={() => navigate("/signup")}    
                    >
                        Criar nova conta
                    </button>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;
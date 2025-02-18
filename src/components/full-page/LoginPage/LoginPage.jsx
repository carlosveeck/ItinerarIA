import { ArrowLeft, Eye, EyeOff } from "lucide-react";
import "./LoginPage.css"
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function LoginPage() {

    const navigate = useNavigate();

    const [mostrarSenha, setMostrarSenha] = useState(false);

    const toggleSenha = () => {
        setMostrarSenha(!mostrarSenha);
    };

    return (
        <div className="full-page">
            <header className="login-header">
                <Button onClick={() => navigate("/")}>
                    <ArrowLeft strokeWidth={3}/>
                </Button>
            </header>

            <div className="main-div">
                <h1>Entrar em ItinerarIA</h1>

                <hr />

                <div className="main-div-inputs">
                    <input type="text" placeholder="Usuário"/>

                    <div className="password-container">
                        <input
                            type={mostrarSenha ? "text" : "password"}
                            placeholder="Senha"
                        />
                        <button onClick={toggleSenha} className="eye-button">
                            {mostrarSenha ? <Eye /> : <EyeOff />}
                        </button>
                    </div>
                </div>

                <div className="main-div-buttons">
                    <button className="main-div-buttons-normal">
                        Entrar
                    </button>

                    <button className="main-div-buttons-special-button">
                        Criar nova conta
                    </button>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;
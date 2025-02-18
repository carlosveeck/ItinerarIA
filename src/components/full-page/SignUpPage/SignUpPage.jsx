import { ArrowLeft, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

import "./SignUpPage.css"

function SignUpPage() {

    const navigate = useNavigate();

    const [mostrarSenha0, setMostrarSenha0] = useState(false);
    const toggleSenha0 = () => {
        setMostrarSenha0(!mostrarSenha0);
    };
    
    const [mostrarSenha1, setMostrarSenha1] = useState(false);
    const toggleSenha1 = () => {
        setMostrarSenha1(!mostrarSenha1);
    };

    const [senha0, setSenha0] = useState("");
    const [senha1, setSenha1] = useState("");

    const handleChangeSenha0 = (e) => {
        setSenha0(e.target.value);
    };

    const handleChangeSenha1 = (e) => {
        setSenha1(e.target.value);
    };

    return (
        <div className="signup-full-page">
            <header className="signup-header">
                <Button onClick={() => navigate("/")}>
                    <ArrowLeft strokeWidth={3}/> Home
                </Button>
            </header>

            <div className="signup-main-div">
                <h1>Cadastrar em ItinerarIA</h1>

                <hr />

                <div className="signup-main-div-inputs">
                    <input type="text" placeholder="Usuário"/>

                    <div className="signup-password-container">
                        <input
                            type={mostrarSenha0 ? "text" : "password"}
                            placeholder="Senha"
                            onChange={handleChangeSenha0}
                        />
                        <button onClick={toggleSenha0} className="signup-eye-button">
                            {mostrarSenha0 ? <Eye /> : <EyeOff />}
                        </button>
                    </div>

                    <div className={senha0 === senha1 ? "signup-password-container" : "signup-password-container-wrong"}>
                        <input
                            type={mostrarSenha1 ? "text" : "password"}
                            placeholder="Confirmar senha"
                            onChange={handleChangeSenha1}
                        />
                        <button onClick={toggleSenha1} className="signup-eye-button">
                            {mostrarSenha1 ? <Eye /> : <EyeOff />}
                        </button>
                    </div>
                </div>

                <div className="signup-main-div-buttons">
                    <button className="signup-main-div-buttons-normal">
                        Cadastrar
                    </button>

                    <button 
                        className="signup-main-div-buttons-special-button"
                        onClick={() => navigate("/login")}
                    >
                        Já cadastrado? Entrar
                    </button>
                </div>
            </div>
        </div>
    );
}

export default SignUpPage;
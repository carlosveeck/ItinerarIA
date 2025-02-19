import { ArrowLeft, Eye, EyeOff } from "lucide-react";
import "./LoginPage.css"
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

import { useAuth } from "../../../context/AuthContext";

async function log_user(msg){
    const response = await fetch(`http://127.0.0.1:8000/login`, {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify(msg),
    })

    const reply = await response.text()
    console.log(response)
    console.log(reply)
    return response.status;
}

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
            let rep = log_user({usuario: user, senha: senha})
            if(rep == 200){
                const userData = { user };
                login(userData);
                navigate("/chatbot");
            } else{
                alert("Usuário não existe!")
            }
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
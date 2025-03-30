import { ArrowLeft, Eye, EyeOff } from "lucide-react";
import "./LoginPage.css"
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

import { useAuth } from "../../../context/AuthContext";
import { useToken } from "../../../context/TokenContext";

const API_URL = "https://itineraria-no5t.onrender.com"

async function log_user(msg){
    const response = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify(msg),
    })

    const reply = await response.text()
    console.log(response)
    console.log(reply)
    return [response.status, reply];
}

function LoginPage() {

    const { call } = useToken();
    const { user, login } = useAuth();
    const navigate = useNavigate();

    const [mostrarSenha, setMostrarSenha] = useState(false);
    const toggleSenha = () => setMostrarSenha(!mostrarSenha);

    // variaveis para guardar o input do usuario e da senha
    const [username, setUsername] = useState("");
    const [senhaInput, setSenhaInput] = useState("");

    const handleChangeusername = (e) => setUsername(e.target.value);
    const handleChangeSenhaInput = (e) => setSenhaInput(e.target.value);

    const handleLogin = () => {
        if (username && senhaInput)
        {
            log_user({usuario: username, senha: senhaInput}).then(function(rep){
                console.log(rep);
                if(rep[0] == 200){
                    const userData = { username };
                    let t = (JSON.parse(rep[1]))["access_token"];
                    console.log(t);
                    call(t);
                    login(userData);
                    navigate("/");
                } else{
                    alert("Usuário não existe!");
                }
            });
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
                    <input type="text" placeholder="Usuário" onChange={handleChangeusername}/>

                    <div className="login-password-container">
                        <input
                            type={mostrarSenha ? "text" : "password"}
                            onChange={handleChangeSenhaInput}
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

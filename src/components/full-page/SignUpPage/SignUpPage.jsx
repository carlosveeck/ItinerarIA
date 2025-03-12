import { ArrowLeft, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import { useToken } from "../../../context/TokenContext";


import "./SignUpPage.css"

async function log_user(msg){
    const response = await fetch(`http://127.0.0.1:8000/login`, {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify(msg),
    })

    const reply = await response.text()
    // console.log(response)
    // console.log(reply)
    return [response.status, reply];
}

async function new_user(msg){
    const response = await fetch(`http://127.0.0.1:8000/register`, {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify(msg),
    })

    const reply = await response.text()
    // console.log(response)
    // console.log(reply)
    return [response.status, reply];
}

function SignUpPage() {

    const { call } = useToken();
    const { login } = useAuth();
    const navigate = useNavigate();

    const [mostrarSenha0, setMostrarSenha0] = useState(false);
    const toggleSenha0 = () => {
        setMostrarSenha0(!mostrarSenha0);
    };
    
    const [mostrarSenha1, setMostrarSenha1] = useState(false);
    const toggleSenha1 = () => {
        setMostrarSenha1(!mostrarSenha1);
    };

    // variaveis para guardar o input do usuario e das senhas
    const [user, setUser] = useState("");
    const [senha0, setSenha0] = useState("");
    const [senha1, setSenha1] = useState("");
    // const [preferencias, setPreferencias] = useState("");
    // const [email, setEmail] = useState("");
    // const [birthDate, setBirthDate] = useState("");
    // const [cellphone, setCellphone] = useState("");
    // const [country, setCountry] = useState("");

    const handleChangeUser = (e) => setUser(e.target.value);
    const handleChangeSenha0 = (e) => setSenha0(e.target.value);
    const handleChangeSenha1 = (e) => setSenha1(e.target.value);
    // const handleChangePreferencias = (e) => setPreferencias(e.target.value);
    // const handleChangeEmail = (e) => setEmail(e.target.value);
    // const handleChangeBirthDate = (e) => setBirthDate(e.target.value);
    // const handleChangeCellphone = (e) => setCellphone(e.target.value);
    // const handleChangeCountry = (e) => setCountry(e.target.value);

    const validarSenha = (senha) => {
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        return regex.test(senha);
    };
    const senhaValida = validarSenha(senha0);
    const senhasIguais = (senha0 === senha1);

    const userSubmit = () => {

        if (senhaValida && senhasIguais && user.trim()) {
            new_user({usuario: user, senha: senha0}).then(function(reply){
                console.log(reply);
                if(reply[0] == 200){
                    const userData = { user };
                    login(userData);
                    log_user({usuario: user, senha: senha0}).then(function(rep){
                        console.log(rep);
                        let t = (JSON.parse(rep[1]))["access_token"];
                        console.log(t);
                        call(t);
                        navigate("/");
                    })
                } else{
                    alert("Usuário já existe!");
                }
            })
        }
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
                    <input className="signup-main-div-inputs-input" type="text" placeholder="Usuário" onChange={handleChangeUser}/>

                    <div className={(senhaValida || senha0 === "") ? "signup-password-container" : "signup-password-container-wrong"}>
                        <input className="signup-main-div-inputs-input"
                            type={mostrarSenha0 ? "text" : "password"}
                            placeholder="Senha"
                            onChange={handleChangeSenha0}
                        />
                        <button onClick={toggleSenha0} className="signup-eye-button">
                            {mostrarSenha0 ? <Eye /> : <EyeOff />}
                        </button>
                    </div>

                    <div className={(senhasIguais || senha1 === "") ? "signup-password-container" : "signup-password-container-wrong"}>
                        <input className="signup-main-div-inputs-input"
                            type={mostrarSenha1 ? "text" : "password"}
                            placeholder="Confirmar senha"
                            onChange={handleChangeSenha1}
                        />
                        <button onClick={toggleSenha1} className="signup-eye-button">
                            {mostrarSenha1 ? <Eye /> : <EyeOff />}
                        </button>
                    </div>
                </div>

                {/* mensagem de erro caso a senha0 não seja válida */}
                {!senhaValida && senha0.length > 0 ? (
                    <p className="error-message">
                        A senha deve ter no mínimo 8 caracteres, incluindo uma letra maiúscula, uma letra minúscula, um número e um caractere especial.
                    </p>
                ) : 
                /* mensagem de erro caso as senhas não coincidam */
                !senhasIguais && senha1.length > 0 ? (
                    <p className="error-message">As senhas não coincidem.</p>
                ) : null}

                <div className="signup-main-div-buttons">
                    <button
                        className={(!senhaValida || !senhasIguais || user.length <= 0) ? "signup-main-div-buttons-disabled" : "signup-main-div-buttons-normal"}
                        onClick={() => userSubmit()}
                    >
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

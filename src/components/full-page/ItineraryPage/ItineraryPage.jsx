import React, { useState, useEffect } from "react";
import { ArrowLeft, ArrowUp, CircleUserIcon, House, Menu, NotepadText, Send, SendHorizonal, SidebarClose, SidebarOpen, UserIcon } from "lucide-react";

import { useAuth } from "@/context/AuthContext";
import { useToken } from "../../../context/TokenContext";
import { Navigate, useNavigate } from "react-router-dom";

import "./ItineraryPage.css"

// for UserIcon
import { LogOut, UserRound, X, User } from "lucide-react";

import "../UserProfilePage/UserProfilePage.css"
import "../LandingPage/LandingPage.css"

async function send_msg(msg, token){
    const response = await fetch(`http://127.0.0.1:8000/prompt`, {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token,
        },
        body: JSON.stringify(msg),
    })

    const reply = await response.text()
    console.log(response)
    console.log(reply)
    return reply;
}

async function get_last(token){
    const response = await fetch(`http://127.0.0.1:8000/reload`, {
        method: 'GET',
        headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token,
        },
    })

    const reply = await response.text();
    console.log(response);
    console.log(reply);
    return reply;
}

// for UserIcon
function LogoutButton()
{
    const { logout } = useAuth();
    const { token, reset } = useToken();
    const navigate = useNavigate();

    const handleLogout = () => {
        //logout();
        //reset();
        navigate("/"); // Redireciona para login após logout
        setTimeout(() => logout(), 0); // Depois, faz logout
        setTimeout(() => reset(), 0);
    };

    return (
        <button className="menu-button" onClick={ handleLogout }>
            <LogOut strokeWidth={1.75} color="#56707A"/> Sair
        </button>);
}

function UserIconUI()
{
    const navigate = useNavigate();
    const { user } = useAuth();

    const [showMenuBox, setShowMenuBox] = useState(false);
    const toggleMenuBox = () => setShowMenuBox(!showMenuBox);
    
    // Ativa/desativa o scroll quando showMenuBox muda
    useEffect(() => {
        if (showMenuBox) {
            document.body.style.overflow = "hidden"; // Desativa o scroll
        } else {
            document.body.style.overflow = "auto"; // Reativa o scroll
        }

        // Cleanup para evitar efeitos colaterais
        return () => {
            document.body.style.overflow = "auto"; 
        };
    }, [showMenuBox]);

    return (
        <div className="landing-page-header-getStarted">

            <button className="landing-page-header-getStarted-menu" onClick={toggleMenuBox}>
                <CircleUserIcon style={{ width: "30px", height: "30px" }} strokeWidth={1.35}/>
            </button>

            { /* showMenuBox ? <LandingPageMenu/> : null */ }
            
            <>
                <div className={`${showMenuBox ? "menu-overlay" : ""}`} onClick={toggleMenuBox}/>

                <div className={`menu ${showMenuBox ? "show" : ""}`}>
                    <div className="menu-header">
                        <h1>
                            <CircleUserIcon strokeWidth={1.35} color="#56707A" size={30}/> { user.username }
                        </h1>

                        <button className="menu-header-button" onClick={toggleMenuBox}>
                            <X strokeWidth={2.25} color="#56707A" size={17}/>
                        </button>
                    </div>

                    <hr />

                    <button className="menu-button" onClick={ () => navigate("/profile") }>
                        <UserRound strokeWidth={1.75} color="#56707A" size={22}/> Seu perfil
                    </button>

                    <button className="menu-button" onClick={ () => navigate("/itinerary") }>
                        <NotepadText strokeWidth={1.75} color="#56707A" size={22}/> Itinerários
                    </button>

                    <hr />

                    <LogoutButton />
                </div>
            </>

        </div>
    );
}

const ItineraryPage = () => {

    const navigate = useNavigate();

    const { user, isAuthLoaded } = useAuth();
    const { token } = useToken();

    const [input, setInput] = useState("");
    const [response, setResponse] = useState("");
    const [AI_responses, setAI_responses] = useState([]);

    const [currItinerary, setCurrItinerary] = useState(1);

    const [showMenu, setShowMenu] = useState(true);

    const [itinerario1, setItinerario1] = useState([]);

    function lasthandle() {

        setCurrItinerary(1);
        setItinerario1([]);

        get_last(token).then(function(rep) {

            let rep2 = JSON.parse(rep);
            console.log("rep2: ", rep2);
            var idop = document.getElementById("op1");
            let texto = JSON.stringify(rep2[0]);
            if (idop != null) { idop.innerHTML = rep; }

            const formattedItinerario = rep2["itinerario"].map((item) => ({
                name: item["Nome"],
                desc: item["descricao"],
                categ: item["categoria"],
                ender: item["endereco"],
                time: item["horario_recomendado_visita"],
            }));

            setItinerario1(formattedItinerario);
            console.log("it1: ", itinerario1);
        })
    };

    useEffect(() => {
        console.log("ItineraryPage → Auth Loaded:", isAuthLoaded, "User:", user);

        if (!isAuthLoaded) return; // Aguarda o carregamento completo antes de tomar ação

        if (!user) {
            console.log("Redirecionando para /login...");
            navigate("/login");
        }
    }, [isAuthLoaded, user, navigate]);

    if (!isAuthLoaded) return <div>Carregando...</div>;

    if (!user) return null;

    /*

    useEffect(() => {
        if (!user) {
            navigate("/login");
        }
    }, [user, navigate]); // Apenas após a renderização inicial

    // Se o usuário não estiver autenticado, evita renderizar o restante do componente
    if (!user) { return null; }

    */

    // daqui pra baixo é para a pagina de itinerario

    const handleSubmit = () => {

        setAI_responses([]);

        if (input.trim()) {

            console.log("User Input:", input);
            setResponse("Gerando itinerário...");
            setInput("");

            send_msg({prompt: input}, token).then(function(reply){

                let rep2 = JSON.parse(reply);

                // console.log(rep2);

                setResponse("Itinerário:");

                const newResponses = rep2["itinerario"].map((item) => ({
                    name: item["Nome"],
                    desc: item["descricao"],
                    time: item["horario_recomendado_visita"],
                }));

                setAI_responses(newResponses);
            })
        }
    };

    const PromptScreen = {

        // prompt screen
        0: <>
            <p className="prompt-welcome-p">
                { response || `Olá, ${ user.username }` }
            </p>

            <div className="prompt-pop-up">
                <h1 className="prompt-pop-up-h1"><strong>Atenção: </strong> as alterações feitas serão salvas no seu itinerário {currItinerary}</h1>
            </div>

            {/* Prompt Input */}
            <div className="prompt-input-div">

                <input
                    type="text"
                    placeholder="Digite seu comando aqui..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleSubmit()}
                />
                <button
                    className={`prompt-input-div-button ${input ? "input" : ""}`}
                    onClick={handleSubmit}
                >
                    <SendHorizonal color="white" size={20} strokeWidth={2.5} />
                    {/* input ? "#2cc86e" : "rgb(156 163 175)" */}
                </button>

            </div>
        </>,
    }
    
    const itineraryMap = {

        // null
        0: <></>,

        // itinerario 1
        1: <>
            { (itinerario1 == []) ? 
                PromptScreen[0]
            : 
                <div className="show-itinerary-div"> { /* grid grid-cols-3 */ }
                    { itinerario1.map((elemento, index) => (

                        <> 
                            <div key={index} className="itinerary-grid-div">
                                <p className="itinerary-grid-div-h1">{elemento.name}</p>

                                <div className="gap-div" />

                                <p className="itinerary-grid-div-p">{elemento.desc}</p>

                                <div className="gap-div"></div>
                                <div className="gap-div"></div>

                                <p className="itinerary-grid-div-p"><strong className="itinerary-grid-div-p-strong1">Categoria:</strong> {elemento.categ}</p>
                                <p className="itinerary-grid-div-p"><strong className="itinerary-grid-div-p-strong2">Endereço:</strong> {elemento.ender}</p>
                                <p className="itinerary-grid-div-p"><strong className="itinerary-grid-div-p-strong3">Horario:</strong> {elemento.time}</p>
                            </div>

                            {index != 2 && <div className="vertical-line" />}
                        </>
                    ))}
                </div>
            }
        </>,

        // itinerario 2
        2: <>
            { PromptScreen[0] }
        </>,

        // itinerario 3
        3: <>
            { PromptScreen[0] }
        </>,
    };

    return (
        <div className="itinerary-full-page">

            {/* Sidebar */}
            <div className={`itinerary-menu`}>
                <div className="itinerary-menu-breadcrumb">
                    <button 
                        className="itinerary-menu-breadcrumb-button1"
                        onClick={() => setShowMenu(!showMenu)}>
                            <SidebarClose strokeWidth={1.5} />
                    </button>

                    <button 
                        className="itinerary-menu-breadcrumb-button2" 
                        onClick={() => navigate("/")}> 
                            <House strokeWidth={1.5} size={16} /> Início 
                    </button>
                </div>

                <div className="itinerary-menu-itineraries">
                    <button
                        className={`itinerary-menu-itineraries-buttons ${currItinerary == 1 ? "current" : ""}`}
                        onClick={() => lasthandle()}> 
                        <NotepadText strokeWidth={1.5} size={20}/> Itinerário 1
                    </button>

                    <button
                        className={`itinerary-menu-itineraries-buttons ${currItinerary == 2 ? "current" : ""}`}
                        onClick={() => setCurrItinerary(2)}> 
                        <NotepadText strokeWidth={1.5} size={20}/> Itinerário 2
                    </button>

                    <button
                        className={`itinerary-menu-itineraries-buttons ${currItinerary == 3 ? "current" : ""}`}
                        onClick={() => setCurrItinerary(3)}> 
                        <NotepadText strokeWidth={1.5} size={20}/> Itinerário 3
                    </button>
                </div>
            </div>

            {/* Main Content */}
            <div className={`itinerary-content-div ${showMenu ? "" : "fullsize"}`}>

                <div className="itinerary-content-upper">
                    <div className="itinerary-name">

                        { (showMenu) ? <></> :
                            <button className="itinerary-name-button"
                                onClick={() => setShowMenu(!showMenu)}>
                                    <SidebarOpen strokeWidth={1.5} />
                            </button> }

                        <h1 className="itinerary-name-h1">ItinerarIA</h1>
                    </div>

                    <UserIconUI />
                    { /* <button className="itinerary-content-upper-button"> <CircleUserIcon size={32}/> </button> */ }
                </div>

                {/* Itinerary / Prompt Input */}
                <div className="itinerary-main-content">
                { /* h-full max-h-full w-full max-w-full overflow-hidden flex flex-col justify-between */ }
                    
                    {/* switch between prompt and itineraries */}
                    { itineraryMap[currItinerary] || <></> }

                </div>

            </div>
        </div>
    );
};

export default ItineraryPage;
import React, { useState, useEffect } from "react";
import { ArrowLeft, ArrowUp, CircleUserIcon, House, Menu, NotepadText, Send, SendHorizonal, SidebarClose, SidebarOpen, UserIcon } from "lucide-react";

import { useAuth } from "@/context/AuthContext";
import { useToken } from "../../../context/TokenContext";
import { Navigate, useNavigate } from "react-router-dom";

import "./ItineraryPage.css"

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

const ItineraryPage = () => {

    const navigate = useNavigate();

    const { user, isAuthLoaded } = useAuth();
    const { token } = useToken();

    const [input, setInput] = useState("");
    const [response, setResponse] = useState("");
    const [AI_responses, setAI_responses] = useState([]);

    const [currItinerary, setCurrItinerary] = useState(0);

    const [showMenu, setShowMenu] = useState(true);

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

                console.log(rep2);

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
    
    const itineraryMap = {

        // prompt screen
        0: <>
            {/* Response Area */}
            { response ? <></> : <div></div> }

            <div className="max-h-full overflow-y-auto w-3/4 max-w-3/4 p-10 self-center flex justify-center">

                <p className="prompt-welcome-p">
                    { response || `Olá, ${ user.username }` }
                </p>

                { /* Draw a line in case we received an input */ }
                { response ? <div className="p-10"> <hr className="border-gray-500"/> </div> : <></> }

                {/* div that contain the Responses */}
                <div className="grid grid-cols-3">

                    {/* Rendering the AI Response */}
                    {AI_responses.map((elemento, index) => (

                        <div key={index} className="m-3 rounded-xl bg-medium-gray p-8 shadow-lg flex flex-col">

                            <p className="text-black text-lg text-center font-bold drop-shadow-2xl">{elemento.name}</p>

                            <div className="p-6"> <hr className="border-gray-300"/> </div>

                            <p className="text-black">{elemento.desc}</p>

                            <div className="p-6"> <hr className="border-gray-300"/> </div>

                            <p className="text-black">{elemento.time}</p>

                        </div>
                    ))}

                </div>                        

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
        // itinerario 1
        1: <div>Opção 1</div>,
        // itinerario 2
        2: <div>Opção 2</div>,
        // itinerario 3
        3: <div>Opção 3</div>,
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
                        onClick={() => setCurrItinerary(1)}> 
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

                    <button className="itinerary-content-upper-button"> <CircleUserIcon size={32}/> </button>
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

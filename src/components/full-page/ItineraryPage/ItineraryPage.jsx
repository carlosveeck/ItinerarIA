import React, { useState, useEffect } from "react";
import { ArrowLeft, ArrowUp, House, Menu, NotepadText } from "lucide-react";

import { useAuth } from "@/context/AuthContext";
import { Navigate, useNavigate } from "react-router-dom";

import "./ItineraryPage.css"

async function send_msg(msg){
    const response = await fetch(`http://127.0.0.1:8000/prompt`, {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
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

    // const { user } = useAuth();

    // useEffect(() => {
    //     if (!user) {
    //         navigate("/login");
    //     }
    // }, [user, navigate]); // Apenas após a renderização inicial

    // // Se o usuário não estiver autenticado, evita renderizar o restante do componente
    // if (!user) { return null; }

    // daqui pra baixo é para a pagina de itinerario
    const [input, setInput] = useState("");
    const [response, setResponse] = useState("");

    const [AI_responses, setAI_responses] = useState([]);

    const handleSubmit = () => {

        setAI_responses([]);

        if (input.trim()) {

            console.log("User Input:", input);
            setResponse("Gerando itinerário...");
            setInput("");

            send_msg({username: "Verne", user_input: input}).then(function(reply){

                let rep2 = JSON.parse(JSON.parse(JSON.parse(reply)));

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
    
    const [currItinerary, setCurrItinerary] = useState(0);
    const itineraryMap = {

        0: <>
            {/* Response Area */}
            <div className="max-h-full overflow-y-auto w-3/4 max-w-3/4 bg-medium-gray p-10 rounded-xl shadow-lg self-center">

                <p className="p-0 text-black text-lg text-center">
                    {response || "Digite o nome de uma cidade para gerarmos um itinerário"}
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
            <div className="h-12 w-1/2 m-10 justify-self-end self-center">

                <div className="h-full flex rounded-xl bg-medium-gray items-center">
                    <input
                        className="pl-4 w-full p-3 bg-transparent text-black focus:outline-none selection:bg-purple selection:text-white"
                        type="text"
                        placeholder="Digite seu comando aqui..."
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyPress={(e) => e.key === "Enter" && handleSubmit()}
                    />
                    <button
                        className="h-full w-16 flex items-center justify-center text-black rounded-r-xl"
                        onClick={handleSubmit}
                    >
                        <ArrowUp color={input ? "#2cc86e" : "rgb(156 163 175)"} size={20} />
                    </button>
                </div>

            </div>
        </>,
        1: <div>Opção 1</div>,
        2: <div>Opção 2</div>,
        3: <div>Opção 3</div>,
    };

    const [showMenu, setShowMenu] = useState(true);

    return (
        <div className="itinerary-full-page">

            {/* Sidebar */}
            <div className={`itinerary-menu`}>
                <div className="itinerary-menu-breadcrumb">
                    <button 
                        className="itinerary-menu-breadcrumb-button1"
                        onClick={() => setShowMenu(!showMenu)}>
                            <Menu strokeWidth={1.5} />
                    </button>

                    <button 
                        className="itinerary-menu-breadcrumb-button2" 
                        onClick={() => navigate("/")}> 
                            <House strokeWidth={1.5} size={16} /> Home 
                    </button>
                </div>

                <div className="itinerary-menu-itineraries">
                    <button
                        className="itinerary-menu-itineraries-buttons"
                        onClick={() => setCurrItinerary(1)}> 
                        <NotepadText strokeWidth={1.5}/> Itinerário 1
                    </button>

                    <button
                        className="itinerary-menu-itineraries-buttons"
                        onClick={() => setCurrItinerary(2)}> 
                        <NotepadText strokeWidth={1.5}/> Itinerário 2
                    </button>

                    <button
                        className="itinerary-menu-itineraries-buttons"
                        onClick={() => setCurrItinerary(3)}> 
                        <NotepadText strokeWidth={1.5}/> Itinerário 3
                    </button>
                </div>
            </div>

            {/* Main Content */}
            <div className={`itinerary-content-div ${showMenu ? "" : "fullsize"}`}>

                <div className="itinerary-name">
                    { (showMenu) ? <></> : <button onClick={() => setShowMenu(!showMenu)}> <Menu strokeWidth={1.5} /> </button> }
                    <h1>ItinerarIA</h1>
                </div>

                {/* Itinerary / Prompt Input */}
                <div className="itinerary-main-content">
                { /* h-full max-h-full w-full max-w-full overflow-hidden flex flex-col justify-between */ }

                    { itineraryMap[currItinerary] || <></> }

                </div>

            </div>
        </div>
    );
};

export default ItineraryPage;

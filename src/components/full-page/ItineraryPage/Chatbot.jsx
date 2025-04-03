import React, { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";
// import ItinerarIABreadcrumb from "../handmade-UI/itinerariaBreadcrumb";
import NoItineraryBreadcrumb from "../../handmade-UI/noItineraryBreadcrumb";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useToken } from "@/context/TokenContext";

const API_URL = "https://itineraria-no5t.onrender.com"

async function send_msg(msg, token){
    const response = await fetch(`${API_URL}/prompt`, {
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

const PromptScreen = () => {

    const navigate = useNavigate();

    const { user, logout } = useAuth();
    const { token } = useToken();
    if (!user) {
        navigate("/login"); // Se não estiver logado, redireciona para login
        return null;
    }

    useEffect(() => {
        if (!user) {
            navigate("/login");
        }
    }, [user, navigate]); // Apenas após a renderização inicial

    // Se o usuário não estiver autenticado, evita renderizar o restante do componente
    if (!user) { return null; }

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

    return (
        <div className="h-screen w-screen flex bg-white">

            {/* Sidebar */}
            <div className="w-1/4 h-full">

                <div className="p-10 h-0 flex justify-center items-center">

                    <NoItineraryBreadcrumb />

                </div>


            </div>

            {/* Main Content */}
            <div className="w-3/4 max-w-full h-full max-h-full flex flex-col items-center">

                <h2 className="m-10 text-black text-xl">ItinerarIA</h2>

                {/* Itinerary / Prompt Input */}
                <div className="h-full max-h-full w-full max-w-full overflow-hidden flex flex-col justify-between">

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
                </div>

            </div>
        </div>
    );
};

export default PromptScreen;

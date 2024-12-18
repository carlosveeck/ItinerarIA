import React, { useState } from "react";
import { ArrowUp } from "lucide-react";
// import ItinerarIABreadcrumb from "../handmade-UI/itinerariaBreadcrumb";
import NoItineraryBreadcrumb from "../handmade-UI/noItineraryBreadcrumb";

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

const PromptScreen = () => {
    const [input, setInput] = useState("");
    const [response, setResponse] = useState("");
    var x = ["ans1", "ans2", "ans3", "ans4", "ans5"]
    var y = ["desc1", "desc2", "desc3", "desc4", "desc5"]
    var z = ["hora1", "hora2", "hora3", "hora4", "hora5"]
    var bound = 5;
    const handleSubmit = () => {
        if (input.trim()) {
            console.log("User Input:", input);
            setResponse("Aqui será exibido o resultado do itinerário gerado pelo backend.");
            setInput("");
            send_msg({username: "Verne", user_input: input}).then(function(reply){
                let rep2 = JSON.parse(JSON.parse(JSON.parse(reply)))
                console.log(rep2)
                setResponse("Itinerário:")
                if(rep2["itinerario"].length < bound){
                    bound = rep2["itinerario"].length
                }
                for(var i = 0; i < bound; i++){
                    var nome = document.getElementById(x[i]);
                    var desc = document.getElementById(y[i]);
                    var horario = document.getElementById(z[i]);
                    nome.innerHTML = rep2["itinerario"][i]["Nome"]
                    desc.innerHTML = rep2["itinerario"][i]["descricao"]
                    horario.innerHTML = rep2["itinerario"][i]["horario_recomendado_visita"]
                }
            })
        }
    };

    return (
        <div className="h-screen w-screen flex bg-zinc-800">

            {/* Sidebar */}
            <div className="w-1/4 p-10 h-0 flex justify-center items-center">

                    <NoItineraryBreadcrumb />

            </div>

            {/* Main Content */}
            <div className="w-3/4 max-w-full h-full max-h-full flex flex-col items-center">

                <h2 className="m-10 text-white text-xl">ItinerarIA</h2>

                {/* Itinerary / Prompt Input */}
                <div className="h-full max-h-full w-full max-w-full overflow-hidden flex flex-col justify-between">

                    {/* Response Area */}
                    <div className="max-h-full overflow-y-auto w-3/4 max-w-3/4 bg-neutral-700 p-6 rounded-xl shadow-lg self-center">
                        <p className="text-white text-lg text-center">
                            {response || "Aguardando o resultado do itinerário..."}
                        </p>
                        <p id="ans1" className="text-white text-lg text-center font-bold"> </p>
                        <p id="desc1" className="text-white"></p>
                        <p id="hora1" className="text-white pt-3"></p>
                        <p id="ans2" className="text-white text-lg text-center font-bold"> </p>
                        <p id="desc2" className="text-white"></p>
                        <p id="hora2" className="text-white pt-3"></p>
                        <p id="ans3" className="text-white text-lg text-center font-bold"> </p>
                        <p id="desc3" className="text-white"></p>
                        <p id="hora3" className="text-white pt-3"></p>
                        <p id="ans4" className="text-white text-lg text-center font-bold"> </p>
                        <p id="desc4" className="text-white"></p>
                        <p id="hora4" className="text-white pt-3"></p>
                        <p id="ans5" className="text-white text-lg text-center font-bold"> </p>
                        <p id="desc5" className="text-white"></p>
                        <p id="hora5" className="text-white pt-3"></p>
                    </div>

                    {/* Prompt Input */}
                    <div className="h-12 w-1/2 m-10 justify-self-end self-center">

                        <div className="h-full flex rounded-xl bg-neutral-600 items-center">
                            <input
                                className="pl-4 w-full p-3 bg-transparent text-white focus:outline-none selection:bg-green-input-mark"
                                type="text"
                                placeholder="Digite seu comando aqui..."
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyPress={(e) => e.key === "Enter" && handleSubmit()}
                            />
                            <button
                                className="h-full w-16 flex items-center justify-center text-white rounded-r-xl"
                                onClick={handleSubmit}
                            >
                                <ArrowUp color={input ? "rgb(255 255 255)" : "rgb(156 163 175)"} size={20} />
                            </button>
                        </div>

                    </div>
                </div>

            </div>
        </div>
    );
};

export default PromptScreen;

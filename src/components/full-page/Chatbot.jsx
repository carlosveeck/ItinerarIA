import React, { useState } from "react";
import ItinerarIABreadcrumb from "../handmade-UI/itinerariaBreadcrumb";

const PromptScreen = () => {
    const [input, setInput] = useState("");
    const [response, setResponse] = useState("");

    const handleSubmit = () => {
        if (input.trim()) {
            console.log("User Input:", input);
            setResponse("Aqui será exibido o resultado do itinerário gerado pelo backend.");
            setInput("");
        }
    };

    return (
        <div className="h-screen w-screen flex bg-zinc-800">
            {/* Sidebar */}
            <div className="w-1/4 h-full">
                <div className="p-10">
                    <ItinerarIABreadcrumb />
                </div>
            </div>

            {/* Main Content */}
            <div className="w-3/4 h-full flex flex-col items-center pt-10">
                <h2 className="mb-6 text-white text-xl">ItinerarIA</h2>

                {/* Prompt Input */}
                <div className="w-1/2 mb-10">
                    <div className="flex border rounded-xl bg-neutral-600 items-center">
                        <input
                            className="w-full p-3 bg-transparent text-white focus:outline-none"
                            type="text"
                            placeholder="Digite seu comando aqui..."
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyPress={(e) => e.key === "Enter" && handleSubmit()}
                        />
                        <button
                            className="h-12 w-12 flex items-center justify-center text-white bg-indigo-700 rounded-r-xl"
                            onClick={handleSubmit}
                        >
                            &gt;
                        </button>
                    </div>
                </div>

                {/* Response Area */}
                <div className="w-3/4 bg-neutral-700 p-6 rounded-xl shadow-lg">
                    <p className="text-white text-lg text-center">
                        {response || "Aguardando o resultado do itinerário..."}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default PromptScreen;

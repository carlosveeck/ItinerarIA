import React, { useState } from "react";
import ItinerarIABreadcrumb from "../handmade-UI/itinerariaBreadcrumb";

const PromptScreen = () => {
    const [input, setInput] = useState("");

    const handleSubmit = () => {
        if (input.trim()) {
            console.log("User Input:", input);
            setInput("");
        }
    };

    return (
        <div className="h-screen w-screen flex justify-between bg-zinc-800">
            {/* Sidebar */}
            <div className="w-1/4 h-full">
                <div className="p-10 h-0 flex justify-center items-center">
                    <ItinerarIABreadcrumb />
                </div>
                <div className="p-5 pt-0">
                    <hr className="border-gray-500" />
                </div>
            </div>

            {/* Main Content */}
            <div className="w-3/4 h-full flex flex-col justify-center items-center">
                <h2 className="mb-10 text-white text-xl">ItinerarIA</h2>

                {/* Prompt Input */}
                <div className="w-1/2">
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
            </div>
        </div>
    );
};

export default PromptScreen;
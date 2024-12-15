import React, { useState, useRef } from "react";
import ItinerarIABreadcrumb from "../handmade-UI/itinerariaBreadcrumb";


const Chatbot = () => {
    
    const [input, setInput] = useState("");
    const [messages, setMessages] = useState([{
        sender: "bot",
        text: "Olá, sou sua assistente para criação de um itinerário, como posso ajudá-lo?"
    }]);

    const sendMessage = async () => {

        if (!input.trim()) { return; }

        const userMessage = { sender: "user", text: input };
        setMessages([...messages, userMessage]);

        try
        {
            const response = await axios.post("http://127.0.0.1:8000/chat", { message: input });
            const botMessage = { sender: "bot", text: response.data.reply };
            setMessages((prevMessages) => [...prevMessages, botMessage]);
        }
        catch (error)
        {
            console.error("Error communicating with server:", error);
            const botError = { sender: "bot", text: "Oops! Something went wrong." };
            setMessages((prevMessages) => [...prevMessages, botError]);
        }

        setInput("");
    };

    // for scroll down
    const divRef = useRef(null);

    const handleScrollDown = () => {

        if (divRef.current) {
            divRef.current.scrollBy({
                top: divRef.current.scrollHeight,
                behavior: "smooth",
            });
        }
    };

    // returning html/css
    return (

        <div className="h-screen w-screen flex justify-between mr-10 bg-zinc-800">

            <div className="w-1/4 h-full">

                <div className="p-10 h-0 flex justify-center items-center">

                    <ItinerarIABreadcrumb />

                </div>

                <div className="p-5 pt-0"> <hr className="border-gray-500"/> </div>

            </div>

            <div className="w-3/4 h-full justify-center">

                <h2 className="m-10 flex justify-center text-white">
                    ItinerarIA
                </h2>
                
                <div 
                    ref={divRef}
                    className="p-3 overflow-y-auto h-3/4 max-h-3/4 flex justify-center flex-wrap-reverse"
                >

                    <div className="w-3/5 justify-center">
                        {messages.map((msg, index) => (
                            <div
                                key={index}
                                className={`m-2 ${msg.sender === "user" ? "text-right" : "text-left"}`}
                            >
                                <span

                                    className={`
                                        ${msg.sender === "user" ? "bg-gray-600 mb-10" : "bg-transparent"}
                                        text-white max-w-2xl pb-3 pt-2 pr-4 pl-4 rounded-xl inline-block text-ellipsis break-words text-left
                                    `}
                                >
                                    {msg.text}
                                </span>
                                
                                    {msg.sender === "user" ? <></> : <div className="p-10"> <hr className="border-gray-500"/> </div> }

                            </div>
                        ))}
                    </div>
                </div>

                <div className="flex justify-center h-11 w-full">

                    <div className={`
                            h-12 w-1/3 flex border-x-indigo-700 rounded-xl bg-neutral-600 relative items-center self-center
                        `}>

                        <input className={`
                                w-5/6 ml-2 bg-transparent p-3 text-white
                                focus: outline-none
                            `}

                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyPress={(e) => e.key === "Enter" && sendMessage()}
                        />

                        <button className="absolute right-2 h-11 w-11 rounded-full text-xs bg-transparent text-white" onClick={sendMessage}>
                            &gt;
                        </button>

                    </div>

                    <button
                        onClick={handleScrollDown}
                        className="absolute place-self-center font-thin bg-neutral-600 text-white h-9 w-9 rounded-full right-48 justify-center"
                    >
                            v
                    </button>

                </div>
            </div>

        </div>
    );
};

export default Chatbot;

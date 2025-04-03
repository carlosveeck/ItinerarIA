import React, { useState, useEffect } from "react";
import { ArrowLeft, ArrowUp, CircleUserIcon, House, Menu, NotepadText, Send, SendHorizonal, SidebarClose, SidebarOpen, SquarePenIcon, Trash2, UserIcon } from "lucide-react";

import { useAuth } from "@/context/AuthContext";
import { useToken } from "../../../context/TokenContext";
import { Navigate, useNavigate } from "react-router-dom";

import "./ItineraryPage.css"

// for UserIcon
import { LogOut, UserRound, X, User } from "lucide-react";

import "../UserProfilePage/UserProfilePage.css"
import "../LandingPage/LandingPage.css"

const API_URL = "https://itineraria-no5t.onrender.com"

async function send_msg(msg, token) {

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

async function save(msg, token) {
    const response = await fetch(`${API_URL}/save_itinerary`, {
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

async function del(msg, token) {
    const response = await fetch(`${API_URL}/delete`, {
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

async function get_last(index, token) {
    console.log(index);
    const response = await fetch(`${API_URL}/last_itinerary`, {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token,
        },
        body: JSON.stringify(index),
    })

    const reply = await response.text();
    console.log("reponse: ", response);
    console.log("reply: ", reply);

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

    const [currEditing, setCurrEditing] = useState(0); // 0 para nenhum

    // array que guarda o JSON do itinerario
    const [itinerario1, setItinerario1] = useState([]);
    const [itinerario2, setItinerario2] = useState([]);
    const [itinerario3, setItinerario3] = useState([]);

    // para otimizar
    const itinerariosLista = { 1: itinerario1, 2: itinerario2, 3: itinerario3 };

    // para edição dos itinerários
    const [inputName, setInputName] = useState("");
    const [inputDesc, setInputDesc] = useState("");
    const [inputCateg, setInputCateg] = useState("");
    const [inputAddress, setInputAddress] = useState("");
    const [inputHora, setInputHora] = useState("");

    // delete pop-up
    const [showDeletePopUp, setShowDeletePopUp] = useState(false);

    function handleChangeInputName(e) { setInputName(e.target.value); }
    function handleChangeInputDesc(e) { setInputDesc(e.target.value); }
    function handleChangeInputCateg(e) { setInputCateg(e.target.value); }
    function handleChangeInputAddress(e) { setInputAddress(e.target.value); }
    function handleChangeInputHora(e) { setInputHora(e.target.value); }

    // para edição dos itinerários
    function setItineraryInput(currEdit) {
        if (!isAuthLoaded) return; // Aguarda o carregamento completo antes de tomar ação
        if (!user) {
            console.log("Redirecionando para /login...");
            navigate("/login");
        }

        console.log(currEdit);

        if (currEdit > 0 && currEdit < 4)
        {
            const index = currEdit - 1;

            setInputName(itinerariosLista[currItinerary][index].Nome);
            setInputDesc(itinerariosLista[currItinerary][index].descricao);
            setInputCateg(itinerariosLista[currItinerary][index].categoria);
            setInputAddress(itinerariosLista[currItinerary][index].endereco);
            setInputHora(itinerariosLista[currItinerary][index].horario_recomendado_visita);
        }
    }

    // função que atualiza o itinerario1
    function lasthandle(index) {

        setCurrItinerary(1);
        setItinerario1([]);

        get_last({"num": index}, token).then(function(rep) {

            let rep2 = JSON.parse(rep);

            if (!rep2 || rep2.length === 0) {
                console.log("Nenhum itinerário encontrado.");
                console.log("it1: ", itinerario1, " / length: ", itinerario1.length);
                
                return;
            }

            console.log("rep2: ", rep2);

            const formattedItinerario = rep2["itinerario"].map((item) => ({
                Nome: item["Nome"],
                descricao: item["descricao"],
                categoria: item["categoria"],
                endereco: item["endereco"],
                horario_recomendado_visita: item["horario_recomendado_visita"],
            }));

            setItinerario1(formattedItinerario);
            
            console.log("formatted it: ", formattedItinerario);
            console.log("it1: ", itinerario1);
        })
    };

    function lasthandle2(index) {

        setCurrItinerary(2);
        setItinerario2([]);

        get_last({"num": index}, token).then(function(rep) {

            let rep2 = JSON.parse(rep);

            if (!rep2 || rep2.length === 0) {
                console.log("Nenhum itinerário encontrado.");
                console.log("it2: ", itinerario2, " / length: ", itinerario2.length);
                
                return;
            }

            console.log("rep2: ", rep2);

            const formattedItinerario = rep2["itinerario"].map((item) => ({
                Nome: item["Nome"],
                descricao: item["descricao"],
                categoria: item["categoria"],
                endereco: item["endereco"],
                horario_recomendado_visita: item["horario_recomendado_visita"],
            }));
            
            setItinerario2(formattedItinerario);
            
            console.log("formatted it: ", formattedItinerario);
            console.log("it2: ", itinerario1);
        })
    };

    function lasthandle3(index) {

        setCurrItinerary(3);
        setItinerario3([]);

        get_last({"num": index}, token).then(function(rep) {

            let rep2 = JSON.parse(rep);

            if (!rep2 || rep2.length === 0) {
                console.log("Nenhum itinerário encontrado.");
                console.log("it3: ", itinerario3, " / length: ", itinerario3.length);
                
                return;
            }

            console.log("rep2: ", rep2);

            const formattedItinerario = rep2["itinerario"].map((item) => ({
                Nome: item["Nome"],
                descricao: item["descricao"],
                categoria: item["categoria"],
                endereco: item["endereco"],
                horario_recomendado_visita: item["horario_recomendado_visita"],
            }));
            
            setItinerario3(formattedItinerario);
            
            console.log("formatted it: ", formattedItinerario);
            console.log("it3: ", itinerario3);
        })
    };

    function savechanges(index) {

        itinerariosLista[currItinerary][index].Nome = inputName;
        itinerariosLista[currItinerary][index].horario_recomendado_visita = inputHora;
        itinerariosLista[currItinerary][index].descricao = inputDesc;
        itinerariosLista[currItinerary][index].categoria = inputCateg;
        itinerariosLista[currItinerary][index].endereco = inputAddress;

        save({"itinerario": {"itinerario": itinerariosLista[currItinerary]}, "index": currItinerary - 1}, token).then(function(rep) {

            if (currItinerary == 1) { lasthandle(currItinerary - 1); }
            else if (currItinerary == 2) { lasthandle2(currItinerary - 1); }
            else if (currItinerary == 3) { lasthandle3(currItinerary - 1); }
            setCurrEditing(0);
        });
    };

    function exclusao(){
        del({num: (currItinerary-1)}, token).then(function(rep){
            if(currItinerary == 1){
                setItinerario1([]);
                lasthandle(0);
            } else if(currItinerary == 2){
                setItinerario2([]);
                lasthandle2(1);
            } else{
                setItinerario3([]);
                lasthandle3(2);
            }
        })
    }

    useEffect(() => {
        console.log("ItineraryPage → Auth Loaded:", isAuthLoaded, "User:", user);

        if (!isAuthLoaded) return; // Aguarda o carregamento completo antes de tomar ação

        if (!user) {
            console.log("Redirecionando para /login...");
            navigate("/login");
        }

        // para renderizar o itinerario
        // console.log (itinerario1.length)
        lasthandle(0);
        
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
            // setResponse("Gerando itinerário...");
            setInput("");

            send_msg({prompt: input, index: (currItinerary - 1)}, token).then(function(reply) {

                let rep2 = JSON.parse(reply);

                console.log(rep2);

                setResponse("Itinerário:");

                const newResponses = rep2["itinerario"].map((item) => ({
                    Nome: item["Nome"],
                    descricao: item["descricao"],
                    horario_recomendado_visita: item["horario_recomendado_visita"],
                }));

                // setAI_responses(newResponses);
                if(currItinerary - 1 == 0){
                    lasthandle(currItinerary - 1);
                } else if(currItinerary - 1 == 1){
                    lasthandle2(currItinerary - 1);
                } else{
                    lasthandle3(currItinerary - 1);
                }
            })
        }
    };

    const PromptScreen = {

        // prompt screen
        0: <>
            <p className="prompt-welcome-p">
                Olá, { user.username }
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
                    onKeyPress={ (e) => e.key === "Enter" && handleSubmit() }
                />
                <button
                    className={`prompt-input-div-button ${input ? "input" : ""}`}
                    onClick={ handleSubmit }
                >
                    <SendHorizonal color="white" size={20} strokeWidth={2.5} />
                    {/* input ? "#2cc86e" : "rgb(156 163 175)" */}
                </button>

            </div>
        </>,
    }

    const deletePopUp = {
        
        0: <div className={`popup-overlay ${showMenu ? "" : "full"}`}>
            <div className="delete-popup">
                <div className="popup-h1-div">
                    <h1 className="popup-h1"><strong>Atenção: </strong></h1>
                    <h1 className="popup-h1">Você está prestes a deletar o seu itinerario {currItinerary}</h1>
                </div>

                <div className="popup-buttons-div">
                    <button className="popup-button1" onClick={() => {exclusao(), setShowDeletePopUp(false)}}>Deletar</button>
                    <button className="popup-button2" onClick={() => setShowDeletePopUp(false)}>Cancelar</button>
                </div>
            </div>
        </div>
    }

    const itineraryScreen = {

        0: <div className="show-itinerary-div"> { /* grid grid-cols-3 */ }
            { itinerariosLista[currItinerary].map((elemento, index) => (

                <React.Fragment key={index}> 
                    <div key={index} className="itinerary-grid-div">
                        { currEditing == (index + 1) ? 

                            <>
                                <div className="edit-div">
                                    <label className="itinerary-edit-div-label1">Nome</label>
                                    <input className="itinerary-input" value={inputName} onChange={handleChangeInputName} placeholder="Nome" />

                                    <label className="itinerary-edit-div-label2">Descrição</label>
                                    <textarea className="desc-input" value={inputDesc} onChange={handleChangeInputDesc} placeholder="Descrição" />

                                    <label className="itinerary-edit-div-label3">Categoria</label>
                                    <input className="itinerary-input" value={inputCateg} onChange={handleChangeInputCateg} placeholder="Categoria" />

                                    <label className="itinerary-edit-div-label4">Endereço</label>
                                    <input className="itinerary-input" value={inputAddress} onChange={handleChangeInputAddress} placeholder="Endereço" />

                                    <label className="itinerary-edit-div-label5">Horario</label>
                                    <input className="itinerary-input" value={inputHora} onChange={handleChangeInputHora} placeholder="Horario" />

                                    <div className="itinerary-edit-div-buttons">
                                        <button className="itinerary-edit-div-buttons-button1" onClick={() => savechanges(index)}>Salvar</button>
                                        <button className="itinerary-edit-div-buttons-button2" onClick={() => setCurrEditing(0)}>Cancelar</button>
                                    </div>
                                </div>
                            </>

                            :
                            
                            <>
                                <div className="itinerary-name-div">
                                    <p className="itinerary-grid-div-h1">{elemento.Nome}</p>

                                    <button className="edit-button" onClick={() => { setCurrEditing(index + 1); setItineraryInput(index + 1)}}>
                                        <SquarePenIcon color="#8fa9af"/>
                                    </button>
                                </div>

                                <div className="gap-div" />

                                <p className="itinerary-grid-div-p">{elemento.descricao}</p>

                                <div className="gap-div"></div>
                                <div className="gap-div"></div>

                                <p className="itinerary-grid-div-p"><strong className="itinerary-grid-div-p-strong1">Categoria:</strong> {elemento.categoria}</p>
                                <p className="itinerary-grid-div-p"><strong className="itinerary-grid-div-p-strong2">Endereço:</strong> {elemento.endereco}</p>
                                <p className="itinerary-grid-div-p"><strong className="itinerary-grid-div-p-strong3">Horario:</strong> {elemento.horario_recomendado_visita}</p>
                            </>
                        }
                    </div>

                    { index != 2 && <div className="vertical-line" /> }
                </React.Fragment>
            ))}

            <button className="delete-button" onClick={() => setShowDeletePopUp(true)}>
                <Trash2 color="#ea5681" />
            </button>

            { showDeletePopUp ? deletePopUp[0] : <></> }
                    
        </div>,
    }
    
    const itineraryMap = {

        // null
        0: <></>,

        // itinerario 1
        1: <>
            { (itinerario1.length == 0) ? 
                PromptScreen[0]
            : 
                itineraryScreen[0]
            }
        </>,

        // itinerario 2
        2: <>
            { (itinerario2.length == 0) ? 
                PromptScreen[0]
            : 
                itineraryScreen[0]
            }
        </>,

        // itinerario 3
        3: <>
            { (itinerario3.length == 0) ? 
                PromptScreen[0]
            : 
                itineraryScreen[0]
            }
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
                        onClick={() => {setCurrItinerary(1), lasthandle(0)}}> 
                        <NotepadText strokeWidth={1.5} size={20}/> Itinerário 1
                    </button>

                    <button
                        className={`itinerary-menu-itineraries-buttons ${currItinerary == 2 ? "current" : ""}`}
                        onClick={() => {setCurrItinerary(2), lasthandle2(1)}}> 
                        <NotepadText strokeWidth={1.5} size={20}/> Itinerário 2
                    </button>

                    <button
                        className={`itinerary-menu-itineraries-buttons ${currItinerary == 3 ? "current" : ""}`}
                        onClick={() => {setCurrItinerary(3), lasthandle3(2)}}> 
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

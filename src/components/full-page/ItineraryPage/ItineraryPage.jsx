import React, { useState, useEffect } from "react";
import { ArrowLeft, ArrowUp, CircleUserIcon, House, Menu, NotepadText, Send, SendHorizonal, SidebarClose, SidebarOpen, SquarePenIcon, UserIcon } from "lucide-react";

import { useAuth } from "@/context/AuthContext";
import { useToken } from "../../../context/TokenContext";
import { Navigate, useNavigate } from "react-router-dom";

import "./ItineraryPage.css"

// for UserIcon
import { LogOut, UserRound, X, User } from "lucide-react";

import "../UserProfilePage/UserProfilePage.css"
import "../LandingPage/LandingPage.css"

async function send_msg(msg, token) {

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

async function save(msg, token) {
    console.log("ABC", msg);
    const response = await fetch(`http://127.0.0.1:8000/save_itinerary`, {
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
    const response = await fetch(`http://127.0.0.1:8000/last_itinerary`, {
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

    // para edição dos itinerários
    const [inputName, setInputName] = useState("");
    const [inputDesc, setInputDesc] = useState("");
    const [inputCateg, setInputCateg] = useState("");
    const [inputAddress, setInputAddress] = useState("");
    const [inputHora, setInputHora] = useState("");

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

        if (currItinerary == 1)
        {
            if (currEdit == 1)
            {
                setInputName(itinerario1[0].Nome);
                setInputDesc(itinerario1[0].descricao);
                setInputCateg(itinerario1[0].categoria);
                setInputAddress(itinerario1[0].endereco);
                setInputHora(itinerario1[0].horario_recomendado_visita);

                // console.log(itinerario1[0].name);
            }
            else if (currEdit == 2)
            {
                setInputName(itinerario1[1].Nome);
                setInputDesc(itinerario1[1].descricao);
                setInputCateg(itinerario1[1].categoria);
                setInputAddress(itinerario1[1].endereco);
                setInputHora(itinerario1[1].horario_recomendado_visita);

                // console.log(itinerario1[1].name);
            }
            else if (currEdit == 3)
            {
                setInputName(itinerario1[2].Nome);
                setInputDesc(itinerario1[2].descricao);
                setInputCateg(itinerario1[2].categoria);
                setInputAddress(itinerario1[2].endereco);
                setInputHora(itinerario1[2].horario_recomendado_visita);

                // console.log(itinerario1[2].name);
            }
        }
        else if (currItinerary == 2)
        {
            if (currEdit == 1)
                {
                    setInputName(itinerario2[0].Nome);
                    setInputDesc(itinerario2[0].descricao);
                    setInputCateg(itinerario2[0].categoria);
                    setInputAddress(itinerario2[0].endereco);
                    setInputHora(itinerario2[0].horario_recomendado_visita);
    
                    // console.log(itinerario1[0].name);
                }
                else if (currEdit == 2)
                {
                    setInputName(itinerario2[1].Nome);
                    setInputDesc(itinerario2[1].descricao);
                    setInputCateg(itinerario2[1].categoria);
                    setInputAddress(itinerario2[1].endereco);
                    setInputHora(itinerario2[1].horario_recomendado_visita);
    
                    // console.log(itinerario1[1].name);
                }
                else if (currEdit == 3)
                {
                    setInputName(itinerario2[2].Nome);
                    setInputDesc(itinerario2[2].descricao);
                    setInputCateg(itinerario2[2].categoria);
                    setInputAddress(itinerario2[2].endereco);
                    setInputHora(itinerario2[2].horario_recomendado_visita);
    
                    // console.log(itinerario1[2].name);
                }
        }
        else if (currItinerary == 3)
        {
            if (currEdit == 1)
            {
                setInputName(itinerario3[0].Nome);
                setInputDesc(itinerario3[0].descricao);
                setInputCateg(itinerario3[0].categoria);
                setInputAddress(itinerario3[0].endereco);
                setInputHora(itinerario3[0].horario_recomendado_visita);

                // console.log(itinerario1[0].name);
            }
            else if (currEdit == 2)
            {
                setInputName(itinerario3[1].Nome);
                setInputDesc(itinerario3[1].descricao);
                setInputCateg(itinerario3[1].categoria);
                setInputAddress(itinerario3[1].endereco);
                setInputHora(itinerario3[1].horario_recomendado_visita);

                // console.log(itinerario1[1].name);
            }
            else if (currEdit == 3)
            {
                setInputName(itinerario3[2].Nome);
                setInputDesc(itinerario3[2].descricao);
                setInputCateg(itinerario3[2].categoria);
                setInputAddress(itinerario3[2].endereco);
                setInputHora(itinerario3[2].horario_recomendado_visita);

                // console.log(itinerario1[2].name);
            }
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

            //var idop = document.getElementById("op1");
            //let texto = JSON.stringify(rep2[0]);
            //if (idop != null) { idop.innerHTML = rep; }

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

            //var idop = document.getElementById("op1");
            //let texto = JSON.stringify(rep2[0]);
            //if (idop != null) { idop.innerHTML = rep; }

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

            //var idop = document.getElementById("op1");
            //let texto = JSON.stringify(rep2[0]);
            //if (idop != null) { idop.innerHTML = rep; }

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

    function savechanges(index){
        itinerario1[index].Nome = inputName;
        itinerario1[index].horario_recomendado_visita = inputHora;
        itinerario1[index].descricao = inputDesc;
        itinerario1[index].categoria = inputCateg;
        itinerario1[index].endereco = inputAddress;
        save({"itinerario": {"itinerario": itinerario1}, "index": currItinerary - 1}, token).then(function(rep){
            lasthandle(currItinerary - 1);
            setCurrEditing(0);
        });
    };

    function savechanges2(index){
        itinerario2[index].Nome = inputName;
        itinerario2[index].horario_recomendado_visita = inputHora;
        itinerario2[index].descricao = inputDesc;
        itinerario2[index].categoria = inputCateg;
        itinerario2[index].endereco = inputAddress;
        save({"itinerario": {"itinerario": itinerario2}, "index": currItinerary - 1}, token).then(function(rep){
            lasthandle2(currItinerary - 1);
            setCurrEditing(0);
        });
    };

    function savechanges3(index){
        itinerario3[index].Nome = inputName;
        itinerario3[index].horario_recomendado_visita = inputHora;
        itinerario3[index].descricao = inputDesc;
        itinerario3[index].categoria = inputCateg;
        itinerario3[index].endereco = inputAddress;
        save({"itinerario": {"itinerario": itinerario3}, "index": currItinerary - 1}, token).then(function(rep){
            lasthandle3(currItinerary - 1);
            setCurrEditing(0);
        });
    };

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
    
    const itineraryMap = {

        // null
        0: <></>,

        // itinerario 1
        1: <>
            { (itinerario1.length == 0) ? 
                PromptScreen[0]
            : 
                <div className="show-itinerary-div"> { /* grid grid-cols-3 */ }
                    { itinerario1.map((elemento, index) => (

                        <React.Fragment key={index}> 
                            <div key={index} className="itinerary-grid-div">
                                { currEditing == (index + 1) ? 

                                    <>
                                        <div className="itinerary-name-div">
                                            <input className="normal-input" value={inputName} onChange={handleChangeInputName} placeholder="Nome" />
                                        </div>

                                        <div className="gap-div" />

                                        <textarea className="preferencies-input" value={inputDesc} onChange={handleChangeInputDesc} placeholder="Descrição" />

                                        <div className="gap-div"></div>
                                        <div className="gap-div"></div>

                                        <input className="normal-input" value={inputCateg} onChange={handleChangeInputCateg} placeholder="Categoria" />
                                        <input className="normal-input" value={inputAddress} onChange={handleChangeInputAddress} placeholder="Endereço" />
                                        <input className="normal-input" value={inputHora} onChange={handleChangeInputHora} placeholder="Horario" />

                                        <button onClick={() => savechanges(index)}>salvar</button>
                                        <button onClick={() => setCurrEditing(0)}>cancelar</button>
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
                </div>
            }
        </>,

        // itinerario 2
        2: <>
            { (itinerario2.length == 0) ? 
                PromptScreen[0]
            : 
                <div className="show-itinerary-div"> { /* grid grid-cols-3 */ }
                    { itinerario2.map((elemento, index) => (

                        <React.Fragment key={index}> 
                            <div key={index} className="itinerary-grid-div">
                                { currEditing == (index + 1) ? 

                                    <>
                                        <div className="itinerary-name-div">
                                            <input className="normal-input" value={inputName} onChange={handleChangeInputName} placeholder="Nome" />
                                        </div>

                                        <div className="gap-div" />

                                        <textarea className="preferencies-input" value={inputDesc} onChange={handleChangeInputDesc} placeholder="Descrição" />

                                        <div className="gap-div"></div>
                                        <div className="gap-div"></div>

                                        <input className="normal-input" value={inputCateg} onChange={handleChangeInputCateg} placeholder="Categoria" />
                                        <input className="normal-input" value={inputAddress} onChange={handleChangeInputAddress} placeholder="Endereço" />
                                        <input className="normal-input" value={inputHora} onChange={handleChangeInputHora} placeholder="Horario" />

                                        <button onClick={() => savechanges2(index)}>salvar</button>
                                        <button onClick={() => setCurrEditing(0)}>cancelar</button>
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
                </div>
            }
        </>,

        // itinerario 3
        3: <>
            { (itinerario3.length == 0) ? 
                PromptScreen[0]
            : 
                <div className="show-itinerary-div"> { /* grid grid-cols-3 */ }
                    { itinerario3.map((elemento, index) => (

                        <React.Fragment key={index}> 
                            <div key={index} className="itinerary-grid-div">
                                { currEditing == (index + 1) ? 

                                    <>
                                        <div className="itinerary-name-div">
                                            <input className="normal-input" value={inputName} onChange={handleChangeInputName} placeholder="Nome" />
                                        </div>

                                        <div className="gap-div" />

                                        <textarea className="preferencies-input" value={inputDesc} onChange={handleChangeInputDesc} placeholder="Descrição" />

                                        <div className="gap-div"></div>
                                        <div className="gap-div"></div>

                                        <input className="normal-input" value={inputCateg} onChange={handleChangeInputCateg} placeholder="Categoria" />
                                        <input className="normal-input" value={inputAddress} onChange={handleChangeInputAddress} placeholder="Endereço" />
                                        <input className="normal-input" value={inputHora} onChange={handleChangeInputHora} placeholder="Horario" />

                                        <button onClick={() => savechanges3(index)}>salvar</button>
                                        <button onClick={() => setCurrEditing(0)}>cancelar</button>
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
                </div>
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
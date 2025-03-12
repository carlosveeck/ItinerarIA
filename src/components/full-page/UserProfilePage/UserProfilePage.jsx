import { useState, useEffect } from "react";
import {  CircleUserIcon, LogOut, UserRound, X, NotepadText, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../ui/button";

import { useAuth } from "@/context/AuthContext";
import { useToken } from "../../../context/TokenContext";

import default_user_icon from "@/assets/default-user-pic.jpg"

import "./UserProfilePage.css"
import "../LandingPage/LandingPage.css"

async function send_msg(token){
    const response = await fetch(`http://127.0.0.1:8000/profile`, {
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

function UserIcon()
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

// actual page
function UserProfilePage()
{
    const navigate = useNavigate();

    const [editingProfile, setEditingProfile] = useState(0);

    const [newCountry, setNewCountry] = useState("");
    const [newDate, setNewDate] = useState("");
    const [newPreferencies, setNewPreferencies] = useState("");

    const handleChangeCountry = (e) => setNewCountry(e.target.value);
    const handleChangeDate = (e) => setNewDate(e.target.value);
    const handleChangePreferencies = (e) => setNewPreferencies(e.target.value);

    const { user, isAuthLoaded } = useAuth();
    const { token } = useToken();
    useEffect(() => {
            console.log("ItineraryPage → Auth Loaded:", isAuthLoaded, "User:", user);
    
            if (!isAuthLoaded) return; // Aguarda o carregamento completo antes de tomar ação
    
            if (!user) {
                console.log("Redirecionando para /login...");
                navigate("/login");
            }
            send_msg(token).then(function(rep){
                let rep2 = JSON.parse(rep);
                console.log(rep2);
                //divida tecnica :^)
                var placeuser = document.getElementById("user");
                placeuser.innerHTML = rep2["usuario"]; 
                var placeplace = document.getElementById("pais");
                placeplace.innerHTML = rep2["pais"]; 
                var placedate = document.getElementById("data");
                placedate.innerHTML = rep2["data_nascimento"];
                var placepref = document.getElementById("pref");
                placepref.innerHTML = rep2["preferencias"];  
            })
        }, [isAuthLoaded, user, navigate]);
    
    if (!isAuthLoaded) return <div>Carregando...</div>;
    
    if (!user) return null;

    const editingContent = {

        0:  <>
                <h1>{user.username}</h1>
                <button 
                    className="user-main-content-div-1-div-button"
                    onClick={() => setEditingProfile(1)}>
                        Editar perfil
                </button>
            </>,

        1:  <div className="edit-div">
                <label className="edit-div-label">País</label>
                <input className="normal-input" onChange={handleChangeCountry} placeholder="Novo País" />

                <label className="edit-div-label">Nascimento</label>
                <input className="normal-input" onChange={handleChangeDate} type="date"/>

                <label className="edit-div-label">Preferências</label>
                <textarea className="preferencies-input" onChange={handleChangePreferencies} placeholder="Novas preferências" />

                <div className="edit-div-buttons">
                    <button className="edit-div-buttons-button1">Salvar</button>
                    <button className="edit-div-buttons-button2" onClick={() => setEditingProfile(0)}>Cancelar</button>
                </div>
            </div>,
    };

    return (
        <div className="user-full-page">
            <header className={`landing-page-header visible`}>
            
                <div className="landing-page-header-logo-div">  
                    <h1 className="logo-name">ItinerarIA</h1>
                </div>

                <div className="landing-page-header-button-div">

                    <Button className="landing-page-header-button" onClick={() => navigate("/")}>
                        Início
                    </Button>

                    <Button className="landing-page-header-button" onClick={() => navigate("/itinerary")}>
                        Itinerários
                    </Button>

                </div>

                <UserIcon/>
            </header>

            <div className="user-main-content-div-1">
                <img className="user-profile-pic" src={default_user_icon} />

                <div className="user-main-content-div-1-div">                    
                    { editingContent[editingProfile] || <></> }
                </div>
            </div>

            <div className="user-main-content-div-2">
                <div className="user-main-content-div-2-fit-content">
                    <div className="user-main-content-div-2-div">
                        <h1>Nome de usuário</h1>
                        <h2 id="user"></h2>
                    </div>

                    <hr />

                    <div className="user-main-content-div-2-div">
                        <h1>País</h1>
                        <h2 id="pais"></h2>
                    </div>

                    <hr />

                    <div className="user-main-content-div-2-div">
                        <h1>Data de nascimento</h1>
                        <h2 id="data"></h2>
                    </div>

                    <hr />

                    <div className="user-main-content-div-2-div">
                        <h1>Preferências</h1>
                        <h2 id="pref"></h2>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UserProfilePage;
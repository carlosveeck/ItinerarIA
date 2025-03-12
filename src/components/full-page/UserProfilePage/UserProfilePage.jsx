import { useState, useEffect } from "react";
import {  CircleUserIcon, LogOut, UserRound, X, NotepadText, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../ui/button";

import { useAuth } from "@/context/AuthContext";

import default_user_icon from "@/assets/default-user-pic.jpg"

import "./UserProfilePage.css"
import "../LandingPage/LandingPage.css"

function LogoutButton()
{
    const { logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        navigate("/"); // Redireciona para login após logout
        setTimeout(() => logout(), 0); // Depois, faz logout
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

    const { user, isAuthLoaded } = useAuth();
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

                <div>
                    <h1>{user.username}</h1>
                    
                    <button>Editar perfil</button>
                </div>
            </div>

            <div className="user-main-content-div-2">
                <div className="user-main-content-div-2-fit-content">
                    <div className="user-main-content-div-2-div">
                        <h1>Nome de usuário</h1>
                        <h2>placeholder da Silva</h2>
                    </div>

                    <hr />

                    <div className="user-main-content-div-2-div">
                        <h1>País</h1>
                        <h2>placeholder</h2>
                    </div>

                    <hr />

                    <div className="user-main-content-div-2-div">
                        <h1>Data de nascimento</h1>
                        <h2>dd/mm/yyyy</h2>
                    </div>

                    <hr />

                    <div className="user-main-content-div-2-div">
                        <h1>Preferências</h1>
                        <h2>placeholder</h2>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UserProfilePage;
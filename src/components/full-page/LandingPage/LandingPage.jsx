import { useState, useEffect } from "react";
import { ArrowRight, BrainCircuit, CircleUserIcon, LogOut, Map, Menu, TreePalm, User, UserRound, X, NotepadText, Fingerprint } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../ui/button";

import "./LandingPage.css";

import { useAuth } from "@/context/AuthContext";
import { useToken } from "@/context/TokenContext";
import Carousel from "@/components/handmade-UI/Carousel/Carousel";
import laptopImg from "../../../assets/laptop-template(final).png"

function LogoutButton()
{
    const { logout } = useAuth();
    const { reset } = useToken();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        reset();
        navigate("/"); // Redireciona para login após logout
    };

    return (
        <button className="menu-button" onClick={ handleLogout }>
            <LogOut strokeWidth={1.75} color="#56707A"/> Sair
        </button>);
}

function NoUserButtons()
{
    const navigate = useNavigate();

    return (
        <div className="landing-page-header-getStarted">

            <Button className="landing-page-header-getStarted-login" onClick={() => navigate("/login")}>
                Entrar
            </Button>

            <Button className="landing-page-header-getStarted-signup" onClick={() => navigate("/signup")}>
                Cadastrar
            </Button>
        </div>
    );
}

// function LandingPageMenu()
// {
//     const navigate = useNavigate();
//     const { user } = useAuth();

//     return (
//         <>
//             <div className="menu-overlay"/>
//             <div className="menu">
//                 <h1>
//                     <CircleUserIcon/> { user.username }
//                 </h1>

//                 <hr />

//                 <button onClick={ () => navigate("/itinerary") }>
//                     <Map/> Itinerários
//                 </button>

//                 <LogoutButton/>
//             </div>
//         </>
//     );
// }

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

                    <LogoutButton/>
                </div>
            </>

        </div>
    );
}

function FooterLogin()
{
    const navigate = useNavigate();

    return (
        <div className="footer-login">
            <div className="footer-login-div">
                <h1>Pronto para planejar sua viagem?</h1>
                <p>Vamos começar!</p>
            </div>

            <div className="landing-page-header-getStarted">

                <button className="footer-login-button1" onClick={() => navigate("/login")}>
                    Entrar
                </button>

                <button className="footer-login-button2" onClick={() => navigate("/signup")}>
                    Cadastrar
                </button>
            </div>
        </div>
    );
}

function LandingPage()
{
    const navigate = useNavigate();

    const { user } = useAuth();

    const [showHeader, setShowHeader] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);

    useEffect(() => {

        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            if (currentScrollY > lastScrollY)
            {
                setShowHeader(false);
            }
            else
            {
                setShowHeader(true);
            }

            setLastScrollY(currentScrollY);
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll); // Limpa o evento ao desmontar
        };

    }, [lastScrollY]);

    return (
        <div className={`full-screen`}>
            
            <header className={`landing-page-header ${showHeader ? "visible" : "hidden"}`}>

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

                {(user) ? <UserIcon/> : <NoUserButtons/> }

            </header>

            <div className="landing-page-intro">

                <div className="landing-page-intro-text">

                    <h1 className="landing-page-intro-h">
                        <strong>Um site</strong> <br />
                        para suas viagens
                    </h1>

                    <p className="landing-page-intro-p">
                        Organize viagens inesquecíveis com nosso auxílio
                    </p>

                    { (user) ?
                        <></>

                        :

                        <div>
                            <Button className="landing-page-intro-button-signup" onClick={() => navigate("/signup")}>
                                Começar
                            </Button>

                            <Button className="landing-page-intro-button-login" onClick={() => navigate("/login")}>
                                Entrar <ArrowRight strokeWidth={3} /> 
                            </Button>
                        </div>
                    }

                </div>

            </div>
                
            <img className="landing-page-img" src={laptopImg}/>
            
            <div className="landing-page-img-div">
                <h2>Envie um prompt informando o local de sua viagem e receba um itinerário personalizado</h2>
                <h2 className="landing-page-img-div-fingerprint">-&nbsp;<Fingerprint strokeWidth={1}/>&nbsp;-</h2>
            </div>

            <div className="landing-page-features-div">
                <h1>
                    Sua viagem com <strong>tecnologia de IA</strong>
                </h1>

                <div>
                    <div>
                        <p>
                            <strong>Ideal para você</strong>
                            <br />
                            <br />
                            Crie seu itinerário perfeito com ItinerarIA.
                            Nossas abordagens de geração levam em consideração 
                            suas preferências para criar o plano de 
                            viagem ideal feito sob medida para você.
                        </p>
                    </div>

                    <div>
                        <BrainCircuit size={80} strokeWidth={0.6} color="#0f3e4a"/>
                    </div>
                </div>

                <div>
                    <div>
                        <TreePalm size={80} strokeWidth={0.6} color="#0f3e4a"/>
                    </div>

                    <div>
                        <p>
                            <strong>Sua viagem, suas escolhas</strong>
                            <br />
                            <br />
                            O ItinerarIA cria até três roteiros personalizados para
                             você, oferecendo opções que se encaixam no seu estilo de viagem.
                        </p>
                    </div>
                </div>
            </div>

            <div className="carousel-div">
                <h1><strong>Ferramentas</strong> utilizadas no desenvolvimento do site</h1>
                <Carousel />
            </div>

            {/*
                <hr className="m-96"/>
                <hr className="m-96"/>
            */}

            <footer className="landing-page-footer">
                {(user) ? <></> : <FooterLogin/> }

                <div className="landing-page-footer-content">
                    <p>Desenvolvido pela <strong>equipe 4</strong> / CIN0136 / CIn-UFPE</p>
                    <p><strong>Aviso:</strong> Este projeto foi desenvolvido para fins acadêmicos.</p>
                    <br />
                    <a href="https://github.com/carlosveeck/ItinerarIA" target="_blank" className="github-link">
                        <svg viewBox="0 0 16 16" aria-hidden="true">
                            <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 
                            0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 
                            1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 
                            0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 
                            1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 
                            1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 
                            1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 
                            16 8c0-4.42-3.58-8-8-8z"/>
                        </svg>
                        GitHub
                    </a>
                </div>
            </footer>

        </div>
    );
}

export default LandingPage;
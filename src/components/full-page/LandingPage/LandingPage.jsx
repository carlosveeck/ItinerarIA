import { useState, useEffect } from "react";
import { ArrowRight, BrainCircuit, CircleUserIcon, LogOut, Map, Menu } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../ui/button";

import "./LandingPage.css";

import { useAuth } from "@/context/AuthContext";
import Carousel from "@/components/handmade-UI/Carousel/Carousel";

function LogoutButton()
{
    const { logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/"); // Redireciona para login após logout
    };

    return (
        <button onClick={ handleLogout }>
            <LogOut/> Sair
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

function LandingPageMenu()
{
    const navigate = useNavigate();
    const { user } = useAuth();

    return (
        <>
            <div className="menu-overlay"/>
            <div className="menu">
                <h1>
                    <CircleUserIcon/> { user.username }
                </h1>

                <hr />

                <button onClick={ () => navigate("/itinerary") }>
                    <Map/> Itinerários
                </button>

                <LogoutButton/>
            </div>
        </>
    );
}

function UserIcon()
{
    const { user } = useAuth();

    const [showMenuBox, setShowMenuBox] = useState(false);
    const toggleLogoutBox = () => setShowMenuBox(!showMenuBox);
    

    return (
        <div className="landing-page-header-getStarted">

            <Button className="landing-page-header-getStarted-menu" onClick={toggleLogoutBox}>
                <Menu style={{ width: "24px", height: "24px" }}/>
            </Button>

            { showMenuBox ? <LandingPageMenu/> : null }

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
        <div className="full-screen">
            
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

            <div className="landing-page-show">

                <div className="div1">

                </div>

                <div className="div2">

                </div>

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
                        <BrainCircuit size={80} strokeWidth={0.6} color="#0f3e4a"/>
                    </div>

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

            </footer>

        </div>
    );
}

export default LandingPage;
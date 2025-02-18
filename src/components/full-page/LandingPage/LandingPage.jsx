import { useState, useEffect } from "react";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../ui/button";

import "./LandingPage.css";

function LandingPage()
{
    const navigate = useNavigate();

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
                        Home
                    </Button>

                    <Button className="landing-page-header-button" onClick={() => navigate("/chatbot")}>
                        Chatbot
                    </Button>

                    <Button className="landing-page-header-button">
                        Itinerários
                    </Button>

                </div>

                <div className="landing-page-header-getStarted">

                    <Button className="landing-page-header-getStarted-login" onClick={() => navigate("/login")}>
                        Entrar
                    </Button>

                    <Button className="landing-page-header-getStarted-signup">
                        Cadastrar
                    </Button>
                </div>

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

                    <div>
                        <Button className="landing-page-intro-button-signup">
                            Começar
                        </Button>

                        <Button className="landing-page-intro-button-login" onClick={() => navigate("/login")}>
                            Entrar <ArrowRight strokeWidth={3} /> 
                        </Button>
                    </div>

                </div>

            </div>

            <div className="landing-page-show">

                <div className="div1">

                </div>

                <div className="div2">

                </div>

            </div>

            <hr className="m-96"/>
            <hr className="m-96"/>

        </div>
    );
}

export default LandingPage;
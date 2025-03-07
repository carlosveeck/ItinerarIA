import fastapi_logo from "../../../assets/carousel/fastapi-logo.png"
import openai_logo from "../../../assets/carousel/openai-logo.png"
import pytest_logo from "../../../assets/carousel/pytest-logo.png"
import react_logo from "../../../assets/carousel/react-logo.png"
import sqla_logo from "../../../assets/carousel/sqlalchemy-logo.png"
import vite_logo from "../../../assets/carousel/vite-logo.png"

import "./Carousel.css"

const Carousel = () => {

    return (
        <div>
            <div className="left-white"/>
            <div className="right-white"/>

            <div className="logos">
                <div className="logos-slide">
                    <img src={fastapi_logo} />
                    <img src={openai_logo} />
                    <img src={pytest_logo} />
                    <img src={react_logo} />
                    <img src={sqla_logo} />
                    <img src={vite_logo} />
                </div>

                <div className="logos-slide">
                    <img src={fastapi_logo} />
                    <img src={openai_logo} />
                    <img src={pytest_logo} />
                    <img src={react_logo} />
                    <img src={sqla_logo} />
                    <img src={vite_logo} />
                </div>
            </div>
        </div>
    );
};

export default Carousel;
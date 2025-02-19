import React from "react";
import ItinerarIABreadcrumb from "../handmade-UI/itinerariaBreadcrumb";

const Itinerary = () => {
    return (
        <div className="h-screen w-screen bg-zinc-800 flex">
            {/* Sidebar */}
            <div className="w-1/4 h-full">
                <div className>
                    <ItinerarIABreadcrumb />
                </div>
            </div>

            {/* Main Content */}
            <div className="w-3/4 h-full flex flex-col justify-center items-center">
                <h2 className="text-white text-2xl mb-5">Resultado do Itinerário</h2>
                <div className="bg-neutral-700 p-6 rounded-xl shadow-lg w-3/4">
                    <p className="text-white text-lg text-center">Aqui será exibido o resultado do backend.</p>
                </div>
            </div>
        </div>
    );
};

export default Itinerary ;
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
  } from "@/components/ui/breadcrumb"

import { Home, Slash } from "lucide-react";

import { useLocation } from "react-router-dom";

function CurrentPath() {
  const location = useLocation();

  return (
    <div>
      <p>O caminho atual é: {location.pathname}</p>
    </div>
  );
}

function ItinerarIABreadcrumb() {

    const location = useLocation();

    return (

        <div className="p-10 h-0 flex justify-center items-center">

            <Breadcrumb>
                <BreadcrumbList className="text-white">

                    <BreadcrumbItem>
                        <BreadcrumbLink
                            className={`
                                ${location.pathname === "/" ? "text-white pointer-events-none" : "text-gray-500 hover:text-white"}
                            `}
                            href="/"
                        >
                            Home
                        </BreadcrumbLink>
                    </BreadcrumbItem>

                    <BreadcrumbSeparator>
                    <Slash className="text-gray-500"/>
                    </BreadcrumbSeparator>

                    <BreadcrumbItem>
                        <BreadcrumbLink
                            className={`
                                ${location.pathname === "/Chatbot" ? "text-white pointer-events-none" : "text-gray-500 hover:text-white"}
                            `}
                            href="/Chatbot"
                        >
                            Chat-bot
                        </BreadcrumbLink>
                    </BreadcrumbItem>

                    <BreadcrumbSeparator>
                    <Slash className="text-gray-500"/>
                    </BreadcrumbSeparator>

                    <BreadcrumbItem>
                        <BreadcrumbLink
                            className={`
                                ${location.pathname === "/Itinerary" ? "text-white pointer-events-none" : "text-gray-500 hover:text-white"}    
                            `}
                            href="/Itinerary"
                        >
                            Itinerary
                        </BreadcrumbLink>
                    </BreadcrumbItem>

                </BreadcrumbList>
            </Breadcrumb>
            
        </div>
        
    );
}

export default ItinerarIABreadcrumb;
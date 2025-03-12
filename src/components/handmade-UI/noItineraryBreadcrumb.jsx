import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
  } from "@/components/ui/breadcrumb"

import { Slash } from "lucide-react";

import { useLocation } from "react-router-dom";


function NoItineraryBreadcrumb() {

    const location = useLocation();

    return (

        <div className="p-10 h-0 flex justify-center items-center">

            <Breadcrumb>
                <BreadcrumbList className="text-black">

                    <BreadcrumbItem>
                        <BreadcrumbLink
                            className={`
                                ${location.pathname === "/" ? "text-black pointer-events-none" : "text-gray-500 hover:text-green"}
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
                                ${location.pathname === "/itinerary" ? "text-green pointer-events-none" : "text-gray-500 hover:text-black"}
                            `}
                            href="/chatbot"
                        >
                            Itinerário
                        </BreadcrumbLink>
                    </BreadcrumbItem>

                </BreadcrumbList>
            </Breadcrumb>
            
        </div>
        
    );
}

export default NoItineraryBreadcrumb;
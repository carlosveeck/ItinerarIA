import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "../ui/navigation-menu";
// import ItinerarIABreadcrumb from "../handmade-UI/itinerariaBreadcrumb";
import NoItineraryBreadcrumb from "../handmade-UI/noItineraryBreadcrumb";

function LandingPage() {

    const navigate = useNavigate();

    return (
        <div className="w-screen h-screen flex flex-col bg-zinc-800">

            <div className="flex justify-between bg-zinc-800">

                <div className="w-1/4 p-10 h-0 flex justify-center items-center">

                    <NoItineraryBreadcrumb />

                </div>

                <div className="flex items-center">

                    <NavigationMenu>

                        <NavigationMenuList className="space-x-10 mx-10">

                            <NavigationMenuItem>

                                <NavigationMenuTrigger className="text-gray-300 bg-transparent pointer-events-none">
                                    Project
                                </NavigationMenuTrigger>

                                <NavigationMenuContent>
                                    <NavigationMenuLink>Link</NavigationMenuLink>
                                </NavigationMenuContent>
                                
                            </NavigationMenuItem>

                            <NavigationMenuItem>

                                <NavigationMenuTrigger className="text-gray-300 bg-transparent pointer-events-none">
                                    Contact
                                </NavigationMenuTrigger>

                                <NavigationMenuContent>
                                <NavigationMenuLink>Link</NavigationMenuLink>
                                </NavigationMenuContent>

                            </NavigationMenuItem>

                        </NavigationMenuList>

                    </NavigationMenu>
                </div>
                
            </div>

            <div className="bg-zinc-800 flex-1 flex flex-col justify-start items-center">

                <div className="mt-28 flex flex-col items-center">

                    <h1 className="m-12 text-gray-200 font-bold text-6xl">
                        ItinerarIA
                    </h1>

                    <h2 className="mb-12 text-gray-300 text-xl">
                        Organize viagens inesquecíveis com auxílio da nossa IA
                    </h2>

                </div>

                <Button
                    className={`
                        bg-transparent border-2 text-gray-400 border-gray-400 m-3 py-5 px-10 rounded-full text-base
                        hover:bg-gray-400 hover:text-zinc-800
                    `}
                    onClick={() => navigate("/Chatbot")}
                >
                    Get Started
                </Button>

            </div>
        </div>
    );
}

export default LandingPage;
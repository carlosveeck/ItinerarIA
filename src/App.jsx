import { Button } from "./components/ui/button"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "./components/ui/navigation-menu"

function App() {

  return (
    <>
 <div className="px-6 py-4">
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Project</NavigationMenuTrigger>
              <NavigationMenuContent>
                <NavigationMenuLink>Link</NavigationMenuLink>
              </NavigationMenuContent>
              
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Contact</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <NavigationMenuLink>Link</NavigationMenuLink>
                </NavigationMenuContent>
    
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
    </div>

    <div class=" bg-[url('../src/assets/background3.jpg')] bg-cover bg-no-repeat bg-center h-screen brightness-100">
      <div className="p-24">
        <h1 className="text-black font-bold text-6xl">ItinerarIA</h1>
        <h2 className="text-black text-3xl font-bold">Organize viagens inesquecíveis com auxílio da nossa IA</h2>
      </div>
    </div>
    

    <div className="flex absolute justify-center top-96 left-1/2">
      <Button>Get Started</Button>
    </div>


    </>
  )
}

export default App

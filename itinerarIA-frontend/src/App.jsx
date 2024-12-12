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

    <div className="flex relative justify-center top-80 ">
      <Button>Get Started</Button>
    </div>
    
    </>
  )
}

export default App

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
    <NavigationMenu className="bg-blue-200 flex justify-end max-w-5xl">
			<NavigationMenuList className=" ">
				<NavigationMenuItem className="">
					<NavigationMenuTrigger>Getting started</NavigationMenuTrigger>
					<NavigationMenuContent className="">
						<ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
							<ListItem href="/docs/primitives/typography" title="Typography">
								Styles for headings, paragraphs, lists...etc
							</ListItem>
							<ListItem href="/docs/primitives/typography" title="Typography">
								Styles for headings, paragraphs, lists...etc
							</ListItem>
						</ul>
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

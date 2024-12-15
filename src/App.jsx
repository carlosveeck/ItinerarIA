import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import LandingPage from "./components/full-page/LandingPage";
import Chatbot from "./components/full-page/Chatbot";
import Itinerary from "./components/full-page/Itinerary";

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage/>}/>
        <Route path="/Chatbot" element={<Chatbot/>}/>
        <Route path="/Itinerary" element={<Itinerary/>}/>
      </Routes>
    </Router>
  );
}

export default App;

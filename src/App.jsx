import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import LandingPage from "./components/full-page/LandingPage";
import Chatbot from "./components/full-page/Chatbot";

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage/>}/>
        <Route path="/Chatbot" element={<Chatbot/>}/>
      </Routes>
    </Router>
  );
}

export default App;

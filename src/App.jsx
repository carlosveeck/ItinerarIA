import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import LandingPage from "./components/full-page/LandingPage/LandingPage";
// import Chatbot from "./components/full-page/Chatbot";
import PromptScreen from "./components/full-page/Chatbot";
import LoginPage from "./components/full-page/LoginPage/LoginPage";

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage/>}/>
        <Route path="/chatbot" element={<PromptScreen/>}/>
        <Route path="/login" element={<LoginPage/>}/>
      </Routes>
    </Router>
  );
}

export default App;

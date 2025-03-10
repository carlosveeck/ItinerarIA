import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import LandingPage from "./components/full-page/LandingPage/LandingPage";
// import Chatbot from "./components/full-page/Chatbot";
import PromptScreen from "./components/full-page/ItineraryPage/Chatbot";

import LoginPage from "./components/full-page/LoginPage/LoginPage";
import SignUpPage from "./components/full-page/SignUpPage/SignUpPage";
import ItineraryPage from "./components/full-page/ItineraryPage/ItineraryPage";
import UserProfilePage from "./components/full-page/UserProfilePage/UserProfilePage";

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage/>}/>
        <Route path="/profile" element={<UserProfilePage/>}/>
        <Route path="/itinerary" element={<ItineraryPage/>}/>
        <Route path="/login" element={<LoginPage/>}/>
        <Route path="/signup" element={<SignUpPage/>}/>
      </Routes>
    </Router>
  );
}

export default App;

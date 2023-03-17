import { Routes, Route } from "react-router-dom";
import CookieConsent from "./components/CookieConsent";
import Admin from "./pages/Admin";
import ChoicePlaylist from "./pages/ChoicePlaylist";
import EditAccount from "./pages/EditAccount";


import Game from "./pages/Game";
import Home from "./pages/Home";
import Login from "./pages/Login";
import MyAccount from "./pages/MyAccount";
import Privacy from "./pages/Privacy";
import Register from "./pages/Register";
import Results from "./pages/Results";

export default function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/game/:id/:scoreId" element={<Game />} />
        <Route path="/choice" element={<ChoicePlaylist />} />
        <Route path="/results/:id" element={<Results />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/myaccount" element={<MyAccount />} />
        <Route path="/edit" element={<EditAccount />} />
        <Route path="/privacy" element={<Privacy/>} />
      </Routes>
     <CookieConsent/>
    </div>
  );
}

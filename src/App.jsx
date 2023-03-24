import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Cookies from "js-cookie";
import { getUserProfile } from "./services/userService";
import { loginUser } from "./actions/userAction";
import { useSelector } from "react-redux";
import Admin from "./pages/Admin";
import ChoicePlaylist from "./pages/ChoicePlaylist";
import CookieConsent from "./components/StationUtility/CookieConsent";
import EditAdmin from "./components/Admin/EditAdmin";
import EditProfile from "./components/Profile/EditProfile";
import Game from "./pages/Game";
import Home from "./pages/Home";
import Privacy from "./pages/Privacy";
import Profile from "./pages/Profile";
import Results from "./pages/Results";
import store from "./store";
import PasswordInstruction from "./pages/PasswordInstruction"


export default function App() {
  const [AdminLoggedIn, setAdminLoggedIn] = useState(false);
  const loggedUser = useSelector((state) => {
    return state.user;
  });

  useEffect(() => {
    if (loggedUser && loggedUser.is_admin) {
      setAdminLoggedIn(true);
    } else {
      setAdminLoggedIn(false);
    }
  }, [loggedUser]);

  useEffect(() => {
    const token = Cookies.get("user_token");
    if (!token) {
      return;
    }
    const fetchData = async () => {
      try {
        const user = await getUserProfile();
        store.dispatch(loginUser(user));
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/game/:id/:gameId" element={<Game />} />
        <Route path="/choice" element={<ChoicePlaylist />} />
        <Route path="/results/:id" element={<Results />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/profile/edit" element={<EditProfile />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route
          path="/new_password/:tokenId" element={<PasswordInstruction/>}
        />
        <Route path="*" element={<Home />} />
        {AdminLoggedIn && (
          <>
            <Route path="/admin" element={<Admin />} />
            <Route path="/admin/edit/:playlistID" element={<EditAdmin />} />
          </>
        )}
      </Routes>
      <CookieConsent />
    </div>
  );
}

import { Routes, Route } from "react-router-dom";
import Admin from "./pages/Admin";
import ChoicePlaylist from "./pages/ChoicePlaylist";
import Game from "./pages/Game";
import Home from "./pages/Home";
import Results from "./pages/Results";
import Profile from "./pages/Profile";
import store from "./store";
import { Provider } from "react-redux";
import { useEffect } from "react";
import Cookies from "js-cookie";
import { loginUser } from "./actions/userAction";
import { getUserProfile } from "./services/userService";
import CookieConsent from "./components/CookieConsent";
import Privacy from "./pages/Privacy";
import EditProfile from "./components/Profile/EditProfile";
import EditAdmin from "./components/Admin/EditAdmin";

export default function App() {
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
    <Provider store={store}>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/admin/edit/:playlistID" element={<EditAdmin />} />
          <Route path="/game/:id/:gameId" element={<Game />} />
          <Route path="/choice" element={<ChoicePlaylist />} />
          <Route path="/results/:id" element={<Results />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/profile/edit" element={<EditProfile />} />
          <Route path="/privacy" element={<Privacy />} />
        </Routes>
        <CookieConsent />
      </div>
    </Provider>
  );
}

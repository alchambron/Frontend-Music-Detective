import { Routes, Route } from 'react-router-dom'
import Admin from './pages/Admin'
import ChoicePlaylist from './pages/ChoicePlaylist'
import EditAccount from './pages/EditAccount'
import Game from './pages/Game'
import Home from './pages/Home'
import Results from './pages/Results'
import Profile from './pages/Profile'
import store from './store'
import { Provider } from 'react-redux'
import { useEffect } from 'react'
import Cookies from 'js-cookie'
import { loginUser, logoutUser } from './actions/userAction'
import { getUserProfile } from './services/userService'

export default function App() {

  useEffect(() => {
    const token = Cookies.get("user_token");
    if (!token) {
      return;
    }
    const fetchData = async () => {
      try {
        const user = await getUserProfile();
        store.dispatch(loginUser(user))
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, [])

  return (
    <Provider store={store}>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path='/admin' element={<Admin />} />
          <Route path="/game/:id" element={<Game />} />
          <Route path="/choice" element={<ChoicePlaylist />} />
          <Route path="/results/:id" element={<Results />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/edit" element={<EditAccount />} />
        </Routes>
      </div>
    </Provider>
  )
}

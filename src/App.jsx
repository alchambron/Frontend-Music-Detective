import { Routes, Route } from 'react-router-dom'
import { UidContext } from './components/AppContext'
import { useEffect, useState } from 'react'
import Cookies from 'js-cookie'

import Admin from './pages/Admin'
import ChoicePlaylist from './pages/ChoicePlaylist'
import EditAccount from './pages/EditAccount'
import Game from './pages/Game'
import Home from './pages/Home'
import Results from './pages/Results'
import Profile from './pages/Profile'

export default function App() {
  const [uid, setUid] = useState(null);

  useEffect(() => {
    const fetchToken = async () => {
      const token = Cookies.get("user_token");
      console.log("🚀 ~ file: App.jsx:20 ~ fetchToken ~ token:", token)
      if (token !== null && token !== undefined) {
        setUid(token)
      }
    }
    fetchToken();
  }, [uid])

  return (
    <div className="App">
      <UidContext.Provider value={uid}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path='/admin' element={<Admin />} />
          <Route path="/game/:id" element={<Game />} />
          <Route path="/choice" element={<ChoicePlaylist />} />
          <Route path="/results/:id" element={<Results />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/edit" element={<EditAccount />} />
        </Routes>
      </UidContext.Provider>
    </div>
  )
}

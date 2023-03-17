import { Routes, Route } from 'react-router-dom'
import Admin from './pages/Admin'
import ChoicePlaylist from './pages/ChoicePlaylist'
import EditAccount from './pages/EditAccount'
import Game from './pages/Game'
import Home from './pages/Home'
import MyAccount from './pages/MyAccount'
import Results from './pages/Results'

export default function App() {

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/admin' element={<Admin />} />
        <Route path="/game/:id" element={<Game />} />
        <Route path="/choice" element={<ChoicePlaylist />} />
        <Route path="/results/:id" element={<Results />} />
        <Route path="/myaccount" element={<MyAccount />} />
        <Route path="/edit" element={<EditAccount />} />

      </Routes>
    </div>
  )
}

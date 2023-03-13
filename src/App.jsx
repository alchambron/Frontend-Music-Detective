import { Routes, Route } from 'react-router-dom'
import ChoicePlaylist from './pages/ChoicePlaylist'

import Game from './pages/Game'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Results from './pages/Results'

export default function App() {

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/game/:id" element={<Game />} />
        <Route path="/choice" element={<ChoicePlaylist />} />
        <Route path="/results/:id" element={<Results />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  )
}

import { Routes, Route } from 'react-router-dom'
import ChoicePlaylist from './pages/ChoicePlaylist'

import Game from './pages/Game'
import Home from './pages/Home'

export default function App() {

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/game" element={<Game />} />
        <Route path="/choice" element={<ChoicePlaylist />} />
     
      </Routes>
    </div>
  )
}

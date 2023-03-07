import { Routes, Route } from 'react-router-dom'
import './App.scss'

import Home from './pages/Home/Home'
import Game from './pages/Game/Game'

export default function App() {

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/game" element={<Game />} />
      </Routes>
    </div>
  )
}

import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import Home from './pages/Home'
import Reservas from './pages/Reservas'
import Menu from './pages/Menu'
import './styles/App.css'

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <nav className="navbar">
          <div className="nav-container">
            <h1 className="logo">🍽️ Restaurante</h1>
            <ul className="nav-links">
              <li><Link to="/">Inicio</Link></li>
              <li><Link to="/menu">Menú</Link></li>
              <li><Link to="/reservas">Reservar</Link></li>
            </ul>
          </div>
        </nav>

        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/reservas" element={<Reservas />} />
          </Routes>
        </main>

        <footer className="footer">
          <p>&copy; 2025 Restaurante. Todos los derechos reservados.</p>
        </footer>
      </div>
    </BrowserRouter>
  )
}

export default App

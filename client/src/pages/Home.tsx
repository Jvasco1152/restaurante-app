import { Link } from 'react-router-dom'

function Home() {
  return (
    <div className="page">
      <div className="card">
        <h1 style={{ marginBottom: '1rem', color: '#2c3e50' }}>
          Bienvenido a Nuestro Restaurante
        </h1>
        <p style={{ fontSize: '1.1rem', lineHeight: '1.6', marginBottom: '2rem', color: '#555' }}>
          Disfruta de la mejor experiencia gastronómica. Reserva tu mesa o explora nuestro menú digital.
        </p>

        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <Link to="/menu">
            <button className="btn btn-primary">Ver Menú</button>
          </Link>
          <Link to="/reservas">
            <button className="btn btn-success">Reservar Mesa</button>
          </Link>
        </div>
      </div>

      <div className="grid">
        <div className="card">
          <h3 style={{ marginBottom: '1rem', color: '#2c3e50' }}>🍽️ Menú Digital</h3>
          <p style={{ color: '#666' }}>
            Explora nuestro menú completo con fotos, descripciones y precios actualizados.
          </p>
        </div>

        <div className="card">
          <h3 style={{ marginBottom: '1rem', color: '#2c3e50' }}>📅 Reservas Online</h3>
          <p style={{ color: '#666' }}>
            Reserva tu mesa de forma rápida y sencilla. Selecciona fecha, hora y número de personas.
          </p>
        </div>

        <div className="card">
          <h3 style={{ marginBottom: '1rem', color: '#2c3e50' }}>⚡ Servicio Rápido</h3>
          <p style={{ color: '#666' }}>
            Sistema ágil para que tu experiencia sea perfecta desde el primer momento.
          </p>
        </div>
      </div>
    </div>
  )
}

export default Home

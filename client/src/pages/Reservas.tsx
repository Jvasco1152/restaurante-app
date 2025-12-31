import { useState } from 'react'
import { reservasAPI } from '../services/api'
import { Reserva } from '../types'

function Reservas() {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    fecha: '',
    hora: '',
    personas: 2,
    notas: ''
  })
  const [loading, setLoading] = useState(false)
  const [mensaje, setMensaje] = useState<{ tipo: 'success' | 'error', texto: string } | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: name === 'personas' ? parseInt(value) : value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMensaje(null)

    try {
      await reservasAPI.create(formData)
      setMensaje({ tipo: 'success', texto: 'Reserva creada exitosamente. Te contactaremos pronto para confirmar.' })
      setFormData({
        nombre: '',
        email: '',
        telefono: '',
        fecha: '',
        hora: '',
        personas: 2,
        notas: ''
      })
    } catch (err) {
      setMensaje({ tipo: 'error', texto: 'Error al crear la reserva. Por favor intenta nuevamente.' })
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const fechaMinima = new Date().toISOString().split('T')[0]

  return (
    <div className="page">
      <div className="card">
        <h1 style={{ marginBottom: '1rem', color: '#2c3e50' }}>Reservar Mesa</h1>
        <p style={{ marginBottom: '2rem', color: '#666' }}>
          Completa el formulario para reservar tu mesa. Te confirmaremos la reserva a la brevedad.
        </p>

        {mensaje && (
          <div style={{
            padding: '1rem',
            marginBottom: '1rem',
            borderRadius: '4px',
            backgroundColor: mensaje.tipo === 'success' ? '#d4edda' : '#f8d7da',
            color: mensaje.tipo === 'success' ? '#155724' : '#721c24'
          }}>
            {mensaje.texto}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="nombre">Nombre completo *</label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email *</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="telefono">Teléfono *</label>
            <input
              type="tel"
              id="telefono"
              name="telefono"
              value={formData.telefono}
              onChange={handleChange}
              required
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className="form-group">
              <label htmlFor="fecha">Fecha *</label>
              <input
                type="date"
                id="fecha"
                name="fecha"
                value={formData.fecha}
                onChange={handleChange}
                min={fechaMinima}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="hora">Hora *</label>
              <input
                type="time"
                id="hora"
                name="hora"
                value={formData.hora}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="personas">Número de personas *</label>
            <select
              id="personas"
              name="personas"
              value={formData.personas}
              onChange={handleChange}
              required
            >
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
                <option key={num} value={num}>{num} {num === 1 ? 'persona' : 'personas'}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="notas">Notas adicionales (opcional)</label>
            <textarea
              id="notas"
              name="notas"
              value={formData.notas}
              onChange={handleChange}
              rows={4}
              placeholder="Alergias, preferencias de mesa, ocasión especial, etc."
            />
          </div>

          <button type="submit" className="btn btn-success" disabled={loading}>
            {loading ? 'Procesando...' : 'Confirmar Reserva'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default Reservas

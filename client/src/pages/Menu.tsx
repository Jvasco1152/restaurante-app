import { useState, useEffect, lazy, Suspense } from 'react'
import { menuAPI } from '../services/api'
import { MenuItem } from '../types'

// Lazy load para evitar errores si 3D falla
const MenuCarousel3D = lazy(() => import('../components/3d/MenuCarousel3D'))

function Menu() {
  const [items, setItems] = useState<MenuItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [categoriaActual, setCategoriaActual] = useState<string>('todos')
  const [view3D, setView3D] = useState(false)

  useEffect(() => {
    cargarMenu()
  }, [])

  const cargarMenu = async () => {
    try {
      setLoading(true)
      const response = await menuAPI.getAll()
      setItems(response.data)
      setError('')
    } catch (err) {
      setError('Error al cargar el menú')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const itemsFiltrados = categoriaActual === 'todos'
    ? items
    : items.filter(item => item.categoria === categoriaActual)

  if (loading) return <div className="page"><div className="card">Cargando menú...</div></div>
  if (error) return <div className="page"><div className="card" style={{ color: 'red' }}>{error}</div></div>

  return (
    <div className="page">
      <div className="card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '1rem' }}>
          <h1 style={{ margin: 0, color: '#2c3e50' }}>Nuestro Menú</h1>

          {/* 3D Toggle */}
          <button
            className={`btn ${view3D ? 'btn-success' : 'btn-primary'}`}
            onClick={() => setView3D(!view3D)}
            style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
          >
            <span style={{ fontSize: '1.2rem' }}>{view3D ? '🎴' : '🎯'}</span>
            {view3D ? 'Vista Normal' : 'Vista 3D'}
          </button>
        </div>

        {/* Category Filters */}
        <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
          <button
            className={`btn ${categoriaActual === 'todos' ? 'btn-primary' : ''}`}
            onClick={() => setCategoriaActual('todos')}
          >
            Todos
          </button>
          <button
            className={`btn ${categoriaActual === 'ENTRADA' ? 'btn-primary' : ''}`}
            onClick={() => setCategoriaActual('ENTRADA')}
          >
            Entradas
          </button>
          <button
            className={`btn ${categoriaActual === 'PRINCIPAL' ? 'btn-primary' : ''}`}
            onClick={() => setCategoriaActual('PRINCIPAL')}
          >
            Platos Principales
          </button>
          <button
            className={`btn ${categoriaActual === 'POSTRE' ? 'btn-primary' : ''}`}
            onClick={() => setCategoriaActual('POSTRE')}
          >
            Postres
          </button>
          <button
            className={`btn ${categoriaActual === 'BEBIDA' ? 'btn-primary' : ''}`}
            onClick={() => setCategoriaActual('BEBIDA')}
          >
            Bebidas
          </button>
        </div>
      </div>

      {itemsFiltrados.length === 0 ? (
        <div className="card">
          <p>No hay items disponibles en esta categoría.</p>
        </div>
      ) : view3D ? (
        /* 3D Carousel View */
        <div className="card" style={{ padding: '1rem', backgroundColor: '#2c3e50' }}>
          <Suspense fallback={<div style={{ color: 'white', padding: '2rem', textAlign: 'center' }}>Cargando vista 3D...</div>}>
            <MenuCarousel3D items={itemsFiltrados} />
          </Suspense>
        </div>
      ) : (
        /* Grid View */
        <div className="grid">
          {itemsFiltrados.map((item) => (
            <div key={item.id} className="card">
              {item.imagen && (
                <img
                  src={item.imagen}
                  alt={item.nombre}
                  style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '4px', marginBottom: '1rem' }}
                />
              )}
              <h3 style={{ marginBottom: '0.5rem', color: '#2c3e50' }}>{item.nombre}</h3>
              <p style={{ color: '#666', marginBottom: '1rem', fontSize: '0.9rem' }}>
                {item.descripcion}
              </p>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#27ae60' }}>
                  ${item.precio}
                </span>
                <span style={{
                  padding: '0.25rem 0.75rem',
                  borderRadius: '4px',
                  fontSize: '0.85rem',
                  backgroundColor: item.disponible ? '#d4edda' : '#f8d7da',
                  color: item.disponible ? '#155724' : '#721c24'
                }}>
                  {item.disponible ? 'Disponible' : 'No disponible'}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Menu

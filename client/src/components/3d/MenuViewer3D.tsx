import { useState, useEffect } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import MenuItem3D from './MenuItem3D'
import { MenuItem } from '../../types'

interface MenuViewer3DProps {
  items: MenuItem[]
}

export default function MenuViewer3D({ items }: MenuViewer3DProps) {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [isMobile, setIsMobile] = useState(false)
  const selectedItem = items[selectedIndex]

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768)
    }

    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  return (
    <div className="viewer-3d-container">
      {/* Lista de items a la izquierda */}
      <div className="viewer-3d-sidebar">
        <h3 style={{ marginBottom: '1rem', color: '#2c3e50' }}>Selecciona un plato</h3>
        {items.map((item, index) => (
          <div
            key={item.id}
            onClick={() => setSelectedIndex(index)}
            style={{
              padding: '1rem',
              marginBottom: '0.5rem',
              backgroundColor: selectedIndex === index ? '#3498db' : 'white',
              color: selectedIndex === index ? 'white' : '#2c3e50',
              borderRadius: '8px',
              cursor: 'pointer',
              transition: 'all 0.3s',
              boxShadow: selectedIndex === index
                ? '0 4px 12px rgba(52, 152, 219, 0.3)'
                : '0 2px 4px rgba(0,0,0,0.1)'
            }}
          >
            <div style={{ fontWeight: 'bold', marginBottom: '0.25rem' }}>{item.nombre}</div>
            <div style={{ fontSize: '0.85rem', opacity: 0.8 }}>${item.precio}</div>
          </div>
        ))}
      </div>

      {/* Visualizador 3D en el centro */}
      <div className="viewer-3d-canvas">
        <Canvas camera={{ position: isMobile ? [0, 2, 6] : [0, 2, 5], fov: isMobile ? 60 : 50 }}>
          {/* Luces básicas */}
          <ambientLight intensity={0.8} />
          <directionalLight position={[5, 5, 5]} intensity={1} />
          <directionalLight position={[-5, 3, -5]} intensity={0.5} />

          {/* Modelo 3D */}
          <MenuItem3D categoria={selectedItem.categoria} autoRotate={true} />

          {/* Controles simples */}
          <OrbitControls
            enableZoom={true}
            enablePan={false}
            minDistance={isMobile ? 4 : 3}
            maxDistance={isMobile ? 10 : 12}
          />
        </Canvas>
      </div>

      {/* Información del item a la derecha */}
      <div className="viewer-3d-info">
        <div>
          <span
            style={{
              display: 'inline-block',
              padding: '0.5rem 1rem',
              backgroundColor: '#3498db',
              color: 'white',
              borderRadius: '6px',
              fontSize: '0.85rem',
              fontWeight: 'bold'
            }}
          >
            {selectedItem.categoria}
          </span>
        </div>

        <h2 style={{ margin: 0, color: '#2c3e50' }}>{selectedItem.nombre}</h2>

        <p style={{ color: '#7f8c8d', lineHeight: '1.6', margin: 0 }}>
          {selectedItem.descripcion}
        </p>

        <div
          style={{
            padding: '1rem',
            backgroundColor: '#27ae60',
            borderRadius: '8px',
            textAlign: 'center'
          }}
        >
          <div style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.9)', marginBottom: '0.25rem' }}>
            Precio
          </div>
          <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'white' }}>
            ${selectedItem.precio}
          </div>
        </div>

        <div
          style={{
            padding: '0.75rem',
            backgroundColor: selectedItem.disponible ? '#d4edda' : '#f8d7da',
            color: selectedItem.disponible ? '#155724' : '#721c24',
            borderRadius: '6px',
            textAlign: 'center',
            fontWeight: 'bold'
          }}
        >
          {selectedItem.disponible ? '✓ Disponible' : '✗ No disponible'}
        </div>

        <div
          style={{
            marginTop: 'auto',
            padding: '1rem',
            backgroundColor: 'rgba(52, 152, 219, 0.1)',
            borderRadius: '8px',
            fontSize: '0.85rem',
            color: '#7f8c8d',
            textAlign: 'center'
          }}
        >
          <strong>Tip:</strong> {isMobile
            ? 'Usa tus dedos para rotar y hacer zoom en el modelo 3D'
            : 'Usa el mouse para rotar y hacer zoom en el modelo 3D'}
        </div>
      </div>
    </div>
  )
}

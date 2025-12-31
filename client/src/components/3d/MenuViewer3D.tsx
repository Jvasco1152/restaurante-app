import { useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Environment, ContactShadows, PerspectiveCamera } from '@react-three/drei'
import MenuItem3D from './MenuItem3D'
import { MenuItem } from '../../types'

interface MenuViewer3DProps {
  items: MenuItem[]
}

export default function MenuViewer3D({ items }: MenuViewer3DProps) {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const selectedItem = items[selectedIndex]

  return (
    <div style={{ display: 'flex', height: '80vh', gap: '1rem', flexDirection: 'row' }}>
      {/* Lista de items a la izquierda */}
      <div
        style={{
          width: '300px',
          overflowY: 'auto',
          backgroundColor: '#f8f9fa',
          borderRadius: '12px',
          padding: '1rem'
        }}
      >
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
      <div style={{ flex: 1, borderRadius: '12px', overflow: 'hidden', backgroundColor: '#ecf0f1' }}>
        <Canvas shadows dpr={[1, 2]}>
          <PerspectiveCamera makeDefault position={[0, 2, 5]} fov={50} />

          {/* Luces */}
          <ambientLight intensity={0.4} />
          <spotLight
            position={[10, 10, 10]}
            angle={0.15}
            penumbra={1}
            intensity={1}
            castShadow
          />
          <pointLight position={[-10, -10, -10]} intensity={0.5} />

          {/* Modelo 3D */}
          <MenuItem3D categoria={selectedItem.categoria} autoRotate={true} />

          {/* Sombras */}
          <ContactShadows
            position={[0, -1.5, 0]}
            opacity={0.5}
            scale={10}
            blur={2}
            far={4}
          />

          {/* Ambiente */}
          <Environment preset="apartment" />

          {/* Controles */}
          <OrbitControls
            enableZoom={true}
            enablePan={false}
            minPolarAngle={0}
            maxPolarAngle={Math.PI / 2}
            autoRotate={false}
            autoRotateSpeed={2}
          />
        </Canvas>
      </div>

      {/* Información del item a la derecha */}
      <div
        style={{
          width: '300px',
          backgroundColor: '#f8f9fa',
          borderRadius: '12px',
          padding: '1.5rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem'
        }}
      >
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
          <strong>Tip:</strong> Usa el mouse para rotar y hacer zoom en el modelo 3D
        </div>
      </div>
    </div>
  )
}

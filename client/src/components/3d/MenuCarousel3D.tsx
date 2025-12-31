import { useState, useEffect, Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Environment, PerspectiveCamera } from '@react-three/drei'
import MenuCard3D from './MenuCard3D'
import { MenuItem } from '../../types'

interface MenuCarousel3DProps {
  items: MenuItem[]
}

export default function MenuCarousel3D({ items }: MenuCarousel3DProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [rotation, setRotation] = useState(0)

  const radius = 5
  const itemCount = items.length

  useEffect(() => {
    const targetRotation = -(currentIndex * (Math.PI * 2)) / itemCount
    setRotation(targetRotation)
  }, [currentIndex, itemCount])

  const nextItem = () => {
    setCurrentIndex((prev) => (prev + 1) % itemCount)
  }

  const prevItem = () => {
    setCurrentIndex((prev) => (prev - 1 + itemCount) % itemCount)
  }

  const goToItem = (index: number) => {
    setCurrentIndex(index)
  }

  return (
    <div style={{ width: '100%', height: '600px', position: 'relative' }}>
      <Canvas shadows>
        <Suspense fallback={null}>
          <PerspectiveCamera makeDefault position={[0, 0, 8]} />

          {/* Lights */}
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} intensity={1} castShadow />
          <pointLight position={[-10, -10, -5]} intensity={0.5} />
          <spotLight
            position={[0, 5, 0]}
            angle={0.3}
            penumbra={1}
            intensity={0.5}
            castShadow
          />

          {/* Carousel Group */}
          <group rotation={[0, rotation, 0]}>
            {items.map((item, index) => {
              const angle = (index * (Math.PI * 2)) / itemCount
              const x = Math.sin(angle) * radius
              const z = Math.cos(angle) * radius

              const cardRotation: [number, number, number] = [0, -angle, 0]
              const isActive = index === currentIndex
              const scale = isActive ? 1 : 0.85

              return (
                <MenuCard3D
                  key={item.id || index}
                  item={item}
                  position={[x, 0, z]}
                  rotation={cardRotation}
                  scale={scale}
                  isActive={isActive}
                />
              )
            })}
          </group>

          {/* Environment */}
          <Environment preset="sunset" />

          {/* Controls */}
          <OrbitControls
            enableZoom={true}
            enablePan={false}
            minPolarAngle={Math.PI / 3}
            maxPolarAngle={Math.PI / 2}
            minDistance={6}
            maxDistance={12}
          />
        </Suspense>
      </Canvas>

      {/* Navigation Controls */}
      <div
        style={{
          position: 'absolute',
          bottom: '20px',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          gap: '1rem',
          alignItems: 'center',
          zIndex: 10
        }}
      >
        <button
          onClick={prevItem}
          style={{
            padding: '0.75rem 1.5rem',
            backgroundColor: '#3498db',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '1rem',
            fontWeight: 'bold',
            boxShadow: '0 4px 6px rgba(0,0,0,0.2)',
            transition: 'all 0.3s'
          }}
          onMouseOver={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
          onMouseOut={(e) => (e.currentTarget.style.transform = 'scale(1)')}
        >
          ← Anterior
        </button>

        <div
          style={{
            backgroundColor: 'rgba(255,255,255,0.95)',
            padding: '0.5rem 1rem',
            borderRadius: '8px',
            fontWeight: 'bold',
            color: '#2c3e50',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
          }}
        >
          {currentIndex + 1} / {itemCount}
        </div>

        <button
          onClick={nextItem}
          style={{
            padding: '0.75rem 1.5rem',
            backgroundColor: '#3498db',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '1rem',
            fontWeight: 'bold',
            boxShadow: '0 4px 6px rgba(0,0,0,0.2)',
            transition: 'all 0.3s'
          }}
          onMouseOver={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
          onMouseOut={(e) => (e.currentTarget.style.transform = 'scale(1)')}
        >
          Siguiente →
        </button>
      </div>

      {/* Dots Navigation */}
      <div
        style={{
          position: 'absolute',
          bottom: '80px',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          gap: '0.5rem',
          zIndex: 10,
          flexWrap: 'wrap',
          justifyContent: 'center',
          maxWidth: '80%'
        }}
      >
        {items.map((_, index) => (
          <button
            key={index}
            onClick={() => goToItem(index)}
            style={{
              width: currentIndex === index ? '30px' : '12px',
              height: '12px',
              borderRadius: '6px',
              border: 'none',
              backgroundColor: currentIndex === index ? '#3498db' : 'rgba(255,255,255,0.5)',
              cursor: 'pointer',
              transition: 'all 0.3s',
              boxShadow: currentIndex === index ? '0 2px 4px rgba(52,152,219,0.5)' : 'none'
            }}
          />
        ))}
      </div>

      {/* Current Item Info */}
      <div
        style={{
          position: 'absolute',
          top: '20px',
          left: '50%',
          transform: 'translateX(-50%)',
          backgroundColor: 'rgba(255,255,255,0.95)',
          padding: '1rem 2rem',
          borderRadius: '12px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
          textAlign: 'center',
          maxWidth: '500px',
          zIndex: 10
        }}
      >
        <h3 style={{ margin: '0 0 0.5rem 0', color: '#2c3e50', fontSize: '1.3rem' }}>
          {items[currentIndex]?.nombre}
        </h3>
        <p style={{ margin: 0, color: '#7f8c8d', fontSize: '0.9rem' }}>
          Usa las flechas o arrastra para navegar
        </p>
      </div>
    </div>
  )
}

import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

interface MenuItem3DProps {
  categoria: string
  autoRotate?: boolean
}

export default function MenuItem3D({ categoria, autoRotate = false }: MenuItem3DProps) {
  const groupRef = useRef<THREE.Group>(null)

  useFrame((_state, delta) => {
    if (groupRef.current && autoRotate) {
      groupRef.current.rotation.y += delta * 0.3
    }
  })

  // Diferentes modelos según la categoría
  const renderModel = () => {
    switch (categoria) {
      case 'ENTRADA':
        // Bowl con ingredientes
        return (
          <group ref={groupRef}>
            {/* Bowl */}
            <mesh position={[0, 0, 0]}>
              <cylinderGeometry args={[1.2, 1, 0.3, 32]} />
              <meshStandardMaterial color="#8B4513" />
            </mesh>
            {/* Ingredientes */}
            <mesh position={[-0.3, 0.3, 0]}>
              <sphereGeometry args={[0.3, 16, 16]} />
              <meshStandardMaterial color="#FF6347" />
            </mesh>
            <mesh position={[0.4, 0.25, 0.2]}>
              <sphereGeometry args={[0.25, 16, 16]} />
              <meshStandardMaterial color="#90EE90" />
            </mesh>
            <mesh position={[0, 0.35, -0.3]}>
              <sphereGeometry args={[0.2, 16, 16]} />
              <meshStandardMaterial color="#FFD700" />
            </mesh>
          </group>
        )

      case 'PRINCIPAL':
        // Plato con comida
        return (
          <group ref={groupRef}>
            {/* Plato */}
            <mesh position={[0, 0, 0]}>
              <cylinderGeometry args={[1.5, 1.4, 0.15, 32]} />
              <meshStandardMaterial color="#F5F5F5" />
            </mesh>
            {/* Proteína */}
            <mesh position={[0, 0.25, 0]}>
              <boxGeometry args={[0.8, 0.3, 0.6]} />
              <meshStandardMaterial color="#8B4513" />
            </mesh>
            {/* Guarnición */}
            <mesh position={[-0.6, 0.2, 0.3]}>
              <sphereGeometry args={[0.3, 16, 16]} />
              <meshStandardMaterial color="#FFD700" />
            </mesh>
            <mesh position={[0.6, 0.2, 0]}>
              <cylinderGeometry args={[0.25, 0.25, 0.3, 16]} />
              <meshStandardMaterial color="#90EE90" />
            </mesh>
          </group>
        )

      case 'POSTRE':
        // Pastel
        return (
          <group ref={groupRef}>
            {/* Base */}
            <mesh position={[0, 0.2, 0]}>
              <cylinderGeometry args={[0.8, 0.8, 0.4, 32]} />
              <meshStandardMaterial color="#F4A460" />
            </mesh>
            {/* Capa media */}
            <mesh position={[0, 0.55, 0]}>
              <cylinderGeometry args={[0.75, 0.75, 0.3, 32]} />
              <meshStandardMaterial color="#FFE4E1" />
            </mesh>
            {/* Cereza */}
            <mesh position={[0, 0.85, 0]}>
              <sphereGeometry args={[0.15, 16, 16]} />
              <meshStandardMaterial color="#FF0000" />
            </mesh>
          </group>
        )

      case 'BEBIDA':
        // Vaso
        return (
          <group ref={groupRef}>
            {/* Vaso */}
            <mesh position={[0, 0.75, 0]}>
              <cylinderGeometry args={[0.4, 0.5, 1.5, 32]} />
              <meshStandardMaterial color="#87CEEB" opacity={0.5} transparent />
            </mesh>
            {/* Líquido */}
            <mesh position={[0, 0.6, 0]}>
              <cylinderGeometry args={[0.38, 0.45, 1.2, 32]} />
              <meshStandardMaterial color="#FFA500" />
            </mesh>
            {/* Pajita */}
            <mesh position={[0.3, 1.2, 0]} rotation={[0, 0, 0.3]}>
              <cylinderGeometry args={[0.05, 0.05, 1.8, 16]} />
              <meshStandardMaterial color="#FF69B4" />
            </mesh>
          </group>
        )

      default:
        return (
          <group ref={groupRef}>
            <mesh>
              <sphereGeometry args={[1, 32, 32]} />
              <meshStandardMaterial color="#cccccc" />
            </mesh>
          </group>
        )
    }
  }

  return renderModel()
}

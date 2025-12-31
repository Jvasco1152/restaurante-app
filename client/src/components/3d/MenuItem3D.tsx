import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Sphere, Cylinder, Box, Cone } from '@react-three/drei'
import * as THREE from 'three'

interface MenuItem3DProps {
  categoria: string
  autoRotate?: boolean
}

export default function MenuItem3D({ categoria, autoRotate = false }: MenuItem3DProps) {
  const groupRef = useRef<THREE.Group>(null)

  useFrame((state, delta) => {
    if (groupRef.current && autoRotate) {
      groupRef.current.rotation.y += delta * 0.3
    }
  })

  // Diferentes modelos según la categoría
  const renderModel = () => {
    switch (categoria) {
      case 'ENTRADA':
        // Ensalada/Bowl
        return (
          <group ref={groupRef}>
            <Cylinder args={[1.2, 1, 0.3, 32]} position={[0, 0, 0]}>
              <meshStandardMaterial color="#8B4513" />
            </Cylinder>
            <Sphere args={[0.3, 16, 16]} position={[-0.3, 0.3, 0]}>
              <meshStandardMaterial color="#FF6347" />
            </Sphere>
            <Sphere args={[0.25, 16, 16]} position={[0.4, 0.25, 0.2]}>
              <meshStandardMaterial color="#90EE90" />
            </Sphere>
            <Sphere args={[0.2, 16, 16]} position={[0, 0.35, -0.3]}>
              <meshStandardMaterial color="#FFD700" />
            </Sphere>
            <Sphere args={[0.22, 16, 16]} position={[-0.4, 0.28, 0.3]}>
              <meshStandardMaterial color="#FF4500" />
            </Sphere>
          </group>
        )

      case 'PRINCIPAL':
        // Plato con comida
        return (
          <group ref={groupRef}>
            <Cylinder args={[1.5, 1.4, 0.15, 32]} position={[0, 0, 0]}>
              <meshStandardMaterial color="#F5F5F5" />
            </Cylinder>
            {/* Proteína */}
            <Box args={[0.8, 0.3, 0.6]} position={[0, 0.25, 0]}>
              <meshStandardMaterial color="#8B4513" />
            </Box>
            {/* Guarnición 1 */}
            <Sphere args={[0.3, 16, 16]} position={[-0.6, 0.2, 0.3]}>
              <meshStandardMaterial color="#FFD700" />
            </Sphere>
            {/* Guarnición 2 */}
            <Cylinder args={[0.25, 0.25, 0.3, 16]} position={[0.6, 0.2, 0]}>
              <meshStandardMaterial color="#90EE90" />
            </Cylinder>
          </group>
        )

      case 'POSTRE':
        // Pastel/Postre
        return (
          <group ref={groupRef}>
            {/* Base */}
            <Cylinder args={[0.8, 0.8, 0.4, 32]} position={[0, 0.2, 0]}>
              <meshStandardMaterial color="#F4A460" />
            </Cylinder>
            {/* Capa media */}
            <Cylinder args={[0.75, 0.75, 0.3, 32]} position={[0, 0.55, 0]}>
              <meshStandardMaterial color="#FFE4E1" />
            </Cylinder>
            {/* Topping */}
            <Sphere args={[0.15, 16, 16]} position={[0, 0.85, 0]}>
              <meshStandardMaterial color="#FF0000" />
            </Sphere>
          </group>
        )

      case 'BEBIDA':
        // Vaso/Copa
        return (
          <group ref={groupRef}>
            <Cylinder args={[0.4, 0.5, 1.5, 32]} position={[0, 0.75, 0]}>
              <meshStandardMaterial
                color="#87CEEB"
                transparent
                opacity={0.3}
              />
            </Cylinder>
            {/* Líquido */}
            <Cylinder args={[0.38, 0.45, 1.2, 32]} position={[0, 0.6, 0]}>
              <meshStandardMaterial color="#FFA500" />
            </Cylinder>
            {/* Pajita */}
            <Cylinder args={[0.05, 0.05, 1.8, 16]} position={[0.3, 1.2, 0]} rotation={[0, 0, 0.3]}>
              <meshStandardMaterial color="#FF69B4" />
            </Cylinder>
          </group>
        )

      default:
        return (
          <group ref={groupRef}>
            <Sphere args={[1, 32, 32]}>
              <meshStandardMaterial color="#cccccc" />
            </Sphere>
          </group>
        )
    }
  }

  return renderModel()
}

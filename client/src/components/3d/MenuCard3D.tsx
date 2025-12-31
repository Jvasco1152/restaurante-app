import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { RoundedBox, Text } from '@react-three/drei'
import { MenuItem } from '../../types'
import * as THREE from 'three'

interface MenuCard3DProps {
  item: MenuItem
  position: [number, number, number]
  rotation: [number, number, number]
  scale: number
  isActive: boolean
}

export default function MenuCard3D({ item, position, rotation, scale, isActive }: MenuCard3DProps) {
  const meshRef = useRef<THREE.Mesh>(null)
  const groupRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (groupRef.current && isActive) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1
    }
  })

  const getCategoryColor = (categoria: string): string => {
    const colors: { [key: string]: string } = {
      ENTRADA: '#3498db',
      PRINCIPAL: '#e74c3c',
      POSTRE: '#f39c12',
      BEBIDA: '#2ecc71'
    }
    return colors[categoria] || '#95a5a6'
  }

  return (
    <group ref={groupRef} position={position} rotation={rotation} scale={scale}>
      {/* Card Background */}
      <RoundedBox args={[2, 2.8, 0.1]} radius={0.05}>
        <meshStandardMaterial
          color={isActive ? '#ffffff' : '#f0f0f0'}
          roughness={0.3}
          metalness={0.1}
        />
      </RoundedBox>

      {/* Category Badge */}
      <RoundedBox args={[1.6, 0.3, 0.12]} radius={0.05} position={[0, 1.2, 0.06]}>
        <meshStandardMaterial color={getCategoryColor(item.categoria)} />
      </RoundedBox>

      {/* Category Text */}
      <Text
        position={[0, 1.2, 0.13]}
        fontSize={0.12}
        color="white"
        anchorX="center"
        anchorY="middle"
      >
        {item.categoria}
      </Text>

      {/* Item Name */}
      <Text
        position={[0, 0.7, 0.06]}
        fontSize={0.18}
        color="#2c3e50"
        anchorX="center"
        anchorY="middle"
        maxWidth={1.8}
      >
        {item.nombre}
      </Text>

      {/* Description */}
      <Text
        position={[0, 0.1, 0.06]}
        fontSize={0.1}
        color="#7f8c8d"
        anchorX="center"
        anchorY="middle"
        maxWidth={1.6}
        textAlign="center"
      >
        {item.descripcion.length > 80
          ? item.descripcion.substring(0, 80) + '...'
          : item.descripcion}
      </Text>

      {/* Price */}
      <RoundedBox args={[1.2, 0.4, 0.12]} radius={0.05} position={[0, -0.9, 0.06]}>
        <meshStandardMaterial color="#27ae60" />
      </RoundedBox>

      <Text
        position={[0, -0.9, 0.13]}
        fontSize={0.2}
        color="white"
        anchorX="center"
        anchorY="middle"
      >
        ${item.precio}
      </Text>

      {/* Disponible Indicator */}
      <mesh position={[0.8, -1.2, 0.06]}>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshStandardMaterial color={item.disponible ? '#27ae60' : '#e74c3c'} />
      </mesh>

      <Text
        position={[0.2, -1.2, 0.06]}
        fontSize={0.08}
        color={item.disponible ? '#27ae60' : '#e74c3c'}
        anchorX="center"
        anchorY="middle"
      >
        {item.disponible ? 'Disponible' : 'Agotado'}
      </Text>

      {/* Glow effect for active card */}
      {isActive && (
        <RoundedBox args={[2.2, 3, 0.05]} radius={0.05} position={[0, 0, -0.1]}>
          <meshStandardMaterial
            color="#3498db"
            transparent
            opacity={0.2}
            emissive="#3498db"
            emissiveIntensity={0.5}
          />
        </RoundedBox>
      )}
    </group>
  )
}

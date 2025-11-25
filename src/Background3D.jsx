import React, { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Sphere, MeshDistortMaterial, Float, Stars } from '@react-three/drei'

function AnimatedSphere({ position, color, scale }) {
    const meshRef = useRef()

    useFrame((state) => {
        const t = state.clock.getElapsedTime()
        meshRef.current.rotation.x = t * 0.2
        meshRef.current.rotation.y = t * 0.3
    })

    return (
        <Float speed={2} rotationIntensity={1} floatIntensity={2}>
            <Sphere args={[1, 32, 32]} position={position} scale={scale} ref={meshRef}>
                <MeshDistortMaterial
                    color={color}
                    attach="material"
                    distort={0.4}
                    speed={2}
                    roughness={0.2}
                    metalness={0.8}
                />
            </Sphere>
        </Float>
    )
}

export default function Background3D() {
    return (
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0, pointerEvents: 'none' }}>
            <Canvas camera={{ position: [0, 0, 5] }}>
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} intensity={1} color="#ff0055" />
                <pointLight position={[-10, -10, -10]} intensity={1} color="#00ffff" />

                <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />

                <AnimatedSphere position={[-2, 1, -2]} color="#8b5cf6" scale={1.2} />
                <AnimatedSphere position={[2, -1, -1]} color="#ec4899" scale={1} />
                <AnimatedSphere position={[0, 2, -3]} color="#06b6d4" scale={0.8} />
            </Canvas>
        </div>
    )
}

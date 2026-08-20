import { useRef, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Sphere, MeshDistortMaterial, Trail, Float } from '@react-three/drei';
import * as THREE from 'three';
import gsap from 'gsap';

export function EyeModel({ scrollState }: { scrollState: number }) {
  const groupRef = useRef<THREE.Group>(null);
  const pupilRef = useRef<THREE.Mesh>(null);
  const irisRef = useRef<THREE.Mesh>(null);
  const { mouse, viewport } = useThree();

  const isMobile = viewport.width < 768; // basic check, though actual viewport units in R3F refer to scene units. We can just use aspect.

  const particles = useMemo(() => Array.from({ length: 20 }).map(() => [
    (Math.random() - 0.5) * 10,
    (Math.random() - 0.5) * 10,
    (Math.random() - 0.5) * 10
  ] as [number, number, number]), []);

  useFrame((state, delta) => {
    if (!groupRef.current) return;

    // Smooth follow mouse if not mobile and in initial state
    if (scrollState < 1 && viewport.width > 4) {
      const targetX = (mouse.x * viewport.width) / 10;
      const targetY = (mouse.y * viewport.height) / 10;
      
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetX, 0.05);
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, -targetY, 0.05);
      
      // Pupil react
      if (pupilRef.current) {
        const distance = Math.sqrt(mouse.x * mouse.x + mouse.y * mouse.y);
        const targetScale = 1 - distance * 0.2;
        pupilRef.current.scale.setScalar(THREE.MathUtils.lerp(pupilRef.current.scale.x, Math.max(0.6, targetScale), 0.1));
      }
    } else {
      // Auto rotation for mobile or scrolled states
      groupRef.current.rotation.y += delta * 0.2;
    }
    
    if (irisMaterial) {
      irisMaterial.wireframe = scrollState > 2 && scrollState < 5;
    }
  });

  // Create custom procedural textures or use materials
  const scleraMaterial = useMemo(() => new THREE.MeshPhysicalMaterial({
    color: '#F3EFE7',
    roughness: 0.2,
    metalness: 0.1,
    clearcoat: 1.0,
    clearcoatRoughness: 0.1,
  }), []);

  const irisMaterial = useMemo(() => new THREE.MeshStandardMaterial({
    color: '#6E675E', // muted dark tone instead of blue
    roughness: 0.4,
    metalness: 0.1,
    wireframe: false,
  }), []);

  return (
    <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
      <group ref={groupRef}>
        {/* Sclera */}
        <mesh material={scleraMaterial}>
          <sphereGeometry args={[2, 64, 64]} />
        </mesh>
        
        {/* Iris */}
        <mesh ref={irisRef} position={[0, 0, 1.8]} material={irisMaterial} scale={[0.9, 0.9, 0.3]}>
          <sphereGeometry args={[1, 64, 64]} />
        </mesh>
        
        {/* Pupil */}
        <mesh ref={pupilRef} position={[0, 0, 2.05]}>
          <circleGeometry args={[0.4, 32]} />
          <meshBasicMaterial color="#0B0B0A" />
        </mesh>

        {/* Cornea (Transparent outer layer) */}
        <mesh position={[0, 0, scrollState === 2 ? 0.5 : 0]}>
          <sphereGeometry args={[2.05, 64, 64]} />
          <meshPhysicalMaterial 
            color="#ffffff"
            transmission={0.95}
            opacity={1}
            metalness={0}
            roughness={0}
            ior={1.4}
            thickness={0.5}
            envMapIntensity={1}
          />
        </mesh>

        {/* Laser scan effect */}
        {scrollState >= 3 && scrollState <= 4 && (
          <mesh position={[0, 0, 2.2]}>
            <torusGeometry args={[1.5, 0.02, 16, 100]} />
            <meshBasicMaterial color="#B9985A" />
          </mesh>
        )}
      </group>

      {/* Floating particles */}
      {scrollState < 2 && (
        <group>
          {particles.map((pos, i) => (
            <mesh 
              key={i} 
              position={pos}
            >
              <sphereGeometry args={[0.05, 8, 8]} />
              <meshBasicMaterial color="#B9985A" transparent opacity={0.5} />
            </mesh>
          ))}
        </group>
      )}
    </Float>
  );
}

import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Ring, Line, Sphere } from '@react-three/drei';
import * as THREE from 'three';

function ScannerModel() {
  const groupRef = useRef<THREE.Group>(null);
  const scanLineRef = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.2;
      groupRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    }
    if (scanLineRef.current) {
      scanLineRef.current.position.y = Math.sin(state.clock.elapsedTime * 2) * 1.5;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <group ref={groupRef} rotation={[Math.PI / 4, 0, 0]}>
        {/* Outer rings */}
        {[0, 1, 2].map((i) => (
          <mesh key={i} rotation={[-Math.PI / 2, 0, 0]} position={[0, (i - 1) * 0.5, 0]}>
            <torusGeometry args={[2 - i * 0.2, 0.01, 16, 100]} />
            <meshBasicMaterial color={i === 1 ? "#B9985A" : "#D6C29A"} transparent opacity={0.3 + i * 0.2} />
          </mesh>
        ))}

        {/* Central Core */}
        <mesh>
          <sphereGeometry args={[0.5, 32, 32]} />
          <meshBasicMaterial color="#141310" wireframe transparent opacity={0.2} />
        </mesh>
        
        {/* Core glow */}
        <mesh>
          <sphereGeometry args={[0.2, 32, 32]} />
          <meshBasicMaterial color="#B9985A" />
        </mesh>

        {/* Scanning beam */}
        <group ref={scanLineRef}>
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <circleGeometry args={[2.5, 64]} />
            <meshBasicMaterial color="#B9985A" transparent opacity={0.1} side={THREE.DoubleSide} />
          </mesh>
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <ringGeometry args={[2.45, 2.5, 64]} />
            <meshBasicMaterial color="#B9985A" transparent opacity={0.8} side={THREE.DoubleSide} />
          </mesh>
        </group>

        {/* Data particles */}
        <group>
          {Array.from({ length: 40 }).map((_, i) => (
            <mesh 
              key={i} 
              position={[
                (Math.random() - 0.5) * 4,
                (Math.random() - 0.5) * 4,
                (Math.random() - 0.5) * 4
              ]}
            >
              <sphereGeometry args={[0.02, 4, 4]} />
              <meshBasicMaterial color="#F7FAFC" transparent opacity={Math.random()} />
            </mesh>
          ))}
        </group>
      </group>
    </Float>
  );
}

export function LaserTech() {
  const stats = [
    { label: "diagnostic precision", value: "0.01 mm" },
    { label: "corneal mapping", value: "3D" },
    { label: "treatment", value: "Wavefront-guided" },
    { label: "eye tracking", value: "Real-time" }
  ];

  return (
    <section id="technology" className="py-32 relative bg-oculis-navy text-oculis-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          
          <div className="w-full lg:w-1/2">
            <h2 className="font-serif text-5xl md:text-6xl font-light mb-8 leading-tight">
              Technology that sees<br />
              <span className="italic text-oculis-silver">beyond the surface.</span>
            </h2>
            <p className="text-lg text-oculis-silver mb-12 text-balance leading-relaxed">
              Our diagnostic and laser systems capture thousands of measurements to create a treatment plan designed around the unique structure of your eyes.
            </p>
            
            <div className="grid grid-cols-2 gap-x-8 gap-y-12">
              {stats.map((stat, i) => (
                <div key={i} className="relative">
                  <div className="absolute -left-4 top-2 w-px h-full bg-gradient-to-b from-oculis-cyan/50 to-transparent" />
                  <div className="text-3xl md:text-4xl font-light text-oculis-white mb-2 tracking-tight">{stat.value}</div>
                  <div className="text-xs uppercase tracking-widest text-oculis-silver">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="w-full lg:w-1/2 h-[500px] lg:h-[700px] relative">
            {/* Background glow */}
            <div className="absolute inset-0 bg-oculis-cyan/5 blur-[100px] rounded-full pointer-events-none" />
            <Canvas camera={{ position: [0, 0, 6], fov: 45 }} dpr={[1, 2]}>
              <ScannerModel />
            </Canvas>
          </div>

        </div>
      </div>
    </section>
  );
}

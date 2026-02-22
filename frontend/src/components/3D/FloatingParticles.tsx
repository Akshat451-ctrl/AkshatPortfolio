// import { useRef, useMemo } from 'react';
// import { Canvas, useFrame } from '@react-three/fiber';
// import * as THREE from 'three';

// const Particles = () => {
//   const pointsRef = useRef<THREE.Points>(null);

//   const particles = useMemo(() => {
//     const positions = new Float32Array(1500);
//     for (let i = 0; i < 1500; i++) {
//       positions[i * 3] = (Math.random() - 0.5) * 10;
//       positions[i * 3 + 1] = (Math.random() - 0.5) * 10;
//       positions[i * 3 + 2] = (Math.random() - 0.5) * 10;
//     }
//     return positions;
//   }, []);

//   useFrame(() => {
//     if (pointsRef.current) {
//       pointsRef.current.rotation.x += 0.0001;
//       pointsRef.current.rotation.y += 0.0002;
//     }
//   });

//   return (
//     <points ref={pointsRef}>
//       <bufferGeometry>
//         <bufferAttribute
//           attach="attributes-position"
//           count={particles.length / 3}
//           array={particles}
//           itemSize={3}
//         />
//       </bufferGeometry>
//       <pointsMaterial
//         size={0.05}
//         color="#00d4ff"
//         sizeAttenuation
//         transparent
//         opacity={0.6}
//       />
//     </points>
//   );
// };

// export const FloatingParticles = () => {
//   return (
//     <Canvas
//       camera={{ position: [0, 0, 5], fov: 75 }}
//       style={{
//         position: 'fixed',
//         top: 0,
//         left: 0,
//         width: '100%',
//         height: '100%',
//         pointerEvents: 'none',
//         zIndex: 1,
//       }}
//     >
//       <ambientLight intensity={0.3} />
//       <Particles />
//     </Canvas>
//   );
// };

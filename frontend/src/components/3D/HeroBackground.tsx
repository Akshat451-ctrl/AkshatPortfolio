// import { useRef } from 'react';
// import { Canvas, useFrame } from '@react-three/fiber';
// import { Mesh } from 'three';

// const RotatingCube = () => {
//   const meshRef = useRef<Mesh>(null);

//   useFrame(() => {
//     if (meshRef.current) {
//       meshRef.current.rotation.x += 0.005;
//       meshRef.current.rotation.y += 0.008;
//     }
//   });

//   return (
//     <mesh ref={meshRef} scale={1.5}>
//       <boxGeometry args={[2, 2, 2]} />
//       <meshStandardMaterial
//         color="#00d4ff"
//         emissive="#0099cc"
//         emissiveIntensity={0.3}
//         wireframe={false}
//       />
//     </mesh>
//   );
// };

// const FloatingTorus = ({ position, color }: { position: [number, number, number]; color: string }) => {
//   const meshRef = useRef<Mesh>(null);

//   useFrame(() => {
//     if (meshRef.current) {
//       meshRef.current.rotation.x += 0.003;
//       meshRef.current.rotation.y += 0.005;
//       meshRef.current.position.y += Math.sin(Date.now() * 0.001) * 0.01;
//     }
//   });

//   return (
//     <mesh ref={meshRef} position={position} scale={0.8}>
//       <torusGeometry args={[1, 0.4, 16, 100]} />
//       <meshStandardMaterial
//         color={color}
//         emissive={color}
//         emissiveIntensity={0.2}
//         wireframe={true}
//       />
//     </mesh>
//   );
// };

// const OrbitingSphere = () => {
//   const meshRef = useRef<Mesh>(null);

//   useFrame(() => {
//     if (meshRef.current) {
//       meshRef.current.position.x = Math.sin(Date.now() * 0.0005) * 5;
//       meshRef.current.position.z = Math.cos(Date.now() * 0.0005) * 5;
//       meshRef.current.rotation.x += 0.01;
//       meshRef.current.rotation.y += 0.01;
//     }
//   });

//   return (
//     <mesh ref={meshRef}>
//       <sphereGeometry args={[0.8, 32, 32]} />
//       <meshStandardMaterial
//         color="#ff00ff"
//         emissive="#cc00ff"
//         emissiveIntensity={0.3}
//       />
//     </mesh>
//   );
// };

// export const HeroBackground = () => {
//   return (
//     <Canvas
//       camera={{ position: [0, 0, 8], fov: 75 }}
//       style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}
//     >
//       <ambientLight intensity={0.5} />
//       <pointLight position={[10, 10, 10]} intensity={1} />
//       <pointLight position={[-10, -10, -10]} intensity={0.5} color="#00d4ff" />
      
//       <RotatingCube />
//       <FloatingTorus position={[3, 2, 0]} color="#00d4ff" />
//       <FloatingTorus position={[-3, -2, 0]} color="#ff00ff" />
//       <FloatingTorus position={[0, 0, 3]} color="#00ff88" />
//       <OrbitingSphere />
//     </Canvas>
//   );
// };

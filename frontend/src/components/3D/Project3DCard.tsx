// import { useRef } from 'react';
// import { Canvas, useFrame } from '@react-three/fiber';
// import { Mesh } from 'three';

// interface Project3DProps {
//   title: string;
// }

// const RotatingProjectBox = ({ color }: { color: string }) => {
//   const meshRef = useRef<Mesh>(null);

//   useFrame(() => {
//     if (meshRef.current) {
//       meshRef.current.rotation.x += 0.003;
//       meshRef.current.rotation.y += 0.005;
//       meshRef.current.position.y = Math.sin(Date.now() * 0.001) * 0.2;
//     }
//   });

//   return (
//     <mesh ref={meshRef} scale={1.2}>
//       <octahedronGeometry args={[1, 2]} />
//       <meshStandardMaterial
//         color={color}
//         emissive={color}
//         emissiveIntensity={0.3}
//         metalness={0.6}
//         roughness={0.4}
//         wireframe={false}
//       />
//     </mesh>
//   );
// };

// export const Project3DCard = ({ title }: Project3DProps) => {
//   const colors = ['#00d4ff', '#ff00ff', '#00ff88', '#ffa500'];
//   const color = colors[Math.floor(Math.random() * colors.length)];

//   return (
//     <div className="relative w-full h-40 rounded-xl overflow-hidden group">
//       <Canvas camera={{ position: [0, 0, 4], fov: 50 }}>
//         <ambientLight intensity={0.5} />
//         <pointLight position={[5, 5, 5]} intensity={0.8} />
//         <pointLight position={[-5, -5, -5]} intensity={0.3} color={color} />
//         <RotatingProjectBox color={color} />
//       </Canvas>
//       <div className="absolute inset-0 flex items-end justify-center pb-4 pointer-events-none bg-gradient-to-t from-black/60 to-transparent">
//         <span className="text-sm font-bold text-foreground group-hover:text-accent transition-colors">{title}</span>
//       </div>
//     </div>
//   );
// };

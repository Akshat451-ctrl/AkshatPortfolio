// import { useRef } from 'react';
// import { Canvas, useFrame } from '@react-three/fiber';
// import { Mesh } from 'three';

// interface Card3DProps {
//   color: string;
//   label: string;
// }

// const AnimatedCard = ({ color }: { color: string }) => {
//   const meshRef = useRef<Mesh>(null);
//   const targetRotation = useRef({ x: 0, y: 0 });

//   const handleMouseMove = (e: any) => {
//     const canvas = e.target.closest('canvas');
//     if (!canvas) return;
    
//     const rect = canvas.getBoundingClientRect();
//     const x = (e.clientX - rect.left) / rect.width;
//     const y = (e.clientY - rect.top) / rect.height;
    
//     targetRotation.current.x = (y - 0.5) * 0.5;
//     targetRotation.current.y = (x - 0.5) * 0.5;
//   };

//   useFrame(() => {
//     if (meshRef.current) {
//       meshRef.current.rotation.x += (targetRotation.current.x - meshRef.current.rotation.x) * 0.1;
//       meshRef.current.rotation.y += (targetRotation.current.y - meshRef.current.rotation.y) * 0.1;
//     }
//   });

//   return (
//     <mesh
//       ref={meshRef}
//       onPointerMove={handleMouseMove}
//       scale={[2, 1.2, 0.2]}
//     >
//       <boxGeometry args={[2, 1.2, 0.2]} />
//       <meshStandardMaterial
//         color={color}
//         emissive={color}
//         emissiveIntensity={0.2}
//         metalness={0.8}
//         roughness={0.2}
//       />
//     </mesh>
//   );
// };

// export const Skill3DCard = ({ color, label }: Card3DProps) => {
//   return (
//     <div className="relative w-full h-48 rounded-xl overflow-hidden glass">
//       <Canvas camera={{ position: [0, 0, 3], fov: 50 }}>
//         <ambientLight intensity={0.6} />
//         <pointLight position={[5, 5, 5]} intensity={1} color="#fff" />
//         <pointLight position={[-5, -5, -5]} intensity={0.5} color={color} />
//         <AnimatedCard color={color} />
//       </Canvas>
//       <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
//         <span className="text-xl font-bold text-foreground">{label}</span>
//       </div>
//     </div>
//   );
// };

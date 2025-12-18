"use client";

import { Canvas } from '@react-three/fiber';
import { Stars, Text } from '@react-three/drei';
import { motion } from 'framer-motion';

function Beacon() {
    return (
        <motion.mesh
            initial={{ scale: 0 }}
            animate={{ scale: [0, 1.5, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
            <ringGeometry args={[0.2, 0.3, 32]} />
            <meshBasicMaterial color="hsl(var(--primary))" transparent opacity={0.8} />
        </motion.mesh>
    );
}

const locations = [
    { name: "Salt Lake", position: [-2, 1, 0] },
    { name: "Park Street", position: [0, -1, 0] },
    { name: "New Town", position: [2.5, 0, 0] },
];

export function LocalInfrastructureMap() {
    return (
        <section id="local-infra" className="w-full h-[60vh] md:h-[80vh] bg-background relative py-20 md:py-32">
             <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center pointer-events-none">
                <h2 className="font-headline text-3xl md:text-5xl text-foreground !leading-tight max-w-3xl">
                    Modern Intelligence. Heritage Values.
                </h2>
                <p className="text-muted-foreground mt-4 max-w-xl">
                    We are here, on the ground, powering Kolkata&apos;s leading institutions with secure, reliable AI infrastructure.
                </p>
            </div>
            <Canvas camera={{ position: [0, 0, 10], fov: 50 }}>
                <ambientLight intensity={0.5} />
                <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
                {locations.map((loc, i) => (
                    <group key={i} position={loc.position as [number, number, number]}>
                        <Beacon />
                        <Text
                            position={[0, -0.6, 0]}
                            fontSize={0.4}
                            color="hsl(var(--primary))"
                            anchorX="center"
                            anchorY="middle"
                            font="/fonts/JetBrainsMono-Regular.ttf"
                        >
                            {loc.name}
                        </Text>
                    </group>
                ))}
            </Canvas>
        </section>
    );
}

"use client";

import { motion, useAnimationControls } from "framer-motion";
import { useEffect, useState } from "react";

const gadgets = [
    {
        id: 1,
        name: "Premium Headset",
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=600&auto=format&fit=crop",
        color: "bg-blue-500",
    },
    {
        id: 2,
        name: "Flagship Phone",
        image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=600&auto=format&fit=crop",
        color: "bg-purple-500",
    },
    {
        id: 3,
        name: "Pro Smartwatch",
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=600&auto=format&fit=crop",
        color: "bg-emerald-500",
    },
];

export function GadgetShowcase() {
    const [activeIndex, setActiveIndex] = useState(0);
    const controls = useAnimationControls();

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveIndex((prev) => (prev + 1) % gadgets.length);
        }, 4000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="relative h-[450px] w-full lg:h-[600px] flex items-center justify-center perspective-1000">
            {/* Background elements */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 rounded-3xl" />

            {/* Circling Gadgets */}
            <div className="relative w-full h-full flex items-center justify-center">
                {gadgets.map((gadget, index) => {
                    const offset = (index - activeIndex + gadgets.length) % gadgets.length;

                    // Positions for the circling effect
                    const positions = [
                        { z: 0, scale: 1, opacity: 1, x: 0, rotateY: 0, zIndex: 30 }, // Center
                        { z: -100, scale: 0.7, opacity: 0.4, x: 180, rotateY: -30, zIndex: 20 }, // Right
                        { z: -100, scale: 0.7, opacity: 0.4, x: -180, rotateY: 30, zIndex: 10 }, // Left
                    ];

                    const pos = positions[offset];

                    return (
                        <motion.div
                            key={gadget.id}
                            initial={false}
                            animate={{
                                x: pos.x,
                                z: pos.z,
                                scale: pos.scale,
                                opacity: pos.opacity,
                                rotateY: pos.rotateY,
                                zIndex: pos.zIndex,
                            }}
                            transition={{
                                type: "spring",
                                stiffness: 260,
                                damping: 20,
                            }}
                            className="absolute cursor-pointer"
                        >
                            <motion.div
                                whileHover={{ scale: 1.05, y: -10 }}
                                className="relative group"
                            >
                                {/* Glow Effect */}
                                <div className={`absolute -inset-4 rounded-full opacity-20 blur-2xl transition-opacity group-hover:opacity-40 ${gadget.color}`} />

                                {/* Image Container */}
                                <div className="relative h-64 w-64 lg:h-80 lg:w-80 rounded-2xl bg-white shadow-2xl overflow-hidden border border-white/20 backdrop-blur-sm">
                                    <img
                                        src={gadget.image}
                                        alt={gadget.name}
                                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-6">
                                        <p className="text-white font-bold text-xl">{gadget.name}</p>
                                        <p className="text-white/80 text-sm">Preview Gadget</p>
                                    </div>
                                </div>
                            </motion.div>
                        </motion.div>
                    );
                })}
            </div>

            {/* Navigation Dots */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-40">
                {gadgets.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setActiveIndex(index)}
                        className={`h-2 w-2 rounded-full transition-all duration-300 ${activeIndex === index ? "w-8 bg-primary" : "bg-gray-300 hover:bg-gray-400"
                            }`}
                    />
                ))}
            </div>

        </div>
    );
}

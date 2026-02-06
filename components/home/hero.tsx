"use client";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { motion } from "framer-motion";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

export function Hero() {
    return (
        <section className="relative overflow-hidden bg-white pb-16 pt-24 lg:pb-32 lg:pt-40">
            {/* Decorative gradient background */}
            <div className="absolute -top-24 right-0 -z-10 h-[500px] w-[500px] rounded-full bg-primary/5 blur-3xl" />
            <div className="absolute -bottom-24 left-0 -z-10 h-[500px] w-[500px] rounded-full bg-secondary/5 blur-3xl" />

            <Container>
                <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
                    {/* Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="inline-flex items-center rounded-full bg-primary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary">
                            Summer Sale: Up to 40% Off
                        </div>
                        <h1 className="mt-8 text-5xl font-extrabold tracking-tight text-secondary sm:text-6xl lg:text-7xl">
                            Mobile & Laptop <br />
                            <span className="text-primary">Accessories</span>
                        </h1>
                        <p className="mt-6 text-xl leading-relaxed text-gray-500 max-w-lg">
                            Elevate your tech experience with premium quality gear. Best prices for students and office users in India.
                        </p>
                        <div className="mt-10 flex flex-wrap gap-4">
                            <Button asChild size="lg" className="h-14 px-8 text-lg font-semibold">
                                <Link href="/category/mobile">
                                    Shop Mobile
                                    <ChevronRight className="ml-2 h-5 w-5" />
                                </Link>
                            </Button>
                            <Button asChild variant="outline" size="lg" className="h-14 px-8 text-lg font-semibold">
                                <Link href="/category/laptop">
                                    Shop Laptop
                                    <ChevronRight className="ml-2 h-5 w-5" />
                                </Link>
                            </Button>
                        </div>

                        <div className="mt-12 flex items-center gap-8">
                            <div>
                                <p className="text-3xl font-bold text-secondary">50k+</p>
                                <p className="text-sm text-gray-400">Products Sold</p>
                            </div>
                            <div className="h-10 w-px bg-border" />
                            <div>
                                <p className="text-3xl font-bold text-secondary">4.8/5</p>
                                <p className="text-sm text-gray-400">Customer Rating</p>
                            </div>
                        </div>
                    </motion.div>

                    {/* Image Placeholder/Illustration */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="relative h-[450px] w-full rounded-2xl bg-gray-50 flex items-center justify-center border border-border overflow-hidden lg:h-[600px]"
                    >
                        {/* Using a placeholder for now, generic icons/shapes to make it look premium */}
                        <div className="grid grid-cols-2 gap-8 opacity-20">
                            <div className="h-32 w-32 rounded-lg bg-primary" />
                            <div className="h-32 w-32 rounded-lg bg-secondary" />
                            <div className="h-32 w-32 rounded-lg bg-secondary" />
                            <div className="h-32 w-32 rounded-lg bg-primary" />
                        </div>
                        <div className="absolute inset-0 flex items-center justify-center">
                            <p className="text-sm font-medium text-gray-300 uppercase tracking-widest">Premium Tech Collection</p>
                        </div>
                    </motion.div>
                </div>
            </Container>
        </section>
    );
}

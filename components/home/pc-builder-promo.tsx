"use client";

import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Cpu, Zap, ShieldCheck, ChevronRight } from "lucide-react";
import Link from "next/link";

export function PCBuilderPromo() {
    return (
        <section className="py-24 bg-secondary overflow-hidden relative group">
            {/* Background Decorative Elements */}
            <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary/10 to-transparent skew-x-12 translate-x-32" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/20 blur-[120px] rounded-full" />

            <Container className="relative">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="space-y-8"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary">
                            <Cpu size={16} className="animate-pulse" />
                            <span className="text-xs font-black uppercase tracking-[0.2em]">New Service</span>
                        </div>

                        <div className="space-y-4">
                            <h2 className="text-5xl lg:text-7xl font-black text-white leading-[1.1] tracking-tighter">
                                Master your <br />
                                <span className="text-primary italic">performance.</span>
                            </h2>
                            <p className="text-xl text-gray-400 max-w-lg leading-relaxed">
                                Don't settle for off-the-shelf. Build a high-performance custom PC with premium components and professional assembly.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pb-4">
                            {[
                                { icon: Zap, text: "Curated Performance Parts" },
                                { icon: ShieldCheck, text: "3-Year Build Warranty" }
                            ].map((item, i) => (
                                <div key={i} className="flex items-center gap-3 text-gray-300">
                                    <div className="h-8 w-8 rounded-lg bg-white/5 flex items-center justify-center text-primary border border-white/10">
                                        <item.icon size={18} />
                                    </div>
                                    <span className="text-sm font-bold tracking-tight">{item.text}</span>
                                </div>
                            ))}
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4 pt-4">
                            <Button size="lg" className="h-16 px-10 text-lg font-bold rounded-2xl group relative overflow-hidden" asChild>
                                <Link href="/pc-builder">
                                    Start Building Now
                                    <ChevronRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                                </Link>
                            </Button>
                            <Button variant="outline" size="lg" className="h-16 px-10 text-lg font-bold rounded-2xl border-white/10 text-white hover:bg-white/5 bg-transparent" asChild>
                                <Link href="/pc-builds">View Pre-builds</Link>
                            </Button>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, rotateY: 20 }}
                        whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="relative hidden lg:block"
                    >
                        <div className="relative aspect-[4/5] w-full max-w-[480px] mx-auto">
                            {/* Visual representation of a PC component / build */}
                            <div className="absolute inset-0 rounded-[3rem] border border-white/10 bg-gradient-to-br from-white/10 to-transparent backdrop-blur-3xl p-12 overflow-hidden group-hover:border-primary/30 transition-colors duration-500">
                                <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary/40 blur-[100px] rounded-full group-hover:bg-primary/60 transition-colors" />

                                <div className="h-full w-full rounded-2xl border border-white/5 bg-black/40 p-8 flex flex-col justify-between">
                                    <div className="space-y-6">
                                        <div className="h-1 w-24 bg-primary rounded-full" />
                                    </div>

                                    <div className="flex items-end justify-between">
                                        <div className="space-y-4 uppercase tracking-[0.2em]">
                                            <p className="text-[10px] font-black text-primary">System Status</p>
                                            <p className="text-4xl font-black text-white italic">ULTRA</p>
                                        </div>
                                        <div className="h-20 w-20 rounded-2xl border border-white/10 bg-gradient-to-tr from-primary/20 to-transparent flex items-center justify-center">
                                            <Cpu size={40} className="text-primary" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </Container>
        </section>
    );
}

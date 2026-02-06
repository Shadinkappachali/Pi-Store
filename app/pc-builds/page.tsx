"use client";

import { Container } from "@/components/ui/container";
import { PREBUILT_CONFIGS, PC_COMPONENTS, ComponentCategory } from "@/constants/pc-components";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Edit3, ChevronRight, Zap, Target, ShieldCheck } from "lucide-react";
import Link from "next/link";

export default function PCBuildsPage() {
    return (
        <div className="min-h-screen bg-gray-50/50 pt-32 pb-24 font-poppins">
            <Container>
                <div className="flex flex-col gap-16">
                    {/* Header */}
                    <div className="text-center max-w-3xl mx-auto space-y-6">
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-5xl lg:text-7xl font-extrabold text-secondary tracking-tight"
                        >
                            Professional <span className="text-primary italic">Builds.</span>
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-xl text-gray-500"
                        >
                            Don't know where to start? Choose one of our expert-curated configurations
                            and customize it to match your exact needs.
                        </motion.p>
                    </div>

                    {/* Build Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {PREBUILT_CONFIGS.map((build, i) => {
                            // Calculate total price for the prebuild
                            const totalPrice = Object.entries(build.components).reduce((sum, [cat, id]) => {
                                const component = PC_COMPONENTS[cat as ComponentCategory].find(c => c.id === id);
                                return sum + (component?.price || 0);
                            }, 0);

                            return (
                                <motion.div
                                    key={build.id}
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                    className="group flex flex-col bg-white rounded-[2.5rem] border border-border overflow-hidden shadow-sm hover:shadow-2xl hover:border-primary/50 transition-all duration-500"
                                >
                                    {/* Image Area */}
                                    <div className="relative aspect-[4/3] bg-gray-100 overflow-hidden">
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10" />
                                        <div className="absolute top-6 left-6 z-20">
                                            <span className="px-4 py-2 rounded-full bg-primary text-white text-[10px] font-black uppercase tracking-widest shadow-lg">
                                                {build.category}
                                            </span>
                                        </div>
                                        {/* Placeholder for real images */}
                                        <div className="w-full h-full flex items-center justify-center text-gray-400 font-bold uppercase tracking-widest bg-secondary/5">
                                            {build.name.split(' ')[0]} PRO
                                        </div>
                                        <div className="absolute bottom-6 left-6 right-6 z-20">
                                            <p className="text-2xl font-black text-white">{build.name}</p>
                                        </div>
                                    </div>

                                    {/* Content Area */}
                                    <div className="p-8 flex flex-col flex-1">
                                        <p className="text-sm text-gray-500 leading-relaxed mb-8 h-12 overflow-hidden">
                                            {build.description}
                                        </p>

                                        <div className="space-y-4 mb-8">
                                            {Object.entries(build.components).slice(0, 4).map(([cat, id]) => {
                                                const component = PC_COMPONENTS[cat as ComponentCategory].find(c => c.id === id);
                                                return (
                                                    <div key={cat} className="flex justify-between items-center text-xs">
                                                        <span className="text-gray-400 font-medium uppercase tracking-wider">{cat}</span>
                                                        <span className="text-secondary font-bold truncate max-w-[150px]">{component?.name}</span>
                                                    </div>
                                                );
                                            })}
                                            <p className="text-[10px] text-primary font-bold tracking-widest uppercase">+ {Object.keys(build.components).length - 4} More Components</p>
                                        </div>

                                        <div className="mt-auto border-t border-border pt-8">
                                            <div className="flex items-end justify-between mb-8">
                                                <div>
                                                    <p className="text-xs font-bold uppercase tracking-widest text-gray-400">Fixed Config Price</p>
                                                    <p className="text-3xl font-black text-secondary">₹{totalPrice.toLocaleString('en-IN')}</p>
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-2 gap-4">
                                                <Button className="h-14 rounded-2xl font-bold bg-[#25D366] hover:bg-[#20ba5a] text-white" asChild>
                                                    <a
                                                        href={`https://wa.me/919656820000?text=${encodeURIComponent(`Hi! I'd like to order the ${build.name} pre-built PC (₹${totalPrice.toLocaleString('en-IN')})`)}`}
                                                        target="_blank"
                                                    >
                                                        <ShoppingCart className="mr-2 h-5 w-5" />
                                                        Order
                                                    </a>
                                                </Button>
                                                <Button variant="outline" className="h-14 rounded-2xl font-bold border-border group" asChild>
                                                    <Link href={`/pc-builder?preset=${build.id}`}>
                                                        <Edit3 className="mr-2 h-4 w-4 transition-transform group-hover:scale-110" />
                                                        Customize
                                                    </Link>
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>

                    {/* Why Choose Pre-built Section */}
                    <div className="bg-secondary rounded-[3rem] p-12 lg:p-20 text-white relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-1/3 h-full bg-primary/5 skew-x-12 translate-x-20" />

                        <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                            <div className="space-y-8">
                                <h2 className="text-4xl lg:text-6xl font-black tracking-tighter italic">Why Pi <span className="text-primary not-italic">Builds?</span></h2>
                                <p className="text-lg text-gray-400 max-w-xl">
                                    Every pre-built system undergoes rigorous 24-hour stress testing and professional cable management to ensure maximum out-of-the-box reliability.
                                </p>
                                <div className="space-y-4">
                                    {[
                                        { icon: Zap, title: "Optimized Performance", desc: "Parts chosen for zero bottlenecks" },
                                        { icon: Target, title: "Expert Assembly", desc: "Clean aesthetics & perfect airflow" },
                                        { icon: ShieldCheck, title: "Stress Tested", desc: "Fully validated under heavy load" }
                                    ].map((item, i) => (
                                        <div key={i} className="flex gap-4">
                                            <div className="h-10 w-10 shrink-0 rounded-xl bg-primary/20 flex items-center justify-center text-primary">
                                                <item.icon size={20} />
                                            </div>
                                            <div>
                                                <p className="font-bold">{item.title}</p>
                                                <p className="text-sm text-gray-500">{item.desc}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="hidden lg:block">
                                <div className="aspect-square rounded-[2rem] border border-white/10 bg-white/5 flex items-center justify-center shadow-2xl rotate-3">
                                    <div className="text-primary/20 scale-[5]">
                                        <Zap size={100} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    );
}

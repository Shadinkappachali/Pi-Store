"use client";

import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { ShieldCheck, Zap, Globe, Users, Trophy, Heart } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

const VALUES = [
    {
        icon: ShieldCheck,
        title: "Uncompromising Quality",
        description: "Every product at Pi Store undergoes rigorous testing to ensure it meets our premium standards for durability and performance."
    },
    {
        icon: Zap,
        title: "Innovation First",
        description: "We stay ahead of the curve, sourcing the latest GaN chargers, high-speed cables, and cutting-edge laptop peripherals."
    },
    {
        icon: Users,
        title: "Customer Obsessed",
        description: "Our community of students and professionals is at the heart of everything we do. We build for your productivity."
    }
];

export default function AboutPage() {
    return (
        <div className="bg-white pb-20">
            {/* Hero Section */}
            <section className="relative overflow-hidden bg-secondary py-24 text-white">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1491933382434-500287f9b54b?q=80&w=2000')] bg-cover bg-fixed bg-center opacity-10" />
                <Container className="relative">
                    <div className="max-w-3xl">
                        <motion.span
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-sm font-bold uppercase tracking-[0.3em] text-primary"
                        >
                            Our Story
                        </motion.span>
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="mt-6 text-5xl font-extrabold lg:text-7xl"
                        >
                            Elevating your <span className="text-primary italic">digital lifestyle.</span>
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="mt-8 text-xl text-gray-400 leading-relaxed"
                        >
                            Born in 2024, Pi Store was founded with a simple mission: to bridge the gap between high-end technology and affordable pricing for the modern Indian student and professional.
                        </motion.p>
                    </div>
                </Container>
            </section>

            {/* Philosophy Section */}
            <section className="py-24">
                <Container>
                    <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:items-center">
                        <div className="space-y-8">
                            <h2 className="text-4xl font-extrabold text-secondary">Why we do what we do.</h2>
                            <p className="text-lg text-gray-500 leading-relaxed">
                                We believe that premium technology shouldn't be a luxury. Whether you're a student pulling an all-nighter or an office professional managing a high-stakes project, your accessories should never be the bottleneck.
                            </p>
                            <div className="space-y-4">
                                <div className="flex items-start gap-4 p-4 rounded-2xl bg-gray-50 border border-border/50">
                                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                                        <Trophy size={24} />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-secondary">Quality Certified</h4>
                                        <p className="text-sm text-gray-500">All Pi Store products are BIS certified and tested for Indian power conditions.</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4 p-4 rounded-2xl bg-gray-50 border border-border/50">
                                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                                        <Globe size={24} />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-secondary">Direct to Consumer</h4>
                                        <p className="text-sm text-gray-500">By removing middlemen, we provide premium quality at 40% lower prices than leading brands.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="relative">
                            <div className="aspect-[4/5] rounded-3xl bg-gray-100 overflow-hidden shadow-2xl">
                                <div className="flex h-full w-full items-center justify-center text-gray-300 font-bold uppercase tracking-widest text-sm">
                                    Premium Lifestyle Imagery
                                </div>
                            </div>
                            <div className="absolute -bottom-8 -left-8 rounded-2xl bg-primary p-8 text-white shadow-xl hidden sm:block">
                                <p className="text-5xl font-extrabold">100k+</p>
                                <p className="text-sm font-bold uppercase tracking-widest mt-2">Happy Customers</p>
                            </div>
                        </div>
                    </div>
                </Container>
            </section>

            {/* Values Grid */}
            <section className="bg-gray-50 py-24">
                <Container>
                    <div className="text-center max-w-2xl mx-auto mb-16">
                        <h2 className="text-3xl font-extrabold text-secondary lowercase">the <span className="uppercase text-primary">Pi</span> promise.</h2>
                        <p className="mt-4 text-gray-500">We stand by our products. If you're not satisfied, we're not satisfied.</p>
                    </div>
                    <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                        {VALUES.map((v, i) => {
                            const Icon = v.icon;
                            return (
                                <motion.div
                                    key={i}
                                    whileHover={{ y: -5 }}
                                    className="rounded-3xl border border-border bg-white p-8 shadow-sm transition-all"
                                >
                                    <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-secondary text-white">
                                        <Icon size={28} />
                                    </div>
                                    <h3 className="text-xl font-bold text-secondary">{v.title}</h3>
                                    <p className="mt-4 text-gray-500 leading-relaxed">{v.description}</p>
                                </motion.div>
                            );
                        })}
                    </div>
                </Container>
            </section>

            {/* CTA Section */}
            <section className="py-24">
                <Container>
                    <div className="rounded-[3rem] bg-primary px-8 py-16 text-center text-white lg:py-24 overflow-hidden relative">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32 blur-3xl" />
                        <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary/20 rounded-full -ml-32 -mb-32 blur-3xl" />
                        <div className="relative z-10">
                            <h2 className="text-4xl font-extrabold lg:text-6xl max-w-4xl mx-auto">Ready to upgrade your tech game?</h2>
                            <p className="mt-8 text-xl text-white/80 max-w-2xl mx-auto">Join thousands of students and office workers who trust Pi Store for their daily essentials.</p>
                            <div className="mt-12 flex flex-wrap justify-center gap-4">
                                <Button asChild size="lg" variant="secondary" className="h-16 px-10 text-lg font-bold">
                                    <Link href="/shop">Shop Now</Link>
                                </Button>
                                <Button asChild size="lg" variant="outline" className="h-16 px-10 text-lg font-bold border-white text-white hover:bg-white hover:text-primary">
                                    <Link href="/contact">Contact Support</Link>
                                </Button>
                            </div>
                        </div>
                    </div>
                </Container>
            </section>
        </div>
    );
}

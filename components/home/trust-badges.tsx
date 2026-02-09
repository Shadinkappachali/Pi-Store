"use client";

import { Container } from "@/components/ui/container";
import { Truck, ShieldCheck, RefreshCcw, Headset } from "lucide-react";
import { motion } from "framer-motion";

const badges = [
    {
        icon: Truck,
        title: "Fast Shipping",
        description: "Orders delivered in 2-4 days across India.",
        color: "text-blue-400"
    },
    {
        icon: ShieldCheck,
        title: "Secure Payment",
        description: "SSL encrypted 100% safe transactions.",
        color: "text-emerald-400"
    },
    {
        icon: RefreshCcw,
        title: "Easy Replacement",
        description: "7 days hassle-free return policy.",
        color: "text-amber-400"
    },
    {
        icon: Headset,
        title: "Customer Support",
        description: "Friendly support available on WhatsApp.",
        color: "text-primary"
    }
];

export function TrustBadges() {
    return (
        <section className="bg-secondary py-20 relative overflow-hidden">
            {/* Background Decorative Element */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/20 to-transparent" />

            <Container>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {badges.map((badge, i) => (
                        <motion.div
                            key={badge.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-sm hover:border-primary/50 transition-all group"
                        >
                            <div className={`mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/5 transition-colors group-hover:bg-primary/20 ${badge.color}`}>
                                <badge.icon className="h-7 w-7" />
                            </div>
                            <div>
                                <h4 className="text-xl font-bold text-white tracking-tight">{badge.title}</h4>
                                <p className="mt-2 text-sm text-gray-400 leading-relaxed font-medium">
                                    {badge.description}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </Container>
        </section>
    );
}

"use client";

import { Container } from "@/components/ui/container";
import { Smartphone, Laptop, Headphones, Mouse, Watch, Battery, Cable, HardDrive } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

const categories = [
    { name: "Mobiles", icon: Smartphone, color: "bg-blue-50 text-blue-600", href: "/category/mobile" },
    { name: "Laptops", icon: Laptop, color: "bg-emerald-50 text-emerald-600", href: "/category/laptop" },
    { name: "Chargers", icon: Battery, color: "bg-orange-50 text-orange-600", href: "/category/chargers" },
    { name: "Cables", icon: Cable, color: "bg-purple-50 text-purple-600", href: "/category/cables" },
    { name: "Earphones", icon: Headphones, color: "bg-cyan-50 text-cyan-600", href: "/category/earphones" },
    { name: "Keyboards", icon: Laptop, color: "bg-indigo-50 text-indigo-600", href: "/category/keyboards" },
    { name: "Mouse", icon: Mouse, color: "bg-rose-50 text-rose-600", href: "/category/mouse" },
    { name: "USB Hubs", icon: Smartphone, color: "bg-amber-50 text-amber-600", href: "/category/hubs" },
];

export function CategoriesGrid() {
    return (
        <section className="bg-gray-50 py-24">
            <Container>
                <div className="mb-12 text-center lg:text-left">
                    <h2 className="text-3xl font-bold tracking-tight text-secondary sm:text-4xl">Shop by Category</h2>
                    <p className="mt-4 text-lg text-gray-500">Everything you need for your mobile and laptop workspace.</p>
                </div>

                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 lg:gap-8">
                    {categories.map((category, index) => (
                        <div
                            key={category.name}
                        >
                            <Link
                                href={category.href}
                                className="group flex flex-col items-center justify-center rounded-2xl border border-transparent bg-white p-8 text-center shadow-sm transition-all hover:border-primary/20 hover:shadow-md active:scale-95"
                            >
                                <div className={`flex h-16 w-16 items-center justify-center rounded-2xl ${category.color} transition-transform group-hover:scale-110`}>
                                    <category.icon className="h-8 w-8" />
                                </div>
                                <h3 className="mt-4 font-semibold text-secondary">{category.name}</h3>
                            </Link>
                        </div>
                    ))}
                </div>
            </Container>
        </section>
    );
}

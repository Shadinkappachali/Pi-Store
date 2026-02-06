"use client";

import { Container } from "@/components/ui/container";
import { ProductCard } from "@/components/ui/product-card";
import { motion } from "framer-motion";

const NEW_ARRIVALS = [
    {
        id: "n1",
        name: "UltraThin MacBook Pro Hardshell Case",
        price: 999,
        originalPrice: 1499,
        rating: 4.8,
        reviews: 120,
        category: "Laptop",
        badge: "New",
        image: ""
    },
    {
        id: "n2",
        name: "NanoHub 7-in-1 USB-C Power Adapter",
        price: 3299,
        originalPrice: 4999,
        rating: 4.9,
        reviews: 45,
        category: "Laptop",
        badge: "New",
        image: ""
    },
    {
        id: "n3",
        name: "GripTek iPhone 15 Pro Max Silicone Case",
        price: 699,
        originalPrice: 999,
        rating: 4.7,
        reviews: 230,
        category: "Mobile",
        badge: "New",
        image: ""
    },
    {
        id: "n4",
        name: "VoltSafe Over-Current Voltage Protector",
        price: 499,
        originalPrice: 799,
        rating: 4.6,
        reviews: 80,
        category: "Mobile",
        badge: "New",
        image: ""
    }
];

export function NewArrivals() {
    return (
        <section className="bg-gray-50 py-24">
            <Container>
                <div className="mb-12 text-center">
                    <h2 className="text-3xl font-bold tracking-tight text-secondary sm:text-4xl">New Arrivals</h2>
                    <p className="mt-4 text-lg text-gray-500">The latest tech accessories just landed.</p>
                </div>

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {NEW_ARRIVALS.map((product, index) => (
                        <motion.div
                            key={product.id}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.1 }}
                            viewport={{ once: true }}
                        >
                            <ProductCard {...product} />
                        </motion.div>
                    ))}
                </div>
            </Container>
        </section>
    );
}

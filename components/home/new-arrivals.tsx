"use client";

import { Container } from "@/components/ui/container";
import { ProductCard } from "@/components/ui/product-card";
import { motion } from "framer-motion";

import { PRODUCTS } from "@/constants/products";

const NEW_ARRIVALS = PRODUCTS.filter(p => p.isNew);

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

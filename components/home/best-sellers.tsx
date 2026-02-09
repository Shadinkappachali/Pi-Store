"use client";

import { Container } from "@/components/ui/container";
import { ProductCard } from "@/components/ui/product-card";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef } from "react";

import { useState, useEffect } from "react";
import { getProducts, type Product } from "@/lib/firestore";

export function BestSellers() {
    const [bestSellers, setBestSellers] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        async function loadProducts() {
            setLoading(true);
            const { success, products } = await getProducts();
            if (success) {
                setBestSellers(products.filter(p => p.isBestSeller));
            }
            setLoading(false);
        }
        loadProducts();
    }, []);

    const scroll = (direction: "left" | "right") => {
        if (scrollRef.current) {
            const { scrollLeft, clientWidth } = scrollRef.current;
            const scrollTo = direction === "left" ? scrollLeft - clientWidth : scrollLeft + clientWidth;
            scrollRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
        }
    };

    return (
        <section className="py-24">
            <Container>
                <div className="flex items-end justify-between mb-12">
                    <div>
                        <h2 className="text-3xl font-bold tracking-tight text-secondary sm:text-4xl">Best Sellers</h2>
                        <p className="mt-4 text-lg text-gray-500">Most loved by students and professionals.</p>
                    </div>
                    <div className="flex gap-2">
                        <button
                            onClick={() => scroll("left")}
                            className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-white hover:bg-gray-50 active:scale-95 transition-all"
                        >
                            <ChevronLeft className="h-6 w-6" />
                        </button>
                        <button
                            onClick={() => scroll("right")}
                            className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-white hover:bg-gray-50 active:scale-95 transition-all"
                        >
                            <ChevronRight className="h-6 w-6" />
                        </button>
                    </div>
                </div>

                <div
                    ref={scrollRef}
                    className="flex gap-6 overflow-x-auto pb-8 snap-x no-scrollbar min-h-[400px]"
                >
                    {loading ? (
                        [1, 2, 3, 4].map((i) => (
                            <div key={i} className="min-w-[280px] w-[280px] h-[400px] animate-pulse rounded-3xl bg-gray-100" />
                        ))
                    ) : (
                        bestSellers.map((product) => (
                            <div key={product.id} className="min-w-[280px] w-[280px] snap-start">
                                <ProductCard {...product} />
                            </div>
                        ))
                    )}
                </div>
            </Container>
        </section>
    );
}

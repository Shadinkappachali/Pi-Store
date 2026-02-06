"use client";

import { Container } from "@/components/ui/container";
import { ProductCard } from "@/components/ui/product-card";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef } from "react";

const BEST_SELLERS = [
    {
        id: "1",
        name: "HyperCharge 65W GaN Fast Charger (Triple Port)",
        price: 2499,
        originalPrice: 3999,
        rating: 4.9,
        reviews: 1250,
        category: "Chargers",
        badge: "Best Seller",
        image: "https://images.unsplash.com/photo-1583863788434-e58a36330cf0?q=80&w=800&auto=format&fit=crop"
    },
    {
        id: "2",
        name: "SonicSync Pro Wireless Noise Cancelling Earbuds",
        price: 1899,
        originalPrice: 2999,
        rating: 4.8,
        reviews: 840,
        category: "Earphones",
        image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?q=80&w=800&auto=format&fit=crop"
    },
    {
        id: "3",
        name: "PrecisionTrack Wireless Ergo Mouse",
        price: 1299,
        originalPrice: 1999,
        rating: 4.7,
        reviews: 620,
        category: "Mouse",
        image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?q=80&w=800&auto=format&fit=crop"
    },
    {
        id: "4",
        name: "DuraLink Pro USB-C to Lightning Cable (1.5m)",
        price: 799,
        originalPrice: 1299,
        rating: 4.9,
        reviews: 2100,
        category: "Cables",
        image: "https://images.unsplash.com/photo-1625805721666-3be3d4d3c3cc?q=80&w=800&auto=format&fit=crop"
    },
    {
        id: "5",
        name: "GhostType Mechanical Silent Keyboard",
        price: 4499,
        originalPrice: 5999,
        rating: 4.8,
        reviews: 310,
        category: "Keyboards",
        image: "https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?q=80&w=800&auto=format&fit=crop"
    }
];

export function BestSellers() {
    const scrollRef = useRef<HTMLDivElement>(null);

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
                    className="flex gap-6 overflow-x-auto pb-8 snap-x no-scrollbar"
                >
                    {BEST_SELLERS.map((product) => (
                        <div key={product.id} className="min-w-[280px] w-[280px] snap-start">
                            <ProductCard {...product} />
                        </div>
                    ))}
                </div>
            </Container>
        </section>
    );
}

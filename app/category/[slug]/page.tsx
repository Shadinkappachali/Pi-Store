"use client";

import { useCart } from "@/context/cart-context";
import { Container } from "@/components/ui/container";
import { ProductCard } from "@/components/ui/product-card";
import { Button } from "@/components/ui/button";
import { ChevronRight, Filter, SlidersHorizontal } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";

// Mock Data for Categories
const CATEGORY_DATA: Record<string, any> = {
    mobile: {
        title: "Mobile Accessories",
        description: "Premium chargers, durable cables, and sleek cases for your daily companion.",
        banner: "bg-indigo-600",
        tags: ["Fast Charging", "Protection", "Style"]
    },
    laptop: {
        title: "Laptop Accessories",
        description: "High-speed hubs, ergonomic mice, and protection for your workspace.",
        banner: "bg-emerald-600",
        tags: ["Productivity", "Connectivity", "Comfort"]
    },
    audio: {
        title: "Audio & Entertainment",
        description: "Immersive sound, crystal clear calls, and all-day comfort.",
        banner: "bg-amber-600",
        tags: ["Wireless", "Noise-Cancelling", "Hi-Fi"]
    }
};

// SLUG TO CATEGORY MAPPING
const SLUG_TO_CATEGORIES: Record<string, string[]> = {
    mobile: ["Mobile", "Chargers", "Cables", "Cases", "Power Banks"],
    laptop: ["Laptop", "Laptop Accessories", "Keyboards", "Mouse", "USB Hubs"],
    chargers: ["Chargers"],
    cables: ["Cables"],
    earphones: ["Earphones"],
    keyboards: ["Keyboards"],
    mouse: ["Mouse"],
    hubs: ["USB Hubs", "Laptop Accessories"],
    storage: ["Storage"],
    audio: ["Earphones"]
};

import { useState, useEffect } from "react";
import { getProducts, type Product } from "@/lib/firestore";

export default function CategoryPage() {
    const params = useParams();
    const slug = params.slug as string;
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    const data = CATEGORY_DATA[slug] || {
        title: slug.charAt(0).toUpperCase() + slug.slice(1),
        description: `Browse our collection of ${slug} accessories.`,
        banner: "bg-primary",
        tags: ["Premium", "Reliable"]
    };

    const categorySlugs = SLUG_TO_CATEGORIES[slug] || [slug.charAt(0).toUpperCase() + slug.slice(1)];

    useEffect(() => {
        async function loadProducts() {
            setLoading(true);
            const { success, products: allProducts } = await getProducts();
            if (success) {
                setProducts(allProducts.filter(p => categorySlugs.includes(p.category)));
            }
            setLoading(false);
        }
        loadProducts();
    }, [categorySlugs]);

    return (
        <div className="pb-24">
            {/* Category Hero */}
            <section className={`py-20 text-white ${data.banner} relative overflow-hidden`}>
                <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -mr-48 -mt-48 blur-3xl" />
                <Container className="relative z-10">
                    <nav className="mb-8 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-white/60">
                        <Link href="/" className="hover:text-white transition-colors">Home</Link>
                        <ChevronRight size={12} />
                        <Link href="/shop" className="hover:text-white transition-colors">Shop</Link>
                        <ChevronRight size={12} />
                        <span className="text-white">{data.title}</span>
                    </nav>
                    <div className="max-w-2xl">
                        <h1 className="text-5xl font-extrabold lg:text-7xl">{data.title}</h1>
                        <p className="mt-6 text-xl text-white/80 leading-relaxed">{data.description}</p>
                        <div className="mt-8 flex flex-wrap gap-3">
                            {data.tags.map((tag: string) => (
                                <span key={tag} className="rounded-full bg-white/20 px-4 py-1.5 text-xs font-bold backdrop-blur-sm">
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>
                </Container>
            </section>

            {/* Main Listing */}
            <Container className="mt-16">
                <div className="flex flex-col gap-12 lg:flex-row">
                    {/* Minimal Sidebar/Filters Toggle */}
                    <aside className="w-full shrink-0 lg:w-64">
                        <div className="sticky top-28 space-y-8 rounded-3xl border border-border/50 bg-gray-50/50 p-6">
                            <div>
                                <h3 className="text-sm font-bold uppercase tracking-widest text-secondary">Filters</h3>
                                <div className="mt-6 space-y-4">
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-gray-400 uppercase">Sort By</label>
                                        <select className="w-full rounded-xl border border-border bg-white px-3 py-2 text-sm focus:outline-none">
                                            <option>Newest First</option>
                                            <option>Price: Low to High</option>
                                            <option>Most Popular</option>
                                        </select>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-gray-400 uppercase">Price Range</label>
                                        <input type="range" className="w-full accent-primary" min="0" max="300000" />
                                    </div>
                                </div>
                            </div>
                            <Button className="w-full">Apply Filters</Button>
                        </div>
                    </aside>

                    {/* Product Grid */}
                    <main className="flex-1">
                        <div className="mb-8 flex items-center justify-between">
                            <h2 className="text-2xl font-bold text-secondary">Showing all products</h2>
                            <span className="text-sm text-gray-500 font-medium">{products.length} Results</span>
                        </div>

                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
                            {loading ? (
                                [1, 2, 3].map((i) => (
                                    <div key={i} className="h-[400px] w-full animate-pulse rounded-3xl bg-gray-100" />
                                ))
                            ) : (
                                products.map((p) => (
                                    <ProductCard key={p.id} {...p} />
                                ))
                            )}
                        </div>

                        {products.length > 12 && (
                            <div className="mt-16 flex justify-center">
                                <Button variant="outline" size="lg" className="rounded-full px-12 font-bold h-14">
                                    Load More Products
                                </Button>
                            </div>
                        )}
                    </main>
                </div>
            </Container>
        </div>
    );
}

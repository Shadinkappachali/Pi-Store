"use client";

import { useState, useEffect, useRef } from "react";
import { Search, X, Command, TrendingUp, History, Package, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { getProducts, type Product } from "@/lib/firestore";
import { cn } from "@/lib/utils";
import { Button } from "./button";

export function ModernSearch() {
    const [isOpen, setIsOpen] = useState(false);
    const [query, setQuery] = useState("");
    const [results, setResults] = useState<Product[]>([]);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const router = useRouter();
    const [allProducts, setAllProducts] = useState<Product[]>([]);
    const [categories, setCategories] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    // Initial load of products
    useEffect(() => {
        const loadProducts = async () => {
            setIsLoading(true);
            const res = await getProducts();
            if (res.success) {
                setAllProducts(res.products);
                const uniqueCats = Array.from(new Set(res.products.map(p => p.category)));
                setCategories(uniqueCats.slice(0, 4));
            }
            setIsLoading(false);
        };
        loadProducts();
    }, []);

    // Filter products based on search query
    useEffect(() => {
        if (query.trim().length === 0) {
            setResults([]);
            return;
        }

        const filtered = allProducts.filter(p =>
            p.name.toLowerCase().includes(query.toLowerCase()) ||
            p.category.toLowerCase().includes(query.toLowerCase()) ||
            p.brand.toLowerCase().includes(query.toLowerCase())
        ).slice(0, 6);

        setResults(filtered);
        setSelectedIndex(0);
    }, [query, allProducts]);

    // Handle keyboard shortcuts
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if ((e.metaKey || e.ctrlKey) && e.key === "k") {
                e.preventDefault();
                setIsOpen(prev => !prev);
            }
            if (e.key === "Escape") {
                setIsOpen(false);
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, []);

    // Focus input when opened
    useEffect(() => {
        if (isOpen) {
            setTimeout(() => inputRef.current?.focus(), 100);
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
            setQuery("");
        }
    }, [isOpen]);

    const handleSelect = (product: Product) => {
        setIsOpen(false);
        router.push(`/product/${product.id}`);
    };

    const onKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "ArrowDown") {
            e.preventDefault();
            setSelectedIndex(prev => (prev < results.length - 1 ? prev + 1 : prev));
        } else if (e.key === "ArrowUp") {
            e.preventDefault();
            setSelectedIndex(prev => (prev > 0 ? prev - 1 : prev));
        } else if (e.key === "Enter" && results[selectedIndex]) {
            handleSelect(results[selectedIndex]);
        }
    };

    return (
        <>
            {/* Search Trigger Button */}
            <button
                onClick={() => setIsOpen(true)}
                className="group flex items-center gap-3 px-4 py-2 bg-gray-50 hover:bg-white border border-border rounded-xl transition-all duration-300 w-full max-w-sm"
            >
                <Search className="h-4 w-4 text-gray-400 group-hover:text-primary transition-colors" />
                <span className="text-sm text-gray-400 font-medium flex-1 text-left">Search accessories...</span>
                <div className="hidden sm:flex items-center gap-1 px-1.5 py-0.5 rounded border border-border bg-white text-[10px] font-black text-gray-400">
                    <Command size={10} /> K
                </div>
            </button>

            {/* Spotlight Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[10vh] px-4">
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsOpen(false)}
                            className="absolute inset-0 bg-secondary/80 backdrop-blur-md"
                        />

                        {/* Search Modal */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: -20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: -20 }}
                            className="relative w-full max-w-2xl bg-white/95 rounded-3xl shadow-2xl overflow-hidden border border-white/20 backdrop-blur-2xl"
                        >
                            <div className="p-6 border-b border-border flex items-center gap-4">
                                <Search className="h-6 w-6 text-primary flex-shrink-0" />
                                <input
                                    ref={inputRef}
                                    value={query}
                                    onChange={(e) => setQuery(e.target.value)}
                                    onKeyDown={onKeyDown}
                                    placeholder="Search for premium gear..."
                                    className="w-full bg-transparent text-xl font-medium placeholder:text-gray-300 focus:outline-none text-secondary"
                                />
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                                >
                                    <X className="h-5 w-5 text-gray-400" />
                                </button>
                            </div>

                            <div className="max-h-[60vh] overflow-y-auto no-scrollbar">
                                {query.length === 0 ? (
                                    <div className="p-8 space-y-8">
                                        <section>
                                            <h3 className="text-xs font-black uppercase tracking-[0.2em] text-gray-400 mb-4 flex items-center gap-2">
                                                <TrendingUp size={14} className="text-primary" />
                                                Popular Searches
                                            </h3>
                                            <div className="flex flex-wrap gap-2">
                                                {["iPhone 15 Case", "Mechanical Keyboard", "M3 MacBook", "RTX 4090"].map(tag => (
                                                    <button
                                                        key={tag}
                                                        onClick={() => setQuery(tag)}
                                                        className="px-4 py-2 rounded-full bg-gray-50 hover:bg-primary/10 hover:text-primary border border-border transition-all text-sm font-bold text-gray-600"
                                                    >
                                                        {tag}
                                                    </button>
                                                ))}
                                            </div>
                                        </section>

                                        <section>
                                            <h3 className="text-xs font-black uppercase tracking-[0.2em] text-gray-400 mb-4 flex items-center gap-2">
                                                <History size={14} className="text-primary" />
                                                Quick Categories
                                            </h3>
                                            <div className="grid grid-cols-2 gap-3">
                                                {categories.map(cat => (
                                                    <button
                                                        key={cat}
                                                        onClick={() => {
                                                            setIsOpen(false);
                                                            router.push(`/category/${cat.toLowerCase()}`);
                                                        }}
                                                        className="flex items-center justify-between p-4 rounded-2xl bg-gray-50 hover:bg-white border border-border hover:border-primary/30 transition-all group"
                                                    >
                                                        <span className="font-bold text-secondary">{cat}</span>
                                                        <ArrowRight size={16} className="text-gray-300 group-hover:text-primary group-hover:translate-x-1 transition-all" />
                                                    </button>
                                                ))}
                                                {categories.length === 0 && (
                                                    <p className="text-sm text-gray-400 italic col-span-2">No categories found.</p>
                                                )}
                                            </div>
                                        </section>
                                    </div>
                                ) : (
                                    <div className="p-2">
                                        {results.length > 0 ? (
                                            <div className="space-y-1">
                                                {results.map((product, idx) => (
                                                    <button
                                                        key={product.id}
                                                        onClick={() => handleSelect(product)}
                                                        onMouseEnter={() => setSelectedIndex(idx)}
                                                        className={cn(
                                                            "w-full flex items-center gap-4 p-4 rounded-2xl transition-all duration-300",
                                                            selectedIndex === idx ? "bg-primary text-white shadow-lg shadow-primary/20 scale-[1.01]" : "hover:bg-gray-50 text-secondary"
                                                        )}
                                                    >
                                                        <div className="h-16 w-16 rounded-xl bg-white p-1 overflow-hidden shrink-0 border border-border/50">
                                                            <img
                                                                src={product.image}
                                                                alt={product.name}
                                                                className="h-full w-full object-cover rounded-lg"
                                                            />
                                                        </div>
                                                        <div className="flex-1 text-left">
                                                            <p className={cn(
                                                                "text-[10px] font-black uppercase tracking-widest mb-0.5",
                                                                selectedIndex === idx ? "text-white/80" : "text-primary"
                                                            )}>
                                                                {product.brand}
                                                            </p>
                                                            <h4 className="font-bold tracking-tight">{product.name}</h4>
                                                            <p className={cn(
                                                                "text-sm font-medium",
                                                                selectedIndex === idx ? "text-white/90" : "text-gray-500"
                                                            )}>
                                                                ₹{product.price.toLocaleString('en-IN')}
                                                            </p>
                                                        </div>
                                                        <ArrowRight className={cn(
                                                            "h-5 w-5 transition-all",
                                                            selectedIndex === idx ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-2"
                                                        )} />
                                                    </button>
                                                ))}
                                            </div>
                                        ) : (
                                            <div className="p-20 text-center">
                                                <div className="h-20 w-20 rounded-full bg-gray-50 flex items-center justify-center mx-auto mb-6 text-gray-300">
                                                    <Package size={40} />
                                                </div>
                                                <h3 className="text-xl font-bold text-secondary">No results found</h3>
                                                <p className="text-gray-500 mt-2">Try searching for something else.</p>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>

                            {/* Footer */}
                            <div className="p-4 bg-gray-50 border-t border-border flex items-center justify-between text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                                <div className="flex gap-4">
                                    <span className="flex items-center gap-1"><kbd className="px-1.5 py-0.5 rounded border border-border bg-white text-[9px]">ENTER</kbd> SELECT</span>
                                    <span className="flex items-center gap-1"><kbd className="px-1.5 py-0.5 rounded border border-border bg-white text-[9px]">↑↓</kbd> NAVIGATE</span>
                                </div>
                                <span>Press <kbd className="px-1.5 py-0.5 rounded border border-border bg-white text-[9px]">ESC</kbd> to close</span>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </>
    );
}

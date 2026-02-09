"use client";

import { Container } from "@/components/ui/container";
import { ProductCard } from "@/components/ui/product-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    ChevronDown,
    Filter,
    LayoutGrid,
    List,
    Search,
    SlidersHorizontal,
    X
} from "lucide-react";
import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

import { getProducts, type Product } from "@/lib/firestore";

export default function ShopPage() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
    const [priceRange, setPriceRange] = useState<[number, number]>([0, 300000]);
    const [sortBy, setSortBy] = useState("popular");
    const [searchQuery, setSearchQuery] = useState("");
    const [showMobileFilters, setShowMobileFilters] = useState(false);

    useEffect(() => {
        async function loadProducts() {
            setLoading(true);
            const { success, products: fetchedProducts } = await getProducts();
            if (success) {
                setProducts(fetchedProducts);
            }
            setLoading(false);
        }
        loadProducts();
    }, []);

    const categories = useMemo(() => Array.from(new Set(products.map(p => p.category))), [products]);
    const brands = useMemo(() => Array.from(new Set(products.map(p => p.brand))), [products]);

    const filteredProducts = useMemo(() => {
        return products.filter(p => {
            const matchCategory = !selectedCategory || p.category === selectedCategory;
            const matchBrand = !selectedBrand || p.brand === selectedBrand;
            const matchPrice = p.price >= priceRange[0] && p.price <= priceRange[1];
            const matchSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
            return matchCategory && matchBrand && matchPrice && matchSearch;
        }).sort((a, b) => {
            if (sortBy === "price-low") return a.price - b.price;
            if (sortBy === "price-high") return b.price - a.price;
            if (sortBy === "newest") return b.createdAt.getTime() - a.createdAt.getTime();
            return b.reviews - a.reviews; // For 'popular'
        });
    }, [products, selectedCategory, selectedBrand, priceRange, sortBy, searchQuery]);

    const clearFilters = () => {
        setSelectedCategory(null);
        setSelectedBrand(null);
        setPriceRange([0, 10000]);
        setSearchQuery("");
    };

    return (
        <div className="min-h-screen bg-gray-50/50 pb-20 pt-10">
            <Container>
                {/* Header Section */}
                <div className="mb-8 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight text-secondary sm:text-4xl">Browse Products</h1>
                        <p className="mt-2 text-gray-500">Showing {filteredProducts.length} results</p>
                    </div>

                    <div className="flex flex-wrap items-center gap-3">
                        <div className="relative flex-1 min-w-[200px] lg:w-80">
                            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                            <Input
                                placeholder="Search products..."
                                className="pl-10 bg-white"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                        <Button
                            variant="outline"
                            className="lg:hidden"
                            onClick={() => setShowMobileFilters(true)}
                        >
                            <Filter className="mr-2 h-4 w-4" />
                            Filters
                        </Button>
                        <div className="flex items-center gap-2">
                            <span className="hidden text-sm font-medium text-gray-500 lg:inline">Sort by:</span>
                            <select
                                className="h-10 rounded-md border border-border bg-white px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                            >
                                <option value="popular">Popularity</option>
                                <option value="newest">Newest First</option>
                                <option value="price-low">Price: Low to High</option>
                                <option value="price-high">Price: High to Low</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col gap-8 lg:flex-row">
                    {/* Desktop Sidebar Filters */}
                    <aside className="hidden w-64 shrink-0 lg:block">
                        <div className="sticky top-28 space-y-8 rounded-2xl border border-border bg-white p-6 shadow-sm">
                            <div className="flex items-center justify-between">
                                <h3 className="font-bold text-secondary">Filters</h3>
                                <button
                                    className="text-xs font-semibold text-primary hover:underline"
                                    onClick={clearFilters}
                                >
                                    Clear All
                                </button>
                            </div>

                            {/* Categories */}
                            <div>
                                <h4 className="mb-4 text-sm font-bold uppercase tracking-widest text-gray-400">Category</h4>
                                <div className="space-y-2">
                                    {categories.map(cat => (
                                        <label key={cat} className="flex items-center gap-2 text-sm text-gray-600 transition-colors hover:text-primary cursor-pointer">
                                            <input
                                                type="radio"
                                                name="category"
                                                className="h-4 w-4 border-gray-300 text-primary focus:ring-primary/20"
                                                checked={selectedCategory === cat}
                                                onChange={() => setSelectedCategory(cat)}
                                            />
                                            {cat}
                                        </label>
                                    ))}
                                </div>
                            </div>

                            {/* Brands */}
                            <div>
                                <h4 className="mb-4 text-sm font-bold uppercase tracking-widest text-gray-400">Brand</h4>
                                <div className="space-y-2">
                                    {brands.map(brand => (
                                        <label key={brand} className="flex items-center gap-2 text-sm text-gray-600 transition-colors hover:text-primary cursor-pointer">
                                            <input
                                                type="radio"
                                                name="brand"
                                                className="h-4 w-4 border-gray-300 text-primary focus:ring-primary/20"
                                                checked={selectedBrand === brand}
                                                onChange={() => setSelectedBrand(brand)}
                                            />
                                            {brand}
                                        </label>
                                    ))}
                                </div>
                            </div>

                            {/* Price Range */}
                            <div>
                                <h4 className="mb-4 text-sm font-bold uppercase tracking-widest text-gray-400">Price Range</h4>
                                <div className="space-y-4">
                                    <input
                                        type="range"
                                        min="0"
                                        max="300000"
                                        step="5000"
                                        value={priceRange[1]}
                                        onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
                                        className="w-full accent-primary"
                                    />
                                    <div className="flex items-center justify-between text-xs font-bold text-secondary">
                                        <span>₹0</span>
                                        <span>₹{priceRange[1].toLocaleString('en-IN')}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </aside>

                    {/* Product Grid */}
                    <main className="flex-1">
                        {loading ? (
                            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
                                {[1, 2, 3, 4, 5, 6].map((i) => (
                                    <div key={i} className="h-[400px] w-full animate-pulse rounded-3xl bg-gray-100" />
                                ))}
                            </div>
                        ) : filteredProducts.length > 0 ? (
                            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
                                <AnimatePresence mode="popLayout">
                                    {filteredProducts.map((p) => (
                                        <motion.div
                                            key={p.id}
                                            layout
                                            initial={{ opacity: 0, scale: 0.9 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0, scale: 0.9 }}
                                            transition={{ duration: 0.2 }}
                                        >
                                            <ProductCard
                                                {...p}
                                                badge={!p.available ? "Unpublished" : p.badge}
                                                stock={p.stock}
                                                isUnlimited={p.isUnlimited}
                                            />
                                        </motion.div>
                                    ))}
                                </AnimatePresence>
                            </div>
                        ) : (
                            <div className="flex flex-col items-center justify-center rounded-3xl border-2 border-dashed border-border bg-white py-20 text-center">
                                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gray-50 text-gray-400">
                                    <Search size={40} />
                                </div>
                                <h3 className="mt-6 text-xl font-bold text-secondary">No products found</h3>
                                <p className="mt-2 text-gray-500">Try adjusting your filters or search query.</p>
                                <Button variant="outline" className="mt-8" onClick={clearFilters}>
                                    Clear all filters
                                </Button>
                            </div>
                        )}
                    </main>
                </div>
            </Container>

            {/* Mobile Filter Sheet */}
            <AnimatePresence>
                {showMobileFilters && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setShowMobileFilters(false)}
                            className="fixed inset-0 z-[60] bg-secondary/80 backdrop-blur-sm"
                        />
                        <motion.div
                            initial={{ x: "100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "100%" }}
                            className="fixed inset-y-0 right-0 z-[70] w-full max-w-[300px] bg-white p-6 shadow-2xl"
                        >
                            <div className="flex items-center justify-between mb-8">
                                <h2 className="text-xl font-bold text-secondary">Filters</h2>
                                <Button variant="ghost" size="icon" onClick={() => setShowMobileFilters(false)}>
                                    <X />
                                </Button>
                            </div>

                            <div className="space-y-8 overflow-y-auto max-h-[calc(100vh-120px)] pb-10">
                                {/* Same filter logic as desktop sidebar */}
                                <div>
                                    <h4 className="mb-4 text-xs font-bold uppercase tracking-widest text-gray-400">Category</h4>
                                    <div className="grid grid-cols-1 gap-2">
                                        {categories.map(cat => (
                                            <button
                                                key={cat}
                                                onClick={() => setSelectedCategory(selectedCategory === cat ? null : cat)}
                                                className={`rounded-lg px-4 py-2 text-left text-sm transition-all ${selectedCategory === cat ? 'bg-primary text-white' : 'bg-gray-50 hover:bg-gray-100'}`}
                                            >
                                                {cat}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <h4 className="mb-4 text-xs font-bold uppercase tracking-widest text-gray-400">Brand</h4>
                                    <div className="grid grid-cols-2 gap-2">
                                        {brands.map(brand => (
                                            <button
                                                key={brand}
                                                onClick={() => setSelectedBrand(selectedBrand === brand ? null : brand)}
                                                className={`rounded-lg px-4 py-2 text-center text-sm transition-all ${selectedBrand === brand ? 'bg-primary text-white' : 'bg-gray-50 hover:bg-gray-100'}`}
                                            >
                                                {brand}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <h4 className="mb-4 text-xs font-bold uppercase tracking-widest text-gray-400">Max Price: ₹{priceRange[1].toLocaleString('en-IN')}</h4>
                                    <input
                                        type="range"
                                        min="0"
                                        max="300000"
                                        step="5000"
                                        value={priceRange[1]}
                                        onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
                                        className="w-full accent-primary"
                                    />
                                </div>
                            </div>

                            <div className="absolute bottom-0 left-0 right-0 border-t border-border bg-white p-6">
                                <Button className="w-full h-12 text-lg font-bold" onClick={() => setShowMobileFilters(false)}>
                                    Show {filteredProducts.length} Results
                                </Button>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
}

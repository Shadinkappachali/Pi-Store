"use client";

import { useCart } from "@/context/cart-context";
import { useState, useMemo } from "react";
import { useRouter, useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { formatINR, cn } from "@/lib/utils";
import {
    Star,
    Truck,
    ShieldCheck,
    RefreshCcw,
    Heart,
    Share2,
    Minus,
    Plus,
    CheckCircle2,
    ChevronRight,
    MessageSquare,
    HelpCircle,
    Maximize2
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ProductCard } from "@/components/ui/product-card";
import { Container } from "@/components/ui/container";
import { PRODUCTS } from "@/constants/products";

export default function ProductDetailPage() {
    const { addToCart } = useCart();
    const router = useRouter();
    const params = useParams();
    const slug = params.slug as string;

    const currentProduct = PRODUCTS.find(p => p.id === slug);

    const relatedProducts = useMemo(() => {
        if (!currentProduct) return [];
        return PRODUCTS
            .filter(p => p.category === currentProduct.category && p.id !== currentProduct.id)
            .slice(0, 4);
    }, [currentProduct]);

    const PRODUCT_DISPLAY = useMemo(() => {
        if (!currentProduct) return null;
        return {
            ...currentProduct,
            reviewsCount: currentProduct.reviews,
            stockStatus: currentProduct.available ? "In Stock" : "Out of Stock",
            description: `Experience the best of ${currentProduct.brand} with the ${currentProduct.name}. Designed for high performance and premium feel, this ${currentProduct.category} product is perfect for modern tech enthusiasts.`,
            highlights: [
                "Premium Build Quality",
                "Advanced Technology",
                "Ergonomic Design",
                "1 Year Warranty"
            ],
            specs: [
                { label: "Category", value: currentProduct.category },
                { label: "Brand", value: currentProduct.brand },
                { label: "Price", value: formatINR(currentProduct.price) }
            ],
            variants: [
                { id: "v1", name: "Standard", color: "#111827" }
            ],
            images: [
                currentProduct.image,
                "https://images.unsplash.com/photo-1621259182978-fbf93132d53d?q=80&w=800&auto=format&fit=crop",
                "https://images.unsplash.com/photo-1616422285623-13ff0167c95c?q=80&w=800&auto=format&fit=crop"
            ]
        };
    }, [currentProduct]);

    const [activeImage, setActiveImage] = useState(0);
    const [quantity, setQuantity] = useState(1);
    const [pincode, setPincode] = useState("");
    const [pincodeStatus, setPincodeStatus] = useState<"idle" | "checking" | "available" | "error">("idle");

    if (!PRODUCT_DISPLAY) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh]">
                <h2 className="text-2xl font-bold">Product not found</h2>
                <Button className="mt-4" asChild><Link href="/shop">Back to Shop</Link></Button>
            </div>
        );
    }

    const checkPincode = (e: React.FormEvent) => {
        e.preventDefault();
        if (!pincode || pincode.length !== 6) return;
        setPincodeStatus("checking");
        setTimeout(() => {
            setPincodeStatus("available");
        }, 1000);
    };

    const handleAddToCart = () => {
        addToCart({
            id: PRODUCT_DISPLAY.id,
            name: PRODUCT_DISPLAY.name,
            price: PRODUCT_DISPLAY.price,
            image: PRODUCT_DISPLAY.image,
            category: PRODUCT_DISPLAY.category,
            quantity: quantity
        });
    };

    const handleBuyNow = () => {
        handleAddToCart();
        router.push("/checkout");
    };

    return (
        <div className="bg-white pb-20 pt-8">
            <Container>
                {/* Breadcrumbs */}
                <nav className="mb-8 flex items-center gap-2 text-xs font-medium text-gray-500 uppercase tracking-widest">
                    <Link href="/" className="hover:text-primary transition-colors">Home</Link>
                    <span className="text-gray-300">/</span>
                    <Link href="/shop" className="hover:text-primary transition-colors">Shop</Link>
                    <span className="text-gray-300">/</span>
                    <span className="text-secondary">{PRODUCT_DISPLAY.name}</span>
                </nav>

                <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
                    {/* Left: Image Gallery */}
                    <div className="space-y-4">
                        <div className="relative aspect-square overflow-hidden rounded-2xl bg-gray-50 border border-border group">
                            <img
                                src={PRODUCT_DISPLAY.images[activeImage]}
                                alt={PRODUCT_DISPLAY.name}
                                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                            <button className="absolute right-4 top-4 rounded-full bg-white/80 p-2 text-secondary shadow-sm backdrop-blur hover:bg-white transition-all">
                                <Maximize2 size={20} />
                            </button>
                        </div>

                        <div className="flex gap-4 overflow-x-auto pb-2 no-scrollbar">
                            {PRODUCT_DISPLAY.images.map((img, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setActiveImage(idx)}
                                    className={`relative aspect-square w-20 shrink-0 overflow-hidden rounded-lg border-2 bg-gray-50 transition-all ${activeImage === idx ? 'border-primary' : 'border-transparent hover:border-gray-200'}`}
                                >
                                    <img
                                        src={img}
                                        alt={`${PRODUCT_DISPLAY.name} thumbnail ${idx + 1}`}
                                        className="h-full w-full object-cover"
                                    />
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Right: Product Info */}
                    <div className="flex flex-col">
                        <div className="flex items-center justify-between">
                            <span className="text-sm font-bold uppercase tracking-widest text-primary">{PRODUCT_DISPLAY.brand}</span>
                            <div className="flex gap-2">
                                <Button variant="ghost" size="icon" className="rounded-full border border-border">
                                    <Share2 size={18} />
                                </Button>
                                <Button variant="ghost" size="icon" className="rounded-full border border-border">
                                    <Heart size={18} />
                                </Button>
                            </div>
                        </div>

                        <h1 className="mt-4 text-3xl font-extrabold text-secondary lg:text-4xl">{PRODUCT_DISPLAY.name}</h1>

                        {/* Rating */}
                        <div className="mt-4 flex items-center gap-3">
                            <div className="flex items-center text-amber-400">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} className={cn("h-4 w-4 fill-current", i < Math.floor(PRODUCT_DISPLAY.rating) ? "text-amber-400" : "text-gray-200")} />
                                ))}
                            </div>
                            <span className="text-sm font-bold text-secondary">{PRODUCT_DISPLAY.rating}</span>
                            <span className="h-4 w-px bg-border" />
                            <span className="text-sm text-gray-500 font-medium">{PRODUCT_DISPLAY.reviewsCount} Reviews</span>
                        </div>

                        {/* Price */}
                        <div className="mt-8 flex items-end gap-3">
                            <span className="text-4xl font-extrabold text-secondary">{formatINR(PRODUCT_DISPLAY.price)}</span>
                            {PRODUCT_DISPLAY.originalPrice && (
                                <>
                                    <span className="text-xl text-gray-400 line-through">{formatINR(PRODUCT_DISPLAY.originalPrice)}</span>
                                    <span className="mb-1 rounded-md bg-green-100 px-2 py-0.5 text-xs font-bold text-green-600">
                                        Save {Math.round(((PRODUCT_DISPLAY.originalPrice - PRODUCT_DISPLAY.price) / PRODUCT_DISPLAY.originalPrice) * 100)}%
                                    </span>
                                </>
                            )}
                        </div>

                        {/* Quantity */}
                        <div className="mt-10 flex items-center gap-6">
                            <div className="flex items-center overflow-hidden rounded-xl border border-border bg-gray-50">
                                <button
                                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                    className="flex h-12 w-12 items-center justify-center hover:bg-gray-100 active:scale-95 transition-all"
                                >
                                    <Minus size={16} />
                                </button>
                                <span className="w-10 text-center font-bold text-secondary">{quantity}</span>
                                <button
                                    onClick={() => setQuantity(quantity + 1)}
                                    className="flex h-12 w-12 items-center justify-center hover:bg-gray-100 active:scale-95 transition-all"
                                >
                                    <Plus size={16} />
                                </button>
                            </div>
                            <span className={cn("text-sm font-bold", PRODUCT_DISPLAY.available ? "text-green-600" : "text-rose-500")}>
                                {PRODUCT_DISPLAY.stockStatus}
                            </span>
                        </div>

                        {/* Action Buttons */}
                        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <Button className="h-14 bg-primary text-lg font-bold" onClick={handleAddToCart} disabled={!PRODUCT_DISPLAY.available}>
                                Add to Cart
                            </Button>
                            <Button variant="secondary" className="h-14 text-lg font-bold" onClick={handleBuyNow} disabled={!PRODUCT_DISPLAY.available}>
                                Buy it Now
                            </Button>
                        </div>

                        {/* Pincode Checker */}
                        <div className="mt-12 rounded-2xl bg-gray-50 p-6 border border-border/50">
                            <div className="flex items-center gap-2 mb-4">
                                <Truck size={18} className="text-primary" />
                                <span className="text-sm font-bold text-secondary">Check Delivery Availability</span>
                            </div>
                            <form onSubmit={checkPincode} className="flex gap-2">
                                <Input
                                    placeholder="Enter Pincode (e.g. 560001)"
                                    className="flex-1 bg-white"
                                    value={pincode}
                                    onChange={(e) => setPincode(e.target.value.replace(/\D/g, "").slice(0, 6))}
                                />
                                <Button type="submit" variant="outline" className="font-bold shrink-0">
                                    {pincodeStatus === "checking" ? "..." : "Check"}
                                </Button>
                            </form>
                            <AnimatePresence>
                                {pincodeStatus === "available" && (
                                    <motion.p
                                        initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }}
                                        className="mt-3 text-xs font-bold text-green-600 flex items-center gap-1"
                                    >
                                        <CheckCircle2 size={12} />
                                        Delivering in 2-3 working days for "{pincode}"
                                    </motion.p>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Highlights */}
                        <div className="mt-12 space-y-4 border-t border-border pt-8">
                            <h3 className="text-sm font-bold uppercase tracking-widest text-secondary">Highlights</h3>
                            <ul className="space-y-3">
                                {PRODUCT_DISPLAY.highlights.map((h, i) => (
                                    <li key={i} className="flex items-start gap-3 text-sm text-gray-500">
                                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                                        <span>{h}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Tabs: Specs */}
                <div className="mt-24 border-t border-border pt-16">
                    <div className="grid grid-cols-1 gap-16 lg:grid-cols-3">
                        {/* Specs */}
                        <div className="lg:col-span-1 space-y-8">
                            <h3 className="text-xl font-extrabold text-secondary">Specifications</h3>
                            <div className="space-y-4">
                                {PRODUCT_DISPLAY.specs.map((s) => (
                                    <div key={s.label} className="flex justify-between border-b border-border pb-2 text-sm">
                                        <span className="font-medium text-gray-400">{s.label}</span>
                                        <span className="font-bold text-secondary">{s.value}</span>
                                    </div>
                                ))}
                            </div>

                            <div className="space-y-4 rounded-xl bg-primary/5 p-6 mt-12">
                                <div className="flex items-center gap-3">
                                    <ShieldCheck className="text-primary" size={20} />
                                    <span className="text-sm font-bold text-secondary">1 Year Warranty</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <RefreshCcw className="text-primary" size={20} />
                                    <span className="text-sm font-bold text-secondary">7 Days Replacement</span>
                                </div>
                            </div>
                        </div>

                        {/* Reviews */}
                        <div className="lg:col-span-2 space-y-12">
                            <div className="flex items-center justify-between pb-6 border-b border-border">
                                <h3 className="text-2xl font-extrabold text-secondary flex items-center gap-2">
                                    Customer Reviews
                                    <span className="text-sm font-medium text-gray-400">({PRODUCT_DISPLAY.reviewsCount})</span>
                                </h3>
                                <Button variant="outline" className="font-bold">Write a Review</Button>
                            </div>

                            <div className="space-y-8">
                                <div className="space-y-3">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 font-bold text-secondary">SK</div>
                                            <div>
                                                <p className="text-sm font-bold text-secondary">Saurav K.</p>
                                                <div className="flex items-center text-amber-400">
                                                    {[...Array(5)].map((_, i) => (
                                                        <Star key={i} className="h-3 w-3 fill-current" />
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                        <span className="text-xs text-gray-400">Verified Purchase</span>
                                    </div>
                                    <p className="text-sm leading-relaxed text-gray-500">
                                        Excellent product. Exceeded my expectations in terms of build quality and performance. Highly recommended!
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Related Products */}
                {relatedProducts.length > 0 && (
                    <div className="mt-32">
                        <div className="mb-10 flex items-center justify-between">
                            <h3 className="text-3xl font-extrabold text-secondary">You Might Also Like</h3>
                            <Link href="/shop" className="text-sm font-bold text-primary hover:underline">View All Products</Link>
                        </div>
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                            {relatedProducts.map((p) => (
                                <ProductCard key={p.id} {...p} />
                            ))}
                        </div>
                    </div>
                )}
            </Container>
        </div>
    );
}

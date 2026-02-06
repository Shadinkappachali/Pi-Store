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

// Mock Product Data
const PRODUCT = {
    id: "1",
    name: "HyperCharge 65W GaN Fast Charger (Triple Port)",
    price: 2499,
    originalPrice: 3999,
    rating: 4.9,
    reviewsCount: 1250,
    category: "Chargers",
    brand: "Pi Store",
    stockStatus: "In Stock",
    description: "Experience lightning-fast charging with our 65W GaN Fast Charger. Designed for portability and efficiency, this charger features three ports (2x USB-C, 1x USB-A) to power your laptop, phone, and accessories simultaneously.",
    highlights: [
        "65W Max Output - Fast charges MacBooks & iPhones",
        "GaN Technology - Smaller size, less heat",
        "Triple Port Design - Charge 3 devices at once",
        "Universal Compatibility - Works with Type-C & lightning devices",
        "Certified Safety - Overcurrent & overheat protection"
    ],
    specs: [
        { label: "Input", value: "100-240V, 50/60Hz, 1.5A" },
        { label: "Output C1/C2", value: "65W Max" },
        { label: "Output C1+C2", value: "45W + 20W" },
        { label: "Weight", value: "95g" },
        { label: "Color", value: "Matte Black / Arctic White" }
    ],
    variants: [
        { id: "v1", name: "Matte Black", color: "#111827" },
        { id: "v2", name: "Arctic White", color: "#F9FAFB" }
    ],
    images: ["1", "2", "3", "4"] // Placeholders
};

const RELATED_PRODUCTS = [
    { id: "4", name: "DuraLink Pro USB-C Cable", price: 799, originalPrice: 1299, rating: 4.9, reviews: 2100, category: "Cables", image: "" },
    { id: "2", name: "SonicSync Pro Earbuds", price: 1899, originalPrice: 2999, rating: 4.8, reviews: 840, category: "Earphones", image: "" },
    { id: "6", name: "PowerVault 20000mAh", price: 2999, originalPrice: 4499, rating: 4.6, reviews: 450, category: "Power Banks", image: "" },
    { id: "8", name: "NanoHub 7-in-1 Adapter", price: 3299, originalPrice: 4999, rating: 4.9, reviews: 45, category: "USB Hubs", image: "" },
];

export default function ProductDetailPage() {
    const { addToCart } = useCart();
    const router = useRouter();
    const params = useParams();
    const [activeImage, setActiveImage] = useState(0);
    const [selectedVariant, setSelectedVariant] = useState(PRODUCT.variants[0].id);
    const [quantity, setQuantity] = useState(1);
    const [pincode, setPincode] = useState("");
    const [pincodeStatus, setPincodeStatus] = useState<"idle" | "checking" | "available" | "error">("idle");

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
            id: PRODUCT.id,
            name: PRODUCT.name,
            price: PRODUCT.price,
            image: "", // Placeholder
            category: PRODUCT.category,
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
                    <ChevronRight size={12} />
                    <Link href="/shop" className="hover:text-primary transition-colors">Shop</Link>
                    <ChevronRight size={12} />
                    <span className="text-secondary">{PRODUCT.name}</span>
                </nav>

                <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
                    {/* Left: Image Gallery */}
                    <div className="space-y-4">
                        <div className="relative aspect-square overflow-hidden rounded-2xl bg-gray-50 border border-border group">
                            <div className="flex h-full w-full items-center justify-center text-sm font-medium text-gray-300 uppercase tracking-[0.2em]">
                                Product Image {activeImage + 1}
                            </div>
                            <button className="absolute right-4 top-4 rounded-full bg-white/80 p-2 text-secondary shadow-sm backdrop-blur hover:bg-white transition-all">
                                <Maximize2 size={20} />
                            </button>
                        </div>

                        <div className="flex gap-4">
                            {PRODUCT.images.map((img, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setActiveImage(idx)}
                                    className={`relative aspect-square w-20 overflow-hidden rounded-lg border-2 bg-gray-50 transition-all ${activeImage === idx ? 'border-primary' : 'border-transparent hover:border-gray-200'}`}
                                >
                                    <div className="flex h-full w-full items-center justify-center text-[8px] text-gray-400 font-bold uppercase">
                                        Slot {idx + 1}
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Right: Product Info */}
                    <div className="flex flex-col">
                        <div className="flex items-center justify-between">
                            <span className="text-sm font-bold uppercase tracking-widest text-primary">{PRODUCT.brand}</span>
                            <div className="flex gap-2">
                                <Button variant="ghost" size="icon" className="rounded-full border border-border">
                                    <Share2 size={18} />
                                </Button>
                                <Button variant="ghost" size="icon" className="rounded-full border border-border">
                                    <Heart size={18} />
                                </Button>
                            </div>
                        </div>

                        <h1 className="mt-4 text-3xl font-extrabold text-secondary lg:text-4xl">{PRODUCT.name}</h1>

                        {/* Rating */}
                        <div className="mt-4 flex items-center gap-3">
                            <div className="flex items-center text-amber-400">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} className={cn("h-4 w-4 fill-current", i < Math.floor(PRODUCT.rating) ? "text-amber-400" : "text-gray-200")} />
                                ))}
                            </div>
                            <span className="text-sm font-bold text-secondary">{PRODUCT.rating}</span>
                            <span className="h-4 w-px bg-border" />
                            <span className="text-sm text-gray-500 font-medium">{PRODUCT.reviewsCount} Reviews</span>
                        </div>

                        {/* Price */}
                        <div className="mt-8 flex items-end gap-3">
                            <span className="text-4xl font-extrabold text-secondary">{formatINR(PRODUCT.price)}</span>
                            <span className="text-xl text-gray-400 line-through">{formatINR(PRODUCT.originalPrice)}</span>
                            <span className="mb-1 rounded-md bg-green-100 px-2 py-0.5 text-xs font-bold text-green-600">
                                Save {Math.round(((PRODUCT.originalPrice - PRODUCT.price) / PRODUCT.originalPrice) * 100)}%
                            </span>
                        </div>

                        {/* Variants */}
                        <div className="mt-10">
                            <span className="text-sm font-extrabold uppercase tracking-widest text-secondary">Choose Color</span>
                            <div className="mt-4 flex gap-3">
                                {PRODUCT.variants.map((v) => (
                                    <button
                                        key={v.id}
                                        onClick={() => setSelectedVariant(v.id)}
                                        className={`group relative flex h-10 w-10 items-center justify-center rounded-full border-2 transition-all ${selectedVariant === v.id ? 'border-primary' : 'border-transparent'}`}
                                        title={v.name}
                                    >
                                        <div
                                            className="h-7 w-7 rounded-full border border-border"
                                            style={{ backgroundColor: v.color }}
                                        />
                                        {selectedVariant === v.id && (
                                            <CheckCircle2 className="absolute -right-1 -top-1 h-4 w-4 fill-primary text-white" />
                                        )}
                                    </button>
                                ))}
                            </div>
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
                            <span className="text-sm font-bold text-green-600">{PRODUCT.stockStatus}</span>
                        </div>

                        {/* Action Buttons */}
                        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <Button className="h-14 bg-primary text-lg font-bold" onClick={handleAddToCart}>Add to Cart</Button>
                            <Button variant="secondary" className="h-14 text-lg font-bold" onClick={handleBuyNow}>Buy it Now</Button>
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
                                {PRODUCT.highlights.map((h, i) => (
                                    <li key={i} className="flex items-start gap-3 text-sm text-gray-500">
                                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                                        <span>{h}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Tabs: Specs & Reviews */}
                <div className="mt-24 border-t border-border pt-16">
                    <div className="grid grid-cols-1 gap-16 lg:grid-cols-3">
                        {/* Specs */}
                        <div className="lg:col-span-1 space-y-8">
                            <h3 className="text-xl font-extrabold text-secondary">Specifications</h3>
                            <div className="space-y-4">
                                {PRODUCT.specs.map((s) => (
                                    <div key={s.label} className="flex justify-between border-b border-border pb-2 text-sm">
                                        <span className="font-medium text-gray-400">{s.label}</span>
                                        <span className="font-bold text-secondary">{s.value}</span>
                                    </div>
                                ))}
                            </div>

                            {/* Trust Badges Minimal */}
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

                        {/* Reviews & QA */}
                        <div className="lg:col-span-2 space-y-12">
                            <div className="flex items-center justify-between pb-6 border-b border-border">
                                <h3 className="text-2xl font-extrabold text-secondary flex items-center gap-2">
                                    Customer Reviews
                                    <span className="text-sm font-medium text-gray-400">({PRODUCT.reviewsCount})</span>
                                </h3>
                                <Button variant="outline" className="font-bold">Write a Review</Button>
                            </div>

                            <div className="space-y-8">
                                {/* Mock Reviews */}
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
                                        <span className="text-xs text-gray-400">2 days ago</span>
                                    </div>
                                    <p className="text-sm leading-relaxed text-gray-500">
                                        Absolutely amazing! The charging speed is unreal. Mac and iPhone charge simultaneously without any heat issues. Best charger at this price point for students.
                                    </p>
                                </div>

                                <div className="space-y-3">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 font-bold text-secondary">AN</div>
                                            <div>
                                                <p className="text-sm font-bold text-secondary">Ananya N.</p>
                                                <div className="flex items-center text-amber-400">
                                                    {[...Array(5)].map((_, i) => (
                                                        <Star key={i} className="h-3 w-3 fill-current" />
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                        <span className="text-xs text-gray-400">1 week ago</span>
                                    </div>
                                    <p className="text-sm leading-relaxed text-gray-500">
                                        Compact and sturdy. The Arctic White looks so premium. It easily fits in my bag. Using it for 3 months now, no issues.
                                    </p>
                                </div>
                            </div>

                            <div className="flex justify-center pt-8 border-t border-border">
                                <Button variant="ghost" className="font-bold text-primary">View All Reviews</Button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Related Products */}
                <div className="mt-32">
                    <div className="mb-10 flex items-center justify-between">
                        <h3 className="text-3xl font-extrabold text-secondary">You Might Also Like</h3>
                        <Link href="/shop" className="text-sm font-bold text-primary hover:underline">View All Products</Link>
                    </div>
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                        {RELATED_PRODUCTS.map((p) => (
                            <ProductCard key={p.id} {...p} />
                        ))}
                    </div>
                </div>
            </Container>
        </div>
    );
}

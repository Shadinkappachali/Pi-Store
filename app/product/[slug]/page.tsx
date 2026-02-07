"use client";

import { useCart } from "@/context/cart-context";
import { useFavorites } from "@/context/favorites-context";
import { useState, useMemo, useEffect } from "react";
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
    Maximize2,
    Flame,
    AlertTriangle,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ProductCard } from "@/components/ui/product-card";
import { Container } from "@/components/ui/container";
import { getProductById, getProducts, addReview, getReviewsByProductId, type Product, type Review } from "@/lib/firestore";
import { useAuth } from "@/context/auth-context";
import { Textarea } from "@/components/ui/textarea";

export default function ProductDetailPage() {
    const { addToCart } = useCart();
    const { addToFavorites, removeFromFavorites, isFavorite } = useFavorites();
    const router = useRouter();
    const params = useParams();
    const slug = params.slug as string;

    const [product, setProduct] = useState<Product | null>(null);
    const [allProducts, setAllProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [reviewsList, setReviewsList] = useState<Review[]>([]);
    const [isReviewFormOpen, setIsReviewFormOpen] = useState(false);
    const [newReview, setNewReview] = useState({ rating: 5, comment: "" });
    const [isSubmittingReview, setIsSubmittingReview] = useState(false);
    const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>({});
    const { user } = useAuth();

    const loadData = async () => {
        setLoading(true);
        const [productRes, allProductsRes, reviewsRes] = await Promise.all([
            getProductById(slug),
            getProducts(),
            getReviewsByProductId(slug)
        ]);

        if (productRes.success && productRes.product) {
            setProduct(productRes.product);
            // Initialize default options
            if (productRes.product.options) {
                const initial: Record<string, string> = {};
                productRes.product.options.forEach(opt => {
                    if (opt.values.length > 0) {
                        initial[opt.name] = opt.values[0].label;
                    }
                });
                setSelectedOptions(initial);
            }
        }
        if (allProductsRes.success) {
            setAllProducts(allProductsRes.products);
        }
        if (reviewsRes.success) {
            setReviewsList(reviewsRes.reviews);
        }
        setLoading(false);
    };

    useEffect(() => {
        loadData();
    }, [slug]);

    const handleReviewSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user || !product) return;

        setIsSubmittingReview(true);
        const res = await addReview({
            productId: product.id,
            productName: product.name,
            userId: user.uid,
            userName: user.displayName || "Anonymous User",
            rating: newReview.rating,
            comment: newReview.comment,
            variant: Object.values(selectedOptions).join(" / ")
        });

        if (res.success) {
            setNewReview({ rating: 5, comment: "" });
            loadData();
            setIsReviewFormOpen(false);
        } else {
            alert("Error submitting review. Please try again.");
        }
        setIsSubmittingReview(false);
    };

    const relatedProducts = useMemo(() => {
        if (!product) return [];
        return allProducts
            .filter(p => p.category === product.category && p.id !== product.id)
            .slice(0, 4);
    }, [product, allProducts]);

    const PRODUCT_DISPLAY = useMemo(() => {
        if (!product) return null;

        const isOutOfStock = !product.isUnlimited && (product.stock ?? 0) <= 0;
        const isCriticalStock = !product.isUnlimited && (product.stock ?? 0) > 0 && (product.stock ?? 0) <= 2;
        const isLowStock = !product.isUnlimited && (product.stock ?? 0) > 2 && (product.stock ?? 0) <= 10;

        let stockLabel = "In Stock";
        let stockColor = "text-emerald-600 bg-emerald-50 border-emerald-100";
        let showProgress = false;

        if (isOutOfStock) {
            stockLabel = "Sold Out";
            stockColor = "text-gray-500 bg-gray-50 border-gray-200";
        } else if (isCriticalStock) {
            stockLabel = `Only ${product.stock} units left - Order soon!`;
            stockColor = "text-rose-600 bg-rose-50 border-rose-100";
            showProgress = true;
        } else if (isLowStock) {
            stockLabel = `Limited Stock: ${product.stock} items remaining`;
            stockColor = "text-amber-600 bg-amber-50 border-amber-100";
            showProgress = true;
        }

        const totalPriceModifier = (product.options || []).reduce((acc, opt) => {
            const selectedVal = selectedOptions[opt.name];
            const val = opt.values.find(v => v.label === selectedVal);
            return acc + (val?.priceModifier || 0);
        }, 0);

        const currentPrice = product.price + totalPriceModifier;
        const currentOriginalPrice = (product.originalPrice || product.price) + totalPriceModifier;
        const discountPercentage = currentOriginalPrice > currentPrice
            ? Math.round(((currentOriginalPrice - currentPrice) / currentOriginalPrice) * 100)
            : 0;

        return {
            ...product,
            currentPrice,
            currentOriginalPrice,
            discountPercentage,
            reviewsCount: product.reviews,
            stockLabel,
            stockColor,
            isOutOfStock,
            isCriticalStock,
            isLowStock,
            showProgress,
            stockPercent: product.isUnlimited ? 100 : Math.min(100, ((product.stock ?? 0) / 20) * 100),
            description: `Experience the best of ${product.brand} with the ${product.name}. Designed for high performance and premium feel, this ${product.category} product is perfect for modern tech enthusiasts.`,
            highlights: [
                "Premium Build Quality",
                "Advanced Technology",
                "Ergonomic Design",
                "1 Year Warranty"
            ],
            specs: [
                ...((product.specs || []).map(s => ({ label: s.label, value: s.value }))),
                { label: "Category", value: product.category },
                { label: "Brand", value: product.brand },
                { label: "Price", value: formatINR(product.price) }
            ],
            variants: [
                { id: "v1", name: "Standard", color: "#111827" }
            ],
            images: [product.image]
        };
    }, [product, allProducts, selectedOptions]);

    const [activeImage, setActiveImage] = useState(0);
    const [quantity, setQuantity] = useState(1);

    // Clamp quantity to stock limit
    useEffect(() => {
        if (PRODUCT_DISPLAY && !PRODUCT_DISPLAY.isUnlimited && quantity > (PRODUCT_DISPLAY.stock ?? 0)) {
            setQuantity(Math.max(1, PRODUCT_DISPLAY.stock ?? 0));
        }
    }, [PRODUCT_DISPLAY, quantity]);
    const [pincode, setPincode] = useState("");
    const [pincodeStatus, setPincodeStatus] = useState<"idle" | "checking" | "available" | "error">("idle");

    const isInFavorites = PRODUCT_DISPLAY ? isFavorite(PRODUCT_DISPLAY.id) : false;

    const handleToggleFavorite = () => {
        if (!PRODUCT_DISPLAY) return;

        if (isInFavorites) {
            removeFromFavorites(PRODUCT_DISPLAY.id);
        } else {
            addToFavorites({
                id: PRODUCT_DISPLAY.id,
                name: PRODUCT_DISPLAY.name,
                price: PRODUCT_DISPLAY.price,
                originalPrice: PRODUCT_DISPLAY.originalPrice,
                image: PRODUCT_DISPLAY.image,
                category: PRODUCT_DISPLAY.category,
                rating: PRODUCT_DISPLAY.rating,
                reviews: PRODUCT_DISPLAY.reviews,
            });
        }
    };

    const handleAddToCart = () => {
        if (!PRODUCT_DISPLAY || PRODUCT_DISPLAY.isOutOfStock) return;
        addToCart({
            id: PRODUCT_DISPLAY.id,
            name: PRODUCT_DISPLAY.name,
            price: PRODUCT_DISPLAY.currentPrice,
            image: PRODUCT_DISPLAY.image,
            category: PRODUCT_DISPLAY.category,
            quantity: quantity,
            variant: Object.values(selectedOptions).join(" / ")
        });
    };

    const handleBuyNow = () => {
        if (PRODUCT_DISPLAY?.isOutOfStock) return;
        handleAddToCart();
        router.push("/checkout");
    };

    if (loading) {
        return (
            <div className="bg-white min-h-screen py-20">
                <Container>
                    <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
                        <div className="aspect-square animate-pulse rounded-2xl bg-gray-100" />
                        <div className="space-y-6">
                            <div className="h-4 w-24 animate-pulse rounded bg-gray-100" />
                            <div className="h-10 w-3/4 animate-pulse rounded bg-gray-100" />
                            <div className="h-6 w-1/4 animate-pulse rounded bg-gray-100" />
                            <div className="h-32 w-full animate-pulse rounded bg-gray-100" />
                        </div>
                    </div>
                </Container>
            </div>
        );
    }

    if (!PRODUCT_DISPLAY) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh]">
                <h2 className="text-2xl font-bold">Product not found</h2>
                <Button className="mt-4" asChild><Link href="/shop">Back to Shop</Link></Button>
            </div>
        );
    }

    const checkPincode = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!pincode || pincode.length !== 6) return;
        setPincodeStatus("checking");
        setTimeout(() => {
            setPincodeStatus("available");
        }, 1000);
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
                        <div className="relative aspect-square overflow-hidden rounded-2xl bg-gray-50/50 border border-border group p-8">
                            <img
                                src={PRODUCT_DISPLAY.images[activeImage]}
                                alt={PRODUCT_DISPLAY.name}
                                className="h-full w-full object-contain transition-transform duration-700 group-hover:scale-105"
                            />
                            {PRODUCT_DISPLAY.isOutOfStock && (
                                <div className="absolute inset-0 z-10 bg-white/20 backdrop-blur-[2px] flex items-center justify-center pointer-events-none" />
                            )}
                            <button className="absolute right-4 top-4 z-20 rounded-full bg-white/80 p-2 text-secondary shadow-sm backdrop-blur hover:bg-white transition-all">
                                <Maximize2 size={20} />
                            </button>
                        </div>

                        {PRODUCT_DISPLAY.images.length > 1 && (
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
                                            className="h-full w-full object-contain p-2"
                                        />
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Right: Product Info */}
                    <div className="flex flex-col">
                        <div className="flex items-center justify-between">
                            <span className="text-sm font-bold uppercase tracking-widest text-primary">{PRODUCT_DISPLAY.brand}</span>
                            <div className="flex gap-2">
                                <Button variant="ghost" size="icon" className="rounded-full border border-border">
                                    <Share2 size={18} />
                                </Button>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={handleToggleFavorite}
                                    className={`rounded-full border border-border ${isInFavorites ? "text-rose-500 hover:text-rose-600" : ""
                                        }`}
                                >
                                    <Heart size={18} className={isInFavorites ? "fill-current" : ""} />
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
                            <span className={`text-4xl font-extrabold ${PRODUCT_DISPLAY.isOutOfStock ? "text-gray-400" : "text-secondary"}`}>
                                {formatINR(PRODUCT_DISPLAY.currentPrice)}
                            </span>
                            {PRODUCT_DISPLAY.originalPrice && !PRODUCT_DISPLAY.isOutOfStock && (
                                <>
                                    <span className="text-xl text-gray-400 line-through">{formatINR(PRODUCT_DISPLAY.currentOriginalPrice)}</span>
                                    <span className="mb-1 rounded-md bg-green-100 px-2 py-0.5 text-xs font-bold text-green-600">
                                        Save {PRODUCT_DISPLAY.discountPercentage}%
                                    </span>
                                </>
                            )}
                        </div>

                        {/* Variants / Customization */}
                        {product?.options && product.options.length > 0 && (
                            <div className="mt-10 space-y-8">
                                {product.options.map((opt) => (
                                    <div key={opt.id} className="space-y-4">
                                        <div className="flex items-center justify-between">
                                            <span className="text-xs font-black uppercase tracking-[0.2em] text-gray-400">{opt.name}</span>
                                            {selectedOptions[opt.name] && (
                                                <span className="text-xs font-bold text-primary bg-primary/5 px-2 py-1 rounded-md">
                                                    {selectedOptions[opt.name]}
                                                </span>
                                            )}
                                        </div>

                                        {opt.type === "color" ? (
                                            <div className="flex flex-wrap gap-4">
                                                {opt.values.map((val) => (
                                                    <button
                                                        key={val.label}
                                                        onClick={() => setSelectedOptions({ ...selectedOptions, [opt.name]: val.label })}
                                                        className={cn(
                                                            "group relative flex flex-col items-center gap-2 transition-all",
                                                            selectedOptions[opt.name] === val.label ? "scale-110" : "hover:scale-105"
                                                        )}
                                                    >
                                                        <div
                                                            className={cn(
                                                                "h-10 w-10 rounded-full border-2 transition-all p-1 shadow-sm",
                                                                selectedOptions[opt.name] === val.label ? "border-primary ring-4 ring-primary/10" : "border-border hover:border-gray-300"
                                                            )}
                                                        >
                                                            <div
                                                                className="h-full w-full rounded-full"
                                                                style={{ backgroundColor: val.colorCode || "#000" }}
                                                            />
                                                        </div>
                                                        <span className={cn(
                                                            "text-[10px] font-bold tracking-tight opacity-0 group-hover:opacity-100 transition-opacity",
                                                            selectedOptions[opt.name] === val.label ? "opacity-100 text-primary" : "text-gray-400"
                                                        )}>
                                                            {val.label}
                                                            {val.priceModifier !== 0 && ` (${val.priceModifier > 0 ? "+" : ""}${formatINR(val.priceModifier)})`}
                                                        </span>
                                                    </button>
                                                ))}
                                            </div>
                                        ) : (
                                            <div className="flex flex-wrap gap-3">
                                                {opt.values.map((val) => (
                                                    <button
                                                        key={val.label}
                                                        onClick={() => setSelectedOptions({ ...selectedOptions, [opt.name]: val.label })}
                                                        className={cn(
                                                            "px-6 py-3 rounded-xl border-2 text-sm font-bold transition-all flex flex-col items-start gap-1",
                                                            selectedOptions[opt.name] === val.label
                                                                ? "border-primary bg-primary/5 text-primary shadow-md shadow-primary/5"
                                                                : "border-border bg-white text-gray-500 hover:border-gray-300"
                                                        )}
                                                    >
                                                        <span>{val.label}</span>
                                                        {val.priceModifier !== 0 && (
                                                            <span className={cn(
                                                                "text-[10px] font-medium",
                                                                selectedOptions[opt.name] === val.label ? "text-primary/70" : "text-gray-400"
                                                            )}>
                                                                {val.priceModifier > 0 ? "+" : ""}{formatINR(val.priceModifier)}
                                                            </span>
                                                        )}
                                                    </button>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* Inventory Status Bar */}
                        {!PRODUCT_DISPLAY.isUnlimited && (PRODUCT_DISPLAY.isLowStock || PRODUCT_DISPLAY.isCriticalStock || PRODUCT_DISPLAY.isOutOfStock) && (
                            <div className="mt-8 space-y-3">
                                <div className={cn(
                                    "flex items-center gap-2 px-3 py-1.5 rounded-full border text-[11px] font-bold w-fit transition-all duration-500",
                                    PRODUCT_DISPLAY.stockColor
                                )}>
                                    {PRODUCT_DISPLAY.isCriticalStock ? (
                                        <Flame size={12} className="animate-pulse" />
                                    ) : PRODUCT_DISPLAY.isLowStock ? (
                                        <AlertTriangle size={12} />
                                    ) : null}
                                    <span className="uppercase tracking-wider">
                                        {PRODUCT_DISPLAY.stockLabel}
                                    </span>
                                </div>

                                {!PRODUCT_DISPLAY.isOutOfStock && (
                                    <div className="w-full max-w-sm space-y-1.5">
                                        <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                                            <motion.div
                                                initial={{ width: 0 }}
                                                animate={{ width: `${PRODUCT_DISPLAY.stockPercent}%` }}
                                                className={cn(
                                                    "h-full rounded-full transition-all duration-1000",
                                                    PRODUCT_DISPLAY.isCriticalStock ? "bg-rose-500" : "bg-amber-500"
                                                )}
                                            />
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Quantity & Add to Cart Container */}
                        <div className="mt-8 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between p-4 bg-gray-50/50 rounded-2xl border border-gray-100">
                            <div className="flex flex-col gap-2">
                                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Quantity</span>
                                <div className={`flex items-center w-fit overflow-hidden rounded-xl border border-border bg-white ${PRODUCT_DISPLAY.isOutOfStock ? "opacity-30 pointer-events-none" : ""}`}>
                                    <button
                                        type="button"
                                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                        className="flex h-12 w-12 items-center justify-center hover:bg-gray-50 transition-colors"
                                    >
                                        <Minus size={14} className="text-secondary" />
                                    </button>
                                    <span className="w-10 text-center text-sm font-bold text-secondary">{quantity}</span>
                                    <button
                                        type="button"
                                        onClick={() => {
                                            if (PRODUCT_DISPLAY.isUnlimited || quantity < (PRODUCT_DISPLAY.stock ?? 0)) {
                                                setQuantity(quantity + 1);
                                            }
                                        }}
                                        disabled={!PRODUCT_DISPLAY.isUnlimited && quantity >= (PRODUCT_DISPLAY.stock ?? 0)}
                                        className="flex h-12 w-12 items-center justify-center hover:bg-gray-50 transition-colors disabled:opacity-30"
                                    >
                                        <Plus size={14} className="text-secondary" />
                                    </button>
                                </div>
                            </div>

                            <div className="flex flex-col gap-2 flex-1 max-w-[280px]">
                                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Subtotal</span>
                                <span className="text-2xl font-black text-secondary">{formatINR(PRODUCT_DISPLAY.currentPrice * quantity)}</span>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <Button
                                className="h-14 bg-primary hover:bg-primary/90 text-white text-lg font-bold rounded-2xl shadow-lg shadow-primary/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
                                onClick={handleAddToCart}
                                disabled={PRODUCT_DISPLAY.isOutOfStock}
                            >
                                {PRODUCT_DISPLAY.isOutOfStock ? "Notify Me" : "Add to Cart"}
                            </Button>
                            <Button
                                variant="secondary"
                                className="h-14 bg-secondary text-white hover:bg-secondary/90 text-lg font-bold rounded-2xl shadow-lg shadow-secondary/10 transition-all hover:scale-[1.02] active:scale-[0.98]"
                                onClick={handleBuyNow}
                                disabled={PRODUCT_DISPLAY.isOutOfStock}
                            >
                                Buy Now
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
                                    <span className="text-sm font-medium text-gray-400">({reviewsList.length})</span>
                                </h3>
                                {!isReviewFormOpen && (
                                    <Button
                                        variant="outline"
                                        className="font-bold border-2 hover:bg-primary hover:text-white transition-all"
                                        onClick={() => user ? setIsReviewFormOpen(true) : router.push("/account/login")}
                                    >
                                        Write a Review
                                    </Button>
                                )}
                            </div>

                            <AnimatePresence>
                                {isReviewFormOpen && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: "auto" }}
                                        exit={{ opacity: 0, height: 0 }}
                                        className="overflow-hidden"
                                    >
                                        <form onSubmit={handleReviewSubmit} className="space-y-6 rounded-2xl bg-gray-50 p-8 border border-gray-100 shadow-sm mb-12">
                                            <div className="flex items-center justify-between">
                                                <h4 className="font-bold text-secondary">Your Review</h4>
                                                <div className="flex items-center gap-1">
                                                    {[1, 2, 3, 4, 5].map((star) => (
                                                        <button
                                                            key={star}
                                                            type="button"
                                                            onClick={() => setNewReview({ ...newReview, rating: star })}
                                                            className="transition-transform active:scale-125"
                                                        >
                                                            <Star
                                                                size={24}
                                                                className={cn(
                                                                    "transition-colors",
                                                                    star <= newReview.rating ? "fill-amber-400 text-amber-400" : "text-gray-300"
                                                                )}
                                                            />
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>
                                            <Textarea
                                                placeholder="Share your experience smoothly... How was the quality? Did it meet your expectations?"
                                                className="min-h-[120px] bg-white border-none shadow-inner resize-none focus-visible:ring-primary"
                                                value={newReview.comment}
                                                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setNewReview({ ...newReview, comment: e.target.value })}
                                                required
                                            />
                                            <div className="flex justify-end gap-3">
                                                <Button type="button" variant="ghost" className="font-bold" onClick={() => setIsReviewFormOpen(false)}>Cancel</Button>
                                                <Button type="submit" className="font-bold bg-primary px-8" disabled={isSubmittingReview}>
                                                    {isSubmittingReview ? "Posting..." : "Post Review"}
                                                </Button>
                                            </div>
                                        </form>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            <div className="space-y-8">
                                {reviewsList.length === 0 ? (
                                    <div className="text-center py-12 bg-gray-50/50 rounded-2xl border border-dashed border-gray-200">
                                        <MessageSquare className="mx-auto h-12 w-12 text-gray-300 mb-4" />
                                        <p className="text-sm font-medium text-gray-400 uppercase tracking-widest">No reviews yet. Be the first!</p>
                                    </div>
                                ) : (
                                    <div className="space-y-8">
                                        {reviewsList.map((review) => (
                                            <motion.div
                                                key={review.id}
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                className="space-y-3 p-6 rounded-2xl transition-colors hover:bg-gray-50/50 group border border-transparent hover:border-gray-100"
                                            >
                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center gap-3">
                                                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 font-black text-primary text-xs uppercase tracking-tighter">
                                                            {review.userName.slice(0, 2)}
                                                        </div>
                                                        <div>
                                                            <p className="text-sm font-bold text-secondary uppercase tracking-wide">{review.userName}</p>
                                                            {review.variant && (
                                                                <p className="text-[10px] font-bold text-primary bg-primary/5 px-2 py-0.5 rounded w-fit mb-1">
                                                                    Selected: {review.variant}
                                                                </p>
                                                            )}
                                                            <div className="flex items-center text-amber-400">
                                                                {[...Array(5)].map((_, i) => (
                                                                    <Star key={i} size={10} className={cn("fill-current", i < review.rating ? "" : "text-gray-200")} />
                                                                ))}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest bg-gray-100 px-2 py-1 rounded">Verified Owner</span>
                                                </div>
                                                <p className="text-sm leading-relaxed text-gray-600 font-medium">
                                                    {review.comment}
                                                </p>
                                                <p className="text-[9px] font-bold text-gray-300 uppercase tracking-widest pt-2">
                                                    {new Date(review.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                                                </p>
                                            </motion.div>
                                        ))}
                                    </div>
                                )}
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

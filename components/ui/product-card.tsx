"use client";

import { Star, ShoppingCart, Heart, Flame, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatINR } from "@/lib/utils";
import Link from "next/link";
import { useFavorites } from "@/context/favorites-context";
import { useCart } from "@/context/cart-context";

interface ProductCardProps {
    id: string;
    name: string;
    price: number;
    originalPrice?: number;
    rating: number;
    reviews: number;
    image: string;
    badge?: string;
    category: string;
    stock?: number;
    isUnlimited?: boolean;
}

export function ProductCard({ id, name, price, originalPrice, rating, reviews, image, badge, category, stock = 0, isUnlimited = true }: ProductCardProps) {
    const discount = originalPrice ? Math.round(((originalPrice - price) / originalPrice) * 100) : 0;
    const { addToFavorites, removeFromFavorites, isFavorite } = useFavorites();
    const { addToCart } = useCart();
    const isInFavorites = isFavorite(id);

    const isOutOfStock = !isUnlimited && stock <= 0;
    const isCriticalStock = !isUnlimited && stock > 0 && stock <= 2;
    const isLowStock = !isUnlimited && stock > 2 && stock <= 10;

    const handleToggleFavorite = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

        if (isInFavorites) {
            removeFromFavorites(id);
        } else {
            addToFavorites({
                id,
                name,
                price,
                originalPrice,
                image,
                category,
                rating,
                reviews,
            });
        }
    };

    const handleAddToCart = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (isOutOfStock) return;

        addToCart({
            id,
            name,
            price,
            image,
            category,
            quantity: 1,
        });
    };

    return (
        <div className={`group relative flex flex-col overflow-hidden rounded-xl border border-border bg-white transition-all hover:shadow-xl ${isOutOfStock ? "opacity-75" : ""}`}>
            {/* Stock Badges */}
            {isOutOfStock ? (
                <div className="absolute left-3 top-3 z-10 flex items-center gap-1 rounded-full bg-gray-900/90 px-2.5 py-1 text-[9px] font-black uppercase tracking-widest text-white shadow-lg backdrop-blur-md">
                    <span className="h-1.5 w-1.5 rounded-full bg-gray-400" />
                    Sold Out
                </div>
            ) : isCriticalStock ? (
                <div className="absolute left-3 top-3 z-10 flex items-center gap-1 rounded-full bg-rose-600 px-2.5 py-1 text-[9px] font-black uppercase tracking-widest text-white shadow-lg animate-pulse">
                    <Flame size={10} className="fill-current" />
                    Last {stock} units
                </div>
            ) : isLowStock ? (
                <div className="absolute left-3 top-3 z-10 flex items-center gap-1 rounded-full bg-amber-500 px-2.5 py-1 text-[9px] font-black uppercase tracking-widest text-white shadow-lg">
                    <AlertCircle size={10} className="fill-current" />
                    Stock Low ({stock})
                </div>
            ) : badge && (
                <span className="absolute left-3 top-3 z-10 rounded-full bg-primary px-3 py-1 text-[9px] font-black uppercase tracking-widest text-white shadow-lg">
                    {badge}
                </span>
            )}

            {/* Discount Badge */}
            {discount > 0 && !isOutOfStock && (
                <span className="absolute right-3 top-3 z-10 rounded-full bg-rose-500 px-3 py-1 text-[10px] font-bold text-white shadow-sm">
                    -{discount}%
                </span>
            )}

            {/* Image Placeholder */}
            <Link href={`/product/${id}`} className="relative aspect-square overflow-hidden bg-gray-50/50 p-4">
                {image ? (
                    <img
                        src={image}
                        alt={name}
                        className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-105"
                    />
                ) : (
                    <div className="flex h-full w-full items-center justify-center text-[10px] font-medium text-gray-300 uppercase tracking-widest transition-transform group-hover:scale-105">
                        {category} Product
                    </div>
                )}

                {/* Out of Stock Overlay */}
                {isOutOfStock && (
                    <div className="absolute inset-0 z-0 bg-white/40 backdrop-blur-[2px] flex items-center justify-center pointer-events-none" />
                )}

                <Button
                    variant="ghost"
                    size="icon"
                    onClick={handleToggleFavorite}
                    className={`absolute bottom-4 right-4 h-9 w-9 translate-y-12 rounded-full bg-white opacity-0 shadow-lg transition-all hover:bg-primary hover:text-white group-hover:translate-y-0 group-hover:opacity-100 ${isInFavorites ? "text-rose-500 hover:text-white" : ""
                        }`}
                >
                    <Heart className={`h-5 w-5 ${isInFavorites ? "fill-current" : ""}`} />
                </Button>
            </Link>

            {/* Content */}
            <div className="flex flex-1 flex-col p-4">
                <p className="text-xs font-medium text-gray-400 uppercase tracking-wide">{category}</p>
                <Link href={`/product/${id}`} className="mt-1 flex-1">
                    <h3 className="line-clamp-2 text-sm font-semibold text-secondary hover:text-primary active:text-primary transition-colors">
                        {name}
                    </h3>
                </Link>

                {/* Rating */}
                <div className="mt-2 flex items-center gap-1">
                    <div className="flex items-center text-amber-400">
                        {[...Array(5)].map((_, i) => (
                            <Star key={i} className={`h-3 w-3 fill-current ${i < Math.floor(rating) ? "" : "text-gray-200"}`} />
                        ))}
                    </div>
                    <span className="text-[10px] text-gray-400">({reviews})</span>
                </div>

                {/* Price */}
                <div className="mt-4 flex items-center justify-between">
                    <div className="flex flex-col">
                        <span className={`text-lg font-bold ${isOutOfStock ? "text-gray-400" : "text-secondary"}`}>
                            {formatINR(price)}
                        </span>
                        {originalPrice && !isOutOfStock && (
                            <span className="text-xs text-gray-400 line-through">{formatINR(originalPrice)}</span>
                        )}
                    </div>
                    <Button
                        size="icon"
                        disabled={isOutOfStock}
                        className={`h-9 w-9 shrink-0 rounded-lg transition-all ${isOutOfStock ? "bg-gray-100 text-gray-400" : ""}`}
                        onClick={handleAddToCart}
                    >
                        <ShoppingCart className="h-4 w-4" />
                    </Button>
                </div>
            </div>
        </div>
    );
}

"use client";

import { Star, ShoppingCart, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatINR } from "@/lib/utils";
import Link from "next/link";

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
}

export function ProductCard({ id, name, price, originalPrice, rating, reviews, image, badge, category }: ProductCardProps) {
    const discount = originalPrice ? Math.round(((originalPrice - price) / originalPrice) * 100) : 0;

    return (
        <div className="group relative flex flex-col overflow-hidden rounded-xl border border-border bg-white transition-all hover:shadow-xl">
            {/* Badge */}
            {badge && (
                <span className="absolute left-3 top-3 z-10 rounded-full bg-primary px-3 py-1 text-[10px] font-bold uppercase text-white">
                    {badge}
                </span>
            )}

            {/* Discount Badge */}
            {discount > 0 && (
                <span className="absolute right-3 top-3 z-10 rounded-full bg-rose-500 px-3 py-1 text-[10px] font-bold text-white">
                    -{discount}%
                </span>
            )}

            {/* Image Placeholder */}
            <Link href={`/product/${id}`} className="relative aspect-square overflow-hidden bg-gray-100">
                {image ? (
                    <img
                        src={image}
                        alt={name}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                ) : (
                    <div className="flex h-full w-full items-center justify-center text-[10px] font-medium text-gray-300 uppercase tracking-widest transition-transform group-hover:scale-110">
                        {category} Product
                    </div>
                )}
                <Button
                    variant="ghost"
                    size="icon"
                    className="absolute bottom-4 right-4 h-9 w-9 translate-y-12 rounded-full bg-white opacity-0 shadow-lg transition-all hover:bg-primary hover:text-white group-hover:translate-y-0 group-hover:opacity-100"
                >
                    <Heart className="h-5 w-5" />
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
                        <span className="text-lg font-bold text-secondary">{formatINR(price)}</span>
                        {originalPrice && (
                            <span className="text-xs text-gray-400 line-through">{formatINR(originalPrice)}</span>
                        )}
                    </div>
                    <Button size="icon" className="h-9 w-9 shrink-0 rounded-lg">
                        <ShoppingCart className="h-4 w-4" />
                    </Button>
                </div>
            </div>
        </div>
    );
}

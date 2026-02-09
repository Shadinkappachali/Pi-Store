"use client";

import { Heart, ShoppingCart, Trash2 } from "lucide-react";
import { useFavorites } from "@/context/favorites-context";
import { useCart } from "@/context/cart-context";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { formatINR } from "@/lib/utils";
import Link from "next/link";
import { motion } from "framer-motion";

export default function FavoritesPage() {
    const { favorites, removeFromFavorites, clearFavorites } = useFavorites();
    const { addToCart } = useCart();

    const handleAddToCart = (item: import("@/context/favorites-context").FavoriteItem) => {
        addToCart({
            id: item.id,
            name: item.name,
            price: item.price,
            image: item.image,
            category: item.category,
            quantity: 1,
        });
    };

    if (favorites.length === 0) {
        return (
            <div className="min-h-[70vh] flex items-center justify-center">
                <Container>
                    <div className="text-center py-20">
                        <div className="inline-flex h-20 w-20 items-center justify-center rounded-full bg-gray-100 mb-6">
                            <Heart className="h-10 w-10 text-gray-400" />
                        </div>
                        <h1 className="text-3xl font-bold text-secondary mb-3">Your Wishlist is Empty</h1>
                        <p className="text-gray-500 mb-8 max-w-md mx-auto">
                            Start adding products you love to your wishlist by clicking the heart icon on any product.
                        </p>
                        <Button asChild size="lg" className="rounded-full px-8">
                            <Link href="/shop">Browse Products</Link>
                        </Button>
                    </div>
                </Container>
            </div>
        );
    }

    return (
        <div className="py-12 bg-gray-50/50">
            <Container>
                <div className="mb-8 flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-secondary">My Wishlist</h1>
                        <p className="text-gray-500 mt-1">{favorites.length} {favorites.length === 1 ? "item" : "items"} saved</p>
                    </div>
                    {favorites.length > 0 && (
                        <Button
                            variant="outline"
                            onClick={clearFavorites}
                            className="text-red-500 hover:text-red-600 hover:bg-red-50"
                        >
                            <Trash2 className="h-4 w-4 mr-2" />
                            Clear All
                        </Button>
                    )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {favorites.map((item, index) => (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05 }}
                            className="group relative flex flex-col overflow-hidden rounded-xl border border-border bg-white transition-all hover:shadow-xl"
                        >
                            {/* Remove Button */}
                            <button
                                onClick={() => removeFromFavorites(item.id)}
                                className="absolute right-3 top-3 z-10 h-8 w-8 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-lg hover:bg-red-50 transition-colors"
                            >
                                <Heart className="h-4 w-4 fill-rose-500 text-rose-500" />
                            </button>

                            {/* Image */}
                            <Link href={`/product/${item.id}`} className="relative aspect-square overflow-hidden bg-gray-100">
                                {item.image ? (
                                    <img
                                        src={item.image}
                                        alt={item.name}
                                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                                    />
                                ) : (
                                    <div className="flex h-full w-full items-center justify-center text-[10px] font-medium text-gray-300 uppercase tracking-widest">
                                        {item.category} Product
                                    </div>
                                )}
                            </Link>

                            {/* Content */}
                            <div className="flex flex-1 flex-col p-4">
                                <p className="text-xs font-medium text-gray-400 uppercase tracking-wide">{item.category}</p>
                                <Link href={`/product/${item.id}`} className="mt-1 flex-1">
                                    <h3 className="line-clamp-2 text-sm font-semibold text-secondary hover:text-primary transition-colors">
                                        {item.name}
                                    </h3>
                                </Link>

                                {/* Price */}
                                <div className="mt-4 flex items-center justify-between">
                                    <div className="flex flex-col">
                                        <span className="text-lg font-bold text-secondary">{formatINR(item.price)}</span>
                                        {item.originalPrice && (
                                            <span className="text-xs text-gray-400 line-through">{formatINR(item.originalPrice)}</span>
                                        )}
                                    </div>
                                    <Button
                                        size="icon"
                                        className="h-9 w-9 shrink-0 rounded-lg"
                                        onClick={() => handleAddToCart(item)}
                                    >
                                        <ShoppingCart className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </Container>
        </div>
    );
}

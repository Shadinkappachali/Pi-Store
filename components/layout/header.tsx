"use client";

import Link from "next/link";
import { Search, ShoppingCart, User, Heart, Menu, X } from "lucide-react";
import { useCart } from "@/context/cart-context";
import { useFavorites } from "@/context/favorites-context";
import { useState, useEffect } from "react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { ModernSearch } from "@/components/ui/modern-search";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Smartphone, Laptop, ShoppingBag, LogOut, Settings, LayoutDashboard } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/context/auth-context";
import { usePathname } from "next/navigation";

export function Header() {
    const { user, logout, isAdmin } = useAuth();
    const { totalItems } = useCart();
    const { totalFavorites } = useFavorites();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isStoreHovered, setIsStoreHovered] = useState(false);
    const [isMounted, setIsMounted] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (pathname?.startsWith("/admin")) {
        return null;
    }

    return (
        <header className="sticky top-0 z-50 w-full border-b border-border bg-white/80 backdrop-blur-md">
            <Container>
                <div className="flex h-20 items-center justify-between gap-4">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2">
                        <span className="text-2xl font-bold tracking-tighter text-secondary">
                            Pi<span className="text-primary">Store</span>
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden items-center gap-8 lg:flex">
                        {/* Store Dropdown */}
                        <div
                            className="relative py-8"
                            onMouseEnter={() => setIsStoreHovered(true)}
                            onMouseLeave={() => setIsStoreHovered(false)}
                        >
                            <Link
                                href="/shop"
                                className={cn(
                                    "flex items-center gap-1 text-sm font-bold transition-colors",
                                    isStoreHovered ? "text-primary" : "text-secondary"
                                )}
                            >
                                Store
                                <ChevronDown size={14} className={cn("transition-transform duration-300", isStoreHovered && "rotate-180")} />
                            </Link>

                            <AnimatePresence>
                                {isStoreHovered && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                        transition={{ duration: 0.2 }}
                                        className="absolute top-full left-0 w-64 bg-white rounded-2xl shadow-2xl border border-border p-2 overflow-hidden"
                                    >
                                        <div className="flex flex-col gap-1">
                                            <Link
                                                href="/category/mobile"
                                                className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors group"
                                            >
                                                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                                                    <Smartphone size={20} />
                                                </div>
                                                <div>
                                                    <p className="text-sm font-bold text-secondary">Mobile Accessories</p>
                                                    <p className="text-[10px] text-gray-400 font-medium">Cases, Chargers & more</p>
                                                </div>
                                            </Link>
                                            <Link
                                                href="/category/laptop"
                                                className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors group"
                                            >
                                                <div className="h-10 w-10 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-500 group-hover:bg-blue-500 group-hover:text-white transition-colors">
                                                    <Laptop size={20} />
                                                </div>
                                                <div>
                                                    <p className="text-sm font-bold text-secondary">Laptop Accessories</p>
                                                    <p className="text-[10px] text-gray-400 font-medium">Hubs, Sleeves & bags</p>
                                                </div>
                                            </Link>
                                            <div className="mt-1 pt-1 border-t border-border">
                                                <Link
                                                    href="/shop"
                                                    className="flex items-center justify-between p-3 rounded-xl hover:bg-primary/5 text-primary transition-colors font-bold text-xs"
                                                >
                                                    Browse All Products
                                                    <ShoppingBag size={14} />
                                                </Link>
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        <Link href="/pc-builder" className="text-sm font-bold text-secondary hover:text-primary transition-colors">
                            PC Builder
                        </Link>
                        <Link href="/pc-builds" className="text-sm font-bold text-secondary hover:text-primary transition-colors">
                            Pre-built PCs
                        </Link>
                        <Link href="/contact" className="text-sm font-bold text-secondary hover:text-primary transition-colors">
                            Contact
                        </Link>
                    </nav>

                    {/* Modern Search - Desktop */}
                    <div className="hidden max-w-sm flex-1 lg:block">
                        <ModernSearch />
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2">
                        {user ? (
                            <div className="relative group">
                                <Button variant="ghost" size="icon" className="hidden sm:flex rounded-full overflow-hidden border border-border">
                                    {user.photoURL ? (
                                        <img src={user.photoURL} alt={user.displayName || "User"} className="h-full w-full object-cover" />
                                    ) : (
                                        <User className="h-5 w-5" />
                                    )}
                                </Button>
                                {/* Simple Dropdown */}
                                <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-xl shadow-xl border border-border p-2 opacity-0 translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all z-50 before:absolute before:-top-2 before:left-0 before:w-full before:h-2 before:bg-transparent before:content-['']">
                                    <div className="px-3 py-2 border-b border-border mb-1">
                                        <p className="text-xs font-bold text-secondary truncate">{user.displayName || "User"}</p>
                                        <p className="text-[10px] text-gray-400 truncate">{user.email}</p>
                                    </div>
                                    {isAdmin && (
                                        <Link href="/admin" className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-50 text-xs font-bold text-primary transition-colors">
                                            <LayoutDashboard size={14} />
                                            Admin Dashboard
                                        </Link>
                                    )}
                                    <button
                                        onClick={() => logout()}
                                        className="w-full flex items-center gap-2 p-2 rounded-lg hover:bg-red-50 text-xs font-bold text-red-500 transition-colors mt-1"
                                    >
                                        <LogOut size={14} />
                                        Logout
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <Button variant="ghost" size="icon" className="hidden sm:flex" asChild>
                                <Link href="/account/login">
                                    <User className="h-5 w-5" />
                                </Link>
                            </Button>
                        )}
                        <Button variant="ghost" size="icon" className="relative" asChild>
                            <Link href="/favorites">
                                <Heart className="h-5 w-5" />
                                {isMounted && totalFavorites > 0 && (
                                    <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-rose-500 text-[10px] font-bold text-white">
                                        {totalFavorites}
                                    </span>
                                )}
                            </Link>
                        </Button>
                        <Button variant="ghost" size="icon" className="relative" asChild>
                            <Link href="/cart">
                                <ShoppingCart className="h-5 w-5" />
                                {isMounted && totalItems > 0 && (
                                    <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-white">
                                        {totalItems}
                                    </span>
                                )}
                            </Link>
                        </Button>

                        {/* Mobile Menu Toggle */}
                        <Button
                            variant="ghost"
                            size="icon"
                            className="lg:hidden"
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                        >
                            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                        </Button>
                    </div>
                </div>

                {/* Modern Search Bar - Mobile */}
                <div className="pb-4 lg:hidden">
                    <ModernSearch />
                </div>
            </Container>

            {/* Mobile Navigation Menu */}
            {isMenuOpen && (
                <div className="absolute left-0 top-full w-full border-b border-border bg-white p-4 lg:hidden">
                    <nav className="flex flex-col gap-4">
                        {isAdmin && (
                            <Link href="/admin" className="text-lg font-bold text-primary flex items-center gap-2">
                                <LayoutDashboard size={20} />
                                Admin Dashboard
                            </Link>
                        )}
                        <Link href="/category/mobile" className="text-lg font-medium">Mobile Accessories</Link>
                        <Link href="/category/laptop" className="text-lg font-medium">Laptop Accessories</Link>
                        <Link href="/shop" className="text-lg font-medium">All Products</Link>
                        <Link href="/pc-builder" className="text-lg font-medium">PC Builder</Link>
                        <Link href="/pc-builds" className="text-lg font-medium">Pre-built PCs</Link>
                        <Link href="/contact" className="text-lg font-medium">Contact Us</Link>
                    </nav>
                </div>
            )}
        </header>
    );
}

"use client";

import Link from "next/link";
import { Search, ShoppingCart, User, Heart, Menu, X } from "lucide-react";
import { useCart } from "@/context/cart-context";
import { useState } from "react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function Header() {
    const { totalItems } = useCart();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

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
                        <Link href="/category/mobile" className="text-sm font-medium hover:text-primary transition-colors">
                            Mobile Accessories
                        </Link>
                        <Link href="/category/laptop" className="text-sm font-medium hover:text-primary transition-colors">
                            Laptop Accessories
                        </Link>
                        <Link href="/shop" className="text-sm font-medium hover:text-primary transition-colors">
                            Store
                        </Link>
                        <Link href="/pc-builder" className="text-sm font-medium hover:text-primary transition-colors">
                            PC Builder
                        </Link>
                        <Link href="/contact" className="text-sm font-medium hover:text-primary transition-colors">
                            Contact
                        </Link>
                    </nav>

                    {/* Search Bar - Desktop */}
                    <div className="hidden max-w-sm flex-1 lg:block">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                            <Input
                                type="search"
                                placeholder="Search accessories..."
                                className="pl-10"
                            />
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2">
                        <Button variant="ghost" size="icon" className="hidden sm:flex">
                            <User className="h-5 w-5" />
                        </Button>
                        <Button variant="ghost" size="icon" className="hidden sm:flex">
                            <Heart className="h-5 w-5" />
                        </Button>
                        <Button variant="ghost" size="icon" className="relative">
                            <ShoppingCart className="h-5 w-5" />
                            <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-white">
                                {totalItems}
                            </span>
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

                {/* Mobile Search Bar */}
                <div className="pb-4 lg:hidden">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                            type="search"
                            placeholder="Search products..."
                            className="pl-10"
                        />
                    </div>
                </div>
            </Container>

            {/* Mobile Navigation Menu */}
            {isMenuOpen && (
                <div className="absolute left-0 top-full w-full border-b border-border bg-white p-4 lg:hidden">
                    <nav className="flex flex-col gap-4">
                        <Link href="/category/mobile" className="text-lg font-medium">Mobile Accessories</Link>
                        <Link href="/category/laptop" className="text-lg font-medium">Laptop Accessories</Link>
                        <Link href="/shop" className="text-lg font-medium">All Products</Link>
                        <Link href="/pc-builder" className="text-lg font-medium">PC Builder</Link>
                        <Link href="/contact" className="text-lg font-medium">Contact Us</Link>
                        <Link href="/account" className="text-lg font-medium">My Account</Link>
                    </nav>
                </div>
            )}
        </header>
    );
}

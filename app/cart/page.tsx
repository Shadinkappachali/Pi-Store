"use client";

import { useCart } from "@/context/cart-context";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { formatINR } from "@/lib/utils";
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

export default function CartPage() {
    const { cart, updateQuantity, removeFromCart, totalPrice, totalItems } = useCart();

    if (cart.length === 0) {
        return (
            <div className="flex min-h-[70vh] flex-col items-center justify-center bg-white px-4 text-center">
                <div className="flex h-24 w-24 items-center justify-center rounded-full bg-gray-50 text-gray-400">
                    <ShoppingBag size={48} />
                </div>
                <h1 className="mt-8 text-3xl font-extrabold text-secondary">Your cart is empty</h1>
                <p className="mt-4 text-lg text-gray-500 max-w-md">
                    Looks like you haven't added anything to your cart yet. Explore our premium accessories and find what you need.
                </p>
                <Button asChild size="lg" className="mt-10 h-14 px-8 text-lg font-bold">
                    <Link href="/shop">Start Shopping</Link>
                </Button>
            </div>
        );
    }

    return (
        <div className="bg-gray-50/50 pb-20 pt-10">
            <Container>
                <h1 className="text-3xl font-extrabold text-secondary sm:text-4xl">Shopping Cart</h1>
                <p className="mt-2 text-gray-500">You have {totalItems} items in your cart</p>

                <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-3">
                    {/* Cart Items */}
                    <div className="lg:col-span-2 space-y-4">
                        <AnimatePresence>
                            {cart.map((item) => (
                                <motion.div
                                    key={item.id}
                                    layout
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    className="flex flex-col gap-4 rounded-2xl border border-border bg-white p-4 sm:flex-row sm:items-center sm:p-6"
                                >
                                    {/* Image Placeholder */}
                                    <div className="h-24 w-24 shrink-0 rounded-xl bg-gray-100 flex items-center justify-center text-[10px] font-bold text-gray-300 uppercase tracking-widest sm:h-32 sm:w-32">
                                        {item.category}
                                    </div>

                                    {/* Details */}
                                    <div className="flex flex-1 flex-col">
                                        <div className="flex justify-between gap-4">
                                            <Link href={`/product/${item.id}`} className="font-bold text-secondary hover:text-primary transition-colors line-clamp-2">
                                                {item.name}
                                            </Link>
                                            <button
                                                onClick={() => removeFromCart(item.id)}
                                                className="text-gray-400 hover:text-red-500 transition-colors"
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                        <p className="mt-1 text-xs font-bold text-primary uppercase tracking-widest">{item.category}</p>

                                        <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
                                            {/* Quantity Control */}
                                            <div className="flex items-center overflow-hidden rounded-lg border border-border bg-gray-50">
                                                <button
                                                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                    className="flex h-9 w-9 items-center justify-center hover:bg-white active:scale-95 transition-all"
                                                >
                                                    <Minus size={14} />
                                                </button>
                                                <span className="w-8 text-center text-sm font-bold text-secondary">{item.quantity}</span>
                                                <button
                                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                    className="flex h-9 w-9 items-center justify-center hover:bg-white active:scale-95 transition-all"
                                                >
                                                    <Plus size={14} />
                                                </button>
                                            </div>

                                            <span className="text-lg font-bold text-secondary">{formatINR(item.price * item.quantity)}</span>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>

                    {/* Summary Sidebar */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-28 rounded-2xl border border-border bg-white p-6 shadow-sm">
                            <h2 className="text-xl font-bold text-secondary">Order Summary</h2>

                            <div className="mt-8 space-y-4">
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-500">Subtotal ({totalItems} items)</span>
                                    <span className="font-bold text-secondary">{formatINR(totalPrice)}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-500">Shipping</span>
                                    <span className="font-bold text-green-600">FREE</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-500">Tax (Estimated)</span>
                                    <span className="font-bold text-secondary">₹0</span>
                                </div>

                                <div className="border-t border-border pt-4">
                                    <div className="flex justify-between">
                                        <span className="text-lg font-bold text-secondary">Total Amount</span>
                                        <span className="text-2xl font-extrabold text-primary">{formatINR(totalPrice)}</span>
                                    </div>
                                </div>
                            </div>

                            <Button asChild size="lg" className="mt-8 h-14 w-full text-lg font-bold">
                                <Link href="/checkout">
                                    Proceed to Checkout
                                    <ArrowRight className="ml-2 h-5 w-5" />
                                </Link>
                            </Button>

                            <div className="mt-6 flex items-center justify-center gap-2 text-xs font-bold text-gray-400 uppercase tracking-widest">
                                <ShieldCheck size={16} />
                                Secure Checkout Guarantee
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    );
}

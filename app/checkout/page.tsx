"use client";

import { useCart } from "@/context/cart-context";
import { formatINR } from "@/lib/utils";
import { useState } from "react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    CheckCircle2,
    MapPin,
    CreditCard,
    Truck,
    ChevronRight,
    ShieldCheck,
    Smartphone,
    CreditCard as CardIcon,
    Wallet,
    ArrowLeft
} from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

type Step = "address" | "shipping" | "payment" | "success";

export default function CheckoutPage() {
    const { cart, totalPrice, clearCart } = useCart();
    const [step, setStep] = useState<Step>("address");
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        address: "",
        city: "",
        pincode: "",
        paymentMethod: "upi"
    });

    if (cart.length === 0 && step !== "success") {
        return (
            <div className="flex min-h-[70vh] flex-col items-center justify-center text-center">
                <h2 className="text-2xl font-bold">Your cart is empty</h2>
                <Button asChild className="mt-4"><Link href="/shop">Go to Shop</Link></Button>
            </div>
        );
    }

    const handleNext = () => {
        if (step === "address") setStep("shipping");
        else if (step === "shipping") setStep("payment");
        else if (step === "payment") {
            setStep("success");
            clearCart();
        }
    };

    const steps = [
        { id: "address", label: "Address", icon: MapPin },
        { id: "shipping", label: "Shipping", icon: Truck },
        { id: "payment", label: "Payment", icon: CreditCard },
    ];

    return (
        <div className="bg-gray-50/50 pb-20 pt-10 min-h-[90vh]">
            <Container>
                {step !== "success" && (
                    <>
                        {/* Multi-step indicator */}
                        <div className="mx-auto mb-12 max-w-2xl">
                            <div className="relative flex items-center justify-between">
                                <div className="absolute left-0 top-1/2 -z-10 h-0.5 w-full -translate-y-1/2 bg-border" />
                                {steps.map((s, i) => {
                                    const Icon = s.icon;
                                    const isActive = step === s.id;
                                    const isCompleted = steps.findIndex(x => x.id === step) > i;
                                    return (
                                        <div key={s.id} className="bg-gray-50 flex flex-col items-center gap-2 px-4">
                                            <div className={`flex h-10 w-10 items-center justify-center rounded-full border-2 transition-all ${isActive ? 'border-primary bg-primary text-white' : isCompleted ? 'border-primary bg-primary/10 text-primary' : 'border-border bg-white text-gray-400'}`}>
                                                {isCompleted ? <CheckCircle2 size={20} /> : <Icon size={20} />}
                                            </div>
                                            <span className={`text-xs font-bold uppercase tracking-widest ${isActive ? 'text-primary' : 'text-gray-500'}`}>{s.label}</span>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
                            {/* Form Area */}
                            <div className="lg:col-span-2">
                                <AnimatePresence mode="wait">
                                    {step === "address" && (
                                        <motion.div
                                            key="address"
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: -20 }}
                                            className="space-y-6 rounded-3xl border border-border bg-white p-8"
                                        >
                                            <h2 className="text-2xl font-bold text-secondary">Shipping Address</h2>
                                            <form
                                                className="grid grid-cols-1 gap-4 sm:grid-cols-2"
                                                onSubmit={(e) => {
                                                    e.preventDefault();
                                                    handleNext();
                                                }}
                                            >
                                                <div className="space-y-2">
                                                    <label className="text-xs font-bold uppercase text-gray-400">Full Name</label>
                                                    <Input placeholder="John Doe" required />
                                                </div>
                                                <div className="space-y-2">
                                                    <label className="text-xs font-bold uppercase text-gray-400">Email Address</label>
                                                    <Input type="email" placeholder="john@example.com" required />
                                                </div>
                                                <div className="sm:col-span-2 space-y-2">
                                                    <label className="text-xs font-bold uppercase text-gray-400">Street Address</label>
                                                    <Input placeholder="Flat, House no., Building, Company, Apartment" required />
                                                </div>
                                                <div className="space-y-2">
                                                    <label className="text-xs font-bold uppercase text-gray-400">City</label>
                                                    <Input placeholder="Bangalore" required />
                                                </div>
                                                <div className="space-y-2">
                                                    <label className="text-xs font-bold uppercase text-gray-400">Pincode</label>
                                                    <Input placeholder="560001" maxLength={6} required />
                                                </div>
                                                <Button type="submit" className="h-14 w-full text-lg font-bold sm:col-span-2 mt-4">Continue to Shipping</Button>
                                            </form>
                                        </motion.div>
                                    )}

                                    {step === "shipping" && (
                                        <motion.div
                                            key="shipping"
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: -20 }}
                                            className="space-y-6 rounded-3xl border border-border bg-white p-8"
                                        >
                                            <h2 className="text-2xl font-bold text-secondary">Delivery Method</h2>
                                            <div className="space-y-4">
                                                <div className="flex items-center justify-between rounded-2xl border-2 border-primary bg-primary/5 p-6 transition-all">
                                                    <div className="flex gap-4">
                                                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-white">
                                                            <Truck size={20} />
                                                        </div>
                                                        <div>
                                                            <p className="font-bold text-secondary">Standard Delivery</p>
                                                            <p className="text-sm text-gray-500">2-4 working days</p>
                                                        </div>
                                                    </div>
                                                    <p className="font-bold text-green-600 font-bold uppercase text-xs">Free</p>
                                                </div>

                                                <div className="flex items-center justify-between rounded-2xl border border-border p-6 transition-all opacity-50 cursor-not-allowed">
                                                    <div className="flex gap-4">
                                                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-gray-400">
                                                            <Truck size={20} />
                                                        </div>
                                                        <div>
                                                            <p className="font-bold text-gray-400">Express Delivery</p>
                                                            <p className="text-sm text-gray-400">24-hour delivery (Coming soon)</p>
                                                        </div>
                                                    </div>
                                                    <p className="font-bold text-gray-400 font-bold uppercase text-xs">₹99</p>
                                                </div>
                                            </div>

                                            <div className="flex gap-4">
                                                <Button variant="outline" className="h-14 w-1/3" onClick={() => setStep("address")}>Back</Button>
                                                <Button className="h-14 w-2/3 text-lg font-bold" onClick={handleNext}>Continue to Payment</Button>
                                            </div>
                                        </motion.div>
                                    )}

                                    {step === "payment" && (
                                        <motion.div
                                            key="payment"
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: -20 }}
                                            className="space-y-6 rounded-3xl border border-border bg-white p-8"
                                        >
                                            <h2 className="text-2xl font-bold text-secondary">Payment Method</h2>
                                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                                                {[
                                                    { id: 'upi', label: 'UPI', icon: Smartphone, color: 'text-indigo-600' },
                                                    { id: 'card', label: 'Card', icon: CardIcon, color: 'text-emerald-600' },
                                                    { id: 'cod', label: 'Cash', icon: Wallet, color: 'text-amber-600' }
                                                ].map((m) => {
                                                    const Icon = m.icon;
                                                    const active = formData.paymentMethod === m.id;
                                                    return (
                                                        <button
                                                            key={m.id}
                                                            onClick={() => setFormData({ ...formData, paymentMethod: m.id })}
                                                            className={`flex flex-col items-center justify-center gap-3 rounded-2xl border-2 p-6 transition-all ${active ? 'border-primary bg-primary/5' : 'border-border bg-white hover:bg-gray-50'}`}
                                                        >
                                                            <Icon className={`h-8 w-8 ${m.color}`} />
                                                            <span className={`text-xs font-bold uppercase tracking-widest ${active ? 'text-primary' : 'text-gray-500'}`}>{m.label}</span>
                                                        </button>
                                                    );
                                                })}
                                            </div>

                                            <div className="rounded-2xl bg-gray-50 p-6 space-y-4">
                                                {formData.paymentMethod === 'upi' && (
                                                    <div className="text-center space-y-4">
                                                        <p className="text-sm font-medium text-gray-500">Pay using any UPI App (GPay, PhonePe, Paytm)</p>
                                                        <div className="flex justify-center">
                                                            <div className="h-10 w-40 rounded bg-gray-200 animate-pulse" />
                                                        </div>
                                                    </div>
                                                )}
                                                {formData.paymentMethod === 'card' && (
                                                    <div className="space-y-4">
                                                        <Input placeholder="Card Number" />
                                                        <div className="grid grid-cols-2 gap-4">
                                                            <Input placeholder="MM/YY" />
                                                            <Input placeholder="CVV" type="password" />
                                                        </div>
                                                    </div>
                                                )}
                                                {formData.paymentMethod === 'cod' && (
                                                    <p className="text-center text-sm font-medium text-gray-500">Pay cash upon secure delivery at your doorstep.</p>
                                                )}
                                            </div>

                                            <div className="flex gap-4">
                                                <Button variant="outline" className="h-14 w-1/3" onClick={() => setStep("shipping")}>Back</Button>
                                                <Button className="h-14 w-2/3 text-lg font-bold" onClick={handleNext}>Complete Order</Button>
                                            </div>
                                            <div className="flex items-center justify-center gap-2 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                                                <ShieldCheck size={14} />
                                                Your payment is 100% secure with SSL
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>

                            {/* Order Summary Sidebar */}
                            <div className="lg:col-span-1">
                                <div className="sticky top-28 space-y-6 rounded-3xl border border-border bg-white p-6 shadow-sm">
                                    <h3 className="text-lg font-bold text-secondary">Order Summary</h3>
                                    <div className="max-h-[300px] overflow-y-auto space-y-4 pr-2 custom-scrollbar">
                                        {cart.map((item) => (
                                            <div key={item.id} className="flex gap-4">
                                                <div className="h-16 w-16 shrink-0 rounded-lg bg-gray-50 border border-border/50 flex items-center justify-center text-[8px] font-bold text-gray-400 uppercase text-center p-1">{item.category}</div>
                                                <div className="flex-1">
                                                    <p className="text-xs font-bold text-secondary line-clamp-1">{item.name}</p>
                                                    <p className="text-xs text-gray-400 mt-1">Qty: {item.quantity}</p>
                                                    <p className="text-sm font-bold text-primary mt-1">{formatINR(item.price * item.quantity)}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="border-t border-border pt-4 space-y-2">
                                        <div className="flex justify-between text-sm">
                                            <span className="text-gray-500">Subtotal</span>
                                            <span className="font-bold text-secondary">{formatINR(totalPrice)}</span>
                                        </div>
                                        <div className="flex justify-between text-sm">
                                            <span className="text-gray-500">Shipping</span>
                                            <span className="font-bold text-green-600">FREE</span>
                                        </div>
                                        <div className="flex justify-between pt-4">
                                            <span className="text-lg font-bold text-secondary">Total</span>
                                            <span className="text-2xl font-extrabold text-primary">{formatINR(totalPrice)}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                )}

                {/* Success Page */}
                {step === "success" && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="mx-auto flex max-w-2xl flex-col items-center justify-center rounded-3xl bg-white p-12 text-center shadow-xl border border-border"
                    >
                        <div className="flex h-24 w-24 items-center justify-center rounded-full bg-green-50 text-green-600">
                            <CheckCircle2 size={64} />
                        </div>
                        <h1 className="mt-8 text-4xl font-extrabold text-secondary">Order Confirmed!</h1>
                        <p className="mt-4 text-lg text-gray-500">
                            Thank you for shopping with Pi Store. Your order **#PI-77821** has been placed successfully.
                            We will send you a confirmation email shortly.
                        </p>

                        <div className="mt-12 grid w-full grid-cols-1 gap-4 sm:grid-cols-2">
                            <Button asChild className="h-14 text-lg font-bold">
                                <Link href="/track">Track Your Order</Link>
                            </Button>
                            <Button asChild variant="outline" className="h-14 text-lg font-bold">
                                <Link href="/shop">Continue Shopping</Link>
                            </Button>
                        </div>

                        <div className="mt-12 flex flex-col items-center gap-4 text-sm text-gray-400">
                            <p className="flex items-center gap-2">
                                <ShieldCheck size={16} />
                                Verified Order • Insured Delivery
                            </p>
                        </div>
                    </motion.div>
                )}
            </Container>
        </div>
    );
}

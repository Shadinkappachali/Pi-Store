"use client";

import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { User, Mail, Lock, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function RegisterPage() {
    return (
        <div className="min-h-[90vh] flex items-center justify-center bg-gray-50/50 py-20 px-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-[450px]"
            >
                <div className="text-center mb-10">
                    <Link href="/" className="inline-block mb-6">
                        <span className="text-3xl font-bold tracking-tighter text-secondary">
                            Pi<span className="text-primary">Store</span>
                        </span>
                    </Link>
                    <h1 className="text-3xl font-extrabold text-secondary">Create an account.</h1>
                    <p className="mt-2 text-gray-500">Get exclusive student and office discounts.</p>
                </div>

                <div className="rounded-[2.5rem] border border-border bg-white p-8 lg:p-10 shadow-xl shadow-gray-200/50">
                    <form className="space-y-5">
                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Full Name</label>
                            <div className="relative">
                                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                <Input placeholder="John Doe" className="pl-10 h-12" required />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Email Address</label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                <Input type="email" placeholder="name@email.com" className="pl-10 h-12" required />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Password</label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                <Input type="password" placeholder="••••••••" className="pl-10 h-12" required />
                            </div>
                            <p className="text-[10px] text-gray-400 font-medium">Password must be at least 8 characters long.</p>
                        </div>

                        <div className="flex items-start gap-2 py-2">
                            <input type="checkbox" className="mt-1 h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary/20" required />
                            <span className="text-xs text-gray-500 leading-relaxed">
                                I agree to the <Link href="/terms" className="font-bold text-secondary hover:underline">Terms of Service</Link> and <Link href="/privacy" className="font-bold text-secondary hover:underline">Privacy Policy</Link>.
                            </span>
                        </div>

                        <Button type="submit" className="h-14 w-full text-lg font-bold mt-2 shadow-lg shadow-primary/20">
                            Create Account
                        </Button>
                    </form>

                    <div className="mt-8 flex items-center justify-center gap-2 rounded-2xl bg-gray-50 p-4 border border-border/50">
                        <ShieldCheck className="text-green-600" size={16} />
                        <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Secure 256-bit encryption</span>
                    </div>
                </div>

                <p className="mt-8 text-center text-sm font-medium text-gray-500">
                    Already have an account?{" "}
                    <Link href="/account/login" className="font-bold text-primary hover:underline">
                        Log in instead
                    </Link>
                </p>
            </motion.div>
        </div>
    );
}

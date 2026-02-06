"use client";

import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ShieldCheck, Mail, Lock, Github, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function LoginPage() {
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
                    <h1 className="text-3xl font-extrabold text-secondary">Welcome back.</h1>
                    <p className="mt-2 text-gray-500">Log in to your account to manage orders.</p>
                </div>

                <div className="rounded-[2.5rem] border border-border bg-white p-8 lg:p-10 shadow-xl shadow-gray-200/50">
                    <form className="space-y-5">
                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Email Address</label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                <Input type="email" placeholder="name@email.com" className="pl-10 h-12" required />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <div className="flex justify-between items-center">
                                <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Password</label>
                                <Link href="/account/forgot" className="text-xs font-bold text-primary hover:underline">Forgot?</Link>
                            </div>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                <Input type="password" placeholder="••••••••" className="pl-10 h-12" required />
                            </div>
                        </div>

                        <Button type="submit" className="h-14 w-full text-lg font-bold mt-4 shadow-lg shadow-primary/20">
                            Log In
                        </Button>
                    </form>

                    <div className="relative my-8 text-center">
                        <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-border" /></div>
                        <span className="relative bg-white px-4 text-xs font-bold uppercase tracking-widest text-gray-400">Or continue with</span>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <Button variant="outline" className="h-12 font-bold gap-2">
                            <svg className="h-5 w-5" viewBox="0 0 24 24">
                                <path fill="#EA4335" d="M12.48 10.92v3.28h7.84c-.24 1.84-.9 3.32-2.06 4.6-.84.84-2.12 1.84-4.88 1.84-4.24 0-7.76-3.44-7.76-7.76s3.52-7.76 7.76-7.76c2.48 0 4.24 1 5.52 2.24l2.56-2.56C19.24 2.8 16.4 1 12.48 1c-6.08 0-11.28 4.64-11.28 11s5.2 11 11.28 11c3.52 0 6.28-1.16 8.36-3.32 2.12-2.12 2.8-5.12 2.8-7.64 0-.52-.04-1.04-.12-1.52h-11.04z" />
                            </svg>
                            Google
                        </Button>
                        <Button variant="outline" className="h-12 font-bold gap-2">
                            <Github className="h-5 w-5" />
                            Github
                        </Button>
                    </div>
                </div>

                <p className="mt-8 text-center text-sm font-medium text-gray-500">
                    Don't have an account?{" "}
                    <Link href="/account/register" className="font-bold text-primary hover:underline">
                        Sign up for free
                    </Link>
                </p>
            </motion.div>
        </div>
    );
}

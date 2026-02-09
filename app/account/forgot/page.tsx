"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, ArrowLeft, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useAuth } from "@/context/auth-context";
import { useState } from "react";

export default function ForgotPasswordPage() {
    const { resetPassword } = useAuth();
    const [isLoading, setIsLoading] = useState(false);
    const [isSent, setIsSent] = useState(false);
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setIsLoading(true);

        try {
            await resetPassword(email);
            setIsSent(true);
        } catch (error: any) {
            console.error(error);
            setError("Failed to send reset email. Please check the address.");
        } finally {
            setIsLoading(false);
        }
    };

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
                    <h1 className="text-3xl font-extrabold text-secondary">
                        {isSent ? "Check your email" : "Reset password"}
                    </h1>
                    <p className="mt-2 text-gray-500">
                        {isSent
                            ? "We've sent a password reset link to your email address."
                            : "Enter your email address and we'll send you a link to reset your password."}
                    </p>
                </div>

                <div className="rounded-[2.5rem] border border-border bg-white p-8 lg:p-10 shadow-xl shadow-gray-200/50">
                    {!isSent ? (
                        <form className="space-y-5" onSubmit={handleSubmit}>
                            {error && (
                                <div className="bg-red-50 text-red-500 text-sm p-3 rounded-lg text-center font-medium">
                                    {error}
                                </div>
                            )}
                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Email Address</label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                    <Input
                                        type="email"
                                        placeholder="name@email.com"
                                        className="pl-10 h-12"
                                        required
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>
                            </div>

                            <Button type="submit" className="h-14 w-full text-lg font-bold mt-4 shadow-lg shadow-primary/20" disabled={isLoading}>
                                {isLoading ? "Sending..." : "Send Reset Link"}
                            </Button>
                        </form>
                    ) : (
                        <div className="text-center space-y-6 py-4">
                            <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-green-600">
                                <CheckCircle2 size={32} />
                            </div>
                            <p className="text-sm text-gray-600">
                                Didn't receive the email? Check your spam folder or try again in a few minutes.
                            </p>
                            <Button variant="outline" className="w-full h-12" onClick={() => setIsSent(false)}>
                                Try another email
                            </Button>
                        </div>
                    )}

                    <div className="mt-8 text-center">
                        <Link href="/account/login" className="inline-flex items-center gap-2 text-sm font-bold text-primary hover:underline">
                            <ArrowLeft size={16} />
                            Back to login
                        </Link>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}

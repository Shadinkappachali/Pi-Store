"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { User, Mail, Lock, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useAuth } from "@/context/auth-context";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function RegisterPage() {
    const { loginWithGoogle, registerWithEmail } = useAuth();
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: ""
    });
    const [error, setError] = useState("");

    const handleGoogleLogin = async () => {
        setIsLoading(true);
        try {
            await loginWithGoogle();
            router.push("/shop");
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setIsLoading(true);

        try {
            await registerWithEmail(formData.email, formData.password, formData.name);
            router.push("/admin/setup"); // Redirect to admin setup for convenience
        } catch (error: any) {
            console.error(error);
            setError(error.message || "Failed to create account");
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
                    <h1 className="text-3xl font-extrabold text-secondary">Create an account.</h1>
                    <p className="mt-2 text-gray-500">Get exclusive student and office discounts.</p>
                </div>

                <div className="rounded-[2.5rem] border border-border bg-white p-8 lg:p-10 shadow-xl shadow-gray-200/50">
                    <form className="space-y-5" onSubmit={handleSubmit}>
                        {error && (
                            <div className="bg-red-50 text-red-500 text-sm p-3 rounded-lg text-center font-medium">
                                {error}
                            </div>
                        )}
                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Full Name</label>
                            <div className="relative">
                                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                <Input
                                    placeholder="John Doe"
                                    className="pl-10 h-12"
                                    required
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Email Address</label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                <Input
                                    type="email"
                                    placeholder="name@email.com"
                                    className="pl-10 h-12"
                                    required
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Password</label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                <Input
                                    type="password"
                                    placeholder="••••••••"
                                    className="pl-10 h-12"
                                    required
                                    minLength={6}
                                    value={formData.password}
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                />
                            </div>
                            <p className="text-[10px] text-gray-400 font-medium">Password must be at least 6 characters long.</p>
                        </div>

                        <div className="flex items-start gap-2 py-2">
                            <input type="checkbox" className="mt-1 h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary/20" required />
                            <span className="text-xs text-gray-500 leading-relaxed">
                                I agree to the <Link href="/terms" className="font-bold text-secondary hover:underline">Terms of Service</Link> and <Link href="/privacy" className="font-bold text-secondary hover:underline">Privacy Policy</Link>.
                            </span>
                        </div>

                        <Button type="submit" className="h-14 w-full text-lg font-bold mt-2 shadow-lg shadow-primary/20" disabled={isLoading}>
                            {isLoading ? "Creating Account..." : "Create Account"}
                        </Button>
                    </form>

                    <div className="relative my-6 text-center">
                        <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-border" /></div>
                        <span className="relative bg-white px-4 text-[10px] font-bold uppercase tracking-widest text-gray-400">Or join with</span>
                    </div>

                    <Button
                        variant="outline"
                        className="h-12 w-full font-bold gap-2"
                        onClick={handleGoogleLogin}
                        disabled={isLoading}
                    >
                        <svg className="h-5 w-5" viewBox="0 0 24 24">
                            <path fill="#EA4335" d="M12.48 10.92v3.28h7.84c-.24 1.84-.9 3.32-2.06 4.6-.84.84-2.12 1.84-4.88 1.84-4.24 0-7.76-3.44-7.76-7.76s3.52-7.76 7.76-7.76c2.48 0 4.24 1 5.52 2.24l2.56-2.56C19.24 2.8 16.4 1 12.48 1c-6.08 0-11.28 4.64-11.28 11s5.2 11 11.28 11c3.52 0 6.28-1.16 8.36-3.32 2.12-2.12 2.8-5.12 2.8-7.64 0-.52-.04-1.04-.12-1.52h-11.04z" />
                        </svg>
                        {isLoading ? "Loading..." : "Continue with Google"}
                    </Button>

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

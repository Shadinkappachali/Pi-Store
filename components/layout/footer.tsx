"use client";

import Link from "next/link";
import { MessageSquare, Mail, Phone, MapPin, Instagram, Twitter, Facebook, ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";

export function Footer() {
    const pathname = usePathname();

    if (pathname?.startsWith("/admin")) {
        return null;
    }

    return (
        <footer className="w-full bg-secondary border-t border-white/5 pt-20 pb-10 overflow-hidden relative">
            {/* Background Decorative Gradient */}
            <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-primary/10 blur-[120px] rounded-full" />

            <Container>
                <div className="grid grid-cols-1 gap-16 lg:grid-cols-4 relative">
                    {/* Brand Info */}
                    <div className="space-y-8">
                        <Link href="/" className="text-3xl font-black tracking-tighter text-white">
                            Pi<span className="text-primary italic">Store</span>
                        </Link>
                        <p className="max-w-[280px] text-sm text-gray-400 leading-relaxed font-medium">
                            The future of tech retail. Premium quality accessories for professionals and students. Designed for performance, built for reliability.
                        </p>
                        <div className="flex items-center gap-4">
                            {[
                                { icon: Instagram, href: "#" },
                                { icon: Twitter, href: "#" },
                                { icon: Facebook, href: "#" }
                            ].map((social, i) => (
                                <Link
                                    key={i}
                                    href={social.href}
                                    className="h-10 w-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-primary transition-all duration-300"
                                >
                                    <social.icon size={18} />
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Quick Navigation */}
                    <div className="grid grid-cols-2 gap-8 lg:col-span-2">
                        <div>
                            <h3 className="mb-6 text-xs font-black uppercase tracking-[0.2em] text-white/50">Shop Categories</h3>
                            <ul className="space-y-4">
                                {[
                                    { label: "Shop All", href: "/shop" },
                                    { label: "Mobile Accessories", href: "/category/mobile" },
                                    { label: "Laptop Accessories", href: "/category/laptop" },
                                    { label: "Custom PC Builds", href: "/pc-builds" }
                                ].map((link) => (
                                    <li key={link.label}>
                                        <Link href={link.href} className="group flex items-center text-sm font-bold text-gray-400 hover:text-white transition-colors">
                                            <span>{link.label}</span>
                                            <ArrowRight size={14} className="ml-2 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-primary" />
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <h3 className="mb-6 text-xs font-black uppercase tracking-[0.2em] text-white/50">Company</h3>
                            <ul className="space-y-4 text-sm font-bold text-gray-400">
                                {[
                                    { label: "About Our Store", href: "/about" },
                                    { label: "Contact Us", href: "/contact" },
                                    { label: "Shipping Policy", href: "/shipping" },
                                    { label: "Privacy Policy", href: "/privacy" }
                                ].map((link) => (
                                    <li key={link.label}>
                                        <Link href={link.href} className="hover:text-white transition-colors">{link.label}</Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Contact & Support */}
                    <div className="space-y-8">
                        <div className="space-y-4">
                            <h3 className="text-xs font-black uppercase tracking-[0.2em] text-white/50">Visit Us</h3>
                            <div className="flex items-start gap-4 text-sm text-gray-400 font-medium">
                                <div className="h-10 w-10 shrink-0 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-primary">
                                    <MapPin size={20} />
                                </div>
                                <p className="leading-relaxed">Canoliz Tower, Near Panchayat Office, Mampad, Kerala - 676542</p>
                            </div>
                        </div>

                        <div className="pt-2">
                            <Button
                                asChild
                                className="w-full h-14 rounded-2xl bg-[#25D366] hover:bg-[#128C7E] text-white font-bold text-lg gap-2 shadow-lg shadow-green-500/20 transition-all active:scale-95"
                            >
                                <Link href="https://wa.me/917560850790" target="_blank">
                                    <MessageSquare size={20} />
                                    WhatsApp Support
                                </Link>
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="mt-20 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-6">
                    <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">
                        © {new Date().getFullYear()} <span className="text-white">Pi Store India</span>. Built for the future.
                    </p>
                    <div className="flex items-center gap-8 text-[10px] font-black uppercase tracking-widest text-gray-500">
                        <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
                        <Link href="/cookies" className="hover:text-white transition-colors">Cookie Policy</Link>
                    </div>
                </div>
            </Container>
        </footer>
    );
}

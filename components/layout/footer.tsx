import Link from "next/link";
import { MessageSquare, Mail, Phone, MapPin, Instagram, Twitter, Facebook } from "lucide-react";
import { Container } from "@/components/ui/container";

export function Footer() {
    return (
        <footer className="w-full border-t border-border bg-white pt-16 pb-8">
            <Container>
                <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4">
                    {/* Brand Info */}
                    <div className="space-y-4">
                        <Link href="/" className="text-2xl font-bold tracking-tighter text-secondary">
                            Pi<span className="text-primary">Store</span>
                        </Link>
                        <p className="max-w-[240px] text-sm text-gray-500 leading-relaxed">
                            Premium quality accessories for your digital lifestyle. Trusted by thousands of students and office goers in India.
                        </p>
                        <div className="flex items-center gap-4 text-secondary/60">
                            <Link href="#" className="hover:text-primary transition-colors"><Instagram size={20} /></Link>
                            <Link href="#" className="hover:text-primary transition-colors"><Twitter size={20} /></Link>
                            <Link href="#" className="hover:text-primary transition-colors"><Facebook size={20} /></Link>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="mb-6 text-sm font-bold uppercase tracking-widest text-secondary">Quick Links</h3>
                        <ul className="space-y-4 text-sm text-gray-500">
                            <li><Link href="/shop" className="hover:text-primary transition-colors">Shop All</Link></li>
                            <li><Link href="/category/mobile" className="hover:text-primary transition-colors">Mobile Accessories</Link></li>
                            <li><Link href="/category/laptop" className="hover:text-primary transition-colors">Laptop Accessories</Link></li>
                            <li><Link href="/about" className="hover:text-primary transition-colors">About Us</Link></li>
                            <li><Link href="/contact" className="hover:text-primary transition-colors">Contact</Link></li>
                        </ul>
                    </div>

                    {/* Support */}
                    <div>
                        <h3 className="mb-6 text-sm font-bold uppercase tracking-widest text-secondary">Support</h3>
                        <ul className="space-y-4 text-sm text-gray-500">
                            <li><Link href="/faq" className="hover:text-primary transition-colors">FAQs</Link></li>
                            <li><Link href="/shipping" className="hover:text-primary transition-colors">Shipping Policy</Link></li>
                            <li><Link href="/returns" className="hover:text-primary transition-colors">Returns & Replacements</Link></li>
                            <li><Link href="/track" className="hover:text-primary transition-colors">Track Order</Link></li>
                            <li><Link href="/warranty" className="hover:text-primary transition-colors">Warranty Info</Link></li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div className="space-y-4 text-sm text-gray-500">
                        <h3 className="mb-6 text-sm font-bold uppercase tracking-widest text-secondary">Contact Us</h3>
                        <div className="flex items-start gap-3">
                            <MapPin className="h-5 w-5 shrink-0 text-primary" />
                            <p>Canoliz Tower, Near Panchayat Office, Mampad, Kerala - 676542</p>
                        </div>
                        <div className="flex items-center gap-3">
                            <Phone className="h-5 w-5 shrink-0 text-primary" />
                            <p>+91 96568 20000</p>
                        </div>
                        <div className="flex items-center gap-3">
                            <Mail className="h-5 w-5 shrink-0 text-primary" />
                            <p>contact@pibots.in</p>
                        </div>
                        <div className="pt-2">
                            <Link
                                href="https://wa.me/919656820000"
                                target="_blank"
                                className="flex items-center gap-2 font-medium text-green-600 hover:text-green-700"
                            >
                                <MessageSquare className="h-5 w-5" />
                                <span>WhatsApp support</span>
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Bottom Footer */}
                <div className="mt-16 border-t border-border pt-8 text-center text-xs text-gray-400">
                    <p>© {new Date().getFullYear()} Pi Store India. All rights reserved. Designed for performance.</p>
                </div>
            </Container>
        </footer>
    );
}

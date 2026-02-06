"use client";

import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MapPin, Phone, Mail, MessageCircle, Clock, Send, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

export default function ContactPage() {
    const [formStatus, setFormStatus] = useState<"idle" | "submitting" | "success">("idle");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setFormStatus("submitting");
        setTimeout(() => {
            setFormStatus("success");
        }, 1500);
    };

    const contactInfo = [
        { icon: Phone, title: "Phone", details: "+91 98765 43210", sub: "Mon-Sat, 10am-7pm" },
        { icon: Mail, title: "Email", details: "support@pistore.com", sub: "Response within 24h" },
        { icon: MapPin, title: "Address", details: "1668A, 14th Main Rd, Sector 7", sub: "HSR Layout, Bengaluru, 560102" },
        { icon: MessageCircle, title: "WhatsApp", details: "Direct Chat", sub: "Recommended for fast help" }
    ];

    return (
        <div className="bg-gray-50/50 pb-24 pt-16">
            <Container>
                <div className="mx-auto max-w-5xl">
                    <div className="mb-16 text-center">
                        <h1 className="text-4xl font-extrabold text-secondary lg:text-6xl">Get in touch.</h1>
                        <p className="mt-4 text-xl text-gray-500">Have questions about compatibility? Need help with an order?</p>
                    </div>

                    <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
                        {/* Contact details */}
                        <div className="lg:col-span-1 space-y-4">
                            {contactInfo.map((info, i) => {
                                const Icon = info.icon;
                                return (
                                    <div key={i} className="rounded-3xl border border-border bg-white p-6 shadow-sm">
                                        <div className="flex items-center gap-4">
                                            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                                                <Icon size={24} />
                                            </div>
                                            <div>
                                                <p className="text-xs font-bold uppercase tracking-widest text-gray-400">{info.title}</p>
                                                <p className="mt-1 font-bold text-secondary">{info.details}</p>
                                                <p className="text-xs text-gray-500 font-medium">{info.sub}</p>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}

                            <div className="rounded-3xl bg-secondary p-8 text-white">
                                <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                                    <Clock className="text-primary" size={20} />
                                    Support Hours
                                </h3>
                                <div className="space-y-2 text-sm text-gray-400">
                                    <div className="flex justify-between border-b border-white/10 pb-2">
                                        <span>Monday - Saturday</span>
                                        <span className="text-white font-bold">10:00 - 19:00</span>
                                    </div>
                                    <div className="flex justify-between pt-2">
                                        <span>Sunday</span>
                                        <span className="text-white font-bold">Closed</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Form area */}
                        <div className="lg:col-span-2">
                            <div className="rounded-[2.5rem] border border-border bg-white p-8 lg:p-12 shadow-sm">
                                <AnimatePresence mode="wait">
                                    {formStatus !== "success" ? (
                                        <motion.form
                                            key="form"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            onSubmit={handleSubmit}
                                            className="space-y-6"
                                        >
                                            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                                                <div className="space-y-2">
                                                    <label className="text-xs font-bold uppercase tracking-widest text-gray-400">First Name</label>
                                                    <Input placeholder="John" required />
                                                </div>
                                                <div className="space-y-2">
                                                    <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Last Name</label>
                                                    <Input placeholder="Doe" required />
                                                </div>
                                            </div>

                                            <div className="space-y-2">
                                                <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Email Address</label>
                                                <Input type="email" placeholder="john@example.com" required />
                                            </div>

                                            <div className="space-y-2">
                                                <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Order ID (Optional)</label>
                                                <Input placeholder="#PI-12345" />
                                            </div>

                                            <div className="space-y-2">
                                                <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Message</label>
                                                <textarea
                                                    className="min-h-[150px] w-full rounded-2xl border border-border bg-gray-50 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                                                    placeholder="Tell us how we can help..."
                                                    required
                                                />
                                            </div>

                                            <Button
                                                type="submit"
                                                className="h-16 w-full text-lg font-bold"
                                                disabled={formStatus === "submitting"}
                                            >
                                                {formStatus === "submitting" ? "Sending..." : "Send Message"}
                                                <Send className="ml-2 h-5 w-5" />
                                            </Button>
                                        </motion.form>
                                    ) : (
                                        <motion.div
                                            key="success"
                                            initial={{ opacity: 0, scale: 0.9 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            className="flex flex-col items-center justify-center py-12 text-center"
                                        >
                                            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-green-50 text-green-600 mb-8">
                                                <CheckCircle2 size={48} />
                                            </div>
                                            <h2 className="text-3xl font-extrabold text-secondary">Message Sent!</h2>
                                            <p className="mt-4 text-lg text-gray-500 max-w-sm">
                                                Thank you for reaching out. We've received your request and will get back to you within 24 hours.
                                            </p>
                                            <Button variant="outline" className="mt-10 h-14 px-8 font-bold" onClick={() => setFormStatus("idle")}>
                                                Send another message
                                            </Button>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </div>
                    </div>

                    {/* Google Map Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="mt-16 overflow-hidden rounded-[2.5rem] border border-border bg-white shadow-sm"
                    >
                        <div className="aspect-[21/9] w-full bg-gray-100">
                            <iframe
                                src="https://maps.google.com/maps?q=1668A,%2014th%20Main%20Rd,%20Sector%207,%20HSR%20Layout,%20Bengaluru,%20Karnataka,%20560102&t=&z=15&ie=UTF8&iwloc=&output=embed"
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                allowFullScreen
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                            ></iframe>
                        </div>
                    </motion.div>
                </div>
            </Container>
        </div>
    );
}

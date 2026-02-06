"use client";

import { Container } from "@/components/ui/container";
import { MapPin, Navigation, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export function VisitStore() {
    return (
        <section className="py-24 bg-white font-poppins">
            <Container>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="space-y-8"
                    >
                        <div>
                            <h2 className="text-4xl font-extrabold text-secondary tracking-tight lg:text-5xl">
                                Visit our store.
                            </h2>
                            <p className="mt-4 text-xl text-gray-500 max-w-lg">
                                Experience our premium accessories in person. Our experts are here to help you find the perfect match for your devices.
                            </p>
                        </div>

                        <div className="space-y-6">
                            <div className="flex gap-4">
                                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                                    <MapPin size={24} />
                                </div>
                                <div>
                                    <p className="text-sm font-bold uppercase tracking-widest text-gray-400">Location</p>
                                    <p className="mt-1 font-bold text-secondary text-lg">Canoliz Tower, Near Panchayat Office</p>
                                    <p className="text-gray-500">Mampad, Malappuram, Kerala 676542</p>
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                                    <Clock size={24} />
                                </div>
                                <div>
                                    <p className="text-sm font-bold uppercase tracking-widest text-gray-400">Hours</p>
                                    <p className="mt-1 font-bold text-secondary text-lg">Mon - Sat: 10:00 AM - 7:00 PM</p>
                                    <p className="text-gray-500">Sunday closed</p>
                                </div>
                            </div>
                        </div>

                        <Button size="lg" className="h-16 px-10 text-lg font-bold rounded-2xl group" asChild>
                            <a
                                href="https://maps.app.goo.gl/usUsEZrUfBmRASJc6"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Get Directions
                                <Navigation className="ml-2 h-5 w-5 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
                            </a>
                        </Button>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="relative aspect-square lg:aspect-video overflow-hidden rounded-[2.5rem] border border-border shadow-2xl"
                    >
                        <iframe
                            src="https://maps.google.com/maps?q=11.2449075,76.1812139&t=&z=15&ie=UTF8&iwloc=&output=embed"
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            allowFullScreen
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            title="Pi Store Location"
                        ></iframe>
                    </motion.div>
                </div>
            </Container>
        </section>
    );
}

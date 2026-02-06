"use client";

import { useEffect, useState } from "react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function DealsCountdown() {
    const [timeLeft, setTimeLeft] = useState({
        days: "02",
        hours: "14",
        minutes: "45",
        seconds: "12",
    });

    useEffect(() => {
        const interval = setInterval(() => {
            // Simulate real-ish countdown for visual appeal
            setTimeLeft(prev => {
                let s = parseInt(prev.seconds) - 1;
                let m = parseInt(prev.minutes);
                let h = parseInt(prev.hours);
                if (s < 0) { s = 59; m -= 1; }
                if (m < 0) { m = 59; h -= 1; }
                return {
                    ...prev,
                    hours: h.toString().padStart(2, '0'),
                    minutes: m.toString().padStart(2, '0'),
                    seconds: s.toString().padStart(2, '0')
                };
            });
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <section className="py-24">
            <Container>
                <div className="relative overflow-hidden rounded-3xl bg-secondary px-8 py-16 text-center text-white lg:px-16">
                    {/* Decorative shapes */}
                    <div className="absolute left-0 top-0 h-40 w-40 rounded-full bg-primary/20 blur-3xl" />
                    <div className="absolute right-0 bottom-0 h-60 w-60 rounded-full bg-primary/20 blur-3xl" />

                    <div className="relative z-10 mx-auto max-w-2xl">
                        <h2 className="text-sm font-bold uppercase tracking-widest text-primary">Flash Sale</h2>
                        <h3 className="mt-4 text-4xl font-extrabold sm:text-5xl">Deals of the Week</h3>
                        <p className="mt-4 text-lg text-gray-400">Grab your favorites before they are gone. Exclusive offers only for students.</p>

                        <div className="mt-12 flex justify-center gap-4 sm:gap-8">
                            {[
                                { label: "Days", value: timeLeft.days },
                                { label: "Hours", value: timeLeft.hours },
                                { label: "Mins", value: timeLeft.minutes },
                                { label: "Secs", value: timeLeft.seconds },
                            ].map((item) => (
                                <div key={item.label} className="flex flex-col items-center">
                                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10 text-2xl font-bold backdrop-blur-sm sm:h-20 sm:w-20 sm:text-3xl">
                                        {item.value}
                                    </div>
                                    <span className="mt-2 text-[10px] font-bold uppercase tracking-widest text-gray-400">{item.label}</span>
                                </div>
                            ))}
                        </div>

                        <Button asChild size="lg" className="mt-12 h-14 bg-white px-8 text-lg font-bold text-secondary hover:bg-gray-100">
                            <Link href="/shop">
                                Shop Deals Now
                                <ArrowRight className="ml-2 h-5 w-5" />
                            </Link>
                        </Button>
                    </div>
                </div>
            </Container>
        </section>
    );
}

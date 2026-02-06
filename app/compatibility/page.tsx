"use client";

import { useState } from "react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import {
    Smartphone,
    Laptop,
    Search,
    ChevronRight,
    CheckCircle2,
    X,
    Cpu,
    Zap,
    ShieldCheck
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { ProductCard } from "@/components/ui/product-card";
import Link from "next/link";

const DEVICE_DATA = {
    mobile: {
        brands: ["Apple", "Samsung", "Google", "OnePlus"],
        models: {
            Apple: ["iPhone 15 Pro Max", "iPhone 15 Pro", "iPhone 15", "iPhone 14 Series", "iPhone 13 Series"],
            Samsung: ["Galaxy S24 Ultra", "Galaxy S23 Ultra", "Galaxy Z Fold 5", "Galaxy S22"],
            Google: ["Pixel 8 Pro", "Pixel 7 Pro", "Pixel 6a"],
            OnePlus: ["OnePlus 12", "OnePlus 11", "OnePlus Nord 3"]
        }
    },
    laptop: {
        brands: ["Apple", "Dell", "HP", "Lenovo"],
        models: {
            Apple: ["MacBook Pro 16 (M3)", "MacBook Pro 14 (M3)", "MacBook Air (M2)", "MacBook Pro 13"],
            Dell: ["XPS 15", "XPS 13", "Latitude 7000"],
            HP: ["Spectre x360", "Envy 13", "Pavilion"],
            Lenovo: ["ThinkPad X1 Carbon", "Yoga 9i", "Legion 5"]
        }
    }
};

const MOCK_COMPATIBLE_PRODUCTS = [
    { id: "1", name: "HyperCharge 65W GaN Fast Charger", price: 2499, originalPrice: 3999, rating: 4.9, reviews: 1250, category: "Chargers", image: "" },
    { id: "4", name: "DuraLink Pro USB-C Cable", price: 799, originalPrice: 1299, rating: 4.9, reviews: 2100, category: "Cables", image: "" },
    { id: "8", name: "NanoHub 7-in-1 Adapter", price: 3299, originalPrice: 4999, rating: 4.9, reviews: 45, category: "USB Hubs", image: "" },
];

export default function CompatibilityFinder() {
    const [deviceType, setDeviceType] = useState<"mobile" | "laptop" | null>(null);
    const [brand, setBrand] = useState<string | null>(null);
    const [model, setModel] = useState<string | null>(null);
    const [showResults, setShowResults] = useState(false);

    const reset = () => {
        setDeviceType(null);
        setBrand(null);
        setModel(null);
        setShowResults(false);
    };

    return (
        <div className="bg-white pb-24 pt-16 min-h-[80vh]">
            <Container>
                <div className="mx-auto max-w-4xl">
                    <div className="mb-16 text-center">
                        <motion.span
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-xs font-bold uppercase tracking-[0.3em] text-primary"
                        >
                            Magic Finder
                        </motion.span>
                        <h1 className="mt-4 text-4xl font-extrabold text-secondary lg:text-6xl italic">Compatibility Finder.</h1>
                        <p className="mt-4 text-xl text-gray-500">Find the perfect accessories designed specifically for your device.</p>
                    </div>

                    {!showResults ? (
                        <div className="relative rounded-[3rem] border border-border bg-gray-50/50 p-8 lg:p-16 shadow-2xl shadow-gray-200/50">
                            {/* Progress indicator */}
                            <div className="flex justify-center gap-2 mb-12">
                                {[1, 2, 3].map((s) => (
                                    <div
                                        key={s}
                                        className={`h-1.5 w-12 rounded-full transition-all ${(s === 1 && deviceType) || (s === 2 && brand) || (s === 3 && model)
                                            ? 'bg-primary' : 'bg-gray-200'
                                            }`}
                                    />
                                ))}
                            </div>

                            <div className="space-y-12">
                                {/* Step 1: Device Type */}
                                <div className="space-y-6">
                                    <h3 className="text-center text-sm font-bold uppercase tracking-widest text-gray-400">Step 1: Select Device Category</h3>
                                    <div className="flex flex-wrap justify-center gap-6">
                                        <button
                                            onClick={() => { setDeviceType("mobile"); setBrand(null); setModel(null); }}
                                            className={`flex flex-col items-center gap-4 rounded-[2rem] border-2 p-8 transition-all ${deviceType === "mobile" ? 'border-primary bg-white shadow-xl' : 'border-transparent bg-white/50 hover:bg-white'}`}
                                        >
                                            <div className={`flex h-16 w-16 items-center justify-center rounded-2xl ${deviceType === "mobile" ? 'bg-primary text-white' : 'bg-gray-100 text-gray-400'}`}>
                                                <Smartphone size={32} />
                                            </div>
                                            <span className="font-bold text-secondary">Smartphone</span>
                                        </button>
                                        <button
                                            onClick={() => { setDeviceType("laptop"); setBrand(null); setModel(null); }}
                                            className={`flex flex-col items-center gap-4 rounded-[2rem] border-2 p-8 transition-all ${deviceType === "laptop" ? 'border-primary bg-white shadow-xl' : 'border-transparent bg-white/50 hover:bg-white'}`}
                                        >
                                            <div className={`flex h-16 w-16 items-center justify-center rounded-2xl ${deviceType === "laptop" ? 'bg-primary text-white' : 'bg-gray-100 text-gray-400'}`}>
                                                <Laptop size={32} />
                                            </div>
                                            <span className="font-bold text-secondary">Laptop</span>
                                        </button>
                                    </div>
                                </div>

                                {/* Step 2: Brand */}
                                <AnimatePresence>
                                    {deviceType && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className="space-y-6"
                                        >
                                            <h3 className="text-center text-sm font-bold uppercase tracking-widest text-gray-400">Step 2: Choose Brand</h3>
                                            <div className="flex flex-wrap justify-center gap-3">
                                                {DEVICE_DATA[deviceType].brands.map((b: string) => (
                                                    <button
                                                        key={b}
                                                        onClick={() => { setBrand(b); setModel(null); }}
                                                        className={`rounded-2xl border-2 px-8 py-4 font-bold transition-all ${brand === b ? 'border-primary bg-white text-primary shadow-lg' : 'border-transparent bg-white/50 text-gray-500 hover:bg-white'}`}
                                                    >
                                                        {b}
                                                    </button>
                                                ))}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                                {/* Step 3: Model */}
                                <AnimatePresence>
                                    {brand && deviceType && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className="space-y-6"
                                        >
                                            <h3 className="text-center text-sm font-bold uppercase tracking-widest text-gray-400">Step 3: Select Model</h3>
                                            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                                                {(DEVICE_DATA[deviceType].models as any)[brand].map((m: string) => (
                                                    <button
                                                        key={m}
                                                        onClick={() => setModel(m)}
                                                        className={`flex items-center justify-between rounded-xl border-2 px-6 py-4 text-left transition-all ${model === m ? 'border-primary bg-white shadow-md' : 'border-transparent bg-white/50 hover:bg-white'}`}
                                                    >
                                                        <span className={`font-bold ${model === m ? 'text-primary' : 'text-secondary'}`}>{m}</span>
                                                        {model === m && <CheckCircle2 className="text-primary" size={20} />}
                                                    </button>
                                                ))}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                                {/* Final Button */}
                                <div className="pt-8 text-center">
                                    <Button
                                        size="lg"
                                        disabled={!model}
                                        onClick={() => setShowResults(true)}
                                        className="h-16 w-full max-w-sm rounded-full text-lg font-bold shadow-xl shadow-primary/20"
                                    >
                                        Find Compatibility
                                    </Button>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="space-y-12"
                        >
                            {/* Selection Summary */}
                            <div className="flex flex-wrap items-center justify-between rounded-3xl bg-secondary p-8 text-white">
                                <div className="flex items-center gap-6">
                                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/10">
                                        {deviceType === "mobile" ? <Smartphone size={32} /> : <Laptop size={32} />}
                                    </div>
                                    <div>
                                        <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">Compatible with</p>
                                        <h2 className="text-2xl font-bold">{model} <span className="text-white/40">({brand})</span></h2>
                                    </div>
                                </div>
                                <Button variant="outline" className="border-white/20 text-white hover:bg-white/10" onClick={reset}>
                                    Change Device
                                    <X className="ml-2 h-4 w-4" />
                                </Button>
                            </div>

                            {/* Results Sections */}
                            <div className="space-y-16">
                                {/* Chargers */}
                                <div>
                                    <div className="mb-8 flex items-center justify-between">
                                        <h3 className="text-2xl font-extrabold text-secondary flex items-center gap-3">
                                            <Zap className="text-primary" />
                                            Recommended Chargers
                                        </h3>
                                        <span className="h-0.5 flex-1 bg-gray-100 mx-6 hidden sm:block" />
                                    </div>
                                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                                        {MOCK_COMPATIBLE_PRODUCTS.map(p => (
                                            <ProductCard
                                                key={p.id}
                                                {...p}
                                                badge="Perfect Match"
                                            />
                                        ))}
                                    </div>
                                </div>

                                {/* Trust Info */}
                                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                    <div className="rounded-3xl bg-primary/5 p-8 flex items-start gap-6">
                                        <Cpu className="text-primary mt-1" size={32} />
                                        <div>
                                            <h4 className="text-xl font-bold text-secondary">Smart IC Technology</h4>
                                            <p className="mt-2 text-gray-500 text-sm leading-relaxed">Our accessories communicate with your {brand} device to deliver the optimal power output, protecting your battery life over time.</p>
                                        </div>
                                    </div>
                                    <div className="rounded-3xl bg-green-50/50 p-8 flex items-start gap-6 border border-green-100">
                                        <ShieldCheck className="text-green-600 mt-1" size={32} />
                                        <div>
                                            <h4 className="text-xl font-bold text-secondary">Guaranteed Fit</h4>
                                            <p className="mt-2 text-gray-500 text-sm leading-relaxed">We guarantee that every product listed here is 100% compatible with the {model}. If it doesn't fit, we'll replace it for free.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {/* FAQ Minimal */}
                    <div className="mt-24 text-center">
                        <p className="text-sm font-medium text-gray-400">Can't find your device? <Link href="/contact" className="text-primary font-bold hover:underline">Contact our experts</Link></p>
                    </div>
                </div>
            </Container>
        </div>
    );
}

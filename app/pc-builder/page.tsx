"use client";

import { Container } from "@/components/ui/container";
import { useState, useEffect, Suspense } from "react";
import { PC_COMPONENTS, ComponentCategory, PCComponent, PREBUILT_CONFIGS } from "@/constants/pc-components";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, Cpu, Monitor, HardDrive, Zap, Wind, Square, Layout, CheckCircle2, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useSearchParams } from "next/navigation";

const categories: { key: ComponentCategory; icon: any; label: string }[] = [
    { key: "CPU", icon: Cpu, label: "Processor" },
    { key: "Motherboard", icon: Layout, label: "Motherboard" },
    { key: "RAM", icon: Zap, label: "Memory" },
    { key: "GPU", icon: Monitor, label: "Graphics" },
    { key: "Storage", icon: HardDrive, label: "Storage" },
    { key: "Cooling", icon: Wind, label: "Cooling" },
    { key: "PSU", icon: Square, label: "Power Supply" },
    { key: "Cabinet", icon: Layout, label: "Case" },
];

function PCBuilderContent() {
    const searchParams = useSearchParams();
    const presetId = searchParams.get("preset");

    const [selectedCategory, setSelectedCategory] = useState<ComponentCategory>("CPU");
    const [selections, setSelections] = useState<Partial<Record<ComponentCategory, PCComponent>>>({});

    useEffect(() => {
        if (presetId) {
            const preset = PREBUILT_CONFIGS.find(p => p.id === presetId);
            if (preset) {
                const newSelections: Partial<Record<ComponentCategory, PCComponent>> = {};
                Object.entries(preset.components).forEach(([cat, id]) => {
                    const component = PC_COMPONENTS[cat as ComponentCategory].find(c => c.id === id);
                    if (component) {
                        newSelections[cat as ComponentCategory] = component;
                    }
                });
                setSelections(newSelections);
            }
        }
    }, [presetId]);

    const handleSelect = (category: ComponentCategory, component: PCComponent) => {
        setSelections(prev => ({ ...prev, [category]: component }));

        // Find next category
        const currentIndex = categories.findIndex(c => c.key === category);
        if (currentIndex < categories.length - 1) {
            setSelectedCategory(categories[currentIndex + 1].key);
        }
    };

    const handleWhatsAppOrder = () => {
        const selectedParts = Object.values(selections).filter(Boolean);
        if (selectedParts.length === 0) return;

        let message = "Hi Pi Store! I'd like to order a custom PC build with the following parts:\n\n";
        selectedParts.forEach(part => {
            message += `- ${part.name} (₹${part.price.toLocaleString('en-IN')})\n`;
        });
        message += `\nTotal Estimated Price: ₹${totalPrice.toLocaleString('en-IN')}\n\nCould you please provide a final quote and delivery details?`;

        const encodedMessage = encodeURIComponent(message);
        window.open(`https://wa.me/917560850790?text=${encodedMessage}`, '_blank');
    };

    const totalPrice = Object.values(selections).reduce((sum, comp) => sum + (comp?.price || 0), 0);
    const progress = (Object.keys(selections).length / categories.length) * 100;

    return (
        <div className="min-h-screen bg-gray-50/50 pt-24 pb-24 font-poppins">
            <Container>
                <div className="flex flex-col gap-12">
                    {/* Header */}
                    <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
                        <div>
                            <h1 className="text-4xl lg:text-6xl font-extrabold text-secondary tracking-tight">
                                Build your <span className="text-primary italic">dream PC.</span>
                            </h1>
                            <p className="mt-4 text-xl text-gray-500 max-w-2xl">
                                Select high-performance parts curated for maximum compatibility and speed.
                                Our experts handle the professional assembly and testing.
                            </p>
                        </div>
                        <div className="bg-white p-8 rounded-[2rem] border border-border shadow-sm min-w-[300px]">
                            <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Estimated Total</p>
                            <p className="text-4xl font-black text-secondary">₹{totalPrice.toLocaleString('en-IN')}</p>
                            <div className="mt-4 h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                                <motion.div
                                    className="h-full bg-primary"
                                    initial={{ width: 0 }}
                                    animate={{ width: `${progress}%` }}
                                />
                            </div>
                            <p className="mt-2 text-xs font-bold text-gray-500">{Object.keys(selections).length} of {categories.length} components selected</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                        {/* Sidebar Navigation */}
                        <div className="lg:col-span-3 space-y-2">
                            {categories.map((cat, i) => {
                                const Icon = cat.icon;
                                const isSelected = selectedCategory === cat.key;
                                const isCompleted = !!selections[cat.key];
                                return (
                                    <button
                                        key={cat.key}
                                        onClick={() => setSelectedCategory(cat.key)}
                                        className={cn(
                                            "w-full flex items-center justify-between p-5 rounded-2xl transition-all duration-300 group",
                                            isSelected
                                                ? "bg-secondary text-white shadow-xl scale-[1.02]"
                                                : "bg-white text-gray-500 hover:bg-gray-100 border border-border shadow-sm"
                                        )}
                                    >
                                        <div className="flex items-center gap-4">
                                            <div className={cn(
                                                "h-10 w-10 rounded-xl flex items-center justify-center transition-colors",
                                                isSelected ? "bg-primary text-white" : "bg-gray-50 text-gray-400 group-hover:text-primary"
                                            )}>
                                                <Icon size={20} />
                                            </div>
                                            <span className="font-bold text-sm tracking-wide">{cat.label}</span>
                                        </div>
                                        {isCompleted && (
                                            <CheckCircle2 className={cn("h-5 w-5", isSelected ? "text-primary" : "text-green-500")} />
                                        )}
                                    </button>
                                );
                            })}

                            <div className="pt-8">
                                <Button
                                    className="w-full h-16 rounded-2xl text-lg font-bold shadow-2xl bg-[#25D366] hover:bg-[#20ba5a] text-white"
                                    disabled={Object.keys(selections).length < categories.length}
                                    onClick={handleWhatsAppOrder}
                                >
                                    <MessageSquare className="mr-2 h-5 w-5 fill-white" />
                                    Order on WhatsApp
                                </Button>
                            </div>
                        </div>

                        {/* Component Selection Area */}
                        <div className="lg:col-span-9">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={selectedCategory}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
                                >
                                    {PC_COMPONENTS[selectedCategory].map((comp) => {
                                        const isSelected = selections[selectedCategory]?.id === comp.id;
                                        return (
                                            <motion.div
                                                key={comp.id}
                                                whileHover={{ y: -8 }}
                                                className={cn(
                                                    "group relative flex flex-col p-6 rounded-[2rem] border transition-all duration-500 cursor-pointer overflow-hidden",
                                                    isSelected
                                                        ? "border-primary bg-primary/5 shadow-xl ring-2 ring-primary/20"
                                                        : "border-border bg-white hover:border-primary/50"
                                                )}
                                                onClick={() => handleSelect(selectedCategory, comp)}
                                            >
                                                {/* Image Placeholder with high-end glow */}
                                                <div className="relative aspect-square rounded-2xl bg-gray-100 mb-6 overflow-hidden">
                                                    <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                                    <div className="w-full h-full flex items-center justify-center text-gray-400 font-bold text-xs uppercase tracking-widest">
                                                        {comp.brand}
                                                    </div>
                                                </div>

                                                <div className="flex-1">
                                                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-primary mb-2">{comp.brand}</p>
                                                    <h3 className="text-lg font-bold text-secondary leading-tight mb-4">{comp.name}</h3>

                                                    <div className="space-y-2 mb-6">
                                                        {Object.entries(comp.specs).map(([key, val]) => (
                                                            <div key={key} className="flex justify-between text-xs">
                                                                <span className="text-gray-400 capitalize">{key}</span>
                                                                <span className="font-bold text-secondary">{val}</span>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>

                                                <div className="flex items-center justify-between border-t border-border pt-4 mt-auto">
                                                    <p className="text-xl font-black text-secondary">₹{comp.price.toLocaleString('en-IN')}</p>
                                                    {isSelected ? (
                                                        <div className="h-10 w-10 rounded-full bg-primary text-white flex items-center justify-center">
                                                            <CheckCircle2 size={20} />
                                                        </div>
                                                    ) : (
                                                        <div className="h-10 w-10 rounded-full border border-border group-hover:border-primary group-hover:bg-primary group-hover:text-white flex items-center justify-center transition-all">
                                                            <ChevronRight size={20} />
                                                        </div>
                                                    )}
                                                </div>
                                            </motion.div>
                                        );
                                    })}
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    );
}

export default function PCBuilderPage() {
    return (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading Builder...</div>}>
            <PCBuilderContent />
        </Suspense>
    );
}

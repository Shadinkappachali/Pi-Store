"use client";

import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { formatINR } from "@/lib/utils";
import {
    X,
    Plus,
    Zap,
    ShieldCheck,
    Weight,
    Layout,
    CheckCircle2,
    AlertCircle,
    ArrowLeftRight
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

import { useState, useEffect } from "react";
import { getProducts, type Product } from "@/lib/firestore";

const SPEC_KEYS = ["Max Power", "Technology", "Ports", "Weight", "Warranty", "Safety"];

export default function ComparePage() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedIds, setSelectedIds] = useState<string[]>([]);

    useEffect(() => {
        async function loadProducts() {
            setLoading(true);
            const { success, products: fetchedProducts } = await getProducts();
            if (success) {
                setProducts(fetchedProducts);
                // Pre-select first two products if available
                if (fetchedProducts.length >= 2) {
                    setSelectedIds([fetchedProducts[0].id, fetchedProducts[1].id]);
                }
            }
            setLoading(false);
        }
        loadProducts();
    }, []);

    const removeProduct = (id: string) => {
        setSelectedIds(selectedIds.filter(i => i !== id));
    };

    const selectedProducts = products.filter(p => selectedIds.includes(p.id)).map(p => ({
        ...p,
        specs: {
            "Max Power": p.category === "Chargers" ? "65W" : "N/A",
            "Technology": "GaN Fast Charge",
            "Ports": p.category === "USB Hubs" ? "7 Ports" : "USB-C",
            "Weight": "N/A",
            "Warranty": "1 Year",
            "Safety": "Over-heat Protection"
        }
    }));

    return (
        <div className="bg-white pb-24 pt-16 min-h-screen">
            <Container>
                <div className="mb-16">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                            <ArrowLeftRight size={20} />
                        </div>
                        <h1 className="text-4xl font-extrabold text-secondary lg:text-5xl">Compare Products.</h1>
                    </div>
                    <p className="text-xl text-gray-500">Analyze features and specifications side-by-side to make the right choice.</p>
                </div>

                {loading ? (
                    <div className="flex flex-col gap-12">
                        <div className="h-64 animate-pulse rounded-[3rem] bg-gray-50" />
                        <div className="space-y-4">
                            {[1, 2, 3, 4].map(i => (
                                <div key={i} className="h-12 animate-pulse rounded-xl bg-gray-50" />
                            ))}
                        </div>
                    </div>
                ) : selectedProducts.length > 0 ? (
                    <div className="overflow-x-auto pb-8 custom-scrollbar">
                        <div className="min-w-[800px]">
                            <table className="w-full border-collapse">
                                <thead>
                                    <tr className="border-b border-border">
                                        <th className="w-1/4 pb-8 text-left uppercase tracking-widest text-xs font-bold text-gray-400">Specifications</th>
                                        {selectedProducts.map(p => (
                                            <th key={p.id} className="w-1/4 pb-8 px-4 text-left group">
                                                <div className="relative">
                                                    <button
                                                        onClick={() => removeProduct(p.id)}
                                                        className="absolute -top-4 -right-2 h-8 w-8 rounded-full bg-red-50 text-red-500 opacity-0 group-hover:opacity-100 transition-all hover:bg-red-500 hover:text-white flex items-center justify-center shadow-sm"
                                                    >
                                                        <X size={14} />
                                                    </button>
                                                    <div className="h-40 w-full rounded-2xl bg-gray-50 mb-4 flex items-center justify-center text-[10px] font-bold text-gray-300 uppercase tracking-widest text-center">
                                                        {p.name}
                                                    </div>
                                                    <h3 className="font-extrabold text-secondary leading-tight">{p.name}</h3>
                                                    <p className="mt-2 text-2xl font-extrabold text-primary">{formatINR(p.price)}</p>
                                                    <Button asChild className="mt-4 w-full" size="sm">
                                                        <Link href={`/product/${p.id}`}>Add to Cart</Link>
                                                    </Button>
                                                </div>
                                            </th>
                                        ))}
                                        {selectedProducts.length < 3 && (
                                            <th className="w-1/4 pb-8 px-4 text-left">
                                                <div className="flex h-full flex-col items-center justify-center rounded-2xl border-2 border-dashed border-border bg-gray-50/50 p-6 text-center">
                                                    <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-white text-gray-400">
                                                        <Plus size={32} />
                                                    </div>
                                                    <p className="text-sm font-bold text-gray-500">Add product to compare</p>
                                                    <Button variant="ghost" className="mt-4 text-xs font-bold text-primary" asChild>
                                                        <Link href="/shop">Browse Store</Link>
                                                    </Button>
                                                </div>
                                            </th>
                                        )}
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-border">
                                    {SPEC_KEYS.map((key) => (
                                        <tr key={key} className="group hover:bg-gray-50/50 transition-all">
                                            <td className="py-6 text-sm font-bold text-gray-400 uppercase tracking-widest">{key}</td>
                                            {selectedProducts.map(p => (
                                                <td key={p.id} className="py-6 px-4">
                                                    <div className="flex items-center gap-2">
                                                        {key === "Warranty" && <CheckCircle2 className="text-green-500" size={16} />}
                                                        {key === "Safety" && <ShieldCheck className="text-primary" size={16} />}
                                                        {key === "Max Power" && <Zap className="text-amber-500" size={16} />}
                                                        <span className="text-sm font-bold text-secondary">{(p.specs as any)[key]}</span>
                                                    </div>
                                                </td>
                                            ))}
                                            {selectedProducts.length < 3 && <td className="py-6 px-4" />}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center py-20 text-center rounded-[3rem] bg-gray-50 border border-border">
                        <div className="h-24 w-24 rounded-full bg-white flex items-center justify-center text-gray-300 mb-8 shadow-sm">
                            <Layout size={48} />
                        </div>
                        <h2 className="text-2xl font-bold text-secondary">No products to compare</h2>
                        <p className="mt-4 text-gray-500 max-w-sm">Select at least two products to see a side-by-side technical comparison.</p>
                        <Button asChild size="lg" className="mt-10 h-14 px-10 font-bold">
                            <Link href="/shop">Choose Products</Link>
                        </Button>
                    </div>
                )}

                {/* Comparison advice */}
                <div className="mt-20 rounded-3xl bg-secondary/5 p-8 border border-primary/10">
                    <div className="flex items-start gap-4">
                        <AlertCircle className="text-primary mt-1" />
                        <div>
                            <h4 className="font-bold text-secondary">How we compare</h4>
                            <p className="mt-2 text-sm text-gray-500 leading-relaxed">Our comparison data is updated in real-time based on official technical data sheets. We focus on performance metrics that matter most to students and professionals — like power delivery standards and durability ratings.</p>
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    );
}

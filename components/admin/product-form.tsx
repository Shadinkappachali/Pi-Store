"use client";

import { useState, useEffect } from "react";
import { Product } from "@/lib/firestore";
import { Loader2, Upload, X, Check, Plus, Trash2 } from "lucide-react";
import { storage, auth } from "@/lib/firebase";
import { ref, getDownloadURL } from "firebase/storage";

interface ProductFormProps {
    initialData?: Product;
    onSubmit: (data: Omit<Product, "id" | "createdAt" | "updatedAt">) => Promise<void>;
    onCancel: () => void;
}

const categories = ["Mobile", "Laptop", "Chargers", "Cables", "Earphones", "Keyboards", "Mouse", "Hubs"];
const brands = ["Apple", "Samsung", "OnePlus", "Realme", "Xiaomi", "Dell", "HP", "Lenovo", "Asus", "Sony", "Boat", "JBL"];

export function ProductForm({ initialData, onSubmit, onCancel }: ProductFormProps) {
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState<Omit<Product, "id" | "createdAt" | "updatedAt">>({
        name: initialData?.name || "",
        brand: initialData?.brand || "",
        category: initialData?.category || "",
        price: initialData?.price || 0,
        originalPrice: initialData?.originalPrice || 0,
        image: initialData?.image || "",
        rating: initialData?.rating || 4.5,
        reviews: initialData?.reviews || 0,
        available: initialData?.available ?? true,
        stock: initialData?.stock || 0,
        isUnlimited: initialData?.isUnlimited ?? true,
        specs: initialData?.specs || [],
        options: initialData?.options || [],
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            await onSubmit(formData);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            {/* Product Name */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Product Name *
                </label>
                <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                    placeholder="e.g., iPhone 15 Pro Max"
                />
            </div>

            {/* Brand & Category */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Brand *
                    </label>
                    <select
                        required
                        value={formData.brand}
                        onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                        className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                    >
                        <option value="">Select Brand</option>
                        {brands.map((brand) => (
                            <option key={brand} value={brand}>
                                {brand}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Category *
                    </label>
                    <select
                        required
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                    >
                        <option value="">Select Category</option>
                        {categories.map((category) => (
                            <option key={category} value={category}>
                                {category}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Price & Original Price */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Price (₹) *
                    </label>
                    <input
                        type="number"
                        required
                        min="0"
                        step="0.01"
                        value={formData.price}
                        onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) })}
                        className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Original Price (₹)
                    </label>
                    <input
                        type="number"
                        min="0"
                        step="0.01"
                        value={formData.originalPrice}
                        onChange={(e) => setFormData({ ...formData, originalPrice: parseFloat(e.target.value) })}
                        className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                    />
                </div>
            </div>

            {/* Image Selection */}
            <div className="space-y-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Product Image *
                </label>

                <div className="space-y-4">
                    {/* Image Link Section */}
                    <div className="space-y-4">
                        <label className="block text-sm font-medium text-gray-700">
                            Image URL *
                        </label>
                        <div className="space-y-4">
                            <input
                                type="url"
                                required
                                value={formData.image}
                                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary h-12"
                                placeholder="Paste image URL (Unsplash, Imgur, etc.)"
                            />

                            {formData.image && (
                                <div className="relative h-64 w-full max-w-md rounded-xl bg-gray-50 border border-gray-200 overflow-hidden group mx-auto">
                                    <img
                                        src={formData.image}
                                        alt="Preview"
                                        className="h-full w-full object-contain"
                                        onError={(e) => {
                                            (e.target as HTMLImageElement).src = "https://placehold.co/600x400?text=Invalid+Image+URL";
                                        }}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setFormData({ ...formData, image: "" })}
                                        className="absolute top-2 right-2 h-8 w-8 rounded-full bg-white/90 shadow-lg flex items-center justify-center text-gray-500 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all hover:scale-110"
                                    >
                                        <X size={16} />
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Rating & Reviews */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Rating (0-5)
                    </label>
                    <input
                        type="number"
                        min="0"
                        max="5"
                        step="0.1"
                        value={formData.rating}
                        onChange={(e) => setFormData({ ...formData, rating: parseFloat(e.target.value) })}
                        className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Reviews Count
                    </label>
                    <input
                        type="number"
                        min="0"
                        value={formData.reviews}
                        onChange={(e) => setFormData({ ...formData, reviews: parseInt(e.target.value) })}
                        className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                    />
                </div>
            </div>

            {/* Availability & Stock */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 bg-gray-50/50 p-6 rounded-2xl border border-gray-100">
                <div className="space-y-4">
                    <div className="flex items-center gap-3">
                        <input
                            type="checkbox"
                            id="available"
                            checked={formData.available}
                            onChange={(e) => setFormData({ ...formData, available: e.target.checked })}
                            className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                        />
                        <label htmlFor="available" className="text-sm font-semibold text-gray-700">
                            Product Available for Purchase
                        </label>
                    </div>
                    <p className="text-xs text-gray-500 ml-7">Determine if users can see and buy this product.</p>
                </div>

                <div className="space-y-4">
                    <div className="flex items-center gap-3">
                        <input
                            type="checkbox"
                            id="isUnlimited"
                            checked={formData.isUnlimited}
                            onChange={(e) => setFormData({ ...formData, isUnlimited: e.target.checked })}
                            className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                        />
                        <label htmlFor="isUnlimited" className="text-sm font-semibold text-gray-700">
                            Unlimited Stock
                        </label>
                    </div>

                    {!formData.isUnlimited && (
                        <div className="ml-7 space-y-2">
                            <label className="block text-xs font-bold uppercase tracking-widest text-gray-400">
                                Stock Quantity
                            </label>
                            <input
                                type="number"
                                min="0"
                                required={!formData.isUnlimited}
                                value={formData.stock}
                                onChange={(e) => setFormData({ ...formData, stock: parseInt(e.target.value) })}
                                className="w-40 rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                            />
                        </div>
                    )}
                </div>
            </div>

            {/* Product Variants / Options */}
            <div className="space-y-4 rounded-2xl border border-gray-100 bg-gray-50/50 p-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h3 className="text-sm font-bold text-gray-700">Product Variants</h3>
                        <p className="text-xs text-gray-500">Enable RAM, Storage, or Color customizations.</p>
                    </div>
                    <button
                        type="button"
                        onClick={() => {
                            const newOptions = [
                                ...(formData.options || []),
                                {
                                    id: Math.random().toString(36).substr(2, 9),
                                    name: "",
                                    type: "choice" as const,
                                    values: [{ label: "", priceModifier: 0 }]
                                }
                            ];
                            setFormData({ ...formData, options: newOptions });
                        }}
                        className="flex items-center gap-1 text-xs font-bold text-primary hover:text-primary/80"
                    >
                        <Plus size={14} /> Add Variant
                    </button>
                </div>

                <div className="space-y-6">
                    {(formData.options || []).map((option, optIdx) => (
                        <div key={option.id} className="relative space-y-4 p-4 rounded-xl border border-gray-200 bg-white shadow-sm">
                            <button
                                type="button"
                                onClick={() => {
                                    const newOptions = (formData.options || []).filter((_, i) => i !== optIdx);
                                    setFormData({ ...formData, options: newOptions });
                                }}
                                className="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition-colors"
                            >
                                <Trash2 size={16} />
                            </button>

                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 pr-8">
                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-1">
                                        Variant Name
                                    </label>
                                    <input
                                        type="text"
                                        value={option.name}
                                        onChange={(e) => {
                                            const newOptions = [...(formData.options || [])];
                                            newOptions[optIdx].name = e.target.value;
                                            setFormData({ ...formData, options: newOptions });
                                        }}
                                        className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-primary focus:outline-none"
                                        placeholder="e.g., Storage or Color"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-1">
                                        Display Type
                                    </label>
                                    <select
                                        value={option.type}
                                        onChange={(e) => {
                                            const newOptions = [...(formData.options || [])];
                                            newOptions[optIdx].type = e.target.value as "choice" | "color";
                                            setFormData({ ...formData, options: newOptions });
                                        }}
                                        className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-primary focus:outline-none"
                                    >
                                        <option value="choice">Selection Buttons (RAM/Storage)</option>
                                        <option value="color">Color Swatches</option>
                                    </select>
                                </div>
                            </div>

                            <div className="space-y-3">
                                <label className="block text-xs font-bold uppercase tracking-widest text-gray-400">
                                    Options & Values
                                </label>
                                {option.values.map((val, valIdx) => (
                                    <div key={valIdx} className="flex gap-3 items-center">
                                        {option.type === "color" && (
                                            <input
                                                type="color"
                                                value={val.colorCode || "#000000"}
                                                onChange={(e) => {
                                                    const newOptions = [...(formData.options || [])];
                                                    newOptions[optIdx].values[valIdx].colorCode = e.target.value;
                                                    setFormData({ ...formData, options: newOptions });
                                                }}
                                                className="h-9 w-9 p-0.5 rounded border border-gray-300 cursor-pointer"
                                            />
                                        )}
                                        <input
                                            type="text"
                                            value={val.label}
                                            onChange={(e) => {
                                                const newOptions = [...(formData.options || [])];
                                                newOptions[optIdx].values[valIdx].label = e.target.value;
                                                setFormData({ ...formData, options: newOptions });
                                            }}
                                            className="flex-1 rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-primary focus:outline-none"
                                            placeholder={option.type === "color" ? "Color Name" : "e.g., 256GB"}
                                        />
                                        <div className="flex items-center gap-2">
                                            <span className="text-gray-400 text-sm font-bold">+₹</span>
                                            <input
                                                type="number"
                                                value={val.priceModifier}
                                                onChange={(e) => {
                                                    const newOptions = [...(formData.options || [])];
                                                    newOptions[optIdx].values[valIdx].priceModifier = parseFloat(e.target.value) || 0;
                                                    setFormData({ ...formData, options: newOptions });
                                                }}
                                                className="w-24 rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-primary focus:outline-none"
                                            />
                                        </div>
                                        <button
                                            type="button"
                                            onClick={() => {
                                                const newOptions = [...(formData.options || [])];
                                                newOptions[optIdx].values = option.values.filter((_, i) => i !== valIdx);
                                                setFormData({ ...formData, options: newOptions });
                                            }}
                                            className="text-gray-400 hover:text-red-500"
                                        >
                                            <Trash2 size={14} />
                                        </button>
                                    </div>
                                ))}
                                <button
                                    type="button"
                                    onClick={() => {
                                        const newOptions = [...(formData.options || [])];
                                        newOptions[optIdx].values.push({ label: "", priceModifier: 0 });
                                        setFormData({ ...formData, options: newOptions });
                                    }}
                                    className="text-xs font-bold text-gray-500 hover:text-primary flex items-center gap-1"
                                >
                                    <Plus size={12} /> Add Value
                                </button>
                            </div>
                        </div>
                    ))}
                    {(formData.options || []).length === 0 && (
                        <div className="text-center py-8 bg-white rounded-xl border border-dashed border-gray-300">
                            <p className="text-sm text-gray-400">No customizable variants added yet.</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3 pt-4">
                <button
                    type="button"
                    onClick={onCancel}
                    className="flex-1 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-white hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50"
                >
                    {loading ? (
                        <span className="flex items-center justify-center gap-2">
                            <Loader2 size={16} className="animate-spin" />
                            Saving...
                        </span>
                    ) : (
                        initialData ? "Update Product" : "Create Product"
                    )}
                </button>
            </div>
        </form>
    );
}

"use client";

import { AdminGuard } from "@/components/admin/admin-guard";
import { AdminLayout } from "@/components/admin/admin-layout";
import { ProductForm } from "@/components/admin/product-form";
import { getProductById, updateProduct, Product } from "@/lib/firestore";
import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { ArrowLeft, Loader2 } from "lucide-react";
import Link from "next/link";

export default function EditProductPage() {
    const router = useRouter();
    const params = useParams();
    const id = params.id as string;
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadProduct();
    }, [id]);

    const loadProduct = async () => {
        setLoading(true);
        const result = await getProductById(id);
        if (result.success && result.product) {
            setProduct(result.product);
        }
        setLoading(false);
    };

    const handleSubmit = async (data: any) => {
        const result = await updateProduct(id, data);
        if (result.success) {
            router.push("/admin/products");
        }
    };

    if (loading) {
        return (
            <AdminGuard>
                <AdminLayout>
                    <div className="flex h-64 items-center justify-center">
                        <Loader2 className="h-8 w-8 animate-spin text-primary" />
                    </div>
                </AdminLayout>
            </AdminGuard>
        );
    }

    if (!product) {
        return (
            <AdminGuard>
                <AdminLayout>
                    <div className="text-center">
                        <h2 className="text-2xl font-bold text-gray-900">Product not found</h2>
                        <Link
                            href="/admin/products"
                            className="mt-4 inline-block text-primary hover:underline"
                        >
                            Back to Products
                        </Link>
                    </div>
                </AdminLayout>
            </AdminGuard>
        );
    }

    return (
        <AdminGuard>
            <AdminLayout>
                <div className="mx-auto max-w-3xl space-y-6">
                    {/* Header */}
                    <div>
                        <Link
                            href="/admin/products"
                            className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-gray-900"
                        >
                            <ArrowLeft size={16} />
                            Back to Products
                        </Link>
                        <h1 className="mt-4 text-3xl font-bold text-gray-900">Edit Product</h1>
                        <p className="mt-2 text-sm text-gray-600">
                            Update the product details below
                        </p>
                    </div>

                    {/* Form */}
                    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                        <ProductForm
                            initialData={product}
                            onSubmit={handleSubmit}
                            onCancel={() => router.push("/admin/products")}
                        />
                    </div>
                </div>
            </AdminLayout>
        </AdminGuard>
    );
}

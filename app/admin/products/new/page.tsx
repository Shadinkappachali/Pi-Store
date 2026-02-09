"use client";

import { AdminGuard } from "@/components/admin/admin-guard";
import { AdminLayout } from "@/components/admin/admin-layout";
import { ProductForm } from "@/components/admin/product-form";
import { createProduct } from "@/lib/firestore";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function NewProductPage() {
    const router = useRouter();

    const handleSubmit = async (data: any) => {
        const result = await createProduct(data);
        if (result.success) {
            router.push("/admin/products");
        }
    };

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
                        <h1 className="mt-4 text-3xl font-bold text-gray-900">Add New Product</h1>
                        <p className="mt-2 text-sm text-gray-600">
                            Fill in the details to create a new product
                        </p>
                    </div>

                    {/* Form */}
                    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                        <ProductForm
                            onSubmit={handleSubmit}
                            onCancel={() => router.push("/admin/products")}
                        />
                    </div>
                </div>
            </AdminLayout>
        </AdminGuard>
    );
}

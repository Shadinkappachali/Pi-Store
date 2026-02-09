"use client";

import { AdminGuard } from "@/components/admin/admin-guard";
import { AdminLayout } from "@/components/admin/admin-layout";
import { DataTable } from "@/components/admin/data-table";
import { ConfirmDialog } from "@/components/admin/confirm-dialog";
import { useEffect, useState } from "react";
import { getProducts, deleteProduct, Product } from "@/lib/firestore";
import { formatINR } from "@/lib/utils";
import Link from "next/link";
import { Plus, Edit, Trash2, ExternalLink } from "lucide-react";
import { useRouter } from "next/navigation";

export default function ProductsPage() {
    const router = useRouter();
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [deleteDialog, setDeleteDialog] = useState<{ open: boolean; product?: Product }>({
        open: false
    });

    useEffect(() => {
        loadProducts();
    }, []);

    const loadProducts = async () => {
        setLoading(true);
        const { products } = await getProducts();
        setProducts(products);
        setLoading(false);
    };

    const handleDelete = async (product: Product) => {
        const result = await deleteProduct(product.id);
        if (result.success) {
            loadProducts();
        }
    };

    const columns = [
        {
            key: "image",
            label: "Image",
            render: (product: Product) => (
                <img
                    src={product.image}
                    alt={product.name}
                    className="h-12 w-12 rounded-lg object-cover"
                />
            )
        },
        {
            key: "name",
            label: "Name",
            render: (product: Product) => (
                <div>
                    <p className="font-medium text-gray-900">{product.name}</p>
                    <p className="text-xs text-gray-500">{product.brand}</p>
                </div>
            )
        },
        {
            key: "category",
            label: "Category"
        },
        {
            key: "price",
            label: "Price",
            render: (product: Product) => (
                <span className="font-semibold">{formatINR(product.price)}</span>
            )
        },
        {
            key: "rating",
            label: "Rating",
            render: (product: Product) => (
                <span>
                    ⭐ {product.rating} ({product.reviews})
                </span>
            )
        },
        {
            key: "available",
            label: "Status",
            render: (product: Product) => (
                <span
                    className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${product.available
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                >
                    {product.available ? "Available" : "Out of Stock"}
                </span>
            )
        }
    ];

    return (
        <AdminGuard>
            <AdminLayout>
                <div className="space-y-6">
                    {/* Header */}
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">Products</h1>
                            <p className="mt-2 text-sm text-gray-600">
                                Manage your product inventory
                            </p>
                        </div>
                        <Link
                            href="/admin/products/new"
                            className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-white hover:bg-primary/90"
                        >
                            <Plus size={18} />
                            Add Product
                        </Link>
                    </div>

                    {/* Table */}
                    {loading ? (
                        <div className="flex h-64 items-center justify-center">
                            <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
                        </div>
                    ) : (
                        <DataTable
                            data={products}
                            columns={columns}
                            searchPlaceholder="Search products..."
                            actions={(product) => (
                                <div className="flex items-center gap-2">
                                    <Link
                                        href={`/product/${product.id}`}
                                        target="_blank"
                                        className="rounded-lg p-2 text-gray-600 hover:bg-gray-100"
                                        title="View on store"
                                    >
                                        <ExternalLink size={16} />
                                    </Link>
                                    <Link
                                        href={`/admin/products/${product.id}/edit`}
                                        className="rounded-lg p-2 text-blue-600 hover:bg-blue-50"
                                        title="Edit"
                                    >
                                        <Edit size={16} />
                                    </Link>
                                    <button
                                        onClick={() =>
                                            setDeleteDialog({ open: true, product })
                                        }
                                        className="rounded-lg p-2 text-red-600 hover:bg-red-50"
                                        title="Delete"
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            )}
                        />
                    )}
                </div>

                {/* Delete Confirmation */}
                <ConfirmDialog
                    isOpen={deleteDialog.open}
                    onClose={() => setDeleteDialog({ open: false })}
                    onConfirm={() => deleteDialog.product && handleDelete(deleteDialog.product)}
                    title="Delete Product"
                    message={`Are you sure you want to delete "${deleteDialog.product?.name}"? This action cannot be undone.`}
                    confirmText="Delete"
                />
            </AdminLayout>
        </AdminGuard>
    );
}

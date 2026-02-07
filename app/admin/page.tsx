"use client";

import { AdminGuard } from "@/components/admin/admin-guard";
import { AdminLayout } from "@/components/admin/admin-layout";
import { useEffect, useState } from "react";
import { getProducts, getUsers } from "@/lib/firestore";
import { Package, Users, TrendingUp, Eye, MessageSquare } from "lucide-react";
import Link from "next/link";

export default function AdminDashboard() {
    const [stats, setStats] = useState({
        totalProducts: 0,
        totalUsers: 0,
        availableProducts: 0,
        averageRating: 0
    });

    useEffect(() => {
        loadStats();
    }, []);

    const loadStats = async () => {
        const { products } = await getProducts();
        const { users } = await getUsers();

        const available = products.filter(p => p.available).length;
        const avgRating = products.length > 0
            ? products.reduce((sum, p) => sum + p.rating, 0) / products.length
            : 0;

        setStats({
            totalProducts: products.length,
            totalUsers: users.length,
            availableProducts: available,
            averageRating: avgRating
        });
    };

    const statCards = [
        {
            name: "Total Products",
            value: stats.totalProducts,
            icon: Package,
            color: "bg-blue-500",
            href: "/admin/products"
        },
        {
            name: "Available Products",
            value: stats.availableProducts,
            icon: TrendingUp,
            color: "bg-green-500",
            href: "/admin/products"
        },
        {
            name: "Total Users",
            value: stats.totalUsers,
            icon: Users,
            color: "bg-purple-500",
            href: "/admin/users"
        },
        {
            name: "Avg Rating",
            value: stats.averageRating.toFixed(1),
            icon: Eye,
            color: "bg-amber-500",
            href: "/admin/products"
        }
    ];

    return (
        <AdminGuard>
            <AdminLayout>
                <div className="space-y-8">
                    {/* Header */}
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
                        <p className="mt-2 text-sm text-gray-600">
                            Overview of your store's performance
                        </p>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                        {statCards.map((stat) => (
                            <Link
                                key={stat.name}
                                href={stat.href}
                                className="group relative overflow-hidden rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
                            >
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-gray-600">
                                            {stat.name}
                                        </p>
                                        <p className="mt-2 text-3xl font-bold text-gray-900">
                                            {stat.value}
                                        </p>
                                    </div>
                                    <div
                                        className={`flex h-12 w-12 items-center justify-center rounded-xl ${stat.color} text-white`}
                                    >
                                        <stat.icon size={24} />
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>

                    {/* Quick Actions */}
                    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                        <h2 className="text-lg font-bold text-gray-900 mb-4">Quick Actions</h2>
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                            <Link
                                href="/admin/products/new"
                                className="rounded-lg border-2 border-dashed border-gray-300 p-4 text-center hover:border-primary hover:bg-primary/5"
                            >
                                <Package className="mx-auto h-8 w-8 text-gray-400" />
                                <p className="mt-2 text-sm font-medium text-gray-900">
                                    Add New Product
                                </p>
                            </Link>
                            <Link
                                href="/admin/products"
                                className="rounded-lg border-2 border-dashed border-gray-300 p-4 text-center hover:border-primary hover:bg-primary/5"
                            >
                                <Eye className="mx-auto h-8 w-8 text-gray-400" />
                                <p className="mt-2 text-sm font-medium text-gray-900">
                                    View All Products
                                </p>
                            </Link>
                            <Link
                                href="/admin/users"
                                className="rounded-lg border-2 border-dashed border-gray-300 p-4 text-center hover:border-primary hover:bg-primary/5"
                            >
                                <Users className="mx-auto h-8 w-8 text-gray-400" />
                                <p className="mt-2 text-sm font-medium text-gray-900">
                                    Manage Users
                                </p>
                            </Link>
                            <Link
                                href="/admin/reviews"
                                className="rounded-lg border-2 border-dashed border-gray-300 p-4 text-center hover:border-primary hover:bg-primary/5"
                            >
                                <MessageSquare className="mx-auto h-8 w-8 text-gray-400" />
                                <p className="mt-2 text-sm font-medium text-gray-900">
                                    Manage Reviews
                                </p>
                            </Link>

                            {/* Database Seed Section (Only if empty) */}
                            {stats.totalProducts === 0 && (
                                <button
                                    onClick={async () => {
                                        if (confirm("Import sample products into the database?")) {
                                            const { PRODUCTS } = await import("@/constants/products");
                                            const { bulkImportProducts } = await import("@/lib/firestore");
                                            const productsToImport = PRODUCTS.map(({ id, ...p }) => ({
                                                ...p,
                                                stock: 10,
                                                isUnlimited: false,
                                                badge: p.badge || ""
                                            }));
                                            const res = await bulkImportProducts(productsToImport);
                                            if (res.success) {
                                                alert(`Successfully imported ${res.count} products!`);
                                                loadStats();
                                            } else {
                                                alert("Error importing products.");
                                            }
                                        }
                                    }}
                                    className="rounded-lg border-2 border-dashed border-primary/40 bg-primary/5 p-4 text-center hover:border-primary hover:bg-primary/10 transition-colors"
                                >
                                    <TrendingUp className="mx-auto h-8 w-8 text-primary" />
                                    <p className="mt-2 text-sm font-bold text-primary">
                                        Seed Database
                                    </p>
                                    <p className="text-[10px] text-primary/60 mt-1">
                                        Import 15+ sample products
                                    </p>
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </AdminLayout>
        </AdminGuard>
    );
}

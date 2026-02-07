"use client";

import { useAuth } from "@/context/auth-context";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
    LayoutDashboard,
    Package,
    Users,
    LogOut,
    Menu,
    X,
    ShoppingBag,
    MessageSquare
} from "lucide-react";
import { useState } from "react";

const navigation = [
    { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { name: "Products", href: "/admin/products", icon: Package },
    { name: "Users", href: "/admin/users", icon: Users },
    { name: "Reviews", href: "/admin/reviews", icon: MessageSquare },
];

export function AdminLayout({ children }: { children: React.ReactNode }) {
    const { user, logout } = useAuth();
    const pathname = usePathname();
    const router = useRouter();
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const handleLogout = async () => {
        await logout();
        router.push("/");
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Mobile sidebar backdrop */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 z-40 bg-gray-900/50 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <div
                className={`fixed inset-y-0 z-50 flex w-64 flex-col bg-gray-900 transition-transform duration-300 lg:translate-x-0 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"
                    }`}
            >
                {/* Logo */}
                <div className="flex h-16 items-center justify-between border-b border-gray-800 px-6">
                    <Link href="/admin" className="text-xl font-bold text-white">
                        Pi Store Admin
                    </Link>
                    <button
                        onClick={() => setSidebarOpen(false)}
                        className="lg:hidden text-gray-400 hover:text-white"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Navigation */}
                <nav className="flex-1 space-y-1 px-3 py-4">
                    {navigation.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${isActive
                                    ? "bg-gray-800 text-white"
                                    : "text-gray-400 hover:bg-gray-800 hover:text-white"
                                    }`}
                            >
                                <item.icon size={20} />
                                {item.name}
                            </Link>
                        );
                    })}
                </nav>

                {/* User info */}
                <div className="border-t border-gray-800 p-4">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/20 text-xs font-bold text-primary">
                            {user?.email?.[0].toUpperCase()}
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-xs font-medium text-gray-400 truncate">
                                Signed in as
                            </p>
                            <p className="text-sm font-bold text-white truncate">
                                {user?.displayName || "Admin User"}
                            </p>
                        </div>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="flex w-full items-center gap-2 rounded-lg bg-gray-800 px-3 py-2 text-sm font-medium text-gray-300 transition-colors hover:bg-gray-700 hover:text-white"
                    >
                        <LogOut size={16} />
                        Logout
                    </button>
                </div>
            </div>

            {/* Main content */}
            <div className="lg:pl-64">
                {/* Top navbar */}
                <div className="sticky top-0 z-10 flex h-16 items-center justify-between border-b border-gray-200 bg-white px-4 shadow-sm lg:px-8">
                    <button
                        onClick={() => setSidebarOpen(true)}
                        className="lg:hidden text-gray-500 hover:text-gray-700"
                    >
                        <Menu size={24} />
                    </button>
                    <div className="flex-1" />

                    <div className="flex items-center gap-4">
                        <Link
                            href="/"
                            className="flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-primary transition-colors"
                        >
                            <ShoppingBag size={18} />
                            View Store
                        </Link>
                        <div className="h-6 w-px bg-gray-200" />

                        <div className="flex items-center gap-3">
                            <div className="text-right hidden sm:block">
                                <p className="text-sm font-bold text-gray-900 leading-none">
                                    {user?.displayName || user?.email?.split('@')[0]}
                                </p>
                                <p className="text-[10px] text-gray-400 font-medium">
                                    Administrator
                                </p>
                            </div>
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary font-bold border border-primary/20">
                                {user?.email?.[0].toUpperCase()}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Page content */}
                <main className="p-4 lg:p-8">{children}</main>
            </div>
        </div>
    );
}

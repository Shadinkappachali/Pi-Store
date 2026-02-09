"use client";

import { useAuth } from "@/context/auth-context";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export function AdminGuard({ children }: { children: React.ReactNode }) {
    const { user, loading, isAdmin } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!loading) {
            if (!user) {
                router.push("/account/login?redirect=/admin");
            } else if (!isAdmin) {
                router.push("/");
            }
        }
    }, [user, loading, isAdmin, router]);

    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <div className="text-center">
                    <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent mx-auto"></div>
                    <p className="mt-4 text-sm text-gray-500">Loading...</p>
                </div>
            </div>
        );
    }

    if (!user || !isAdmin) {
        return null;
    }

    return <>{children}</>;
}

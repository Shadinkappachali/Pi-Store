"use client";

import { MessageSquare } from "lucide-react";
import Link from "next/link";

import { usePathname } from "next/navigation";

export function WhatsAppButton() {
    const pathname = usePathname();

    if (pathname?.startsWith("/admin")) {
        return null;
    }

    return (
        <Link
            href="https://wa.me/917560850790"
            target="_blank"
            className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-xl hover:scale-110 transition-transform active:scale-95"
            aria-label="Chat with us on WhatsApp"
        >
            <MessageSquare fill="currentColor" className="h-7 w-7" />
        </Link>
    );
}

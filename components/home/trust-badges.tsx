import { Container } from "@/components/ui/container";
import { Truck, ShieldCheck, RefreshCcw, Headset } from "lucide-react";

const badges = [
    {
        icon: Truck,
        title: "Fast Shipping",
        description: "Orders delivered in 2-4 days across India."
    },
    {
        icon: ShieldCheck,
        title: "Secure Payment",
        description: "SSL encrypted 100% safe transactions."
    },
    {
        icon: RefreshCcw,
        title: "Easy Replacement",
        description: "7 days hassle-free return policy."
    },
    {
        icon: Headset,
        title: "Customer Support",
        description: "Friendly support available on WhatsApp."
    }
];

export function TrustBadges() {
    return (
        <section className="border-t border-border bg-white py-16">
            <Container>
                <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4">
                    {badges.map((badge) => (
                        <div key={badge.title} className="flex items-center gap-4">
                            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                                <badge.icon className="h-6 w-6" />
                            </div>
                            <div>
                                <h4 className="font-bold text-secondary">{badge.title}</h4>
                                <p className="mt-1 text-sm text-gray-500">{badge.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </Container>
        </section>
    );
}

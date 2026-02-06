import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";

export default function NotFound() {
    return (
        <div className="flex min-h-[70vh] items-center justify-center bg-white py-20 px-4">
            <Container>
                <div className="flex flex-col items-center text-center">
                    <h1 className="text-9xl font-extrabold text-primary opacity-20">404</h1>
                    <h2 className="mt-4 text-4xl font-extrabold text-secondary">Page Not Found</h2>
                    <p className="mt-4 max-w-md text-lg text-gray-500">
                        Oops! The page you're looking for doesn't exist or has been moved.
                    </p>
                    <div className="mt-10 flex gap-4">
                        <Button asChild>
                            <Link href="/">Back to Home</Link>
                        </Button>
                        <Button variant="outline" asChild>
                            <Link href="/shop">Continue Shopping</Link>
                        </Button>
                    </div>
                </div>
            </Container>
        </div>
    );
}

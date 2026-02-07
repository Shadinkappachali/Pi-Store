"use client";

import { AdminGuard } from "@/components/admin/admin-guard";
import { AdminLayout } from "@/components/admin/admin-layout";
import { useEffect, useState } from "react";
import { getAllReviews, deleteReview, type Review } from "@/lib/firestore";
import { Star, Trash2, MessageSquare, Loader2 } from "lucide-react";
import { format } from "date-fns";

export default function AdminReviewsPage() {
    const [reviews, setReviews] = useState<Review[]>([]);
    const [loading, setLoading] = useState(true);
    const [deletingId, setDeletingId] = useState<string | null>(null);

    useEffect(() => {
        loadReviews();
    }, []);

    const loadReviews = async () => {
        setLoading(true);
        const res = await getAllReviews();
        if (res.success) {
            setReviews(res.reviews);
        }
        setLoading(false);
    };

    const handleDelete = async (reviewId: string) => {
        if (!confirm("Are you sure you want to delete this review?")) return;

        setDeletingId(reviewId);
        const res = await deleteReview(reviewId);
        if (res.success) {
            setReviews(reviews.filter(r => r.id !== reviewId));
        } else {
            alert("Error deleting review.");
        }
        setDeletingId(null);
    };

    return (
        <AdminGuard>
            <AdminLayout>
                <div className="space-y-8">
                    {/* Header */}
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">Manage Reviews</h1>
                            <p className="mt-2 text-sm text-gray-600">
                                View and moderate customer feedback
                            </p>
                        </div>
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-500 text-white shadow-lg">
                            <MessageSquare size={24} />
                        </div>
                    </div>

                    {/* Content */}
                    <div className="rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden">
                        {loading ? (
                            <div className="flex h-64 flex-col items-center justify-center gap-4">
                                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                                <p className="text-sm font-medium text-gray-500">Loading reviews...</p>
                            </div>
                        ) : reviews.length === 0 ? (
                            <div className="flex h-64 flex-col items-center justify-center gap-3 text-center p-8">
                                <div className="h-16 w-16 rounded-full bg-gray-50 flex items-center justify-center text-gray-300">
                                    <MessageSquare size={32} />
                                </div>
                                <p className="text-lg font-bold text-gray-900">No reviews yet</p>
                                <p className="text-sm text-gray-500 px-4">Customer reviews will appear here once they start rating products.</p>
                            </div>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="bg-gray-50/50 border-b border-gray-100">
                                            <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-gray-400">User</th>
                                            <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-gray-400">Product</th>
                                            <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-gray-400">Rating</th>
                                            <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-gray-400">Variant</th>
                                            <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-gray-400">Comment</th>
                                            <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-gray-400">Date</th>
                                            <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-gray-400 text-right">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100">
                                        {reviews.map((review) => (
                                            <tr key={review.id} className="hover:bg-gray-50/50 transition-colors group">
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-3">
                                                        <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary text-[10px] font-black uppercase">
                                                            {review.userName.slice(0, 2)}
                                                        </div>
                                                        <span className="text-sm font-bold text-gray-900">{review.userName}</span>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="flex flex-col">
                                                        <span className="text-sm font-bold text-gray-900">{review.productName || "Unknown Product"}</span>
                                                        <span className="text-[10px] text-gray-400 font-mono tracking-tighter">ID: {review.productId.slice(0, 8)}...</span>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-1 text-amber-400">
                                                        <Star size={14} className="fill-current" />
                                                        <span className="text-sm font-bold text-gray-900">{review.rating}</span>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    {review.variant ? (
                                                        <span className="text-[10px] font-bold text-secondary bg-gray-100 px-2 py-1 rounded">
                                                            {review.variant}
                                                        </span>
                                                    ) : (
                                                        <span className="text-xs text-gray-400">-</span>
                                                    )}
                                                </td>
                                                <td className="px-6 py-4">
                                                    <p className="text-sm text-gray-600 max-w-md line-clamp-2">
                                                        {review.comment}
                                                    </p>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                                                        {format(new Date(review.createdAt), "dd MMM yyyy")}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 text-right">
                                                    <button
                                                        onClick={() => handleDelete(review.id)}
                                                        disabled={deletingId === review.id}
                                                        className="h-8 w-8 rounded-lg flex items-center justify-center text-gray-400 hover:text-red-500 hover:bg-red-50 transition-all opacity-0 group-hover:opacity-100 disabled:opacity-50"
                                                    >
                                                        {deletingId === review.id ? (
                                                            <Loader2 size={14} className="animate-spin" />
                                                        ) : (
                                                            <Trash2 size={16} />
                                                        )}
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                </div>
            </AdminLayout>
        </AdminGuard>
    );
}

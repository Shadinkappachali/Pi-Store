"use client";

import { AlertTriangle, X } from "lucide-react";

interface ConfirmDialogProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title: string;
    message: string;
    confirmText?: string;
    cancelText?: string;
    variant?: "danger" | "warning";
}

export function ConfirmDialog({
    isOpen,
    onClose,
    onConfirm,
    title,
    message,
    confirmText = "Confirm",
    cancelText = "Cancel",
    variant = "danger"
}: ConfirmDialogProps) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-gray-900/50 backdrop-blur-sm"
                onClick={onClose}
            />

            {/* Dialog */}
            <div className="relative w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
                {/* Close button */}
                <button
                    onClick={onClose}
                    className="absolute right-4 top-4 rounded-lg p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
                >
                    <X size={20} />
                </button>

                {/* Icon */}
                <div
                    className={`mx-auto flex h-12 w-12 items-center justify-center rounded-full ${variant === "danger" ? "bg-red-100" : "bg-amber-100"
                        }`}
                >
                    <AlertTriangle
                        size={24}
                        className={variant === "danger" ? "text-red-600" : "text-amber-600"}
                    />
                </div>

                {/* Content */}
                <div className="mt-4 text-center">
                    <h3 className="text-lg font-bold text-gray-900">{title}</h3>
                    <p className="mt-2 text-sm text-gray-600">{message}</p>
                </div>

                {/* Actions */}
                <div className="mt-6 flex gap-3">
                    <button
                        onClick={onClose}
                        className="flex-1 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
                    >
                        {cancelText}
                    </button>
                    <button
                        onClick={() => {
                            onConfirm();
                            onClose();
                        }}
                        className={`flex-1 rounded-lg px-4 py-2.5 text-sm font-medium text-white ${variant === "danger"
                                ? "bg-red-600 hover:bg-red-700"
                                : "bg-amber-600 hover:bg-amber-700"
                            }`}
                    >
                        {confirmText}
                    </button>
                </div>
            </div>
        </div>
    );
}

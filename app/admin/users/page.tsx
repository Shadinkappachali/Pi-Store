"use client";

import { AdminGuard } from "@/components/admin/admin-guard";
import { AdminLayout } from "@/components/admin/admin-layout";
import { DataTable } from "@/components/admin/data-table";
import { ConfirmDialog } from "@/components/admin/confirm-dialog";
import { useEffect, useState } from "react";
import { getUsers, updateUserRole, deleteUser, User } from "@/lib/firestore";
import { Shield, Trash2 } from "lucide-react";

export default function UsersPage() {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [deleteDialog, setDeleteDialog] = useState<{ open: boolean; user?: User }>({
        open: false
    });

    useEffect(() => {
        loadUsers();
    }, []);

    const loadUsers = async () => {
        setLoading(true);
        const { users } = await getUsers();
        setUsers(users);
        setLoading(false);
    };

    const handleRoleToggle = async (user: User) => {
        const newRole = user.role === "admin" ? "user" : "admin";
        const result = await updateUserRole(user.uid, newRole);
        if (result.success) {
            loadUsers();
        }
    };

    const handleDelete = async (user: User) => {
        const result = await deleteUser(user.uid);
        if (result.success) {
            loadUsers();
        }
    };

    const columns = [
        {
            key: "email",
            label: "Email",
            render: (user: User) => (
                <div>
                    <p className="font-medium text-gray-900">{user.email}</p>
                    {user.displayName && (
                        <p className="text-xs text-gray-500">{user.displayName}</p>
                    )}
                </div>
            )
        },
        {
            key: "role",
            label: "Role",
            render: (user: User) => (
                <span
                    className={`inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-semibold ${user.role === "admin"
                        ? "bg-purple-100 text-purple-800"
                        : "bg-gray-100 text-gray-800"
                        }`}
                >
                    {user.role === "admin" && <Shield size={12} />}
                    {user.role}
                </span>
            )
        },
        {
            key: "createdAt",
            label: "Joined",
            render: (user: User) => new Date(user.createdAt).toLocaleDateString()
        },
        {
            key: "lastLogin",
            label: "Last Login",
            render: (user: User) =>
                user.lastLogin ? new Date(user.lastLogin).toLocaleDateString() : "Never"
        }
    ];

    return (
        <AdminGuard>
            <AdminLayout>
                <div className="space-y-6">
                    {/* Header */}
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Users</h1>
                        <p className="mt-2 text-sm text-gray-600">
                            Manage user accounts and roles
                        </p>
                    </div>

                    {/* Table */}
                    {loading ? (
                        <div className="flex h-64 items-center justify-center">
                            <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
                        </div>
                    ) : (
                        <DataTable
                            data={users}
                            columns={columns}
                            rowKey="uid"
                            searchPlaceholder="Search users..."
                            actions={(user) => (
                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={() => handleRoleToggle(user)}
                                        className={`rounded-lg px-3 py-1.5 text-xs font-medium ${user.role === "admin"
                                            ? "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                            : "bg-purple-100 text-purple-700 hover:bg-purple-200"
                                            }`}
                                        title={
                                            user.role === "admin"
                                                ? "Remove admin role"
                                                : "Make admin"
                                        }
                                    >
                                        {user.role === "admin" ? "Revoke Admin" : "Make Admin"}
                                    </button>
                                    <button
                                        onClick={() => setDeleteDialog({ open: true, user })}
                                        className="rounded-lg p-2 text-red-600 hover:bg-red-50"
                                        title="Delete user"
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
                    onConfirm={() => deleteDialog.user && handleDelete(deleteDialog.user)}
                    title="Delete User"
                    message={`Are you sure you want to delete user "${deleteDialog.user?.email}"? This action cannot be undone.`}
                    confirmText="Delete"
                />
            </AdminLayout>
        </AdminGuard>
    );
}

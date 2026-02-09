"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import {
    onAuthStateChanged,
    User,
    signOut,
    GoogleAuthProvider,
    signInWithPopup,
    signInWithEmailAndPassword,
    updateProfile,
    sendPasswordResetEmail,
    createUserWithEmailAndPassword
} from "firebase/auth";
import { auth, db } from "@/lib/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";

interface AuthContextType {
    user: User | null;
    loading: boolean;
    isAdmin: boolean;
    loginWithGoogle: () => Promise<void>;
    registerWithEmail: (email: string, password: string, name: string) => Promise<void>;
    loginWithEmail: (email: string, password: string) => Promise<void>;
    resetPassword: (email: string) => Promise<void>;
    logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            setUser(user);

            // Check if user is admin
            if (user) {
                const isAdminEmail = user.email === "mail4shadin@gmail.com";
                const userDoc = await getDoc(doc(db, "users", user.uid));

                if (userDoc.exists()) {
                    const currentRole = userDoc.data()?.role;
                    // If it's the admin email but not marked as admin, update it
                    if (isAdminEmail && currentRole !== "admin") {
                        await setDoc(doc(db, "users", user.uid), { role: "admin" }, { merge: true });
                        setIsAdmin(true);
                    } else {
                        setIsAdmin(currentRole === "admin");
                    }
                } else {
                    // Create user document if it doesn't exist
                    const role = isAdminEmail ? "admin" : "user";
                    await setDoc(doc(db, "users", user.uid), {
                        email: user.email,
                        displayName: user.displayName,
                        role: role,
                        createdAt: new Date(),
                        lastLogin: new Date()
                    });
                    setIsAdmin(role === "admin");
                }
            } else {
                setIsAdmin(false);
            }

            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const loginWithGoogle = async () => {
        const provider = new GoogleAuthProvider();
        try {
            await signInWithPopup(auth, provider);
        } catch (error) {
            console.error("Error logging in with Google:", error);
            throw error;
        }
    };

    const registerWithEmail = async (email: string, password: string, name: string) => {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            await updateProfile(userCredential.user, {
                displayName: name
            });
            // User doc creation is handled by onAuthStateChanged
        } catch (error) {
            console.error("Error registering with email:", error);
            throw error;
        }
    };

    const loginWithEmail = async (email: string, password: string) => {
        try {
            await signInWithEmailAndPassword(auth, email, password);
        } catch (error) {
            console.error("Error logging in with email:", error);
            throw error;
        }
    };

    const resetPassword = async (email: string) => {
        try {
            await sendPasswordResetEmail(auth, email);
        } catch (error) {
            console.error("Error resetting password:", error);
            throw error;
        }
    };

    const logout = async () => {
        try {
            await signOut(auth);
        } catch (error) {
            console.error("Error logging out:", error);
            throw error;
        }
    };

    return (
        <AuthContext.Provider value={{ user, loading, isAdmin, loginWithGoogle, registerWithEmail, loginWithEmail, resetPassword, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}

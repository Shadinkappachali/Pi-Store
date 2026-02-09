"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export interface FavoriteItem {
    id: string;
    name: string;
    price: number;
    originalPrice?: number;
    image: string;
    category: string;
    rating: number;
    reviews: number;
}

interface FavoritesContextType {
    favorites: FavoriteItem[];
    addToFavorites: (item: FavoriteItem) => void;
    removeFromFavorites: (id: string) => void;
    isFavorite: (id: string) => boolean;
    clearFavorites: () => void;
    totalFavorites: number;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export function FavoritesProvider({ children }: { children: React.ReactNode }) {
    const [favorites, setFavorites] = useState<FavoriteItem[]>([]);

    // Load from local storage
    useEffect(() => {
        const savedFavorites = localStorage.getItem("pi-store-favorites");
        if (savedFavorites) {
            try {
                setFavorites(JSON.parse(savedFavorites));
            } catch (e) {
                console.error("Failed to parse favorites", e);
            }
        }
    }, []);

    // Save to local storage
    useEffect(() => {
        localStorage.setItem("pi-store-favorites", JSON.stringify(favorites));
    }, [favorites]);

    const addToFavorites = (item: FavoriteItem) => {
        setFavorites((prev) => {
            const existing = prev.find((i) => i.id === item.id);
            if (existing) {
                return prev; // Already in favorites
            }
            return [...prev, item];
        });
    };

    const removeFromFavorites = (id: string) => {
        setFavorites((prev) => prev.filter((item) => item.id !== id));
    };

    const isFavorite = (id: string) => {
        return favorites.some((item) => item.id === id);
    };

    const clearFavorites = () => setFavorites([]);

    const totalFavorites = favorites.length;

    return (
        <FavoritesContext.Provider
            value={{
                favorites,
                addToFavorites,
                removeFromFavorites,
                isFavorite,
                clearFavorites,
                totalFavorites,
            }}
        >
            {children}
        </FavoritesContext.Provider>
    );
}

export function useFavorites() {
    const context = useContext(FavoritesContext);
    if (context === undefined) {
        throw new Error("useFavorites must be used within a FavoritesProvider");
    }
    return context;
}

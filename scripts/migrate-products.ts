// This script migrates existing products from constants/products.ts to Firestore
// Run this ONCE to populate your Firestore database with existing products

import { PRODUCTS } from "@/constants/products";
import { bulkImportProducts } from "@/lib/firestore";

export async function migrateProducts() {
    console.log("Starting product migration...");
    console.log(`Found ${PRODUCTS.length} products to migrate`);

    const productsToImport = PRODUCTS.map((product) => ({
        name: product.name,
        brand: product.brand,
        category: product.category,
        price: product.price,
        originalPrice: product.originalPrice,
        image: product.image,
        rating: product.rating,
        reviews: product.reviews,
        available: product.available ?? true,
        stock: 100, // Default stock
        isUnlimited: false, // Default isUnlimited
        badge: product.badge,
        isNew: product.isNew,
        isBestSeller: product.isBestSeller
    }));

    const result = await bulkImportProducts(productsToImport);

    if (result.success) {
        console.log(`✅ Successfully migrated ${result.count} products to Firestore`);
        return true;
    } else {
        console.error("❌ Migration failed:", result.error);
        return false;
    }
}

// To run this migration:
// 1. Go to your admin dashboard: http://localhost:3000/admin
// 2. Open browser console
// 3. Import and run: import { migrateProducts } from '@/scripts/migrate-products'; migrateProducts();

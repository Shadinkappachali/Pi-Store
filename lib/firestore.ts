import {
    collection,
    doc,
    getDoc,
    getDocs,
    addDoc,
    updateDoc,
    deleteDoc,
    query,
    where,
    orderBy,
    Timestamp,
    writeBatch
} from "firebase/firestore";
import { db } from "./firebase";

export interface OptionValue {
    label: string;
    priceModifier: number;
    colorCode?: string; // For hexadecimal color swatches
}

export interface ProductOption {
    id: string;
    name: string; // e.g., "Storage", "Color", "RAM"
    type: "choice" | "color";
    values: OptionValue[];
}

export interface Product {
    id: string;
    name: string;
    brand: string;
    category: string;
    price: number;
    originalPrice?: number;
    image: string;
    rating: number;
    reviews: number;
    available: boolean;
    stock: number;
    isUnlimited: boolean;
    specs?: { label: string; value: string }[];
    options?: ProductOption[]; // Added this line
    badge?: string;
    isNew?: boolean;
    isBestSeller?: boolean;
    createdAt: Date;
    updatedAt: Date;
}

export interface Review {
    id: string;
    productId: string;
    productName?: string;
    userId: string;
    userName: string;
    rating: number;
    comment: string;
    variant?: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface User {
    uid: string;
    email: string;
    displayName?: string;
    role: "user" | "admin";
    createdAt: Date;
    lastLogin?: Date;
}

// ================== PRODUCT CRUD ==================

export async function createProduct(productData: Omit<Product, "id" | "createdAt" | "updatedAt">) {
    try {
        const productsRef = collection(db, "products");
        const docRef = await addDoc(productsRef, {
            ...productData,
            createdAt: Timestamp.now(),
            updatedAt: Timestamp.now()
        });
        return { success: true, id: docRef.id };
    } catch (error) {
        console.error("Error creating product:", error);
        return { success: false, error };
    }
}

export async function getProducts() {
    try {
        const productsRef = collection(db, "products");
        const q = query(productsRef, orderBy("createdAt", "desc"));
        const snapshot = await getDocs(q);

        const products: Product[] = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
            createdAt: doc.data().createdAt?.toDate() || new Date(),
            updatedAt: doc.data().updatedAt?.toDate() || new Date()
        })) as Product[];

        return { success: true, products };
    } catch (error) {
        console.error("Error fetching products:", error);
        return { success: false, products: [], error };
    }
}

export async function getProductById(id: string) {
    try {
        const docRef = doc(db, "products", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            const data = docSnap.data();
            return {
                success: true,
                product: {
                    id: docSnap.id,
                    ...data,
                    createdAt: data.createdAt?.toDate() || new Date(),
                    updatedAt: data.updatedAt?.toDate() || new Date()
                } as Product
            };
        }

        return { success: false, error: "Product not found" };
    } catch (error) {
        console.error("Error fetching product:", error);
        return { success: false, error };
    }
}

export async function updateProduct(id: string, productData: Partial<Product>) {
    try {
        const docRef = doc(db, "products", id);
        await updateDoc(docRef, {
            ...productData,
            updatedAt: Timestamp.now()
        });
        return { success: true };
    } catch (error) {
        console.error("Error updating product:", error);
        return { success: false, error };
    }
}

export async function deleteProduct(id: string) {
    try {
        const docRef = doc(db, "products", id);
        await deleteDoc(docRef);
        return { success: true };
    } catch (error) {
        console.error("Error deleting product:", error);
        return { success: false, error };
    }
}

// ================== USER CRUD ==================

export async function getUsers() {
    try {
        const usersRef = collection(db, "users");
        const snapshot = await getDocs(usersRef);

        const users: User[] = snapshot.docs.map(doc => ({
            uid: doc.id,
            ...doc.data(),
            createdAt: doc.data().createdAt?.toDate() || new Date(),
            lastLogin: doc.data().lastLogin?.toDate()
        })) as User[];

        return { success: true, users };
    } catch (error) {
        console.error("Error fetching users:", error);
        return { success: false, users: [], error };
    }
}

export async function getUserProfile(uid: string) {
    try {
        const docRef = doc(db, "users", uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            const data = docSnap.data();
            return {
                success: true,
                user: {
                    uid: docSnap.id,
                    ...data,
                    createdAt: data.createdAt?.toDate() || new Date(),
                    lastLogin: data.lastLogin?.toDate()
                } as User
            };
        }

        return { success: false, error: "User not found" };
    } catch (error) {
        console.error("Error fetching user profile:", error);
        return { success: false, error };
    }
}

export async function updateUserRole(uid: string, role: "user" | "admin") {
    try {
        const docRef = doc(db, "users", uid);
        await updateDoc(docRef, { role });
        return { success: true };
    } catch (error) {
        console.error("Error updating user role:", error);
        return { success: false, error };
    }
}

export async function deleteUser(uid: string) {
    try {
        const docRef = doc(db, "users", uid);
        await deleteDoc(docRef);
        return { success: true };
    } catch (error) {
        console.error("Error deleting user:", error);
        return { success: false, error };
    }
}

// ================== REVIEW CRUD ==================

export async function addReview(reviewData: Omit<Review, "id" | "createdAt" | "updatedAt">) {
    try {
        const reviewsRef = collection(db, "reviews");
        const docRef = await addDoc(reviewsRef, {
            ...reviewData,
            createdAt: Timestamp.now(),
            updatedAt: Timestamp.now()
        });

        // Update product review count
        const productRef = doc(db, "products", reviewData.productId);
        const productSnap = await getDoc(productRef);
        if (productSnap.exists()) {
            const product = productSnap.data();
            const currentReviews = product.reviews || 0;
            const currentRating = product.rating || 0;

            // Basic weighted average for rating
            const newReviews = currentReviews + 1;
            const newRating = ((currentRating * currentReviews) + reviewData.rating) / newReviews;

            await updateDoc(productRef, {
                reviews: newReviews,
                rating: Number(newRating.toFixed(1)),
                updatedAt: Timestamp.now()
            });
        }

        return { success: true, id: docRef.id };
    } catch (error) {
        console.error("Error adding review:", error);
        return { success: false, error };
    }
}

export async function getReviewsByProductId(productId: string) {
    try {
        const reviewsRef = collection(db, "reviews");
        const q = query(
            reviewsRef,
            where("productId", "==", productId)
        );
        const snapshot = await getDocs(q);

        const reviews: Review[] = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
            createdAt: doc.data().createdAt?.toDate() || new Date(),
            updatedAt: doc.data().updatedAt?.toDate() || new Date()
        })) as Review[];

        // Sort by date descending (newest first)
        reviews.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());

        return { success: true, reviews };
    } catch (error) {
        console.error("Error fetching reviews:", error);
        return { success: false, reviews: [], error };
    }
}

export async function getAllReviews() {
    try {
        const reviewsRef = collection(db, "reviews");
        const snapshot = await getDocs(reviewsRef);
        const reviews = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
            createdAt: doc.data().createdAt?.toDate() || new Date(),
        })) as Review[];

        // Sort by date descending
        reviews.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());

        return { success: true, reviews };
    } catch (error) {
        console.error("Error fetching all reviews:", error);
        return { success: false, reviews: [], error };
    }
}

export async function deleteReview(reviewId: string) {
    try {
        const reviewRef = doc(db, "reviews", reviewId);
        await deleteDoc(reviewRef);
        return { success: true };
    } catch (error) {
        console.error("Error deleting review:", error);
        return { success: false, error };
    }
}

// ================== BULK OPERATIONS ==================

export async function bulkImportProducts(products: Omit<Product, "id" | "createdAt" | "updatedAt">[]) {
    try {
        const batch = writeBatch(db);
        const productsRef = collection(db, "products");

        products.forEach((product) => {
            const docRef = doc(productsRef);
            batch.set(docRef, {
                ...product,
                createdAt: Timestamp.now(),
                updatedAt: Timestamp.now()
            });
        });

        await batch.commit();
        return { success: true, count: products.length };
    } catch (error) {
        console.error("Error bulk importing products:", error);
        return { success: false, error };
    }
}

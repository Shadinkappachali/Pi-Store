export interface Product {
    id: string;
    name: string;
    price: number;
    originalPrice?: number;
    rating: number;
    reviews: number;
    category: string;
    brand: string;
    image: string;
    available: boolean;
    badge?: string;
    isNew?: boolean;
    isBestSeller?: boolean;
}

export const PRODUCTS: Product[] = [
    // Existing Accessories
    { id: "1", name: "HyperCharge 65W GaN Fast Charger", price: 2499, originalPrice: 3999, rating: 4.9, reviews: 1250, category: "Chargers", brand: "Pi", image: "https://images.unsplash.com/photo-1583863788434-e58a36330cf0?q=80&w=800&auto=format&fit=crop", available: true, isBestSeller: true, badge: "Best Seller" },
    { id: "2", name: "SonicSync Pro Wireless Earbuds", price: 1899, originalPrice: 2999, rating: 4.8, reviews: 840, category: "Earphones", brand: "Sonic", image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?q=80&w=800&auto=format&fit=crop", available: true, isBestSeller: true },
    { id: "3", name: "PrecisionTrack Wireless Mouse", price: 1299, originalPrice: 1999, rating: 4.7, reviews: 620, category: "Mouse", brand: "Logi", image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?q=80&w=800&auto=format&fit=crop", available: true, isBestSeller: true },
    { id: "4", name: "DuraLink Pro USB-C Cable", price: 799, originalPrice: 1299, rating: 4.9, reviews: 2100, category: "Cables", brand: "Pi", image: "https://images.unsplash.com/photo-1625805721666-3be3d4d3c3cc?q=80&w=800&auto=format&fit=crop", available: true, isBestSeller: true },
    { id: "5", name: "GhostType Mechanical Keyboard", price: 4499, originalPrice: 5999, rating: 4.8, reviews: 310, category: "Keyboards", brand: "Steel", image: "https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?q=80&w=800&auto=format&fit=crop", available: true, isBestSeller: true },
    { id: "6", name: "PowerVault 20000mAh Power Bank", price: 2999, originalPrice: 4499, rating: 4.6, reviews: 450, category: "Power Banks", brand: "Pi", image: "https://images.unsplash.com/photo-1625752321528-9820f121df0d?q=80&w=800&auto=format&fit=crop", available: true },
    { id: "7", name: "AirGuard iPhone 15 Case", price: 899, originalPrice: 1499, rating: 4.5, reviews: 1500, category: "Cases", brand: "Spigen", image: "https://images.unsplash.com/photo-1603313011101-31c72ee2c606?q=80&w=800&auto=format&fit=crop", available: true },
    { id: "8", name: "NanoHub 7-in-1 Adapter", price: 3299, originalPrice: 4999, rating: 4.9, reviews: 45, category: "Laptop Accessories", brand: "Pi", image: "https://images.unsplash.com/photo-1616422285623-13ff0167c95c?q=80&w=800&auto=format&fit=crop", available: true, isNew: true, badge: "New" },
    { id: "9", name: "SlimFit Laptop Sleeve (14 inch)", price: 1199, originalPrice: 1799, rating: 4.4, reviews: 280, category: "Laptop Accessories", brand: "Pi", image: "https://images.unsplash.com/photo-1544377193-33dcf4d68fb5?q=80&w=800&auto=format&fit=crop", available: true, isNew: true, badge: "New" },
    { id: "10", name: "CoolStream Laptop Cooling Pad", price: 1599, originalPrice: 2499, rating: 4.3, reviews: 190, category: "Laptop Accessories", brand: "Cooler", image: "https://images.unsplash.com/photo-1588505794452-9e59ace3a24e?q=80&w=800&auto=format&fit=crop", available: false },

    // New Mobiles
    { id: "m11", name: "iPhone 15 Pro", price: 129900, originalPrice: 134900, rating: 4.9, reviews: 210, category: "Mobile", brand: "Apple", image: "https://images.unsplash.com/photo-1695048133142-1a20484d256e?q=80&w=1200&auto=format&fit=crop", available: true, isNew: true, badge: "Premium" },
    { id: "m12", name: "Samsung Galaxy S24 Ultra", price: 124900, originalPrice: 129900, rating: 4.8, reviews: 180, category: "Mobile", brand: "Samsung", image: "https://images.unsplash.com/photo-1707240160333-e991262d1c68?q=80&w=800&auto=format&fit=crop", available: true, isNew: true, badge: "Top Rated" },
    { id: "m13", name: "Google Pixel 8 Pro", price: 106900, originalPrice: 109900, rating: 4.7, reviews: 95, category: "Mobile", brand: "Google", image: "https://images.unsplash.com/photo-1697203610931-18e384f67c46?q=80&w=800&auto=format&fit=crop", available: true },

    // New Laptops
    { id: "l14", name: "MacBook Pro M3 (14-inch)", price: 169900, originalPrice: 199900, rating: 4.9, reviews: 150, category: "Laptop", brand: "Apple", image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=800&auto=format&fit=crop", available: true, isBestSeller: true, badge: "M3 Powered" },
    { id: "l15", name: "Dell XPS 15 (2024)", price: 210000, originalPrice: 230000, rating: 4.8, reviews: 65, category: "Laptop", brand: "Dell", image: "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?q=80&w=800&auto=format&fit=crop", available: true, isNew: true },
    { id: "l16", name: "Asus ROG Zephyrus G14", price: 145000, originalPrice: 165000, rating: 4.9, reviews: 120, category: "Laptop", brand: "ASUS", image: "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?q=80&w=800&auto=format&fit=crop", available: true, badge: "Gamer Choice" },
];

export const CATEGORIES = Array.from(new Set(PRODUCTS.map(p => p.category)));
export const BRANDS = Array.from(new Set(PRODUCTS.map(p => p.brand)));

"use server"
import { createClient } from "@/lib/utils/supabase/server";

type Product = {
    id: string,
    name: string,
    description: string,
    price: number
}

export default async function searchProducts(search: string): Promise<Product[] | null> {
    const supabase = await createClient();
    try {
        const { data, error } = await supabase.rpc('vulnerable_search', { 
            search_term: search 
        });
        
        if (error) {
            console.error("RPC Error:", error);
            throw error;
        }
        
        console.log("Raw data from Supabase:", data); // Debug log
        
        if (!data || data.length === 0) {
            return [];
        }
        
        // Map the database columns to your Product type
        const products: Product[] = data.map((item: any) => ({
            id: item.productid?.toString() || item.id?.toString() || '',
            name: item.productname || item.name || '',
            description: item.description || '',
            price: item.cost || item.price || 0
        }));
        
        console.log("Mapped products:", products); // Debug log
        
        return products;
    } catch (err) {
        console.error("Supabase Error:", err);
        return null;
    }
}
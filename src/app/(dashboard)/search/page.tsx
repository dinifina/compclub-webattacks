"use client";
import { Suspense, useEffect, useState } from "react";
import { Button } from "@/components/ui/button"
import { PageCard, PageCardHeader, PageCardTitle, PageCardContent } from "@/components/ui/pagecard"
import { Divider } from "@mui/material"
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import SearchResult from "@/components/ui/searchresult";
import searchProducts from "@/components/server/search";

type Product = {
    id: string,
    name: string,
    description: string,
    price: number
}

function SearchContent() {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const router = useRouter();

    const [ products, setProducts ] = useState<Product[] | null>(null);
    const [ notFound, setNotFound ] = useState(false);
    const [ loading, setLoading ] = useState(false);
    const currentQuery = searchParams.get('q') || '';

    useEffect(() => {
        const handleSearch = async () => {
            if (currentQuery) {
                setLoading(true);
                try {
                    const data = await searchProducts(currentQuery);
                    console.log("Search results:", data);
                    
                    if (data && data.length > 0) {
                        setNotFound(false);
                        setProducts(data);
                    } else {
                        setNotFound(true);
                        setProducts(null);
                    }
                } catch (error) {
                    console.error("Search error:", error);
                    setNotFound(true);
                    setProducts(null);
                } finally {
                    setLoading(false);
                }
            } else {
                setProducts(null);
                setNotFound(false);
            }
        }

        handleSearch();
    }, [currentQuery]);
    
    const search = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const query = formData.get('query') as string;
        const params = new URLSearchParams(searchParams);
        if (query) {
            params.set('q', query);
        } else {
            params.delete('q');
        }
        router.replace(`${pathname}?${params.toString()}`);
    }

    return (
        <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
            <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
                <PageCard>
                    <PageCardHeader>
                        <PageCardTitle>Search</PageCardTitle>
                    </PageCardHeader>
                    <Divider variant="middle" flexItem />
                    <PageCardContent className="items-start">
                        <form onSubmit={search}
                            className="flex flex-col bg-gray-50 rounded-xl min-w-xl border border-gray-100 shadow-xs p-4 gap-2"
                        >
                            <label className="font-bold">
                                Search Products...
                            </label>
                            <input 
                                type="text"
                                id="query"
                                name="query"
                                defaultValue={currentQuery}
                                placeholder="Enter product name..."
                                className="bg-white rounded-3xl min-w-xl border border-gray-100 shadow-xs p-4"
                            />
                            <Button type="submit" className="hover:bg-foreground/50">Search</Button>
                        </form>
                        
                        {loading && <p className="mt-4">Searching...</p>}
                        
                        {products && products.length > 0 && !notFound && !loading && (
                            <div className="mt-4 space-y-4">
                                {products.map((product) => (
                                    <SearchResult 
                                        key={product.id}
                                        productId={parseInt(product.id)} 
                                        productName={product.name}
                                        productDescription={product.description}
                                        productPrice={product.price}
                                    />
                                ))}
                            </div>
                        )}
                        
                        {notFound && !loading && currentQuery && (
                            <p className="mt-4">Product not found.</p>
                        )}
                    </PageCardContent>
                </PageCard>
            </main>
        </div>
    );
}

export default function SearchPage() {
    return (
        <Suspense fallback={
            <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
                <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
                    <div className="animate-pulse">Loading search...</div>
                </main>
            </div>
        }>
            <SearchContent />
        </Suspense>
    );
}
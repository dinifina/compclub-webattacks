"use client";
import { Suspense, useEffect, useState } from "react";
import { Button } from "@/components/ui/button"
import { PageCard, PageCardHeader, PageCardTitle, PageCardContent } from "@/components/ui/pagecard"
import { Divider } from "@mui/material"
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { createClient } from "@/lib/utils/supabase/server";

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
    const supabase = createClient();

    const [ product, setProduct ] = useState<Product[]>([]);
    const currentQuery = searchParams.get('product') || '';

    useEffect(() => {
        if (currentQuery) {
            searchProducts();
        } else {
            setProduct([]);
        }
    }, [currentQuery]);

    const searchProducts = async () => {
        try {
            const { data, error } = await supabase.
        }
    }
    
    const search = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const query = formData.get('query') as string;
        const params = new URLSearchParams(searchParams);
        if (query) {
            params.set('product', query);
        } else {
            params.delete('product');
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
                                className="bg-white rounded-3xl min-w-xl border border-gray-100 shadow-xs p-4"
                            />
                            <Button type="submit" className="hover:bg-foreground/50">Search</Button>
                        </form>
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
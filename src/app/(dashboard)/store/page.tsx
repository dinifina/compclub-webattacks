"use client"

import { PageCard, PageCardContent, PageCardHeader, PageCardTitle } from "@/components/ui/pagecard";
import { Divider } from "@mui/material";
import { useEffect } from "react";
import ProductGallery from "@/components/store/productgallery";

export default function Store() {
    useEffect(() => {
        try {
            fetch('/products.json')
            .then((res: Response) => res.json())
            .then((data) => {
                if (!localStorage.getItem("store")) {
                    localStorage.setItem("store", JSON.stringify(data.products));
                }
            });
        } catch (err) {
            console.error(err);
        }
    }, []);

    return (
        <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
            <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
                <PageCard>
                <PageCardHeader>
                    <PageCardTitle>Store</PageCardTitle>
                </PageCardHeader>
                <Divider variant="middle" flexItem />
                <p className="text-lg font-bold">Total Credits: 0</p>
                <PageCardContent>
                    <ProductGallery />
                </PageCardContent>
                </PageCard>
            </main>
        </div>
    );
}
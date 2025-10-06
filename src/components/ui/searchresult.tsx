"use client";

import { Button } from "@/components/ui/button";

export default function SearchResult({
    productId,
    productName,
    productDescription,
    productPrice
}: {
    productId: number,
    productName: string,
    productDescription: string,
    productPrice: number
}) {
    return (
        <div className="max-w-xs bg-white border border-gray-200 rounded-lg shadow-sm flex flex-col h-full">
            <div className="p-5 bg-gray-100 justify-end flex-grow">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">{productName}</h5>
                <p className="mb-3 font-normal text-gray-700">{productDescription}</p>
            </div>
            <div className="flex flex-row p-5 pt-0 bg-gray-100">
                <p className="pt-2">Cost: <b>{productPrice}</b></p>
            </div>
        </div>
    )
}
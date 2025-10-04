"use client"

import { PageCard, PageCardContent, PageCardFooter, PageCardHeader, PageCardTitle } from "@/components/ui/pagecard";
import { Divider } from "@mui/material";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { redirect } from "next/navigation";

export default function Cart() {
    const [ cart, setCart ] = useState<CartProduct[] | null>(null);

    const handlePurchaseAll = () => {
        if (!cart) {
            alert("Add items to your cart");
            return;
        }

        if (!cart?.find((item: CartProduct) => item.productName == "Pirate Flag")) {
            localStorage.removeItem("cart");
            alert("You did not buy the flag!");
            window.location.reload();
            return;
        }

        const totalCost = cart.reduce((sum, item) => sum + item.price, 0);

        if (totalCost > 0) {
            localStorage.removeItem("cart");
            alert("You do not have enough credits :(");
            window.location.reload();
            return
        }

        alert(process.env.NEXT_PUBLIC_FLAG_LOCALS);
    }

    useEffect(() => {
        try {
            const localCart = localStorage.getItem("cart");

            if (localCart) {
                const cartJson = JSON.parse(localCart);
                const listCart = cartJson.map((item: any) => {
                    const prod: CartProduct = {
                        productId: item.productId,
                        productName: item.productName,
                        quantity: item.quantity,
                        price: item.price
                    }
                    return prod;
                });
                setCart(listCart);
            } else {
                console.error("COULD NOT FIND CART");
            }
        } catch (err) {
            console.error(err);
        }
    }, [])

    return (
        <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
            <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
                <PageCard>
                    <PageCardHeader>
                        <PageCardTitle>Your Cart</PageCardTitle>
                    </PageCardHeader>
                    <Divider variant="middle" flexItem />
                    <PageCardContent>
                        <div className="grid grid-cols-[4fr_1fr_1fr] min-w-4xl justify-center pt-4 pl-10 pb-2 shadow gap-y-3">
                            <h4 className="font-bold">Product</h4>
                            <h4 className="font-bold">Quantity</h4>
                            <h4 className="font-bold">Cost</h4>
                            {cart && cart.map((prod:CartProduct, index) => {
                                return (
                                    <>
                                        <h4>{prod.productName}</h4>
                                        <h4>{prod.quantity}</h4>
                                        <h4>{prod.price * prod.quantity}</h4>
                                    </>
                                )
                            })}
                        </div>
                    </PageCardContent>
                    <PageCardFooter>
                        <Button onClick={handlePurchaseAll}>Purchase all</Button>
                    </PageCardFooter>
                </PageCard>
            </main>
        </div>
    )
}
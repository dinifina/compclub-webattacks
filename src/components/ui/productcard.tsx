"use client";

import { Button } from "@/components/ui/button";

export default function ProductCard({
    productId,
    productName,
    productImage,
    productDescription,
    productPrice
}: {
    productId: number,
    productName: string,
    productImage: string,
    productDescription: string,
    productPrice: number
}) {

    const handleAddToCart = () => {
        try {
            const cart = localStorage.getItem("cart");

            if (cart && cart !== null) {
                const jsonCartProducts = JSON.parse(cart);
                const product = jsonCartProducts.find((item: CartProduct) => item.productName === productName);
                if (product) {
                    const updatedCart = jsonCartProducts.map((item: CartProduct) =>
                        item.productName === productName
                        ? {...item, quantity: item.quantity + 1}
                        : item
                    );
                    localStorage.setItem("cart", JSON.stringify(updatedCart));
                } else {
                    const newProduct: CartProduct = {
                        productId: productId,
                        productName: productName,
                        quantity: 1,
                        price: productPrice
                    }
                    jsonCartProducts.push(newProduct);
                    localStorage.setItem("cart", JSON.stringify(jsonCartProducts));
                }
            } else {
                const product: CartProduct = {
                    productId: productId,
                    productName: productName,
                    quantity: 1,
                    price: productPrice
                }
                const listCartProducts = [product];
                localStorage.setItem("cart", JSON.stringify(listCartProducts));
            }
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <div className="max-w-xs bg-white border border-gray-200 rounded-lg shadow-sm flex flex-col h-full">
            <img src={productImage} className="rounded-t-lg h-48 w-full object-cover"/>
            <div className="p-5 bg-gray-100 justify-end flex-grow">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">{productName}</h5>
                <p className="mb-3 font-normal text-gray-700">{productDescription}</p>
            </div>
            <div className="flex flex-row p-5 pt-0 bg-gray-100">
                <p className="pt-2">Cost: <b>{productPrice}</b></p>
                <Button onClick={handleAddToCart} className="ml-auto">Add to cart</Button>
            </div>
        </div>
    )
}
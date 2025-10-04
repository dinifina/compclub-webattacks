import { useState, useEffect } from "react"
import ProductCard from "../ui/productcard";

export default function ProductGallery() {
    const [ products, setProducts ] = useState<Product[] | null>(null);

    useEffect(() => {
        const storeProducts = localStorage.getItem("store");
        if (storeProducts) {
            const productsJson = JSON.parse(storeProducts);
            const listProducts = productsJson.map((prod: any) => {
                const newProd: Product = {
                    id: prod.id,
                    productName: prod.productName,
                    image: prod.image,
                    description: prod.description,
                    cost: prod.cost
                };
                return newProd;
            });
            setProducts(listProducts);
        } else {
            console.error("LOCALSTORAGE NOT SET")
        }
    }, [])

    return (
        <div className="grid grid-cols-4 gap-4 p-10">
            {products &&
                products.map((product, idx) => (
                    <ProductCard
                        productId={product.id}
                        productName={product.productName}
                        productImage={product.image}
                        productDescription={product.description}
                        productPrice={product.cost}
                    />
                ))
            }
        </div>
    )
}
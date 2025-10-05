import * as React from "react";
import Link from "next/link";
import pirateFont from "@/fonts";
import { cn } from "@/lib/utils";

const unAuthNavlinks: NavLink[] = [{
    href: "/store",
    name: "Store"
}, {
    href: "/contact-us",
    name: "Contact Us"
}, {
    href: "/admin",
    name: "Admin"
}, {
    href: "/cart",
    name: "Your Cart"
}, {
  href: '/login',
  name: 'Login'
}];

export default function NavBar({ className, ...props }: React.ComponentProps<"header">) {
    return (
        <header 
            className={cn(
                "bg-white text-black flex flex-row p-5 pr-20 pl-20",
                className
            )}
            {...props}
        >
            <Link href="/" className={`${pirateFont.className} text-4xl justify-start flex-1`}>Yarrrhoo</Link>
            <div className="text-xl font-bold flex flex-row gap-10 pt-1 justify-end">
                {unAuthNavlinks.map((link, index) => (
                    <Link key={link.href} href={link.href}>{link.name}</Link>
                ))}
            </div>
        </header>
    )
}
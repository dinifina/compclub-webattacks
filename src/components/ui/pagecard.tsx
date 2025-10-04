import * as React from "react";
import pirateFont from "@/fonts";
import { cn } from "@/lib/utils";

function PageCard({ className, ...props }: React.ComponentProps<"div">) {
    return (
        <div 
            data-slot="page-card"
            className={cn(
                "bg-white w-full min-w-full md:min-w-6xl min-h-full md:min-h-120 pb-10 relative",
                "flex flex-col items-center gap-4 rounded-xl border-gray shadow-sm text-black",
                className
            )}
            {...props}
        />
    );
};

function PageCardHeader({ className, ...props }: React.ComponentProps<"div">) {
    return (
        <div 
            data-slot="page-card-header"
            className={cn(
                "w-full min-w-full pt-15 pb-4",
                "flex flex-col items-center gap-1",
                className
            )}
            {...props}
        />
    );
};

function PageCardTitle({ className, ...props }: React.ComponentProps<"div">) {
    return (
        <div 
            data-slot="page-card-title"
            className={cn(
                `${pirateFont.className} text-8xl text-black`,
                className
            )}
            {...props}
        />
    );
};

function PageCardContent({ className, ...props }: React.ComponentProps<"div">) {
    return (
        <div 
            data-slot="page-card-content"
            className={cn(
                "flex flex-col items-center gap-2",
                className
            )}
            {...props}
        />
    );
};

function PageCardFooter({ className, ...props }: React.ComponentProps<"footer">) {
    return (
        <footer 
            data-slot="page-card-footer"
            className={cn(
                "flex flex-row items-center gap-2 absolute bottom-5",
                className
            )}
            {...props}
        />
    );
};

export {
    PageCard,
    PageCardHeader,
    PageCardTitle,
    PageCardContent,
    PageCardFooter
}
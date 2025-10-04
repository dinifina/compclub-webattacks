import * as React from "react";
import { cn } from "@/lib/utils";

function TextArea({ className, ...props }: React.ComponentProps<"textarea">) {
    return (
        <textarea
            data-slot="textarea"
            className={cn(
                "bg-gray-50 rounded-xl min-w-xl border border-gray-100 shadow-xs p-4",
                className
            )}
            {...props}
        />
    );
};

export { TextArea }
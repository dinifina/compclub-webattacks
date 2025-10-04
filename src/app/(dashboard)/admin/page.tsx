"use client";

import { PageCard, PageCardHeader, PageCardTitle, PageCardContent } from "@/components/ui/pagecard"
import { Divider } from "@mui/material"
import { useEffect, useState } from "react"

export default function AdminPage() {
    const [ authorized, setAuthorized ] = useState(false);
    const [ error, setError ] = useState<String | null>(null);

    useEffect(() => {
        const handleVerifyAuth = async () => {
            const res = await fetch("/api/auth/verifytoken");
            const jsonRes = await res.json();

            if (jsonRes.error) {
                setError(jsonRes.error);
                setAuthorized(false);
            }

            if (jsonRes.success === false) {
                setError(jsonRes.message);
                setAuthorized(false);
            }

            if (jsonRes.success === true) {
                setAuthorized(true);
                setError(null);
            }
        }

        handleVerifyAuth();
    }, []);

    return (
        <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
            <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
                <PageCard>
                    <PageCardHeader>
                        <PageCardTitle>Admin Page</PageCardTitle>
                    </PageCardHeader>
                    <Divider variant="middle" flexItem />
                    <PageCardContent className="items-start">
                        {authorized ?
                        <p>{process.env.NEXT_PUBLIC_FLAG_JWT}</p>
                        : <p>{error}</p>
                        }
                    </PageCardContent>
                </PageCard>
            </main>
        </div>
    )
}
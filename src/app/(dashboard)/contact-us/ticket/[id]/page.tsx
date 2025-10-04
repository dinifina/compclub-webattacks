"use client";

import { PageCard, PageCardHeader, PageCardTitle, PageCardContent, PageCardFooter } from "@/components/ui/pagecard";
import { Button } from "@/components/ui/button";
import { Divider } from "@mui/material";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function TicketPage() {
    const [ data, setData ] = useState<string | null>(null);
    const [ error, setError ] = useState<string | null>(null);
    const [ isLoading, setIsLoading ] = useState(true);
    const id = useParams().id?.toString() ?? "";

    useEffect(() => {
        setIsLoading(true);
        const handleFetchTicket = async () => {
            const res = await fetch(`/api/ticket/${id}`);
            const jsonData = await res.json();

            if (res.ok && !jsonData.error) {
                setData(jsonData.data.content);
                setError(null);
            } else {
                setError(jsonData.error);
                setData(null);
            }

            setIsLoading(false);
        }

        handleFetchTicket();
    }, [id]);

    return (
        <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
            <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
                <PageCard>
                    <PageCardHeader>
                        <PageCardTitle>Ticket: {id}</PageCardTitle>
                    </PageCardHeader>
                    <Divider variant="middle" flexItem />
                    <PageCardContent className="pt-6 items-start justify-center gap-5">
                    </PageCardContent>
                        {isLoading && <p>Loading...</p>}
                        {error && !isLoading && <p>{error}</p>}
                        {data && <p>{data}</p>}
                    <PageCardFooter>
                    </PageCardFooter>
                </PageCard>
            </main>
        </div>
    )
}
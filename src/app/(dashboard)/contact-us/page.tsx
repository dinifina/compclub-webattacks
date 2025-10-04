"use client"

import { PageCard, PageCardContent, PageCardFooter, PageCardHeader, PageCardTitle } from "@/components/ui/pagecard";
import { TextArea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Divider } from "@mui/material";

export default function ContactUs() {
    return (
        <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
            <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
                <PageCard>
                    <PageCardHeader>
                        <PageCardTitle>Contact Us</PageCardTitle>
                    </PageCardHeader>
                    <Divider variant="middle" flexItem />
                    <PageCardContent className="pt-6 items-start justify-center gap-5">
                        <h3 className="font-semibold">Have a concern? Let us know below!</h3>
                        <TextArea className="h-30" />
                    </PageCardContent>
                    <PageCardFooter>
                        <Button>Submit</Button>
                    </PageCardFooter>
                </PageCard>
            </main>
        </div>
    )
}
"use client"

import { PageCard, PageCardContent, PageCardFooter, PageCardHeader, PageCardTitle } from "@/components/ui/pagecard";
import { TextArea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Divider } from "@mui/material";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function ContactUs() {
    const router = useRouter();
    const [ supportContent, setSupportContent ] = useState<String | null>(null);
    const [ loadingSubmission, setLoadingSubmission ] = useState(false);
    const [ error, setError ] = useState<String | null>();

    useEffect(() => {
      const originalAlert = window.alert;
      const originalConsoleLog = window.console.log;

      window.alert = function customAlert(msg) {
        setSupportContent(process.env.NEXT_PUBLIC_HTML_INJECTION_FLAG);
      };

      window.console.log = function customLog(msg) {
        setSupportContent(process.env.NEXT_PUBLIC_HTML_INJECTION_FLAG);
      };

      return () => {
        window.alert = originalAlert;
        window.console.log = originalConsoleLog;
      };
    }, []);

    const handleSubmit = async () => {
        try {
            setLoadingSubmission(true);
            const res = await fetch(`/api/ticket`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ content: supportContent })
            });

            const jsonRes = await res.json();

            if (jsonRes.error) {
                console.error("Error occurred: ", jsonRes.error);
                setError(jsonRes.error);
            }

            const id = jsonRes.id;
            router.push(`/contact-us/ticket/${id}`);
        } catch (err) {
            console.error("Error occurred: ", err);
            setError("An error occurred");
        }
    }
    return (
        <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
            <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
                <PageCard>
                    <PageCardHeader>
                        <PageCardTitle>Contact Us</PageCardTitle>
                    </PageCardHeader>
                    <Divider variant="middle" flexItem />
                    <PageCardContent className="pt-6 items-start justify-center gap-5">
                        {loadingSubmission ? <p>Loading submission...</p> : 
                            <>
                                <h3 className="font-semibold">Have a concern? Let us know below!</h3>
                                <TextArea onChange={(e) => setSupportContent(e.target.value)} className="h-30" />
                            </>
                        }
                        <div className="flex flex-col items-start gap-2 w-full">
                            <h1 className="font-bold">Preview: </h1>
                            <div
                              className="w-xl"
                              dangerouslySetInnerHTML={{ __html: supportContent ?? '' }}
                            />
                          <br />
                        </div>
                    </PageCardContent>
                    <PageCardFooter className="flex flex-col">
                        {error && <p className="text-red-500">{error}</p>}
                        <Button onClick={handleSubmit}>Submit</Button>
                    </PageCardFooter>
                </PageCard>
            </main>
        </div>
    )
}
"use client";

import { PageCard, PageCardContent, PageCardHeader, PageCardTitle } from "@/components/ui/pagecard";
import { Divider } from "@mui/material";
import Link from "next/link";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    const handleSetToken = async () => {
      const res = await fetch('/api/auth/settoken');

      if (!res.ok) {
        console.error('Error setting token');
      };
    };

    handleSetToken();
  }, []);

  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <PageCard>
          <PageCardHeader>
            <PageCardTitle>Yarrrhoo</PageCardTitle>
            <p className="text-lg italic">Yer one stop shop for pirates</p>
          </PageCardHeader>
          <Divider variant="middle" flexItem />
          <PageCardContent>
            <Link href="/store">
              <img src="/treasure.jpg" alt="Go to store" className="h-50"/>
            </Link>
          </PageCardContent>
        </PageCard>
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
      </footer>
    </div>
  );
}

"use client";

import { Skeleton } from "@/components/ui/skeleton.tsx";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";

export default async function Dashboard() {
  const session = useSession();

  if (!session) {
    redirect("/");
  }
  useEffect(() => {
    redirect("/dashboard/files");
  });

  return (
    <div className="flex flex-col space-y-3">
      <Skeleton className="h-[125px] w-[250px] rounded-xl" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[200px]" />
      </div>
    </div>
  );
}

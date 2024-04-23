"use client";

import { redirect } from "next/navigation";
import { useEffect, useState } from "react";

export default async function Dashboard() {
  useEffect(() => {
    redirect("/dashboard/files");
  });
}

"use client";

import { Button } from "@/components/ui/button";
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";

export default function SettingsPage() {
  const { isAuthenticated } = getKindeServerSession();

  if (!isAuthenticated) {
    // Redirect to login if not authenticated
    redirect("/api/auth/login");
  }

  return (
    <div className="space-y-4 m-8">
      <h1 className="text-xl font-bold">Settings</h1>

      <LogoutLink>
        <Button>Logout</Button>
      </LogoutLink>
    </div>
  );
}

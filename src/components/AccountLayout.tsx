"use client";

import { useEffect, useState } from "react";
import AccountSidebar from "./AccountSidebar";

export default function AccountLayout({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/graphql", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "same-origin",
          body: JSON.stringify({ query: "query{ me { id name email } }" }),
        });
        const json = await res.json();
        if (!json.data?.me) {
          location.href = "/login";
          return;
        }
        setUser(json.data.me);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) return null;
  if (!user) return null;

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid gap-6 sm:grid-cols-[16rem_1fr]">
        <AccountSidebar />
        <div>{children}</div>
      </div>
    </div>
  );
}



"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import AdminSidebar from "@/components/AdminSidebar";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [me, setMe] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/graphql", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "same-origin",
          body: JSON.stringify({ query: "query{ me { id name email isAdmin } }" }),
        });
        const json = await res.json();
        const u = json.data?.me || null;
        if (!u) {
          router.replace("/login");
          return;
        }
        setMe(u);
        setIsAdmin(!!u.isAdmin);
        if (!u.isAdmin) router.replace("/dashboard");
      } finally {
        setLoading(false);
      }
    })();
  }, [router]);

  if (loading) return null;
  if (!isAdmin) return null;

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid gap-6 sm:grid-cols-[16rem_1fr]">
        <AdminSidebar user={me} />
        <div>{children}</div>
      </div>
    </div>
  );
}


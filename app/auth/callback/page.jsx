"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function Callback() {
  const router = useRouter();

  useEffect(() => {
    const handleRedirect = async () => {
      const { data, error } = await supabase.auth.getSession();

      if (error || !data.session) {
        router.push("/login");
        return;
      }

      const user = data.session.user;

      // ✅ ADMIN CHECK
      if (user.email === "kayes.mia@northsouth.edu") {
        router.push("/admin");
      } else {
        router.push("/dashboard");
      }
    };

    handleRedirect();
  }, [router]);

  return (
    <div className="flex h-screen items-center justify-center">
      Logging you in...
    </div>
  );
}
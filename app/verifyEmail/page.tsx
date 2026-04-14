"use client"

import { useSearchParams, useRouter } from "next/navigation"
import { useEffect, Suspense } from "react"


function VerifyEmail() {
  const searchParams = useSearchParams()
  const router = useRouter();

  const token = searchParams.get("token")
  const getVerfied = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/verify`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token })
      });
      const data = await res.json();
      if (data.is_verified) {
        router.push("/login");
      }
      console.log("res", data);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    getVerfied();
  }, []);
  return <div>
    <button>Verify Email</button>
  </div>
}

export default function VerifyEmailContent() {
  return (
    <Suspense fallback={<div>Loading verification details...</div>}>
      <VerifyEmail />
    </Suspense>
  );
}
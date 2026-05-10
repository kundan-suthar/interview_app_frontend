"use client"

import { apiClient } from "@/lib/api/client";
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
  const isVerified = async () => {
    console.log("hello from verify api")
    try {
      const data = await apiClient<any>("/api/v1/users/is_verified", {
        method: "GET",
      })
      // const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/users/is_verified`, {
      //   method: "GET",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   credentials: "include",
      // });

      console.log(data)
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    const abc = async () => {
      await getVerfied();
      await isVerified()
    }
    abc()
  }, []);
  return <div>
    <button className="p-4 m-4 bg-surface-container-highest text-primary" onClick={() => isVerified()}>Verify Email</button>
  </div>
}

export default function VerifyEmailContent() {
  return (
    <Suspense fallback={<div>Loading verification details...</div>}>
      <VerifyEmail />
    </Suspense>
  );
}
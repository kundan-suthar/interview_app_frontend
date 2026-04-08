"use client"

import { useSearchParams, useRouter } from "next/navigation"
import { useEffect } from "react"


export default function VerifyEmailPage() {
  const searchParams = useSearchParams()
  const router = useRouter();

  const token = searchParams.get("token")
  const getVerfied = async ()=>{
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/verify`,{
        method:"POST",
        headers:{
          "Content-Type":"application/json",
        },
        body:JSON.stringify({token})
      });
      const data = await res.json();
      if(data.is_verified){
        router.push("/login");
      }
      console.log("res",data);
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
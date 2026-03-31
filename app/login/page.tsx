"use client";
import Link from "next/link";
import { Loader, Zap } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import { apiClient } from "@/lib/api/client";
import { authApi } from "@/lib/api/auth";
const schema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

type FormData = z.infer<typeof schema>;

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });
  const onSubmit = async (data: FormData) => {
    setServerError(null);
    const formData = new FormData();
    formData.append("username", data.email);
    formData.append("password", data.password);

    try {
      setLoading(true);
      const res: any = await authApi.login(formData);
      reset();
      return res;
    } catch (error: any) {
      console.log("error", error.message);
      setServerError(error.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="min-dvh-screen flex flex-col items-center justify-center p-4 bg-(--surface) relative isolate">
      {/* Background ambient light */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-(--primary) opacity-[0.03] blur-[100px] -z-10 rounded-full pointer-events-none"></div>

      {/* Header */}
      <div className="flex flex-col items-center mb-8">
        <div className="w-12 h-12 bg-(--surface-container-highest) rounded-xl flex items-center justify-center mb-4">
          <Zap className="text-(--primary)" size={24} />
        </div>
        <h1 className="text-2xl font-display font-extrabold text-(--on-surface) tracking-tight">
          Interview<span className="font-medium">IQ</span>
        </h1>
      </div>

      {/* Login Card */}
      <div className="w-full max-w-[440px] bg-(--surface-container-high) border border-(--outline-variant)/20 rounded-2xl p-8 sm:p-10 shadow-lg relative">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-display font-bold text-(--on-surface) mb-2">
            Ace your next interview
          </h2>
          <p className="text-(--on-surface-variant) text-sm font-body">
            Sign in to resume your AI-powered preparation
          </p>
        </div>

        {serverError && <div className="text-error">{serverError}</div>}
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
          {/* Email */}
          <div className="flex flex-col gap-2">
            <label className="text-[10px] font-bold uppercase tracking-wider text-(--on-surface-variant)">
              Email Address
            </label>
            <input
              type="email"
              {...register("email")}
              placeholder="name@company.com"
              autoComplete="email"
              className="w-full bg-[#040813] border border-(--outline-variant)/30 rounded-lg px-4 py-3 text-(--on-surface) placeholder-(--on-surface-variant)/40 focus:outline-none focus:ring-2 focus:ring-(--primary)/50 focus:border-(--primary) transition-all text-sm"
            />
            {errors.email && (
              <p className="text-error">{errors.email.message}</p>
            )}
          </div>

          {/* Password */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <label className="text-[10px] font-bold uppercase tracking-wider text-(--on-surface-variant)">
                Password
              </label>
              <Link
                href="#"
                className="text-[11px] text-(--primary) hover:underline font-medium"
              >
                Forgot?
              </Link>
            </div>
            <input
              type="password"
              {...register("password")}
              autoComplete="current-password"
              placeholder="••••••••"
              className="w-full bg-[#040813] border border-(--outline-variant)/30 rounded-lg px-4 py-3 text-(--on-surface) placeholder-(--on-surface-variant)/40 focus:outline-none focus:ring-2 focus:ring-(--primary)/50 focus:border-(--primary) transition-all text-sm tracking-widest"
            />
            {errors.password && (
              <p className="text-error">{errors.password.message}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-(--primary) hover:bg-(--primary-container) text-[#000000] font-bold py-3.5 rounded-lg transition-all transform hover:scale-[1.02] shadow-[0_0_20px_rgba(106,242,222,0.3)] mt-2 flex justify-center items-center disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={loading}
          >
            {loading ? <Loader className="animate-spin" /> : "Sign In"}
          </button>
        </form>

        {/* <div className="my-8 flex items-center gap-4">
          <div className="h-[1px] flex-1 bg-(--outline-variant)/20"></div>
          <span className="text-[10px] uppercase font-bold text-(--on-surface-variant) tracking-widest">
            OR
          </span>
          <div className="h-[1px] flex-1 bg-(--outline-variant)/20"></div>
        </div>

        <button className="w-full bg-(--surface-bright) hover:bg-(--outline-variant)/40 border border-(--outline-variant)/30 text-(--on-surface) font-medium py-3.5 rounded-lg transition-all flex items-center justify-center gap-3 text-sm">
          <div className="w-5 h-5 bg-white rounded-sm flex items-center justify-center">
            <svg width="14" height="14" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
          </div>
          Continue with Google
        </button> */}

        <p className="text-center mt-8 text-sm text-(--on-surface-variant)">
          Don't have an account?{" "}
          <Link
            href="/register"
            className="text-(--primary) font-semibold hover:underline"
          >
            Sign Up
          </Link>
        </p>
      </div>

      {/* <div className="mt-8 flex items-center gap-2 bg-(--surface-container-high) border border-(--outline-variant)/20 px-4 py-2 rounded-full shadow-lg">
        <div className="flex -space-x-2">
          <div className="w-5 h-5 rounded-full bg-(--surface-bright) border border-(--surface) flex items-center justify-center text-[8px] text-(--on-surface)"></div>
          <div className="w-5 h-5 rounded-full bg-(--primary-container) border border-(--surface) flex items-center justify-center text-[8px] text-(--on-surface)"></div>
          <div className="w-5 h-5 rounded-full bg-(--primary) border border-(--surface) flex items-center justify-center text-[8px] text-[#000]"></div>
        </div>
        <span className="text-[10px] font-bold tracking-wider text-(--on-surface-variant) uppercase ml-1">
          Joined by 12K+ candidates
        </span>
      </div> */}
    </div>
  );
}

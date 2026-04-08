"use client";

import Link from "next/link";
import { Brain, User, Mail, Lock, ShieldCheck, ArrowRight } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useRouter } from "next/navigation";
const schema = z
  .object({
    email: z.string().email("Invalid email"),
    fullName: z
      .string()
      .min(3, "Min 3 characters")
      .regex(/^[a-zA-Z\s]+$/, "Cannot contain numbers or special characters"),
    password: z
      .string()
      .min(8, "Min 8 characters")
      .regex(/[A-Z]/, "Must contain at least one uppercase letter")
      .regex(/[a-z]/, "Must contain at least one lowercase letter")
      .regex(/[0-9]/, "Must contain at least one number")
      .regex(/[^a-zA-Z0-9]/, "Must contain at least one special character"),
    confirmPassword: z.string().min(8, "Min 8 characters"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
type FormData = z.infer<typeof schema>;

export default function RegisterPage() {
  const [serverError, setServerError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });
  const router = useRouter();
  const onSubmit = async (data: FormData) => {
    setServerError(null);
    const { confirmPassword, ...rest } = data;

    const payload = {
      email: rest.email,
      full_name: rest.fullName, // transform here
      password: rest.password,
    };

    try {
      setLoading(true);

      let res = await fetch("http://127.0.0.1:8000/api/v1/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      if (res.status === 201) {
        reset();
        router.push("/dashboard/profile")
      } else if (res.status === 400) {
        const error = await res.json(); // 👈 await
        setServerError(error.detail);
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-(--surface) relative isolate py-12">
      {/* Background ambient light */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-(--primary) opacity-[0.03] blur-[100px] -z-10 rounded-full pointer-events-none"></div>

      {/* Header */}
      <div className="flex flex-col items-center mb-8">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-10 h-10 bg-(--primary) rounded-xl flex items-center justify-center shadow-[0_0_15px_rgba(106,242,222,0.4)]">
            <Brain className="text-[#000]" size={22} />
          </div>
          <h1 className="text-2xl font-display font-extrabold text-(--on-surface) tracking-tight">
            Interview<span className="font-medium">IQ</span>
          </h1>
        </div>
        <h2 className="text-3xl font-display font-bold text-(--on-surface) mb-2">
          Create your account
        </h2>
        <p className="text-(--on-surface-variant) text-sm font-body cursor-default">
          Join the elite platform for AI-powered interview prep
        </p>
      </div>

      {/* Register Card */}
      <div className="w-full max-w-[440px] bg-(--surface-container-high) border border-(--outline-variant)/20 rounded-2xl p-6 sm:p-8 shadow-xl relative">
        {/*server error response*/}
        {serverError && <div className="text-error">{serverError}</div>}
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
          {/* Full Name */}
          <div className="flex flex-col gap-2">
            <label
              htmlFor="fullName"
              className="text-[10px] font-bold uppercase tracking-wider text-(--on-surface-variant)"
            >
              Full Name
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-(--on-surface-variant)">
                <User size={16} />
              </div>
              <input
                {...register("fullName")}
                type="text"
                id="fullName"
                placeholder="Alex Johnson"
                className="w-full bg-[#040813] border border-(--outline-variant)/30 rounded-lg pl-11 pr-4 py-3 text-(--on-surface) placeholder-(--on-surface-variant)/40 focus:outline-none focus:ring-2 focus:ring-(--primary)/50 focus:border-(--primary) transition-all text-sm"
              />
            </div>
            {errors.fullName && (
              <p className="text-error">{errors.fullName.message}</p>
            )}
          </div>

          {/* Email */}
          <div className="flex flex-col gap-2">
            <label
              htmlFor="email"
              className="text-[10px] font-bold uppercase tracking-wider text-(--on-surface-variant)"
            >
              Email Address
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-(--on-surface-variant)">
                <Mail size={16} />
              </div>
              <input
                {...register("email")}
                type="email"
                id="email"
                placeholder="name@example.com"
                autoComplete="email"
                className="w-full bg-[#040813] border border-(--outline-variant)/30 rounded-lg pl-11 pr-4 py-3 text-(--on-surface) placeholder-(--on-surface-variant)/40 focus:outline-none focus:ring-2 focus:ring-(--primary)/50 focus:border-(--primary) transition-all text-sm"
              />
            </div>
            {errors.email && (
              <p className="text-error">{errors.email.message}</p>
            )}
          </div>

          {/* Password */}
          <div className="flex flex-col gap-2">
            <label
              htmlFor="password"
              className="text-[10px] font-bold uppercase tracking-wider text-(--on-surface-variant)"
            >
              Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-(--on-surface-variant)">
                <Lock size={16} />
              </div>
              <input
                {...register("password")}
                type="password"
                id="password"
                placeholder="••••••••"
                autoComplete="new-password"
                className="w-full bg-[#040813] border border-(--outline-variant)/30 rounded-lg pl-11 pr-4 py-3 text-(--on-surface) placeholder-(--on-surface-variant)/40 focus:outline-none focus:ring-2 focus:ring-(--primary)/50 focus:border-(--primary) transition-all text-sm tracking-widest"
              />
            </div>
            {errors.password && (
              <p className="text-error">{errors.password.message}</p>
            )}
          </div>

          {/* Confirm Password */}
          <div className="flex flex-col gap-2">
            <label
              htmlFor="confirmPassword"
              className="text-[10px] font-bold uppercase tracking-wider text-(--on-surface-variant)"
            >
              Confirm Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-(--on-surface-variant)">
                <ShieldCheck size={16} />
              </div>
              <input
                {...register("confirmPassword")}
                type="password"
                id="confirmPassword"
                autoComplete="new-password"
                placeholder="••••••••"
                className="w-full bg-[#040813] border border-(--outline-variant)/30 rounded-lg pl-11 pr-4 py-3 text-(--on-surface) placeholder-(--on-surface-variant)/40 focus:outline-none focus:ring-2 focus:ring-(--primary)/50 focus:border-(--primary) transition-all text-sm tracking-widest"
              />
            </div>
            {errors.confirmPassword && (
              <p className="text-error">{errors.confirmPassword.message}</p>
            )}
          </div>

          {/* Checkbox */}
          {/* <div className="flex items-start gap-3 mt-1">
            <div className="flex items-center h-5">
              <input
                id="terms"
                type="checkbox"
                className="w-4 h-4 bg-[#030712] border border-(--outline-variant)/40 rounded appearance-none checked:bg-(--primary) checked:border-(--primary) flex items-center justify-center relative cursor-pointer
                after:content-[''] after:absolute after:hidden checked:after:block after:w-1.5 after:h-2.5 after:border-r-2 after:border-b-2 after:border-[#000] after:rotate-45 after:-translate-y-[1px]"
              />
            </div>
            <label
              htmlFor="terms"
              className="text-[11px] text-(--on-surface-variant) leading-tight cursor-pointer"
            >
              I agree to the{" "}
              <Link href="#" className="text-(--primary) hover:underline">
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link href="#" className="text-(--primary) hover:underline">
                Privacy Policy
              </Link>
              .
            </label>
          </div> */}

          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-(--primary) hover:bg-(--primary-container) text-[#000000] font-bold py-3.5 rounded-lg transition-all transform hover:scale-[1.02] shadow-[0_0_20px_rgba(106,242,222,0.3)] mt-2 flex justify-center items-center gap-2 group  ${loading ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
          >
            {loading ? "Creating Account..." : "Create Account"}
            <ArrowRight
              size={18}
              className="group-hover:translate-x-1 transition-transform"
            />
          </button>
        </form>

        {/* <div className="my-6 flex items-center gap-4">
          <div className="h-[1px] flex-1 bg-(--outline-variant)/20"></div>
          <span className="text-[10px] uppercase font-bold text-(--on-surface-variant) tracking-widest">
            OR JOIN WITH
          </span>
          <div className="h-[1px] flex-1 bg-(--outline-variant)/20"></div>
        </div>

        <button className="w-full bg-(--surface-bright) hover:bg-(--outline-variant)/40 border border-(--outline-variant)/30 text-(--on-surface) font-medium py-3.5 rounded-lg transition-all flex items-center justify-center gap-3 text-sm">
          <div className="w-5 h-5 bg-white rounded-sm flex items-center justify-center">
            <svg width="14" height="14" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
            </svg>
          </div>
          Continue with Google
        </button> */}
      </div>

      <div className="mt-8 flex flex-col items-center gap-3">
        <p className="text-sm text-(--on-surface-variant)">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-(--primary) font-semibold hover:underline"
          >
            Sign In
          </Link>
        </p>

        {/* <div className="flex items-center gap-2 bg-[#050b14]/80 border border-(--primary)/10 px-4 py-2 rounded-full shadow-lg">
          <Shield className="text-(--primary)" size={12} />
          <span className="text-[10px] font-bold tracking-wider text-(--on-surface-variant) uppercase">
            Enterprise-grade security
          </span>
        </div> */}
      </div>
    </div>
  );
}

"use client"
import { apiClient } from "@/lib/api/client"
import { MailCheck, Zap } from "lucide-react"
import { useRouter } from "next/navigation"
import { useEffect } from "react"


const page = () => {
    const router = useRouter()

    const isVerified = async () => {
        debugger
        console.log("hello from verify api")
        try {
            const data = await apiClient<any>("/api/v1/users/is_verified", {
                method: "GET",
            })
            if (data.is_verified === true) {
                router.push("/dashboard/profile")
            }
        } catch (error) {
            console.log(error);
        }
    }
    // useEffect(() => {
    //     isVerified()
    // }, []);

    return (
        <div
            className="dot-grid min-h-screen flex flex-col items-center justify-center px-4 bg-surface"
        >
            <div
                className="pointer-events-none fixed inset-0 z-0"
                style={{
                    background:
                        "radial-gradient(ellipse 60% 40% at 50% 30%, rgba(106,242,222,0.05) 0%, transparent 70%)",
                }}
            />


            <div className="relative z-10 flex flex-col items-center gap-10">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-(--primary)/10 rounded-lg flex items-center justify-center">
                        <Zap
                            className="text-(--primary)"
                            size={18}
                            fill="currentColor"
                            fillOpacity={0.2}
                        />
                    </div>
                    <span className="font-display font-bold text-xl tracking-tight text-(--on-surface)">
                        Interview<span className="text-(--primary)">IQ</span>
                    </span>
                </div>


                <div
                    className="glass-panel ambient-glow relative w-full max-w-sm rounded-2xl border px-8 py-10 flex flex-col items-center gap-6 transition-shadow duration-500 border-outline-variant bg-surface-container"
                >

                    <div
                        className="w-38 h-38 rounded-full flex items-center justify-center bg-surface-container-high"
                    >
                        <div
                            className="w-28 h-28 rounded-full flex items-center justify-center bg-surface-bright"
                        >
                            <MailCheck
                                className="text-(--primary)"
                                size={38}
                                fillOpacity={0.2}
                            />
                        </div>
                    </div>

                    <div className="flex flex-col items-center gap-3 text-center">
                        <h1
                            className="text-xl font-semibold font-display text-on-surface"
                        >
                            Verify your email
                        </h1>
                        <p
                            className="text-sm leading-relaxed text-on-surface-variant max-w-2xl"
                        >
                            We&rsquo;ve sent a verification link to{" "}
                            <span
                                className="font-medium text-on-surface"
                            >
                            </span>
                            . Please click the link in the email to activate your account.
                        </p>
                    </div>

                    <button
                        className="bg-primary-gradient w-full py-3 rounded-xl text-sm font-semibold tracking-wide transition-opacity duration-200 hover:opacity-90 active:opacity-75 text-surface cursor-pointer"
                        onClick={() => window.open("mailto:", "_blank")}
                    >
                        Open Email App
                    </button>

                    {/* Resend */}
                    {/* <p className="text-sm" style={{ color: "var(--on-surface-variant)" }}>
                        Didn&rsquo;t receive the email?{" "}
                        <button
                            // onClick={handleResend}
                            className="font-medium transition-colors duration-200"
                            style={{
                                color: resent ? "var(--primary-container)" : "var(--primary)",
                                background: "none",
                                border: "none",
                                cursor: "pointer",
                                padding: 0,
                            }}
                        >
                            {resent ? "Link sent!" : "Resend link"}
                        </button>
                    </p> */}
                </div>

            </div>
        </div>
    )
}

export default page
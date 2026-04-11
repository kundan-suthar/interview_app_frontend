"use client";

import { useRouter, usePathname } from "next/navigation";
import Sidebar from "./components/Sidebar";
import { Bell, HelpCircle, Plus } from "lucide-react";
import { apiClient } from "@/lib/api/client";
import { useEffect, useState } from "react";
import { User, UserSchema } from "./profile/types";



export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const path = usePathname()
  const [userDetails, setUserDetails] = useState<User>({full_name:"", email:""});
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const getUserDetails = async () => {
    try {
      const res = await apiClient<User>("/api/v1/users/me");
      //  const parsed = UserSchema.safeParse(res);
      //   if (!parsed.success) {
      //   console.error("Validation error:", parsed.error);
      //   return;
      // }
      res && setUserDetails(res)
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserDetails();
  }, [path]);

  return (
    <div className="flex h-screen bg-(--surface) text-(--on-surface) dot-grid overflow-hidden">
      {/* Sidebar */}
      <Sidebar 
        userDetails={userDetails} 
        isOpen={isSidebarOpen} 
        onClose={() => setIsSidebarOpen(false)} 
      />

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col h-full overflow-hidden relative">
        {/* Top Content Header */}
        <header className="sticky top-0 z-40 bg-(--surface)/80 backdrop-blur-md px-4 sm:px-6 lg:px-10 py-4 lg:py-6 flex items-center justify-between border-b border-(--outline-variant)/5">
          <div className="flex items-center gap-4">
            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="lg:hidden p-2 text-(--on-surface-variant) hover:text-(--on-surface) hover:bg-(--surface-container-high) rounded-xl transition-colors"
            >
              <Bell size={20} className="hidden" /> {/* Placeholder to show we have icons */}
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="24" 
                height="24" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <line x1="4" x2="20" y1="12" y2="12" />
                <line x1="4" x2="20" y1="6" y2="6" />
                <line x1="4" x2="20" y1="18" y2="18" />
              </svg>
            </button>

            <div className="flex flex-col">
              <h1 className="text-lg lg:text-2xl font-display font-medium text-(--on-surface) truncate">
                <span className="hidden sm:inline">Welcome back, </span>
                <span className="font-bold"> {userDetails?.full_name} 👋</span>
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-6">
            <div className="hidden lg:block h-8 w-px bg-(--outline-variant)/20 mx-2"></div>

            <div className="flex items-center">
              <button
                onClick={() => {
                  router.push("/dashboard/analyze");
                }}
                className="bg-primary-gradient text-(--surface) font-bold px-4 lg:px-6 py-2 lg:py-2.5 rounded-xl flex items-center gap-2 hover:opacity-90 transition-all shadow-lg shadow-(--primary)/10 text-sm lg:text-base"
              >
                <Plus size={18} strokeWidth={3} />
                <span className="hidden sm:inline">New Interview</span>
                <span className="sm:hidden">New</span>
              </button>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="flex-1 overflow-y-auto w-full">
          <div className="p-4 sm:p-6 lg:p-10 container mx-auto">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}

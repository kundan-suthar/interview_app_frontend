"use client";

import { useRouter } from "next/navigation";
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
  const [userDetails, setUserDetails] = useState<User>({full_name:"", email:""});
  const getUserDetails = async () => {
    try {
      const res = await apiClient("/api/v1/users/me");
       const parsed = UserSchema.safeParse(res);
        if (!parsed.success) {
        console.error("Validation error:", parsed.error);
        return;
      }
      res && setUserDetails(parsed.data)
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getUserDetails();
  }, []);
  return (
    <div className="flex h-screen bg-(--surface) text-(--on-surface) dot-grid overflow-hidden">
      {/* Sidebar - Desktop Only for now */}
      <Sidebar userDetails={userDetails} />

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col h-full overflow-y-auto">
        {/* Top Content Header - Moves here from the old layout header */}
        <header className="sticky top-0 z-40 bg-(--surface)/80 backdrop-blur-sm px-10 py-6 flex items-center justify-between border-b border-(--outline-variant)/5">
          <div className="flex flex-col">
            <h1 className="text-2xl font-display font-medium text-(--on-surface)">
              Welcome back, <span className="font-bold"> {userDetails?.full_name} 👋</span>
            </h1>
          </div>

          <div className="flex items-center gap-6">
            {/* <div className="flex items-center gap-4 text-(--on-surface-variant)">
               <button className="p-2.5 rounded-xl hover:bg-(--surface-container-high) transition-colors relative">
                 <Bell size={20} />
                 <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-(--primary) rounded-full border-2 border-(--surface)"></span>
               </button>
               <button className="p-2.5 rounded-xl hover:bg-(--surface-container-high) transition-colors">
                 <HelpCircle size={20} />
               </button>
            </div> */}

            <div className="h-8 w-px bg-(--outline-variant)/20 mx-2"></div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => {
                  router.push("/dashboard/analyze");
                }}
                className="bg-primary-gradient text-(--surface) font-bold px-6 py-2.5 rounded-xl flex items-center gap-2 hover:opacity-90 transition-all shadow-lg shadow-(--primary)/10"
              >
                <Plus size={18} strokeWidth={3} />
                <span>New Interview</span>
              </button>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="p-10 container mx-auto">{children}</div>
      </main>
    </div>
  );
}

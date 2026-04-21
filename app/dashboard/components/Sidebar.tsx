"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { LayoutDashboard, Mic, User, Settings, Zap, Play, LogOut, Mail, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { User as userType } from "../profile/types";
import { useAppStore } from "@/store/useAppStore";
import { apiClient } from "@/lib/api/client";
import { authApi } from "@/lib/api/auth";

const navItems = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  // { name: "My Interviews", href: "/dashboard/interviews", icon: Mic },
  { name: "Profile", href: "/dashboard/profile", icon: User },
  // { name: "Settings", href: "/dashboard/settings", icon: Settings },
];
type SidebarProps = {
  userDetails: userType;
  isOpen?: boolean;
  onClose?: () => void;
};
export default function Sidebar({ userDetails, isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const logout = useAppStore((state) => state.clear);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  // Close modal when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        setShowProfileModal(false);
      }
    }
    if (showProfileModal) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showProfileModal]);

  const handleLogout = async () => {
    try {
      const res = await authApi.logout();
      console.log(res);
    } catch (error) {
      console.log(error);
    }
    logout();
    router.push("/login");
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] lg:hidden"
          onClick={onClose}
        />
      )}

      <aside className={cn(
        "fixed inset-y-0 left-0 w-72 lg:static lg:w-64 h-full flex flex-col bg-(--surface-container-low) border-r border-(--outline-variant)/10 p-6 z-[70] overflow-y-auto shrink-0 transition-all duration-300 transform",
        isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
      )}>
        {/* Logo & Close Button */}
        <div className="flex items-center justify-between mb-10">
          <div className="flex flex-col">
            <Link href="/dashboard" className="flex items-center gap-3">
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
            </Link>
            <span className="text-[10px] uppercase tracking-[0.2em] text-(--on-surface-variant) mt-1 ml-11 font-medium">
              The Digital Mentor
            </span>
          </div>

          <button
            onClick={onClose}
            className="lg:hidden p-2 text-(--on-surface-variant) hover:text-(--on-surface) hover:bg-(--surface-container-high) rounded-xl transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-2">
          {navItems.map((item) => {
            const isActive =
              pathname === item.href ||
              (item.href !== "/dashboard" && pathname.startsWith(item.href));
            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => onClose?.()}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group",
                  isActive
                    ? "bg-(--primary)/10 text-(--primary)"
                    : "text-(--on-surface-variant) hover:text-(--on-surface) hover:bg-(--surface-container-high)",
                )}
              >
                <item.icon
                  size={20}
                  className={cn(
                    isActive
                      ? "text-(--primary)"
                      : "text-(--on-surface-variant) group-hover:text-(--on-surface)",
                  )}
                />
                <span className="font-medium">{item.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* Bottom Section */}
        <div className="mt-auto relative">
          {/* Profile Modal */}
          {showProfileModal && (
            <div
              ref={modalRef}
              className="absolute bottom-full left-0 w-full mb-2 p-2 bg-(--surface-container-high)/90 backdrop-blur-xl border border-(--outline-variant)/20 rounded-2xl shadow-2xl animate-in fade-in slide-in-from-bottom-2 duration-200 z-[60]"
            >
              <div className="p-3">
                <div className="flex items-center gap-2 text-(--on-surface-variant) mb-4 px-1">
                  <Mail size={14} className="shrink-0" />
                  <span className="text-xs truncate font-medium">
                    {userDetails.email}
                  </span>
                </div>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-red-400 hover:bg-red-400/10 hover:text-red-300 transition-all duration-200 group"
                >
                  <div className="w-8 h-8 rounded-lg bg-red-400/10 flex items-center justify-center group-hover:bg-red-400/20 transition-colors">
                    <LogOut size={16} />
                  </div>
                  <span className="font-semibold text-sm">Log out</span>
                </button>
              </div>
            </div>
          )}

          {/* User Profile Trigger */}
          <div
            onClick={() => setShowProfileModal(!showProfileModal)}
            className={cn(
              "flex items-center gap-3 px-3 py-3 rounded-2xl cursor-pointer transition-all duration-200 border border-transparent",
              showProfileModal
                ? "bg-(--surface-container-highest) border-(--outline-variant)/30 ring-1 ring-(--primary)/20 shadow-lg"
                : "hover:bg-(--surface-container-high) hover:border-(--outline-variant)/10"
            )}
          >
            <div className="w-10 h-10 rounded-full bg-linear-to-tr from-orange-400 to-pink-500 p-0.5 overflow-hidden shadow-md">
              <div className="w-full h-full rounded-full overflow-hidden border-2 border-(--surface-container-low)">
                <img
                  src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${userDetails.full_name}`}
                  alt="Avatar"
                  className="w-full h-full object-cover bg-(--surface-container-highest)"
                />
              </div>
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-sm font-bold text-(--on-surface) truncate">
                {userDetails.full_name}
              </span>
              <span className="text-[10px] text-(--on-surface-variant) font-medium uppercase tracking-wider">
                Free Plan
              </span>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}

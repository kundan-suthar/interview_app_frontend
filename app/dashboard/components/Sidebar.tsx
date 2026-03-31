"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Mic, User, Settings, Zap, Play } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  // { name: "My Interviews", href: "/dashboard/interviews", icon: Mic },
  { name: "Profile", href: "/dashboard/profile", icon: User },
  // { name: "Settings", href: "/dashboard/settings", icon: Settings },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 h-full flex flex-col bg-(--surface-container-low) border-r border-(--outline-variant)/10 p-6 z-50 overflow-y-auto shrink-0 transition-all duration-300">
      {/* Logo */}
      <div className="flex flex-col mb-10">
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
      <div className="mt-auto space-y-6">
        {/* Start Simulation Button */}
        {/* <button className="w-full bg-primary-gradient hover:opacity-90 text-(--surface) font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-(--primary)/10">
          <Play size={18} fill="currentColor" />
          <span>Start Simulation</span>
        </button> */}

        {/* User Profile */}
        <div className="flex items-center gap-3 px-2">
          <div className="w-10 h-10 rounded-full bg-linear-to-tr from-orange-400 to-pink-500 overflow-hidden border-2 border-(--outline-variant)/20">
            <img
              src="https://api.dicebear.com/7.x/avataaars/svg?seed=Alex"
              alt="Avatar"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-semibold text-(--on-surface)">
              Alex Henderson
            </span>
          </div>
        </div>
      </div>
    </aside>
  );
}

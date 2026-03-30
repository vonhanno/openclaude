"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Sparkles,
  Activity,
  Settings,
  HelpCircle,
  Menu,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";

const NAV_ITEMS = [
  {
    label: "Home",
    icon: LayoutDashboard,
    href: "/agent",
  },
  {
    label: "Skills",
    icon: Sparkles,
    href: "/agent#skills",
  },
  {
    label: "Activity",
    icon: Activity,
    href: "/agent/activity",
  },
  {
    label: "Settings",
    icon: Settings,
    href: "/agent/settings",
  },
  {
    label: "Help",
    icon: HelpCircle,
    href: "/help",
  },
];

function isActive(pathname: string, href: string): boolean {
  if (href === "/agent") return pathname === "/agent";
  if (href === "/agent#skills") return false;
  return pathname.startsWith(href);
}

function NavContent({ pathname }: { pathname: string }) {
  return (
    <div className="flex h-full flex-col">
      {/* Logo */}
      <div className="px-4 py-6">
        <Link href="/agent" className="block">
          <span className="font-pixel text-[10px] leading-tight text-[#1A1A1A]">
            OpenClaude
          </span>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 px-3">
        {NAV_ITEMS.map((item) => {
          const active = isActive(pathname, item.href);
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                active
                  ? "bg-[#4A7DFF] text-white"
                  : "text-[#6B7280] hover:bg-[#E5E7EB]/60 hover:text-[#1A1A1A]"
              )}
            >
              <Icon size={18} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* User avatar placeholder */}
      <div className="border-t border-[#E5E7EB] p-4">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#4A7DFF]/10 text-[#4A7DFF]">
            <span className="text-xs font-semibold">U</span>
          </div>
          <span className="text-sm text-muted-foreground">User</span>
        </div>
      </div>
    </div>
  );
}

export default function Sidebar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden md:flex md:w-[240px] md:flex-col md:fixed md:inset-y-0 bg-[#F0EDE8] border-r border-[#E5E7EB]">
        <NavContent pathname={pathname} />
      </aside>

      {/* Mobile hamburger */}
      <div className="fixed top-0 left-0 right-0 z-40 flex items-center bg-[#F0EDE8] border-b border-[#E5E7EB] px-4 py-3 md:hidden">
        <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="h-9 w-9">
              <Menu size={20} />
              <span className="sr-only">Open menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[240px] bg-[#F0EDE8] p-0">
            <SheetTitle className="sr-only">Navigation</SheetTitle>
            <NavContent pathname={pathname} />
          </SheetContent>
        </Sheet>
        <span className="ml-3 font-pixel text-[10px] text-[#1A1A1A]">
          OpenClaude
        </span>
      </div>
    </>
  );
}

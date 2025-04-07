// components/Sidebar.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
// import { ScrollArea } from "@/components/ui/scroll-area";
import { Home, Settings, Users } from "lucide-react";

const navItems = [
  {
    section: "Main",
    items: [
      { label: "Home", href: "/", icon: Home },
      { label: "Users", href: "/users", icon: Users },
      { label: "Settings", href: "/settings", icon: Settings },
    ],
  },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 border-r bg-background">
      <div className="p-6 text-lg font-semibold"></div>

      <div className="h-[calc(100vh-4rem)] px-4 pb-6">
        <nav className="flex flex-col gap-6">
          {navItems.map((section) => (
            <div key={section.section}>
              <h4 className="mb-2 px-2 text-sm font-medium text-muted-foreground">
                {section.section}
              </h4>
              <div className="flex flex-col gap-1">
                {section.items.map((item) => {
                  const isActive = pathname === item.href;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={cn(
                        "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-all hover:bg-muted",
                        isActive
                          ? "bg-muted font-medium"
                          : "text-muted-foreground"
                      )}
                    >
                      <item.icon className="h-4 w-4" />
                      <span>{item.label}</span>
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>
      </div>
    </aside>
  );
}

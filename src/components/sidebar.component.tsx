"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Home, Settings, Users, Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

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

  const NavLinks = () => (
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
                    isActive ? "bg-muted font-medium" : "text-muted-foreground"
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
  );

  return (
    <>
      <div className="md:hidden fixed top-4 left-4 z-50">
        <Sheet>
          <SheetTrigger asChild>
            <Button size="lg" className="ml-12" >
              <Menu className="h-5 w-5 " />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-64 p-0 text-secondary">
            <div className="h-full bg-primary pt-10">
              <div className="h-[calc(100vh-4rem)] px-4 pb-6">{NavLinks()}</div>
            </div>
          </SheetContent>
        </Sheet>
      </div>

      <aside className="hidden md:fixed md:left-0 md:top-0 md:h-screen md:w-64 md:border-r md:bg-primary md:block">
        <div className="p-6 text-lg font-semibold">Menu</div>
        <div className="h-[calc(100vh-4rem)] px-4 pb-6">{NavLinks()}</div>
      </aside>
    </>
  );
}

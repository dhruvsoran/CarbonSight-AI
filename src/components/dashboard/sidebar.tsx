"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
} from "@/components/ui/sidebar";
import { NAV_ITEMS } from "@/lib/constants";
import { Logo } from "../logo";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";
import { LogOut, Settings } from "lucide-react";

export default function DashboardSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <Logo />
      </SidebarHeader>
      <Separator />
      <SidebarContent>
        <SidebarMenu>
          {NAV_ITEMS.map((item) => (
            <SidebarMenuItem key={item.href}>
              <Link href={item.href}>
                <SidebarMenuButton
                  isActive={pathname === item.href}
                  tooltip={{ children: item.title }}
                  className="group-data-[collapsible=icon]:justify-center"
                >
                  <item.icon />
                  <span className="group-data-[collapsible=icon]:hidden">
                    {item.title}
                  </span>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <Separator />
      <SidebarFooter className="group-data-[collapsible=icon]:p-0 group-data-[collapsible=icon]:py-2">
        <SidebarMenu>
            <SidebarMenuItem>
                 <Link href="#">
                    <SidebarMenuButton tooltip={{ children: "Settings" }} className="group-data-[collapsible=icon]:justify-center">
                        <Settings />
                        <span className="group-data-[collapsible=icon]:hidden">Settings</span>
                    </SidebarMenuButton>
                 </Link>
            </SidebarMenuItem>
            <SidebarMenuItem>
                 <Link href="/login">
                    <SidebarMenuButton tooltip={{ children: "Logout" }} className="group-data-[collapsible=icon]:justify-center">
                        <LogOut />
                        <span className="group-data-[collapsible=icon]:hidden">Logout</span>
                    </SidebarMenuButton>
                 </Link>
            </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}

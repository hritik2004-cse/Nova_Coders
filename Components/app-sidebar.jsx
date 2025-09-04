"use client"

import * as React from "react"
import {
  SquareTerminal,
  Bot,
  PieChart,
  Settings2,
  Users,
} from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarRail,
} from "@/Components/ui/sidebar"

export function AppSidebar({ ...props }) {
  const navItems = [
    {
      title: "Dashboard",
      url: "/admin/dashboard",
      icon: SquareTerminal,
    },
    {
      title: "Users",
      url: "/admin/users",
      icon: Users,
    },
    {
      title: "Analytics",
      url: "/admin/analytics",
      icon: PieChart,
    },
    {
      title: "Settings",
      url: "/admin/settings",
      icon: Settings2,
    },
  ]

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <div className="p-4 font-bold text-lg">Admin Panel</div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {navItems.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton asChild>
                <a href={item.url}>
                  <item.icon />
                  <span>{item.title}</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter>
        <div className="p-4 text-sm text-muted-foreground">
          Admin User
        </div>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}

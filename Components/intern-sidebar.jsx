"use client"

import * as React from "react"
import {
  SquareTerminal,
  BookOpen,
  Calendar,
  CheckSquare,
  BarChart3,
  User,
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

export function InternSidebar({ ...props }) {
  const navItems = [
    {
      title: "Dashboard",
      url: "/intern/dashboard",
      icon: SquareTerminal,
    },
    {
      title: "Tasks",
      url: "/intern/tasks",
      icon: CheckSquare,
    },
    {
      title: "Progress",
      url: "/intern/progress",
      icon: BarChart3,
    },
    {
      title: "Learning",
      url: "/intern/learning",
      icon: BookOpen,
    },
    {
      title: "Calendar",
      url: "/intern/calendar", 
      icon: Calendar,
    },
  ]

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <div className="p-4 font-bold text-lg">Intern Portal</div>
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
          Intern User
        </div>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
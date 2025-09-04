"use client"

import { useAuth } from "@/lib/auth-context"
import { PermissionGate } from "@/Components/ProtectedRoute"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/Components/ui/card"
import { Badge } from "@/Components/ui/badge"
import { Button } from "@/Components/ui/button"
import { 
  UsersIcon, 
  ShieldIcon, 
  BarChartIcon, 
  FileTextIcon,
  CalendarIcon,
  MailIcon,
  FolderIcon,
  SettingsIcon
} from "lucide-react"
import Link from "next/link"

export default function AdminDashboard() {
  const { user, hasPermission } = useAuth()

  const dashboardCards = [
    {
      title: "User Management",
      description: "Manage users, roles, and permissions",
      icon: UsersIcon,
      href: "/admin/users",
      permission: "canManageUsers",
      count: "156 Users"
    },
    {
      title: "Role Management",
      description: "Configure roles and permissions",
      icon: ShieldIcon,
      href: "/admin/roles",
      role: "admin",
      count: "6 Roles"
    },
    {
      title: "Analytics",
      description: "View site analytics and reports",
      icon: BarChartIcon,
      href: "/admin/analytics",
      permission: "canViewAnalytics",
      count: "12.5K Views"
    },
    {
      title: "Content Management",
      description: "Manage website content and pages",
      icon: FileTextIcon,
      href: "/admin/content",
      permission: "canManageContent",
      count: "48 Articles"
    },
    {
      title: "Events",
      description: "Manage events and activities",
      icon: CalendarIcon,
      href: "/admin/events",
      permission: "canManageEvents",
      count: "8 Upcoming"
    },
    {
      title: "Newsletter",
      description: "Manage newsletter campaigns",
      icon: MailIcon,
      href: "/admin/newsletter",
      permission: "canManageNewsletter",
      count: "2.1K Subscribers"
    },
    {
      title: "Projects",
      description: "Manage client projects",
      icon: FolderIcon,
      href: "/admin/projects",
      permission: "canManageProjects",
      count: "23 Active"
    },
    {
      title: "Settings",
      description: "System configuration",
      icon: SettingsIcon,
      href: "/admin/settings",
      permission: "canManageSettings",
      count: "All Systems"
    }
  ]

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Welcome Section */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">
          Welcome back, {user?.fullName || 'Admin'}!
        </h1>
        <p className="text-muted-foreground">
          Here&apos;s what&apos;s happening with your platform today.
        </p>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="capitalize">
            {user?.role?.replace('_', ' ')}
          </Badge>
          <Badge variant="secondary">
            {user?.department || 'Administration'}
          </Badge>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <UsersIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">156</div>
            <p className="text-xs text-muted-foreground">
              +12% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Sessions</CardTitle>
            <BarChartIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">23</div>
            <p className="text-xs text-muted-foreground">
              +5% from last hour
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Projects</CardTitle>
            <FolderIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">47</div>
            <p className="text-xs text-muted-foreground">
              +8 new this month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">System Health</CardTitle>
            <SettingsIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">99.9%</div>
            <p className="text-xs text-muted-foreground">
              All systems operational
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Management Cards */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">Management Tools</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {dashboardCards.map((card) => (
            <PermissionGate 
              key={card.title}
              permission={card.permission}
              role={card.role}
            >
              <Card className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <card.icon className="h-6 w-6 text-primary" />
                    <Badge variant="secondary" className="text-xs">
                      {card.count}
                    </Badge>
                  </div>
                  <CardTitle className="text-lg">{card.title}</CardTitle>
                  <CardDescription className="text-sm">
                    {card.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <Button asChild className="w-full">
                    <Link href={card.href}>
                      Manage
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </PermissionGate>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>Latest actions performed on the platform</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b pb-2">
              <div>
                <p className="font-medium">New user registration</p>
                <p className="text-sm text-muted-foreground">john.doe@example.com joined as Member</p>
              </div>
              <p className="text-sm text-muted-foreground">2 min ago</p>
            </div>
            <div className="flex items-center justify-between border-b pb-2">
              <div>
                <p className="font-medium">Project status updated</p>
                <p className="text-sm text-muted-foreground">Nova Website project marked as completed</p>
              </div>
              <p className="text-sm text-muted-foreground">1 hour ago</p>
            </div>
            <div className="flex items-center justify-between border-b pb-2">
              <div>
                <p className="font-medium">Newsletter sent</p>
                <p className="text-sm text-muted-foreground">Monthly update sent to 2,140 subscribers</p>
              </div>
              <p className="text-sm text-muted-foreground">3 hours ago</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

"use client"

// Force dynamic rendering for all admin pages
export const dynamic = 'force-dynamic';

import { AuthProvider } from "@/lib/auth-context"
import { AdminSidebar } from "@/Components/AdminSidebar"
import { SidebarProvider, SidebarTrigger } from "@/Components/ui/sidebar"
import { Separator } from "@/Components/ui/separator"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/Components/ui/breadcrumb"
import { ProtectedRoute } from "@/Components/ProtectedRoute"

export default function AdminLayout({ children }) {
  return (
    <AuthProvider>
      <ProtectedRoute requiredRole="admin" fallbackUrl="/admin/login">
        <SidebarProvider>
          <AdminSidebar />
          <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
            <div className="flex items-center">
              <SidebarTrigger className="-ml-1" />
              <Separator orientation="vertical" className="mr-2 h-4" />
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem className="hidden md:block">
                    <BreadcrumbLink href="/admin">
                      Admin
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator className="hidden md:block" />
                  <BreadcrumbItem>
                    <BreadcrumbPage>Dashboard</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>
            <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm">
              {children}
            </div>
          </main>
        </SidebarProvider>
      </ProtectedRoute>
    </AuthProvider>
  )
}

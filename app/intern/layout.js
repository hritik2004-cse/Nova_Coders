"use client"

// Force dynamic rendering for all intern pages
export const dynamic = 'force-dynamic';

import { InternSidebar } from '@/Components/intern-sidebar'
import { SidebarProvider } from '@/Components/ui/sidebar'

export default function InternLayout({ children }) {
  return (
    <SidebarProvider>
      <InternSidebar />
      {children}
    </SidebarProvider>
  )
}

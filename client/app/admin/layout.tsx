/**
 * Admin Layout
 * 
 * Main layout for admin dashboard
 * Includes sidebar navigation and header
 */

'use client';

import { useRequireAuth } from '@/hooks/use-auth';
import { AdminSidebar } from '@/components/admin/sidebar';
import { AdminHeader } from '@/components/admin/admin-header';
import { Loading } from '@/components/loading';

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const { user, isLoading } = useRequireAuth();

  if (isLoading) {
    return <Loading />;
  }

  if (!user) {
    return null; // Will redirect to login via useRequireAuth
  }

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <aside className="hidden md:block w-64 flex-shrink-0">
        <AdminSidebar />
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <AdminHeader />
        
        {/* Page Content */}
        <main className="flex-1 overflow-y-auto bg-muted/30">
          <div className="container mx-auto p-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}


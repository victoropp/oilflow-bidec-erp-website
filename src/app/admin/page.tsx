import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export default async function AdminPortalPage() {
  const session = await getServerSession(authOptions);
  
  // If not logged in, redirect to login
  if (!session?.user) {
    redirect('/admin/login');
  }
  
  // If logged in, redirect to dashboard
  redirect('/admin/dashboard');
}
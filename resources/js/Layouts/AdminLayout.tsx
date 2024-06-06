import React from 'react';
import AdminNavbar from '@/Pages/Admin/Navbar';
import { PageProps, User } from '@/types';

// Define the expected structure of the auth prop
interface AuthData {
  user: User; // Assuming User is the type of the user property
}

// Define the props interface for the AdminLayout component
interface AdminLayoutProps {
  auth: AuthData; // Ensure that the auth prop has the correct structure
  children: React.ReactNode;
}

// Define the AdminLayout component
export default function AdminLayout({ auth, children }: AdminLayoutProps) {
  return (
    <div className='fixed flex gap-6 px-3 py-5 w-screen h-screen min-h-screen max-h-screen bg-gray-100 overflow-hidden'>
      <AdminNavbar auth={auth} />
      {children}
    </div>
  );
}

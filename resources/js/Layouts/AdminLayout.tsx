import React from 'react';
import AdminNavbar from '@/Pages/Admin/Navbar';
import {  User } from '@/types';


interface AuthData {
  user: User;
}


interface AdminLayoutProps {
  auth: AuthData;
  children: React.ReactNode;
}


export default function AdminLayout({ auth, children }: AdminLayoutProps) {
  return (
    <div className='fixed flex gap-6 px-3 py-5 w-screen h-screen min-h-screen max-h-screen bg-gray-100 overflow-hidden'>
      <AdminNavbar auth={auth} />
      {children}
    </div>
  );
}

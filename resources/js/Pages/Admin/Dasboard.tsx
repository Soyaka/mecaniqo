import { PageProps } from '@/types'
import React from 'react'
import AdminNavbar from './Navbar'
import DashboradCard from '@/Components/DashboradCard'
import AdminMainDash from './MainDash'

export default function AdminDasboard( { auth }: PageProps) {
  return (
    <div className='fixed flex gap-6 px-3 py-5 w-screen h-screen min-h-screen max-h-screen   bg-gray-100   overflow-hidden'>
      <AdminNavbar auth={auth} />
      <AdminMainDash />
    </div>
  )
}
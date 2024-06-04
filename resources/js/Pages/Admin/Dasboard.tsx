import { PageProps } from '@/types'
import React from 'react'

export default function AdminDasboard( { auth } : PageProps ) {
  return (
    <div>

        <h1>Dashboard</h1>
        <p>Welcome, Admin!</p>
        <p>You're logged in!</p>
    </div>
  )
}

import React from 'react'
import ClientLayout from '@/Layouts/ClientLayout'
import { OverViewProps } from '@/types'
import Authenticated from '@/Layouts/AuthenticatedLayout'
import Statistics from './Statistics'
export default function Overview({ auth, vehicles, invoices, repairs}: OverViewProps) {
  return (
    <Authenticated
      user={auth.user}
      header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Overview</h2>}
    >
        <ClientLayout auth={auth} >
            <Statistics vehicles={vehicles} invoices={invoices} repairs={repairs} auth={auth} />
        </ClientLayout>
    </Authenticated>
  )
}

import React, { useState } from 'react';
import { RepairProps, AuthData, User, RepairRequest } from '@/types';
import AdminLayout from '@/Layouts/AdminLayout';
import RepairLister from './RepairLister';
import CreateRepairSheet from './CreateRepair';
type PageProps = {
    repairs: RepairProps[];
    auth: AuthData;
    mechanics: User[];
    acceptedRepairRequests: RepairRequest[];
}

export default function Repairs({ repairs, auth , mechanics, acceptedRepairRequests}: PageProps) {
    
    console.log(acceptedRepairRequests)
    console.log(mechanics)
  const [searchMechanic, setSearchMechanic] = useState('');
  const [searchStatus, setSearchStatus] = useState('');

  // Extract unique status values from repairs for select options
  const statusOptions = Array.from(new Set(repairs.map(repair => repair.status)));

  // Filter repairs based on search criteria
  const filteredRepairs = repairs.filter(repair => {
    const mechanicMatch = repair.mechanic.name.toLowerCase().includes(searchMechanic.toLowerCase());
    const statusMatch = repair.status.toLowerCase().includes(searchStatus.toLowerCase());
    return mechanicMatch && statusMatch;
  });

  return (
    <AdminLayout auth={auth}>
      <div className="w-full flex flex-col p-4 gap-6 justify-start rounded-md shadow-md bg-slate-100 border overflow-y-scroll">
       <div className="flex items-center bg-white w-full p-3 rounded-md shadow-md  gap-4">
       <input
          type="text"
          placeholder="Search by Mechanic"
          value={searchMechanic}
          onChange={e => setSearchMechanic(e.target.value)}
          className="px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
        />
        <select
          value={searchStatus}
          onChange={e => setSearchStatus(e.target.value)}
          className="px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
        >
          <option value="">Search by Status</option>
          {statusOptions.map(option => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
        {/* Display filtered repairs */}
        {filteredRepairs.map(repair => (
          <div key={repair.id} className="flex justify-between items-center border-b border-gray-200 py-2">
            <span>{repair.description}</span>
            <span>{repair.status}</span>
            <span>{repair.mechanic.name}</span>
          </div>
        ))}
        <CreateRepairSheet mechanics={mechanics} acceptedRequests={acceptedRepairRequests} />
       </div>
       <RepairLister repairs={filteredRepairs} />
      </div>
    </AdminLayout>
  );
}

import React from 'react';
import { FaPrint } from 'react-icons/fa';
import { Inertia } from '@inertiajs/inertia';
import NavBar from './Navbar';

const History = ({ repairs , auth, notifications}) => {
    const StartDate = (repair) => {
        if (repair.status === 'Review')
            return ('the start date has not been set yet !');
        else
            return (repair.startDate);
    }

    const EndDate = (repair) => {
        if (repair.status === 'Review')
            return ('the end date has not been set yet !');
        else
            return (repair.endDate);
    }

    return (
        <div>
            <NavBar auth={auth.user} notifications={notifications} />
        <div className="p-6 bg-gray-800">
            <h1 className="text-3xl font-bold mb-4 text-white">Repair History</h1>
            {repairs.map((repair, index) => (
                <div key={index} className="bg-gray-700 shadow-lg rounded-lg mb-4">
                    <div className="px-4 py-5 sm:px-6">
                        <h2 className="text-lg leading-6 font-medium text-white">{repair.description}</h2>
                    </div>
                    <div className="border-t border-gray-600">
                        <dl>
                            <div className="px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt className="text-sm font-medium text-gray-400">Status</dt>
                                <dd className="mt-1 text-sm text-white sm:mt-0 sm:col-span-2 flex justify-between items-center">
                                    <span>{repair.status}</span>
                                    {repair.status === 'completed' && (
                                        <button onClick={() => {
                                            console.log('Print icon clicked');
                                            Inertia.get(`/generate-invoice/${repair.id}`);
                                        }}>
                                            <FaPrint className="text-white" size={24} />
                                        </button>
                                    )}
                                </dd>
                            </div>
                            <div className="px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt className="text-sm font-medium text-gray-400">Start Date</dt>
                                <dd className="mt-1 text-sm text-white sm:mt-0 sm:col-span-2">{StartDate(repair)}</dd>
                            </div>
                            <div className="px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt className="text-sm font-medium text-gray-400">End Date</dt>
                                <dd className="mt-1 text-sm text-white sm:mt-0 sm:col-span-2">{EndDate(repair)}</dd>
                            </div>
                            <div className="px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt className="text-sm font-medium text-gray-400">Notes</dt>
                                <dd className="mt-1 text-sm text-white sm:mt-0 sm:col-span-2">{repair.clientNotes}</dd>
                            </div>
                        </dl>
                    </div>
                </div>
            ))}
        </div>
            </div>
    );
}

export default History;

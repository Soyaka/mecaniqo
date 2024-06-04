import React, { useState } from 'react';
import { FaCar, FaCheckCircle } from 'react-icons/fa';
import Modal from 'react-modal';
import NavBar from './Navbar';
// import Image from 'path/to/your/image';


const CompletedRepairs = ({ repairs , auth, notifications}) => {
    const [detailsModalIsOpen, setDetailsModalIsOpen] = useState(false);
    const [selectedRepairDetails, setSelectedRepairDetails] = useState(null);

    const handleDetails = (repair) => {
        console.log(repair);
        setSelectedRepairDetails(repair);
        setDetailsModalIsOpen(true);
    };

    return (
        <div>
            <NavBar auth={auth.user} notifications={notifications} />
        <div className="p-6" style={{ background: '#161D32', minHeight: '100vh' }}>
            {repairs.length === 0 && <h1 className="text-xl font-bold text-white">No completed repairs</h1>}
            {repairs.length > 0 && (
                <>
                    <h1 className="text-xl font-bold text-white">Completed Repairs</h1>
                    <table className="min-w-full leading-normal mt-4 text-white">
                        <thead>
                            <tr>
                                <th className="px-5 py-3 border-b-2 border-gray-700 bg-gray-800 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">Car</th>
                                <th className="px-5 py-3 border-b-2 border-gray-700 bg-gray-800 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">Status</th>
                                <th className="px-5 py-3 border-b-2 border-gray-700 bg-gray-800 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {repairs.map(repair => (
                                <tr key={repair.id} className="bg-gray-900 hover:bg-gray-700 transition-colors duration-300">
                                    <td className="px-5 py-5 border-b border-gray-700 text-sm">
                                        <div className="flex items-center">
                                            <FaCar className="mr-2" />
                                            <div>
                                                <p className="text-gray-300 whitespace-no-wrap">{repair.description}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-5 py-5 border-b border-gray-700 text-sm">
                                        <div className="flex items-center">
                                            <FaCheckCircle className="mr-2" />
                                            <p className="text-gray-300 whitespace-no-wrap">{repair.status}</p>
                                        </div>
                                    </td>
                                    <td className="px-5 py-5 border-b border-gray-700 text-sm">
                                        <div className="flex items-center">
                                            <button onClick={() => handleDetails(repair)} className='bg-green-600 p-2 text-md rounded-md'>Details</button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </>
            )}
            <Modal
                isOpen={detailsModalIsOpen}
                onRequestClose={() => setDetailsModalIsOpen(false)}
                contentLabel="Details Modal"
                className="bg-gray-900 text-white rounded-lg p-6 max-w-lg mx-auto mt-20"
                overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
            >
                {selectedRepairDetails && (
                    <div className="bg-gray-900 md-4 flex flex-col gap-7 shadow overflow-hidden ">
                        <h2 className="text-2xl font-bold mb-4 text-white">Repair Details</h2>
                        <div className="border-t md-4 border-gray-700">
                            <dl className="divide-y divide-gray-700 grid grid-cols-1 sm:grid-cols-3 gap-x-4 gap-y-4">
                                <div className="sm:col-span-1">
                                    <dt className="text-md font-medium text-gray-500">Repair ID</dt>
                                    <dd className="mt-1 text-md text-white">{selectedRepairDetails.id}</dd>
                                </div>
                                <div className="sm:col-span-1">
                                    <dt className="text-md font-medium text-gray-500">Description</dt>
                                    <dd className="mt-1 text-md text-white">{selectedRepairDetails.description}</dd>
                                </div>
                                <div className="sm:col-span-1">
                                    <dt className="text-md font-medium text-gray-500">Status</dt>
                                    <dd className="mt-1 text-md text-white">{selectedRepairDetails.status}</dd>
                                </div>
                                {/* Add more details as needed */}
                            </dl>
                        </div>
                        <img src={`/storage/${selectedRepairDetails.vehicle_photos}`} alt="Repair Image" className="mb-4 w-full rounded" style={{ height: '40vh', width:'40vw' }}/>
                        <button onClick={() => setDetailsModalIsOpen(false)} className="w-full py-2 mt-4 bg-red-600 text-white rounded">Close</button>
                    </div>
                )}
            </Modal>
        </div>
        </div>
    );
};

export default CompletedRepairs;

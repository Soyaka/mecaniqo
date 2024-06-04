import React, { useState } from 'react';
import { Inertia } from '@inertiajs/inertia';
import Modal from 'react-modal';
import NavBar from './Navbar';
import { FaCar, FaCheckCircle } from "react-icons/fa";
import Swal from 'sweetalert2'
const NewRequests = ({ repairs , mechanics, auth, notifications}) => {
    console.log(repairs)
    const [requests, setRequests] = useState(repairs || []);
    const [selectedRequest, setSelectedRequest] = useState(null);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [price, setPrice] = useState('');
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [detailsModalIsOpen, setDetailsModalIsOpen] = useState(false);
    const [selectedRepairDetails, setSelectedRepairDetails] = useState(null);
    const [selectedMechanic, setSelectedMechanic] = useState();
    const status = "pending";

    const handleSubmit = (event) => {
        event.preventDefault();
        Swal.fire({
            position: "top-end",
            icon: "success",
            title: "YooHoo! Dates picked successfully!",
            showConfirmButton: false,
            timer: 1500
          });
        Inertia.post('/admin/repairs/requests/pick-dates', { selectedRequest, startDate, status, endDate, price , selectedMechanic });
        setModalIsOpen(false);
    };
    const handleMechanicChange = (event) => {
        setSelectedMechanic(event.target.value);
    };
    const openModal = (requestId) => {
       console.log(requestId)
        setSelectedRequest(requestId);
        setModalIsOpen(true);
    };

    const handleDetails = (requestId) => {
        const repair = requests.find(req => req.repair_id === requestId);
        if (repair) {
            setSelectedRepairDetails(repair);
            setDetailsModalIsOpen(true);
        } else {
            console.log("Repair not found"); 
        }
    };

    return (
        <div>
        <NavBar auth={auth} notifications={notifications} />
        <div className="p-6" style={{ background: '#161D32',minHeight: '100vh' }}>
            {requests.length === 0 && <h1 className="text-xl font-bold text-white">No new requests</h1>}
            {requests.length > 0 && (
                <>
                    <h1 className="text-xl font-bold text-white">New Requests</h1>
                    <table className="min-w-full leading-normal mt-4 text-white">
                        <thead>
                            <tr>
                                <th className="px-5 py-3 border-b-2 border-gray-700 bg-gray-800 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">Car</th>
                                <th className="px-5 py-3 border-b-2 border-gray-700 bg-gray-800 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">Status</th>
                                <th className="px-5 py-3 border-b-2 border-gray-700 bg-gray-800 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {requests.map(request => (
                                <tr key={request.repai_id} className="bg-gray-900">
                                    <td className="px-5 py-5 border-b border-gray-700 text-sm">
                                        <div className="flex items-center">
                                            <FaCar className="mr-2" />
                                            <div>
                                                <p className="text-gray-300 whitespace-no-wrap">{request.description}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-5 py-5 border-b border-gray-700 text-sm">
                                        <div className="flex items-center">
                                            <FaCheckCircle className="mr-2" />
                                            <p className="text-gray-300 whitespace-no-wrap">{request.status}</p>
                                        </div>
                                    </td>
                                    <td className="px-5 py-5 border-b border-gray-700 text-sm">
                                        <div className="flex space-x-2">
                                            <button onClick={() => openModal(request.repair_id)} className="px-4 py-2 bg-blue-700 text-white rounded">Select</button>
                                            <button onClick={() => handleDetails(request.repair_id)} className="px-4 py-2 bg-green-700 text-white rounded">Details</button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </>
            )}
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={() => setModalIsOpen(false)}
                contentLabel="Request Modal"
                className="bg-gray-900 text-white rounded-lg p-6 max-w-lg mx-auto mt-20"
                overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
            >
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium">Start Date:</label>
                        <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} className="w-full mt-1 p-2 bg-gray-800 border border-gray-600 rounded text-gray-300" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium">End Date:</label>
                        <input type="date" value={endDate} onChange={e => setEndDate(e.target.value)} className="w-full mt-1 p-2 bg-gray-800 border border-gray-600 rounded text-gray-300" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium">Price:</label>
                        <input type="number" value={price} onChange={e => setPrice(e.target.value)} className="w-full mt-1 p-2 bg-gray-800 border border-gray-600 rounded text-gray-300" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium">Mechanic :</label>
                        <select name="mechanic" id="mechanic" value={selectedMechanic} onChange={handleMechanicChange} className="w-full mt-1 p-2 bg-gray-800 border border-gray-600 rounded text-gray-300">
                            {mechanics.map(mechanic => (
                                <option key={mechanic.id} value={mechanic.id}>{mechanic.name}</option>
                            ))}
                        </select>
                    </div>
                    <button type="submit" className="w-full py-2 bg-green-600 rounded">Submit</button>
                </form>
            </Modal>
            <Modal
                isOpen={detailsModalIsOpen}
                onRequestClose={() => setDetailsModalIsOpen(false)}
                contentLabel="Details Modal"
                className="bg-gray-900 text-white rounded-lg p-6 max-w-lg mx-auto mt-20"
                overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
            >
                {selectedRepairDetails && (
                    <div className="bg-gray-900 shadow overflow-hidden sm:rounded-lg p-6">
                    <h2 className="text-2xl font-bold mb-4 text-white">Repair Details</h2>
                    <div className="border-t border-gray-700">
                        <dl className="divide-y divide-gray-700 grid grid-cols-1 sm:grid-cols-3 gap-x-4 gap-y-4">
                            <div className="sm:col-span-1">
                                <dt className="text-md font-medium text-gray-500">Repair ID</dt>
                                <dd className="mt-1 text-md text-white">{selectedRepairDetails.repair_id}</dd>
                            </div>
                            <div className="sm:col-span-1">
                                <dt className="text-md font-medium text-gray-500">Vehicle ID</dt>
                                <dd className="mt-1 text-md text-white">{selectedRepairDetails.vehicleID}</dd>
                            </div>
                            <div className="sm:col-span-1">
                                <dt className="text-md font-medium text-gray-500">Car name</dt>
                                <dd className="mt-1 text-md text-white">{selectedRepairDetails.description}</dd>
                            </div>
                            <div className="sm:col-span-1">
                                <dt className="text-md font-medium text-gray-500">Model</dt>
                                <dd className="mt-1 text-md text-white">{selectedRepairDetails.model}</dd>
                            </div>
                            <div className="sm:col-span-1">
                                <dt className="text-md font-medium text-gray-500">Registration</dt>
                                <dd className="mt-1 text-md text-white">{selectedRepairDetails.registration}</dd>
                            </div>
                            <div className="sm:col-span-1">
                                <dt className="text-md font-medium text-gray-500">Status</dt>
                                <dd className="mt-1 text-md text-white">{selectedRepairDetails.status}</dd>
                            </div>
                            <div className="sm:col-span-1">
                                <dt className="text-md font-medium text-gray-500">User name</dt>
                                <dd className="mt-1 text-md text-white">{selectedRepairDetails.name}</dd>
                            </div>
                            <div className="sm:col-span-1">
                                <dt className="text-md font-medium text-gray-500">User Email</dt>
                                <dd className="mt-1 text-md text-white">{selectedRepairDetails.email}</dd>
                            </div>
                            <div className="sm:col-span-1">
                                <dt className="text-md font-medium text-gray-500">Client Notes</dt>
                                <dd className="mt-1 text-md text-white">{selectedRepairDetails.clientNotes}</dd>
                            </div>
                            <div>
                                <dt></dt>
                                <dd></dd>
                            </div>
                        </dl>
                    </div>
                    <img src={`/storage/${selectedRepairDetails.photos}`} alt="Vehicle" className="mb-4 w-full rounded" />
                    <button onClick={() => setDetailsModalIsOpen(false)} className="w-full py-2 mt-4 bg-red-600 text-white rounded">Close</button>
                </div>
                
                
                
                )}
            </Modal>
        </div>
        </div>
    );
};

export default NewRequests;
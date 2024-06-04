import React, { useState } from 'react'
import Checkbox from '../../Components/Checkbox';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle, faExclamationCircle } from '@fortawesome/free-solid-svg-icons'
import { Inertia } from '@inertiajs/inertia';
import NavBar from './Navbar';

const Modal = ({ children, onClose }) => {
    return (
        <div
            className="fixed top-0 left-0 w-full h-screen bg-gray-900 bg-opacity-50 flex justify-center items-center"
            onClick={onClose}
        >
            <div
                className="bg-gray-900 rounded-lg p-4 w-full max-w-md"
                onClick={(e) => e.stopPropagation()}
            >
                {children}
            </div>
        </div>
    );
};

const RepairRequests = ({ repairs, mechanics , auth, notifications}) => {

    const [currentPage, setCurrentPage] = useState(1);
    const repairsPerPage = 10;
    // console.log(repairs);
    console.log(mechanics);
    const [selectedMechanics, setSelectedMechanics] = useState({});

    const [selectedMechanic, setSelectedMechanic] = useState(mechanics[0].id);
    const [selectedRepair, setSelectedRepair] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [isDateModalOpen, setIsDateModalOpen] = useState(false);
    const indexOfLastRepair = currentPage * repairsPerPage;
    const indexOfFirstRepair = indexOfLastRepair - repairsPerPage;
    const currentRepairs = repairs.slice(indexOfFirstRepair, indexOfLastRepair);
    const openDateModal = (repairId) => {
        setSelectedRepair(repairId);
        setIsDateModalOpen(true);
    };
    const getNameById = (id) => {
        console.log(id);
        console.log(mechanics)
        const mechanic = mechanics.find((mechanic) => mechanic.id == id);
        return mechanic ? mechanic.name : 'Not found';
    }
    const closeDateModal = () => {
        setIsDateModalOpen(false);
    };

    const handleDateChange = (event) => {
        event.preventDefault();
        // Handle the date change here
        // You might want to make a POST request to your backend to update the dates
        Inertia.post('/admin/repairs/requests/update-dates', { selectedRepair, startDate, endDate });
        closeDateModal();
    };

    const handleSelectMechanic = (event, repairId) => {
        setSelectedMechanics(prevMechanics => ({
            ...prevMechanics,
            [repairId]: event.target.value
        }));
    };

    const handleForwardRequest = (repairId) => {
        setSelectedRepair(repairId);
        setIsModalOpen(true);
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
    };
    const forwardAndClose = () => {
        console.log(selectedMechanic);
        console.log(selectedRepair);
        Inertia.post('/admin/repairs/requests/forward', { selectedMechanic: selectedMechanics[selectedRepair], selectedRepair });        setIsModalOpen(false);
    };

    return ( 
        <div>
            <NavBar auth={auth} notifications={notifications} />
        <div className="p-6 bg-gray-800 flex flex-col gap-4 items-center" style={{ background: '#161D32', minHeight: '100vh' }}>
            <h1 className="text-5xl font-semibold text-gray-300 leading-tight mb-6">Repair Requests</h1>
            <div className="max-w-2xl w-[60em] p-6 bg-gray-900 text-gray-400 rounded-lg min-w-full">
            <table className="table-auto w-full border-collapse  min-w-full">
                    <thead>
                        <tr className="hover:bg-gray-700 transition-colors duration-300">
                            <th className="px-4 py-2 border-b border-gray-300">Request ID</th>
                            <th className="px-4 py-2 border-b border-gray-300">Description</th>
                            <th className="px-4 py-2 border-b border-gray-300">Status</th>
                            <th className="px-4 py-2 border-b border-gray-300">Mechanic Name</th>
                            <th className="px-4 py-2 border-b border-gray-300">Forward to Mechanic</th>
                            <th className="px-4 py-2 border-b border-gray-300">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentRepairs.map((repair, index) => (
                            <tr key={index} className="hover:bg-gray-700 transition-colors duration-300">
                                <td className="border-t border-gray-300 px-4 py-2">{repair.id}</td>
                                <td className="border-t border-gray-300 px-4 py-2">{repair.description}</td>
                                <td className="border-t border-gray-300 px-4 py-2">{repair.status}</td>
                                <td className="border-t border-gray-300 px-4 py-2">{getNameById(repair.mechanicID)}</td>
                                <td className="border-t border-gray-300 px-4 py-2">
                                    <select className='bg-gray-800 text-white rounded-xl' value={selectedMechanics[repair.id] || ''} onChange={(e) => handleSelectMechanic(e, repair.id)}>
                                        {mechanics.map((mechanic, index) => (
                                            <option key={index} value={mechanic.id}>
                                                {mechanic.name}
                                            </option>
                                        ))}
                                    </select>

                                </td>
                                <td className="border-t border-gray-300 px-4 py-2">
                                    <button
                                        onClick={() => openDateModal(repair.id)}
                                        className="text-lg bg-blue-900 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md mr-4"
                                    >
                                        Change Dates
                                    </button>
                                    <button
                                        onClick={() => handleForwardRequest(repair.id, selectedMechanic)}
                                        className="text-lg text-white border-red-500 bg-orange-600 font-bold py-2 px-4 rounded border hover:bg-orange-700"
                                    >
                                        Forward to Mechanic
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="flex justify-center space-x-4 mt-4">
                    <button
                        onClick={() => setCurrentPage(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="bg-blue-900 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    >
                        Previous
                    </button>
                    <button
                        onClick={() => setCurrentPage(currentPage + 1)}
                        disabled={currentPage === Math.ceil(repairs.length / repairsPerPage)}
                        className="bg-blue-900 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    >
                        Next
                    </button>
                </div>
            </div>
            {isModalOpen && (
                <Modal onClose={handleModalClose}>
                    <h2 className="text-lg font-semibold text-gray-200">
                        Forwarding Request {selectedRepair} to Mechanic {getNameById(selectedMechanics[selectedRepair])}
                    </h2>

                    <p className="text-gray-300">
                        Are you sure you want to forward this request to the selected mechanic?
                    </p>
                    <div className="flex mt-2 justify-end gap-3">
                        <button
                            onClick={handleModalClose}
                            className="bg-gray-700 hover:bg-gray-400 hover:text-black text-gray-300 font-bold py-2 px-4 rounded-xl"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={() => {
                                // Send the request to the backend to update the repair request
                                console.log('Forwarding request...');
                                forwardAndClose();
                            }}
                            className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded-xl"
                        >
                            Forward
                        </button>
                    </div>
                </Modal>
            )}
            {isDateModalOpen && (
                <Modal onClose={closeDateModal}>
                    <h2 className="text-lg font-semibold text-white">
                        Change Dates for Request {selectedRepair}
                    </h2>
                    <form onSubmit={handleDateChange}>
                        <div className="flex flex-col gap-4">
                            <label htmlFor="startDate" className="text-gray-300">Start Date</label>
                            <input
                                type="date"
                                id="startDate"
                                name="startDate"
                                value={startDate}
                                onChange={(e) => setStartDate(e.target.value)}
                                className="border border-gray-300 rounded-xl text-gray-400 h-10 pl-5 pr-10 bg-gray-800 hover:border-gray-400 focus:outline-none w-full"
                            />
                            <label htmlFor="endDate" className="text-gray-300">End Date</label>
                            <input
                                type="date"
                                id="endDate"
                                name="endDate"
                                value={endDate}
                                onChange={(e) => setEndDate(e.target.value)}
                                className="border border-gray-300 rounded-xl text-gray-400 h-10 pl-5 pr-10 bg-gray-800 hover:border-gray-400 focus:outline-none w-full"
                            />
                        </div>
                        <div className="flex mt-4 justify-end gap-2">
                            <button
                                onClick={closeDateModal}
                                className="bg-gray-700 hover:bg-gray-400 hover:text-black text-gray-300 font-bold py-2 px-4 rounded-xl"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-xl"
                            >
                                Save
                            </button>
                        </div>
                    </form>
                </Modal>
            )}
        </div>
        </div>
    );
};

export default RepairRequests;

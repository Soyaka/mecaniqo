import React, { useState } from 'react';
import Modal from 'react-modal';
import { FaCar, FaCheckCircle } from "react-icons/fa";
import { Inertia } from '@inertiajs/inertia';
import NavBar from '../Admin/Navbar';

const RepairDetails = ({ repair, parts, auth, notifications }) => {
    const [currentRepair, setCurrentRepair] = useState(repair);
    const [currentParts, setCurrentParts] = useState(parts);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8;

    const addPartToRepair = (part) => {
        Inertia.post('/mechanic/add/part-to-invoice', { part, repair });
    };

    const openModal = () => {
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
    };

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = currentParts.slice(indexOfFirstItem, indexOfLastItem);

    const nextPage = () => {
        setCurrentPage((prevPage) => prevPage + 1);
    };

    const prevPage = () => {
        setCurrentPage((prevPage) => prevPage - 1);
    };

    return (
        <div>
            <NavBar auth={auth.user} notifications={notifications} />
            <div className="p-6 bg-gray-800 flex flex-col gap-4 items-center" style={{ background: '#161D32', minHeight: '100vh' }}>
                <h1 className="text-3xl font-bold text-white mb-4">Repair Details</h1>
                <div className="mb-4 bg-gray-900 shadow-lg rounded-lg overflow-hidden w-full max-w-4xl">
                    <h2 className="text-2xl font-bold text-white p-4">Repair Information</h2>
                    <div className="px-4 py-5 bg-gray-800 flex flex-col items-center">
                        <div className="w-full max-w-sm rounded overflow-hidden shadow-lg mb-4">
                            <img className="w-full" src={`/storage/${currentRepair.vehicle_photos}`} alt="Vehicle" />
                            <div className="px-6 py-4">
                                <div className="flex items-center">
                                    <FaCar className="mr-2 text-white" />
                                    <h5 className="font-bold text-xl mb-2 text-white">{repair.description}</h5>
                                </div>
                                <div className="flex items-center">
                                    <FaCheckCircle className="mr-2 text-white" />
                                    <p className="text-gray-400 text-base">{repair.status}</p>
                                </div>
                            </div>
                        </div>
                        <button onClick={openModal} className="bg-green-500 text-white px-4 py-2 rounded">Add a spare part</button>
                    </div>
                </div>

                <Modal
                    isOpen={modalIsOpen}
                    onRequestClose={closeModal}
                    contentLabel="Add Spare Part Modal"
                    className="m-auto w-500 h-90 border border-gray-300 shadow-lg p-6 rounded-md bg-gray-800"
                    overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex"
                >
                    <h2 className="text-2xl font-bold mb-4 text-white">Add Spare Part</h2>
                    <table className="table-auto w-full border-collapse bg-gray-900 text-gray-400 rounded-lg">
                        <thead>
                            <tr className="hover:bg-gray-700 transition-colors duration-300">
                                <th className="px-4 py-2 border-gray-300 text-center">Part Name</th>
                                <th className="px-4 py-2 border-gray-300 text-center">Price</th>
                                <th className="px-4 py-2 border-gray-300 text-center">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentItems.map((part) => (
                                <tr key={part.id} className="hover:bg-gray-700 transition-colors duration-300">
                                    <td className="border-gray-300 px-4 py-2 text-center">{part.partName}</td>
                                    <td className="border-gray-300 px-4 py-2 text-center">{part.price}</td>
                                    <td className="border-gray-300 px-4 py-2 text-center">
                                        <button
                                            onClick={() => addPartToRepair(part)}
                                            className={`bg-blue-500 text-white px-4 py-2 rounded ${part.quantity === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
                                            disabled={part.quantity === 0}
                                        >
                                            Add to repair
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="mt-4 flex justify-between">
                        <button onClick={prevPage} disabled={currentPage === 1} className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline">Previous</button>
                        <button onClick={nextPage} disabled={currentItems.length < itemsPerPage} className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline">Next</button>
                    </div>
                </Modal>
            </div>
        </div>
    );
};

export default RepairDetails;

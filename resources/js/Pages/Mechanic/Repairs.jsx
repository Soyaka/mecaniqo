import React, { useState } from 'react';
import { Inertia } from '@inertiajs/inertia';
import { AiFillCheckCircle, AiFillCloseCircle, AiOutlineCar, AiOutlineSync } from 'react-icons/ai';
import Modal from 'react-modal';
import NavBar from './Navbar';

const MechanicRepairs = ({ repairs, auth, notifications }) => {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [newStatus, setNewStatus] = useState("completed");
    const [currentRepair, setCurrentRepair] = useState(null);

    const openModal = (repair) => {
        setCurrentRepair(repair);
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        Inertia.post('/mechanic/change/vehicle-status', { currentRepair, newStatus });
        closeModal();
    };

    return (
        <div>
            <NavBar auth={auth.user} notifications={notifications} />
            <div className="p-6 bg-gray-700 flex flex-col gap-4 items-center" style={{ background: '#161D32', minHeight: '100vh' }}>
                <h1 className="text-5xl font-semibold text-gray-300 leading-tight mb-6 flex items-center">
                    <AiOutlineCar className="mr-2" /> Repairs assigned to me
                </h1>
                <div className="max-w-2xl w-[60em] p-6 bg-gray-900 text-gray-400 rounded-lg min-w-full">
                    <table className="table-auto w-full border-collapse min-w-full">
                        <thead>
                            <tr className="hover:bg-gray-700 transition-colors duration-300">
                                <th className="px-4 py-2 border-gray-300 text-center">Repair ID</th>
                                <th className="px-4 py-2 border-gray-300 text-center">Title</th>
                                <th className="px-4 py-2 border-gray-300 text-center">Description</th>
                                <th className="px-4 py-2 border-gray-300 text-center">Status</th>
                                <th className="px-4 py-2 border-gray-300 text-center">Change Status</th>
                                <th className="px-4 py-2 border-gray-300 text-center">Working on</th>
                            </tr>
                        </thead>
                        <tbody>
                            {repairs.map((repair) => (
                                <tr key={repair.id} className="hover:bg-gray-700 transition-colors duration-300">
                                    <td className="border-gray-300 px-4 py-2 text-center">{repair.id}</td>
                                    <td className="border-gray-300 px-4 py-2 text-center">{repair.title}</td>
                                    <td className="border-gray-300 px-4 py-2 text-center">{repair.description}</td>
                                    <td className="border-gray-300 px-4 py-2 text-center">
                                        {repair.status === 'completed' ? (
                                            <div className="text-green-500 flex items-center justify-center">
                                                <AiFillCheckCircle className="mr-1" /> Completed
                                            </div>
                                        ) : (
                                            <div className="text-red-500 flex items-center justify-center">
                                                <AiFillCloseCircle className="mr-1" /> Pending
                                            </div>
                                        )}
                                    </td>
                                    <td className="border-gray-300 px-4 py-2 text-center">
                                        <button
                                            onClick={() => openModal(repair)}
                                            className="bg-blue-500 text-white rounded px-2 py-1 flex items-center justify-center"
                                        >
                                            <AiOutlineSync className="mr-1" /> Change Status
                                        </button>
                                    </td>
                                    <td className="border-gray-300 px-4 py-2 text-center">
                                        {repair.status !== 'completed' ? (
                                            <button
                                                onClick={() => Inertia.get(`/mechanic/repairs/working/${repair.id}`)}
                                                className="bg-yellow-500 text-white rounded px-2 py-1 flex items-center justify-center mx-auto"
                                            >
                                                <AiOutlineSync className="mr-1" /> Working on
                                            </button>
                                        ) : (
                                            <button
                                                disabled={true}
                                                onClick={() => Inertia.get(`/mechanic/repairs/working/${repair.id}`)}
                                                className="bg-yellow-500 disabled:cursor-not-allowed text-white rounded px-2 py-1 flex items-center justify-center mx-auto"
                                            >
                                                <AiOutlineSync className="mr-1" /> Working on
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <Modal
                    isOpen={modalIsOpen}
                    onRequestClose={closeModal}
                    contentLabel="Change Status Modal"
                    className="m-auto w-11/12 md:w-1/2 lg:w-1/3 border border-gray-300 shadow-lg p-6 rounded-md bg-gray-900"
                    overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex"
                >
                    <h2 className="text-2xl text-gray-200 font-bold mb-4">Change Status</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label className="block text-gray-400 text-sm font-bold mb-2" htmlFor="status">
                                Status
                            </label>
                            <select
                                id="status"
                                value={newStatus}
                                onChange={(e) => setNewStatus(e.target.value)}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-300 bg-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            >
                                <option value="completed">Completed</option>
                                <option value="pending">Pending</option>
                            </select>
                        </div>
                        <button
                            type="submit"
                            className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline"
                        >
                            Confirm
                        </button>
                    </form>
                </Modal>
            </div>
        </div>
    );
};

export default MechanicRepairs;

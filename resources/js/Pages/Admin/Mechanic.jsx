import React, { useState } from 'react';
import { Inertia } from '@inertiajs/inertia';
import Modal from 'react-modal';
import NavBar from './Navbar';
import { FaEdit, FaTrash } from 'react-icons/fa';

export default function Mechanics({ auth, mechanics, notifications }) {
    const [editModalIsOpen, setEditModalIsOpen] = useState(false);
    const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false);
    const [formData, setFormData] = useState({
        id: null,
        name: '',
        email: '',
    });

    const openEditModal = (mechanic) => {
        setFormData(mechanic);
        setEditModalIsOpen(true);
    };

    const closeEditModal = () => {
        setFormData({
            id: null,
            name: '',
            email: '',
        });
        setEditModalIsOpen(false);
    };

    const updateMechanic = () => {
        // Inertia.put(`/mechanics/${formData.id}`, formData);
        Inertia.post('/admin/add/mecanic', {"formData" : formData})
        closeEditModal();
    };

    const deleteMechanic = (mechanicId) => {
        Inertia.delete(`/users/${mechanicId}`);
        closeDeleteModal();
    };

    const openDeleteModal = (mechanicId) => {
        setFormData({ id: mechanicId });
        setDeleteModalIsOpen(true);
    };

    const closeDeleteModal = () => {
        setFormData({ id: null });
        setDeleteModalIsOpen(false);
    };

    const handleSearchChange = (e) => {
        // Handle search logic here
    };

    return (
        <div>
            <NavBar auth={auth} notifications={notifications} />
            <div className="p-6" style={{ background: '#161D32', minHeight: '100vh' }}>
                <h2 className="text-2xl font-semibold text-gray-400 leading-tight mb-4">Mechanics</h2>
                <div className="bg-gray-900 shadow sm:rounded-lg p-6">
                    <div className="text-lg font-semibold text-gray-400 mb-2">All Mechanics:</div>
                    <div className="flex justify-between mb-4">
                        <button className="bg-green-600 font-bold text-white px-4 py-2 rounded" onClick={() => Inertia.visit('/admin/add/mecanic')}>
                            Add Mechanic
                        </button>
                        <input
                            type="text"
                            placeholder="Search..."
                            onChange={handleSearchChange}
                            className="px-3 py-2 bg-gray-800 text-gray-300 border rounded-lg focus:outline-none"
                        />
                    </div>
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-800 text-white">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider">
                                    Name
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider">
                                    Email
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-gray-900 text-white divide-y divide-gray-700">
                            {mechanics.map((mechanic) => (
                                <tr key={mechanic.id}>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm font-medium">{mechanic.name}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm">{mechanic.email}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                                        <button onClick={() => openEditModal(mechanic)} className="bg-blue-500 text-white px-4 py-2 rounded mr-2">
                                            <FaEdit />
                                        </button>
                                        <button onClick={() => openDeleteModal(mechanic.id)} className="bg-red-500 text-white px-4 py-2 rounded">
                                            <FaTrash />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <Modal
                isOpen={editModalIsOpen}
                onRequestClose={closeEditModal}
                contentLabel="Edit Mechanic Modal"
                className="m-auto w-500 h-90 shadow-lg p-6 rounded-md bg-gray-800"
                overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex"
            >
                <h2 className="text-2xl font-bold mb-4 text-white">Edit Mechanic</h2>
                <form className="flex flex-col gap-4">
                    <div className="mb-4">
                        <label className="block text-white text-sm font-bold mb-2" htmlFor="name">
                            Name
                        </label>
                        <input
                            id="name"
                            name="name"
                            type="text"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="w-full px-3 py-2 bg-gray-800 text-gray-300 rounded-lg focus:outline-none"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-white text-sm font-bold mb-2" htmlFor="email">
                            Email
                        </label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className="w-full px-3 py-2 bg-gray-800 text-gray-300 rounded-lg focus:outline-none"
                        />
                    </div>
                    <div className="flex justify-end">
                        <button
                            type="button"
                            onClick={updateMechanic}
                            className="bg-green-700 font-bold text-white px-4 py-2 rounded mr-2"
                        >
                            Update
                        </button>
                        <button
                            type="button"
                            onClick={closeEditModal}
                            className="bg-blue-900 font-bold text-white px-4 py-2 rounded"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </Modal>
            <Modal
                isOpen={deleteModalIsOpen}
                onRequestClose={closeDeleteModal}
                contentLabel="Delete Mechanic Modal"
                className="m-auto w-500 h-90 shadow-lg p-6 rounded-md bg-gray-800"
                overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex"
            >
                <h2 className="text-2xl font-bold mb-4 text-white">Confirm Delete</h2>
                <p className="text-white mb-4">Are you sure you want to delete this mechanic?</p>
                <div className="flex justify-end">
                    <button
                        type="button"
                        onClick={() => deleteMechanic(formData.id)}
                        className="bg-red-500 text-white font-bold px-4 py-2 rounded mr-2"
                    >
                        Delete
                    </button>
                    <button
                        type="button"
                        onClick={closeDeleteModal}
                        className="bg-gray-500 text-white font-bold px-4 py-2 rounded"
                    >
                        Cancel
                    </button>
                </div>
            </Modal>
        </div>
    );
}


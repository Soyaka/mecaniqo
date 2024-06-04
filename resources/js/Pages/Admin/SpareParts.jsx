import React, { useState } from 'react';
import Modal from 'react-modal';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { Inertia } from '@inertiajs/inertia';
import NavBar from '../Admin/Navbar';

const SpareParts = ({ spare, auth, notifications }) => {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [isCreateModal, setIsCreateModal] = useState(false);
    const [currentPart, setCurrentPart] = useState(null);
    const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false);
    const [partToDelete, setPartToDelete] = useState(null);
    const [formData, setFormData] = useState({
        partName: '',
        partReference: '',
        price: '',
        quantity: '',
        supplier: '',
    });
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const openModal = (part = null) => {
        setCurrentPart(part);
        if (part) {
            setFormData(part);
            setIsCreateModal(false);
        } else {
            setFormData({
                partName: '',
                partReference: '',
                price: '',
                quantity: '',
                supplier: '',
            });
            setIsCreateModal(true);
        }
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = () => {
        // if (isCreateModal) {
            Inertia.post('/admin/update-spare-parts', { formData });
        // } 
        closeModal();
    };

    const openDeleteModal = (part) => {
        setPartToDelete(part);
        setDeleteModalIsOpen(true);
    };

    const closeDeleteModal = () => {
        setDeleteModalIsOpen(false);
    };

    const handleDelete = () => {
        Inertia.delete(`/admin/spare-part-delete/${partToDelete.id}`);
        closeDeleteModal();
    };

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
        setCurrentPage(1);
    };

    const filteredParts = spare.filter(part =>
        part.partName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        part.partReference.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const paginatedParts = filteredParts.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    const handleNextPage = () => {
        if (currentPage * itemsPerPage < filteredParts.length) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    return (
        <div>
            <NavBar auth={auth.user} notifications={notifications} />
            <div className="p-6 bg-gray-800 flex flex-col gap-0 items-center" style={{ background: '#161D32', minHeight: '100vh' }}>
                <h1 className="text-3xl font-bold text-white mb-4">Spare Parts</h1>
                <div className="flex justify-between items-center w-full mb-4">
                    <button
                        onClick={() => openModal()}
                        className="bg-green-700 text-white px-4 py-2 rounded-lg"
                    >
                        Create a New Part
                    </button>
                    <input
                        type="text"
                        placeholder="Search for parts..."
                        value={searchQuery}
                        onChange={handleSearchChange}
                        className="bg-gray-700 text-white px-4 py-2 rounded w-1/3"
                    />
                </div>
                <table className="table-auto w-full border-collapse bg-gray-900 text-gray-400 rounded-lg">
                    <thead>
                        <tr className="hover:bg-gray-700 transition-colors duration-300">
                            <th className="px-4 py-2 border-gray-300 text-center">Part Name</th>
                            <th className="px-4 py-2 border-gray-300 text-center">Reference</th>
                            <th className="px-4 py-2 border-gray-300 text-center">Price</th>
                            <th className="px-4 py-2 border-gray-300 text-center">Quantity</th>
                            <th className="px-4 py-2 border-gray-300 text-center">Supplier</th>
                            <th className="px-4 py-2 border-gray-300 text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {paginatedParts.map((part) => (
                            <tr key={part.id} className="hover:bg-gray-700 transition-colors duration-300">
                                <td className="border-gray-300 px-4 py-2 text-center">{part.partName}</td>
                                <td className="border-gray-300 px-4 py-2 text-center">{part.partReference}</td>
                                <td className="border-gray-300 px-4 py-2 text-center">{part.price}</td>
                                <td className="border-gray-300 px-4 py-2 text-center">{part.quantity}</td>
                                <td className="border-gray-300 px-4 py-2 text-center">{part.supplier}</td>
                                <td className="border-gray-300 px-4 py-2 text-center">
                                    <button onClick={() => openModal(part)} className="bg-blue-500 text-white px-4 py-2 rounded mr-2"><FaEdit /></button>
                                    <button onClick={() => openDeleteModal(part)} className="bg-red-500 text-white px-4 py-2 rounded"><FaTrash /></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="flex justify-center gap-4 w-full mt-4">
                    <button
                        onClick={handlePreviousPage}
                        className="bg-gray-700 text-white px-4 py-2 rounded"
                        disabled={currentPage === 1}
                    >
                        Previous
                    </button>
                    <button
                        onClick={handleNextPage}
                        className="bg-gray-700 text-white px-4 py-2 rounded"
                        disabled={currentPage * itemsPerPage >= filteredParts.length}
                    >
                        Next
                    </button>
                </div>
                <Modal
                    isOpen={modalIsOpen}
                    onRequestClose={closeModal}
                    contentLabel="Spare Part Modal"
                    className="m-auto w-500 h-90 border border-gray-300 shadow-lg p-6 rounded-md bg-gray-800"
                    overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex"
                >
                    <h2 className="text-2xl font-bold mb-4 text-white">{isCreateModal ? 'Create New Part' : 'Update Part'}</h2>
                    <form>
                        <div className="mb-4">
                            <label className="block text-white text-sm font-bold mb-2" htmlFor="partName">
                                Part Name
                            </label>
                            <input
                                id="partName"
                                name="partName"
                                type="text"
                                value={formData.partName}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-white text-sm font-bold mb-2" htmlFor="partReference">
                                Part Reference
                            </label>
                            <input
                                id="partReference"
                                name="partReference"
                                type="text"
                                value={formData.partReference}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-white text-sm font-bold mb-2" htmlFor="price">
                                Price
                            </label>
                            <input
                                id="price"
                                name="price"
                                type="text"
                                value={formData.price}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-white text-sm font-bold mb-2" htmlFor="quantity">
                                Quantity
                            </label>
                            <input
                                id="quantity"
                                name="quantity"
                                type="number"
                                value={formData.quantity}
                                onchange={handleInputChange}
                                className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-white text-sm font-bold mb-2" htmlFor="supplier">
                                Supplier
                            </label>
                            <input
                                id="supplier"
                                name="supplier"
                                type="text"
                                value={formData.supplier}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none"
                            />
                        </div>
                        <div className="flex justify-end">
                            <button
                                type="button"
                                onClick={handleSubmit}
                                className="bg-green-500 text-white px-4 py-2 rounded mr-2"
                            >
                                {isCreateModal ? 'Create' : 'Update'}
                            </button>
                            <button
                                type="button"
                                onClick={closeModal}
                                className="bg-gray-500 text-white px-4 py-2 rounded"
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </Modal>
                <Modal
                    isOpen={deleteModalIsOpen}
                    onRequestClose={closeDeleteModal}
                    contentLabel="Delete Part Modal"
                    className="m-auto w-500 h-90 border border-gray-300 shadow-lg p-6 rounded-md bg-gray-800"
                    overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex"
                >
                    <h2 className="text-2xl font-bold mb-4 text-white">Confirm Delete</h2>
                    <p className="text-white mb-4">Are you sure you want to delete this part?</p>
                    <div className="flex justify-end">
                        <button
                            type="button"
                            onClick={handleDelete}
                            className="bg-red-500 text-white px-4 py-2 rounded mr-2"
                        >
                            Delete
                        </button>
                        <button
                            type="button"
                            onClick={closeDeleteModal}
                            className="bg-gray-500 text-white px-4 py-2 rounded"
                        >
                            Cancel
                        </button>
                    </div>
                </Modal>
            </div>
        </div>
    );
};

export default SpareParts;

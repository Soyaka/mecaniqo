import React, { useState } from 'react';
import { Inertia } from '@inertiajs/inertia';
import NavBar from './Navbar';
import bgImage from '../repairs/select.jpg'; // Import the background image

const RepairRequestForm = ({ auth, notifications, vehicleId }) => {
    const [description, setDescription] = useState('');
    const [clientNotes, setClientNotes] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('description', description);
        formData.append('clientNotes', clientNotes);
        formData.append('vehicle_id', vehicleId);
        console.log("test" + vehicleId);
        Inertia.post('/repair-request', formData);
        // Inertia.get('/repair-request/success');
    };

    return (
        <div>
            <NavBar auth={auth.user} notifications={notifications} />
            <div style={{ background: '#161D32' }} className="flex flex-col items-center justify-center min-h-screen p-8">
                <form onSubmit={handleSubmit} className="max-w-md w-full bg-gray-800 p-6 border border-gray-700 rounded-lg shadow-lg">
                    <h2 className="text-3xl font-bold mb-6 text-gray-300 text-center">Request a Repair</h2>
                    <div className="mb-6">
                        <label htmlFor="description" className="block mb-2 text-md font-medium text-white">Description</label>
                        <input type="text" id="description" value={description} onChange={e => setDescription(e.target.value)} className="bg-gray-700 border border-gray-600 text-gray-300 text-sm rounded-lg focus:ring-0 focus:border-gray-600 block w-full p-2.5" placeholder="Description for your car situation" />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="clientNotes" className="block mb-2 text-md font-medium text-white">Client Notes</label>
                        <textarea id="clientNotes" value={clientNotes} onChange={e => setClientNotes(e.target.value)} className="bg-gray-700 border border-gray-600 text-gray-300 text-sm rounded-lg focus:ring-0 focus:border-gray-600 block w-full p-2.5" placeholder="Your notes for here"></textarea>
                    </div>
                    <div className="flex justify-center">
                        <button type="submit" className="bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 text-white rounded-xl px-6 py-3 text-sm cursor-pointer">Submit</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default RepairRequestForm;

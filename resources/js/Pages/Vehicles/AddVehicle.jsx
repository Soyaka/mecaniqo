import React, { useState } from 'react';
import { Inertia } from '@inertiajs/inertia';
import NavBar from './Navbar';
import bgImage from '../repairs/select.jpg'; // Import the background image

const VehicleForm = ({ auth, notifications }) => {
    const [make, setMake] = useState('');
    const [model, setModel] = useState('');
    const [fuelType, setFuelType] = useState('');
    const [registration, setRegistration] = useState('');
    const [photos, setPhotos] = useState(null);
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('make', make);
        formData.append('model', model);
        formData.append('fuelType', fuelType);
        formData.append('registration', registration);
        if (photos) formData.append('photos', photos, photos.name);

        Inertia.post('/vehicles', formData);
    };

    return (
        <div>
            <NavBar auth={auth.user} notifications={notifications} />
            <div style={{ background: '#161D32' }} className="flex flex-col gap-7 items-center justify-center w-screen h-screen p-8 m-0">
                <h1 className='text-gray-300 text-3xl'><strong>Adding Vehicle</strong></h1>
                <form style={{ background: '#161D32' }} className="max-w-sm w-full bg-gray-800 p-6 border border-gray-700 rounded-lg shadow-lg" onSubmit={handleSubmit}>
                    {error && <div className="mb-4 text-red-500">{error}</div>}
                    <div className="mb-5">
                        <label htmlFor="make" className="block mb-2 text-sm font-medium text-white">Make</label>
                        <input type="text" id="make" value={make} onChange={e => setMake(e.target.value)} className="bg-gray-700 border border-gray-600 text-gray-300 text-sm rounded-lg focus:ring-0 focus:border-gray-600 block w-full p-2.5" placeholder="Make" required />
                    </div>
                    <div className="mb-5">
                        <label htmlFor="model" className="block mb-2 text-sm font-medium text-white">Model</label>
                        <input type="text" id="model" value={model} onChange={e => setModel(e.target.value)} className="bg-gray-700 border border-gray-600 text-gray-300 text-sm rounded-lg focus:ring-0 focus:border-gray-600 block w-full p-2.5" placeholder="Model" required />
                    </div>
                    <div className="mb-5">
                        <label htmlFor="fuelType" className="block mb-2 text-sm font-medium text-white">Fuel Type</label>
                        <input type="text" id="fuelType" value={fuelType} onChange={e => setFuelType(e.target.value)} className="bg-gray-700 border border-gray-600 text-gray-300 text-sm rounded-lg focus:ring-0 focus:border-gray-600 block w-full p-2.5" placeholder="Fuel Type" required />
                    </div>
                    <div className="mb-5">
                        <label htmlFor="registration" className="block mb-2 text-sm font-medium text-white">Registration</label>
                        <input type="text" id="registration" value={registration} onChange={e => setRegistration(e.target.value)} className="bg-gray-700 border border-gray-600 text-gray-300 text-sm rounded-lg focus:ring-0 focus:border-gray-600 block w-full p-2.5" placeholder="Registration" required />
                    </div>



                    <div className="mb-5">
                        <label htmlFor="photos" className="block mb-2 text-sm font-medium text-white">Photos</label>
                        <div className="flex justify-center items-center">
                            <label htmlFor="file-upload" className="bg-gray-600 hover:bg-gray-700 focus:ring-4 focus:ring-blue-300 text-white rounded-xl px-4 py-2.5 cursor-pointer">
                                Upload Picture
                                <input id="file-upload" type="file" onChange={e => setPhotos(e.target.files[0])} className="sr-only " />
                            </label>
                        </div>
                    </div>

                    <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Add Vehicle</button>
                </form>
            </div>
        </div>
    );
};

export default VehicleForm;

import React, { useState } from 'react';
import { AuthData, Vehicle } from '@/types';
import ClientLayout from '@/Layouts/ClientLayout';
import { Inertia } from '@inertiajs/inertia';

interface FormData {
    brand: string;
    model: string;
    fuelType: string;
    registrationNumber: string;
    photos: File[];
}

export default function Vehicles({ auth, vehicles }: { auth: AuthData, vehicles: Vehicle[] }) {
    console.log(vehicles);
    const [formData, setFormData] = useState<FormData>({
        brand: '',
        model: '',
        fuelType: '',
        registrationNumber: '',
        photos: [],
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setFormData({ ...formData, photos: Array.from(e.target.files) });
        }
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formDataToSend = new FormData();
        formDataToSend.append('brand', formData.brand);
        formDataToSend.append('model', formData.model);
        formDataToSend.append('fuel_type', formData.fuelType);
        formDataToSend.append('registration_number', formData.registrationNumber);
        formData.photos.forEach((photo, index) => {
            formDataToSend.append(`photos[${index}]`, photo);
        });

        Inertia.post('/vehicles', formDataToSend);
    };

    return (
        <ClientLayout auth={auth}>
            <div>
                <h1>Vehicles</h1>
                <form onSubmit={handleSubmit}>
                    <label>
                        Brand:
                        <input type="text" name="brand" value={formData.brand} onChange={handleChange} />
                    </label>
                    <br />
                    <label>
                        Model:
                        <input type="text" name="model" value={formData.model} onChange={handleChange} />
                    </label>
                    <br />
                    <label>
                        Fuel Type:
                        <input type="text" name="fuelType" value={formData.fuelType} onChange={handleChange} />
                    </label>
                    <br />
                    <label>
                        Registration Number:
                        <input type="text" name="registrationNumber" value={formData.registrationNumber} onChange={handleChange} />
                    </label>
                    <br />
                    <label>
                        Photos:
                        <input type="file" name="photos" multiple onChange={handlePhotoChange} />
                    </label>
                    <br />
                    <button type="submit">Add Vehicle</button>
                </form>
            </div>
        </ClientLayout>
    );
}

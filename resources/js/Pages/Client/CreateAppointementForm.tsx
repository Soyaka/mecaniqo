import React, { useState } from "react";
import axios from "axios";

const CreateAppointmentForm: React.FC = () => {
    const [vehicleId, setVehicleId] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [dateTime, setDateTime] = useState<string>("");
    const [images, setImages] = useState<FileList | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("vehicle_id", vehicleId);
        formData.append("description", description);
        formData.append("date_time", dateTime);
        if (images) {
            for (let i = 0; i < images.length; i++) {
                formData.append("images[]", images[i]);
            }
        }

        try {
            const response = await axios.post("/appointments", formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            });
            console.log(response.data);
        } catch (error) {
            console.error("There was an error creating the appointment!", error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label htmlFor="vehicle_id" className="block text-sm font-medium text-gray-700">
                    Vehicle ID
                </label>
                <input
                    type="text"
                    id="vehicle_id"
                    value={vehicleId}
                    onChange={(e) => setVehicleId(e.target.value)}
                    className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                />
            </div>
            <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                    Description
                </label>
                <textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                />
            </div>
            <div>
                <label htmlFor="date_time" className="block text-sm font-medium text-gray-700">
                    Date and Time
                </label>
                <input
                    type="datetime-local"
                    id="date_time"
                    value={dateTime}
                    onChange={(e) => setDateTime(e.target.value)}
                    className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                />
            </div>
            <div>
                <label htmlFor="images" className="block text-sm font-medium text-gray-700">
                    Images
                </label>
                <input
                    type="file"
                    id="images"
                    multiple
                    onChange={(e) => setImages((e.target as HTMLInputElement).files)}
                    className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                />
            </div>
            <div>
                <button
                    type="submit"
                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                    Create Appointment
                </button>
            </div>
        </form>
    );
};

export default CreateAppointmentForm;

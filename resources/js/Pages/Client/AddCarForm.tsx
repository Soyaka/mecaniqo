import React, { useState } from "react";
import ImageUpload from "./ImageUpload";

interface FormDataState {
    brand: string;
    model: string;
    fuel_type: string;
    registration_number: string;
    photos: File[];
}

export default function AddCarForm() {
    const [formData, setFormData] = useState<FormDataState>({
        brand: "",
        model: "",
        fuel_type: "",
        registration_number: "",
        photos: [],
    });

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, files } = event.target;
        if (files) {
            setFormData((prevFormData) => ({
                ...prevFormData,
                [name]: Array.from(files),
            }));
        } else {
            setFormData((prevFormData) => ({
                ...prevFormData,
                [name]: value,
            }));
        }
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const csrfToken = document
            .querySelector('meta[name="csrf-token"]')
            ?.getAttribute("content");
        if (!csrfToken) {
            console.error("CSRF token not found");
            return;
        }

        const formPayload = new FormData();
        formPayload.append("brand", formData.brand);
        formPayload.append("model", formData.model);
        formPayload.append("fuel_type", formData.fuel_type);
        formPayload.append("registration_number", formData.registration_number);
        formData.photos.forEach((photo, index) => {
            formPayload.append(`photos[${index}]`, photo);
        });

        try {
            const response = await fetch("/vehicles", {
                method: "POST",
                headers: {
                    "X-CSRF-TOKEN": csrfToken,
                },
                body: formPayload,
            });

            if (!response.ok) {
                const contentType = response.headers.get("content-type");
                if (contentType && contentType.includes("application/json")) {
                    const errorData = await response.json();
                    console.error('Error response:', errorData);
                    throw new Error('Network response was not ok');
                } else {
                    const text = await response.text();
                    console.error('Error response:', text);
                    throw new Error('Expected JSON response');
                }
            }

            const contentType = response.headers.get("content-type");
            if (contentType && contentType.includes("application/json")) {
                const data = await response.json();
                console.log("Response:", data);
            } else {
                console.error("Expected JSON response but got:", contentType);
                throw new Error("Expected JSON response");
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    return (

            <div className="flex flex-col items-center justify-center">
                <h1 className="text-3xl font-bold mb-4">Vehicles</h1>
                <div className="w-full max-w-2xl">
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label
                                className="block text-gray-700 font-bold mb-2"
                                htmlFor="brand"
                            >
                                Brand
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="brand"
                                name="brand"
                                type="text"
                                placeholder="Brand"
                                value={formData.brand}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="mb-4">
                            <label
                                className="block text-gray-700 font-bold mb-2"
                                htmlFor="model"
                            >
                                Model
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="model"
                                name="model"
                                type="text"
                                placeholder="Model"
                                value={formData.model}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="mb-4">
                            <label
                                className="block text-gray-700 font-bold mb-2"
                                htmlFor="fuel_type"
                            >
                                Fuel Type
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="fuel_type"
                                name="fuel_type"
                                type="text"
                                placeholder="Fuel Type"
                                value={formData.fuel_type}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="mb-4">
                            <label
                                className="block text-gray-700 font-bold mb-2"
                                htmlFor="registration_number"
                            >
                                Registration Number
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="registration_number"
                                name="registration_number"
                                type="text"
                                placeholder="Registration Number"
                                value={formData.registration_number}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="mb-4">
                            <label
                                className="block text-gray-700 font-bold mb-2"
                                htmlFor="photos"
                            >
                                Photos
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="photos"
                                name="photos"
                                type="file"
                                multiple
                                onChange={handleChange}
                            />
                        </div>
                        <button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            type="submit"
                        >
                            Submit
                        </button>
                    </form>
                </div>
            </div>
    );
}

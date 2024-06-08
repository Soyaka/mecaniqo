import React, { useState } from "react";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/Components/ui/sheet";
import { User, RepairRequest } from "@/types";

interface FormDataState {
    description: string;
    cost: string;
    status: string;
    mechanic: string;
    acceptedRequestId: string; // New field for mechanic selection
}

export default function CreateRepairSheet({
    mechanics,
    acceptedRequests,
}: {
    mechanics: User[];
    acceptedRequests: RepairRequest[];
}) {
    const [formData, setFormData] = useState<FormDataState>({
        description: "",
        cost: "",
        status: "",
        mechanic: "", // Initialize with an empty value
        acceptedRequestId: "", // Initialize with an empty value for accepted request
    });

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    const handleSelectChange = (
        event: React.ChangeEvent<HTMLSelectElement>
    ) => {
        const { name, value } = event.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const csrfToken = document
            .querySelector('meta[name="csrf-token"]')
            ?.getAttribute("content");

        // Define the headers object
        const headers = new Headers();
        headers.append("Content-Type", "application/json");
        headers.append("Accept", "application/json");

        // Add CSRF token to headers if it exists
        if (csrfToken) {
            headers.append("X-CSRF-TOKEN", csrfToken);
        }
        fetch("/repairs", {
            method: "POST",
            headers: headers,
            body: JSON.stringify({
                repair_request_id: formData.acceptedRequestId,
                mechanic_id: formData.mechanic,
                description: formData.description,
                cost: formData.cost,
                status: formData.status,
            }),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Failed to create repair");
                }
                return response.json();
            })
            .then((data) => {
                console.log("New repair created:", data);
            })
            .catch((error) => {
                console.error("Error creating repair:", error);
            });
        console.log("Form Data:", formData);
    };

    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button
                    className="hover:bg-slate-900 border-none hover:outline-none outline-none hover:text-white"
                    variant="outline"
                >
                    Add a new repair
                </Button>
            </SheetTrigger>
            <SheetContent side="bottom">
                <SheetHeader>
                    <SheetTitle>Add a new repair</SheetTitle>
                    <SheetDescription>
                        Fill in repair information
                    </SheetDescription>
                </SheetHeader>
                <div className="flex flex-col h-full items-center justify-center overflow-y-scroll">
                    <div className="w-full max-w-2xl">
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <Label
                                    htmlFor="description"
                                    className="block text-gray-700 font-bold mb-2"
                                >
                                    Description
                                </Label>
                                <Input
                                    id="description"
                                    name="description"
                                    type="text"
                                    placeholder="Description"
                                    value={formData.description}
                                    onChange={handleInputChange}
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                />
                            </div>
                            <div className="mb-4">
                                <Label
                                    htmlFor="cost"
                                    className="block text-gray-700 font-bold mb-2"
                                >
                                    Cost
                                </Label>
                                <Input
                                    id="cost"
                                    name="cost"
                                    type="text"
                                    placeholder="Cost"
                                    value={formData.cost}
                                    onChange={handleInputChange}
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                />
                            </div>
                            <div className="mb-4">
                                <Label
                                    htmlFor="status"
                                    className="block text-gray-700 font-bold mb-2"
                                >
                                    Status
                                </Label>
                                <select
                                    id="status"
                                    name="status"
                                    value={formData.status}
                                    onChange={handleSelectChange}
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                >
                                    <option value="pending">Pending</option>
                                    <option value="in_progress">
                                        In Progress
                                    </option>
                                    <option value="completed">Completed</option>
                                </select>
                            </div>
                            <div className="mb-4">
                                <Label
                                    htmlFor="mechanic"
                                    className="block text-gray-700 font-bold mb-2"
                                >
                                    Mechanic
                                </Label>
                                <select
                                    id="mechanic"
                                    name="mechanic"
                                    value={formData.mechanic}
                                    onChange={handleSelectChange} // Use the same handler for mechanic selection
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                >
                                    <option value="">Select Mechanic</option>{" "}
                                    {/* Add an empty option */}
                                    {mechanics.map((mechanic) => (
                                        <option
                                            key={mechanic.id}
                                            value={mechanic.id}
                                        >
                                            {mechanic.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="mb-4">
                                <Label
                                    htmlFor="acceptedRequestId"
                                    className="block text-gray-700 font-bold mb-2"
                                >
                                    Accepted Request
                                </Label>
                                <select
                                    id="acceptedRequestId"
                                    name="acceptedRequestId"
                                    value={formData.acceptedRequestId}
                                    onChange={handleSelectChange} // Use the same handler for accepted request selection
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                >
                                    <option value="">
                                        Select Accepted Request
                                    </option>{" "}
                                    {/* Add an empty option */}
                                    {acceptedRequests.map((request) => (
                                        <option
                                            key={request.id}
                                            value={request.id}
                                        >
                                            {request.user?.name} ||{" "}
                                            {request.vehicle?.brand}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <SheetFooter>
                                <SheetClose asChild>
                                    <Button
                                        type="submit"
                                        className="bg-slate-800 hover:bg-slate-800/75 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                    >
                                        Save changes
                                    </Button>
                                </SheetClose>
                            </SheetFooter>
                        </form>
                    </div>
                </div>
            </SheetContent>
        </Sheet>
    );
}

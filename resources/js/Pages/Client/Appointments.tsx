import React, { useState, useEffect } from "react";
import ClientLayout from "@/Layouts/ClientLayout";
import { AuthData, Appointment } from "@/types";
import CreateCarSheet from "./CreateCarSheet";

export default function Appointments({
    auth,
    appointments,
}: {
    auth: AuthData;
    appointments: Appointment[];
}) {
  console.log(appointments)
    const [filteredAppointments, setFilteredAppointments] = useState<Appointment[]>(appointments || []);
    const [filters, setFilters] = useState({
        date: "",
        status: ""
    });

    useEffect(() => {
        // Apply filters to appointments
        const filtered = appointments.filter(appointment =>
            (!filters.date || new Date(appointment.date).toISOString().slice(0,10) === filters.date) &&
            (!filters.status || appointment.status === filters.status)
        );
        setFilteredAppointments(filtered);
    }, [filters, appointments]);

    const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFilters(prevFilters => ({
            ...prevFilters,
            [name]: value
        }));
    };

    return (
        <ClientLayout auth={auth}>
            <div className="w-full flex flex-col p-4 gap-6 justify-start rounded-md shadow-md bg-slate-100 border">
                <div className="flex items-center justify-end max-h-[15%] w-full gap-6 bg-white rounded-lg shadow-md p-3 ">
                    {/* Date filter */}
                    <select name="date" onChange={handleFilterChange}>
                        <option value="">All Dates</option>
                        {/* Populate options dynamically based on available dates */}
                    </select>
                    {/* Status filter */}
                    <select name="status" onChange={handleFilterChange}>
                        <option value="">All Status</option>
                        <option value="pending">Pending</option>
                        <option value="completed">Completed</option>
                        {/* Add more status options as needed */}
                    </select>
                    <CreateCarSheet />
                </div>
                <div className="w-full h-full">
                    {/* Display filtered appointments */}
                    {filteredAppointments.map(appointment => (
                        <div key={appointment.id}>
                            {/* Render each appointment */}
                            <p>{appointment.description}</p>
                            {/* Add more details as needed */}
                        </div>
                    ))}
                </div>
            </div>
        </ClientLayout>
    );
}

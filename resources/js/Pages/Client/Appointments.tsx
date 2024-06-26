import React, { useState, useEffect } from "react";
import ClientLayout from "@/Layouts/ClientLayout";
import { AuthData, Appointment, Vehicle } from "@/types";
import CreateAppointmentSheet from "./create_app_sheet";
import AppointmentCard from "./AppointmentCard";

interface AppointmentsProps {
    auth: AuthData;
    appointments: Appointment[];
    vehicles: Vehicle[];
}

export default function Appointments({ auth, appointments, vehicles }: AppointmentsProps) {
    console.log(appointments);
    const [filteredAppointments, setFilteredAppointments] = useState<Appointment[]>(appointments || []);
    const [filters, setFilters] = useState({
        date: "",
        status: ""
    });

    useEffect(() => {
        const filtered = appointments.filter(appointment =>
            (!filters.date || new Date(appointment.date).toISOString().slice(0, 10) === filters.date) &&
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
                <div className="flex items-center justify-end max-h-[15%] w-full gap-6 bg-white rounded-lg shadow-md p-3">
                    <select name="date" onChange={handleFilterChange}>
                        <option value="">All Dates</option>
                        {/* Populate options dynamically based on available dates */}
                    </select>
                    <select name="status" onChange={handleFilterChange}>
                        <option value="">All Status</option>
                        <option value="pending">Pending</option>
                        <option value="accepted">Accepted</option>
                        {/* Add more status options as needed */}
                    </select>
                    <CreateAppointmentSheet vehicles={vehicles} />
                </div>
                <div className="custom-scrollbar w-full h-full overflow-y-scroll  bg-white rounded-md shadow-md">
                    {filteredAppointments.length === 0 ? (
                        <p className="text-center text-gray-500">No appointments found.</p>
                    ) : (
                        <div className="grid grid-cols-3 p-3 gap-4"> {/* Add this div */}
                            {filteredAppointments.map(appointment => (
                                <AppointmentCard key={appointment.id} {...appointment} />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </ClientLayout>
    );
}

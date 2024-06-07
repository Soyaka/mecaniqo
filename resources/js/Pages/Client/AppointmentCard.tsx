import React from "react";
import { Appointment } from "@/types";
import { MdOutlineUpdate } from "react-icons/md";

export default function AppointmentCard(appointment: Appointment) {
    const formattedDate = new Date(appointment.date).toLocaleDateString();
    const formattedTime = new Date(appointment.date).toLocaleTimeString();
    return (
        <div className="p-2 flex h-fit flex-col items-center rounded-md cursor-pointer   border gap-3 ">
            <div>
                <img
                    src={`storage/${appointment.vehicle?.photos[0].replace(
                        "public/",
                        ""
                    )}`}
                    className="w-[17rem] h-[12rem] bg-cover rounded-lg "
                />
            </div>
            <div className=" relative left-2 flex gap-3 items-center">
                <h1 className="text-gray-800 font-bold tracking-wide">
                    {appointment.vehicle?.brand}
                </h1>
                <h1 className="text-red-800 font-bold tracking-widest">
                    {appointment.vehicle?.registration_number}
                </h1>
                <h1
                    className={` font-bold tracking-widest ${
                        appointment.status === "pending"
                            ? "text-yellow-500"
                            : "text-green-700"
                    } `}
                >
                    {appointment.status}
                </h1>
            </div>

            <div className="relative ">
                <h1 className="text-gray-800   flex gap-2 items-center tracking-wide">
                    <MdOutlineUpdate size={20} />

                    <span className="text-sm">{formattedDate} {formattedTime}</span>
                </h1>
            </div>

            <div className="relative left-4 "></div>
        </div>
    );
}

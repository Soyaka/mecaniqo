import React from "react";
import { Inertia } from "@inertiajs/inertia";

import { MechanicsProps, User } from "@/types";
import { IoIosAddCircleOutline } from "react-icons/io";
import CreateMechanic from "./CreateMechanic";
export default function MechanicsMain({ mechanics }: MechanicsProps) {
    const [search, setSearch] = React.useState("");
    const [filteredMechanics, setFilteredMechanics] = React.useState(mechanics || []);

    const handleDelete = (id: number) => {
        if (confirm("Are you sure you want to delete this mechanic?")) {
            Inertia.post(`/mechanics/${id}`, { _method: "delete" });
            setFilteredMechanics(filteredMechanics.filter(mechanic => mechanic.id !== id));
        }
    };

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const searchTerm = e.target.value;
        setSearch(searchTerm);
        const filtered = mechanics.filter((mechanic) =>
            mechanic.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredMechanics(filtered);
    };

    const addMechanic = async(newMechanic : User) => {
        setFilteredMechanics(prevMechanics => [...prevMechanics, newMechanic]);
        window.location.reload();
    };

    return (
        <div className="w-full flex flex-col p-4 gap-6 justify-start rounded-md shadow-md bg-slate-100 border overflow-y-scroll">
            <div className="flex w-full h-24 bg-white shadow rounded-lg items-center p-3 gap-20 justify-end ">
                <input
                    type="text"
                    placeholder="Search"
                    className="rounded-full p-2 px-8 border border-gray-800 focus:outline-none"
                    value={search}
                    onChange={handleSearch}
                />
                <CreateMechanic addmechanic={addMechanic}>
                    <button
                        className="p-2 rounded-xl flex items-center border hover:bg-gray-800 hover:text-white border-gray-800 justify-center text-gray-800 font-semibold"
                    >
                        <IoIosAddCircleOutline size={25} /> Add New
                    </button>
                </CreateMechanic>
            </div>
            <div className="w-full h-full flex flex-col gap-2 bg-white rounded-lg shadow p-3">
                {filteredMechanics.map((mechanic) => (
                    <div key={mechanic.id} className="w-full h-16 flex justify-between bg-white shadow rounded-lg items-center p-3 gap-20">
                        <div>
                            <h1 className="text-lg font-semibold">{mechanic.name}</h1>
                            <p className="text-sm font-light text-gray-600">{mechanic.email}</p>
                        </div>
                        <div className="flex flex-col items-center justify-center">
                            <h2 className="text-sm font-semibold text-gray-800">{mechanic.role}</h2>
                            <p className="text-sm font-light text-gray-600">Joined: {new Date(mechanic.created_at).toLocaleDateString()}</p>
                        </div>
                        <button className="text-red-600 hover:text-red-800" onClick={() => handleDelete(mechanic.id)}>Delete</button>
                    </div>
                ))}
            </div>
        </div>
    );
}

import React from "react";
import { Inertia } from "@inertiajs/inertia";
import CreateUser from "./CreateUser";
import { UsersProps } from "@/types";
import { IoIosAddCircleOutline } from "react-icons/io";

export default function UsersMain({ clients }: UsersProps) {
    const [search, setSearch] = React.useState("");
    const [filteredClients, setFilteredClients] = React.useState(clients);

    const handleDelete = (id: number) => {
        if (confirm("Are you sure you want to delete this user?")) {
            Inertia.post(`/users/${id}`, { _method: "delete" });
            setFilteredClients(filteredClients.filter(client => client.id !== id));
        }
    };

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const searchTerm = e.target.value;
        setSearch(searchTerm);
        const filtered = clients.filter((client) =>
            client.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredClients(filtered);
    };

    const addUser = async(newUser : any) => {
        setFilteredClients(prevClients => [...prevClients, newUser]);
        window.location.reload();
    };

    return (
        <div className="w-full flex flex-col p-4 gap-6 justify-start rounded-md shadow-md bg-slate-100 border ">
            <div className="flex w-full h-24 bg-white shadow rounded-lg items-center p-3 gap-20 justify-end ">
                <input
                    type="text"
                    placeholder="Search"
                    className="rounded-full p-2 px-8 border border-gray-800 focus:outline-none"
                    value={search}
                    onChange={handleSearch}
                />
                <CreateUser addUser={addUser}>
                    <button
                        className="p-2 rounded-xl flex items-center border hover:bg-gray-800 hover:text-white border-gray-800 justify-center text-gray-800 font-semibold"
                    >
                        <IoIosAddCircleOutline size={25} /> Add New
                    </button>
                </CreateUser>
            </div>
            <div className="w-full h-full flex flex-col gap-2 bg-white rounded-lg shadow p-3 overflow-y-scroll">
                {filteredClients.map((client) => (
                    <div key={client.id} className="w-full h-16 flex justify-between bg-white shadow rounded-lg items-center p-3 gap-20">
                        <div>
                            <h1 className="text-lg font-semibold">{client.name}</h1>
                            <p className="text-sm font-light text-gray-600">{client.email}</p>
                        </div>
                        <div className="flex flex-col items-center justify-center">
                            <h2 className="text-sm font-semibold text-gray-800">{client.role}</h2>
                            <p className="text-sm font-light text-gray-600">Joined: {new Date(client.created_at).toLocaleDateString()}</p>
                        </div>
                        <button className="text-red-600 hover:text-red-800" onClick={() => handleDelete(client.id)}>Delete</button>
                    </div>
                ))}
            </div>
        </div>
    );
}

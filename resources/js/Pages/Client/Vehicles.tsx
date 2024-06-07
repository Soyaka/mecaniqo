import React, { useState } from "react";
import ClientLayout from "@/Layouts/ClientLayout";
import { AuthData, Vehicle } from "@/types";
import AddCarForm from "./AddCarForm";
import VehiclesLister from "./VehiclesLister";
import  CreateCarSheet  from "./CreateCarSheet";
export default function Vehicles({
    auth,
    vehicles,
}: {
    auth: AuthData;
    vehicles: Vehicle[];
}) {
    const [search, setSearch] = useState("");
    const [filtredVehicles, setFiltredVehicles] = React.useState(
        vehicles || []
    );

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const searchTerm = e.target.value;
        setSearch(searchTerm);
        const filtered = vehicles.filter((vehicle) =>
            vehicle.brand.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFiltredVehicles(filtered);
    };
    return (
        <ClientLayout auth={auth}>
            <div className="w-full flex flex-col p-4 gap-6 justify-start rounded-md shadow-md bg-slate-100 border">
                <div className="flex items-center justify-end max-h-[15%] w-full gap-6 bg-white rounded-lg shadow-md p-3 ">
                    <input
                        className="w-[15rem] rounded-full px-4 "
                        type="text"
                        placeholder="Search"
                        onChange={handleSearch}
                    />
                    <CreateCarSheet />
                </div>
                <div className="w-full h-full ">
                    <VehiclesLister vehicles={filtredVehicles} />
                </div>
            </div>
        </ClientLayout>
    );
}

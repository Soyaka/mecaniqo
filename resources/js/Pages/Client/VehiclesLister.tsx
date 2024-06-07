import React from 'react'
import { Vehicle } from '@/types';
export default function VehiclesLister( {vehicles}: {vehicles: Vehicle[]}) {
  return (
    <div className=" custom-scrollbar w-full h-full overflow-y-scroll flex flex-col p-4 gap-6 justify-start rounded-md shadow-md bg-white border">
        <h1 className="text-lg font-light text-slate-600"> My Vehicles</h1>
        {vehicles.map((vehicle) => (
            <div key={vehicle.id} className="flex flex-row items-center gap-4">
                <img src={`/storage/app/${vehicle.photos[0]}`} 
                className="w-12 h-12 rounded-lg" />
                <h1 className="text-gray-800 font-bold">{vehicle.brand}</h1>
                <div className="flex flex-row gap-4 items-center">
                    <span className="text-gray-500 text-sm">{vehicle.model}</span>
                    <span className="text-gray-500 text-sm">{vehicle.registration_number}</span>
                    <span className="text-gray-500 text-sm">{vehicle.fuel_type}</span>
                </div>
            </div>
        ))}
    </div>
  )
}

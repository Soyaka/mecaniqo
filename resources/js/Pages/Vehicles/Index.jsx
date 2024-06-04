import React from 'react';
import bgImage from '../repairs/select.jpg'; 
import NavBar from './Navbar';

function Index({ vehicles , auth, notifications }) {
    return (
      <div>
        {/* <Nav></Nav> */}
        <NavBar auth={auth.user} notifications={notifications} />
        <div className="grid grid-cols-3 gap-4 bg-gray-800">
      {{ vehicles }.vehicles.map((vehicle) => (
        <div key={vehicle.id} className="m-4 bg-gray-900  p-6 rounded-lg">
          <img className="w-full h-48 object-cover" src={`/storage/${vehicle.photos}`} alt="Vehicle" />
          <div className="px-6 py-4">
            <div className="font-bold text-xl text-gray-300 mb-2">{vehicle.make}</div>
            <p className="font-bold text-xl text-gray-300 mb-2">Model: {vehicle.model}</p>
            <p className="font-bold text-xl text-gray-300 mb-2">Fuel Type: {vehicle.fuelType}</p>
            <p className="font-bold text-xl text-gray-300 mb-2">Registration: {vehicle.registration}</p>
                    </div>
                </div>
            ))}
        </div>
          </div>
    );
}

export default Index;
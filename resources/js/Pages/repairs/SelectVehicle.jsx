import { Inertia } from '@inertiajs/inertia';
import bgImage from './select.jpg'; 
import NavBar from './Navbar';

const SelectVehicle = ({ vehicles , auth, notifications}) => {
  console.log(vehicles);
  const handleSelect = (vehicleId) => {
    Inertia.get(`/repair-request/${vehicleId}`);
  };

  return (
    <div>
      <NavBar auth={auth.user} notifications={notifications}/>
    <div className="grid grid-cols-3 gap-4 bg-slate-800" >
      {vehicles.map((vehicle) => (
        <div key={vehicle.id} className="m-4 bg-slate-900  p-6 rounded-lg hover:cursor-pointer ">
          <img className="w-full h-48 object-cover" src={`/storage/${vehicle.photos}`} alt="Vehicle" />
          <div className="px-6 py-4">
            <div className="font-bold text-xl text-gray-200 mb-2">{vehicle.make}</div>
            <p className="font-bold text-xl text-gray-200 mb-2">Model: {vehicle.model}</p>
            <p className="font-bold text-xl text-gray-200 mb-2">Fuel Type: {vehicle.fuelType}</p>
            <p className="font-bold text-xl text-gray-200 mb-2">Registration: {vehicle.registration}</p>
            <button  
              onClick={() => handleSelect(vehicle.id)}
              className="bg-slate-600 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded mx-auto w-full text-center mt-4"
            >
              Select
            </button>
          </div>
        </div>
      ))}
      </div>
    </div>
  );
};

export default SelectVehicle;
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { useState, useEffect } from 'react';
import { FaBell } from 'react-icons/fa';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { faSync } from '@fortawesome/free-solid-svg-icons';
import { Inertia } from '@inertiajs/inertia';
import { Head } from '@inertiajs/react';
import { InertiaLink } from '@inertiajs/inertia-react';
import NavBar from './Navbar';
function Modal({ messages, onClose }) {
    console.log(messages)
    return (
        <div className="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
            <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true" onClick={onClose}></div>
                <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
                <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                    {/* ... rest of your code ... */}
                    <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                        <div className="sm:flex sm:items-start">
                            <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                                    Notifications
                                </h3>
                                <div className="mt-2">
                                    {messages && messages.length > 0 ? (
                                        messages.map((message, index) => (
                                            <div key={index}>
                                                <p className="text-sm text-gray-500">
                                                    {message.content}
                                                </p>
                                                {index < messages.length - 1 && <hr />}
                                            </div>
                                        ))
                                    ) : (
                                        <p className="text-sm text-gray-500">
                                            No notifications
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                        <button type="button" className="mt-3 w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm" onClick={onClose}>
                            Close
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

function Sidebar() {
    return (
        <div style={{ backgroundColor: '#161D32' }} className="w-64 min-h-screen text-white p-6">
            <ul className="space-y-4">
                <li className="transition duration-300 hover:bg-gray-700 p-2 rounded">
                <InertiaLink className="text-lg text-white hover:text-gray-200" href="/add-vehicle"><strong>Add Vehicles</strong></InertiaLink>
                </li>
                <li className="transition duration-300 hover:bg-gray-700 p-2 rounded">
                    <InertiaLink className="text-lg text-white hover:text-gray-200" href="/my-vehicles"><strong>My Vehicles</strong></InertiaLink>
                </li>
                <li className="transition duration-300 hover:bg-gray-700 p-2 rounded">
                    <InertiaLink className="text-lg text-white hover:text-gray-200" href="/select-vehicle"><strong>Repair Request</strong></InertiaLink>
                </li>
                <li className="transition duration-300 hover:bg-gray-700 p-2 rounded">
                    <InertiaLink className="text-lg text-white hover:text-gray-200" href="/repairs-history"><strong> Repairs History</strong></InertiaLink>
                </li>
            </ul>
        </div>
    );
}






export default function MiniDsh({ auth, notifications, repair, repairs }) {
    // if (!repair)
    let reps = repairs || [
        {
          id: 0,
          description: "",
          status: "",
          clientNotes: "",
          created_at: "",
          endDate: "",
          mechanicID: 0,
          mechanicNotes: "",
          startDate: "",
          updated_at: "",
          vehicleID: 0
        }
      ];
      let rep = repair || {
        id: 0,
          description: "",
          status: "",
          clientNotes: "",
          created_at: "",
          endDate: "",
          mechanicID: 0,
          mechanicNotes: "",
          startDate: "",
          updated_at: "",
          vehicleID: 0
      };
    console.log("test", repairs);
    const [isModalVisible, setModalVisible] = useState(false);

    const handleNotificationClick = () => {
        setModalVisible(true);
    }

    return (
        // <AuthenticatedLayout
        //     user={auth}
        //     header={
        //         <div className="flex justify-between items-center">
        //             <h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>
        //             <FaBell
        //                 onClick={handleNotificationClick}
        //                 className="text-blue-500 hover:text-blue-700 cursor-pointer"
        //             />
        //         </div>
        //     }
        // >
        <div>
            <NavBar auth={auth} notifications={notifications} />
            <Head title="Dashboard" />
            <div className="flex">

                {auth.role === 'client' && <Sidebar />}
                {/* pp */}
                <div className="relative w-full h-screen">
                    <img src="/background_.jpg" alt="" className="absolute inset-0 h-full w-full object-cover z-0" />
                    <div className="py-12 flex-grow relative z-10">
                        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                            <div className="flex flex-col gap-6">
                                <div className="bg-white opacity-85 overflow-hidden shadow-sm sm:rounded-lg">

                                    {auth.role === 'client' && (
                                        <div className="p-6 bg-white rounded shadow">

                                            <h2 className="text-3xl font-semibold text-gray-700">Welcome, {auth.name}!</h2>
                                            <p className="mt-2 text-2xl text-gray-600"><strong>Your space to request your repair easily !</strong> </p>
                                        </div>

                                    )}
                                </div>
                                <div className='flex gap-3'>
                                    <div className="bg-white opacity-85 overflow-hidden shadow-sm sm:rounded-lg w-full max-w-3xl md:w-1/3">
                                        {/* {auth.role === 'client' && ( */}
                                            {repair != null ?
                                                <div className="p-6 bg-white rounded shadow">
                                                  <h2 className="text-3xl font-semibold text-gray-700">Latest Repair</h2>
                                                  <p className="mt-2 text-2xl text-gray-600"><strong>Repair ID:</strong> {rep?.id ?? 0}</p>
                                                  <p className="text-2xl text-gray-600"><strong>Description:</strong> {rep?.description ?? ""}</p>
                                                  <p className="text-2xl text-gray-600"><strong>Start Date:</strong> {new Date(rep?.startDate ?? "").toLocaleDateString()}</p>
                                                  <p className="text-2xl text-gray-600"><strong>End Date:</strong>{new Date(rep?.endDate ?? "").toLocaleDateString()}</p>
                                                </div>
                                              : 
                                              <div className="p-6 bg-white rounded shadow flex flex-col items-center justify-center">
                                                  <h2 className="text-3xl font-semibold text-gray-700">Latest Repair</h2>
                                                   <p className="mt-4 text-2xl text-gray-600"><strong>No repair</strong> </p>
                                                  {/* <p className="text-2xl text-gray-600"><strong>Description:</strong> {rep?.description ?? ""}</p>
                                                  <p className="text-2xl text-gray-600"><strong>Start Date:</strong> {new Date(rep?.startDate ?? "").toLocaleDateString()}</p>
                                                  <p className="text-2xl text-gray-600"><strong>End Date:</strong>{new Date(rep?.endDate ?? "").toLocaleDateString()}</p> */}
                                                </div>}
                                        {/* )} */}
                                    </div>
                                    <div className="bg-white opacity-85 overflow-hidden shadow-sm sm:rounded-lg w-full max-w-3xl md:w-1/3">
                                        {auth.role === 'client' && reps && (
                                            <div className="p-6 bg-white rounded shadow flex ">
                                                <FontAwesomeIcon icon={faCheckCircle} className="text-green-500 mt-2 mr-2 h-6 w-6" />
                                                <div className='flex flex-col center gap-9 md-4 items-center'>
                                              <h2 className="text-3xl font-semibold text-gray-700">completed Repairs</h2>
                                              <div className='flex'>

                                              <h1 className="text-2xl  font-semibold text-gray-700">{reps.filter((e) => e.status === 'completed').length} repair</h1>
                                              </div>
                                            </div>
                                            </div>
                                        )}
                                    </div>
                                    <div className="bg-white opacity-85 overflow-hidden shadow-sm sm:rounded-lg w-full max-w-3xl md:w-1/3">
                                        {auth.role === 'client' && reps && (
                                        <div className="p-6 bg-white rounded shadow flex">
                                            <FontAwesomeIcon icon={faSync} className="text-orange-500 animate-spin mt-2 mr-2 h-6 w-6" />
                                            <div className='flex flex-col center gap-9 items-center'>
                                              <h2 className="text-3xl font-semibold text-gray-700">Pending Repairs</h2>
                                              <div className='flex'>

                                              <h1 className="text-2xl  font-semibold text-gray-700">{reps.filter((e) => e.status === 'pending').length} repair</h1>
                                              </div>
                                            </div>
                                          </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>



            </div>
            {isModalVisible && <Modal messages={notifications} onClose={() => setModalVisible(false)} />}
        {/* </AuthenticatedLayout> */}
        </div>
    );
}
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { useState , useEffect} from 'react';
import { FaBell } from 'react-icons/fa';
import { Inertia } from '@inertiajs/inertia';

// import {MiniDsh} from './MiniDsh';
import axios from 'axios';

import { Head } from '@inertiajs/react';
import { InertiaLink } from '@inertiajs/inertia-react';
function Modal({ message, onClose }) {
    const stopPropagation = (e) => e.stopPropagation();

    return (
        <div className="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true" onClick={onClose}>
            <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0" onClick={stopPropagation}>
                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
                <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
                <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                    <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                        <div className="sm:flex sm:items-start">
                            <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                                    Notification
                                </h3>
                                <div className="mt-2">
                                    <p className="text-sm text-gray-500">
                                        {message}
                                    </p>
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
        <div className="w-64 min-h-screen bg-gray-200 p-6">
            <ul className="space-y-4">
                <li>
                    <a href="/add-vehicle" className="text-lg text-indigo-600 hover:text-indigo-900">Add Vehicle</a>
                </li>
                <li>
                    <InertiaLink className="text-lg text-indigo-600 hover:text-indigo-900" href="/my-vehicles">My Vehicles</InertiaLink>
                </li>
                <li>
                    <InertiaLink className="text-lg text-indigo-600 hover:text-indigo-900" href="/select-vehicle">repair-request</InertiaLink>
                </li>
                <li>
                    <InertiaLink className="text-lg text-indigo-600 hover:text-indigo-900" href="/repairs-history">repairs-history</InertiaLink>
                </li>
            </ul>
        </div>
    );
}

export default function Dashboard({ auth }) {

    const user = auth.user;
    // console.log("ehuif", user.id);
    Inertia.get(`/ndashboard/${user.id}`);
    console.log(auth);
    // const {user, notifications} = auth;
    console.log(user);
    axios.defaults.baseURL = 'http://localhost:8000';
    const [isSidebarVisible, setSidebarVisible] = useState(true);
    const [isModalVisible, setModalVisible] = useState(false);
    // const [notifications, setNotifications] = useState([]);
const userId = auth.user.id;



    return (
        <></>
    );
}
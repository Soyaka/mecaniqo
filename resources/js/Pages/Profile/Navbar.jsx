import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { useState, useEffect, useRef } from 'react';
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
import logo from '../Admin/logo_-removebg-preview.png';
import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import { Link } from '@inertiajs/react';
function Modal({ messages, onClose }) {
    console.log(messages)
    return (
        <div className="fixed z-50 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">

            <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true" onClick={onClose}></div>
                <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
                <div className="inline-block align-bottom bg-gray-900 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                    <div className="bg-gray-900  text-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">

                        <div className="sm:flex sm:items-start">

                            <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">

                                <h3 className="text-lg  leading-6 font-medium text-white" id="modal-title">
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
                    <div className="bg-gray-900 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                        <button type="button" className="mt-3 w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm" onClick={onClose}>
                            Close
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

function NavBar({ auth, notifications }) {
    const [isModalVisible, setModalVisible] = useState(false);
    const dsh = '/ndashboard/' + auth.id;
    const img = `https://api.dicebear.com/8.x/thumbs/svg?seed=${auth.name}`;
    const handleNotificationClick = () => {
        setModalVisible(true);
    }
    const [dropdownVisible, setDropdownVisible] = useState(false);

    const toggleDropdown = () => {
        setDropdownVisible(!dropdownVisible);
    };
    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setDropdownVisible(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);


    return (
        <nav className="bg-white border-gray-200 h-20 dark:bg-gray-900">
            <div className="relative" ref={dropdownRef}>
            <div className="max-w-screen-xl flex items-center justify-between mx-auto p-4">
                <a href="#" className="flex items-center space-x-3 rtl:space-x-reverse">
                    <img src={logo} className="h-8" alt="Flowbite Logo" />
                    <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Garagiste</span>
                </a>

                <div className="flex items-center space-x-9">
                    <FaBell
                        onClick={handleNotificationClick}
                        className="text-gray-400  w-5 h-5 hover:text-gray-100 cursor-pointer"
                    />
                    <div className="relative">
                        <button
                            type="button"
                            className="flex text-sm bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-900"
                            id="user-menu-button"
                            aria-expanded={dropdownVisible}
                            onClick={toggleDropdown}
                        >
                            <span className="sr-only">Open user menu</span>

                            <img className="w-10 h-10 rounded-full" src={img} alt="user photo" />
                        </button>
                        {dropdownVisible && (
                            <div className="absolute right-0 mt-2 w-48 z-50 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600" id="user-dropdown">
                                <div className="px-4 py-3">
                                    <span className="block text-sm text-gray-500 truncate dark:text-gray-400">{auth.email}</span>
                                </div>
                                <ul className="py-2" aria-labelledby="user-menu-button">

                                    <li>
                                        <a href="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Settings</a>
                                    </li><li>
                                        <a href={dsh} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Dashboard</a>
                                    </li>

                                    <li>
                                        <Dropdown.Link className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white" href={route('logout')} method="post" as="button">
                                            Log Out
                                        </Dropdown.Link>
                                    </li>
                                </ul>
                            </div>
                        )}
                    </div>
                </div>

            </div>
            </div>
            {isModalVisible && <Modal messages={notifications} onClose={() => setModalVisible(false)} />}
        </nav>
    );
}
export default NavBar;
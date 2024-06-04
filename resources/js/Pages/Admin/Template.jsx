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
import logo from './logo_-removebg-preview.png';
import Dropdown from '@/Components/Dropdown';
import NavBar from './Navbar'
import Adduser from './Adduser'
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import { Link } from '@inertiajs/react';
import Chart from 'chart.js/auto';
function Sidebar({handleAddClient}) {
    return (
        <div style={{ backgroundColor: '#161D32' }} className="w-64 min-h-screen text-white p-6 overflow-y-auto">
            <ul className="space-y-4">
                <li className="transition duration-300 hover:bg-gray-700 p-2 rounded">
                    <InertiaLink className="text-lg text-white hover:text-gray-200" onClick={handleAddClient('ADD_CLIENT')}><strong> Add Client</strong></InertiaLink>
                </li>
                <li className="transition duration-300 hover:bg-gray-700 p-2 rounded">
                    <InertiaLink className="text-lg text-white hover:text-gray-200" href="/admin/users"><strong> delete Client</strong></InertiaLink>
                </li>
                <li className="transition duration-300 hover:bg-gray-700 p-2 rounded">
                    <InertiaLink className="text-lg text-white hover:text-gray-200" href="/admin/add/mecanic"><strong>Add Mechanic</strong></InertiaLink>
                </li>
                <li className="transition duration-300 hover:bg-gray-700 p-2 rounded">
                    <InertiaLink className="text-lg text-white hover:text-gray-200" href="/admin/repairs/new-requests"><strong>New Repair Request</strong></InertiaLink>
                </li>
                <li className="transition duration-300 hover:bg-gray-700 p-2 rounded">
                    <InertiaLink className="text-lg text-white hover:text-gray-200" href="/admin/mechanics"><strong>Delete Mechanics</strong></InertiaLink>
                </li>
                <li className="transition duration-300 hover:bg-gray-700 p-2 rounded">
                    <InertiaLink className="text-lg text-white hover:text-gray-200" href="/admin/repairs/completed"><strong>Completed Repairs</strong></InertiaLink>
                </li>
                <li className="transition duration-300 hover:bg-gray-700 p-2 rounded">
                    <InertiaLink className="text-lg text-white hover:text-gray-200" href="/admin/repairs/requests"><strong>Pending Repairs</strong></InertiaLink>
                </li>
            </ul>
        </div>
    );
}
export default function Template({ auth, notifications }) {
    console.log('Template', auth, notifications);
    const handleAddClient = (condition) => 
    {
        if (condition === 'ADD_CLIENT')
            setData(<Adduser auth={auth} notifications={notifications} />);
    }
    const [data, setData] = useState(null);
    return(
        <div>
                <NavBar auth={auth.user} notifications={notifications} />
                <Sidebar handleAddClient={handleAddClient} />
                {data}


        </div>
    );
}
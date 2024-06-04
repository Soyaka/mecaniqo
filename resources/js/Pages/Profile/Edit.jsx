import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import DeleteUserForm from './Partials/DeleteUserForm';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';
import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import { Link } from '@inertiajs/react';
import { Head } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import NavBar from '../Client/Navbar';

export default function Edit({ auth, mustVerifyEmail, status }) {
    console.log("test" ,auth.user);
    return (
        <div>
            <NavBar auth={auth.user} />
            <Head title="Profile" />

            <div className="py-12 bg-gray-800">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    <div className="p-4 sm:p-8 bg-gray-900 shadow sm:rounded-lg">
                        <UpdateProfileInformationForm
                            mustVerifyEmail={mustVerifyEmail}
                            status={status}
                            className="max-w-xl text-white"
                        />
                    </div>

                    <div className="p-4 sm:p-8 bg-gray-900 shadow sm:rounded-lg">
                        <UpdatePasswordForm className="max-w-xl text-white" />
                    </div>

                    <div className="p-4 sm:p-8 bg-gray-900 shadow sm:rounded-lg">
                        <DeleteUserForm className="max-w-xl text-white" />
                    </div>
                </div>
            </div>
        </div>
    );
}

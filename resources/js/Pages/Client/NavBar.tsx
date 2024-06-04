import React, { useState } from 'react';
import { Link } from '@inertiajs/react';
import Dropdown from '@/Components/Dropdown';
import { User } from '@/types';

interface ClientNavBarProps {
  auth: { user: User };
  currentPage: string; // Assuming currentPage is passed to indicate the current page
}

const ClientNavBar: React.FC<ClientNavBarProps> = ({ auth, currentPage }) => {
  const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);
  const user = auth.user;
  currentPage = currentPage || 'dashboard';
  
  const toggleNavigationDropdown = () => {
    setShowingNavigationDropdown((prev) => !prev);
  };

  return (
    <div className="bg-gray-800 h-full w-64 fixed top-0 left-0 flex flex-col">
      <div className="flex-shrink-0 flex items-center justify-center h-16 bg-gray-900">
        <Link href="/">
          <img
            className="h-8 w-8"
            src="https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg"
            alt="Workflow"
          />
        </Link>
      </div>
      <div className="flex flex-col flex-grow overflow-y-auto">
        <nav className="flex-1 px-2 py-4 space-y-1">
          <Link
            href="/dashboard"
            className={`${
              currentPage === 'dashboard' ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'
            } px-3 py-2 rounded-md text-sm font-medium`}
          >
            Dashboard
          </Link>
          <Link
            href="/cars"
            className={`${
              currentPage === 'cars' ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'
            } px-3 py-2 rounded-md text-sm font-medium`}
          >
            My Cars
          </Link>
          <Link
            href="/appointments"
            className={`${
              currentPage === 'appointments' ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'
            } px-3 py-2 rounded-md text-sm font-medium`}
          >
            Appointments
          </Link>
          <Link
            href="/invoices"
            className={`${
              currentPage === 'invoices' ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'
            } px-3 py-2 rounded-md text-sm font-medium`}
          >
            Invoices
          </Link>
        </nav>
        <div className="flex-shrink-0 p-4">
          {/* Profile dropdown */}
          <Dropdown>
            <Dropdown.Trigger>
              <button
                type="button"
                onClick={toggleNavigationDropdown}
                className="flex items-center text-gray-400 hover:text-white"
              >
                <span className="sr-only">Open user menu</span>
                <img
                  className="h-8 w-8 rounded-full"
                  // src={user.profileImageUrl} // Assuming user.profileImageUrl is available
                  alt=""
                />
              </button>
            </Dropdown.Trigger>

            {showingNavigationDropdown && (
              <Dropdown.Content>
                <Dropdown.Link href={route('profile.edit')}>
                  Profile
                </Dropdown.Link>
                <Dropdown.Link href={route('logout')} method="post" as="button">
                  Log Out
                </Dropdown.Link>
              </Dropdown.Content>
            )}
          </Dropdown>
        </div>
      </div>
    </div>
  );
}

export default ClientNavBar;

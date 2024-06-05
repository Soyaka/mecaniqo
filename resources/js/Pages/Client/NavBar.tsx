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
    <div>
      
    </div>
  );
}

export default ClientNavBar;

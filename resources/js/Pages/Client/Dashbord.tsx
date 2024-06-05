import React, { useState, useEffect } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { PageProps } from '@/types';
import ClientNavBar from './NavBar';
import axios from 'axios'; // Assuming you're using axios for HTTP requests

interface Car {
  id: number;
  brand: string;
  model: string;
  year: number;
  // Add more car properties as needed
}

interface Appointment {
  id: number;
  date: Date;
  description: string;
  // Add more appointment properties as needed
}

interface Invoice {
  id: number;
  amount: number;
  description: string;
  status: string;
  // Add more invoice properties as needed
}

const ClientDashboard = ({ auth }: PageProps) => {
  const [cars, setCars] = useState<Car[]>([]);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [invoices, setInvoices] = useState<Invoice[]>([]);



  return (

      <div className="">

      </div>
  );
};

export default ClientDashboard;

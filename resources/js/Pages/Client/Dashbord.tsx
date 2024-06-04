import React, { useState, useEffect } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { PageProps } from '@/types';
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

  useEffect(() => {
    // Fetch user's cars
    axios.get('/api/cars')
      .then(response => {
        setCars(response.data);
      })
      .catch(error => {
        console.error('Error fetching cars:', error);
      });

    // Fetch user's appointments
    axios.get('/api/appointments')
      .then(response => {
        setAppointments(response.data);
      })
      .catch(error => {
        console.error('Error fetching appointments:', error);
      });

    // Fetch user's invoices
    axios.get('/api/invoices')
      .then(response => {
        setInvoices(response.data);
      })
      .catch(error => {
        console.error('Error fetching invoices:', error);
      });
  }, []);

  return (

      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
            <div className="p-6 text-gray-900">
              <h3 className="text-lg font-semibold mb-4">Your Cars</h3>
              {cars.map(car => (
                <div key={car.id} className="mb-2">
                  <p>{car.brand} {car.model} ({car.year})</p>
                  {/* Display more car details as needed */}
                </div>
              ))}
              <h3 className="text-lg font-semibold mb-4">Your Appointments</h3>
              {appointments.map(appointment => (
                <div key={appointment.id} className="mb-2">
                  <p>{appointment.date.toDateString()}: {appointment.description}</p>
                  {/* Display more appointment details as needed */}
                </div>
              ))}
              <h3 className="text-lg font-semibold mb-4">Your Invoices</h3>
              {invoices.map(invoice => (
                <div key={invoice.id} className="mb-2">
                  <p>Amount: ${invoice.amount}</p>
                  <p>Description: {invoice.description}</p>
                  <p>Status: {invoice.status}</p>
                  {/* Display more invoice details as needed */}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
  );
};

export default ClientDashboard;

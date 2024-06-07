import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/Components/ui/sheet";
import React, { useState } from "react";
import { Inertia } from "@inertiajs/inertia";
import { Vehicle } from "@/types";

interface FormDataState {
  vehicle_id: string;
  description: string;
  date_time: string;
  images: File[];
}

interface Props {
  vehicles: Vehicle[];
}

export default function CreateAppointmentSheet({ vehicles }: Props) {
  const [formData, setFormData] = useState<FormDataState>({
    vehicle_id: "",
    description: "",
    date_time: "",
    images: [],
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, files } = event.target as HTMLInputElement & HTMLSelectElement;
    if (files) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: Array.from(files),
      }));
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));
    }
  };
  
  // Ensure date_time is in the correct format before sending it to the server
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  
    // Convert date_time to 'Y-m-d H:i:s' format
    const date_time = new Date(formData.date_time).toISOString().slice(0, 19).replace('T', ' ');
  
    const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute("content");
    if (!csrfToken) {
      console.error("CSRF token not found");
      return;
    }
  
    const formPayload = new FormData();
    formPayload.append("vehicle_id", formData.vehicle_id);
    formPayload.append("description", formData.description);
    formPayload.append("date_time", date_time);
    formData.images.forEach((image, index) => {
      formPayload.append(`images[${index}]`, image);
    });
  
    try {
      const response = await fetch("/appointments", {
        method: "POST",
        headers: {
          "X-CSRF-TOKEN": csrfToken,
        },
        body: formPayload,
      });
  
      if (!response.ok) {
        const contentType = response.headers.get("content-type");
        if (contentType && contentType.includes("application/json")) {
          const errorData = await response.json();
          console.error("Error response:", errorData);
          throw new Error("Network response was not ok");
        } else {
          const text = await response.text();
          console.error("Error response:", text);
          throw new Error("Expected JSON response");
        }
      }
      //relaod page 
      window.location.reload();
      console.log("Response:", response);
    } catch (error) {
      console.error("Error:", error);
    }
  };
  
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button className="hover:bg-green-900 border-none hover:outline-none outline-none hover:text-white" variant="outline">
          Add a new appointment
        </Button>
      </SheetTrigger>
      <SheetContent side="bottom">
        <SheetHeader>
          <SheetTitle>Add a new appointment</SheetTitle>
          <SheetDescription>Fill in your appointment information</SheetDescription>
        </SheetHeader>
        <div className="flex flex-col h-full items-center justify-center overflow-y-scroll">
          <h1 className="text-3xl font-bold mb-4">Appointments</h1>
          <div className="w-full max-w-2xl">
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <Label htmlFor="vehicle_id" className="block text-gray-700 font-bold mb-2">
                  Vehicle
                </Label>
                <select
                  id="vehicle_id"
                  name="vehicle_id"
                  value={formData.vehicle_id}
                  onChange={handleChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                >
                  <option value="">Select a vehicle</option>
                  {vehicles.map((vehicle) => (
                    <option key={vehicle.id} value={vehicle.id}>
                      {vehicle.brand} {vehicle.model} ({vehicle.registration_number})
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-4">
                <Label htmlFor="description" className="block text-gray-700 font-bold mb-2">
                  Description
                </Label>
                <Input
                  id="description"
                  name="description"
                  type="text"
                  placeholder="Description"
                  value={formData.description}
                  onChange={handleChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="mb-4">
                <Label htmlFor="date_time" className="block text-gray-700 font-bold mb-2">
                  Date and Time
                </Label>
                <Input
                  id="date_time"
                  name="date_time"
                  type="datetime-local"
                  placeholder="Date and Time"
                  value={formData.date_time}
                  onChange={handleChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="mb-4">
                <Label htmlFor="photos" className="block text-gray-700 font-bold mb-2">
                  Photos
                </Label>
                <Input
                  id="photos"
                  name="photos"
                  type="file"
                  multiple
                  onChange={handleChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <SheetFooter>
                <SheetClose asChild>
                  <Button type="submit" className="bg-green-800 hover:bg-green-800/75 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                    Save changes
                  </Button>
                </SheetClose>
              </SheetFooter>
            </form>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}

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

interface FormDataState {
  brand: string;
  model: string;
  fuel_type: string;
  registration_number: string;
  photos: File[];
}

export default function CreateCarSheet() {
  const [formData, setFormData] = useState<FormDataState>({
    brand: "",
    model: "",
    fuel_type: "",
    registration_number: "",
    photos: [],
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = event.target;
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

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const csrfToken = document
      .querySelector('meta[name="csrf-token"]')
      ?.getAttribute("content");
    if (!csrfToken) {
      console.error("CSRF token not found");
      return;
    }

    const formPayload = new FormData();
    formPayload.append("brand", formData.brand);
    formPayload.append("model", formData.model);
    formPayload.append("fuel_type", formData.fuel_type);
    formPayload.append("registration_number", formData.registration_number);
    formData.photos.forEach((photo, index) => {
      formPayload.append(`photos[${index}]`, photo);
    });

    try {
      const response = await fetch("/vehicles", {
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
          Add a new vehicle
        </Button>
      </SheetTrigger>
      <SheetContent side="bottom">
        <SheetHeader>
          <SheetTitle>Add a new vehicle</SheetTitle>
          <SheetDescription>Fill in your vehicle information</SheetDescription>
        </SheetHeader>
        <div className="flex flex-col h-full items-center justify-center overflow-y-scroll">
          <h1 className="text-3xl font-bold mb-4">Vehicles</h1>
          <div className="w-full max-w-2xl">
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <Label htmlFor="brand" className="block text-gray-700 font-bold mb-2">
                  Brand
                </Label>
                <Input
                  id="brand"
                  name="brand"
                  type="text"
                  placeholder="Brand"
                  value={formData.brand}
                  onChange={handleChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="mb-4">
                <Label htmlFor="model" className="block text-gray-700 font-bold mb-2">
                  Model
                </Label>
                <Input
                  id="model"
                  name="model"
                  type="text"
                  placeholder="Model"
                  value={formData.model}
                  onChange={handleChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="mb-4">
                <Label htmlFor="fuel_type" className="block text-gray-700 font-bold mb-2">
                  Fuel Type
                </Label>
                <Input
                  id="fuel_type"
                  name="fuel_type"
                  type="text"
                  placeholder="Fuel Type"
                  value={formData.fuel_type}
                  onChange={handleChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="mb-4">
                <Label htmlFor="registration_number" className="block text-gray-700 font-bold mb-2">
                  Registration Number
                </Label>
                <Input
                  id="registration_number"
                  name="registration_number"
                  type="text"
                  placeholder="Registration Number"
                  value={formData.registration_number}
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
                  <Button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
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

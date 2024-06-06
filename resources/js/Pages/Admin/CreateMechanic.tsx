import React, { useState, ReactNode, ChangeEvent, FormEvent } from "react";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import { User } from "@/types";
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

type FormData = {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
    role: string;
};

type CreateUserProps = {
    children: ReactNode;
    addmechanic: (newmechanic: User) => void;
};

export default function CreateMechanic({
    children,
    addmechanic,
}: CreateUserProps) {
    const [formData, setFormData] = useState<FormData>({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
        role: "mechanic",
    });

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        const csrfTokenElement = document.querySelector(
            'meta[name="csrf-token"]'
        );
        if (!csrfTokenElement) {
            console.error("CSRF token not found");
            return;
        }

        const csrfToken = csrfTokenElement.getAttribute("content");
        if (!csrfToken) {
            console.error("CSRF token content not found");
            return;
        }

        try {
            const response = await fetch("/mechanics", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "X-CSRF-TOKEN": csrfToken,
                },
                body: JSON.stringify(formData),
            });

            console.log("Response status:", response.status);
            console.log("Response headers:", response.headers);

            const contentType = response.headers.get("Content-Type");
            if (
                response.ok &&
                contentType &&
                contentType.includes("application/json")
            ) {
                const newMechanic: User = await response.json();
                alert("User created successfully");
                addmechanic(newMechanic);
            } else {
                if (contentType && contentType.includes("application/json")) {
                    const errors = await response.json();
                    console.error("Error:", errors);
                } else {
                    const errorText = await response.text();
                    console.error("Error response is not JSON:", errorText);
                }
                alert("Failed to create user");
            }
        } catch (error) {
            console.error("Network error:", error);
        }
    };

    return (
        <Sheet>
            <SheetTrigger asChild>
                <div>{children}</div>
            </SheetTrigger>
            <SheetContent side="right">
                <SheetHeader>
                    <SheetTitle>Add New Client</SheetTitle>
                    <SheetDescription>
                        Add a new client. Click save when you're done.
                    </SheetDescription>
                </SheetHeader>
                <form onSubmit={handleSubmit}>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="name" className="text-right">
                                Name
                            </Label>
                            <Input
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                className="col-span-3"
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="email" className="text-right">
                                Email
                            </Label>
                            <Input
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                className="col-span-3"
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="password" className="text-right">
                                Password
                            </Label>
                            <Input
                                id="password"
                                name="password"
                                type="password"
                                value={formData.password}
                                onChange={handleInputChange}
                                className="col-span-3"
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label
                                htmlFor="password_confirmation"
                                className="text-right"
                            >
                                Confirm Password
                            </Label>
                            <Input
                                id="password_confirmation"
                                name="password_confirmation"
                                type="password"
                                value={formData.password_confirmation}
                                onChange={handleInputChange}
                                className="col-span-3"
                            />
                        </div>
                    </div>
                    <SheetFooter>
                        <SheetClose asChild>
                            <Button type="submit">Save changes</Button>
                        </SheetClose>
                    </SheetFooter>
                </form>
            </SheetContent>
        </Sheet>
    );
}

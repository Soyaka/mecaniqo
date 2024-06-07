import React, { useState } from "react";
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
import { Label } from "@/Components/ui/label";
import { RepairRequest } from "@/types";

export function SheetDemo({ children, RepReq }: { children: React.ReactNode; RepReq: RepairRequest }) {
    const [status, setStatus] = useState(RepReq.status);
    console.log(RepReq);

    const updateRequestStatus = async () => {
        try {
            const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute("content");

            const headers: Record<string, string> = {
                "Content-Type": "application/json",
            };

            if (csrfToken) {
                headers["X-CSRF-TOKEN"] = csrfToken;
            }

            const response = await fetch(`/repair-requests/${RepReq.id}/update-status`, {
                method: "PUT",
                headers,
                body: JSON.stringify({ status }),
            });

            console.log("Response status:", response.status);
            const text = await response.text();
            console.log("Response text:", text);

            if (response.status !== 200) {
                throw new Error("Failed to update status");
            }

            const data = JSON.parse(text);
            console.log(data);

            console.log("Status updated successfully");
        } catch (error) {
            console.error("Error updating status:", error);
        }
    };

    const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setStatus(e.target.value);
    };

    return (
        <Sheet>
            <SheetTrigger asChild>
                <div>{children}</div>
            </SheetTrigger>
            <SheetContent side="left">
                <SheetHeader>
                    <SheetTitle className="text-xl text-blue-950">Edit appointment</SheetTitle>
                    <SheetDescription>Make changes to this appointment as you like. Click save when you're done.</SheetDescription>
                </SheetHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="status" className="text-right">Status</Label>
                        <select
                            id="status"
                            className="col-span-3 rounded-md"
                            value={status}
                            onChange={handleStatusChange}
                        >
                            <option value="pending">Pending</option>
                            <option value="accepted">Accepted</option>
                            <option value="in_progress">In Progress</option>
                            <option value="completed">Completed</option>
                        </select>
                    </div>
                </div>
                <SheetFooter>
                    <SheetClose asChild>
                        <button type="button" onClick={updateRequestStatus}>Save changes</button>
                    </SheetClose>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    );
}

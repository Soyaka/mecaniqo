import React, { useState } from "react";
import axios from "axios";
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

export function SheetDemo({
    children,
    RepReq,
}: {
    children: React.ReactNode;
    RepReq: RepairRequest;
}) {
    const [status, setStatus] = useState(RepReq.status);


    const handleUpdateStatus = async () => {
        const repairRequestId = RepReq.id;
        try {
          const response = await axios.patch(`/repair-requests/${repairRequestId}/update-status`, {
            status: status
          });
          console.log('Status updated successfully', response.data);
        } catch (error) {
          console.error('There was an error updating the status!', error);
        }
        window.location.reload();
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
                    <SheetTitle className="text-xl text-blue-950">
                        Edit appointment
                    </SheetTitle>
                    <SheetDescription>
                        Make changes to this appointment as you like. Click save
                        when you're done.
                    </SheetDescription>
                </SheetHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="status" className="text-right">
                            Status
                        </Label>
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
                        <button type="button" onClick={handleUpdateStatus}>
                            Save changes
                        </button>
                    </SheetClose>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    );
}

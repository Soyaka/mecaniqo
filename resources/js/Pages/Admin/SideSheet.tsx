import React from "react";
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


interface Appointment {
    id: number;
    name: string;
    time: string;
    date: string;
    status: string;
    description: string;
}


export function SheetDemo({ children, props  }: { children: React.ReactNode , props: Appointment }) {
    return (
        <Sheet>
            <SheetTrigger asChild>
                <div>{children}</div>
            </SheetTrigger>
            <SheetContent side="left">
                <SheetHeader>
                    <SheetTitle className="text-xl text-blue-950">Edit appointment</SheetTitle>
                    <SheetDescription>
                        Make changes to this appointment as you like . Click save when you're done.
                    </SheetDescription>
                </SheetHeader  >
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="staus" className="text-right">
                            Staus 
                        </Label>
                        <select id="status" className="col-span-3 rounded-md ">
                            <option value="pending">Pending</option>
                            <option value="done">Done</option>
                            <option value="canceled">Canceled</option>
                        </select>
                    </div>
                </div>
                <SheetFooter>
                    <SheetClose asChild>
                        {/* {here must send the data to the server when click save button} */}
                        <button type="submit">Save changes</button>
                    </SheetClose>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    );
}


// TODO: This page must considered the dynamic data change
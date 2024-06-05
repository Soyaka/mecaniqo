// resources/js/Layouts/AuthenticatedLayout.tsx

import { PropsWithChildren, ReactNode } from "react";
import ClientNavBar from "@/Pages/Client/NavBar";
import AdminNavbar from "@/Pages/Admin/Navbar";
import MechanicNavbar from "@/Pages/Mechanic/Navbar";
import { User } from "@/types";

export default function Authenticated({
    user,
    header,
    children,
}: PropsWithChildren<{ user: User; header?: ReactNode }>) {


    return (
        <div>
            <main>{children}</main>
        </div>
    );
}

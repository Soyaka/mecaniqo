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
        <div className="min-h-screen bg-gray-100 flex flex-row">
            <nav className="bg-white border-b min-h-screen  w-1/5 border-gray-100">
                {/* Primary Navigation Menu : case for client */}
                {user.role === "client" && <ClientNavBar auth={{ user }} currentPage={window.location.pathname} />}

                {/* Secondary Navigation Menu  for admin*/}
                {user.role === "admin" && <AdminNavbar auth={{ user }} />}

                {/* Secondary Navigation Menu  for mechanic*/}
                {user.role === "mechanic" && <MechanicNavbar auth={{ user }} />}
            </nav>
            {header && (
                <header className="bg-white shadow">
                    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                        {header}
                    </div>
                </header>
            )}

            <main>{children}</main>
        </div>
    );
}

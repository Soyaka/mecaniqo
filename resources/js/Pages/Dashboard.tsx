// resources/js/Pages/Dashboard.tsx

import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { PageProps } from "@/types";
import AdminDasboard from "@/Pages//Admin/Dasboard";
import ClientDashboard from "@/Pages/Client/Dashbord";
import MechanicDashboard from "@/Pages/Mechanic/Dashboard";
import ClientNavBar from "./Client/NavBar";
export default function Dashboard({ auth }: PageProps) {
    const userRole = auth.user.role;

    const renderContent = () => {
        switch (userRole) {
            case "admin":
                return <AdminDasboard auth={auth} />;
            case "client":
                return <ClientDashboard auth={auth} />;
            case "mechanic":
                return <MechanicDashboard auth={auth} />;
            default:
                return <div>What is this? Men , that's weird</div>;
        }
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            // header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>}
        >
            <Head title="Dashboard" />

            <div className="h-screen w-screen flex  items-center justify-center  p-2">{renderContent()}</div>
        </AuthenticatedLayout>
    );
}

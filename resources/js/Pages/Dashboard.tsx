
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { PageProps } from "@/types";
import AdminDashboard from "@/Pages/Admin/Dashboard";
import MechanicDashboard from "@/Pages/Mechanic/Dashboard";

export default function Dashboard({ auth }: PageProps) {
    const userRole = auth.user.role;

    const renderContent = () => {
        switch (userRole) {
            case "admin":
                return <AdminDashboard auth={auth} />;
            case "mechanic":
                return <MechanicDashboard auth={auth} />;
            default:
                return <div>What is this? Men, that's weird. {userRole}</div>;
        }
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
        >
            <Head title="Dashboard" />
            <div className="h-screen w-screen flex items-center justify-center p-2">{renderContent()}</div>
        </AuthenticatedLayout>
    );
}

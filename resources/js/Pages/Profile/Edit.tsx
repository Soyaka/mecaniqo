import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import DeleteUserForm from "./Partials/DeleteUserForm";
import UpdatePasswordForm from "./Partials/UpdatePasswordForm";
import UpdateProfileInformationForm from "./Partials/UpdateProfileInformationForm";
import AdminLayout from "@/Layouts/AdminLayout";
import ClientLayout from "@/Layouts/ClientLayout";
import { Head } from "@inertiajs/react";
import { PageProps } from "@/types";

export default function Edit({
    auth,
    mustVerifyEmail,
    status,
}: PageProps<{ mustVerifyEmail: boolean; status?: string }>) {
    const role = auth.user.role;
    const Layout = role === "admin" ? AdminLayout : ClientLayout;

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Profile
                </h2>
            }
        >
            <Layout auth={auth}>
                <Head title="Profile" />

                <div className="py-12 overflow-y-scroll">
                    <div className=" flex gap-3 items-end  max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                        <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                            <UpdateProfileInformationForm
                                mustVerifyEmail={mustVerifyEmail}
                                status={status}
                                className="max-w-xl"
                                buttonColor={` ${
                                    role === "admin"
                                        ? "bg-gray-800 hover:bg-gray-900/80" 
                                        : "bg-green-800 hover:bg-green-900/80"
                                }`}
                            />
                        </div>

                        <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                            <UpdatePasswordForm
                                className="max-w-xl"
                                buttonColor={` ${
                                    role === "admin"
                                        ? "bg-gray-800 hover:bg-gray-900/80" 
                                        : "bg-green-800 hover:bg-green-900/80"
                                }`}
                            />
                        </div>

                        <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                            <DeleteUserForm className="max-w-xl" />
                        </div>
                    </div>
                </div>
            </Layout>
        </AuthenticatedLayout>
    );
}

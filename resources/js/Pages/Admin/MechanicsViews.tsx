import React from "react";
import { User, PageProps } from "@/types";
import AdminLayout from "@/Layouts/AdminLayout";
import MechanicMain from "./MechanicMain";

type UsersProps = {
    clients: User[];
    auth: PageProps<{ user: User }>;
};

const MechanicViews: React.FC<UsersProps> = ({
    auth,
    clients,
}: UsersProps) => {
    return (
        <AdminLayout auth={auth}>
            <MechanicMain clients={clients} auth={auth} />
        </AdminLayout>
    );
};

export default MechanicViews;

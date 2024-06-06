import React from "react";
import { User, PageProps } from "@/types";
import AdminLayout from "@/Layouts/AdminLayout";
import MechanicMain from "./MechanicMain";

type MechanicsProps = {
    mechanics: User[];
    auth: PageProps<{ user: User }>;
};

const MechanicViews: React.FC<MechanicsProps> = ({
    auth,
    mechanics,
}: MechanicsProps) => {
    return (
        <AdminLayout auth={auth}>
            <MechanicMain mechanics={mechanics} auth={auth} />
        </AdminLayout>
    );
};

export default MechanicViews;

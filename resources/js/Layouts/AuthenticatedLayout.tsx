// resources/js/Layouts/AuthenticatedLayout.tsx

import { PropsWithChildren, ReactNode } from "react";
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

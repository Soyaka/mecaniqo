interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at?: string | null;
    created_at: string;
    updated_at: string;
    role: string;
}

export interface AuthData {
    user: User;
    // Add other properties as needed
}

export type PageProps<T extends Record<string, unknown> = Record<string, unknown>> = T & {
    auth: AuthData;
    // Add other properties as needed
};


type UsersProps = {
    clients: User[];
    auth: PageProps<{ user: User }>; // Ensure auth includes user property
};


type MechanicsProps = {
    mechanics: User[];
    auth: PageProps<{ user: User }>;
};
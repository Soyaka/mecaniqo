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


  export interface Vehicle {
    id: string;
    brand: string;
    model: string;
    fuelType: string;
    registrationNumber: string;
    photos: string[]; // URLs of the photos
  }
  
  export interface Repair {
    id: string;
    vehicleId: string;
    description: string;
    status: 'en attente' | 'en cours' | 'terminée';
    mechanic: string;
  }
  

  export interface Invoice {
    id: string;
    repairId: string;
    clientId: string;
    amount: number;
    date: string;
  }
  
  interface OverViewProps {
    auth: AuthData;
    vehicles: Vehicle[];
    invoices: Invoice[];
    repairs: Repair[];
  }
  
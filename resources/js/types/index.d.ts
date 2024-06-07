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


type Vehicle = {
  id: number;
  user_id: number;
  brand: string;
  model: string;
  fuel_type: string;
  registration_number: string;
  photos: string[];
  repair_requests: any[]; // You may want to create a specific type for repair requests
  created_at: string; // This could be a Date object if you parse the string
  updated_at: string; // This could be a Date object if you parse the string
};
  
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
  

  type Appointment = {
    id: string;
    vehicle_id: string;
    user_id: string;
    images: string[];
    description: string;
    status: string;
    date: Date;
    vehicle?: Vehicle;
  };

  type RepairRequest = {
    id: string;
    vehicle_id: string;
    user_id: string;
    description: string;
    status: string;
    date: Date;
    vehicle?: Vehicle;
    user?: User;
  };
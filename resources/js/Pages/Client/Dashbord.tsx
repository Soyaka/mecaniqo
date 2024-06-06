import { PageProps } from '@/types';
import ClientLayout from '@/Layouts/ClientLayout';
import ClientMainDash from './ClientMainDash';

export default function ClientDashboard({ auth }: PageProps) {
  const authData = { auth: { user: auth.user } };

  return (
    <ClientLayout {...authData}>
      <ClientMainDash />
    </ClientLayout>
  );
}

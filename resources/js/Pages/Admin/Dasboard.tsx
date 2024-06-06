import { PageProps } from '@/types';
import AdminMainDash from './MainDash';
import AdminLayout from '@/Layouts/AdminLayout';

export default function AdminDashboard({ auth }: PageProps) {
  // Ensure that the auth object includes the expected structure
  const authData = { auth: { user: auth.user } };

  return (
    <AdminLayout {...authData}>
      <AdminMainDash />
    </AdminLayout>
  );
}

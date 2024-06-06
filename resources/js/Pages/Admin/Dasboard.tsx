import { PageProps } from '@/types';
import AdminMainDash from './MainDash';
import AdminLayout from '@/Layouts/AdminLayout';

export default function AdminDashboard({ auth }: PageProps) {
  const authData = { auth: { user: auth.user } };

  return (
    <AdminLayout {...authData}>
      <AdminMainDash />
    </AdminLayout>
  );
}

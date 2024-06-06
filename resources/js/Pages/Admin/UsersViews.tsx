import React from "react";

import { User, PageProps } from "@/types";
import AdminLayout from "@/Layouts/AdminLayout";
import UsersMain from "./UsersMain";
type UsersProps = {
    clients: User[];
    auth: PageProps<{ user: User }>; // Ensure auth includes user property
};

const UsersComponent: React.FC<UsersProps> = ({
    auth,
    clients,
}: UsersProps) => {
    return (
        <AdminLayout auth={auth}>
            <UsersMain clients={clients} auth={auth} />
        </AdminLayout>
    );
};

export default UsersComponent;

{
    /* <div>
<h1>Users</h1>
<InertiaLink href="/users/create">Create New User</InertiaLink>
<table>
  <thead>
    <tr>
      <th>Name</th>
      <th>Email</th>
      <th>Role</th>
      <th>Actions</th>
    </tr>
  </thead>
  <tbody>
    {clients.map((user) => (
      <tr key={user.id}>
        <td>{user.name}</td>
        <td>{user.email}</td>
        <td>{user.role}</td>
        <td>
          <InertiaLink href={`/users/${user.id}/edit`}>Edit</InertiaLink>
          <button onClick={() => handleDelete(user.id)}>Delete</button>
        </td>
      </tr>
    ))}
  </tbody>
</table>
</div> */
}

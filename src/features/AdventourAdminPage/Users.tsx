import UsersTable from './UsersTable';

const Users = () => (
  <section className="flex flex-col gap-6 p-2">
    <h1 className="text-2xl font-bold leading-relaxed text-primary">Registered Users</h1>
    <UsersTable />
  </section>
);

export default Users;

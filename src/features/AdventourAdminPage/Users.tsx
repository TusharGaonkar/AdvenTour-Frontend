import UsersTable from './UsersTable';

const Users = () => {
  return (
    <section className="flex flex-col gap-6">
      <h1 className="text-2xl font-bold leading-relaxed text-primary">Registered Users</h1>
      <UsersTable />
    </section>
  );
};

export default Users;

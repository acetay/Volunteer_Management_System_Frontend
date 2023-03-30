import AdminProgramEdit from '../../Components/AdminVolunteerMgt/ProgramsAdmin.jsx/AdminProgramEdit';

function AdminProgramEditPage() {
  return (
    <div className="flex flex-col h-auto md:h-screen p-8 justify-start items-center">
      <h1 className="text-5xl font-bold">Edit Program</h1>
      <AdminProgramEdit />
    </div>
  );
}

export default AdminProgramEditPage;

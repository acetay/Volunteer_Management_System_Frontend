import AdminProgramsListing from '../Components/AdminVolunteerMgt/ProgramsAdmin.jsx/AdminProgramsListing';

function AdminPrograms() {
  return (
    <div className="flex flex-col h-auto md:h-auto p-8 justify-start items-center pb-28">
      <h1 className="text-4xl p-4 text-left font-bold text-gray-600">
        Programs
      </h1>
      <div className="flex flex-col h-auto md:h-screen p-8 justify-start items-center">
        <AdminProgramsListing />
      </div>
    </div>
  );
}

export default AdminPrograms;

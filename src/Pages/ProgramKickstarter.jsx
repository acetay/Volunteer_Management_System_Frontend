import AdminProgramStarter from '../Components/AdminVolunteerMgt/ProgramsAdmin.jsx/AdminProgramStarter';

function ProgramKickstarter() {
  return (
    <div className="flex flex-col h-auto md:h-screen justify-center items-center">
      <h1 className="font-bold text-4xl tracking-wider mt-4">
        Program Kickstarter
      </h1>
      <AdminProgramStarter />
    </div>
  );
}

export default ProgramKickstarter;

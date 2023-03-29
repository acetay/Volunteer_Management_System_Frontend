import AdminProgramItem from './AdminProgramItem';
import { useGlobalAdminContext } from '../../../Context/Admin/AdminContext';

function AdminProgramsListing() {
  const { enrolments } = useGlobalAdminContext();
  return (
    <>
      {enrolments.length > 0 ? (
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3 md:grid-cols-1 px-20 justify-center items-center h-auto">
          {enrolments.map((enrolment, index) => (
            <AdminProgramItem enrolment={enrolment} key={index} />
          ))}
        </div>
      ) : (
        <>
          <h1 className="text-lg text-center text-error">
            There are currently no programs listed
          </h1>
        </>
      )}
    </>
  );
}

export default AdminProgramsListing;

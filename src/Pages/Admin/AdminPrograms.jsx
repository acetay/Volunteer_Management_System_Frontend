import AdminProgramsListing from '../../Components/AdminVolunteerAndProgMgt_Components/ProgramsAdmin.jsx/AdminProgramsListing';
import { BiAddToQueue } from 'react-icons/bi';
import { Link } from 'react-router-dom';

function AdminPrograms() {
  return (
    <div className="flex flex-col h-auto">
      <div className="flex justify-between w-[90%] pt-4">
        <h1 className="text-4xl p-4 text-left font-bold text-gray-600">
          Programs
        </h1>
        <Link to={'/admin/programkickstarter'}>
          <button className="flex justify-center items-center space-x-2 btn btn-secondary text-white">
            <BiAddToQueue />
            New Program
          </button>
        </Link>
      </div>

      <div className="flex flex-col min-h-[74vh] h-auto p-8 justify-start items-center">
        <AdminProgramsListing />
      </div>
    </div>
  );
}

export default AdminPrograms;

import { useState, useEffect } from 'react';
import AdminProgramItem from './AdminProgramItem';
import { useGlobalAdminContext } from '../../../Context/Admin/AdminContext';
import Spinner from '../../../Assets/Sample_images/spinner.gif';
// import { getAllPrograms } from '../../../Context/Admin/AdminApiActions';

function AdminProgramsListing() {
  const [enrolments, setEnrolments] = useState([]);
  const [copyEnrolments, setCopyEnrolments] = useState(enrolments);
  const { dispatch, isLoading, getAllPrograms } = useGlobalAdminContext();

  useEffect(() => {
    const getApi = async () => {
      dispatch({ type: 'SET_LOADING' });
      const { enrolments } = await getAllPrograms();
      setEnrolments(enrolments);
      setCopyEnrolments(enrolments);
      dispatch({ type: 'OFF_LOADING' });
    };

    getApi();
  }, []);

  const dateReformatter = (date) => {
    return new Date(date.split('-').reverse().join('-'));
  };

  const today = new Date();

  const filterOptions = (options) => {
    switch (options) {
      case 'ALL':
        setCopyEnrolments(enrolments);
        break;
      case 'ACTIVE':
        const activeEnrolments = enrolments.filter(
          (enrolment) => dateReformatter(enrolment.date) >= today
        );
        setCopyEnrolments(activeEnrolments);
        break;
      case 'CLOSED':
        const closeEnrolments = enrolments.filter(
          (enrolment) => dateReformatter(enrolment.date) <= today
        );
        setCopyEnrolments(closeEnrolments);
        break;
      default:
        return;
    }
  };

  if (isLoading) {
    return (
      <div className="w-full h-auto md:h-screen mx-auto lg:w-10/12 px-16">
        <div className="flex justify-center items-center mt-32">
          <img
            className="mix-blend-multiply bg-transparent h-[300px] w-[300px]"
            src={Spinner}
            alt="Loading"
          />
        </div>
      </div>
    );
  }

  if (!enrolments) {
    return (
      <div className="w-full h-auto md:h-screen mx-auto lg:w-10/12 px-16">
        <div>
          <h1>There are currently no programs listed</h1>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="flex justify-center items-center pb-4 space-x-2">
        <button
          onClick={() => filterOptions('ALL')}
          className="btn btn-primary btn-sm"
        >
          All Programs
        </button>
        <button
          onClick={() => filterOptions('ACTIVE')}
          className="btn btn-success text-white btn-sm"
        >
          Active Programs
        </button>
        <button
          onClick={() => filterOptions('CLOSED')}
          className="btn text-white btn-error btn-sm"
        >
          Closed Programs
        </button>
      </div>

      {enrolments && (
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3 md:grid-cols-1 px-20 justify-center items-center">
          {copyEnrolments.map((enrolment, index) => (
            <AdminProgramItem enrolment={enrolment} key={index} />
          ))}
        </div>
      )}
    </>
  );
}

export default AdminProgramsListing;

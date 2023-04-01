import { useState, useEffect } from 'react';
import AdminProgramItem from './AdminProgramItem';
import { useGlobalAdminContext } from '../../../Context/Admin/AdminContext';
import Spinner from '../../../Assets/Sample_images/spinner.gif';

function AdminProgramsListing() {
  const [enrolments, setEnrolments] = useState([]);
  const { getAllPrograms, dispatch, isLoading } = useGlobalAdminContext();

  useEffect(() => {
    const getApi = async () => {
      dispatch({ type: 'SET_LOADING' });
      const { enrolments } = await getAllPrograms();
      setEnrolments(enrolments);
      dispatch({ type: 'OFF_LOADING' });
    };
    getApi();
  }, []);

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
      {enrolments && (
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3 md:grid-cols-1 px-20 justify-center items-center">
          {enrolments.map((enrolment, index) => (
            <AdminProgramItem enrolment={enrolment} key={index} />
          ))}
        </div>
      )}
    </>
  );
}

export default AdminProgramsListing;

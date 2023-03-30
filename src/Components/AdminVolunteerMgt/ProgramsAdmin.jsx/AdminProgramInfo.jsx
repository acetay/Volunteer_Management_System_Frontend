import { useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useGlobalAdminContext } from '../../../Context/Admin/AdminContext';
import { useEffect } from 'react';

import AdminProgramVolunteerTable from './AdminProgramVolunteerTable';

function AdminProgramInfo() {
  const { id } = useParams();
  const redirect = useNavigate();
  const [volunteersEnrolled, setVolunteersEnrolled] = useState([]);
  const { enrolments, setTempEditForm, getAllVolunteersInEnrolment } =
    useGlobalAdminContext();
  const enrolment = enrolments.find(
    (enrol) => Number(enrol.program.id) === Number(id)
  );
  console.log(volunteersEnrolled.length);
  useEffect(() => {
    const getVolunteers = async () => {
      const volunteers = await getAllVolunteersInEnrolment(id);
      setVolunteersEnrolled(volunteers);
    };
    getVolunteers();
  }, []);

  const toEditForm = () => {
    setTempEditForm(enrolment.program);
    redirect(`/admin/programs/edit/${id}`);
  };

  return (
    <div className="h-auto">
      <div className="flex justify-start w-screen px-12">
        <Link to={'/admin/programs'}>
          <button className="flex justify-center items-center space-x-2 btn btn-active text-white btn-sm">
            Back
          </button>
        </Link>
      </div>
      {/* Container */}
      <div className="flex px-16 w-screen h-auto mt-4 space-x-8">
        {/* COLUMN 1 */}
        <div className="w-[50%]">
          <img
            className="rounded-xl shadow-2xl"
            src={
              enrolment?.program.photo ||
              'https://static.thehoneycombers.com/wp-content/uploads/sites/2/2017/11/Salvation-Army.jpg'
            }
            alt="photo"
          />
          {volunteersEnrolled.length === 0 ? (
            <div className="text-error text-lg">
              <h1>
                There are currently no volunteers enrolled in this program
              </h1>
            </div>
          ) : (
            <AdminProgramVolunteerTable
              volunteersEnrolled={volunteersEnrolled}
            />
          )}
        </div>
        {/* COLUMN 2 */}
        <div className="w-[50%]">
          <h1 className="text-3xl font-bold">Program Details</h1>
          <div className="w-[100%] p-4 shadow-xl rounded-lg">
            <h3 className="text-lg">{enrolment?.program.description}</h3>
          </div>
          <div className="w-full flex flex-col md:flex-row h-auto rounded-lg shadow-md bg-base-100 stats">
            <div className="stat">
              <div className="stat-title text-md">Name</div>
              <div className="text-sm stat-value">
                {' '}
                {enrolment?.program.name}
              </div>
            </div>
            <div className="stat">
              <div className="stat-title text-md">Date</div>
              <div className="text-sm stat-value">
                {enrolment?.program.date}
              </div>
            </div>
            <div className="stat">
              <div className="stat-title text-md">Time</div>
              <div className="text-sm stat-value">
                <p> {enrolment?.program.timeOfProgram}</p>
              </div>
            </div>
            <div className="stat">
              <div className="stat-title text-md">Volunteers</div>
              <div className="text-sm stat-value">
                {enrolment?.program.volunteersRequired}
              </div>
            </div>
          </div>
          <div className="w-[100%] p-4 shadow-xl rounded-lg">
            <h1 className="text-lg tracking text-gray-700 font-semibold pb-4">
              Description
            </h1>
            <p>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolores
              nihil libero pariatur voluptas repudiandae veniam, eius minus
              voluptatum officia! Corporis fugiat sapiente fuga aliquid beatae
              natus eum earum explicabo dolorem! Lorem ipsum dolor sit amet
              consectetur adipisicing elit. Inventore, veritatis? Corrupti culpa
              eaque quo rem neque quis consequatur doloribus dolorem vel
              laboriosam eligendi quibusdam maiores, iure iste, sequi illum.
              Eius! Lorem ipsum dolor sit amet consectetur adipisicing elit.
            </p>
            <div className="w-full flex justify-end p-4">
              <button
                onClick={toEditForm}
                className="btn btn-primary text-white btn-sm"
              >
                Edit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminProgramInfo;

import { useParams, Link } from 'react-router-dom';
import { useGlobalAdminContext } from '../../Context/Admin/AdminContext';
import { useState, useEffect } from 'react';

function VolunteerProgramsSelect() {
  const { enrolments, profile } = useGlobalAdminContext();
  const [enrolmentsByDate, setEnrolmentsByDate] = useState([]);
  const { id, date, timeslot } = useParams();

  useEffect(() => {
    const findEnrolmentByDateAndTime = enrolments.filter(
      (enrolment) =>
        enrolment.date === date && enrolment.timeOfProgram === timeslot
    );
    const findEnrolmentByDate = enrolments.filter(
      (enrolment) => enrolment.date === date
    );

    const filteredEnrolments =
      timeslot === 'Full day'
        ? findEnrolmentByDate
        : findEnrolmentByDateAndTime;

    setEnrolmentsByDate(filteredEnrolments);
  }, []);

  if (enrolmentsByDate.length === 0) {
    return (
      <div className="w-full h-auto md:h-screen mx-auto flex flex-col items-center mt-32 px-12">
        <h1 className="text-error font-bold text-lg w-[40%] text-center">
          There are no programs on {date} with matching timeslots for{' '}
          {profile?.volunteer.name}
        </h1>
        <Link to={`/admin/singlevolunteer/${id}`}>
          <button className="btn btn-primary mt-12 btn-sm">Back</button>
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full h-auto md:h-screen mx-auto flex flex-col items-center mt-10 px-12">
      <div className="flex flex-col justify-center items-center p-4">
        <h1 className="text-2xl font-bold text-blue-700">Events on {date}</h1>
        <p className="text-gray-600 text-semibold text-lg">
          Select program for -{' '}
          <span className="font-bold text-blue-500">
            {profile?.volunteer.name}
          </span>
        </p>
      </div>

      <div className="overflow-x-auto w-[80%]">
        <table className="table table-normal w-full">
          {/* head */}
          <thead>
            <tr>
              <th className="bg-blue-400 text-white">Event</th>
              <th className="bg-blue-400 text-white">Date</th>
              <th className="bg-blue-400 text-white">Timeslot</th>
              <th className="bg-blue-400 text-white"></th>
            </tr>
          </thead>
          <tbody>
            {enrolmentsByDate.map((enrol, index) => (
              <tr key={index}>
                <td>
                  <div className="flex items-center space-x-3">
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <img
                          src="https://static.thehoneycombers.com/wp-content/uploads/sites/2/2017/11/Salvation-Army.jpg"
                          alt="Elderly"
                        />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{enrol?.program?.name}</div>
                      <div className="text-sm opacity-50">
                        Deliver food at Boon Lay
                      </div>
                    </div>
                  </div>
                </td>
                <td>
                  {enrol?.date}
                  <br />
                  <span className="badge badge-ghost badge-sm">
                    Jurong West
                  </span>
                </td>
                <td>{enrol?.timeOfProgram}</td>
                <th>
                  <button className="btn btn-info btn-xs text-white">
                    Enrol
                  </button>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Link to={`/admin/singlevolunteer/${id}`}>
        <button className="btn btn-primary mt-12 btn-sm">Back</button>
      </Link>
    </div>
  );
}

export default VolunteerProgramsSelect;

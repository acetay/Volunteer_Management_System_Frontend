import { useParams, Link, useNavigate } from 'react-router-dom';
import { useGlobalAdminContext } from '../../Context/Admin/AdminContext';
import { useState, useEffect } from 'react';
import Spinner from '../../Assets/Sample_images/spinner.gif';
import Swal from 'sweetalert2';

function VolunteerProgramsSelect() {
  const redirect = useNavigate();
  const {
    // enrolments,
    profile,
    enrolVolunteer,
    editVolunteerAvail,
    getAllPrograms,
  } = useGlobalAdminContext();
  const [enrolments, setEnrolments] = useState(null);
  const [trigger, setTrigger] = useState(false);
  const [enrolmentsByDate, setEnrolmentsByDate] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { id, date, timeslot, name } = useParams();

  useEffect(() => {
    const getApi = async () => {
      const { enrolments } = await getAllPrograms();
      setEnrolments(enrolments);
      setTrigger(true);
      setIsLoading(false);
    };
    getApi();
  }, []);

  const newDate = date.split('-').reverse().join('-');

  // Disabled for testing purpose
  const sendConfirmationEmail = (eventName, eventDate) => {
    const config = {
      SecureToken: '2cba66fc-e24b-418e-9118-34a7b3458c3a',
      To: profile?.volunteer.email,
      From: 'j.hokit80@gmail.com',
      Subject: 'Confirmation to enrolments',
      Body: `Hello there, we are please to confirm on your enrolment to the program ${eventName} on ${eventDate}`,
    };
    if (window.Email) {
      window.Email.send(config);
    }
  };

  const enrolVolunteerIntoProgram = async (
    volunteerId,
    programId,
    date,
    isAvail
  ) => {
    await enrolVolunteer(volunteerId, programId).then(() => {
      editVolunteerAvail(volunteerId, date, isAvail);
    });
    // console.log(response);
    Swal.fire({
      title: 'Success',
      text: 'Volunteer has been enrolled into program!',
      icon: 'success',
    });
    redirect(`/admin/singlevolunteer/${volunteerId} `);
  };

  useEffect(() => {
    if (enrolments) {
      const findEnrolmentByDateAndTime = enrolments?.filter(
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
      setEnrolmentsByDate(filteredEnrolments || []);
    }
  }, [trigger]);

  if (!enrolmentsByDate) {
    return (
      <div className="flex justify-center items-center">
        <img className="h-[300px] w-[300px]" src={Spinner} alt="spinner" />
      </div>
    );
  }

  return (
    <>
      {enrolmentsByDate.length === 0 ? (
        <div className="w-full h-auto md:h-screen mx-auto flex flex-col items-center mt-32 px-12">
          <h1 className="text-error font-bold text-lg w-[40%] text-center">
            There are no programs on {date} with matching timeslots for {name}
          </h1>
          <Link to={`/admin/singlevolunteer/${id}`}>
            <button className="btn btn-primary mt-12 btn-sm">Back</button>
          </Link>
        </div>
      ) : (
        <div className="w-full h-auto md:h-screen mx-auto flex flex-col items-center mt-10 px-12">
          <div className="flex flex-col justify-center items-center p-4">
            <h1 className="text-2xl font-bold text-blue-700">
              Events on {date}
            </h1>
            <p className="text-gray-600 text-semibold text-lg">
              Select program for -{' '}
              <span className="font-bold text-blue-500">{name}</span>
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
                              // src="https://static.thehoneycombers.com/wp-content/uploads/sites/2/2017/11/Salvation-Army.jpg"
                              src={
                                enrol?.program.photo ||
                                'https://static.thehoneycombers.com/wp-content/uploads/sites/2/2017/11/Salvation-Army.jpg'
                              }
                              alt="Elderly"
                            />
                          </div>
                        </div>
                        <div>
                          <div className="font-bold">
                            {enrol?.program?.name}
                          </div>
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
                      <button
                        onClick={() =>
                          enrolVolunteerIntoProgram(
                            id,
                            enrol?.program?.id,
                            newDate,
                            false
                          )
                        }
                        className="btn btn-info btn-xs text-white"
                      >
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
      )}
    </>
  );
}

export default VolunteerProgramsSelect;

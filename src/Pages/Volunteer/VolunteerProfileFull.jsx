import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useGlobalVolunteerContext } from '../../Context/VolunteerContext';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import Spinner from '../../Assets/Sample_images/spinner.gif';
import ProfileImage from '../../Components/VolunteerProfile_Components/ProfileImage';
import HeaderAndBorder from '../../Components/VolunteerProfile_Components/HeaderAndBorder';
import PersonInfoTable from '../../Components/VolunteerProfile_Components/PersonInfoTable';
import ProfileAndExpTable from '../../Components/VolunteerProfile_Components/ProfileAndExpTable';
import CalendarModal from '../../Components/VolunteerProfile_Components/CalendarModal';
import EventsModal from '../../Components/VolunteerProfile_Components/EventsModal';
import AvailabilityModal from '../../Components/VolunteerProfile_Components/AvailabilityModal';

// TODO - BREAKUP AND TRANSFER TO COMPONENTS FOLDER

function VolunteerProfileFull() {
  const jwtToken = JSON.parse(localStorage.getItem('authUser'))?.stsTokenManager
    .accessToken;
  const { id } = useParams();
  const redirect = useNavigate();
  // To remove singleUser - for testing only
  const { setEditForm, isLoading, getEnrolments, unmarkAvailDate } =
    useGlobalVolunteerContext();
  const [enrolments, setEnrolments] = useState([]);
  const [availabilities, setAvailabilities] = useState([]);
  const [date, setDate] = useState(new Date());
  let volunteer = JSON.parse(localStorage.getItem('singleUser'))?.volunteer;

  const goToEdit = () => {
    // To remove setEditForm - for testing only
    setEditForm(volunteer);
    redirect(`/volunteers/profile/${volunteer.id}/edit`);
  };

  // Get Availabilities of a volunteer
  const getAvailabilities = async (id) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/volunteers/availabilities/${id}`,
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      );
      setAvailabilities(response.data);
    } catch (err) {
      // console.log(err);
    }
  };

  useEffect(() => {
    getAvailabilities(id);
    const enrolledprograms = async () => {
      const programs = await getEnrolments(id);
      setEnrolments(programs);
    };
    enrolledprograms();
  }, []);

  if (isLoading) {
    return (
      <div className="flex flex-col h-auto md:h-screen p-8 justify-start items-center pt-32">
        <img className="h-[300px] w-[300px]" src={Spinner} alt="spinner" />
      </div>
    );
  }

  return (
    <div className="w-[100%] mt-12 flex flex-col justify-center items-center space-y-2 sm:mt-50 md:mt-1 md:mb-1 lg:flex-row">
      {/* COLUMN 1 */}
      <div className="w-[35%] h-auto md:h-[40vh] flex flex-col justify-center items-center">
        {/* PROFILE IMAGE */}
        <ProfileImage
          photo={
            volunteer?.profilePicture === ''
              ? 'https://st4.depositphotos.com/4329009/19956/v/450/depositphotos_199564354-stock-illustration-creative-vector-illustration-default-avatar.jpg'
              : volunteer.profilePicture
          }
          name={volunteer?.name}
          date={volunteer.createdAt}
        />
        {/* CALENDAR SCHEDULE */}
        <div className="w-[100%] flex flex-col justify-center items-center">
          <h2 className="tracking-widest text-center text-md font-semibold text-red-500 underline">
            My Availability Scheduler
          </h2>
          <div className="h-auto md:h-[75%] md:w-[78%] p-2 mt-3 flex-wrap flex justify-center items-center text-black rounded-md">
            <div className="calendar-container flex-wrap">
              <Calendar onChange={setDate} value={date} />
            </div>
          </div>
          <div className="w-[220px] pt-4 flex flex-col justify-center items-center md:flex-row space-x-2 md:w-[350px]">
            <p className="text-center">
              <span className="font-bold text-blue-800 text-center">
                Selected Date:{' '}
              </span>{' '}
              {date.toDateString()}
            </p>
            <label
              htmlFor="my-modal-4"
              className="btn btn-xs btn-error text-white text-xs"
            >
              Set Avail
            </label>
          </div>
        </div>
      </div>

      {/* COLUMN 2 */}
      <div className="h-auto flex-wrap pt-4 md:p-0  md:w-[65%] flex flex-col">
        {/* PERSONAL INFO */}
        <div className="pt-3 px-12">
          <HeaderAndBorder title={'Personal Information'} />
          <PersonInfoTable volunteer={volunteer} />
        </div>
        {/* PROFILE AND EXP */}
        <div className="pt-8 px-12">
          <HeaderAndBorder title={'Profile & Experience'} />
          <ProfileAndExpTable volunteer={volunteer} />
        </div>
        {/* Buttons */}
        <div className="flex flex-col justify-center items-baseline pb-8 space-y-3 md:flex-row md:items-baseline md:justify-start pt-8 space-x-4 md:pl-8">
          <label htmlFor="my-modal-3" className="btn btn-info text-white">
            Upcoming Events
          </label>
          <label htmlFor="my-modal-6" className="btn btn-primary">
            Availability
          </label>
          <button className="w-[80%] md:w-[20%] btn btn-accent text-white">
            Change password
          </button>
          <button
            onClick={goToEdit}
            className="w-[80%] md:w-[20%] btn btn-secondary text-white"
          >
            Edit Profile
          </button>
        </div>
      </div>
      {/* MODAL POPOUT */}
      <CalendarModal
        date={date}
        id={id}
        getAvailabilities={getAvailabilities}
        availabilities={availabilities}
        unmarkAvailDate={unmarkAvailDate}
        setAvailabilities={setAvailabilities}
      />
      <EventsModal enrolments={enrolments} />
      <AvailabilityModal availabilities={availabilities} />
    </div>
  );
}

export default VolunteerProfileFull;

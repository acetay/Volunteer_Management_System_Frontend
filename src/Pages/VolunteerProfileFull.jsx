import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import ProfilePhoto1 from '../Assets/Sample_images/profilephoto1.png';
import { useGlobalVolunteerContext } from '../Context/VolunteerContext';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

import ProfileImage from '../Components/VolunteerProfile_Components/ProfileImage';
import HeaderAndBorder from '../Components/VolunteerProfile_Components/HeaderAndBorder';
import PersonInfoTable from '../Components/VolunteerProfile_Components/PersonInfoTable';
import ProfileAndExpTable from '../Components/VolunteerProfile_Components/ProfileAndExpTable';
import CalendarModal from '../Components/VolunteerProfile_Components/CalendarModal';

// TODO - BREAKUP AND TRANSFER TO COMPONENTS FOLDER

function VolunteerProfileFull() {
  const jwtToken = JSON.parse(localStorage.getItem('authUser'))?.stsTokenManager
    .accessToken;
  const { id } = useParams();
  const redirect = useNavigate();
  // To remove singleUser - for testing only
  const { setEditForm } = useGlobalVolunteerContext();
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
  }, []);

  return (
    <div className="w-[100%] mt-12 flex flex-col justify-center items-center space-y-2 sm:mt-50 md:mt-1 md:mb-1 lg:flex-row">
      {/* COLUMN 1 */}
      <div className="w-[35%] h-auto md:h-[40vh] flex flex-col justify-center items-center">
        {/* PROFILE IMAGE */}
        <ProfileImage photo={ProfilePhoto1} name={volunteer?.name} />
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
          <button className="w-[80%] md:w-[20%] btn btn-info text-white">
            Upcoming Events
          </button>
          <button className="w-[80%] md:w-[20%] btn btn-primary text-white">
            Past Records
          </button>
          <button className="w-[80%] md:w-[20%] btn btn-accent text-white">
            Your availability
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
      />
    </div>
  );
}

export default VolunteerProfileFull;

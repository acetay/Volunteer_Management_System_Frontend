import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ProfilePhoto1 from '../Assets/Sample_images/profilephoto1.png';
import { useGlobalVolunteerContext } from '../Context/VolunteerContext';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

import HeaderAndBorder from '../Components/VolunteerProfile_Components/HeaderAndBorder';
import PersonInfoTable from '../Components/VolunteerProfile_Components/PersonInfoTable';
import ProfileAndExpTable from '../Components/VolunteerProfile_Components/ProfileAndExpTable';

import { MdAddAPhoto } from 'react-icons/md';

// TODO - BREAKUP AND TRANSFER TO COMPONENTS FOLDER

function VolunteerProfileFull() {
  const redirect = useNavigate();
  // To remove singleUser - for testing only
  const { setEditForm } = useGlobalVolunteerContext();

  const [date, setDate] = useState(new Date());
  let volunteer = JSON.parse(localStorage.getItem('singleUser'))?.volunteer;

  const goToEdit = () => {
    // To remove setEditForm - for testing only
    setEditForm(volunteer);
    redirect(`/volunteers/profile/${volunteer.id}/edit`);
  };

  return (
    <div className="w-[100%] flex">
      {/* Column 1 */}
      <div className="w-[35%] h-[40vh] mt-28 flex flex-col justify-center items-center">
        {/* <h1 className="text-lg font-bold text-blue-800 pt-2">Volunteer</h1> */}
        <div className=" relative mt-4">
          <img
            className="w-[170px] h-[170px] rounded-full"
            src={ProfilePhoto1}
            // src="https://st4.depositphotos.com/4329009/19956/v/450/depositphotos_199564354-stock-illustration-creative-vector-illustration-default-avatar.jpg"
            alt="profile"
          />
          <MdAddAPhoto
            size={30}
            color={'darkblue'}
            className="bottom-0 right-6 absolute"
          />
        </div>

        <h1 className="text-2xl font-semibold pt-1 tracking-wider">
          {volunteer?.name}
        </h1>
        <p className="text-sm text-gray-700">Member since 1 Jan 2010</p>
        <div className="w-[100%] flex flex-col justify-center items-center">
          <h2 className="tracking-widest text-md font-semibold text-red-500 underline">
            My Availability Scheduler
          </h2>
          <div className="h-[75%] w-[78%] p-2 mt-3  flex justify-center items-center text-black rounded-md">
            <div className="calendar-container">
              <Calendar onChange={setDate} value={date} />
            </div>
          </div>
          <div className="pt-3">
            <p>
              <span className="font-bold text-blue-800">Selected Date: </span>{' '}
              {date.toDateString()}
            </p>
          </div>
        </div>
      </div>

      {/* Column 2 */}
      <div className="h-full w-[65%] flex flex-col">
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
        <div className="flex pt-8 space-x-4 pl-12">
          <button className="btn btn-info text-white">
            View Upcoming Events
          </button>
          <button className="btn btn-primary text-white">Past Records</button>
          <button className="btn btn-accent text-white">Feedback</button>
          <button onClick={goToEdit} className="btn btn-secondary text-white">
            Edit Profile
          </button>
        </div>
      </div>
    </div>
  );
}

export default VolunteerProfileFull;

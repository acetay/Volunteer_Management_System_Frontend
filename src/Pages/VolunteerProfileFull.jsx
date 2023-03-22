import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import ProfilePhoto1 from '../Assets/Sample_images/profilephoto1.png';
import axios from 'axios';
import { useGlobalVolunteerContext } from '../Context/VolunteerContext';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

import { MdAddAPhoto } from 'react-icons/md';

// TODO - BREAKUP AND TRANSFER TO COMPONENTS FOLDER

function VolunteerProfileFull() {
  const redirect = useNavigate();
  const { setEditForm, authUser } = useGlobalVolunteerContext();
  const { id } = useParams();
  const [user, setUser] = useState({});
  const [date, setDate] = useState(new Date());

  // Get User by Id
  const getVolunteerById = async (id) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/admin/volunteers/${id}`,
        {
          headers: {
            Authorization: `Bearer ${authUser.accessToken}`,
          },
        }
      );
      setUser(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  const goToEdit = () => {
    setEditForm(user);
    redirect(`/volunteers/profile/${user.id}/edit`);
  };

  useEffect(() => {
    getVolunteerById(id);
  }, []);

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
          {user.name}
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
          <h1 className="text-2xl font-semibold tracking-wider pb-2 text-gray-500">
            Personal Information
          </h1>
          <hr className="border border-gray-300 w-[90%] mb-4" />
          <table class="table-auto">
            <tbody>
              <tr>
                <td className="w-[220px] py-2 font-semibold">Contact: </td>
                <td className="text-blue-700">{user.contact}</td>
              </tr>
              <tr>
                <td className="w-[220px] py-2 font-semibold">Email: </td>
                <td className="text-blue-700">{user.email}</td>
              </tr>
              <tr>
                <td className="w-[220px] py-2 font-semibold">Address: </td>
                <td className="text-blue-700">{user.address}</td>
              </tr>
              <tr>
                <td className="w-[220px] py-2 font-semibold">Education: </td>
                <td className="text-blue-700">{user.education}</td>
              </tr>
              <tr>
                <td className="w-[220px] py-2 font-semibold">Occupation: </td>
                <td className="text-blue-700"></td>
              </tr>
            </tbody>
          </table>
        </div>
        {/* PROFILE AND EXP */}
        <div className="pt-8 px-12">
          <h1 className="text-2xl font-semibold tracking-wider pb-2 text-gray-500">
            Profile & Experience
          </h1>
          <hr className="border border-gray-300 w-[90%] mb-4" />
          <table class="table-auto">
            <tbody>
              <tr>
                <td className="w-[220px] py-2 font-semibold">Languages:</td>
                <td className="text-blue-700">{user.language}</td>
              </tr>
              <tr>
                <td className="w-[220px] py-2 font-semibold">Interests: </td>
                <td className=" text-blue-700">None</td>
              </tr>
              <tr>
                <td className="w-[220px] py-2 font-semibold">Experience: </td>
                <td className="text-blue-700">{user.pastExperience}</td>
              </tr>
            </tbody>
          </table>
        </div>
        {/* Buttons */}
        <div className="flex pt-8 space-x-4 pl-12">
          <button className="btn btn-info text-white">
            View Upcoming Events
          </button>
          <button className="btn btn-primary text-white">Past Records</button>
          <button className="btn btn-accent text-white">Feedback</button>
          {/* <Link to={`/volunteers/profile/${id}/edit`}> */}
          <button onClick={goToEdit} className="btn btn-secondary text-white">
            Edit Profile
          </button>
          {/* </Link> */}
        </div>
      </div>
    </div>
  );
}

export default VolunteerProfileFull;

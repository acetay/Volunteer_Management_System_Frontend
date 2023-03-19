import ProfilePhoto1 from '../Assets/Sample_images/profilephoto1.png';
import { MdAddAPhoto } from 'react-icons/md';
import { FaAddressBook } from 'react-icons/fa';

function VolunteerProfileFull() {
  return (
    <div className="h-full w-[100%] flex">
      {/* Column 1 */}
      <div className="h-full w-[35%] flex flex-col justify-center items-center">
        {/* <h1 className="text-lg font-bold text-blue-800 pt-2">Volunteer</h1> */}
        <div className="relative">
          <img
            className="w-[180px] h-[180px] rounded-full mt-6"
            src={ProfilePhoto1}
            alt="profile"
          />
          <MdAddAPhoto size={30} className="bottom-0 right-4 absolute" />
        </div>

        <h1 className="text-2xl font-semibold pt-4 tracking-wider">
          Katherine Ong
        </h1>
        <p className="text-sm text-gray-700">Member since 1 Jan 2010</p>
        <div className="w-[100%] min-h-full h-[40vh] flex flex-col justify-center items-center">
          <h2 className="pb-4 tracking-widest font-semibold text-red-500 underline">
            My Availability Scheduler
          </h2>
          <div className="h-[70%] w-[70%] border border-blue-600 flex justify-center items-center text-black rounded-md">
            This is where the calender scheduler is
          </div>
        </div>
      </div>
      {/* Column 2 */}
      <div className="h-full w-[65%] flex flex-col">
        <div className="pt-8 px-12">
          <h1 className="text-2xl font-semibold tracking-wider pb-2 text-gray-500">
            Personal Information
          </h1>
          <hr className="border border-gray-300 w-[90%] mb-4" />
          <table class="table-auto">
            <tbody>
              <tr>
                <td className="w-[50%] py-2 font-semibold">Contact: </td>
                <td className="text-blue-700">+65 9123 4567</td>
              </tr>
              <tr>
                <td className="w-[50%] py-2 font-semibold">Email: </td>
                <td className="text-blue-700">CatherineOng@gmail.com</td>
              </tr>
              <tr>
                <td className="w-[50%] py-2 font-semibold">Address: </td>
                <td className="text-blue-700">234, Bishan Ave 2, #02-355</td>
              </tr>
              <tr>
                <td className="w-[50%] py-2 font-semibold">Education: </td>
                <td className="text-blue-700">Master Degree</td>
              </tr>
              <tr>
                <td className="w-[50%] py-2 font-semibold">Occupation: </td>
                <td className="text-blue-700">Primary School Teacher</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="pt-8 px-12">
          <h1 className="text-2xl font-semibold tracking-wider pb-2 text-gray-500">
            Profile & Experience
          </h1>
          <hr className="border border-gray-300 w-[90%] mb-4" />
          <table class="table-auto">
            <tbody>
              <tr>
                <td className="w-[27%] py-2 font-semibold">Languages:</td>
                <td className="text-blue-700">English, Chinese, Malay</td>
              </tr>
              <tr>
                <td className="w-[27%] py-2 font-semibold">Interests: </td>
                <td className="text-blue-700">Yoga, Children's welfare</td>
              </tr>
              <tr>
                <td className="w-[27%] py-2 font-semibold">Experience: </td>
                <td className="text-blue-700">
                  Grassroot volunteer for Bishan GRC, Meals-On-Wheels with
                  Touching Hearts
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        {/* Buttons */}
        <div className="flex pt-4 space-x-4 pl-12">
          <button className="btn btn-info text-white">
            View Upcoming Events
          </button>
          <button className="btn btn-primary text-white">Past Records</button>
          <button className="btn btn-accent text-white">Feedback</button>
          <button className="btn btn-secondary text-white">Edit Profile</button>
        </div>
      </div>
    </div>
  );
}

export default VolunteerProfileFull;

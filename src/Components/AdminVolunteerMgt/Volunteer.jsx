import { useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { MdOutlineInterests } from 'react-icons/md';
import { FaUserFriends } from 'react-icons/fa';
import { MdInterests } from 'react-icons/md';
import { MdOutlineLanguage } from 'react-icons/md';
import { IoBagHandleSharp } from 'react-icons/io5';
import { useGlobalAdminContext } from '../../Context/Admin/AdminContext';
import { useGlobalVolunteerContext } from '../../Context/VolunteerContext';

import Spinner from '../../Assets/Sample_images/spinner.gif';

import VolunteerAvailabilities from './VolunteerAvailabilities';
import VolunteerEvents from './VolunteerEvents';

function Volunteer() {
  const redirect = useNavigate();
  const {
    dispatch,
    getProfile,
    profile,
    setTempEditForm,
    isLoading,
    getVolunteerAvail,
    availabilities,
    volunteerEnrolments,
  } = useGlobalAdminContext();
  const { getEnrolments } = useGlobalVolunteerContext();
  const { id } = useParams();
  const { interests, hobbies, professionalExperience, profilePicture } =
    profile;
  const volunteer = profile?.volunteer;

  const profileCompleted =
    interests !== '' &&
    hobbies !== '' &&
    professionalExperience !== '' &&
    profilePicture !== '';

  const listOfConfirmAvails = availabilities?.filter((avail) => avail.avail);
  // console.log(listOfConfirmAvails);

  // Get volunteer's profile on component load
  useEffect(() => {
    dispatch({ type: 'SET_LOADING' });
    const getVolunteerProfile = async () => {
      const volunteerProfile = await getProfile(id);
      dispatch({ type: 'GET_VOLUNTEER_PROFILE', profile: volunteerProfile });
    };
    getVolunteerProfile();
  }, []);

  const toEditPage = () => {
    setTempEditForm(profile);
    redirect(`/admin/singlevolunteer/edit/${id}`);
  };

  // Get volunteer's availabilities on component load
  useEffect(() => {
    const getAvailabilities = async () => {
      try {
        const avails = await getVolunteerAvail(id);
        dispatch({ type: 'GET_VOLUNTEER_AVAIL', availabilities: avails });
      } catch (err) {
        console.log(err);
      }
    };
    getAvailabilities();
  }, []);

  // Get volunteer's enrolments
  useEffect(() => {
    const getPrograms = async () => {
      const programs = await getEnrolments(id);
      dispatch({
        type: 'GET_VOLUNTEER_ENROLMENTS',
        volunteerEnrolments: programs,
      });
    };
    getPrograms();
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

  return (
    <>
      <div>
        <div className="w-full h-auto mx-auto lg:w-10/12 px-16">
          <div className="mb-4">
            <Link to="/admin/main/editvolunteer" className="btn btn-ghost">
              Back To Search
            </Link>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-3 lg:grid-cols-3 md:grid-cols-3 mb-8 md:gap-8">
            <div className="custom-card-image mb-6 md:mb-0">
              <div className="rounded-3xl image-full">
                <figure>
                  <div className="flex justify-center items-center">
                    <img
                      className="rounded-3xl md:h-[35vh] md:w-[20vw]"
                      src={
                        volunteer?.profilePicture !== ''
                          ? volunteer?.profilePicture
                          : profilePicture === ''
                          ? 'https://simg.nicepng.com/png/small/810-8105444_male-placeholder.png'
                          : profilePicture
                      }
                      alt="profile"
                    />
                  </div>
                </figure>
              </div>
              <div className="flex justify-center items-center p-2">
                <button onClick={toEditPage} className="btn btn-primary btn-sm">
                  Edit Profile
                </button>
              </div>
            </div>

            <div className="col-span-2">
              <div className="mb-6">
                <h1 className="text-3xl card-title">
                  {volunteer?.name}
                  <div className="ml-2 mr-1 badge badge-info text-white">
                    Active
                  </div>
                  <div
                    className={`mx-1 badge ${
                      profileCompleted ? 'badge-info' : 'badge-error'
                    } text-white`}
                  >
                    {profileCompleted
                      ? 'Profile Completed'
                      : 'Incomplete Profile'}
                  </div>
                </h1>

                <div className="mt-4 card-actions text-2xl font-bold tracking-widest text-blue-500">
                  Personal Information
                </div>
              </div>

              <div className="w-full flex flex-col md:flex-row h-auto rounded-lg shadow-md bg-base-100 stats">
                <div className="stat">
                  <div className="stat-title text-md">Address</div>
                  <div className="text-sm stat-value">{volunteer?.address}</div>
                </div>
                <div className="stat">
                  <div className="stat-title text-md">Occupation</div>
                  <div className="text-sm stat-value">
                    <p>
                      {volunteer?.occupation
                        ? volunteer.occupation
                        : 'Did not indicate'}
                    </p>
                  </div>
                </div>
                <div className="stat">
                  <div className="stat-title text-md">Education</div>
                  <div className="text-sm stat-value">
                    {volunteer?.education}
                  </div>
                </div>

                <div className="stat">
                  <div className="stat-title text-md">Criminal Records</div>
                  <div className="text-sm stat-value">
                    {volunteer?.hasCriminalRecord ? 'Yes' : 'No'}
                  </div>
                </div>
              </div>

              <div className="w-full flex flex-col md:flex-row h-auto rounded-lg shadow-md bg-base-100 stats">
                <div className="stat">
                  <div className="stat-title text-md">Email</div>
                  <div className="text-sm stat-value">{volunteer?.email}</div>
                </div>
                <div className="stat">
                  <div className="stat-title text-md">Contact</div>
                  <div className="text-sm stat-value">{volunteer?.contact}</div>
                </div>
                <div className="stat">
                  <div className="stat-title text-md">Date of Birth</div>
                  <div className="text-sm stat-value">
                    {volunteer?.dateOfBirth}
                  </div>
                </div>
                <div className="stat">
                  <div className="stat-title text-md">Referral</div>
                  <div className="text-sm stat-value">
                    {volunteer?.referrerName} {volunteer?.referrerContact}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full py-5 rounded-lg shadow-md bg-base-100 stats px-4">
            <div className="grid grid-cols-1 md:grid-cols-2">
              {/* COLUMN 1 */}
              <div className="flex flex-col pb-8">
                <div className="flex justify-start space-y-1">
                  <FaUserFriends size={50} color={'skyblue'} />
                  <h1 className="text-3xl pl-2">Volunteering Experience</h1>
                </div>
                <p
                  className={`w-[90%] ${
                    volunteer?.pastExperience !== '' || null
                      ? 'text-blue-600'
                      : 'text-error'
                  } pt-3`}
                >
                  {volunteer?.pastExperience !== '' || null
                    ? volunteer?.pastExperience
                    : 'Not completed'}
                </p>
              </div>
              {/* COLUMN 2 */}
              <div className="flex flex-col pb-8">
                <div className="flex justify-start space-y-1">
                  <MdOutlineInterests size={50} color={'skyblue'} />
                  <h1 className="text-3xl pl-2">Interests</h1>
                </div>
                <p
                  className={`w-[90%] ${
                    interests !== '' ? 'text-blue-600' : 'text-error'
                  } pt-3`}
                >
                  {interests !== '' ? interests : 'Not completed'}
                </p>
              </div>
              {/* COLUMN 3 */}
              <div className="flex flex-col pb-8">
                <div className="flex justify-start space-y-1">
                  <MdInterests size={50} color={'skyblue'} />
                  <h1 className="text-3xl pl-2">Hobbies</h1>
                </div>
                <p
                  className={`w-[90%] ${
                    hobbies ? 'text-blue-600' : 'text-error'
                  } pt-3`}
                >
                  {hobbies ? hobbies : 'Not completed'}
                </p>
              </div>
              <div className="flex flex-col pb-8">
                <div className="flex justify-start space-y-1">
                  <MdOutlineLanguage size={50} color={'skyblue'} />
                  <h1 className="text-3xl pl-2">Languages</h1>
                </div>
                <p
                  className={`w-[90%] ${
                    volunteer?.language !== '' || null
                      ? 'text-blue-600'
                      : 'text-error'
                  } pt-3`}
                >{`${
                  volunteer?.language === ''
                    ? 'Not completed'
                    : volunteer?.language
                } ${
                  volunteer?.language2 !== '' ? ', ' + volunteer?.language2 : ''
                } ${
                  volunteer?.language3 !== '' ? ', ' + volunteer?.language3 : ''
                }`}</p>
              </div>
              <div className="flex flex-col pb-8">
                <div className="flex justify-start space-y-1">
                  <IoBagHandleSharp size={50} color={'skyblue'} />
                  <h1 className="text-3xl pl-2">Professional Experience</h1>
                </div>
                <p
                  className={`w-[90%] ${
                    professionalExperience !== ''
                      ? 'text-blue-600'
                      : 'text-error'
                  } pt-3`}
                >
                  {professionalExperience !== ''
                    ? professionalExperience
                    : 'Not completed'}
                </p>
              </div>
            </div>
          </div>

          {/* UPCOMING EVENTS TABLE */}
          {volunteerEnrolments?.length !== 0 ? (
            <>
              <VolunteerEvents volunteerEnrolments={volunteerEnrolments} />
            </>
          ) : (
            <>
              <div className="flex justify-start items-center rounded-lg  mt-8">
                <h1 className="font-bold tracking-widest text-2xl ml-2 text-blue-500">
                  Volunteer's Scheduled Events
                </h1>
              </div>
              <div className="flex justify-start items-center p-4">
                <h1 className="text-md text-error font-bold">
                  Please note that volunteer don't have any scheduled events
                </h1>
              </div>
            </>
          )}

          {/* AVAILABILITY TABLE */}
          {availabilities && listOfConfirmAvails?.length !== 0 ? (
            <VolunteerAvailabilities
              availabilities={availabilities}
              name={volunteer?.name}
              id={id}
            />
          ) : (
            <>
              <div className="flex justify-start items-center rounded-lg  mt-8">
                <h1 className="font-bold tracking-widest text-2xl ml-2 text-blue-500">
                  Volunteer's Availability
                </h1>
              </div>
              <div className="flex justify-start items-center p-4">
                <h1 className="text-md text-error font-bold">
                  Please note that volunteer don't have any available dates
                </h1>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default Volunteer;

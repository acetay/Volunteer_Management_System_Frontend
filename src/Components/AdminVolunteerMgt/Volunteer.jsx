import { useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { MdOutlineInterests } from 'react-icons/md';
import { FaUserFriends } from 'react-icons/fa';
import { MdInterests } from 'react-icons/md';
import { MdOutlineLanguage } from 'react-icons/md';
import { useGlobalAdminContext } from '../../Context/Admin/AdminContext';

function Volunteer() {
  const redirect = useNavigate();
  const { dispatch, getProfile, profile, setTempEditForm } =
    useGlobalAdminContext();
  const { id } = useParams();
  const { interest, hobbies, professionalExperience, profilePicture } = profile;
  const volunteer = profile?.volunteer;

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

  return (
    <>
      <div>
        <div className="w-full h-auto md:h-screen mx-auto lg:w-10/12 px-16">
          <div className="mb-4">
            <Link to="/admin/main/editvolunteer" className="btn btn-ghost">
              Back To Search
            </Link>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-3 lg:grid-cols-3 md:grid-cols-3 mb-8 md:gap-8">
            <div className="custom-card-image mb-6 md:mb-0">
              <div className="rounded-3xl image-full">
                <figure>
                  <img
                    className="rounded-3xl"
                    src={volunteer?.profilePicture}
                    alt="profile"
                  />
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
                  <div className="mx-1 badge badge-error text-white">
                    Profile Incomplete
                  </div>
                </h1>

                <div className="mt-4 card-actions text-2xl font-bold tracking-widest text-blue-500">
                  Personal Information
                </div>
              </div>

              <div className="w-full flex flex-col h-auto md:flex-row h-[50%] rounded-lg shadow-md bg-base-100 stats">
                <div className="stat">
                  <div className="stat-title text-md">Address</div>
                  <div className="text-sm stat-value">{volunteer?.address}</div>
                </div>
                <div className="stat">
                  <div className="stat-title text-md">Occupation</div>
                  <div className="text-sm stat-value">
                    <p>{volunteer?.occupation || 'Did not indicate'}</p>
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
                <tp className="w-[90%] text-blue-600">
                  {volunteer?.pastExperience}
                </tp>
              </div>
              {/* COLUMN 2 */}
              <div className="flex flex-col pb-8">
                <div className="flex justify-start space-y-1">
                  <MdOutlineInterests size={50} color={'skyblue'} />
                  <h1 className="text-3xl pl-2">Interests</h1>
                </div>
                <p className="w-[90%] text-blue-600">
                  {interest ? interest : 'Not completed'}
                </p>
              </div>
              {/* COLUMN 3 */}
              <div className="flex flex-col pb-8">
                <div className="flex justify-start space-y-1">
                  <MdInterests size={50} color={'skyblue'} />
                  <h1 className="text-3xl pl-2">Hobbies</h1>
                </div>
                <p className="w-[90%] text-blue-600">
                  {hobbies ? hobbies : 'Not completed'}
                </p>
              </div>
              <div className="flex flex-col pb-8">
                <div className="flex justify-start space-y-1">
                  <MdOutlineLanguage size={50} color={'skyblue'} />
                  <h1 className="text-3xl pl-2">Languages</h1>
                </div>
                <p className="w-[90%] text-blue-600">{`${volunteer?.language}`}</p>
              </div>
            </div>
          </div>
        </div>

        {/* <RepoList repos={repos} /> */}
      </div>
    </>
  );
}

export default Volunteer;

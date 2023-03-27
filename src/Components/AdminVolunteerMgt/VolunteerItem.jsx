import { Link } from 'react-router-dom';
import { useGlobalAdminContext } from '../../Context/Admin/AdminContext';
import { useState, useEffect } from 'react';

function VolunteerItem({ volunteer, toggle }) {
  const { profiles } = useGlobalAdminContext();

  const [profileComplete, setProfileComplete] = useState(null);

  useEffect(() => {
    const findProfile = profiles.find(
      (profile) => profile.volunteer.id === volunteer.id
    );
    let isProfileComplete = findProfile
      ? findProfile.interests !== '' &&
        findProfile.professionalExperience !== ''
        ? true
        : false
      : null;
    setProfileComplete(isProfileComplete);
  }, [toggle]);

  return (
    <div className="card shadow-lg compact side bg-slate-100">
      <div className="flex-row items-center space-x-4 card-body">
        <div>
          <div className="avatar">
            <div className="rounded-full shadow w-14 h-14">
              <img src={volunteer?.profilePicture} alt={volunteer?.name} />
            </div>
          </div>
        </div>
        <div>
          <h2 className="card-title text-sm text-gray-700">
            {volunteer?.name}
          </h2>
          <p className="text-xs text-blue-600">
            Member since {volunteer?.createdAt.substring(0, 4)}
          </p>
          <Link
            className="text-base-content  text-opacity-70 hover:text-blue-500"
            to={`/admin/singlevolunteer/${volunteer?.id}`}
          >
            View more
          </Link>
          {profileComplete ? (
            <p className="bg-blue-300 text-white text-center p-1 text-xs rounded-lg">
              Profile completed
            </p>
          ) : (
            <p className="bg-red-300 text-white text-center p-1 text-xs rounded-lg">
              Profile incomplete
            </p>
          )}

          <p className="bg-blue-300 text-white text-center p-1 text-xs rounded-lg mt-2 w-[60%]">
            Active
          </p>
        </div>
      </div>
    </div>
  );
}

export default VolunteerItem;
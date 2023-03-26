import VolunteerItem from './VolunteerItem';
import { useGlobalAdminContext } from '../../Context/Admin/AdminContext';
import Spinner from '../../Assets/Sample_images/circle.gif';
import VolunteerSearch from './VolunteerSearch';

function VolunteerResults() {
  const { isLoading, volunteers } = useGlobalAdminContext();

  if (!isLoading) {
    return (
      <>
        <div className="flex flex-col justify-center items-center py-4">
          <h1 className="text-lg text-gray-400 font-semibold tracking-wider py-4">
            Search for volunteers
          </h1>
          <VolunteerSearch volunteers={volunteers} />
        </div>

        <div className="grid grid-cols-1 gap-8 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2">
          {volunteers.map((volunteer) => (
            <VolunteerItem key={volunteer.id} volunteer={volunteer} />
          ))}
        </div>
      </>
    );
  } else {
    return <Spinner />;
  }
}

export default VolunteerResults;

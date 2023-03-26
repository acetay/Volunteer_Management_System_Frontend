import VolunteerItem from './VolunteerItem';
import { useGlobalAdminContext } from '../../Context/Admin/AdminContext';
import Spinner from '../../Assets/Sample_images/circle.gif';

function VolunteerResults() {
  const { isLoading, volunteers } = useGlobalAdminContext();
  if (!isLoading) {
    return (
      <div className="grid grid-cols-1 gap-8 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2">
        {volunteers.map((volunteer) => (
          <VolunteerItem key={volunteer.id} user={volunteer} />
        ))}
      </div>
    );
  } else {
    return <Spinner />;
  }
}

export default VolunteerResults;

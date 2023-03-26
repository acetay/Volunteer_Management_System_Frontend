import { Link } from 'react-router-dom';

function VolunteerItem({ volunteer }) {
  return (
    <div className="card shadow-md compact side bg-state-100">
      <div className="flex-row items-center space-x-4 card-body">
        <div>
          <div className="avatar">
            <div className="rounded-full shadow w-14 h-14">
              <img
                src="https://www.shutterstock.com/image-vector/man-character-face-avatar-glasses-260nw-542759665.jpg"
                alt="Profile"
              />
            </div>
          </div>
        </div>
        <div>
          <h2 className="card-title">{volunteer?.name}</h2>
          <Link className="text-base-content text-opacity-40" to={`/`}>
            View Profile
          </Link>
        </div>
      </div>
    </div>
  );
}

export default VolunteerItem;

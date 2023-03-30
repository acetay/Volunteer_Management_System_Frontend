import { Link } from 'react-router-dom';

function AdminProgramItem({ enrolment }) {
  return (
    <div className="card card-compact w-96 bg-base-100 shadow-xl flex-wrap">
      <figure>
        <img
          src={
            enrolment?.program.photo ||
            'https://static.thehoneycombers.com/wp-content/uploads/sites/2/2017/11/Salvation-Army.jpg'
          }
          alt="photo"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{enrolment?.program.name}</h2>
        <p className="text-blue-500">{enrolment?.date}</p>
        <p>{enrolment?.program.description}</p>
        <div className="card-actions justify-end">
          <Link to={`/admin/programs/${enrolment?.program.id}`}>
            <button className="btn btn-primary">Admin</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default AdminProgramItem;

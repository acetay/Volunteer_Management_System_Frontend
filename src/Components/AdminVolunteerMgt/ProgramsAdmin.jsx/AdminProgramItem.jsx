import { Link } from 'react-router-dom';

function AdminProgramItem({ enrolment }) {
  const newDate = enrolment.date.split('-').reverse().join('-');
  const enrolmentDate = new Date(newDate);
  const today = new Date();
  const closed = today >= enrolmentDate;
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
        <div className="flex items-baseline space-x-2">
          <h2 className="card-title">{enrolment?.program.name}</h2>
          {closed && (
            <button className="bg-error rounded-lg btn-sm text-white font-bold">
              Ended
            </button>
          )}
        </div>

        <p
          className={`${
            closed ? 'text-red-600 line-through' : 'text-blue-500'
          } font-semibold`}
        >
          {enrolment?.date}
        </p>

        <p>{enrolment?.program.description}</p>
        <div className="card-actions justify-end">
          <Link to={`/admin/programs/${enrolment?.program.id}`}>
            <button
              className={`btn ${closed ? ' text-white btn-sm' : 'btn-primary'}`}
            >
              {closed ? 'info' : 'Admin'}
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default AdminProgramItem;

import React from 'react';

function AdminProgramItem({ enrolment }) {
  return (
    <div className="card card-compact w-96 bg-base-100 shadow-xl">
      <figure>
        <img src={enrolment?.program.photo} alt="photo" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{enrolment?.program.name}</h2>
        <p>{enrolment?.program.description}</p>
        <div className="card-actions justify-end">
          <button className="btn btn-primary">Admin</button>
        </div>
      </div>
    </div>
  );
}

export default AdminProgramItem;

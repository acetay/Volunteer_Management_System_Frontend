import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useGlobalAdminContext } from '../../../Context/Admin/AdminContext';
import Swal from 'sweetalert2';

// import {
//   getAllPrograms,
//   addProgram,
// } from '../../../Context/Admin/AdminApiActions';

function AdminProgramStarter() {
  const redirect = useNavigate();
  const [form, setForm] = useState({});
  const { dispatch, getAllPrograms, addProgram } = useGlobalAdminContext();
  const changeHandler = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const addNewProgram = async () => {
    const program = await addProgram({ ...form, noOfVolunteers: 0 });
    const getProgAndEnrols = await getAllPrograms();
    dispatch({ type: 'ADD_NEW_PROGRAM', program: program });
    dispatch({
      type: 'GET_PROGRAMS_ENROLMENTS',
      payload: getProgAndEnrols,
    });
    setForm(() => {});
    Swal.fire({
      title: 'Successful Launch',
      text: 'Program created!',
      icon: 'success',
    });
    redirect('/admin/programs');
  };

  return (
    <div>
      <div className="flex flex-col mt-4 justify-center items-center pt-4">
        {/* 1st Row Inputs */}
        <div className="flex">
          <div className="flex flex-col">
            <label className="pb-2 pl-2 font-semibold text-sm" htmlFor="name">
              Name of Program:
            </label>
            <input
              id="name"
              name="name"
              value={form.name}
              onChange={changeHandler}
              placeholder="Name of program"
              type="text"
              className="input input-bordered input-info w-[35vw] input-md"
            />
          </div>
        </div>
        {/* 2nd Row Inputs */}
        <div className="flex mt-4">
          <div className="flex flex-col">
            <label className="pb-2 pl-2 font-semibold text-sm" htmlFor="photo">
              Photo (URL):
            </label>
            <input
              id="photo"
              name="photo"
              value={form.photo}
              onChange={changeHandler}
              type="text"
              placeholder="Your image url"
              className="input input-bordered input-info w-[35vw] input-md"
            />
          </div>
        </div>
        {/* 3rd Row Inputs */}
        <div className="flex mt-5">
          <div className="flex flex-col">
            <label className="pb-2 pl-2 font-semibold text-sm" htmlFor="date">
              Date:
            </label>
            <input
              id="date"
              name="date"
              value={form.date}
              onChange={changeHandler}
              type="date"
              placeholder="Date of program"
              className="input input-bordered input-info w-[35vw] input-md"
            />
          </div>
        </div>
        {/* 3rd Row Inputs */}
        <div className="flex mt-5 space-x-4 justify-between w-[35vw]">
          <div className="flex flex-col">
            <label
              className="pb-2 pl-2 font-semibold text-sm"
              htmlFor="timeOfProgram"
            >
              Time of Program:
            </label>
            <select
              name="timeOfProgram"
              onChange={changeHandler}
              className="select select-info w-full max-w-md w-[18vw] select-md text-md font-normal"
            >
              <option defaultValue>Timeslot</option>
              <option>0800hrs - 1200hrs</option>
              <option>1300hrs - 1800hrs</option>
              <option>1900hrs - 2200hrs</option>
              <option>Full day</option>
            </select>
          </div>
          <div className="flex flex-col">
            <label className="pb-2 pl-2 font-semibold text-sm" htmlFor="date">
              Number of volunteers:
            </label>
            <input
              id="volunteersRequired"
              name="volunteersRequired"
              value={form.volunteersRequired}
              onChange={changeHandler}
              type="number"
              placeholder="Date of program"
              className="input input-bordered input-info w-[15vw] input-md"
            />
          </div>
        </div>

        {/* 4th row Inputs */}
        <div className="flex mt-4">
          <div className="flex flex-col w-[35vw]">
            <label
              className="pb-2 pl-2 font-semibold text-sm"
              htmlFor="description"
            >
              Description:
            </label>
            <textarea
              name="description"
              id="description"
              onChange={changeHandler}
              className="textarea textarea-info w-full textarea-md"
              placeholder="Program description."
            ></textarea>
          </div>
        </div>
        <div className="flex justify-center items-center p-4 space-x-2">
          <Link to="/admin/main">
            <button className="btn btn-info text-white btn-sm">Back</button>
          </Link>

          <button onClick={addNewProgram} className="btn btn-secondary btn-sm">
            Launch
          </button>
        </div>
      </div>
    </div>
  );
}

export default AdminProgramStarter;

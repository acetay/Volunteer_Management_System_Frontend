import { useState, useEffect } from 'react';
import { useGlobalAdminContext } from '../../Context/Admin/AdminContext';
import { useParams, useNavigate } from 'react-router-dom';

function VolunteerEdit() {
  const [form, setForm] = useState({});
  const { id } = useParams();
  const redirect = useNavigate();
  const { tempEditForm } = useGlobalAdminContext();
  const changeHandler = (e) => {};
  return (
    <>
      <div className="flex flex-col h-auto md:h-[75vh] justify-center items-center">
        <div>
          <h1 className="text-3xl font-bold">Profile Edit for</h1>
          <div className="flex flex-col mt-4">
            {/* 1st Row Inputs */}
            <div className="flex space-x-8">
              <div className="flex flex-col">
                <label
                  className="pb-2 pl-2 font-semibold text-sm"
                  htmlFor="name"
                >
                  Interests:
                </label>
                <input
                  id="interests"
                  name="interests"
                  value={tempEditForm?.interests}
                  onChange={changeHandler}
                  placeholder="Main interests"
                  type="text"
                  className="input input-bordered input-info w-[35vw] input-md"
                />
              </div>
              <div className="flex flex-col">
                <label
                  className="pb-2 pl-2 font-semibold text-sm"
                  htmlFor="hobbies"
                >
                  Hobbies:
                </label>
                <input
                  id="hobbies"
                  name="hobbies"
                  value={tempEditForm?.hobbies}
                  onChange={changeHandler}
                  placeholder="Volunteer's hobbies and likes"
                  type="text"
                  className="input input-bordered input-info w-[35vw] input-md"
                />
              </div>
            </div>

            {/* 3rd Row Inputs */}
            <div className="flex space-x-12 mt-5">
              <div className="flex flex-col">
                <label
                  className="pb-2 pl-2 font-semibold text-sm"
                  htmlFor="profilePicture"
                >
                  Profile Image Upload:
                </label>
                <input
                  id="profilePicture"
                  name="profilePicture"
                  value={tempEditForm?.profilePicture}
                  onChange={changeHandler}
                  placeholder="Image URL"
                  className="input input-bordered input-info input-sm w-[40vw]"
                />
              </div>
            </div>

            {/* 5th row Inputs */}
            <div className="flex space-x-8 mt-4">
              <div className="flex flex-col w-full">
                <label
                  className="pb-2 pl-2 font-semibold text-sm"
                  htmlFor="experience"
                >
                  Professional Experience:
                </label>
                <textarea
                  name="professionalExperience"
                  id="professionalExperience"
                  value={tempEditForm?.professionalExperience}
                  onChange={changeHandler}
                  className="textarea textarea-info w-full textarea-md h-[25vh]"
                  placeholder="Describe volunteer's professional experience, if any."
                ></textarea>
              </div>
            </div>
          </div>
          <div className="flex justify-end items-center p-4 space-x-4">
            <button
              onClick={() => redirect(`/admin/singlevolunteer/${id}`)}
              className="btn btn-error btn-sm text-white"
            >
              Cancel
            </button>
            <button className="btn btn-success btn-sm text-white">
              Submit
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default VolunteerEdit;

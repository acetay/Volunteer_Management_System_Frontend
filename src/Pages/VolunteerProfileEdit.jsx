import { useParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useGlobalVolunteerContext } from '../Context/VolunteerContext';
import Swal from 'sweetalert2';

function VolunteerProfileEdit() {
  const { editVolunteer, editForm } = useGlobalVolunteerContext();
  const redirect = useNavigate();
  const { id } = useParams();
  const user = JSON.parse(localStorage.getItem('singleUser'))?.volunteer;
  // Inject values from editForm via Global Context
  const [form, setForm] = useState(user);

  const changeHandler = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const editHandler = () => {
    try {
      editVolunteer(id, form);
      Swal.fire({
        title: 'Success',
        text: 'Profile successfully edited!',
        icon: 'success',
      });
      redirect(`/volunteers/profile/${id}`);
    } catch (err) {
      console.log(err.message);
      Swal.fire({
        title: 'Something went wrong!',
        text: err.message,
        icon: 'error',
      });
    }
  };

  const cancelEdit = () => {
    redirect(`/volunteers/profile/${id}`);
  };

  return (
    <div className="h-full px-40 py-4 mt-2">
      <h1 className="font-bold text-2xl tracking-widest text-blue-700">
        Edit Personnal Info
      </h1>
      {/* Form Container */}
      <div className="container flex flex-col mt-4">
        {/* 1st Row Inputs */}
        <div className="flex space-x-8">
          <div className="flex flex-col">
            <label className="pb-2 pl-2 font-semibold text-sm" htmlFor="name">
              Name:
            </label>
            <input
              id="name"
              name="name"
              value={form?.name}
              onChange={changeHandler}
              placeholder="Your full name"
              type="text"
              className="input input-bordered input-info w-[35vw] input-md"
            />
            {/* <p className="text-[12px] pl-2 pt-1 text-gray-400 font-semibold tracking-wider">
              Name as per your nric
            </p> */}
          </div>
          <div className="flex flex-col">
            <label className="pb-2 pl-2 font-semibold text-sm" htmlFor="email">
              Email:
            </label>
            <input
              id="email"
              name="email"
              value={form?.email}
              onChange={changeHandler}
              placeholder="Your personnal email address"
              type="email"
              className="input input-bordered input-info w-[35vw] input-md"
            />
          </div>
        </div>
        {/* 2nd Row Inputs */}
        <div className="flex space-x-8 mt-4">
          <div className="flex flex-col">
            <label
              className="pb-2 pl-2 font-semibold text-sm"
              htmlFor="contact"
            >
              Contact Number:
            </label>
            <input
              id="contact"
              name="contact"
              value={form?.contact}
              onChange={changeHandler}
              type="text"
              placeholder="Your contact number"
              className="input input-bordered input-info w-[35vw] input-md"
            />
          </div>
          <div className="flex flex-col">
            <label
              className="pb-2 pl-2 font-semibold text-sm"
              htmlFor="address"
            >
              Residential Address:
            </label>
            <input
              id="address"
              name="address"
              value={form?.address}
              onChange={changeHandler}
              type="text"
              placeholder="Your residential address"
              className="input input-bordered input-info w-[35vw] input-md"
            />
          </div>
        </div>
        {/* 3rd Row Inputs */}
        <div className="flex space-x-12 mt-5">
          <div className="flex flex-col">
            <label
              className="pb-2 pl-2 font-semibold text-sm"
              htmlFor="dateOfBirth"
            >
              Birthday:
            </label>
            <input
              id="dateOfBirth"
              name="dateOfBirth"
              value={form?.dateOfBirth}
              onChange={changeHandler}
              // placeholder="current yr age"
              type="date"
              className="input input-bordered input-info input-sm"
            />
          </div>
          <div className="flex flex-col">
            <label
              className="pb-2 pl-2 font-semibold text-sm"
              htmlFor="education"
            >
              Education:
            </label>
            <select
              name="education"
              onChange={changeHandler}
              value={form?.education}
              className="select select-info w-full max-w-xs select-sm text-sm font-normal"
            >
              <option defaultValue>Highest Education</option>
              <option>Degree or higher</option>
              <option>Diploma</option>
              <option>A Levels</option>
              <option>ITE</option>
              <option>O Levels</option>
              <option>N Levels</option>
              <option>Secondary</option>
              <option>Primary</option>
            </select>
          </div>
          <div className="flex flex-col">
            <label
              className="pb-2 pl-2 font-semibold text-sm"
              htmlFor="hasCriminalRecord"
            >
              Criminal Records:
            </label>
            <select
              name="hasCriminalRecord"
              value={form?.hasCriminalRecord}
              onChange={changeHandler}
              className="select select-info w-full max-w-xs select-sm text-sm font-normal"
            >
              <option defaultValue>Past Offender?</option>
              <option value={true}>Yes</option>
              <option value={false}>No</option>
            </select>
          </div>
          <div className="flex flex-col">
            <label
              className="pb-2 pl-2 font-semibold text-sm"
              htmlFor="referrerName"
            >
              Referral, if any:
            </label>
            <input
              id="referrerName"
              name="referrerName"
              value={form?.referrerName}
              onChange={changeHandler}
              type="text"
              placeholder="Referral Name"
              className="input input-bordered input-info input-sm"
            />
          </div>
          <div className="flex flex-col">
            <label
              className="pb-2 pl-2 font-semibold text-sm"
              htmlFor="referrerContact"
            >
              Referral contact:
            </label>
            <input
              id="referrerContact"
              name="referrerContact"
              value={form?.referrerContact}
              onChange={changeHandler}
              placeholder="Referral Contact"
              className="input input-bordered input-info input-sm"
            />
          </div>
        </div>
        {/* 4th Row Inputs */}
        <h1 className="pl-2 font-semibold text-sm mt-6">Languages (spoken):</h1>
        <div className="flex space-x-8 mt-2">
          <div className="flex flex-col">
            <select
              name="language"
              value={form?.language}
              onChange={changeHandler}
              className="select select-info w-full max-w-xs select-sm text-sm font-normal"
            >
              <option defaultValue>1st choice</option>
              <option>English</option>
              <option>Chinese</option>
              <option>Hokkien</option>
              <option>Cantonese</option>
              <option>Teochew</option>
              <option>Malay</option>
              <option>Hindi</option>
            </select>
          </div>
          <div className="flex flex-col">
            <select className="select select-info w-full max-w-xs select-sm text-sm font-normal">
              <option defaultValue>2nd choice</option>
              <option>English</option>
              <option>Chinese</option>
              <option>Hokkien</option>
              <option>Cantonese</option>
              <option>Teochew</option>
              <option>Malay</option>
              <option>Hindi</option>
            </select>
          </div>
          <div className="flex flex-col">
            <select className="select select-info w-full max-w-xs select-sm text-sm font-normal">
              <option defaultValue>3rd choice</option>
              <option>English</option>
              <option>Chinese</option>
              <option>Hokkien</option>
              <option>Cantonese</option>
              <option>Teochew</option>
              <option>Malay</option>
              <option>Hindi</option>
            </select>
          </div>
        </div>
        {/* 5th row Inputs */}
        <div className="flex space-x-8 mt-4">
          <div className="flex flex-col w-full">
            <label
              className="pb-2 pl-2 font-semibold text-sm"
              htmlFor="experience"
            >
              Past Experience:
            </label>
            <textarea
              name="pastExperience"
              id="pastExperience"
              value={form?.pastExperience}
              onChange={changeHandler}
              className="textarea textarea-info w-full textarea-md"
              placeholder="Tell us about your past volunteering experience, if any."
            ></textarea>
          </div>
        </div>
      </div>
      <div className="flex justify-end items-center mt-4 pr-6 space-x-8">
        <button
          onClick={cancelEdit}
          className="btn btn-error btn-sm text-white"
        >
          Cancel
        </button>
        <button onClick={editHandler} className="btn btn-primary btn-sm">
          Edit
        </button>
      </div>
    </div>
  );
}

export default VolunteerProfileEdit;

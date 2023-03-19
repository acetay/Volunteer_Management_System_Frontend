import { useState } from 'react';
import { Link } from 'react-router-dom';

function VolunteerSignUp() {
  const [form, setForm] = useState({});

  return (
    <div className="h-full px-40 py-4 mt-2">
      <h1 className="font-bold text-xl tracking-widest text-blue-700">
        Volunteer Registration
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
              placeholder="Your personnal email address"
              type="email"
              className="input input-bordered input-info w-[35vw] input-md"
            />
            {/* <p className="text-[12px] pl-2 pt-1 text-gray-400 font-semibold tracking-wider">
              Latest updates will be sent via this email
            </p> */}
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
              type="text"
              placeholder="Your contact number"
              className="input input-bordered input-info w-[35vw] input-md"
            />
            {/* <p className="text-[12px] pl-2 pt-1 text-gray-400 font-semibold tracking-wider">
              Please provide a mobile number
            </p> */}
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
              type="text"
              placeholder="Your residential address"
              className="input input-bordered input-info w-[35vw] input-md"
            />
            {/* <p className="text-[12px] pl-2 pt-1 text-gray-400 font-semibold tracking-wider">
              For emergency purpose
            </p> */}
          </div>
        </div>
        {/* 3rd Row Inputs */}
        <div className="flex space-x-12 mt-5">
          <div className="flex flex-col">
            <label
              className="pb-2 pl-2 font-semibold text-sm"
              htmlFor="birthday"
            >
              Date of Birth:
            </label>
            <input
              id="birthday"
              name="birthday"
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
            <select className="select select-info w-full max-w-xs select-sm text-sm font-normal">
              <option disabled selected>
                Highest Education
              </option>
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
              htmlFor="education"
            >
              Criminal Records:
            </label>
            <select className="select select-info w-full max-w-xs select-sm text-sm font-normal">
              <option disabled selected>
                Past Offender?
              </option>
              <option>Yes</option>
              <option>No</option>
            </select>
          </div>
        </div>
        {/* 4th Row Inputs */}
        <h1 className="pl-2 font-semibold text-sm mt-6">Languages (spoken):</h1>
        <div className="flex space-x-8 mt-2">
          <div className="flex flex-col">
            <select className="select select-info w-full max-w-xs select-sm text-sm font-normal">
              <option disabled selected>
                1st choice
              </option>
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
              <option disabled selected>
                2nd choice
              </option>
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
              <option disabled selected>
                3rd choice
              </option>
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
              className="textarea textarea-info w-full textarea-md"
              placeholder="Tell us about your past volunteering experience, if any."
            ></textarea>
          </div>
        </div>
      </div>
      <div className="flex justify-end items-center mt-4 pr-6 space-x-8">
        <p className="text-sm text-blue-600">
          Already have an account?{' '}
          <Link to="/volunteers/signin" className="underline">
            Sign in.
          </Link>
        </p>
        <button className="btn btn-primary btn-sm">Signup!</button>
      </div>
    </div>
  );
}

export default VolunteerSignUp;

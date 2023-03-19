import { useState } from 'react';

function VolunteerSignUp() {
  const [form, setForm] = useState({});

  return (
    <div className="h-full px-40 py-8">
      <h1 className="font-semibold text-3xl tracking-wider text-gray-700">
        Volunteer Signup
      </h1>
      {/* Form Container */}
      <div className="container flex flex-col mt-4">
        {/* 1st Row Inputs */}
        <div className="flex space-x-8">
          <div className="flex flex-col">
            <label className="pb-2 pl-2 font-semibold" htmlFor="name">
              Name:
            </label>
            <input
              id="name"
              name="name"
              placeholder="Your full name"
              type="text"
              className="input input-bordered input-info w-[35vw]"
            />
            {/* <p className="text-[12px] pl-2 pt-1 text-gray-400 font-semibold tracking-wider">
              Name as per your nric
            </p> */}
          </div>
          <div className="flex flex-col">
            <label className="pb-2 pl-2 font-semibold" htmlFor="email">
              Email:
            </label>
            <input
              id="email"
              name="email"
              placeholder="Your personnal email address"
              type="email"
              className="input input-bordered input-info w-[35vw]"
            />
            {/* <p className="text-[12px] pl-2 pt-1 text-gray-400 font-semibold tracking-wider">
              Latest updates will be sent via this email
            </p> */}
          </div>
        </div>
        {/* 2nd Row Inputs */}
        <div className="flex space-x-8 mt-4">
          <div className="flex flex-col">
            <label className="pb-2 pl-2 font-semibold" htmlFor="contact">
              Contact Number:
            </label>
            <input
              id="contact"
              name="contact"
              type="text"
              placeholder="Your contact number"
              className="input input-bordered input-info w-[35vw]"
            />
            {/* <p className="text-[12px] pl-2 pt-1 text-gray-400 font-semibold tracking-wider">
              Please provide a mobile number
            </p> */}
          </div>
          <div className="flex flex-col">
            <label className="pb-2 pl-2 font-semibold" htmlFor="address">
              Residential Address:
            </label>
            <input
              id="address"
              name="address"
              type="text"
              placeholder="Your residential address"
              className="input input-bordered input-info w-[35vw]"
            />
            {/* <p className="text-[12px] pl-2 pt-1 text-gray-400 font-semibold tracking-wider">
              For emergency purpose
            </p> */}
          </div>
        </div>
        {/* 3rd Row Inputs */}
        <div className="flex space-x-8 mt-4">
          <div className="flex flex-col">
            <label className="pb-2 pl-2 font-semibold" htmlFor="birthday">
              Date of Birth:
            </label>
            <input
              id="birthday"
              name="birthday"
              type="date"
              className="input input-bordered input-info"
            />
          </div>
          <div className="flex flex-col">
            <label className="pb-2 pl-2 font-semibold" htmlFor="language">
              Language:
            </label>
            <input
              id="language"
              placeholder="Preferred language"
              name="language"
              type="text"
              className="input input-bordered input-info"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default VolunteerSignUp;

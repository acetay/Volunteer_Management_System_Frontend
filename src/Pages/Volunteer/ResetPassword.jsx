import { useState } from 'react';
import { useGlobalVolunteerContext } from '../../Context/VolunteerContext';

function ResetPassword() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);

  const onChangeHandler = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const onSubmitHandler = (e) => {
    e.preventDefault();
  };

  return (
    <div className="h-auto md:h-screen px-28 py-4 mt-2">
      <div className="flex flex-col justify-center items-center w-full mt-20">
        <h1 className="text-4xl p-4 font-bold">Password Reset</h1>
        <form onSubmit={onSubmitHandler} className="mt-4">
          <div className="flex flex-col justify-center items-center space-y-8">
            <input
              type="text"
              onChange={onChangeHandler}
              name="email"
              value={form.email}
              placeholder="Email"
              className="input input-bordered input-info w-[40vw] lg:w-[70vw] max-w-xs"
            />
            <input
              type={`${showPassword ? 'text' : 'password'}`}
              onChange={onChangeHandler}
              name="password"
              value={form.password}
              placeholder="Password"
              className="input input-bordered input-info  w-[40vw] lg:w-[70vw] max-w-xs"
            />
          </div>
          <div className="flex justify-between items-center mt-2">
            <div className="form-group form-check">
              <input
                type="checkbox"
                className="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                id="exampleCheck2"
                onChange={() => setShowPassword(!showPassword)}
              />
              <label className="form-check-label inline-block text-gray-800">
                <div className="flex justify-center items-center pt-1 space-x-1">
                  <p className="text-xs">Show password</p>
                </div>
              </label>
            </div>
          </div>
          <div className="flex justify-center items-center mt-8">
            <button className="btn btn-info w-full text-white">Change</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ResetPassword;

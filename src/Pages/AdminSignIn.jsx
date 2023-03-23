import { useState } from 'react';
import { SiGooglefit } from 'react-icons/si';

function AdminSignIn() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);

  const onChangeHandler = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Sign in with email and password
  const onSubmitHandler = async (e) => {
    e.preventDefault();
  };

  return (
    <div className="flex flex-col h-auto justify-center items-center">
      <div className="flex flex-col justify-center items-center lg:mt-8 space-y-4 p-6 py-10 px-12 border border-gray-200 rounded-md shadow-lg">
        <h1 className="text-3xl font-bold text-blue-600 tracking-wider">
          Administrator
        </h1>
        <p className="text-gray-500 tracking-wider font-semibold">
          Administrator Portal (For staff only)
        </p>
        <div className="flex flex-col justify-center items-center w-full">
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
              <button className="btn btn-info w-full text-white">
                Sign in
              </button>
            </div>
          </form>
          <div className="flex justify-center items-center pt-8 space-x-2">
            <SiGooglefit size={32} color={'red'} />
            <h1 className="font-bold text-2xl text-blue-800">HopeForLife</h1>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminSignIn;

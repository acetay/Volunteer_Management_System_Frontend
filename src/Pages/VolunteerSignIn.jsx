import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useGlobalVolunteerContext } from '../Context/VolunteerContext';
import Swal from 'sweetalert2';

function VolunteerSignIn() {
  const redirect = useNavigate();
  const {
    signInUserWithPwAndEmail,
    setIsLoggedIn,
    isLoggedIn,
    signInVolunteer,
    authUser,
  } = useGlobalVolunteerContext();
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  useEffect(() => {
    if (authUser?.uid && isLoggedIn) {
      signInVolunteer({ uid: authUser.uid });
    }
  }, [isLoggedIn]);

  useEffect(() => {
    if (authUser?.profile) {
      const id = authUser.profile.volunteer.id;
      redirect(`/volunteers/profile/${id}`);
    }
  }, [signInVolunteer]);

  const onChangeHandler = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Sign in with email and password
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await signInUserWithPwAndEmail(
        form.email,
        form.password
      );
      setIsLoggedIn(true);
    } catch (err) {
      Swal.fire({
        title: 'Invalid',
        text: 'You have entered the wrong credentials. Please check again!',
        icon: 'error',
      });
      console.log(err.message);
      setForm({ email: '', password: '' });
    }
  };

  return (
    <div className="flex flex-col h-auto justify-center items-center">
      <div className="flex flex-col justify-center items-center lg:mt-8 space-y-4 p-6 py-10 px-12 border border-gray-200 rounded-md shadow-lg">
        <h1 className="text-3xl font-bold text-blue-600 tracking-wider">
          Volunteer Sign in
        </h1>
        <p className="text-blue-700">
          Don't have an account yet?{' '}
          <Link to="/volunteers/signup" className="underline">
            Sign up.
          </Link>
        </p>
        <p className="text-gray-500 tracking-wider font-semibold">
          For Hope volunteers
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
        </div>
      </div>
    </div>
  );
}

export default VolunteerSignIn;

import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useGlobalVolunteerContext } from '../../Context/Volunteer/VolunteerContext';
import { SiGooglefit } from 'react-icons/si';

import Swal from 'sweetalert2';

function VolunteerSignIn() {
  const redirect = useNavigate();
  const {
    signInUserWithPwAndEmail,
    setIsLoggedIn,
    isLoggedIn,
    signInVolunteer,
    singleUser,
    setAuthUser,
    userUid,
    setIsLoading,
  } = useGlobalVolunteerContext();
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  // Orginal condition - to remove once stable
  // authUser?.uid
  useEffect(() => {
    if (isLoggedIn) {
      signInVolunteer({ uid: userUid });
      setForm({ ...form, email: '', password: '' });
    } else {
      setForm({ ...form, email: '', password: '' });
      const userRecord = JSON.parse(localStorage.getItem('singleUser'));
      setTimeout(() => {
        if (userRecord === null) {
          localStorage.clear();
          setAuthUser({});
        }
      }, 3000);
    }
  }, [isLoggedIn]);

  useEffect(() => {
    if (singleUser?.volunteer) {
      setIsLoading(false);
      const id = singleUser?.volunteer.id;
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
      setIsLoading(true);
      await signInUserWithPwAndEmail(form.email, form.password);
      setIsLoggedIn(true);
    } catch (err) {
      setForm({ email: '', password: '' });
      redirect(`/volunteers/signin`);
      Swal.fire({
        title: 'Invalid',
        text: 'You have entered the wrong credentials. Please check again!',
        icon: 'error',
      });
      console.log(err.message);
    }
  };

  return (
    <div className="flex flex-col h-auto md:h-screen justify-center items-center">
      <div className="flex flex-col justify-center items-center lg:mt-8 space-y-4 p-6 py-10 px-12 border border-gray-200 rounded-md shadow-lg">
        <h1 className="text-3xl font-bold text-blue-600 tracking-wider">
          Volunteer Sign in
        </h1>
        <p className="text-blue-800">
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
          <div className="flex justify-center items-center pt-6 space-x-2">
            <SiGooglefit size={32} color={'red'} />
            <h1 className="font-bold text-2xl text-blue-800">HopeForLife</h1>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VolunteerSignIn;

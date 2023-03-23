import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useGlobalVolunteerContext } from '../Context/VolunteerContext';

function VolunteerSignIn() {
  const redirect = useNavigate();
  const {
    signInUserWithPwAndEmail,
    setIsLoggedIn,
    isLoggedIn,
    signInVolunteer,
    authUser,
  } = useGlobalVolunteerContext();

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
      console.log(err.message);
    }
  };

  return (
    <div className="flex flex-col h-auto justify-center items-center">
      <div className="flex flex-col justify-center items-center lg:mt-8 space-y-4 p-6 py-10 px-12 border border-gray-200 rounded-md shadow-lg">
        <h1 className="text-3xl font-bold text-blue-600 tracking-wider">
          Sign in
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
                type="text"
                onChange={onChangeHandler}
                name="password"
                value={form.password}
                placeholder="Password"
                className="input input-bordered input-info  w-[40vw] lg:w-[70vw] max-w-xs"
              />
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

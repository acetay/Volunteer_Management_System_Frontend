import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { SiGooglefit } from 'react-icons/si';
import { useGlobalVolunteerContext } from '../Context/VolunteerContext';
import Swal from 'sweetalert2';
import axios from 'axios';

function AdminSignIn() {
  const redirect = useNavigate();
  const {
    signInUserWithPwAndEmail,
    isLoggedIn,
    setIsLoggedIn,
    setSingleUser,
    authUser,
    setAuthUser,
  } = useGlobalVolunteerContext();
  const [form, setForm] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);

  const onChangeHandler = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Sign in with email and password to Firebase
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      await signInUserWithPwAndEmail(form.email, form.password);
      setIsLoggedIn(true);
    } catch (err) {
      console.log(err.message);
      setIsLoggedIn(false);
      Swal.fire({
        title: 'Error',
        text: err.message,
        icon: 'error',
      });
    }
  };

  // Sign-in a Admin to Springboot after receiving uid from firebase
  const signInAdmin = async (uid) => {
    try {
      const response = await axios.post(
        `http://localhost:8080/api/admin/signin`,
        uid
      );
      setSingleUser(response.data);
      localStorage.setItem('singleUser', JSON.stringify(response.data));
      localStorage.setItem('userCredentials', JSON.stringify(response.data));
      redirect('/admin/main');
    } catch (err) {
      setIsLoggedIn(false);

      console.log(err);
      Swal.fire({
        title: 'Error',
        text: err.message,
        icon: 'error',
      });
    }
  };

  // Listener to trigger sign-in to springboot after receiving uid
  useEffect(() => {
    if (isLoggedIn) {
      setForm({ ...form, email: '', password: '' });
      signInAdmin({ uid: authUser.uid });
    } else {
      setForm({ ...form, email: '', password: '' });
      const userRecord = JSON.parse(localStorage.getItem('singleUser'));
      const timer = setTimeout(() => {
        if (userRecord === null) {
          localStorage.clear();
          setAuthUser({});
        }
      }, 3000);
      return () => {
        clearInterval(timer);
      };
    }
  }, [isLoggedIn]);

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
                value={form?.email}
                placeholder="Email"
                className="input input-bordered input-info w-[40vw] lg:w-[70vw] max-w-xs"
              />
              <input
                type={`${showPassword ? 'text' : 'password'}`}
                onChange={onChangeHandler}
                name="password"
                value={form?.password}
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

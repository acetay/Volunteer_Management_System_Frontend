import signupPhoto from '../../Assets/Sample_images/family.jpg';
import { useState, useEffect } from 'react';
import { BsFillSkipBackwardBtnFill } from 'react-icons/bs';
import { Link, useNavigate } from 'react-router-dom';
import { useGlobalVolunteerContext } from '../../Context/VolunteerContext';
import HeartLoading from '../../Assets/Sample_images/Heart.gif';
import Swal from 'sweetalert2';

function PasswordAndUsername() {
  const redirect = useNavigate();
  const {
    createUserWithPwAndEmail,
    signupVolunteer,
    initialState,
    tempForm,
    setTempForm,
  } = useGlobalVolunteerContext();
  const [form, setForm] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [uid, setUid] = useState('');

  const onChangeHandler = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Guarding of route
  useEffect(() => {
    if (
      tempForm.name === '' ||
      tempForm.email === '' ||
      tempForm.contact === ''
    ) {
      redirect('/volunteers/signup');
    }
  }, []);

  // Signup and create user in Firebase
  const signup = async () => {
    try {
      const response = await createUserWithPwAndEmail(
        form.email,
        form.password
      );
      setUid(response.user.uid);
    } catch (err) {
      console.log(err.message);
    }
  };

  // Cancel, erase form and go back to home
  const cancel = () => {
    setForm({});
    setTempForm(initialState);
    redirect('/');
  };

  // create volunteer in Springboot with uid and redirect to signin page
  useEffect(() => {
    if (uid !== '') {
      setTimeout(() => {
        signupVolunteer(tempForm, uid);
        setTempForm(initialState);
        setUid(() => '');
        Swal.fire({
          title: 'Successful signup',
          text: 'Welcome to the Family!',
          icon: 'success',
        });
        redirect('/volunteers/signin');
      }, 1500);
    }
    return () => {
      setUid('');
    };
  }, [uid]);

  return (
    <div className="flex flex-col">
      <div className="pt-2 w-full">
        <h1 className="text-gray-600 text-lg tracking-widest font-semibold pl-2">
          Username and Password Registration
        </h1>
        {/* <img src={HeartLoading} alt="heart" /> */}
        <div className="flex w-full p-8 space-x-20">
          <div>
            <img
              className={`h-[45vh] max-w-lg rounded-tl-extraLarge transition-all duration-3000 cursor-pointer filter grayscale hover:grayscale-0 ${
                form.email.length > 0 ? 'grayscale-0' : ''
              }`}
              src={signupPhoto}
              alt="signup"
            />
          </div>
          <div>
            <h1 className="font-semibold text-lg pb-4 pl-2 text-gray-500 text-center">
              Impacting lives for the better future!
            </h1>
            <div className="border border-gray-300 rounded-md shadow-lg px-8 py-5 flex flex-col w-[25vw]">
              <label className="font-bold">Username:</label>
              <input
                onChange={onChangeHandler}
                type="email"
                name="email"
                value={form.email}
                placeholder="Enter your username"
                className="input input-bordered input-info w-full max-w-lg mt-2"
                autocomplete="off"
              />
              <label className="font-bold pt-3">Password:</label>
              <input
                onChange={onChangeHandler}
                name="password"
                type={`${showPassword ? 'text' : 'password'}`}
                value={form.password}
                placeholder="Enter your password"
                className="input input-bordered input-info w-full max-w-lg mt-2"
                autocomplete="off"
              />
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
              <div className="flex justify-center items-center mt-8 space-x-4">
                <button onClick={cancel} className="btn btn-error text-white">
                  Cancel
                </button>
                <button onClick={signup} className="btn btn-success text-white">
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
        <Link to="/volunteers/signup">
          <div className="flex flex-col justify-center items-center space-x-2 cursor-pointer">
            <BsFillSkipBackwardBtnFill size={30} color={'blue'} />
            <p className="hover:text-blue-600 hover:underline">
              Back to previous page
            </p>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default PasswordAndUsername;

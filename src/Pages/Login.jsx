import { useState } from 'react';
import { useGlobalVolunteerContext } from '../Context/VolunteerContext';

function Login() {
  const { signout, signInUserWithPwAndEmail } = useGlobalVolunteerContext();
  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const onChangeHandler = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await signInUserWithPwAndEmail(
        form.email,
        form.password
      );
      console.log(response);
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <div className="h-full w-[100%] flex justify-center items-center">
      <div className="w-[30%] flex flex-col justify-center items-center mt-16 space-y-4 p-6 border border-gray-200 rounded-md shadow-lg">
        <h1 className="text-3xl font-bold text-blue-600 tracking-wider">
          Sign in
        </h1>

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
                className="input input-bordered input-info w-[70vw] max-w-xs"
              />
              <input
                type="text"
                onChange={onChangeHandler}
                name="password"
                value={form.password}
                placeholder="Password"
                className="input input-bordered input-info w-[70vw] max-w-xs"
              />
            </div>
            <div className="flex justify-center items-center mt-8">
              <button className="btn btn-info w-full text-white">
                Sign in
              </button>
            </div>
          </form>

          <div className="mt-4">
            <button onClick={signout} className="btn btn-primary">
              Signout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;

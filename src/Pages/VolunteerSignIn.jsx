import { GoogleButton } from 'react-google-button';
import { Link } from 'react-router-dom';

function VolunteerSignIn() {
  return (
    <div className="h-full w-[100%] flex justify-center items-center">
      <div className="w-[30%] flex flex-col justify-center items-center mt-16 space-y-4 p-6 border border-gray-200 rounded-md shadow-lg">
        <h1 className="text-3xl font-bold text-blue-600 tracking-wider">
          Sign in to Account
        </h1>
        <p className="text-blue-700">
          Don't have an account yet?{' '}
          <Link to="/signup" className="underline">
            Sign up.
          </Link>
        </p>
        <p className="text-gray-500 tracking-wider font-semibold">
          For Hope volunteers
        </p>
        <div className="flex flex-col justify-center items-center w-full">
          <form className="mt-4">
            <div className="flex flex-col justify-center items-center space-y-8">
              <input
                type="text"
                placeholder="Email"
                className="input input-bordered input-info w-[70vw] max-w-xs"
              />
              <input
                type="text"
                placeholder="Password"
                className="input input-bordered input-info w-[70vw] max-w-xs"
              />
            </div>
            <div className="flex justify-center items-center mt-8">
              <button className="btn btn-info w-full text-white">
                Sign in
              </button>
            </div>
            <div className="flex justify-center items-center mt-10">
              <GoogleButton />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default VolunteerSignIn;

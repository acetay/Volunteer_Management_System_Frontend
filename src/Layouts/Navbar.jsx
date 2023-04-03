import { Link, useNavigate } from 'react-router-dom';

import { useGlobalVolunteerContext } from '../Context/Volunteer/VolunteerContext';
import { useGlobalAdminContext } from '../Context/Admin/AdminContext';

import { SiGooglefit } from 'react-icons/si';
import { MdOutlineMailLock } from 'react-icons/md';
import { BsFacebook } from 'react-icons/bs';
import { AiFillTwitterCircle } from 'react-icons/ai';
import { AiFillInstagram } from 'react-icons/ai';

import Swal from 'sweetalert2';

function Navbar() {
  const redirect = useNavigate();
  const { dispatch } = useGlobalAdminContext();
  const { credentials, signout, setIsLoggedIn, signOutVolunteer, userStorage } =
    useGlobalVolunteerContext();

  const logout = () => {
    const role = credentials.role;
    const uid = JSON.parse(localStorage.getItem('authUser'))?.uid;
    signout();
    signOutVolunteer({ uid: uid });
    setIsLoggedIn(false);
    dispatch({ type: 'CLEAR_ALL' });
    Swal.fire({
      title: 'logout',
      text: 'You have signed out successfully!',
      icon: 'success',
    });
    if (role === 'ADMIN') {
      redirect('/admin/signin');
    } else {
      redirect('/volunteers/signin');
    }
  };

  const checkForCredentials = () => {
    if (credentials?.role === 'USER') {
      return (
        <>
          <Link
            className="hover:text-blue-600 hover:underline tracking-wider"
            to="/volunteers/profile/1"
          >
            MyProfile
          </Link>
          <p
            onClick={logout}
            className="hover:text-blue-600 hover:underline cursor-pointer tracking-wider"
          >
            SignOut
          </p>
        </>
      );
    }
    return (
      <>
        <Link
          className="hover:text-blue-600 hover:underline tracking-wider"
          to="/admin/main"
        >
          MyAdmin
        </Link>
        <Link
          className="hover:text-blue-600 hover:underline tracking-wider"
          to="/admin/main/editvolunteer"
        >
          VolunteerMgt
        </Link>
        <p
          onClick={logout}
          className="hover:text-blue-600 hover:underline cursor-pointer tracking-wider"
        >
          SignOut
        </p>
      </>
    );
  };

  return (
    <nav className="sticky top-0 z-50 w-screen left-0 right-0">
      <div className="flex flex-col">
        {/* 1st Column */}
        <div className="lg:flex justify-between bg-blue-600 px-20 py-2 text-white font-semibold space-x-8">
          <div className="flex space-x-6">
            {/* <div className="hidden md:flex items-center">
              <BsFillTelephoneFill color={'white'} />
              <p className="ml-2 text-sm">+65 612 34567</p>
            </div> */}
            <div className="hidden md:flex items-center">
              <MdOutlineMailLock color={'white'} />
              <p className="ml-2 text-sm">hopeforlife@hope.sg</p>
            </div>
          </div>

          <div className="flex justify-end w-[75vw] md:justify-end items-center space-x-2">
            <BsFacebook size={20} />
            <AiFillTwitterCircle size={25} />
            <AiFillInstagram size={25} />
          </div>
        </div>

        {/* 2nd Column */}
        <div className="min-w-full shadow-2xl px-4 md:px-12 py-5 bg-white">
          <div className="flex items-center">
            {/* Logo */}
            <Link to="/">
              <div className="logo w-[300px] flex justify-start md:justify-center items-center space-x-2">
                <SiGooglefit size={32} color={'red'} />
                <h1 className="font-bold text-2xl text-blue-600 md:text-3xl tracking-wider">
                  Hope For Life
                </h1>
              </div>
            </Link>
            {/* Main menu */}
            <div className="flex justify-between items-center w-[75vw] pl-8">
              <div className="hidden md:flex space-x-3">
                <Link className="font-semibold hover:text-blue-400" to="/about">
                  About Us
                </Link>
                <Link
                  to="/programmes"
                  className="font-semibold hover:text-blue-400"
                >
                  Programmes
                </Link>
              </div>
              <div className="hidden md:flex md:justify-center items-center space-x-3">
                {userStorage ? (
                  checkForCredentials()
                ) : (
                  <>
                    <Link
                      className="hover:text-blue-600 hover:underline tracking-wider"
                      to="/admin/signin"
                    >
                      Admin
                    </Link>
                    <Link to="/volunteers/signin">SignIn</Link>
                    <Link to="/volunteers/signup">SignUp</Link>
                  </>
                )}

                <div className="p-1 px-2 bg-red-500 text-white font-semibold">
                  <Link to="/donate">Donate</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

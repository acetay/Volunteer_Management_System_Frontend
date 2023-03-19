import { Link } from 'react-router-dom';

import { SiGooglefit } from 'react-icons/si';
import { BsFillTelephoneFill } from 'react-icons/bs';
import { MdOutlineMailLock } from 'react-icons/md';
import { BsFacebook } from 'react-icons/bs';
import { AiFillTwitterCircle } from 'react-icons/ai';
import { AiFillInstagram } from 'react-icons/ai';

function Navbar() {
  return (
    <nav classname="min-w-full sticky top-0 z-20">
      <div className="flex flex-col">
        {/* 1st Column */}
        <div className="min-w-full flex justify-between bg-blue-600 px-20 py-2 text-white font-semibold space-x-8">
          <div className="flex space-x-6">
            <div className="flex items-center">
              <BsFillTelephoneFill color={'white'} />
              <p className="ml-2 text-sm">+65 612 34567</p>
            </div>
            <div className="flex items-center">
              <MdOutlineMailLock color={'white'} />
              <p className="ml-2 text-sm">hopeforlife@hope.sg</p>
            </div>
          </div>

          <div className="flex justify-center items-center space-x-2">
            <BsFacebook size={20} />
            <AiFillTwitterCircle size={25} />
            <AiFillInstagram size={25} />
          </div>
        </div>

        {/* 2nd Column */}
        <div className="min-w-full shadow-2xl px-8 py-6 ">
          <div className="flex items-center">
            {/* Logo */}
            <Link to="/">
              <div className="logo flex justify-center items-center space-x-2">
                <SiGooglefit size={32} color={'red'} />
                <h1 className="font-bold text-blue-600 text-3xl tracking-wider">
                  Hope For Life
                </h1>
              </div>
            </Link>
            {/* Main menu */}
            <div className="flex justify-between items-center w-[75vw] pl-8">
              <div className="flex space-x-3">
                <Link className="font-semibold hover:text-blue-400" to="/about">
                  About Us
                </Link>
                <Link className="font-semibold hover:text-blue-400" to="/about">
                  Organizations
                </Link>
                <Link className="font-semibold hover:text-blue-400" to="/about">
                  Contact
                </Link>
              </div>
              <div className="flex justify-center items-center space-x-3">
                <Link to="/about">Login</Link>
                <Link to="/volunteers/signup">Signup</Link>
                <div className="p-1 px-2 bg-red-500 text-white font-semibold">
                  <Link to="/about">Donate</Link>
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

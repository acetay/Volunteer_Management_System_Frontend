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
        <div className="min-w-full flex justify-between bg-blue-600 px-12 py-2 text-white font-semibold space-x-8">
          <div className="flex space-x-6">
            <div className="flex items-center">
              <BsFillTelephoneFill color={'white'} />
              <p className="ml-2 text-sm">+65 61234567</p>
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
          <div className="flex">
            {/* Logo */}
            <div className="logo flex justify-center items-center space-x-2">
              <SiGooglefit size={32} color={'red'} />
              <h1 className="font-bold text-blue-600 text-2xl tracking-wider">
                Hope For Life
              </h1>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

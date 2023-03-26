import React from 'react';

import { Outlet } from 'react-router-dom';

function SignUpPageContainer() {
  return (
    <div className="h-auto md:h-screen px-28 py-4 mt-2">
      <h1 className="font-bold text-2xl tracking-widest text-blue-700">
        Volunteer Registration
      </h1>
      <div>
        <Outlet />
      </div>
    </div>
  );
}

export default SignUpPageContainer;

import { FaHome } from 'react-icons/fa';
import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <div className="hero h-auto md:h-screen">
      <div className="text-center hero-content">
        <div className="max-w-lg">
          <h1 className="text-5xl font-bold mb-8 text-blue-600">Oops!</h1>
          <p className="text-5xl mb-8">404 - Page Not Found!</p>
          <Link className="btn btn-info btn-md text-white" to="/">
            <FaHome className="mr-2" />
            Back To Home
          </Link>
        </div>
      </div>
    </div>
  );
}

export default NotFound;

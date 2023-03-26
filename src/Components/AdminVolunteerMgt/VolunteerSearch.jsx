import { useGlobalAdminContext } from '../../Context/Admin/AdminContext';

function VolunteerSearch({ volunteers, text }) {
  const { dispatch } = useGlobalAdminContext();
  const handleChange = (e) => {};
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <div className="flex justify-center items-center mb-4">
      <div className="flex justify-center items-center">
        <form onSubmit={handleSubmit}>
          <div className="form-control">
            <div className="relative shadow-lg rounded-lg">
              <input
                type="text"
                className="w-full pr-28 bg-blue-100 input input-md text-black"
                placeholder="Search"
                value={text}
                onChange={handleChange}
              />
              <button
                type="submit"
                className="absolute btn-info top-0 right-0 rounded-l-none w-20 btn btn-md text-white"
              >
                Go
              </button>
            </div>
          </div>
        </form>
      </div>
      {volunteers.length > 0 && (
        <div>
          <button
            onClick={() => dispatch({ type: 'CLEAR_USERS' })}
            className="btn btn-md bg-cyan-700 ml-2 text-white"
          >
            Clear
          </button>
        </div>
      )}
    </div>
  );
}

export default VolunteerSearch;

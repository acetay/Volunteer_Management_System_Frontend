function VolunteerSearch({
  // volunteers,
  experience,
  handleChange,
  clear,
  search,
}) {
  return (
    <div className="flex justify-center items-center mb-4">
      <div className="flex justify-center items-center">
        <form>
          <div className="form-control">
            <div className="relative shadow-lg rounded-lg">
              <input
                type="text"
                name="experience"
                value={experience}
                className="w-full pr-28 bg-blue-100 input input-md text-black"
                placeholder="Search by experience"
                onChange={handleChange}
              />
              <button
                onClick={search}
                className="absolute btn-info top-0 right-0 rounded-l-none w-20 btn btn-md text-white"
              >
                Go
              </button>
            </div>
          </div>
        </form>
      </div>

      <div>
        <button
          onClick={clear}
          className="btn btn-md bg-cyan-700 ml-2 text-white"
        >
          Clear
        </button>
      </div>
    </div>
  );
}

export default VolunteerSearch;

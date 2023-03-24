function CalendarModal({ date }) {
  var newdate = new Date(date);
  const displayDate = new Date(newdate)
    .toLocaleDateString('en-SG')
    .replaceAll('/', '-');

  return (
    <>
      <input type="checkbox" id="my-modal-6" className="modal-toggle" />
      <div className="modal modal-bottom sm:modal-middle">
        <div className="modal-box h-[50vh] flex flex-col justify-center items-center px-8 text-center">
          <h1 className="text-3xl font-semibold pb-4">Your availability</h1>
          <p className="px-12 pb-4 text-lg text-blue-700 font-bold">
            Please select the options below based on selected date:
          </p>
          <h3 className="font-bold text-2xl tracking-wider">{displayDate}</h3>

          <div className="form-control mt-3">
            <label className="cursor-pointer label">
              <div className="flex justify-between items-center w-[180px]">
                <span className="label-text mr-2 text-blue-600">
                  8.00am to 12.00pm
                </span>
                <input
                  type="checkbox"
                  className="checkbox checkbox-secondary"
                />
              </div>
            </label>
          </div>

          <div className="form-control">
            <label className="cursor-pointer label">
              <div className="flex justify-between items-center w-[180px]">
                <span className="label-text mr-2 text-blue-600">
                  2.00pm to 5.00pm
                </span>
                <input
                  type="checkbox"
                  className="checkbox checkbox-secondary"
                />
              </div>
            </label>
          </div>

          <div className="form-control">
            <label className="cursor-pointer label">
              <div className="flex justify-between items-center w-[180px]">
                <span className="label-text mr-2 text-blue-600">
                  6.00pm to 10.00pm
                </span>
                <input
                  type="checkbox"
                  className="checkbox checkbox-secondary"
                />
              </div>
            </label>
          </div>

          {/* BUTTONS */}
          <div className="modal-action">
            <label
              htmlFor="my-modal-6"
              className="btn btn-error text-white btn-sm"
            >
              Cancel
            </label>
            <button className="btn btn-primary btn-sm text-white px-4">
              Set as avail
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default CalendarModal;

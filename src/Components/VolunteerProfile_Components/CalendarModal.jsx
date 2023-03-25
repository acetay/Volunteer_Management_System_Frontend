import { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

function CalendarModal({ date, id }) {
  // Spring boot variables
  //   const [avail, setAvail] = useState(false);
  const [timeslot, setTimeslot] = useState('');
  const jwtToken = JSON.parse(localStorage.getItem('authUser'))?.stsTokenManager
    .accessToken;

  let newdate = new Date(date);
  const formatDate = (date) => {
    const year = date.toLocaleString('default', { year: 'numeric' });
    const month = date.toLocaleString('default', { month: '2-digit' });
    const day = date.toLocaleString('default', { day: '2-digit' });

    return [year, month, day].join('-');
  };

  // Spring boot varialbe String - "DD-MM-YYYY"
  const selectedDate = formatDate(newdate);

  const displayDate = new Date(newdate)
    .toLocaleDateString('en-SG')
    .replaceAll('/', '-');

  let today = new Date();
  //   console.log(today > newdate);

  //   const availOnChange = (e) => {
  //     setAvail(e.target.value);
  //   };

  const timeSlotChangeHandler = (e) => {
    setTimeslot(e.target.value);
  };

  // API
  const updateAvailability = async () => {
    if (displayDate !== '' && timeslot !== '') {
      console.log(displayDate);
      try {
        const response = await axios.post(
          `http://localhost:8080/volunteers/availability/${id}?date=${selectedDate}&timeslot=${timeslot}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${jwtToken}`,
            },
          }
        );
        console.log(response);
        setTimeslot('');
        Swal.fire({
          title: 'Date has been set!',
          text:
            'Your availability has been set on ' +
            displayDate +
            ' for ' +
            timeslot,
          icon: 'success',
        });
      } catch (err) {
        console.log(err);
        Swal.fire({
          title: 'Unable to set avail date',
          text: err.response?.data.msg,
          icon: 'error',
        });
      }
    } else {
      alert('some fields are missing');
    }
  };

  if (today > newdate) {
    return (
      <>
        <input type="checkbox" id="my-modal-4" className="modal-toggle" />
        <div className="modal modal-bottom sm:modal-middle">
          <div className="modal-box">
            <h3 className="font-bold text-lg text-red-600">
              Date selected has already passed!
            </h3>
            <p className="py-4">
              Please note that the earliest avail date for selection would be
              tomorrow.
            </p>
            <div className="modal-action">
              <label htmlFor="my-modal-4" className="btn btn-primary">
                Ok, got it!
              </label>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <input type="checkbox" id="my-modal-4" className="modal-toggle" />
      <div className="modal modal-bottom sm:modal-middle">
        <div className="modal-box h-[60vh] flex flex-col justify-center items-center px-8 text-center">
          <h1 className="text-3xl font-semibold pb-4">Your availability</h1>
          <p className="px-12 pb-4 text-lg text-blue-700 font-bold">
            Please select the options below based on the date selected:
          </p>
          <h3 className="font-bold text-2xl tracking-wider underline">
            {displayDate}
          </h3>
          {/* SELECT AVAIL OR UNAVAIL */}
          {/* <div className="flex justify-center items-center space-x-8 p-2 mt-2">
            <div className="flex justify-center items-center space-x-2">
              <input
                type="radio"
                name="radio-7"
                value={true}
                onChange={availOnChange}
                className="radio radio-info"
              />
              <p>Available</p>
              <input
                type="radio"
                name="radio-7"
                value={false}
                onChange={availOnChange}
                className="radio radio-info checked:bg-red-500"
              />
              <p>Unavailable</p>
            </div>
          </div> */}

          {/* SELECT PREFERRED TIME SLOTS */}
          <h2 className="font-bold pt-2">Preferred Time Slots:</h2>
          <div className="form-control flex justify-between w-[180px]">
            <label className="label cursor-pointer">
              <span className="label-text">0800hrs - 1200hrs</span>
              <input
                type="radio"
                name="radio-10"
                value="0900hrs - 1200hrs"
                onClick={timeSlotChangeHandler}
                className="radio checked:bg-green-500"
              />
            </label>
          </div>
          <div className="form-control flex justify-between w-[180px]">
            <label className="label cursor-pointer">
              <span className="label-text">1300hrs - 1800hrs</span>
              <input
                onChange={timeSlotChangeHandler}
                type="radio"
                name="radio-10"
                value="1300hrs - 1800hrs"
                onClick={timeSlotChangeHandler}
                className="radio checked:bg-green-500"
              />
            </label>
          </div>

          <div className="form-control flex justify-between w-[180px]">
            <label className="label cursor-pointer">
              <span className="label-text">1900hrs - 2200hrs</span>
              <input
                type="radio"
                name="radio-10"
                value="1900hrs - 2200hrs"
                onChange={timeSlotChangeHandler}
                className="radio checked:bg-green-500"
              />
            </label>
          </div>

          <div className="form-control flex justify-between w-[180px]">
            <label className="label cursor-pointer">
              <span className="label-text">Whole day</span>
              <input
                type="radio"
                name="radio-10"
                value="whole day"
                onChange={timeSlotChangeHandler}
                className="radio checked:bg-green-500"
              />
            </label>
          </div>

          {/* BUTTONS */}
          <div className="modal-action">
            <label
              htmlFor="my-modal-4"
              className="btn btn-error text-white btn-sm"
            >
              Cancel
            </label>
            <label
              htmlFor="my-modal-4"
              onClick={updateAvailability}
              className="btn btn-primary btn-sm text-white px-4"
            >
              Set
            </label>
          </div>
        </div>
      </div>
    </>
  );
}

export default CalendarModal;

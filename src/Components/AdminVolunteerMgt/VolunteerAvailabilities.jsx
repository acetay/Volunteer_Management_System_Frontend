import AvailTableRow from './AvailTableRow';

function VolunteerAvailabilities({ availabilities, id }) {
  const listOfConfirmAvails = availabilities?.filter((avail) => avail.avail);

  return (
    <div className="overflow-x-auto mt-8 pb-8">
      <div className="flex justify-start items-center rounded-lg  mt-2 pb-4">
        <h1 className="font-bold tracking-widest text-2xl ml-2 text-blue-500">
          Volunteer's Availability
        </h1>
      </div>
      <table className="table w-full table-normal">
        {/* head */}
        <thead>
          <tr>
            <th className="bg-blue-400 text-white"></th>
            <th className="bg-blue-400 text-white">Dates</th>
            <th className="bg-blue-400 text-white">Timeslots</th>
            <th className="bg-blue-400 text-white">Enrolment</th>
          </tr>
        </thead>
        <tbody>
          {listOfConfirmAvails.map((avail, index) => (
            <AvailTableRow
              date={avail.date}
              timeslot={avail.timeslot}
              index={index + 1}
              id={id}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default VolunteerAvailabilities;

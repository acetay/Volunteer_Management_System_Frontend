import { useNavigate } from 'react-router-dom';

function AvailTableRow({ date, timeslot, index, id, name }) {
  const redirect = useNavigate();
  const navigateTo = () => {
    redirect(
      `/admin/singlevolunteer/${id}/programselect/${date}/${timeslot}/${name}`
    );
  };

  return (
    <>
      <tr className="table-normal border-b-2">
        <td className="font-bold">
          <span className="bg-blue-400 text-white rounded-full py-1 px-2 text-sm">
            {index}
          </span>
        </td>
        <td>
          <div className="badge bg-green-500 border-none p-4 text-white text-md font-bold">
            {date}
          </div>
        </td>
        <td>
          <div
            className={`badge ${
              timeslot === 'Full day' ? 'bg-teal-500' : 'badge-error'
            } border-none text-white font-bold p-5`}
          >
            {timeslot}
          </div>
        </td>
        <td>
          <button onClick={navigateTo} className="btn btn-sm bg-blue-800">
            Programs
          </button>
        </td>
      </tr>
    </>
  );
}

export default AvailTableRow;

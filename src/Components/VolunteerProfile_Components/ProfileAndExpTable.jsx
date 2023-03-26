function ProfileAndExpTable({ volunteer }) {
  return (
    <table className="table-auto">
      <tbody>
        <tr>
          <td className="w-[100px] md:w-[220px] py-2 font-semibold">
            Languages:
          </td>
          <td className="w-[100px] text-blue-700">{volunteer?.language}</td>
        </tr>
        <tr>
          <td className="w-[100px] md:w-[220px] py-2 font-semibold">
            Interests:{' '}
          </td>
          <td className=" text-blue-700">None</td>
        </tr>
        <tr>
          <td className="w-[100px] md:w-[220px] py-2 font-semibold">
            Experience:{' '}
          </td>
          <td className="text-blue-700">{volunteer?.pastExperience}</td>
        </tr>
      </tbody>
    </table>
  );
}

export default ProfileAndExpTable;

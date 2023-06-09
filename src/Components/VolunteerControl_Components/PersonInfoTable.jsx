function PersonInfoTable({ volunteer }) {
  return (
    <table className="table-auto">
      <tbody>
        <tr>
          <td className="w-[100px] md:w-[220px] py-2 font-semibold">
            Contact:{' '}
          </td>
          <td className="text-blue-700">{volunteer?.contact}</td>
        </tr>
        <tr>
          <td className="w-[100px] md:w-[220px] py-2 font-semibold">Email: </td>
          <td className="text-blue-700">{volunteer?.email}</td>
        </tr>
        <tr>
          <td className="w-[100px] md:w-[220px] py-2 font-semibold">
            Address:{' '}
          </td>
          <td className="text-blue-700 w-[300px]">{volunteer?.address}</td>
        </tr>
        <tr>
          <td className="w-[100px] md:w-[220px] py-2 font-semibold">
            Education:{' '}
          </td>
          <td className="text-blue-700">{volunteer?.education}</td>
        </tr>
        <tr>
          <td className="w-[100px] md:w-[220px] py-2 font-semibold">
            Occupation:{' '}
          </td>
          <td className="text-blue-700">{volunteer?.occupation}</td>
        </tr>
      </tbody>
    </table>
  );
}

export default PersonInfoTable;

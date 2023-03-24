function PersonInfoTable({ volunteer }) {
  return (
    <table class="table-auto">
      <tbody>
        <tr>
          <td className="w-[220px] py-2 font-semibold">Contact: </td>
          <td className="text-blue-700">{volunteer?.contact}</td>
        </tr>
        <tr>
          <td className="w-[220px] py-2 font-semibold">Email: </td>
          <td className="text-blue-700">{volunteer?.email}</td>
        </tr>
        <tr>
          <td className="w-[220px] py-2 font-semibold">Address: </td>
          <td className="text-blue-700">{volunteer?.address}</td>
        </tr>
        <tr>
          <td className="w-[220px] py-2 font-semibold">Education: </td>
          <td className="text-blue-700">{volunteer?.education}</td>
        </tr>
        <tr>
          <td className="w-[220px] py-2 font-semibold">Occupation: </td>
          <td className="text-blue-700"></td>
        </tr>
      </tbody>
    </table>
  );
}

export default PersonInfoTable;

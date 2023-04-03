import { BsPersonFillGear } from 'react-icons/bs';

function HeaderAndBorder({ title }) {
  return (
    <>
      <div className="flex justify-start items-baseline space-x-3">
        <BsPersonFillGear size={25} color={'skyblue'} />
        <h1 className="text-2xl font-bold tracking-wider pb-2 text-blue-400">
          {title}
        </h1>
      </div>

      <hr className="border border-gray-300 w-[90%] mb-4" />
    </>
  );
}

export default HeaderAndBorder;

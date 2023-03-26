import { Link } from 'react-router-dom';

function PanelItem({ title, stats, color, text, icon, link }) {
  return (
    <>
      <Link to={link}>
        <div
          className={`border border-gray-200 flex p-3 py-6 space-x-4 rounded-md ${color} text-white shadow-xl`}
        >
          <div className="flex flex-col justify-between space-y-8">
            <div>
              <h2 className="font-bold text-lg tracking-wider">{title}</h2>
              <p className={`text-xl font-bold`}>{stats}</p>
            </div>
            <div>
              <p className="font-semibold text-xs">{text}</p>
            </div>
          </div>
          <div className="flex flex-col justify-center items-center">
            {icon}
          </div>
        </div>
      </Link>
    </>
  );
}

export default PanelItem;

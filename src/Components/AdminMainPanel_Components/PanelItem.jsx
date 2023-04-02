import { Link } from 'react-router-dom';

function PanelItem({ title, stats, color, text, icon, link, red = false }) {
  return (
    <>
      <Link to={link}>
        <div
          className={`border w-[76vw] md:w-[100%] border-gray-200 flex p-3 py-2 space-x-4 rounded-lg ${color} text-white shadow-xl`}
        >
          <div className="flex flex-col justify-between space-y-8">
            <div>
              <h2 className="font-bold text-lg text-blue-400 tracking-widest">
                {title}
              </h2>
              <p className={`text-6xl font-bold text-blue-500`}>{stats}</p>
            </div>
            <div>
              <p
                className={`font-bold text-sm ${
                  red ? 'text-red-300' : 'text-slate-500'
                }`}
              >
                {text}
              </p>
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

import { BsPeopleFill } from 'react-icons/bs';
import { TbHeartHandshake } from 'react-icons/tb';
import { IoAccessibility } from 'react-icons/io5';
import { GiFinishLine } from 'react-icons/gi';

function ChartsContainer() {
  return (
    <div className="h-[38vh] mt-4">
      <div className="stats shadow h-[15vh] w-[100%]">
        <div className="stat">
          <div className="stat-figure text-success">
            <BsPeopleFill size={40} />
          </div>
          <div className="stat-title font-bold">Volunteers</div>
          <div className="stat-value text-success">25.6K</div>
          <div className="stat-desc">Total enrolment of volunteers</div>
        </div>

        <div className="stat">
          <div className="stat-figure text-blue-400">
            <TbHeartHandshake size={45} />
          </div>
          <div className="stat-title font-bold">Programs</div>
          <div className="stat-value text-blue-400">2.6M</div>
          <div className="stat-desc">Active</div>
        </div>

        <div className="stat">
          <div className="stat-figure text-secondary">
            <IoAccessibility size={45} />
          </div>
          <div className="stat-title font-bold">Enrolments</div>
          <div className="stat-value text-secondary">2.6M</div>
          <div className="stat-desc">Ongoing</div>
        </div>

        <div className="stat">
          <div className="stat-figure text-orange-500">
            <IoAccessibility size={45} />
          </div>
          <div className="stat-title font-bold">Enrolments</div>
          <div className="stat-value text-orange-600">2.6M</div>
          <div className="stat-desc">Ongoing</div>
        </div>

        <div className="stat">
          <div className="stat-figure text-secondary">
            <GiFinishLine size={45} />
          </div>
          <div className="stat-value">86%</div>
          <div className="stat-title">Tasks done</div>
          <div className="stat-desc text-secondary">31 tasks remaining</div>
        </div>
      </div>
    </div>
  );
}

export default ChartsContainer;

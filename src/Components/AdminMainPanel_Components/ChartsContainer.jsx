import { BsPeopleFill } from 'react-icons/bs';
import { TbHeartHandshake } from 'react-icons/tb';
import { IoAccessibility } from 'react-icons/io5';
import { GiFinishLine } from 'react-icons/gi';

function ChartsContainer() {
  return (
    <div className="h-[38vh] mt-4 flex justify-start">
      <div className="stats shadow h-[15vh] w-[100%]">
        <div className="stat">
          <div className="stat-figure text-success">
            <BsPeopleFill size={40} />
          </div>
          <div className="stat-title font-bold">Program Kickstarter</div>
          <div className="stat-value text-success">Builder</div>
          <div className="stat-desc">Create programs with ease</div>
        </div>

        <div className="stat">
          <div className="stat-figure text-blue-400">
            <TbHeartHandshake size={45} />
          </div>
          <div className="stat-title font-bold">Relations Management</div>
          <div className="stat-value text-blue-400">Productivity</div>
          <div className="stat-desc">Build and manage relations</div>
        </div>

        <div className="stat">
          <div className="stat-figure text-teal-500">
            <IoAccessibility size={45} />
          </div>
          <div className="stat-title font-bold">Enrolments</div>
          <div className="stat-value text-teal-600">Fullfilment</div>
          <div className="stat-desc">Ongoing</div>
        </div>

        <div className="stat">
          <div className="stat-figure text-secondary">
            <GiFinishLine size={45} />
          </div>
          <div className="stat-value text-pink-500">86%</div>
          <div className="stat-title">Participation Rate</div>
          <div className="stat-desc text-secondary">Programs Success</div>
        </div>
      </div>
    </div>
  );
}

export default ChartsContainer;

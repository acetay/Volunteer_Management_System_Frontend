import { BsPeopleFill } from 'react-icons/bs';
import { TbHeartHandshake } from 'react-icons/tb';
import { IoAccessibility } from 'react-icons/io5';
import { GiFinishLine } from 'react-icons/gi';
import PanelItem from './PanelItem';

function Dashboard() {
  return (
    <div className="flex space-x-4">
      <PanelItem
        title={'Volunteers'}
        stats={2500}
        color={'bg-blue-400'}
        date={'1 Jan 2018'}
        icon={<BsPeopleFill size={80} color={'white'} />}
      />
      <PanelItem
        title={'Programs'}
        stats={30}
        color={'bg-green-500'}
        date={'1 Jan 2018'}
        icon={<TbHeartHandshake size={80} color={'white'} />}
      />
      <PanelItem
        title={'Enrolments'}
        stats={10}
        color={'bg-pink-500'}
        date={'1 Jan 2018'}
        icon={<IoAccessibility size={80} color={'white'} />}
      />
      <PanelItem
        title={'Completed'}
        stats={23}
        color={'bg-teal-400'}
        date={'1 Jan 2018'}
        icon={<GiFinishLine size={80} color={'white'} />}
      />
    </div>
  );
}

export default Dashboard;

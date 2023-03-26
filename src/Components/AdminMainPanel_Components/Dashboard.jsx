import { BsPeopleFill } from 'react-icons/bs';
import { TbHeartHandshake } from 'react-icons/tb';
import { IoAccessibility } from 'react-icons/io5';
import { GiFinishLine } from 'react-icons/gi';
import PanelItem from './PanelItem';

import { useGlobalAdminContext } from '../../Context/Admin/AdminContext';

function Dashboard() {
  const { volunteers, programs, enrolments } = useGlobalAdminContext();

  return (
    <div className="flex space-x-4">
      <PanelItem
        title={'Volunteers'}
        stats={volunteers?.length}
        color={'bg-blue-400'}
        text={'Total enrolled'}
        icon={<BsPeopleFill size={80} color={'white'} />}
        link={'/admin/main/editvolunteer'}
      />
      <PanelItem
        title={'Programs'}
        stats={programs?.length}
        color={'bg-green-500'}
        text={'Active'}
        icon={<TbHeartHandshake size={80} color={'white'} />}
      />
      <PanelItem
        title={'Enrolments'}
        stats={enrolments?.length}
        color={'bg-pink-500'}
        text={'Ongoing'}
        icon={<IoAccessibility size={80} color={'white'} />}
      />
      <PanelItem
        title={'Completed'}
        stats={23}
        color={'bg-teal-400'}
        text={'Past events'}
        icon={<GiFinishLine size={80} color={'white'} />}
      />
    </div>
  );
}

export default Dashboard;

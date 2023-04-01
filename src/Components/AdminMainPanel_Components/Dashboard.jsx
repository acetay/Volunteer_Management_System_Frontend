import { BsPeopleFill } from 'react-icons/bs';
import { TbHeartHandshake } from 'react-icons/tb';
import { IoAccessibility } from 'react-icons/io5';
import { GiFinishLine } from 'react-icons/gi';
import PanelItem from './PanelItem';

function Dashboard({ state }) {
  return (
    <div className="grid grid-cols-1 gap-8 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2">
      <PanelItem
        title={'Volunteers'}
        stats={state.volunteers?.length}
        color={'bg-slate-100'}
        text={'Total enrolled'}
        icon={<BsPeopleFill size={80} color={'skyblue'} />}
        link={'/admin/main/editvolunteer'}
      />
      <PanelItem
        title={'Programs'}
        stats={state.programs?.length}
        color={'bg-slate-100'}
        text={'Active programs'}
        icon={<TbHeartHandshake size={80} color={'skyblue'} />}
        link={'/admin/programs'}
      />
      <PanelItem
        title={'Enrolments'}
        stats={state.enrolments?.length}
        color={'bg-slate-100'}
        text={'Recruitments'}
        icon={<IoAccessibility size={80} color={'skyblue'} />}
      />
      <PanelItem
        title={'Completed'}
        stats={23}
        color={'bg-slate-100'}
        text={'Completed events'}
        icon={<GiFinishLine size={80} color={'skyblue'} />}
      />
    </div>
  );
}

export default Dashboard;

import { useState, useEffect } from 'react';
import VolunteerItem from './VolunteerItem';
import { useGlobalAdminContext } from '../../Context/Admin/AdminContext';
import Spinner from '../../Assets/Sample_images/spinner.gif';
import VolunteerSearch from './VolunteerSearch';
import VolunteerFilter from './VolunteerFilter';
import Swal from 'sweetalert2';

function VolunteerResults() {
  const { toggle, searchVolunteersByParams, getAllVolunteers, dispatch } =
    useGlobalAdminContext();
  const [isLoading, setIsLoading] = useState(false);
  const [volunteersCopy, setVolunteersCopy] = useState(null);
  const [filters, setFilters] = useState({
    experience: '',
    education: 'na',
    language: 'na',
  });

  // Pagination Logic
  const [numOfVolPerPage, setNumOfVolPerPage] = useState(8);
  const [page, setPage] = useState(1);
  const lastIndex = page * numOfVolPerPage;
  const firstIndex = lastIndex - numOfVolPerPage;
  const volunteersShownOnPage = volunteersCopy?.slice(firstIndex, lastIndex);
  const totalPages = Math.ceil(volunteersCopy?.length / numOfVolPerPage);

  const changePage = (num) => {
    setPage(() => num);
  };

  useEffect(() => {
    setIsLoading(true);
    const allvolunteers = async () => {
      const { volunteers } = await getAllVolunteers();
      setVolunteersCopy(volunteers);
      setIsLoading(false);
    };
    allvolunteers();
  }, []);

  const search = async (e) => {
    e.preventDefault();
    if (
      filters.education === 'na' &&
      filters.experience === '' &&
      filters.language === 'na'
    ) {
      Swal.fire({
        title: 'No search results',
        text: 'Search did not yield any results',
        icon: 'error',
      });
      return;
    }
    const searchByFilters = await searchVolunteersByParams(
      filters.experience || 'na',
      filters.education || 'na',
      filters.language || 'na'
    );
    setVolunteersCopy(searchByFilters);
    setPage(() => 1);
  };

  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const clear = async () => {
    setFilters({ experience: '', education: '', language: '' });
    const { volunteers } = await getAllVolunteers();
    setVolunteersCopy(volunteers);
  };

  return (
    <>
      <div className="flex flex-col justify-center items-center py-2">
        <h1 className="text-lg text-gray-400 font-semibold tracking-wider py-4">
          Search for volunteers
        </h1>
        <VolunteerSearch
          experience={filters.experience}
          handleChange={handleChange}
          // volunteers={volunteers}
          clear={clear}
          search={search}
        />
        <VolunteerFilter
          language={filters.language}
          education={filters.education}
          handleChange={handleChange}
        />
      </div>
      <div className="btn-group flex justify-center items-center pb-4 text-white">
        {totalPages ? (
          [...new Array(totalPages).fill(true)].map((page, index) => (
            <button
              onClick={() => changePage(index + 1)}
              key={index}
              className={`btn btn-md text-white ${
                index + 1 === page ? 'btn-primary' : 'btn-info'
              }`}
            >
              {index + 1}
            </button>
          ))
        ) : (
          <></>
        )}
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center">
          <img className="h-[300px] w-[300px]" src={Spinner} alt="spinner" />
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-8 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2">
          {volunteersCopy ? (
            volunteersShownOnPage?.map((volunteer) => (
              <VolunteerItem
                key={volunteer.id}
                volunteer={volunteer}
                toggle={toggle}
              />
            ))
          ) : (
            <div className="text-error col-span-4">
              <p className="text-center">No search results</p>
            </div>
          )}
        </div>
      )}
    </>
  );
}

export default VolunteerResults;

import React, {useState} from 'react';
import { useCodeStore } from '../store/useCodeStore';
import { ArrowLeft, ArrowRight } from 'lucide-react';

const sortOptions = [
  { label: 'Title', value: 'title' },
  { label: 'Last Opened', value: 'updatedAt' },
  { label: 'Language', value: 'language' },
  { label: 'Created Time', value: 'createdAt' },
];

const orderOptions = [
  { label: 'Ascending', value: 'asc' },
  { label: 'Descending', value: 'desc' },
];

const SortSidebar = () => {

  const { getFiles, currentPage, totalPages, codesSortBy, sortOrder} = useCodeStore();
  const [tempSortKey, setTempSortKey] = useState(codesSortBy);
  const [tempSortOrder, setTempSortOrder] = useState(sortOrder);

  const applyFilters = () => {
    // setSortOrder(tempSortOrder);
    // setCodesSortBy(tempSortKey);
    // setCurrentPage(1);
    getFiles({ page: 1, limit: 9, sortBy: tempSortKey, order: tempSortOrder });
    // reSortFiles();
  };
  const handleLeftArrow = () => {
    if(currentPage>1)
      getFiles({ page: currentPage-1, limit: 9, sortBy: codesSortBy, order: sortOrder });

  }

  const handleRightArrow = () => {
    if(currentPage< totalPages)
      getFiles({ page: currentPage+1, limit: 9, sortBy: codesSortBy, order: sortOrder });

  }
  return (
    <div className='text-text-main1 p-2 my-2 w-[12vw] bg-primary4 rounded-md shadow-sm space-y-4'>
      <div className=' h-[35vh]'>
        <h3 className='font-semibold mb-2'>Sort By</h3>
        <div className='space-y-3'>
          {sortOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => setTempSortKey(option.value)}
              className={`cursor-pointer flex w-full justify-between px-4 py-2 rounded-md transition 
                ${tempSortKey === option.value ? 'bg-btn-primary3' : 'bg-btn-primary2'}
              `}
            >
              {option.label}
              {codesSortBy === option.value && <span>✓</span>}
            </button>
          ))}
        </div>
      </div>

      <div className=' h-[20vh]'>
        <h3 className='font-semibold mb-2'>Order</h3>
        <div className='space-y-3'>
          {orderOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => setTempSortOrder(option.value)}
              className={`cursor-pointer flex w-full justify-between px-4 py-2 rounded-md transition 
                ${tempSortOrder === option.value ? 'bg-btn-primary3' : 'bg-btn-primary2'}
              `}
            >
              {option.label}
              {sortOrder === option.value && <span>✓</span>}
            </button>
          ))}
        </div>
      </div>
      <div>
        
        <button
          onClick={applyFilters}
          className='my-2 tracking-wider cursor-pointer px-5 py-2 w-full bg-btn-primary1 rounded-md hover:bg-btn-primary1-hover transition'
        >Apply Filters
        </button>
        <p className=' text-center text-4xl font-semibold my-4'>{currentPage}/{totalPages}</p>
        <div className='flex justify-around mt-4'>
          <button
            className='bg-btn-primary2 cursor-pointer hover:bg-btn-primary3 transition min-lg:px-2 min-xl:px-4 py-2 rounded-md shadow-sm'
            onClick={handleLeftArrow}
          >
            <ArrowLeft size={30} />
          </button>
          <button
            className='bg-btn-primary2 cursor-pointer hover:bg-btn-primary3 transition min-lg:px-2 min-xl:px-4 py-2 rounded-md shadow-sm'
            onClick={handleRightArrow}
          >
            <ArrowRight size={30} />
          </button>
        </div>

      </div>
    </div>
  );
};

export default SortSidebar;

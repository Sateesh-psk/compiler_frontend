import React, { useEffect } from 'react';
import { useCodeStore } from '../store/useCodeStore';
import { Link, useNavigate } from 'react-router-dom';
import FileCard from '../components/FileCard';
import SortSidebar from '../components/SortSidebar';
import { FilePlus } from 'lucide-react';

const SavedFilesPage = () => {
  const {
    getFiles,
    allFiles,
    getOneFile,
    deleteFile,
    currentPage,
    isLoading
  } = useCodeStore();

  useEffect(()=>{
    if(allFiles.length === 0)
      getFiles({page:currentPage});
  },[])
  const navigate = useNavigate();

  const handleOpenFile = (_id) => {
    const confirm = window.confirm('Do you want to open this file? Unsaved changes will be lost.');
    if (confirm) {
      getOneFile( _id );
      navigate('/');
    }
  };
  const handleDeleteFile = (_id) => {
    const confirm = window.confirm('Do you want to delete this file? once deleted cannot be brought back.');
    if (confirm) {
      deleteFile( _id );
    }
  };

  return (
    allFiles[0] ?
    <div className='flex mx-2 my-4 tracking-wide w-full select-none'>
      <div className=' w-[80vw] grid gap-4 grid-rows-3 min-sm:grid-cols-2 max-sm:grid-cols-1 min-md:grid-cols-3 my-2 mr-4 ml-2'>
        {isLoading ?
          [...Array(9)].map((_, i) => (
            <div key={i} className="h-40 bg-primary4 animate-pulse rounded-md" />
          )) :
          allFiles.map((item) => (
            <FileCard key={item._id} file={item} onOpen={handleOpenFile} onDelete={handleDeleteFile} />
          ))
        }
      </div>
      <SortSidebar />
    </div> :
    <div className='select-none w-full h-full flex items-center justify-center bg-primary1 text-text-main1 p-6'>
      <div className='text-center bg-primary3 px-8 py-12 rounded-lg shadow-md max-w-md'>
        <div className='flex justify-center mb-4'>
          <FilePlus size={48} strokeWidth={1.5} className='text-btn-primary3' />
        </div>
        <h2 className='text-2xl font-semibold mb-2 text-text-main2 tracking-wider'>
          No Saved Files
        </h2>
        <p className='text-text-secondary1 mb-6 tracking-wide'>
          Looks like you haven't created any code files yet. Create one to see it here!
        </p>
        <Link
          to="/"
          className='inline-block bg-btn-primary1 hover:bg-btn-primary1-hover px-6 py-2 rounded-md transition'
        >
          Create New File
        </Link>
      </div>
    </div>
  );
};

export default SavedFilesPage;

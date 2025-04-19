import React from 'react';
import { Trash2Icon } from 'lucide-react';
import getTimeAgoString from '../utils/getTimeAgo';

const FileCard = ({ file, onOpen, onDelete }) => {
  return (
    <div className='shadow-xl hover:shadow-2xl hover:scale-105 transition duration-100 rounded-lg p-4 col-span-1 bg-primary4'>
      {/* Title */}
      <p
        className='cursor-pointer text-text-main1 text-center text-2xl font-semibold mb-8 tracking-wide'
        onClick={() => onOpen(file._id)}
      >
        {file.title}
      </p>

      {/* File metadata */}
      <div className='grid grid-cols-5'>
        <div className='text-text-main2 col-span-4 px-4'>
          <div className='flex gap-3 mb-1'>
            <p>lang</p>
            <p className='text-text-main2'>: {file.language}</p>
          </div>
          <div className='flex gap-3 mb-1'>
            <p>created</p>
            <p className='text-text-main2'>: {getTimeAgoString(file.createdAt)}</p>
          </div>
          <div className='flex gap-3'>
            <p>opened</p>
            <p className='text-text-main2'>: {getTimeAgoString(file.updatedAt)}</p>
          </div>
        </div>

        {/* Delete Button */}
        <div className='text-primary2 flex flex-col gap-4 items-center my-auto'>
          <button
            onClick={() => onDelete(file._id)}
            title="Delete this file"
            className='hover:text-red-400 hover:scale-110 transition duration-100 cursor-pointer'
          >
            <Trash2Icon size={28} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default FileCard;

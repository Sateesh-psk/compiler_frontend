import React from 'react'
import { ClockIcon } from 'lucide-react'
import { Link } from 'react-router-dom'

const ExecutionHistoryPage = () => {
  return (
    <div className='select-none w-full h-full flex items-center justify-center bg-primary1 text-text-main1 p-6'>
  <div className='text-center bg-primary3 px-8 py-12 rounded-lg shadow-md max-w-md'>
    <div className='flex justify-center mb-4'>
      <ClockIcon size={48} strokeWidth={1.5} className='text-btn-primary3' />
    </div>
    <h2 className='text-2xl font-semibold mb-2 text-text-main2 tracking-wider'>
      No Execution History
    </h2>
    <p className='text-text-secondary1 mb-6 tracking-wide'>
      It seems like you haven’t executed any code yet. Once you do, your history will show up here!
    </p>
    <Link
      to="/"
      className='inline-block bg-btn-primary1 hover:bg-btn-primary1-hover px-6 py-2 rounded-md transition'
    >
      Start Executing Code
    </Link>
  </div>
</div>

  )
}

export default ExecutionHistoryPage
import React from 'react'
import { useStore } from '../store/useStore'

const SettingsPage = () => {
  const {setThemeVar, themeVar} = useStore();
  const themes = ["batman", "interstellar", "monochrome", "quiet-hours", "crimson-core", "nature", "focus-mode", "sunset-bliss"];
  
  return (
    <div className=' w-full text-text-main1 select-none '>
      <p className=' text-3xl text-center tracking-wider my-5'>settings</p>
      <div className=' m-20 px-5 py-1 rounded-md tracking-wide text-text-main1 bg-primary4'>
      
        <p className='text-2xl my-2'>Theme</p>
        <div className='w-1/3 mx-auto px-12 pb-5 py-12 bg-primary1 rounded-md'>
          <div className='grid gap-2 grid-cols-10'>
            <div className='bg-primary2 col-span-1 h-20 rounded-sm text-transparent'>h</div>
            <div className='bg-primary3 col-span-1 h-20 rounded-sm text-transparent'>h</div>
            <div className='bg-primary4 col-span-1 h-20 rounded-sm text-transparent'>h</div>
            <div className='bg-secondary1 col-span-1 h-20 rounded-sm text-transparent'>h</div>
            <div className='bg-btn-primary1 col-span-1 h-20 rounded-sm text-transparent'>h</div>
            <div className='bg-btn-primary2 col-span-1 h-20 rounded-sm text-transparent'>h</div>
            <div className='bg-btn-primary3 col-span-1 h-20 rounded-sm text-transparent'>h</div>
            <div className='bg-text-main1 col-span-1 h-20 rounded-sm text-transparent'>h</div>
            <div className='bg-text-main2 col-span-1 h-20 rounded-sm text-transparent'>h</div>
            <div className='bg-text-secondary1 col-span-1 h-20 rounded-sm text-transparent'>h</div>
          </div>
        </div>

        <div className='grid grid-cols-4 gap-3 mt-10 mb-2 mx-15'>
          {themes.map((theme) => (
            <button
              key={theme}
              className={`cursor-pointer tracking-wider font-mono text-lg py-1 border-2 rounded-md hover:bg-primary2 transition duration-100
                ${themeVar === theme ? 'bg-btn-primary1 border-primary1' : 'bg-primary3 border-transparent'}
              `}
              onClick={() => setThemeVar(theme)}
            >{theme}
            </button>
          ))}
        </div>

      </div>
    </div>
  )
}

export default SettingsPage
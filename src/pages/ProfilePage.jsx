import React, { useEffect } from 'react'
import { useStore } from '../store/useStore'
import { Code2, Languages, Mail, User, ListOrdered } from 'lucide-react'

const ProfilePage = () => {
  const { user, checkAuth } = useStore();

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <div className="w-full text-text-main1 select-none ">
      <p className="text-3xl text-center tracking-wide my-5">Profile</p>

      <div className="m-10 md:m-20 px-5 py-4 rounded-md tracking-wide bg-primary4 space-y-8">
        {/* User Info */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-3 text-lg">
            <User size={20} />
            <span className="font-medium">Name:</span>
            <span className="text-xl tracking-wider">{user.fullName}</span>
          </div>
          <div className="flex items-center gap-3 text-lg">
            <Mail size={20} />
            <p className="font-medium">Email:</p>
            <p className="text-xl tracking-wider">{user.email}</p>
          </div>
        </div>

        {/* Code Stats */}
        <div className="pt-4 border-t border-text-secondary1">
          <div className="flex items-center gap-2 mb-4">
            <Code2 size={24} />
            <p className="text-2xl font-semibold">Code Statistics</p>
          </div>

          <div className="grid grid-cols-1 text-text-main2 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <div className="bg-primary3 rounded-xl py-4 px-8  shadow-md flex items-center justify-between">
              <div className="text-lg font-medium flex items-center gap-2">
                <ListOrdered size={20} />
                Total Codes
              </div>
              <div className="text-xl font-bold">{user.codeCount}</div>
            </div>

            {user.codeStats && Object.entries(user.codeStats).map(([lang, count]) => (
              <div
                key={lang}
                className="bg-primary3 rounded-xl py-4 px-8 shadow-md flex items-center justify-between"
              >
                <div className="text-lg my-auto capitalize font-medium flex items-center gap-2">
                  <Languages size={20} />
                  {lang}
                </div>
                <div className="text-2xl font-bold">{count}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfilePage;

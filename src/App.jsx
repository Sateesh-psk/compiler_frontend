import React, { useEffect } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { ExecutionHistoryPage, HomePage, LogInPage, ProfilePage, SavedFilesPage, SettingsPage, SignUpPage, VerifyEmailPage } from './pages'
import { useStore } from './store/useStore'
import { Toaster } from "react-hot-toast"
import Sidebar from './components/Sidebar'
import './index.css'

const App = () => {
  const {isAuthenticated, themeVar} = useStore();

  useEffect(()=>{
    document.documentElement.setAttribute("data-theme",themeVar);
  },[themeVar])

  return (
    <div className='flex bg-primary1'>
      <Sidebar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={!isAuthenticated ? <SignUpPage /> : <Navigate to='/'/>} />
        <Route path="/verify-email/:token" element={<VerifyEmailPage />} />
        <Route path="/login" element={!isAuthenticated ? <LogInPage /> : <Navigate to='/' />} />
        <Route path="/profile" element={isAuthenticated ? <ProfilePage /> : <Navigate to='/login'/>} />
        <Route path="/savedFiles" element={isAuthenticated ? <SavedFilesPage /> : <Navigate to='/login'/>} />
        <Route path="/history" element={isAuthenticated ? <ExecutionHistoryPage /> : <Navigate to='/login'/>} />
        <Route path="/settings" element={<SettingsPage />} />
        {/* <Route path="/callback" element={<Callback />} /> */}
      </Routes>
      <Toaster />
    </div>
  )
}
export default App;
import React, { useState } from 'react'
import { useStore } from '../store/useStore';
import { Link } from 'react-router-dom';
import { Eye, EyeOff } from "lucide-react";
import Carousel from '../components/Carousel';

const LogInPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { login } = useStore();

  // Handles form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    login(formData);
  };

  // Updates form input values
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className='grid grid-cols-1 select-none tracking-wide md:grid-cols-2 w-full h-screen bg-primary1 text-text-main1'>
      {/* Left side - Login form */}
      <div className='flex flex-col justify-center items-center p-8'>
        <div className='w-full max-w-md bg-primary3 p-8 rounded-lg shadow-md'>
          <h2 className='text-3xl font-semibold text-center mb-6 text-text-main2 tracking-wider'>
            Welcome Back
          </h2>
          <form onSubmit={handleSubmit} className='space-y-4'>
            {/* Email Input */}
            <div>
              <label className='block text-sm font-medium mb-1 text-text-secondary1'>Email</label>
              <input
                type="email"
                name='email'
                value={formData.email}
                onChange={handleChange}
                placeholder='you@example.com'
                autoComplete='off'
                className='w-full tracking-widest border border-secondary1 bg-primary4 text-text-main1 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-btn-primary3'
              />
            </div>

            {/* Password Input with toggle */}
            <div>
              <label className='block text-sm font-medium mb-1 text-text-secondary1'>Password</label>
              <div className='flex border border-secondary1 rounded-md overflow-hidden bg-primary4'>
                <input
                  type={showPassword ? "text" : "password"}
                  name='password'
                  value={formData.password}
                  onChange={handleChange}
                  placeholder='••••••••'
                  autoComplete='off'
                  className='w-full tracking-widest px-3 py-2 bg-transparent text-text-main1 focus:outline-none'
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className='px-3 cursor-pointer text-sm text-text-secondary1 hover:text-text-main2'
                >
                  {showPassword ? <Eye strokeWidth={1.5} /> : <EyeOff strokeWidth={1.5} />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className='w-full cursor-pointer bg-btn-primary1 text-text-main1 py-2 rounded-md hover:bg-btn-primary1-hover transition'
            >
              Log In
            </button>
          </form>

          {/* Link to Sign Up */}
          <p className='text-sm text-center mt-4 text-text-secondary1'>
            Don’t have an account?{" "}
            <Link to='/signup' className='text-btn-primary3 font-semibold hover:underline'>Sign up</Link>
          </p>
        </div>
      </div>

      {/* Right side - Carousel / Image Banner */}
      <div className='hidden md:block'>
        <Carousel />
      </div>
    </div>
  );
};

export default LogInPage

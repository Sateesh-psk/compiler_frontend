import React, { useState } from 'react'
import { useStore } from '../store/useStore';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import Carousel from '../components/Carousel';
import { Eye, EyeOff } from 'lucide-react';

const SignUpPage = () => {
  const [showPassword,setShowPassword] = useState(false);
  const {signUp } = useStore();
  const navigate = useNavigate();
  
  const [formData,setFormData] = useState({
    fullName:"",
    email:"",
    password:"",
  });

  const validateForm = () =>{
    if(formData.fullName == "") return toast.error("Fullname is required");
    if(formData.email == "") return toast.error("Email is required");
    if(!formData.password) return toast.error("Password is required");
    if(formData.password.length <6) return toast.error("Password must be atleast 6 characters");
    if(!/\S+@\S+\.\S+/.test(formData.email)) return toast.error("Invalid email format");

    return true;
  }

  const handleSubmit = (e) =>{
    e.preventDefault();
    const success = validateForm();
    if(success===true) signUp(formData);
    navigate("/login");
  }

  const handleChange = (e) =>{
    setFormData({...formData,[e.target.name]:e.target.value})
  }

  return (
    <div className='grid grid-cols-1 select-none tracking-wide md:grid-cols-2 w-full h-screen bg-primary1 text-text-main1'>
      {/* Left Side – Signup Form */}
      <div className='flex flex-col justify-center items-center p-8'>
        <div className='w-full max-w-md bg-primary3 p-8 rounded-lg shadow-lg'>
          <h2 className='text-3xl font-semibold text-center mb-6 text-text-main2 tracking-wider'>
            Create Account
          </h2>
          <form onSubmit={handleSubmit} className='space-y-4'>

            {/* Full Name */}
            <div className='form-control'>
              <label className='block text-sm font-medium mb-1 text-text-secondary1'>
                Full Name
              </label>
              <input
                type="text"
                name="fullName"
                placeholder="John Doe"
                value={formData.fullName}
                onChange={handleChange}
                autoComplete="off"
                spellCheck="false"
                className='w-full tracking-widest border border-secondary1 bg-primary4 text-text-main1 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-btn-primary3'
              />
            </div>

            {/* Email */}
            <div className='form-control'>
              <label className='block text-sm font-medium mb-1 text-text-secondary1'>
                Email
              </label>
              <input
                type="email"
                name="email"
                placeholder="you@example.com"
                value={formData.email}
                onChange={handleChange}
                autoComplete="off"
                spellCheck="false"
                className='w-full tracking-widest border border-secondary1 bg-primary4 text-text-main1 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-btn-primary3'
              />
            </div>

            {/* Password */}
            <div className='form-control'>
              <label className='block text-sm font-medium mb-1 text-text-secondary1'>
                Password
              </label>
              <div className='flex border border-secondary1 bg-primary4 rounded-md overflow-hidden'>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                  autoComplete="off"
                  className='w-full tracking-widest px-3 py-2 bg-transparent text-text-main1 focus:outline-none '
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className=' cursor-pointer px-3 text-sm text-text-secondary1 hover:text-text-main2'
                >
                  {showPassword ? <Eye strokeWidth={1.5} /> : <EyeOff strokeWidth={1.5} />}
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className=' cursor-pointer w-full bg-btn-primary1 text-white py-2 rounded-md hover:bg-btn-primary1-hover transition'
            >
              Create Account
            </button>
          </form>

          {/* Link to Login */}
          <p className='text-sm text-center mt-4 text-text-secondary1'>
            Already have an account?{" "}
            <Link to='/login' className='text-btn-primary3 font-semibold hover:underline'>
              Log in
            </Link>
          </p>
        </div>
      </div>

      {/* Right Side – Carousel */}
      <div className='hidden md:block'>
        <Carousel />
      </div>
    </div>
  );
}

export default SignUpPage
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { axiosInstance } from '../config/axios';

const VerifyEmailPage = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [verifying, setVerifying] = useState(true);

  const verifyEmail = async () => {
    try {
      const res = await axiosInstance.get(`/user/verify-email/${token}`);
      toast.success("Email verified! Account created.");
      navigate('/login')

    } catch (error) {
      console.error("Verification failed:", error);
      toast.error(error.response?.data?.message || "Invalid or expired token");
    } finally {
      setVerifying(false);
    }
  };
  
  useEffect(() => {
    verifyEmail();
  }, []);

  return (
    <div className="flex h-screen justify-center items-center text-xl font-medium">
      {verifying ? "Verifying email..." : "Redirecting..."}
    </div>
  );
};

export default VerifyEmailPage;

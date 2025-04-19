import {create} from "zustand"
import {persist} from "zustand/middleware"
import {axiosInstance} from "../config/axios"
import toast from "react-hot-toast"
import { useCodeStore } from "./useCodeStore"

export const useStore = create( persist((set) => ({
  user:null,
  isAuthenticated: false,
  isSigningUp: false,
  isLoggingIn: false,
  
  scriptDetails: null,
  themeVar:"batman",

  setThemeVar: (newTh) => set({themeVar: newTh}),

  checkAuth: async () => {
    try{
      const res = await axiosInstance.get("/user/profile");
      set({user:res.data,isAuthenticated:true})
    }catch(err){
      console.log("Error in check auth: ",err.message);
      set({user:null});
    }
  },

  signUp: async (data) => {
    set({ isSigningUp: true });
    try {
      const res = await axiosInstance.post("/user/initiate-signup", data);
      toast.success(res.data.message || "Verification email sent. Please check your inbox.");
    } catch (error) {
      toast.error(error.response?.data?.message || "Signup failed");
    } finally {
      set({ isSigningUp: false });
    }
  },
  

  login: async (data) => {
    set({isLoggingIn: true});
    try{
      const res = await axiosInstance.post("/user/login",data);
      set({user: res.data,isAuthenticated: true})
      toast.success("Logged In successfully");

      await useCodeStore.getState().getFiles({page:1});

    }catch(error){
      console.log(error);
      toast.error(error.response.data.message,{duration:2000});
    }finally{
      set({isLoggingIn:false});
    }
  },
  
  logout: async () => {
    try{
      await axiosInstance.post("/user/logout");
      set({user:null,isAuthenticated:false});
      toast.success("Logged out successfully");

      await useCodeStore.getState().logOutClean();

    }catch(error){
      toast.error(error.response.data.response);
    }
  },
  
})))
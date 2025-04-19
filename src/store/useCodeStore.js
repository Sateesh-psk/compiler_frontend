import { create } from 'zustand';
import { axiosInstance } from '../config/axios';
import toast from 'react-hot-toast';

export const useCodeStore = create((set,get) => ({
  code: '',
  title: 'untitled',
  language: 'python3',
  testcase:"",
  fontSize: 16,
  isExecuting:false,
  executionResponse:"",
  isOldFile:false,

  allFiles:[],
  totalPages:1,
  currentPage:1,
  sortOrder: 'asc',
  codesSortBy: "createdTime",
  isLoading: false,
  setCurrentPage: (pg) => set({ currentPage: pg}),
  setSortOrder: (order) => set({ sortOrder: order }),
  setCodesSortBy: (sortKey) => set(() => ({ codesSortBy: sortKey })),
  
  currentFile:{},

  setCode: (newCode) => set({ code: newCode }),
  setTitle: (newTitle) => set({ title: newTitle }),
  setTestCase: (newTestCase) => set({ testcase: newTestCase }),
  setLanguage: (lang) => set({ language: lang }),
  increaseFontSize: () => set((state) => ({ fontSize: Math.min(state.fontSize + 2, 32) })),
  decreaseFontSize: () => set((state) => ({ fontSize: Math.max(state.fontSize - 2, 8) })),

  clearEditor: () =>{ 
    const toastId = toast.loading("clearing...");
    setTimeout(()=>{
      set({
        code: '',
        title: 'untitled',
        language: 'python3',
        testcase:"",
        fontSize: 16,
        executionResponse:"",
        isOldFile:false,
        currentFile:{}
      })

      toast.dismiss(toastId)
    },1000)
  },

  logOutClean: () => {
    set({
      code: '',
      title: 'untitled',
      language: 'python3',
      testcase:"",
      fontSize: 16,
      executionResponse:"",
      isOldFile:false,
      currentFile:{},
      allFiles: [],
      totalPages:1,
      currentPage:1,
      sortOrder: 'asc',
      codesSortBy: "createdTime",
    })

  },
  
  executeCode: async (data) => {
    const toastId = toast.loading("Executing...");
    set({executionResponse: ""});
    try{
      const res = await axiosInstance.post("/execute/run",data);
      set({executionResponse: res.data});
      toast.dismiss(toastId);
      toast.success("Execution Successfull",{duration:1500})
    }catch(error){
      toast.dismiss(toastId);
      toast.error(error,{duration:2000});
    }
  },

  saveCode: async (data) => {
    const toastId = toast.loading("Saving...");
    try{
      const res = await axiosInstance.post("/code/saveFile",data);
      toast.dismiss(toastId);
      toast.success("Saved Successfully",{duration:1500})

      const { currentPage, sortOrder, codesSortBy, getFiles, getOneFile } = get();
      await getOneFile(res.data._id);
      await getFiles({ page: currentPage, sortBy: codesSortBy, order: sortOrder });
    }catch(error){
      toast.dismiss(toastId);
      toast.error(error.response.data.message,{duration:2000});
    }
  },

  getFiles: async ({ page = 1, limit = 9, sortBy = 'createdAt', order = 'desc' }) => {
    set({isLoading: true});
    try {
      const res = await axiosInstance.get(`/code/files`, {
        params: { page, limit, sortBy, order },
      });
  
      set({
        allFiles: res.data.files,
        totalPages: res.data.totalPages,
        currentPage: res.data.currentPage,
        codesSortBy: sortBy,
        sortOrder: order,
      });
    } catch (error) {
      toast.error(error.response.data.message,{duration:2000});
    } finally{
      set({isLoading: false});
    }
  },
  
  getOneFile: async (_id) => {
    try{
      const res = await axiosInstance.post(`/code/files/${_id}`);
      set({
        currentFile: res.data,
        code : res.data.script,
        title : res.data.title,
        language : res.data.language,
        isOldFile : true,
        executionResponse : "",
        testcase : "",
      });
      
    }catch(error){
      toast.error(error.response.data.message,{duration:2000});
    }
  },

  updateFile: async (data) => {
    const toastId = toast.loading("Saving...");
    try{
      const res = await axiosInstance.post(`/code/files/${data._id}`,data);
      toast.dismiss(toastId);
      toast.success("Saved Successfully",{duration:1500})

      await get().getFiles();
    }catch(error){
      toast.dismiss(toastId);
      toast.error(error.response.data.message,{duration:2000});
    }
  },

  deleteFile: async (_id) => {
    const toastId = toast.loading("Deleting...");
    const {currentFile, clearEditor} = get();
    if(currentFile._id === _id)
      await clearEditor();
    try {
      const res = await axiosInstance.delete(`/code/files/${_id}`);
      toast.dismiss(toastId);
      toast.success("File deleted successfully", { duration: 1500 });

      const { currentPage, sortOrder, codesSortBy, getFiles } = get();
      await getFiles({ page: currentPage, sortBy: codesSortBy, order: sortOrder });
    } catch (error) {
      toast.dismiss(toastId);
      toast.error(error.response?.data?.message || "Error deleting file", { duration: 2000 });
    }
  },  

}));
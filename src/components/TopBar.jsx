import { useCodeStore } from '../store/useCodeStore';
import { Save, Play, FileCodeIcon, FileInput } from 'lucide-react';
import toast from 'react-hot-toast';

export default function TopBar() {
  const { language, setLanguage, clearEditor, code, title, isOldFile, updateFile, currentFile, testcase, executeCode, setTitle, saveCode } = useCodeStore();
  
  const validateScript = () => {
    if(code.trim() == "") return toast.error("Code is Empty",{duration:1500});
    if(testcase.trim() == "") return toast.error("Testcase is empty",{duration:1500});
    return true;
  }

  const handleSave = () => {
    if(code.trim() == "") return toast.error("Code is Empty",{duration:1500});
    if(title.trim() == "") return toast.error("Title is Empty",{duration:1500});

    if(isOldFile){
      updateFile({
        "_id" : currentFile._id,
        "userId" : currentFile.userId,
        "title" : title,
        "script" : code,
        "language" : language,
      })
    }
    else{
      saveCode({
        "script":code,
        "language":language,
        "title":title
      })
    }
  };

  const handleExecute = () => {
    const success = validateScript();
    if(success === true){
      executeCode({
        "script":code,
        "stdin":testcase,
        "language":language
      });
    }
  };

  return (
    <div className="text-text-main1 flex flex-col items-center gap-2 my-2 select-none">
      <div className=' flex w-full outline-1 bg-primary4 rounded-md py-1 px-2'>
        <input
          value={title}
          onChange={(e)=>setTitle(e.target.value)}
          className=' w-full tracking-wider transition duration-200 text-xl focus:outline-0'
        />
        <FileCodeIcon />
      </div>
      <div className=' text-text-main1 w-full flex flex-row gap-2'>
        <div className=' space-y-2'> 
          <button
            onClick={()=>handleSave()}
            className="flex cursor-pointer items-center justify-around px-2 py-2 w-full bg-primary4 rounded-md hover:bg-blue-700 transition"
          >
            Save
            <Save size={18} />
          </button>
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="px-3 py-2 cursor-pointer rounded-md bg-primary4 focus:outline-none"
          >
            <option value="javascript">JavaScript</option>
            <option value="python3">Python</option>
            <option value="cpp14">C++</option>
            <option value="java">Java</option>
          </select>
        </div>
        <button
          onClick={handleExecute}
          className=" w-full cursor-pointer text-lg gap-2 px-4 py-2 bg-emerald-700 rounded-md hover:bg-emerald-500 transition"
        >
          <Play size={24} className='mx-auto' />Execute
        </button>
      </div>
      <button onClick={clearEditor}
        className={` bg-primary3 transition duration-100 tracking-widest
        hover:bg-[#D39D55] hover:text-primary2 cursor-pointer px-6 py-2 font-semibold rounded-md w-full`}
      >
        {isOldFile ? 
          <div className=' flex gap-3 justify-between'>
            <p>new file</p>
            <FileInput />
          </div> :
          <div>
            <p>reset editor</p>
          </div> 
        }
      </button>
    </div>
  );
}

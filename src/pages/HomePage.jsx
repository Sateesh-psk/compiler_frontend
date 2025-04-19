import TopBar from '../components/TopBar';
import CodeEditor from '../components/CodeEditor';
import TestCase from "../components/TestCase";
import ExecutionOutput from '../components/ExecutionOutput';
// import SpotifyUserInfo from '../components/SpotifyUserInfo';
// import SpotifyLogin from '../components/SpotifyLogin';

const HomePage = () => {
  return (
    <div className="flex w-full gap-2 mx-2">
      <div className="flex-1 overflow-auto my-2">
          <CodeEditor />
          <ExecutionOutput />
      </div>
      <div className=' w-[18vw]'>
      <TopBar />
      <TestCase />
      </div>
      {/* <SpotifyLogin />
      <SpotifyUserInfo /> */}
    </div>
  );
}
export default HomePage;
import React from 'react'
import { useCodeStore } from '../store/useCodeStore';

const TestCase = () => {
  const {testcase, setTestCase} = useCodeStore();
  return (
    <div className=' text-text-main1 select-none flex flex-col h-[25vh] my-2 bg-primary2 w-full rounded-lg'>
      <p className=' bg-primary4 rounded-t-lg px-2 py-1 tracking-widest'>Test Case</p>
      
      <textarea
        value={testcase}
        spellCheck='false'
        className=' p-2 w-full h-full text-xl focus:outline-none font-mono resize-none tracking-wider'
        onChange={(e) => setTestCase(e.target.value)}
        placeholder='type test case here'
      />
    </div>
  )
}

export default TestCase;
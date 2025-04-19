import React from 'react'
import { useCodeStore } from '../store/useCodeStore'
import { CheckIcon, X } from "lucide-react"

const ExecutionOutput = () => {

  const {executionResponse, fontSize} = useCodeStore()

  return (
    <div className=' overflow-auto bg-primary3 grid grid-cols-12 text-text-main1 rounded-lg p-2 px-4 my-2 w-full h-[23vh] font-mono'>
      
      <pre 
        style={{ fontSize: `${fontSize}px` }}
        className=' font-mono col-span-9'>
        <code>{ executionResponse.output || "Execute to get output..."}</code>
      </pre>
      <div className=' select-none grid grid-cols-2 col-span-3 text-text-main2'>
        <div>
          cpu time
          memory
          compiled
        </div>
        <div>
          <p>:{executionResponse.cpuTime} sec</p>
          <p>:{executionResponse.memory} kb</p>
          <p><span>{executionResponse.isCompiled===true ? <CheckIcon /> : <X /> }</span></p>
        </div>
      </div>
    </div>
  )
}

export default ExecutionOutput
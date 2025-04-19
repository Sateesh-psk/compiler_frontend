import { useRef, useEffect, useState } from 'react';
import { useCodeStore } from '../store/useCodeStore';
import { handleEditorKeyDown } from '../utils/editorKeyHandlers';

const CodeEditor = () => {
  const { code, setCode,fontSize,increaseFontSize, decreaseFontSize } = useCodeStore();
  const [lineCount, setLineCount] = useState(1);

  const textareaRef = useRef(null);
  const gutterRef = useRef(null);

  useEffect(() => {
    const lines = code.split('\n').length || 1;
    setLineCount(lines);
  }, [code]);

  const onKeyDown = (e) => {
    if (textareaRef.current) {
      handleEditorKeyDown(e, textareaRef.current,{
        increaseFontSize,
        decreaseFontSize
      });
    }
  };

  const syncScroll = () => {
    if (gutterRef.current && textareaRef.current) {
      gutterRef.current.scrollTop = textareaRef.current.scrollTop;
    }
  };

  return (
    <div className="flex select-none w-full h-[72vh] overflow-auto rounded-lg bg-primary3">
      <div
        ref={gutterRef}
        style={{ fontSize: `${fontSize}px` }}
        className="w-10 p-2 mx-auto text-center text-text-secondary1 font-mono overflow-hidden"
      >
        {Array.from({ length: lineCount }, (_, i) => (
          <div key={i}>{i + 1}</div>
        ))}
      </div>

      <textarea
        ref={textareaRef}
        spellCheck='false'
        style={{ fontSize: `${fontSize}px` }}
        className="flex-1 h-full p-2 tracking-wider font-mono bg-primary2 text-text-main1 resize-none focus:outline-none overflow-auto"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        onKeyDown={onKeyDown}
        onScroll={syncScroll}
        placeholder="Start typing your code here..."
      />
    </div>
  );
};

export default CodeEditor;

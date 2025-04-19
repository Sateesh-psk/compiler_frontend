export const handleEditorKeyDown = (e, textarea,{ increaseFontSize, decreaseFontSize }) => {
  const start = textarea.selectionStart;
  const end = textarea.selectionEnd; 

  if (e.ctrlKey && e.key === '=') {
    e.preventDefault();
    increaseFontSize();
  }
  if (e.ctrlKey && e.key === '-') {
    e.preventDefault();
    decreaseFontSize();
  }

  if (e.key === 'Tab') {
    e.preventDefault();
    const tabSpaces = '  ';
    textarea.setRangeText(tabSpaces, start, end, 'end');
  }

  const pairs = {
    '(': ')',
    '{': '}',
    '[': ']',
    '"': '"',
    "'": "'",
    '`': '`',
  };

  if (pairs[e.key]) {
    e.preventDefault();
    const open = e.key;
    const close = pairs[e.key];
    textarea.setRangeText(open + close, start, end, 'start');
    textarea.selectionStart = textarea.selectionEnd = start + 1;
  }
};

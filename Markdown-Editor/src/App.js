import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown'
import './App.css';

export default function App() {
  const [markdown, setMarkdown] = useState('#sup');

  function handleChange(e){
    setMarkdown(e.target.value);
  }
  return (
    <div className="app">
      <textarea onChange={handleChange} value={markdown}/>

      <ReactMarkdown className='preview' source={markdown} />
    </div>
  );
}

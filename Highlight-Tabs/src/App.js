import React from 'react';
import './App.css';

function App() {
  return (
    <div className="app">
      <div className="browser">
        <div className="tabs">
          <div className="tab">
            <a href="#">Home</a>
          </div>
          <div className="tab">
            <a href="#">About</a>
          </div>
          <div className="tab">
            <a href="#">Features</a>
          </div>
        </div>

        <div className="viewport">Pages Go Here</div>
      </div>
    </div>
  );
}

export default App;

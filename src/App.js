import React from 'react'
import FileUpload from './components/FileUpload'
import './App.css'

const App = () => (
    <div>
      <nav class="navbar navbar-dark bg-primary mb-4">
        <div class="container-fluid">
            <span class="navbar-brand mb-0 h1">Ascii Art Website</span>
        </div>
      </nav>
      <div className="container">
        <h4 className="display-4 text-center mb-4">
        Welcome to my Ascii Art Project!
        </h4>
        <h3 className="display-5 text-center mb-3">Start by uploading an image or video file</h3>
        <h6 className="display-5 text-center mb-1">The server may take a couple seconds to return your image.</h6>
        <h6 className="display-5 text-center mb-5">It will take several minutes to return your gif.</h6>

        <FileUpload />

      </div>
    </div>
  );


export default App;

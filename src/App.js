import React from 'react'
import FileUpload from './components/FileUpload'
import './App.css'

const App = () => (
    <div className="container mt-4">
      <h4 className="display-4 text-center mb-5">
      Welcome to my Ascii Art Project!
      </h4>
      <h3 className="display-5 text-center mb-5">Start by uploading an image</h3>

      <FileUpload />

    </div>
    
  );


export default App;

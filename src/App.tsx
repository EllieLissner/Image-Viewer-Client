import React from 'react';
import { useState } from 'react'
import { uploadFile } from 'react-s3';
// import { types} from 'react-s3'
import axios from 'axios'
import logo from './logo.svg';
import './App.css';

function App() {
  const [selectedFile, setSelectedFiile] = useState(null)
  const [imageData, setImageData] = useState({
    location: '',
    key: '',
    user_name: '',
    userId: ''
  })
  
  const config = {
    bucketName: 'elliesimagestorer',
    dirName: '', /* optional */
    region: 'us-east-2',
    accessKeyId: 'AKIASE73UQFY7JLDXDHU',
    secretAccessKey: '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',
    s3Url: '', /* optional */
  }

  
    const handleFileInput = (e: any) => {
      setSelectedFiile(e.target.files[0])
    }

    // const handleUpload = (file: any) => {
    //   uploadFile(file, config)
    //     .then((data: any) => console.log(data))
    //     .catch((error: any) => console.log(error))
    // }
    
    const handleUpload = async(file: any) => {
      try{
       const data = await uploadFile(file, config)
       console.log(data.key, data.location)
      }catch(error: any) {
        console.log(error)
      }
        
    }
  

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <h3>React S3 File Upload</h3>
        <input type="file" onChange={handleFileInput}/>
        <button onClick={() => handleUpload(selectedFile)}>Upload to S3</button>
      </header>
      <img src="https://elliesimagestorer.s3.us-east-2.amazonaws.com/fave-animal-pic.jpeg"></img>
    </div>
  );
}

export default App;

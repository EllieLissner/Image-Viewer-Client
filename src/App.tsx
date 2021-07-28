import React, { ReactSVG } from 'react';
import { useState } from 'react'
import { uploadFile } from 'react-s3';
// import { types} from 'react-s3'
import axios from 'axios'
import logo from './logo.svg';
import './App.css';
import ImageGallery from './ImageGallery';

export default function App() {
  const [selectedFile, setSelectedFiile] = useState<File | null>(null)

  const [refreshToken, setRefreshToken] = useState(0)
  
  const config = {
    bucketName: process.env.REACT_APP_AWSBucket,
    dirName: '', /* optional */
    region: 'us-east-2',
    accessKeyId: process.env.REACT_APP_AWSAccessKeyID,
    secretAccessKey: process.env.REACT_APP_AWSSecretAccessKey,
    s3Url: '', /* optional */
  }

  const handleUpload = async(file: any) => {
    try{
      const data = await uploadFile(file, config)
      const image ={
        location: data.location,
        key: data.key,
        user_name: 'Ellie',
        userId: 1
      }
      console.log(data, "Image saved!")
      const res = await axios.post('http://localhost:3001/', image)
      console.log(res, "data saved!")
      setRefreshToken(refreshToken + 1)
    }catch(error: unknown) {
        console.log(error)
    }  
  }

  return (
    <div className="App">
        <input type="file" onChange={(e) => {
          if (e.target.files) {
            setSelectedFiile(e.target.files[0])
          }
        }}/>
        <button onClick={() => handleUpload(selectedFile)}>Upload to S3</button>
      
      <ImageGallery refreshToken={refreshToken}/>
    </div>
  );
}



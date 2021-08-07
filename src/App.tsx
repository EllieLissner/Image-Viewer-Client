import { useState } from 'react'
import { uploadFile } from 'react-s3';
import axios from 'axios'
import './App.css';
import ImageGallery from './ImageGallery';

export default function App() {
  const [selectedFile, setSelectedFiile] = useState<File | null>(null)

  const [refreshToken, setRefreshToken] = useState(0)
  
  const config = {
    bucketName: "elliesimagestorer",
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
      const res = await axios.post('process.env.REACT_APP_SERVER_URL', image)
      console.log(res, "data saved!")
      setRefreshToken(refreshToken + 1)
    }catch(error: unknown) {
        console.log(error)
    }  
  }

  return (
    <div className="App">
      <h1>Picture Saver</h1>
      <h3>Upload your pictures to the cloud for safe keeping!</h3>

      <h5> Choose your photo from your computer and just click the button to upload your photo to the cloud</h5>
      <input type="file" onChange={(e) => {
        if (e.target.files) {
          setSelectedFiile(e.target.files[0])
        }
      }}/>
      <button onClick={() => handleUpload(selectedFile)}>Upload to Picture Saver</button>

      <h5>Here are all the photos you have uploaded!</h5>
      
      <ImageGallery refreshToken={refreshToken}/>
    </div>
  );
}



import axios from "axios"
import { useState, useEffect } from 'react'

type Image = {
    createdAt: string;
    id: number;
    key: string;
    location: string;
    updatedAt: string;
    userId: number;
    user_name: string | null;
}

type ImageGalleryProps = {
    refreshToken: number;
}

function ImageGallery({refreshToken}:ImageGalleryProps) {
    const [images, setImages] = useState<Image[]>([])

    useEffect(() => {
        axios.get('http://localhost:3001/')
        .then(({data}) => {
            setImages(data)
        })
    }, [refreshToken])
    console.log(images)

    return(
        <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
            gridGap: 24
        }}>
            {images.map(image => {
                return(
                    <img width="100%" src={`${image.location}`} />
                )
            })}
        </div>
    )
}

export default ImageGallery
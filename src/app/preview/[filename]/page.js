"use client"
import { useEffect, useState } from "react";
// Shows thumbnail of video + binarized thumbnail of video
// Use form for color picker, video file picker, and Threshold 
// page should change based on any form changes
// Use Processing Form component
// frame preview is child component of form
export default function PreviewVideo({ params }){
    const [thumbnailCanvas, setThumbnailCanvas] = useState(null);
    
    // edit this to make url match with params.filename
    useEffect(() => {
        fetchAndConvertImage("http://localhost:3000/thumbnail/Multiple30fps.mp4");
    }, [])


    // fetch image at current url and convert it to canvas
    // canvas can be displayed as img by setting src to canvas.toDataURL('image/jpeg')
    // canvas can also be iterated over pixel by pixel (good for dfs)
    const fetchAndConvertImage = async (url) => {
        try {
            // fetch image as blob
            const response = await fetch(url);
            if (!response.ok) throw new Error('Failed to fetch error')
            const blob = await response.blob();

            // create image from blob
            const img = new Image();
            img.crossOrigin = 'anonymous';
            img.src = URL.createObjectURL(blob);

            // fill canvas with image information and save canvas to state
            img.onload = () => {
                const canvas = document.createElement('canvas');
                canvas.width = img.width;
                canvas.height = img.height;
                const canvasContext = canvas.getContext('2d');
                canvasContext.drawImage(img, 0, 0);
                setThumbnailCanvas(canvas);
            }

        } catch (err) {
            console.error("Image fetching error: ", err);
        }
    } 

    return <>
        processing
    </>
}
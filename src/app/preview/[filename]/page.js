"use client"
import { use, useEffect, useState } from "react";
import euclideanColorDistance from "../../../../processor logic/euclideanColorDistance";
import distanceImageBinarizer from "../../../../processor logic/distanceImageBinarizer";
// Shows thumbnail of video + binarized thumbnail of video
// Use form for color picker, video file picker, and Threshold 
// page should change based on any form changes
// Use Processing Form component
// frame preview is child component of form
export default function PreviewVideo({ params }){
    const [thumbnailCanvas, setThumbnailCanvas] = useState(null);
    const [binaryCanvas, setBinaryCanvas] = useState(null);
    
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
                createBinaryImage(canvas, 70, 0x7a2d2a);
            }

        } catch (err) {
            console.error("Image fetching error: ", err);
        }
    } 

    const createBinaryImage = (thumbnail, threshold, targetColor) => {
        const colorDistance = new euclideanColorDistance();
        const binarizer = new distanceImageBinarizer(colorDistance, threshold, targetColor);
        const array = binarizer.toBinaryArray(thumbnail);
        console.log(array);
        const binaryCanvas = binarizer.toCanvasImage(array);
        const url = binaryCanvas.toDataURL('image/jpeg');
        setBinaryCanvas(url);

    }

    return <>
        { binaryCanvas ? (<img src={binaryCanvas} alt="binary canvas" width={300}/>): (<p>loading...</p>)}
    </>
}
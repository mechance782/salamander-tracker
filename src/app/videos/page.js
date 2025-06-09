"use client";
import { useVideos } from "@/context/VideoContext"
import { useState } from "react";
// Displays list of available videos with links to preview pages
// and links to actual video files in static video directory
export default function VideoChooser(){

    const [videoThumbnails, setVideoThumbnails] = useState([]);

    const { videos } = useVideos();
    // fetch video data and store in context

    const createBinaryImage = (thumbnail, threshold, targetColor) => {
        const hexString = targetColor.slice(1);
        const hex = parseInt(hexString, 16);
        const colorDistance = new euclideanColorDistance();
        const binarizer = new distanceImageBinarizer(colorDistance, threshold, hex);
        const array = binarizer.toBinaryArray(thumbnail);
        const binaryCanvas = binarizer.toCanvasImage(array);
        const url = binaryCanvas.toDataURL('image/jpeg');
        setBinaryCanvas(url);
    }

    const fetchVideoThumbnail = async(filename) =>{
        try {       
        const url = "http://localhost:3000/thumbnail/" + filename;
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
            // compress thumbnail image for faster processing
            const maxSize = 600;
            let width = img.width;
            let height = img.height;
            const scale = Math.min(maxSize / width, maxSize / height, 1);
            width = width * scale;
            height = height * scale;
            
            const canvas = document.createElement('canvas');
            canvas.width = width;
            canvas.height = height;
            const canvasContext = canvas.getContext('2d');
            canvasContext.drawImage(img, 0, 0, width, height);
            const url = canvas.toDataURL('image/jpeg')
            setThumbnailCanvas(canvas);
            setThumbnailUrl(url);
            createBinaryImage(canvas, threshold, targetColor);
        }

    } catch (err) {
        console.error("Image fetching error: ", err);
    }
    }

    // pass data to VideoList component for it to be displayed
    return <>{videos}</>
}
'use client'
import { useEffect } from "react"

export default function FetchImage(url){
    useEffect(() => {
        const fetchAndConvertImage = async () => {
            try {
                // fetch image as blob
                const response = await fetch(url);
                if (!response.ok) throw new Error('Failed to fetch error')
                const blob = await response.blob();

                // create image from blob
                const img = new Image();
                img.crossOrigin = 'anonymous';
                img.src = URL.createObjectURL(blob);

                img.onload = () => {
                    const canvas = document.createElement('canvas');
                    canvas.width = img.width;
                    canvas.height = img.height;
                    const canvasContext = canvas.getContext('2d');
                    canvasContext.drawImage(img, 0, 0);

                }

                console.log(canvas.toDataURL('image/JPEG'));

            } catch (err) {
            console.error("Image fetching error: ", err);
        }
        } 

        fetchAndConvertImage();

    }, [])
}
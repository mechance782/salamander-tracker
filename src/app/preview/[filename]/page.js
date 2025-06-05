"use client"
import { useEffect, useState } from "react";
import Slider from '@mui/material/Slider'
import Select from '@mui/material/Select'
import Typography from "@mui/material/Typography";
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import euclideanColorDistance from "../../../../processor logic/euclideanColorDistance";
import distanceImageBinarizer from "../../../../processor logic/distanceImageBinarizer";
import FramePreview from "@/components/FramePreview";
import { useVideos } from "@/context/VideoContext";


// Shows thumbnail of video + binarized thumbnail of video
// Use form for color picker, video file picker, and Threshold 
// page should change based on any form changes
// Use Processing Form component
// frame preview is child component of form
export default function PreviewVideo({ params }){
    const [thumbnailCanvas, setThumbnailCanvas] = useState(null);
    const [binaryCanvas, setBinaryCanvas] = useState(null);
    const [thumbnail, setThumbnail] = useState(null);
    const {videos} = useVideos();

    
    // edit this to make url match with params.filename
    useEffect(() => {
        fetchAndConvertImage("http://localhost:3000/thumbnail/test.mp4");
    }, []);

    useEffect(() =>{
        fetchRegularImage(`http://localhost:3000/thumbnail/test.mp4`);
    }, []);

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
                const url = canvas.toDataURL('image/jpeg')
                setThumbnailCanvas(url);
                createBinaryImage(canvas, 90, 0x7a2d2a);
            }

        } catch (err) {
            console.error("Image fetching error: ", err);
        }
    } 

    const createBinaryImage = (thumbnail, threshold, targetColor) => {
        const colorDistance = new euclideanColorDistance();
        const binarizer = new distanceImageBinarizer(colorDistance, threshold, targetColor);
        const array = binarizer.toBinaryArray(thumbnail);
        const binaryCanvas = binarizer.toCanvasImage(array);
        const url = binaryCanvas.toDataURL('image/jpeg');
        setBinaryCanvas(url);

    }

    const fetchRegularImage = async (url) =>{
        const response = await fetch(url);
        if(!response.ok) throw new Error ("Unable to fetch original image");
        const blob = await response.blob();

        const img = new Image();
        img.crossOrigin = 'anonymous';
        img.src = URL.createObjectURL(blob);

        await new Promise((resolve, reject) => {
            img.onload = resolve;
            img.onerror = reject;
        })

        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const context = canvas.getContext('2d');
        context.drawImage(img, 0, 0, canvas.width, canvas.height);

        const thumbnailurl = canvas.toDataURL('image/jpeg');
        setThumbnail(thumbnailurl);
    }

    return <>
        <form>
            
            <Typography>Select Video: </Typography>
            <Select size="small" id="videoSelect" label="Select Video:" sx={{minWidth: 100}} autoWidth > 
                <MenuItem value="">None</MenuItem>
                {videos.map((video, key) => (
                    <MenuItem key={key} value={video}>{video}</MenuItem>
                ))}
            </Select>

            <FramePreview props={{thumbnailCanvas, binaryCanvas}}/>
            
            <Grid container sx={{justifyContent: "space-around"}}>
                <Grid>
                    <Typography display="inline">Select Color: </Typography>
                    <input style={{width: 60, height: 60}} type="color" name="colorPicker" id="colorPicker" />
                </Grid>
                <Grid>
                    <Typography>Select Threshold: </Typography>
                    <Slider valueLabelDisplay="auto" aria-label="Select Threshold" name="thresholdPicker" />
                </Grid>
            </Grid>
        </form>
    </>
}
"use client"
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Slider from '@mui/material/Slider'
import Select from '@mui/material/Select'
import Typography from "@mui/material/Typography";
import MenuItem from "@mui/material/MenuItem";
import Card from "@mui/material/Card";
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
    const [filename, setFilename] = useState("");
    const {videos} = useVideos();
    const router = useRouter();
    
    useEffect(() => {
        fetchAndConvertImage();
    }, []);

    useEffect(() =>{
        fetchRegularImage(`http://localhost:3000/thumbnail/test.mp4`);
    }, []);

    // fetch image at current url and convert it to canvas
    // canvas can be displayed as img by setting src to canvas.toDataURL('image/jpeg')
    // canvas can also be iterated over pixel by pixel (good for dfs)
    const fetchAndConvertImage = async () => {
        try {
            // get filename params
            const {filename} = await params;
            setFilename(filename);
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
                const canvas = document.createElement('canvas');
                canvas.width = img.width;
                canvas.height = img.height;
                const canvasContext = canvas.getContext('2d');
                canvasContext.drawImage(img, 0, 0);
                const url = canvas.toDataURL('image/jpeg')
                setThumbnailCanvas(url);
                createBinaryImage(canvas, 20, 0x793736);
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

    const handleVideoSelect = (event) => {
        const selectedVideo = event.target.value;
        if (selectedVideo !== filename && selectedVideo !== ""){
            router.push('/preview/' + selectedVideo);
        }
    }

    return <>
        <form>

            <Box sx={{margin: "auto", maxWidth: 1000 }}>
                <Box margin={2} ml={0}>
                    <Typography>Select Video: </Typography>
                    <Select onChange={handleVideoSelect} size="small" id="videoSelect" label="Select Video:" sx={{ minWidth: 200 }} autoWidth value={filename}>
                        <MenuItem value="">None</MenuItem>
                        {videos.map((video, key) => (
                            <MenuItem key={key} value={video}>{video}</MenuItem>
                        ))}
                    </Select>
                </Box>

                <Card sx={{padding: 2}} >
                    
                    
                    <Typography textAlign="center">Previewing {filename}</Typography>
                    <FramePreview before={thumbnailCanvas} after={binaryCanvas}/>
                    
                    <Grid container sx={{justifyContent: "space-evenly"}} spacing={10}>
                        <Grid container spacing={1} sx={{alignItems: "center", justifyContent: "center"}}>
                            <Typography display="inline">Select Color: </Typography>
                            <input style={{width: 60, height: 60}} type="color" name="colorPicker" id="colorPicker" />
                        </Grid>
                        <Grid size="grow"  maxWidth={350}>
                            <Typography>Select Threshold: </Typography>
                            <Slider valueLabelDisplay="auto" aria-label="Select Threshold" name="thresholdPicker" />
                        </Grid>
                    </Grid>
                </Card>
            </Box>
        </form>
    </>
}
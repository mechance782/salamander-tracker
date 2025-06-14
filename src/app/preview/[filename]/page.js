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
import Button from "@mui/material/Button"
import SendIcon from '@mui/icons-material/Send';
import euclideanColorDistance from "../../../../processor logic/euclideanColorDistance";
import distanceImageBinarizer from "../../../../processor logic/distanceImageBinarizer";
import FramePreview from "@/components/FramePreview";
import { useVideos } from "@/context/VideoContext";
import { useJobs } from "@/context/JobContext";


// Shows thumbnail of video + binarized thumbnail of video
// Use form for color picker, video file picker, and Threshold 
// page should change based on any form changes
// Use Processing Form component
// frame preview is child component of form
export default function PreviewVideo({ params }){
    const [thumbnailUrl, setThumbnailUrl] = useState(null);
    const [thumbnailCanvas, setThumbnailCanvas] = useState(null);
    const [binaryCanvas, setBinaryCanvas] = useState(null);
    const [filename, setFilename] = useState("");
    const [targetColor, setTargetColor] = useState("#000000");
    const [threshold, setThreshold] = useState(30);
    const {onUpdate} = useJobs();
    const {videos} = useVideos();
    const router = useRouter();
    
    useEffect(() => {
        fetchAndConvertImage();
    }, []);

    // fetch image at current url and convert it to canvas
    // canvas can be displayed as img by setting src to canvas.toDataURL('image/jpeg')
    // canvas can also be iterated over pixel by pixel (good for dfs)
    const fetchAndConvertImage = async () => {
        // get filename params
        const {filename} = await params;
        setFilename(filename);

        // if user has chosen a video other than the default,
        // then fetch thumbnail
        if (filename !== '...'){
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
    } 

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

    const handleVideoSelect = (event) => {
        const selectedVideo = event.target.value;
        if (selectedVideo !== filename){
            router.push('/preview/' + selectedVideo);
        }
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        const hex = targetColor.slice(1);

        try {
            const response = await fetch(`http://localhost:3000/process/${filename}?targetColor=${hex}&threshold=${threshold}`, {
                method: 'POST'
            });

            if (!response.ok){
                throw new Error('Error: ', response.status);
            } else {
                const data = await response.json();
                const jobId = data.jobId;
                onUpdate();
                router.push('/status/' + jobId);
            }

        } catch (error) {
            console.error('Post form Error: ', error);
        }
    }

    const handleColorSelect = (event) => {
        const selectedColor = event.target.value;
        
        setTargetColor(selectedColor);
        createBinaryImage(thumbnailCanvas, threshold, selectedColor);
    }

    const handleThresholdSelect = (event) => {
        const selectedThreshold = event.target.value;
        setThreshold(selectedThreshold);
        createBinaryImage(thumbnailCanvas, selectedThreshold, targetColor);
    }

    return <>
        <form onSubmit={handleSubmit}>

            <Grid container direction="column" sx={{margin: "auto", maxWidth: 1000}}>
                {/* video selection */}
                <Box mb={2} ml={0}>
                    <Typography>Select Video: </Typography>
                    <Select data-cy="select-video-input" onChange={handleVideoSelect} size="small" id="videoSelect" label="Select Video:" sx={{ minWidth: 200 }} autoWidth value={filename}>
                        <MenuItem value="...">None</MenuItem>
                        {videos.map((video, key) => (
                            <MenuItem key={key} value={video}>{video}</MenuItem>
                        ))}
                    </Select>
                </Box>

                <Card sx={{padding: 2,  backgroundColor: 'secondary.main'}} >
                    
                    {/* determine whether user has chosen a video */}
                    {filename == '...' ? (<Typography textAlign="center">Choose video to preview</Typography>) 
                    : (<Typography textAlign="center">Previewing {filename}</Typography>)}
                    
                    {/* display video thumbnails */}
                    <FramePreview before={thumbnailUrl} after={binaryCanvas}/>
                    
                    {/* color and threshold selection */}
                    <Grid container sx={{justifyContent: "space-evenly"}} spacing={10}>
                        <Grid container spacing={1} sx={{alignItems: "center", justifyContent: "center"}}>
                            <Typography display="inline">Select Color: </Typography>
                            {thumbnailUrl ? (<input data-cy="color-input" onChange={handleColorSelect} value={targetColor} style={{width: 60, height: 60}} type="color" name="colorPicker" id="colorPicker" />)
                             : (<input disabled data-cy="color-input" onChange={handleColorSelect} value={targetColor} style={{width: 60, height: 60}} type="color" name="colorPicker" id="colorPicker" />)}
                            
                        </Grid>
                        <Grid size="grow"  maxWidth={350}>
                            <Typography>Select Threshold: </Typography>
                            {thumbnailUrl ? (<Slider data-cy="threshold-slider" onChange={handleThresholdSelect} value={threshold} valueLabelDisplay="auto" aria-label="Select Threshold" name="thresholdPicker" />) 
                            : (<Slider disabled data-cy="threshold-slider" onChange={handleThresholdSelect} value={threshold} valueLabelDisplay="auto" aria-label="Select Threshold" name="thresholdPicker" />)}
                            
                        </Grid>
                    </Grid>
                </Card>

                {/* submit button is disabled if thumbnail doesn't exist (usually means video file doesn't exist either) */}
                {thumbnailUrl ? (<Button type="submit" variant="contained" endIcon={<SendIcon />} sx={{padding: 2, mt: 2, width: 250, alignSelf: "end"}}>Send Processing Job</Button>) 
                : (<Button disabled variant="contained" endIcon={<SendIcon />} sx={{padding: 2, mt: 2, width: 250, alignSelf: "end"}}>Send Processing Job</Button>)}
                

            </Grid>
        </form>
    </>
}
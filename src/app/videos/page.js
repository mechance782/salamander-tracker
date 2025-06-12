"use client";
import { useVideos } from "@/context/VideoContext"
import { useState, useEffect } from "react";
import VideoCard from "@/components/VideoCard";
import { Typography } from "@mui/material";
import {Grid} from "@mui/material";

// Displays list of available videos with links to preview pages
// and links to actual video files in static video directory
export default function VideoChooser(){

    const [videoThumbnails, setVideoThumbnails] = useState([]);

    const { videos } = useVideos();
    // fetch video data and store in context


    const fetchVideoThumbnail = async(filename) =>{
        try {
            const url = `http://localhost:3000/thumbnail/${filename}`;
            const response = await fetch(url);
            if (!response.ok) throw new Error("Failed to fetch image");
            const blob = await response.blob();
            const imgUrl = URL.createObjectURL(blob);
            return imgUrl;
        } catch (err) {
            console.error("Image fetching error:", err);
            return null;
        }
    }

    // Fetches all thumbnails when the videos array is available or updated
    useEffect(() => {
        const loadThumbnails = async () => {
            if (!videos || videos.length === 0) return;

            // create an array of promises to fetch each thumbnail
            const videoPromises = videos.map(async (video) => {
                const imgUrl = await fetchVideoThumbnail(video); // Get image URL
                return { filename: video, thumbnailUrl: imgUrl }; // Store with filename
            });

            const results = await Promise.all(videoPromises);

            setVideoThumbnails(results);
        };

        loadThumbnails();
    }, [videos]);

    // pass data to VideoList component for it to be displayed
    return (
        <>
                <Grid container spacing={2} sx={{ p: 2 , color: 'primary.main', width: '80%', margin: 'auto'}}>
                  <Typography sx={{p:2}} variant="h4" component="h1">Preview All Videos</Typography>
                  {videoThumbnails.map((video) =>{
                    return <VideoCard  key={video.filename} video={video}/>
                })}  
                </Grid>
                
        </>
    )

}
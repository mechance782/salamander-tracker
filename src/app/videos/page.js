"use client";
import { useVideos } from "@/context/VideoContext"
// Displays list of available videos with links to preview pages
// and links to actual video files in static video directory
export default function VideoChooser(){
    const { videos } = useVideos();
    // fetch video data and store in context
    // pass data to VideoList component for it to be displayed
    return <>{videos}</>
}
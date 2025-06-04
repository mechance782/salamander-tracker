"use client";
import { createContext, useContext, useState, useEffect } from "react";

const VideoContext = createContext();

export function VideoProvider({children}){
    const [videos, setVideos] = useState([]);

    useEffect(() => {
        const fetchVideos = async () => {
            const response = await fetch("http://localhost:3000/api/videos");
            const result = await response.json();
            setVideos(result);
        };
        fetchVideos();
    }, []);

    return(
        <VideoContext.Provider value={{videos}}>
            {children}
        </VideoContext.Provider>
    )
}

export function useVideos(){
    return useContext(VideoContext);
}
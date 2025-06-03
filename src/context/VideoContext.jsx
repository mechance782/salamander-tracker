"use client";
import { createContext, useContext, useState } from "react";

const VideoContext = createContext();

export function VideoProvider({children}){
    const [videos, setVideos] = useState([]);

    const updateVideos = (newVideos) => {
        setVideos(newVideos);
    }

    return(
        <VideoContext.Provider value={{videos, updateVideos}}>
            {children}
        </VideoContext.Provider>
    )
}

export function useVideos(){
    return useContext(VideoContext);
}
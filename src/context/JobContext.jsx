"use client";
import { createContext, useContext, useState, useEffect } from "react";

const JobContext = createContext();

export function JobProvider({children}){
    const [currentJobs, setCurrentJobs] = useState([]);
    const [detectUpdate, setDetectUpdate] = useState(false);

    useEffect(() => {
        const fetchJobs = async () => {
            const response = await fetch("http://localhost:3000/api/jobs");
            const result = await response.json();
            result.reverse();
            setCurrentJobs(result);
        };

        fetchJobs();
    }, [detectUpdate])

    const onUpdate = () => {
        setDetectUpdate(prev => !prev);
    }

    return(
        <JobContext.Provider value={{currentJobs, onUpdate}}>{children}</JobContext.Provider>
    )
}

export function useJobs(){
    return useContext(JobContext);
}
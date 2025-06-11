"use client";
import { createContext, useContext, useState } from "react";

const JobContext = createContext();

export function JobProvider({children}){
    const [currentJobs, setCurrentJobs] = useState([]);

    const addJob = newJob => {
        setCurrentJobs(prev => [...prev, newJob]);
    }

    return(
        <JobContext.Provider value={{currentJobs, addJob}}>{children}</JobContext.Provider>
    )
}

export function useJobs(){
    return useContext(JobContext);
}
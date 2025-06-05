"use client"
import { useEffect } from "react"

export default function Status({ params }){

    useEffect(() => {
        fetchJobStatus();
    }, [])

    const fetchJobStatus = async () => {
        const { jobId } = await params;

        try {
            const response = await fetch(`http://localhost:3000/process/${jobId}/status`);

            if (!response.ok) throw new Error('http error: ', response.status);

            const data = await response.json();

            console.log(data);


        } catch (error){
            throw new Error('error fetching job status: ', error)
        }

    }
    
    return(<></>)
}
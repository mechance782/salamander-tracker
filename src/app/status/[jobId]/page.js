"use client"
import { useEffect, useRef } from "react"

export default function Status({ params }) {
    const hasFetched = useRef(false);

    useEffect(() => {
        if (!hasFetched.current) {
            hasFetched.current = true;
            fetchJobStatus();
        }
    }, []);

    const fetchJobStatus = async () => {
        try {
            const { jobId } = await params; 
            const response = await fetch(`http://localhost:3000/process/${jobId}/status`);

            const data = await response.json();
            console.log(data);
        } catch (error) {
            console.log('error fetching job status:' + error);
        }
    };

    return (<></>);
}

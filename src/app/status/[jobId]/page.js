"use client"
import {Grid, Card, Typography, Divider, Button, Tooltip, CircularProgress} from '@mui/material'
import DownloadIcon from '@mui/icons-material/Download';
import DownloadDoneIcon from '@mui/icons-material/DownloadDone';
import Link from 'next/link';
import { useEffect, useState } from "react"
import JobList from '@/components/JobList';

export default function Status({ params }) {
    const [thisJobId, setThisJobId] = useState(null)
    const [jobStatus, setJobStatus] = useState('processing')
    const [jobError, setJobError] = useState(null)
    const [jobResult, setJobResult] = useState(null)
    const [statusColor, setStatusColor] = useState('primary.dark')
    const [csvUrl, setCsvUrl] = useState(null);
    const [isDone, setIsDone] = useState(false);


    useEffect(() => {
        fetchJobStatus()
        const intervalId = setInterval(async () => {
            if (jobStatus !== 'done'){
                await fetchJobStatus();
            } else {
                clearInterval(intervalId);
            }
        }, 5000);

        return () => clearInterval(intervalId);
    }, [jobStatus]);


    const fetchJobStatus = async () => {
        try {
            const { jobId } = await params; 
            const response = await fetch(`http://localhost:3000/process/${jobId}/status`);
            setThisJobId(jobId);

            const data = await response.json();
            if (data.error){
                setJobStatus('Error')
                setJobError(data.error)
                setStatusColor('error')
            } else {
                setJobStatus(data.status)
                if (data.result){
                    
                    const resultLink = 'http://localhost:3000' + data.result;
                    await handleDownload(resultLink);
                    setJobResult(data.result)
                    setStatusColor('success')
                }
            }

            
        } catch (error) {
            console.log('error fetching job status:' + error);
        }
    };

    // used this post as source for info on link downloads in react:
    // https://www.geeksforgeeks.org/reactjs/how-to-download-pdf-file-in-reactjs/
    const handleDownload = async (link) => {
        const data = await fetch(link);
        const blob = await data.blob();
        const csvUrl = window.URL.createObjectURL(blob);
        setCsvUrl(csvUrl);
    };

    const switchDownloadIcon = () => {
        setIsDone(true);
    }

    function DownloadingIcon({isDone}){
        return(<>
        {isDone ? <DownloadDoneIcon /> : <DownloadIcon />}
        </>)
    }

    return (<>
        <Grid container gap={2}>
            <Grid size={{xs: 12, sm: 12, md: 'grow'}}>
                <Card sx={{padding: 2}}>
                    <Typography component='h1' variant='h6'>Overview of Job <Typography component='span' color='primary.dark'>{thisJobId}</Typography>:</Typography>
                    <Divider />
                    <Grid sx={{ margin: 2 }}>

                        <Grid container>
                        <Typography color={statusColor}><Typography color='textPrimary' component='span' sx={{ fontWeight: "bold" }}>Status:</Typography> {jobStatus}
                            {jobStatus == 'processing' ? (<>...<CircularProgress size={30} sx={{ml: 3}} /></>) : (<></>)}</Typography>
                        </Grid>

                        {jobResult ? (<><Typography sx={{ fontWeight: "bold" }}>Result:
                            <Tooltip title="Download CSV File">
                                <Link download={thisJobId} href={csvUrl}><Button data-cy="download-csv-button" onClick={switchDownloadIcon} endIcon={<DownloadingIcon isDone={isDone} />}>{jobResult}</Button></Link>
                            </Tooltip>
                        </Typography></>) : (<></>)}
                        {jobError ? (<Typography color={statusColor}>*{jobError}</Typography>) : (<></>)}

                    </Grid>
                </Card>
            </Grid>
            
            <Grid size={{xs: 12, sm: 12, md: 'grow'}}>
               <JobList /> 
            </Grid>
            
        </Grid>
    </>);
}

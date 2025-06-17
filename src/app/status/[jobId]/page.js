"use client"
import {Grid, Card, Typography, Divider, Button, IconButton, Tooltip} from '@mui/material'
import RefreshIcon from '@mui/icons-material/Refresh';
import DownloadIcon from '@mui/icons-material/Download';
import DownloadDoneIcon from '@mui/icons-material/DownloadDone';
import Link from 'next/link';
import { useEffect, useState } from "react"
import JobList from '@/components/JobList';

export default function Status({ params }) {
    const [thisJobId, setThisJobId] = useState(null)
    const [jobStatus, setJobStatus] = useState('getting job status...')
    const [jobError, setJobError] = useState(null)
    const [jobResult, setJobResult] = useState(null)
    const [statusColor, setStatusColor] = useState('primary.dark')
    const [csvUrl, setCsvUrl] = useState(null)
    const [refresh, setRefresh] = useState(false);
    const [loading, setLoading] = useState(false);
    const [isDone, setIsDone] = useState(false);


    useEffect(() => {
        fetchJobStatus()
    }, [refresh]);

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

            setLoading(false);
            
            console.log(data);
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

    const handleRefresh = () => {
        setLoading(true)
        setRefresh(prev => !prev)
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

                        <Typography color={statusColor}><Typography color='textPrimary' component='span' sx={{ fontWeight: "bold" }}>Status:</Typography> {jobStatus}
                            {jobStatus == 'processing' ? (<>... <Tooltip title="Refresh"><IconButton data-cy="status-refresh-button" onClick={handleRefresh} loading={loading}><RefreshIcon /></IconButton></Tooltip></>) : (<></>)}</Typography>

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

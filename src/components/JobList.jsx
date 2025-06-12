"use client"
import { useJobs } from "@/context/JobContext";
import {Grid, Card, Typography, Divider, Button, Tooltip} from '@mui/material'
import LaunchIcon from '@mui/icons-material/Launch';
import Link from "next/link";

export default function JobList(){
    const {currentJobs} = useJobs();

    function JobLink({ job }) {
        const [ jobId, jobDetails ] = job;

        return (<Link href={'/status/' + jobId}>
            <Tooltip placement="top-end" title={'View Job ' + jobDetails.csvFile}>
                <Button endIcon={<LaunchIcon fontSize="small" />} sx={{textTransform: 'none'}}>{jobId}</Button>
            </Tooltip>
        </Link>)
    }

    return(
        <Card sx={{ padding: 2, maxHeight: 600}}>
            <Typography variant="subtitle1">Recent Jobs</Typography>
            <Divider />
            <Grid sx={{overflow: 'scroll', maxHeight: 550, paddingBottom: 2}}>
                { currentJobs.length == 0 ? (<Typography variant="body2" color="text.secondary" sx={{margin: 2}}>No Jobs Found...</Typography>) : (
                <ul>
                    {currentJobs.map((job, index) => (
                        <li key={index}>
                            <JobLink job={job} />
                        </li>
                    ))}
                </ul> 
                )}
            </Grid>
            
        </Card>)

}
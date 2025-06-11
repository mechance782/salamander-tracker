"use client"
import { useJobs } from "@/context/JobContext";
import {Grid, Card, Typography, Divider, Button, Tooltip} from '@mui/material'
import LaunchIcon from '@mui/icons-material/Launch';
import Link from "next/link";

export default function JobList(){
    const {currentJobs} = useJobs();

    function JobLink({ job }) {

        return (<Link href={'/status/' + job}>
            <Tooltip title="View Job">
                <Button endIcon={<LaunchIcon fontSize="small" />} sx={{textTransform: 'none'}}>{job}</Button>
            </Tooltip>
        </Link>)
    }

    return(
        <Card sx={{ padding: 2 }}>
            <Typography variant="subtitle1">Recent Jobs</Typography>
            <Divider />
            { currentJobs.length == 0 ? (<Typography variant="body2" color="text.secondary" sx={{margin: 2}}>No Jobs Found...</Typography>) : (
               <ul>
                {currentJobs.map((job, index) => (
                    <li key={index}>
                        <JobLink job={job} />
                    </li>
                ))}
            </ul> 
            )}
            
        </Card>)

}
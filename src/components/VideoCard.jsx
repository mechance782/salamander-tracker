// use video context to list available videos
// link that takes you to preview of video
// link that takes you to public folder with video in it

import { CardContent, CardMedia, Typography, Grid, Card, Link, Button} from "@mui/material";

export default function VideoCard ({video}){


    return(
        <Grid item sx={{ p: 2, backgroundColor: '#8fa3a0' , padding: '5%', borderRadius: 2, border: '1.5px solid rgb(247, 242, 235)', boxShadow: '0 2px 5px rgba(0,0,0,0.1'}}>
            <Card>
                <CardContent>
                    <Typography>Video Filename: {video.filename} </Typography>
                    <Link href={`/preview/${video.filename}`}><Button color="inherit">Process Video</Button></Link> 
                    <CardMedia component="img" image={video.thumbnailUrl} alt={video.filename}></CardMedia>
                </CardContent>
            </Card>
        </Grid>
    )
}
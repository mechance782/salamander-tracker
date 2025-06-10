// use video context to list available videos
// link that takes you to preview of video
// link that takes you to public folder with video in it

import { CardContent, CardMedia, Typography, Grid, Card, Link, Button} from "@mui/material";

export default function VideoCard ({video}){


    return(
        <Grid item xs={12} sm={6} md={4} lg={3} sx={{ p: 2 }}>
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
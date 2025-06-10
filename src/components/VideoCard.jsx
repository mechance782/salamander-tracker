// use video context to list available videos
// link that takes you to preview of video
// link that takes you to public folder with video in it

import { CardContent, CardMedia, Typography, Grid, Card} from "@mui/material";

export default function VideoCard ({video}){


    return(
        <Grid>
            <Card>
                <CardContent>
                    <Typography>Video Filename: {video.filename} </Typography>
                    <CardMedia component="img" image={video.thumbnailUrl} alt={video.filename}></CardMedia>
                </CardContent>
            </Card>
        </Grid>
    )
}
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import Skeleton from "@mui/material/Skeleton";
// frame preview will be child component of processing form
// this is necessary because processing form contains video picker list
// so the frame thumbnail will depend on the selected video in the form
// image binarizing logic can happen here or we can use a new child component
export default function FramePreview({ before, after }){
    return(<>
        <Grid container sx={{justifyContent: "space-evenly", margin: 2, mb: 4 }} spacing={2}>

            {/* pre processing */}
            <Grid size="grow" sx={{maxWidth: 350}}>
                <Card sx={{backgroundColor: '#d2d9d6'}}>
                    <CardContent>
                        <Typography textAlign="center">Pre-processing</Typography>
                    </CardContent>
                    {/* display image if loaded */}
                    {before ? (
                        <CardMedia sx={{objectFit: "contain", mb: 2, maxHeight: 350}} height="auto" component="img" image={before} alt="thumbnail of video before processing"/>) 
                        : (<Skeleton sx={{mb: 2}} variant="rectangular" height={350} />)}
                    
                </Card>
            </Grid>

            {/* post processing */}
            <Grid size="grow" sx={{maxWidth: 350}}>
                <Card sx={{backgroundColor: '#d2d9d6'}}>
                    <CardContent>
                        <Typography textAlign="center">Post-processing</Typography>
                    </CardContent>
                    {/* display image after loading */}
                    {after ? (
                        <CardMedia sx={{objectFit: "contain", mb: 2, maxHeight: 350}} height="auto" component="img" image={after} alt="thumbnail of video after processing"/>) 
                        : (<Skeleton sx={{mb: 2}} variant="rectangular" height={350} />)}
                    
                </Card>
            </Grid>

        </Grid>
    </>)
}
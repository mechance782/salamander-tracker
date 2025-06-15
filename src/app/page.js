import { Box, Typography, Grid, List, ListItem } from "@mui/material";

export default function Home() {

  return (

      <Grid container spacing={2}>
        <Grid size={8}>
          <Typography>Welcome to Salamander Tracker</Typography>
          <Typography>Upload, preview, and process salamander videos with live tuning tools and instant feedback.</Typography>
        </Grid>
        <Grid size={4}>
          <Typography>Allie the axolotl goes here</Typography>
        </Grid>
        <Grid size={6}>
          <Typography>How It Works - Quick Steps</Typography>
          <List>
            <ListItem><strong>Step 1:</strong>Choose a video from the list to preview it.</ListItem>
            <ListItem><strong>Step 2:</strong>Adjust the color and threshold to detect the salamander.</ListItem>
            <ListItem><strong>Step 3:</strong>Submit your settings to process the full video.</ListItem>
            <ListItem><strong>Step 4:</strong>Download the CSV result showing salamander tracking coordinates.</ListItem>
          </List>
        </Grid>
        <Grid size={6}>
          <Typography>What videos can I use?</Typography>
          <Typography>Supported formats: .mp4, .mov, and .avi. Videos must be placed in the correct backend folder before starting the Docker container.</Typography>
        </Grid>
      </Grid>

  )
}

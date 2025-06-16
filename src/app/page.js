import {Box, Container, Paper, Typography, Grid, List, ListItem } from "@mui/material";
import { FunFactRotator } from "@/components/FunFactRotator";

const Section = ({ children }) => (
  <Paper sx={{ p: 3, height: '100%', backgroundColor: '#DCE3E5', borderRadius: 2 }} elevation={3}>
    {children}
  </Paper>
);

export default function Home() {
  return (
    <>
      <Section>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Welcome to Salamander Tracker
        </Typography>
        <Typography variant="body1">
          Upload, preview, and process salamander videos with live tuning tools and instant feedback.
        </Typography>
      </Section>
      <Section>
        <Typography variant="h5" gutterBottom>
          How It Works - Quick Steps
        </Typography>
        <List>
          <ListItem>
            <strong>Step 1:</strong> Choose a video from the list to preview it.
          </ListItem>
          <ListItem>
            <strong>Step 2:</strong> Adjust the color and threshold to detect the salamander.
          </ListItem>
          <ListItem>
            <strong>Step 3:</strong> Submit your settings to process the full video.
          </ListItem>
          <ListItem>
            <strong>Step 4:</strong> Download the CSV result showing salamander tracking coordinates.
          </ListItem>
        </List>
      </Section>

      <Section>
        <FunFactRotator />
      </Section>
    </>

  );
}
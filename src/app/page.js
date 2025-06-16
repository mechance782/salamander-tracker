"use client"
import { Paper, Typography, Grid, List, ListItem } from "@mui/material";
import { useEffect, useState } from "react";
import { amphibianFacts } from "@/amphibianFacts";

const getRandomFact = () => {
  const index = Math.floor(Math.random() * amphibianFacts.length);
  return amphibianFacts[index];
}

const getRandomDelay = () => {
  return Math.floor(Math.random() * 5000) + 5000;
}

const Section = ({ children }) => (
  <Paper sx={{ p: 3, height: '100%', backgroundColor: '#DCE3E5', borderRadius: 2 }} elevation={3}>
    {children}
  </Paper>
);

function FunFactRotator() {
  const [fact, setFact] = useState(getRandomFact);

  useEffect(() => {
    let timeout;

    const scheduleNextFact = () => {
      timeout = setTimeout(() => {
        setFact(getRandomFact());
        scheduleNextFact();
      }, getRandomDelay());
    };

    scheduleNextFact();

    return () => clearTimeout(timeout);
  }, []);

}

export default function Home() {

return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={7}>
        <Section>
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            Welcome to Salamander Tracker
          </Typography>
          <Typography variant="body1">
            Upload, preview, and process salamander videos with live tuning tools and instant feedback.
          </Typography>
        </Section>
      </Grid>

      <Grid item xs={12} md={5}>
        <Section>
          <FunFactRotator />
          <Typography variant="h6">{fact.fact}</Typography>
        </Section>
      </Grid>

      <Grid item xs={12} md={7}>
        <Section>
          <Typography variant="h5" gutterBottom>
            How It Works - Quick Steps
          </Typography>
          <List>
            <ListItem>
              <strong>Step 1:</strong>Choose a video from the list to preview it.
            </ListItem>
            <ListItem>
              <strong>Step 2:</strong>Adjust the color and threshold to detect the salamander.
            </ListItem>
            <ListItem>
              <strong>Step 3:</strong>Submit your settings to process the full video.
            </ListItem>
            <ListItem>
              <strong>Step 4:</strong>Download the CSV result showing salamander tracking coordinates.
            </ListItem>
          </List>
        </Section>
      </Grid>

    </Grid>
  );
}


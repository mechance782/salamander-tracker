"use client"
import { useEffect, useState } from "react";
import { amphibianFacts } from "@/amphibianFacts";
import { Typography } from "@mui/material";

const getRandomFact = () => {
  const index = Math.floor(Math.random() * amphibianFacts.length);
  return amphibianFacts[index];
}

const getRandomDelay = () => {
  return Math.floor(Math.random() * 5000) + 10000;
}


export function FunFactRotator() {
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
  return(
    <>
      <Typography>{fact.fact}</Typography>
    </>
  )
}

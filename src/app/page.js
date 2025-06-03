"use client";
import { useVideos } from "@/context/VideoContext"
import { useEffect } from "react";

export default function Home() {
  const { updateVideos } = useVideos();

  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    const res = await fetch(`http://localhost:3000/api/videos`);
    const data = await res.json();
    updateVideos(data);
  };

  return <div>
    Home
  </div>
}

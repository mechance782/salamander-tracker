# Salamander Tracker – Interactive Video Analysis Frontend


## Overview
This project is a React-based frontend that works with a backend API (built in our other class, SDEV 355 - Algorithms) to allow researchers at The Ohio State University to track salamanders in their research environments a little easier. Users can select a video, preview it, tweak processing settings like color and threshold, and then submit a job to analyze the video. The backend then processes the video and returns a downloadable CSV file of the detected coordinates.

The goal of this app was to give us experience building a complete React application that consumes a backend API, handles image rendering and manipulation on the client side, and follows modern frontend development best practices. Just as importantly, it was also about designing an application with a real use case. Something intended for actual users, not just a one-off school project. Through this process, we had to consider additional factors such as user experience, reliability, and how robust our processing logic was. We also focused on thorough documentation, testing, and building a system that could be maintained and improved on over time.

---

## Running the Backend with Docker
Before using the frontend, you need to start up the backend. The backend is written in **Java** using **Maven** and uses **JavaCV** for video processing.

You can run the backend with Docker using the following command:

```bash
docker run \
  -p 3000:3000 \
  -v "$VIDEO_DIRECTORY:/videos" \
  -v "$RESULTS_DIRECTORY:/results" \
  ghcr.io/mechance728/salamander:latest 
```

> ⚠️ **Important:**  
> Make sure to replace `$VIDEO_DIRECTORY` and `$RESULTS_DIRECTORY` with **absolute paths** on your machine:
>
> - **`$VIDEO_DIRECTORY`** should be the full path to a folder that contains the videos you want to process.
> - **`$RESULTS_DIRECTORY`** should be the full path to a folder where you want the backend to save the resulting CSV files.

---

## Getting Started

First, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

---

## Features

---

## 🔧 Technologies Used
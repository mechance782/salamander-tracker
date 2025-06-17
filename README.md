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
  ghcr.io/mechance728/salamander:latest 
```

> ⚠️ **Important:**  
> Make sure to replace `$VIDEO_DIRECTORY` with **absolute paths** on your machine:
>
> - **`$VIDEO_DIRECTORY`** should be the full path to a folder that contains the videos you want to process.

---

## Getting Started

After starting the backend using the docker command, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3001) with your browser to see the result.

---

## Features
### Video Chooser Page (`/videos`)
- Fetches a list of videos from `/api/videos`
- Displays them in a responsive grid
- Allows clicking on any video to jump to its preview page

### Preview & Processing Page (`/preview/:filename`)
- Fetches and displays the first frame of the video
- Allows users to:
  - Pick a target color (via color picker)
  - Adjust a binarization threshold (via slider)
  - See a real-time preview of how the binary image will look
  - Visualize the centroid of the largest object
- Button to submit the video for full processing
- Polls the backend for job status and displays CSV download when ready

### Processing Pipeline
- `POST /process/{filename}?targetColor=ff0000&threshold=50`
- Polls `GET /process/{jobId}/status` until job is complete
- Users can then download a CSV result file of the processing job.


[Presentation Slides](https://docs.google.com/presentation/d/18hO6xN5iRbBb0IZE1ZLIITYwBefRYz0IStsnhxoUPKY/edit?usp=sharing)
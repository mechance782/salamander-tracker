
import { VideoProvider } from "@/context/VideoContext";
import Navigation from "@/components/Navigation";
import { JobProvider } from "@/context/JobContext";
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <JobProvider>
          <VideoProvider>
            <Navigation/>
            {children}
          </VideoProvider>
        </JobProvider>
      </body>
    </html>
  );
}

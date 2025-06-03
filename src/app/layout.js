
import { VideoProvider } from "@/context/VideoContext";
import Navigation from "@/components/Navigation";
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <VideoProvider>
          <Navigation/>
          {children}
        </VideoProvider>
      </body>
    </html>
  );
}

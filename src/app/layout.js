'use client'
import { VideoProvider } from "@/context/VideoContext";
import Navigation from "@/components/Navigation";
import { JobProvider } from "@/context/JobContext";
import { createTheme} from '@mui/material/styles';
import { ThemeProvider, CssBaseline } from '@mui/material';

export default function RootLayout({ children }) {
const themeOptions = createTheme({
  palette: {
    background: {
      default: '#fcf8f5',
    },
    primary: {
      main: '#5A6E6C',
    },
    secondary: {
      main: '#aebabd',
    },
    info: {
      main: '#B3A9A1',
      secondary: '#faf3ed'
    },
  },
  typography: {
    fontFamily: 'Raleway',
    fontWeightLight: 300,
    fontWeightRegular: 500,
    htmlFontSize: 16,
  },
  components: {
    MuiButton: {
      variants: [
        {
          props: { variant: 'gradient' },
          style: {
            background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
            border: 0,
            borderRadius: 3,
            boxShadow: '0 3px 5px 2px #92283d',
            color: 'white',
            height: 48,
            padding: '0 30px',
          },
        },
        {
          props: { variant: 'nav' },
            style: {
              background: 'linear-gradient(45deg, #B3A9A1 30%, rgb(169, 189, 177) 90%)',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              borderRadius: 20,
              color: '#2e2e2e',
              height: 36,
              margin: '0 5px',
              padding: '6px 20px',
              fontWeight: 600,
              fontSize: '0.9rem',
            },
        },
        {
          props: { variant: 'title'},
            style: {
              fontFamily: 'Raleway, sans-serif',
              letterSpacing: 1,
              color: 'info.main',
              textAlign: 'center',
              margin: 'auto'
            }
        }],
}}});


  return (
    <html lang="en">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Raleway:wght@300;500&display=swap" rel="stylesheet"/>
      </head>  
      <body>
        <ThemeProvider theme={themeOptions}>
          <CssBaseline />
          <JobProvider>
            <VideoProvider>
              <Navigation/>
              {children}
            </VideoProvider>
          </JobProvider>
        </ThemeProvider>
        
      </body>
    </html>
  );
}

'use client'
import { VideoProvider } from "@/context/VideoContext";
import Navigation from "@/components/Navigation";
import { JobProvider } from "@/context/JobContext";
import { createTheme} from '@mui/material/styles';
import { ThemeProvider, CssBaseline } from '@mui/material';

export default function RootLayout({ children }) {
const themeOptions = createTheme({
  palette: {
    primary: {
      main: '#5A6E6C',
    },
    secondary: {
      main: '#7D9BA3',
    },
    info: {
      main: '#B3A9A1',
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
            boxShadow: '0 3px 5px 2px rgba(146, 40, 61, 0.3)',
            color: 'white',
            height: 48,
            padding: '0 30px',
          },
        },
        {
          props: { variant: 'nav' },
          style: {
            background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
            border: 0,
            borderRadius: 3,
            boxShadow: '0 3px 5px 2px rgba(146, 40, 61, 0.3)',
            color: 'white',
            height: 48,
            padding: '0 30px',
          },
        },
      ],
    },
  },
});


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

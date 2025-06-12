import Link from "next/link"
import { AppBar, Toolbar, Button, Typography, Box} from '@mui/material';


export default function Navigation(){
    return (<>
        <AppBar position ="static" sx={{mb:2}}>
            <Toolbar sx={{display:'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                <Box sx={{display: 'flex', gap:1, margin: '0 10px'}}>
                    <Link href="/" className="nav-link"><Button color="inherit" variant='nav'>Home</Button></Link>
                    <Link href="/videos"><Button color="inherit" variant='nav'>Available Videos</Button></Link>
                    <Link href="/preview/..."><Button color="inherit" variant='nav'>Process Video</Button></Link> 
                </Box>
                <Typography variant="title" component="h1" sx={{flexGrow: 1, fontWeight: 'bold',fontFamily: 'Raleway, sans-serif',letterSpacing: 0.2,color: '#7b8f86', textAlign: 'center',textShadow: `-0.5px -0.5px 0 #000,0.5px -0.5px 0 #000,-0.5px  0.5px 0 #000,0.5px  0.5px 0 #000`}}>
                    SALAMANDER TRACKER
                </Typography>
            </Toolbar>
            
        </AppBar>
    </>)
}
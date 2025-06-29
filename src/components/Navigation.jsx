import Link from "next/link"
import { AppBar, Toolbar, Button, Typography, Box} from '@mui/material';
import Image from "next/image";
import allie from '../public/allie.png'

export default function Navigation(){
    return (<>
        <AppBar position ="static" sx={{mb:2}}>
            <Toolbar sx={{display:'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                
                <Box sx={{display: 'flex', gap:1, margin: '0 10px'}}>
                    <Link data-cy="nav-home-link" href="/" className="nav-link"><Button color="inherit" variant='nav'>Home</Button></Link>
                    <Link data-cy="nav-video-link" href="/videos"><Button color="inherit" variant='nav'>Available Videos</Button></Link>
                    <Link data-cy="nav-preview-link" href="/preview/..."><Button color="inherit" variant='nav'>Process Video</Button></Link> 
                </Box>          
<Typography variant="h3" component="h1" sx={{ flexGrow: 0.5, fontWeight: 'bold', fontFamily: 'Raleway, sans-serif', letterSpacing: 1, textAlign: 'center', color: '#8fa3a0', textTransform: 'uppercase', mt: 2 }}>
  SALAMANDER TRACKER
  <Image height={40} alt="axolotl logo" src={allie}></Image>
</Typography>


            </Toolbar>
            
        </AppBar>
    </>)
}
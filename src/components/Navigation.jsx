import Link from "next/link"
import { AppBar, Toolbar, Button} from '@mui/material';


export default function Navigation(){
    return (<>
        <AppBar position ="static" sx={{mb:2}}>
            <Toolbar>
                <Link href="/" className="nav-link"><Button color="inherit" variant='nav'>Home</Button></Link>
                <Link href="/videos"><Button color="inherit" variant='nav'>Available Videos</Button></Link>
                <Link href="/preview/..."><Button color="inherit" variant='nav'>Process Video</Button></Link> 
            </Toolbar>
        </AppBar>
    </>)
}
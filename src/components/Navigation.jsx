import Link from "next/link"
import { AppBar, Toolbar, Button} from '@mui/material';

export default function Navigation(){
    return (<>
        <AppBar position ="static">
            <Toolbar>
                <Link href="/" className="nav-link"><Button color="inherit">Home</Button></Link>
                <Link href="/videos"><Button color="inherit">Available Videos</Button></Link>
                <Link href="/preview/no-video"><Button color="inherit">Process Video</Button></Link> 
            </Toolbar>
        </AppBar>
    </>)
}
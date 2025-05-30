import Link from "next/link"

export default function Navigation(){
    return (<>
        <nav>
            <Link href="/" className="nav-link">Home</Link>
            <Link href="/videos">Available Videos</Link>
            <Link href="/preview/no-video">Process Video</Link>
        </nav>
    </>)
}
// use video context to list available videos
// link that takes you to preview of video
// link that takes you to public folder with video in it

export default function VideoCard ({video}){


    return(
        <>
            <img src={video.thumbnailUrl} alt={video.name} controls width="100%" />
        </>
    )
}
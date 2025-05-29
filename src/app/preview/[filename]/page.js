// Shows thumbnail of video + binarized thumbnail of video
// Use form for color picker, video file picker, and Threshold 
// page should change based on any form changes
export default function PreviewVideo({ params }){
    // Use Processing Form component
    // frame preview is child component of form
    return <>{params.filename}</>
}
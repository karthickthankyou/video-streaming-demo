import React, { useState, useEffect } from 'react'
import '../App.css';

const VideoPlayer = ({ videoTitle }) => {
    const [videoError, setVideoError] = useState(false)
    useEffect(() => {
        setVideoError(false)
    }, [videoTitle])

    const errorFound = () => {
        setVideoError(true)
    }

    function ShowVideo() {
        return (<div >
            <video width="640" height="480" onError={errorFound} key={`http://localhost:3000/${videoTitle}`} id="videoPlayer" controls muted="muted" autoPlay>
                <source src={`http://localhost:5000/${videoTitle}`} type="video/mp4" />
            </video>
        </div>)
    }

    function ShowError() {
        return <div><h4>No Video Found</h4> <p>Try "forest", "home" or "sea".</p> </div>
    }

    return (
        <>
            {!videoError ? <ShowVideo /> : <ShowError />}
        </>
    )
}

export default VideoPlayer

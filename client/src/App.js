import React, { useState, useEffect, useRef } from 'react'

import './App.css'
import VideoPlayer from './components/VideoPlayer'

function App() {
  let searchString = useRef(null)
  useEffect(() => {
    searchString.current.focus()
  }, [])

  const [videoTitle, setVideoTitle] = useState('')

  const changeVideoTitle = (e) => {
    e.preventDefault()
    setVideoTitle(searchString.current.value)
  }

  const resetVideoTitle = (e) => {
    e.preventDefault()
    setVideoTitle('')
    searchString.current.value = ""
    searchString.current.focus()
  }

  return (
    <div className="App">
      <h2>Video Streaming Demo</h2>
      <form className='form' onSubmit={changeVideoTitle} onReset={resetVideoTitle}>
        <input className='input' ref={searchString} placeholder="Type something..." type="text" />
        <button className='input' type="submit">Search</button>
        <button className='input' type="reset">Reset</button>
      </form>
      <br />
      <VideoPlayer videoTitle={videoTitle} />
    </div>
  )
}

export default App

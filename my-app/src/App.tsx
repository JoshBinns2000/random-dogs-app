import React, { useEffect, useRef } from 'react';
import './App.css';

import ImageRow from './Components/ImageRow';
import Buses from './Components/Buses';
import YouTube, { YouTubeProps, YouTubeEvent } from 'react-youtube';
import { YouTubePlayer } from 'youtube-player/dist/types';

function App() {
  var [imageUrl, setImageUrl] = React.useState("https://images.dog.ceo/breeds/terrier-bedlington/n02093647_524.jpg");

  var [isCycling, setIsCycling] = React.useState(false);
  const cycleInterval = useRef<NodeJS.Timeout>();

  var [testBool, setTestBool] = React.useState(true);

  var videoPlayer = useRef<YouTubePlayer>();
  var [videoPlayerAction, setVideoPlayerAction] = React.useState<'Pause' | 'Play'>('Play');

  const baseUrl = "https://dog.ceo/api/breeds/image/random";
  const backupDogImage = "https://images.dog.ceo/breeds/terrier-bedlington/n02093647_524.jpg";

  const getNewDogs = () => {
    fetch(baseUrl)
      .then(response => response.json())
      .then(data => {
        if (data.message) setImageUrl(data.message)
        else setImageUrl(backupDogImage);
      })
      .catch(error => {
        console.log(error);
        getNewDogs();
      });
  }

  // App is never going to unmount
  useEffect(() => {
    return () => clearInterval(cycleInterval.current);
  }, []);

  useEffect(() => {
    if (!isCycling) {
      clearInterval(cycleInterval.current);
    }
    else {
      getNewDogs();
      cycleInterval.current = setInterval(getNewDogs, 100);
    }
  }, [isCycling]);

  const handleTestClick = () => {
    console.log(testBool);
    setTestBool(testBool => !testBool);
    setTestBool(testBool => !testBool);
    console.log(testBool);
  }

  const youtTubeOpts: YouTubeProps['opts'] = {
    playerVars: {
      autoplay: 1,
    },
    height: '800px',
    width: '400px',
  };

  const youTubeStyle: React.CSSProperties = {
    'position': 'relative',
    'border': '.5rem solid grey',
    'borderRadius': '2rem',
    'overflow': 'hidden',
    'lineHeight': '0px',
    'zIndex': 0,
    'pointerEvents': 'none',
  };

  const handlePlayButtonClick = () => {
    if (videoPlayer.current === undefined) return;

    if (videoPlayerAction === 'Play') {
      setVideoPlayerAction('Pause');
      videoPlayer.current.playVideo();
    }
    else {
      setVideoPlayerAction('Play');
      videoPlayer.current.pauseVideo()
    }
};

const onVideoPlayerReady = (event: YouTubeEvent) => {
  videoPlayer.current = event.target;
};

return (
  <div className="large-container">
    <div className="container sliding-background">
      <ImageRow imageUrl={imageUrl}></ImageRow>
      <div className="padded">
        <button onClick={() => setIsCycling(!isCycling)}>MANY DOG</button>
      </div>
      <Buses></Buses>
      {/* <button onClick={handleTestClick}>{testBool.toString()}</button> */}
    </div>

    <div className="youtube-container">
      <div className="phone-container">
        <YouTube videoId="xDHCZau61n4" opts={youtTubeOpts} style={youTubeStyle} onReady={onVideoPlayerReady}></YouTube>
        <button className="phone-button" onClick={handlePlayButtonClick}>{videoPlayerAction}</button>
      </div>
    </div>
  </div>
);
}

export default App;

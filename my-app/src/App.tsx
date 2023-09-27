import React, { useEffect, useRef } from 'react';
import './App.css';

import ImageRow from './Components/ImageRow';
import Buses from './Components/Buses';

function App() {
  var [imageUrl, setImageUrl] = React.useState("https://images.dog.ceo/breeds/terrier-bedlington/n02093647_524.jpg");

  var [isCycling, setIsCycling] = React.useState(false);
  const cycleInterval = useRef<NodeJS.Timeout>();

  var [testBool, setTestBool] = React.useState(true);

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
    setTestBool((testBool) => !testBool);
    console.log(testBool);
  }

  return (
    <div className="container sliding-background">
      <ImageRow imageUrl={imageUrl}></ImageRow>
      <div className="padded">
        <button onClick={() => setIsCycling(!isCycling)}>MANY DOG</button>
      </div>
      <Buses></Buses>
      <button onClick={handleTestClick}>Test Button</button>
    </div>
  );
}

export default App;

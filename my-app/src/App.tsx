import React, { useEffect, useRef } from 'react';
import logo from './logo.svg';
import './App.css';

import ImageRow from './Components/ImageRow';

function App() {
  var [imageUrl, setImageUrl] = React.useState("https://images.dog.ceo/breeds/terrier-bedlington/n02093647_524.jpg");

  var [isCycling, setIsCycling] = React.useState(false);
  const cycleInterval = useRef<NodeJS.Timeout>();

  const baseUrl = "https://dog.ceo/api/breeds/image/random";

  const getNewDogs = () => {
    fetch(baseUrl)
      .then(response => response.json())
      .then(data => setImageUrl(data.message))
      .catch(error => {
        console.log(error);
        getNewDogs();
      });
      // handle bad image url
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
      cycleInterval.current = setInterval(getNewDogs, 500);
    }
  }, [isCycling]);

  return (
    <div className="container">
      <ImageRow imageUrl={imageUrl}></ImageRow>
      <div className="padded">
        <button onClick={() => setIsCycling(!isCycling)}>DOG</button>
      </div>
    </div>
  );
}

export default App;

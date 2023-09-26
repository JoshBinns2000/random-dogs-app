import React from 'react';
import logo from './logo.svg';
import './App.css';

import ImageRow from './Components/ImageRow';

function App() {
  var [imageUrl, setImageUrl] = React.useState("https://images.dog.ceo/breeds/terrier-bedlington/n02093647_524.jpg");

  const baseUrl = "https://dog.ceo/api/breeds/image/random";

  const getNewDogs = () => {
    fetch(baseUrl)
      .then(response => response.json())
      .then(data => setImageUrl(data.message))
      .catch(error => {
        console.log(error);
        getNewDogs();
      });
  }

  return (
    <div className="container">
      <ImageRow imageUrl={imageUrl}></ImageRow>
      <div className="padded">
        <button onClick={getNewDogs}>DOG</button>
      </div>
    </div>
  );
}

export default App;

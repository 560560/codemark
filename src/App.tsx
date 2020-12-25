import React from 'react';
import SearchBarContainer from "./components/SearchBar/SearchBarContainer"
import GalleryContainer from "./components/Gallery/GalleryContainer"


function App() {
  return (
      <div className="app-wrapper">
        <SearchBarContainer/>
        <GalleryContainer/>
      </div>
  );
}

export default App


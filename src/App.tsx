import React from 'react';
import './styles/App.css'
import Navigation from './modules/Navigation'
import Sidebar from './modules/Sidebar'
import Feed from './modules/Feed'
import { useState } from 'react'

function App() {
  const [postStyleState, setPostStyleState] = useState('card')
  const [darkMode, setDarkMode] = useState(true)

  return (
    <div className="App">
      <Navigation darkMode={darkMode} setDarkMode={setDarkMode}></Navigation>
      <div className={`main-container ${postStyleState}`}>
        <Feed postStyleState={postStyleState} setPostStyleState={setPostStyleState}></Feed>
        <Sidebar></Sidebar>
      </div>
    </div>
  )
}

export default App

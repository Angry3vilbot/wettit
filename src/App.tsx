import React, { useEffect } from 'react';
import './styles/App.css'
import Navigation from './modules/Navigation'
import Sidebar from './modules/Sidebar'
import Feed from './modules/Feed'
import { useState } from 'react'

interface Subwettit extends Object {
  title: String,
  type: String,
  logo: Buffer,
  nsfw: Boolean,
  members: Array<String>,
  moderators: Array<String>
}

function App() {
  const [postStyleState, setPostStyleState] = useState<String>('card')
  const [darkMode, setDarkMode] = useState<Boolean>(true)
  const [subwettits, setSubwettits] = useState<Array<Subwettit>>(null)

  useEffect(() => {
    const fetchData = async () => {
      const data = await (
          await fetch(`http://localhost:8000/subwettits/all`, {
          method: 'GET',
          })
      ).json()
      setSubwettits(data)
    }   
    fetchData()
  }, [])

  return (
    <div className="App">
      <Navigation darkMode={darkMode} setDarkMode={setDarkMode} subwettits={subwettits}></Navigation>
      <div className={`main-container ${postStyleState}`}>
        <Feed postStyleState={postStyleState} setPostStyleState={setPostStyleState}></Feed>
        <Sidebar subwettits={subwettits}></Sidebar>
      </div>
    </div>
  )
}

export default App

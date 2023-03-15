import React, { ReactElement, useEffect, useState } from 'react'
import '../styles/sidebar.css'
import greenArrow from '../assets/green-arrow.svg'
import redArrow from '../assets/red-arrow.svg'
import carbonated from '../assets/subwettit-icons/carbonated.png'
import oceans from '../assets/subwettit-icons/oceans.png'
import river from '../assets/subwettit-icons/river.png'
import sea from '../assets/subwettit-icons/sea.webp'
import water from '../assets/subwettit-icons/water.jpg'

interface Props {
    subwettits: Array<Subwettit>
}

interface Subwettit extends Object {
    title: String,
    type: String,
    logo: Buffer,
    nsfw: Boolean,
    members: Array<String>,
    moderators: Array<String>,
    creation_date: Date
}

function Sidebar({ subwettits }: Props) {
  // Put the rand into a state to stop it from switching on ReRender
  const [rand, setRand] = useState<number>(Math.floor(Math.random() * 3))
  const [newest, setNewest] = useState<Array<Subwettit>>()
  const [mostPopular, setMostPopular] = useState<Array<Subwettit>>()

  useEffect(() => {
    const fetchData = async () => {
        let data1: Array<Subwettit> = await (await fetch('http://localhost:8000/subwettits/newest')).json()
        let data2 = await (await fetch('http://localhost:8000/subwettits/most-popular')).json()
        setNewest(data1)
        setMostPopular(data2)
    }   
    fetchData()
  }, [])

  function getRandomLeaderboard(){
    let possibleOptionsArray = ['mostPopular', 'rising', 'newest']
    let result = possibleOptionsArray[rand]
    let jsxArray: Array<ReactElement> = []

    switch(result){
        case 'mostPopular':
            for (let i = 0; i <= mostPopular.length - 1; i++) {
                //? How do I know what arrow to put? (Save a copy of the query results each 24 hours in the database and compare?)
                // Or just abandon the idea, that also works
                jsxArray.push(
                    <div className='leaderboard-item' key={i}>
                        <h5>{i+1}</h5>
                        <img src={greenArrow}></img>
                        <div className='leaderboard-item-image' style={{background: `no-repeat url(${mostPopular[i].logo}) center center`, backgroundSize: 'contain'}}></div>
                        <p>{mostPopular[i].title}</p>
                    </div>
                )
            }

            return (
                <div className='top-card'>
                    <div className='caption-container'>
                        <h3>Most Popular Communities</h3>
                    </div>
                    <div className='leaderboard'>
                        {jsxArray}
                        <div className='leaderboard-view-all-btn'>View All</div>
                    </div>
                </div>
            )
        case 'rising':
            return (
                <div className='top-card'>
                    <div className='caption-container'>
                        <h3>Top Waterbody Communities</h3>
                    </div>
                    <div className='leaderboard'>
                        <div className='leaderboard-item'>
                            <h5>1</h5>
                            <img src={greenArrow}></img>
                            <div className='leaderboard-item-image' style={{background: `no-repeat url(${sea}) center center/contain`}}></div>
                            <p>w/seas</p>
                        </div>
                        <div className='leaderboard-item'>
                            <h5>2</h5>
                            <img src={redArrow}></img>
                            <div className='leaderboard-item-image' style={{background: `no-repeat url(${oceans}) center center/contain`}}></div>
                            <p>w/oceans</p>
                        </div>
                        <div className='leaderboard-item'>
                            <h5>3</h5>
                            <img src={greenArrow}></img>
                            <div className='leaderboard-item-image' style={{background: `no-repeat url(${river}) center center/contain`}}></div>
                            <p>w/rivers</p>
                        </div>
                        <div className='leaderboard-view-all-btn'>View All</div>
                    </div>
                </div>
            )
        case 'newest':
            for (let i = 0; i <= newest.length - 1; i++) {
                //? How do I know what arrow to put? (Save a copy of the query results each 24 hours in the database and compare?)
                // Or just abandon the idea, that also works
                jsxArray.push(
                    <div className='leaderboard-item' key={i}>
                        <h5>{i+1}</h5>
                        <img src={greenArrow}></img>
                        <div className='leaderboard-item-image' style={{background: `no-repeat url(${newest[i].logo}) center center`, backgroundSize: 'contain'}}></div>
                        <p>{newest[i].title}</p>
                    </div>
                )
            }

            return (
                <div className='top-card'>
                    <div className='caption-container'>
                        <h3>The Newest Communities</h3>
                    </div>
                    <div className='leaderboard'>
                        {jsxArray}
                        <div className='leaderboard-view-all-btn'>View All</div>
                    </div>
                </div>
            )
        default:
            throw 'Error loading subwettit leaderboard'
    }
  }

  if(!newest || !mostPopular) return <div></div>

  return (
    <div className='sidebar'>
        {getRandomLeaderboard()}
        <div className='side-menu'>
            <div className='side-menu-section'>
                <p>User Agreement</p>
                <p>Privacy Policy</p>
                <p>Content Policy</p>
                <p>Moderator Code Of Conduct</p>
            </div>
            <div className='side-menu-section'>
                <p>English</p>
                <p>Français</p>
                <p>Italiano</p>
                <p>Deutsch</p>
                <p>Español</p>
                <p>Português</p>
            </div>
            <div className='side-menu-section'>
                <p>Wettit Inc © 2022. All rights reserved</p>
            </div>
        </div>
    </div>
  )
}

export default Sidebar
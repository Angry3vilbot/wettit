import React from 'react'
import '../styles/sidebar.css'
import greenArrow from '../assets/green-arrow.svg'
import redArrow from '../assets/red-arrow.svg'
import carbonated from '../assets/subwettit-icons/carbonated.png'
import oceans from '../assets/subwettit-icons/oceans.png'
import river from '../assets/subwettit-icons/river.png'
import sea from '../assets/subwettit-icons/sea.webp'
import water from '../assets/subwettit-icons/water.jpg'

function Sidebar() {
  function getRandomLeaderboard(){
    let possibleOptionsArray = ['drinks', 'bodies', 'growing']
    let rand = Math.floor(Math.random() * possibleOptionsArray.length)
    let result = possibleOptionsArray[rand]
    switch(result){
        case 'drinks':
            return (
                <div className='top-card'>
                    <div className='caption-container'>
                        <h3>Top Drink Communities</h3>
                    </div>
                    <div className='leaderboard'>
                        <div className='leaderboard-item'>
                            <h5>1</h5>
                            <img src={greenArrow}></img>
                            <div className='leaderboard-item-image' style={{background: `no-repeat url(${water}) center center`, backgroundSize: 'contain'}}></div>
                            <p>w/water</p>
                        </div>
                        <div className='leaderboard-item'>
                            <h5>2</h5>
                            <img src={redArrow}></img>
                            <div className='leaderboard-item-image' style={{background: `no-repeat url(${carbonated}) center center`, backgroundSize: 'contain'}}></div>
                            <p>w/carbonateddrinks</p>
                        </div>
                        <div className='leaderboard-view-all-btn'>View All</div>
                    </div>
                </div>
            )
        case 'bodies':
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
        case 'growing':
            return (
                <div className='top-card'>
                    <div className='caption-container'>
                        <h3>Top Growing Communities</h3>
                    </div>
                    <div className='leaderboard'>
                        <div className='leaderboard-item'>
                            <h5>1</h5>
                            <img src={greenArrow}></img>
                            <div className='leaderboard-item-image' style={{background: `no-repeat url(${water}) center center/contain`}}></div>
                            <p>w/water</p>
                        </div>
                        <div className='leaderboard-item'>
                            <h5>2</h5>
                            <img src={greenArrow}></img>
                            <div className='leaderboard-item-image' style={{background: `no-repeat url(${sea}) center center/contain`}}></div>
                            <p>w/seas</p>
                        </div>
                        <div className='leaderboard-item'>
                            <h5>3</h5>
                            <img src={redArrow}></img>
                            <div className='leaderboard-item-image' style={{background: `no-repeat url(${carbonated}) center center/contain`}}></div>
                            <p>w/carbonateddrinks</p>
                        </div>
                        <div className='leaderboard-item'>
                            <h5>4</h5>
                            <img src={redArrow}></img>
                            <div className='leaderboard-item-image' style={{background: `no-repeat url(${oceans}) center center/contain`}}></div>
                            <p>w/oceans</p>
                        </div>
                        <div className='leaderboard-item'>
                            <h5>5</h5>
                            <img src={greenArrow}></img>
                            <div className='leaderboard-item-image' style={{background: `no-repeat url(${river}) center center/contain`}}></div>
                            <p>w/rivers</p>
                        </div>
                        <div className='leaderboard-view-all-btn'>View All</div>
                    </div>
                </div>
            )
        default:
            throw 'Error loading subwettit leaderboard'
    }
  }
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
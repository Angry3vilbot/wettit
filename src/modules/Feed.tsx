import React, { useState, useRef } from 'react'
import '../styles/feed.css'
import hotActive from '../assets/hot-active.svg'
import hotInactive from '../assets/hot-inactive.svg'
import bestActive from '../assets/best-active.svg'
import bestInactive from '../assets/best-inactive.svg'
import recentActive from '../assets/recent-active.svg'
import recentInactive from '../assets/recent.svg'
import topActive from '../assets/top-active.svg'
import topInactive from '../assets/top-inactive.svg'
import { useEffect } from 'react'
import Posts from './Posts'

function Feed({ postStyleState, setPostStyleState }) {
    //? This sucks lmao. Should be change to a single state
    const [bestActiveState, setBestActiveState] = useState(true)
    const [hotActiveState, setHotActiveState] = useState(false)
    const [recentActiveState, setRecentActiveState] = useState(false)
    const [topActiveState, setTopActiveState] = useState(false)

    const postStyleDropdown = useRef<HTMLDivElement>(null)
    const postStyleSwitch = useRef<HTMLDivElement>(null)
    // const postStyleDropdown = useRef(null)
    // const postStyleDropdown = useRef(null)


    useEffect(()=>{changeFeedSwitchEventListeners()}, [])
    
    function checkDropEvent(item){
        if(item.children.length > 2){
          return false
        }
        return true
    }
    function handleDropDown(ev){
        if(!checkDropEvent(ev.target.parentElement)){
            if(!document.querySelector('[class="post-style-dropdown hidden"]')){
                
                return
            }
          else{
            postStyleDropdown.current?.classList.remove('hidden')
            postStyleSwitch.current?.classList.add('dropped')
          }
        }
    }
    function changePostStyle(ev, style){
        if(!ev.currentTarget.classList.contains('selected')){
            //? Possibly can only be done like this?
            ev.currentTarget.parentElement.querySelector('[class="post-style-dropdown-item selected"]').classList.remove('selected')
            ev.currentTarget.classList.add('selected')
            postStyleDropdown.current?.classList.add('hidden')
            postStyleSwitch.current?.classList.remove('dropped')
            setPostStyleState((ev.currentTarget.querySelector('p').innerHTML).toLowerCase())
            console.log(postStyleState)
        }
    }

    //? Will need to be changed according to how I will change the useState
    function changeFeed(ev){
        let caller = ev.currentTarget
        let previous = caller.parentElement.querySelector('[class="feed-switch active"]')
        switch(caller.querySelector('img').className){
            case 'best-img':
                setBestActiveState(true)
                break
            case 'hot-img':
                setHotActiveState(true)
                break
            case 'recent-img':
                setRecentActiveState(true)
                break
            case 'top-img':
                setTopActiveState(true)
                break
        }
        switch(previous.querySelector('img').className){
            case 'best-img':
                setBestActiveState(false)
                break
            case 'hot-img':
                setHotActiveState(false)
                break
            case 'recent-img':
                setRecentActiveState(false)
                break
            case 'top-img':
                setTopActiveState(false)
                break
        }
        caller.classList.add('active')
        previous.classList.remove('active')
        changeFeedSwitchEventListeners()
    }
    function changeFeedSwitchEventListeners(){
        let active = document.querySelector('[class="feed-switch active"]')
        let other = document.querySelectorAll('[class="feed-switch"]')
        active?.removeEventListener('click', changeFeed)
        other.forEach((item) => {
            item.removeEventListener('click', changeFeed)
            item.addEventListener('click', changeFeed)
        })
    }
  return (
    <div className='main-section'>
    <div className='feed-container'>
        <div className='feed-switch-container'>
            <div className='feed-switch active'>
                <img className='best-img' src={bestActiveState ? bestActive : bestInactive}></img>
                <h3>Best</h3>
            </div>
            <div className='feed-switch'>
                <img className='hot-img' src={hotActiveState ? hotActive : hotInactive}></img>
                <h3>Hot</h3>
            </div>
            <div className='feed-switch'>
                <img className='recent-img' src={recentActiveState ? recentActive : recentInactive}></img>
                <h3>New</h3>
            </div>
            <div className='feed-switch'>
                <img className='top-img' src={topActiveState ? topActive : topInactive}></img>
                <h3>Top</h3>
            </div>
        </div>
        <div className='feed-post-style-switch' onClick={handleDropDown} ref={postStyleSwitch}>
            <div className={postStyleState}></div>
            <div></div>
            <div className='post-style-dropdown hidden' ref={postStyleDropdown}>
                <div className='post-style-dropdown-item selected' onClick={(ev) => changePostStyle(ev, 'card')}>
                    <div></div>
                    <p>Card</p>
                </div>
                <div className='post-style-dropdown-item' onClick={(ev) => changePostStyle(ev, 'classic')}>
                    <div></div>
                    <p>Classic</p>
                </div>
                <div className='post-style-dropdown-item' onClick={(ev) => changePostStyle(ev, 'compact')}>
                    <div></div>
                    <p>Compact</p>
                </div>
            </div>
        </div>
    </div>
    <Posts postStyle={postStyleState}></Posts>
    </div>
  )
}

export default Feed
import React, { useState, useRef } from 'react'
import '../styles/home/feed.css'
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

interface Subwettit extends Object {
    title: String,
    logo: Buffer,
}

interface Post extends Object {
    title: String,
    content: String,
    image: Buffer,
    author: String,
    date: Date,
    score: number,
    comments: Array<String>, // Not implemented
    formatted_subwettit: Subwettit,
    flair: String,
    flairColor: String
}

function Feed({ postStyleState, setPostStyleState }) {
    const [sortBy, setSortBy] = useState<String>('best')
    const [posts, setPosts] = useState<Array<Post>>()

    const postStyleDropdown = useRef<HTMLDivElement>(null)
    const postStyleSwitch = useRef<HTMLDivElement>(null)

    useEffect(()=>{
        document.querySelectorAll('.feed-switch').forEach((item) => item.addEventListener('click', changeFeed))
        document.querySelectorAll('.feed-switch active').forEach((item) => item.addEventListener('click', changeFeed))
    }, [])

    useEffect(() => {
        async function getData(category: String) {
            let data: Array<Post>
            switch(category) {
                case 'best':
                    data = await (await fetch('http://localhost:8000/posts/best')).json()
                    console.log(data)
                    setPosts(data)
                    break
                case 'hot':
                    data = await (await fetch('http://localhost:8000/posts/hot')).json()
                    console.log(data)
                    setPosts(data)
                    break
                case 'recent':
                    data = await (await fetch('http://localhost:8000/posts/recent')).json()
                    console.log(data)
                    setPosts(data)
                    break
                case 'top':
                    //! Not Implemented
                    data = await (await fetch('http://localhost:8000/posts/best')).json()
                    setPosts(data)
                    break
            }
        }
        getData(sortBy)
    }, [sortBy])
    
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
    function changePostStyle(ev, style: String){
        if(!ev.currentTarget.classList.contains('selected')){
            //? Possibly can only be done like this?
            ev.currentTarget.parentElement.querySelector('[class="post-style-dropdown-item selected"]').classList.remove('selected')
            ev.currentTarget.classList.add('selected')
            postStyleDropdown.current?.classList.add('hidden')
            postStyleSwitch.current?.classList.remove('dropped')
            setPostStyleState(style)
        }
    }

    function changeFeed(ev){
        let caller = ev.currentTarget
        let previous = caller.parentElement.querySelector('[class="feed-switch active"]')
        switch(caller.querySelector('img').className){
            case 'best-img':
                setSortBy('best')
                break
            case 'hot-img':
                setSortBy('hot')
                break
            case 'recent-img':
                setSortBy('recent')
                break
            case 'top-img':
                setSortBy('top')
                break
        }
        caller.classList.add('active')
        previous.classList.remove('active')
    }
  return (
    <div className='main-section'>
    <div className='feed-container'>
        <div className='feed-switch-container'>
            <button className='feed-switch active'>
                <img className='best-img' src={sortBy === 'best' ? bestActive : bestInactive}></img>
                <h3>Best</h3>
            </button>
            <button className='feed-switch'>
                <img className='hot-img' src={sortBy === 'hot' ? hotActive : hotInactive}></img>
                <h3>Hot</h3>
            </button>
            <button className='feed-switch'>
                <img className='recent-img' src={sortBy === 'recent' ? recentActive : recentInactive}></img>
                <h3>New</h3>
            </button>
            <button className='feed-switch'>
                <img className='top-img' src={sortBy === 'top' ? topActive : topInactive}></img>
                <h3>Top</h3>
            </button>
        </div>
        <div className='feed-post-style-switch' onClick={handleDropDown} ref={postStyleSwitch}>
            <div className={postStyleState}></div>
            <i></i>
            <div className='post-style-dropdown hidden' ref={postStyleDropdown}>
                <button className='post-style-dropdown-item selected' onClick={(ev) => changePostStyle(ev, 'card')}>
                    <i></i>
                    <p>Card</p>
                </button>
                <button className='post-style-dropdown-item' onClick={(ev) => changePostStyle(ev, 'classic')}>
                    <i></i>
                    <p>Classic</p>
                </button>
                <button className='post-style-dropdown-item' onClick={(ev) => changePostStyle(ev, 'compact')}>
                    <i></i>
                    <p>Compact</p>
                </button>
            </div>
        </div>
    </div>
    <Posts postStyle={postStyleState} posts={posts}></Posts>
    </div>
  )
}

export default Feed
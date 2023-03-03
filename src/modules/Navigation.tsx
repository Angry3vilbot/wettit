import React, { ReactElement, useRef } from 'react'
import '../styles/navigation.css'
import home from '../assets/home.svg'
import dropdownArrow from '../assets/dropdown-arrow.svg'
import dropdownArrowLight from '../assets/dropdown-arrow-light.svg'
import searchIcon from '../assets/magnify.svg'
import verticalSplit from '../assets/vertical-split.svg'
import profilepicture from '../assets/pfp.png'
import carbonated from '../assets/subwettit-icons/carbonated.png'
import oceans from '../assets/subwettit-icons/oceans.png'
import river from '../assets/subwettit-icons/river.png'
import sea from '../assets/subwettit-icons/sea.webp'
import water from '../assets/subwettit-icons/water.jpg'
import { useState } from 'react'

function Navigation({ darkMode, setDarkMode}) {
  
  const [dropDownItems, setDropDownItems] = useState<Array<any>>([])
  const [filter, setFilter] = useState('')

  const searchbar = useRef<HTMLInputElement>(null)
  const dropDownContainer = useRef<HTMLDivElement>(null)
  const dropDownMenu = useRef<HTMLDivElement>(null)
  const profileDropdown = useRef<HTMLDivElement>(null)
  const profile = useRef<HTMLDivElement>(null)

  const filteredItems = dropDownItems.filter(item => {
    return item.key?.toLowerCase().includes(filter.toLowerCase())
  })

  function submitSearch(ev){
    ev.preventDefault()
    console.log(searchbar.current?.value)
  }

  //? Needs to be reworked according to data received from API 
  function dropDown(){
    let subwettitNameArray = ['w/water', 'w/carbonateddrinks', 'w/oceans', 'w/seas', 'w/rivers']
    let subwettitIconsArray = [water, carbonated, oceans, sea, river]
    let subElementsArray: Array<ReactElement> = []
    subwettitNameArray.forEach((subwettit)=>{
      if(subwettit.includes(filter)){
        let style = {
          background: `center / contain no-repeat url(${subwettitIconsArray[subwettitNameArray.indexOf(subwettit)]})`
        }
        subElementsArray.push(
        <div className='dropped-subwettit' key={subwettit}>
          <div style={style}></div>
          <p>{subwettit}</p>
        </div>
        )
      }
    })
    setDropDownItems(subElementsArray)
    if(document.querySelector('[class="dropdown-container hidden"]') != null){
      dropDownContainer.current?.classList.remove('hidden')
      dropDownMenu.current?.setAttribute('style', `outline: 1px rgba(128, 128, 128, 0.4) solid; 
      border-bottom-left-radius: 0px; border-bottom-right-radius: 0px;`)
    }
  }

  function checkDropEvent(item){
    let a = document.querySelectorAll('[class="dropped-subwettit"]')
    let result
    a.forEach((node)=>{
      if(node.className == item.className || item.className === 'sub-filter'){
        result = true
      }
    })
    if(result != true){
      return false
    }
    else return true
  }

  function handleDropDown(ev){
    if(!checkDropEvent(ev.target.parentElement)){
      if(!document.querySelector('[class="dropdown-container hidden"]')){
        // Undo the dropdown
        setDropDownItems([])
        dropDownContainer.current?.classList.add('hidden')
        dropDownMenu.current?.removeAttribute('style')
      }
      else{
        dropDown()
      }
    }
  }

  function handleProfileDropDown(ev){
    if(ev.target === ev.currentTarget || ev.target.parentElement.parentElement !== document.querySelector('[class="profile-dropdown-container"]')){
      if(!document.querySelector('[class="profile-dropdown-container hidden"]')){
        profileDropdown.current?.classList.add('hidden')
        profile.current?.classList.remove('dropped')
      }
      else{
        profileDropdown.current?.classList.remove('hidden')
        profile.current?.classList.add('dropped')
      }
    }
  }

  function filterHandler(ev){
    setFilter(ev.target.value)
  }

  function changeMode(ev){
    if(darkMode){
      ev.currentTarget.querySelector('p').innerHTML = 'Light Mode'
      ev.currentTarget.querySelector('[class="dark-mode-switch-active"]').className = 'dark-mode-switch-inactive'
      setDarkMode(false)
      document.querySelector(':root')?.classList.add('light-mode')
      dropDownMenu.current!.querySelectorAll('img')[1].src = dropdownArrowLight
    }
    else{
      ev.currentTarget.querySelector('p').innerHTML = 'Dark Mode'
      ev.currentTarget.querySelector('[class="dark-mode-switch-inactive"]').className = 'dark-mode-switch-active'
      setDarkMode(true)
      document.querySelector(':root')?.classList.remove('light-mode')
      dropDownMenu.current!.querySelectorAll('img')[1].src = dropdownArrow
    }
  }
  
  return (
    <nav>
      <a href='/wettit/' style={{display: 'flex', alignItems: 'center'}}>
      <div className='logo'></div>
      <div className='text-logo'></div>
      </a>
      <div className='dropdown-menu' onClick={handleDropDown} ref={dropDownMenu}>
        <img src={home}></img>
        <p>Home</p>
        <img src={dropdownArrow}></img>
        <div className='dropdown-container hidden' ref={dropDownContainer}>
          <div className='sub-filter'><input type='text' value={filter} onChange={filterHandler} placeholder='Filter'></input></div>
          <p>Your Communities</p>
          {filteredItems}
        </div>
      </div>
      <form className='searchbar' onSubmit={submitSearch}>
        <label htmlFor='search'><img src={searchIcon}></img></label>
        <input type={'text'} placeholder='Search Wettit' name='search' id='search' ref={searchbar}></input>
      </form>
      <div className='nav-button-container'>
        <div className='popular-button nav-button'></div>
        <img className='vertical-split' src={verticalSplit}></img>
        <div className='chat-button nav-button'></div>
        <div className='notification-button nav-button'></div>
        <div className='new-button nav-button'></div>
      </div>
      <div className='nav-profile' onClick={handleProfileDropDown} ref={profile}>
        <div className='profile-picture'>
          <img src={profilepicture}></img>
        </div>
        <div className='profile-text'>
          <span className='username'>Angry3vilbot</span>
          <span className='drop-count'>
            <i className='drops-icon'></i>
            <span>21.9k drops</span>
          </span>
        </div>
        <i className='profile-dropdown'></i>
        <div className='profile-dropdown-container hidden' ref={profileDropdown}>
          <div onClick={changeMode}>
            <div className='dark-mode-switch-active'></div>
            <p>Dark Mode</p>
          </div>
          <div>
            <div className='create-community-btn'></div>
            <p>Create Community</p>
          </div>
          <div>
            <div className='log-out-btn'></div>
            <p>Log out</p>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navigation
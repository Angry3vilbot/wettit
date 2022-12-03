import React from 'react'
import '../react-app-env.d.ts'
import testImage from '../assets/sticker.png'
import testGif from '../assets/test-gif.gif'
import '../styles/posts.css'
import water from '../assets/subwettit-icons/water.jpg'
import carbonated from '../assets/subwettit-icons/carbonated.png'
import oceans from '../assets/subwettit-icons/oceans.png'
import seas from '../assets/subwettit-icons/sea.webp'
import rivers from '../assets/subwettit-icons/river.png'

type Props = {
  postStyle: string;
}

function Posts({ postStyle }: Props) {
  function revealFullPost(ev){
    //  content     fullscreen-btn footer        post-container
    let content = ev.currentTarget.parentElement.parentElement.parentElement.querySelector('[class="post-content"]')
    if(content.style.display != 'block'){
      content.style.display = 'block'
    }
    else{
      content.style = null
    }
  }
  function vote(ev, type : string){
    if(type === 'up'){
      if(!ev.target.parentElement.querySelector('[class="upvote upvote-active"]')){
        let score = ev.target.parentElement.querySelector('[class="post-score"]')
        if(!score.innerHTML.includes('k')){
          score.innerHTML = parseInt(score.innerHTML) + 1
        }
        ev.target.parentElement.querySelector('[class="upvote"]').classList.add('upvote-active')
        if(ev.target.parentElement.querySelector('[class="downvote downvote-active"]')){
          if(!score.innerHTML.includes('k')){
            score.innerHTML = parseInt(score.innerHTML) + 1
          }
          ev.target.parentElement.querySelector('[class="downvote downvote-active"]').classList.remove('downvote-active')
        }
      }
      else{
        let score = ev.target.parentElement.querySelector('[class="post-score"]')
        if(!score.innerHTML.includes('k')){
          score.innerHTML = parseInt(score.innerHTML) - 1
        }
        ev.target.parentElement.querySelector('[class="upvote upvote-active"]').classList.remove('upvote-active')
      }
    }
    else if(type === 'down'){
      if(!ev.target.parentElement.querySelector('[class="downvote downvote-active"]')){
        let score = ev.target.parentElement.querySelector('[class="post-score"]')
        if(!score.innerHTML.includes('k')){
          score.innerHTML = parseInt(score.innerHTML) - 1
        }
        ev.target.parentElement.querySelector('[class="downvote"]').classList.add('downvote-active')
        if(ev.target.parentElement.querySelector('[class="upvote upvote-active"]')){
          if(!score.innerHTML.includes('k')){
            score.innerHTML = parseInt(score.innerHTML) - 1
          }
          ev.target.parentElement.querySelector('[class="upvote upvote-active"]').classList.remove('upvote-active')
        }
      }
      else{
        let score = ev.target.parentElement.querySelector('[class="post-score"]')
        if(!score.innerHTML.includes('k')){
          score.innerHTML = parseInt(score.innerHTML) + 1
        }
        ev.target.parentElement.querySelector('[class="downvote downvote-active"]').classList.remove('downvote-active')
      }
    }
    else throw 'Vote type error'
  }
  function generatePosts(){
    let postNameArray : Array<string> = ['Post name the first one', 'I love Trains!', 'TESTESTESTESt', 'video tag attempt 2',
    'He adds something different to the team.', "Orange juice is much better with the pulp in it. I am a vegan.", 
    "If I had more money, I could move to a bigger house.", "Oysters are slimy.", 
    "Today, I met a vampire who liked to eat beets.", "You know what I mean.", "Very good job, sweetheart!", 
    "Am I in the White House?", "This is the biggest party I've ever been to."]
    let usernameArray : Array<string> = ['Angry3vilbot', 'mikebalaker', 'Midvey', 'masterbaiter', 
    'Fusecrush', 'Slaughterhaus88', 'sexNOW', 'bruhmomentlover67', 'Tweedlex', 'Robotnik', 'RowanTree', 'marling111', '2Pelfox4u']
    let subwettitArray : Array<string> = ['water', 'carbonateddrinks', 'oceans', 'rivers', 'oceans', 'seas', 
    'rivers', 'carbonateddrinks', 'seas', 'rivers', 'water', 'carbonateddrinks', 'oceans']
    let subwettitLogoArray : Array<string> = [water, carbonated, oceans, rivers, oceans, seas, rivers, carbonated,
    seas, rivers, water, carbonated, oceans]
    let timeArray : Array<Date> = [new Date(), new Date('July 20, 69 20:17:40 GMT+00:00'), new Date('10 september 2005'), new Date('11 november 1444'), new Date('18 october 2021'),
    new Date('29 november 2022'), new Date('30 november 2022'), new Date('1 december 2022'), new Date('28 november 2020'), new Date('28 november 2022'), new Date('28 november 2019'), new Date('28 november 2018'),
    new Date('28 november 2017')]
    let flairColorArray : Array<string> = ['green', 'blue', 'magenta', '#00BEFE']
    let flairTextArray : Array<string> = ['longFlairNameHere1244567423', 'image', 'meme', 'video']
    let contentArray : Array<string | JSX.Element> = [`Lorem ipsum dolor sit amet consectetur adipisicing elit. 
    Dolorem magni ex laboriosam. Porro quibusdam facilis architecto quaerat, alias officia sequi dolore delectus 
    error nisi! Modi temporibus recusandae nobis dicta obcaecati.`, <img src={testImage}></img>, <iframe src={testGif}></iframe>, 
  <video controls><source src='https://archive.org/download/BigBuckBunny_124/Content/big_buck_bunny_720p_surround.mp4'></source></video>,
    <img src={testImage}></img>, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam eu condimentum odio. Nam nibh risus, lobortis et hendrerit at, cursus at mauris. Sed suscipit vel purus id lobortis.', 
  'Maecenas diam magna, tincidunt vel sagittis convallis, pellentesque sed nisi. Praesent fringilla viverra pretium. Donec porttitor ex nec velit ultrices, non sollicitudin massa gravida. Sed commodo vulputate nibh, sit amet venenatis elit dignissim quis.',
'Praesent congue enim blandit iaculis fermentum. Phasellus lacinia tempus orci, at semper erat tincidunt in. Nam ut turpis a tortor facilisis lobortis ut sed urna.', 'Morbi luctus cursus arcu, ac semper nulla. Vivamus sit amet magna vitae mauris ullamcorper dapibus eu ut metus. Mauris fermentum ligula nec congue varius. Suspendisse id ipsum vel ligula elementum vehicula vel nec odio. In tincidunt sollicitudin elit quis elementum. Vestibulum ullamcorper metus id odio vehicula congue. Integer vel dolor hendrerit, tincidunt mi et, suscipit nisl.',
'Duis ullamcorper lacus ut euismod suscipit. Nunc dictum lorem tincidunt massa mattis tincidunt. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Etiam turpis tellus, euismod vitae faucibus non, aliquam sit amet felis. Maecenas efficitur ex neque, at commodo tortor placerat sit amet. Nam convallis est non gravida gravida. Praesent quis dolor feugiat, ornare dui at, fringilla risus.', 
'Etiam congue, nisl at tempor volutpat, quam eros posuere orci, a facilisis ipsum ante at tellus. Proin aliquet lacus sit amet lectus malesuada, ut maximus risus ultrices. Morbi luctus cursus arcu, ac semper nulla. Vivamus sit amet magna vitae mauris ullamcorper dapibus eu ut metus. Mauris fermentum ligula nec congue varius. Suspendisse id ipsum vel ligula elementum vehicula vel nec odio. In tincidunt sollicitudin elit quis elementum. Vestibulum ullamcorper metus id odio vehicula congue. Integer vel dolor hendrerit, tincidunt mi et, suscipit nisl.',
'Generated 5 paragraphs, 396 words, 2676 bytes of Lorem Ipsum', '"Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit..."']
    let scoreArray : Array<number> = [213, 515, 23677, 4035, 0, 213, 515, 23677, 4035, 0, 213, 515, 23677]
    let commentCountArray : Array<number> = [11, 1, 0, 223, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    let resultArray : Array<JSX.Element> = []
    function convertScore(num : number){
      let newnum = num.toString()
      if(num <= 999){
        return newnum
      }
      else if(num >= 1000 && num <= 9999){
        return `${newnum[0]}.${newnum[1]}k`
      }
      else if(num >= 10000 && num <= 99999){
        return `${newnum[0]}${newnum[1]}.${newnum[2]}k`
      }
      else{
        return `${newnum[0]}${newnum[1]}${newnum[2]}k`
      }
    }
    function convertTime(time:Date) {
      let check = new Date().getTime() - new Date(time).getTime()
      if(check < 60000){
        return '0 minutes'
      }
      else if(check >= 60000 && check < 3600000){
        return `${Math.floor(check / 60000)} minutes`
      }
      else if(check >= 3600000 && check < 86400000){
        return `${Math.floor(check / 3600000)} hours`
      }
      else if(check >= 86400000 && check < 31536000000){
        return `${Math.floor(check / 86400000)} days`
      }
      return `${Math.floor(check / 31536000000)} years`
    }
    postNameArray.forEach((title) => {
      let style = {
        background: `center / contain no-repeat url(${subwettitLogoArray[postNameArray.indexOf(title)]})`
      }
      let flair = {
        backgroundColor: `${flairColorArray[postNameArray.indexOf(title)]}`
      }
      switch(typeof(contentArray[postNameArray.indexOf(title)])){
        case 'string':
          resultArray.push(<div className='post text-post' key={title}>
            <section className='upvote-column'>
              <div className='upvote' onClick={(ev) => vote(ev, 'up')}></div>
              <p className='post-score'>{convertScore(scoreArray[postNameArray.indexOf(title)])}</p>
              <div className='downvote' onClick={(ev) => vote(ev, 'down')}></div>
            </section>
            <section className='post-content-container'>
              <div className='post-content-info-bar'>
                <div className='post-subwettit-info'>
                  <div className='post-subwettit-image' style={style}></div>
                  <a href='bruh.com'><h5>w/{subwettitArray[postNameArray.indexOf(title)]}</h5></a>
                </div>
                <div className='post-user-info'>
                  <p>Posted by <span>u/{usernameArray[postNameArray.indexOf(title)]}</span> {convertTime(timeArray[postNameArray.indexOf(title)])} ago</p>
                </div>
              </div>
              <div className='post-classic-miniature text-miniature'></div>
              <div className='post-title'>
                <h2>{title}</h2>
                <div style={flair}><p>{flairTextArray[postNameArray.indexOf(title)]}</p></div>
              </div>
              <div className='post-content'>{contentArray[postNameArray.indexOf(title)]}</div>
              <div className='post-footer'>
                <div className='post-fullscreen-button-container' onClick={revealFullPost}>
                  <div></div>
                  <div></div>
                </div>
                <div>
                  <div></div>
                  <p>{(()=>{if(commentCountArray[postNameArray.indexOf(title)] === 1){return '1 comment'} else return `${commentCountArray[postNameArray.indexOf(title)]} comments`})()}</p>
                </div>
                <div>
                  <div></div>
                  <p>Share</p>
                </div>
                <div>
                  <div></div>
                  <p>Save</p>
                </div>
              </div>
            </section>
          </div>)
          break
        case 'object':
          let miniatureImageStyle = {
            background: `center / contain no-repeat url(${contentArray[postNameArray.indexOf(title)]})`
          }
          resultArray.push(<div className='post file-post' key={title}>
            <section className='upvote-column'>
              <div className='upvote' onClick={(ev) => vote(ev, 'up')}></div>
                <p className='post-score'>{convertScore(scoreArray[postNameArray.indexOf(title)])}</p>
              <div className='downvote' onClick={(ev) => vote(ev, 'down')}></div>
            </section>
            <section className='post-content-container'>
              <div className='post-content-info-bar'>
                <div className='post-subwettit-info'>
                  <div className='post-subwettit-image' style={style}></div>
                  <a href='bruh.com'><h5>w/{subwettitArray[postNameArray.indexOf(title)]}</h5></a>
                </div>
                <div className='post-user-info'>
                  <p>Posted by <span>u/{usernameArray[postNameArray.indexOf(title)]}</span> {convertTime(timeArray[postNameArray.indexOf(title)])} ago</p>
                </div>
               </div>
              <div className='post-classic-miniature'>{contentArray[postNameArray.indexOf(title)]}</div>
              <div className='post-title'>
                <h2>{title}</h2>
                <div style={flair}><p>{flairTextArray[postNameArray.indexOf(title)]}</p></div>
              </div>
              <div className='post-content'>{contentArray[postNameArray.indexOf(title)]}</div>
              <div className='post-footer'>
                <div className='post-fullscreen-button-container' onClick={revealFullPost}>
                  <div></div>
                  <div></div>
                </div>
                <div>
                  <div></div>
                  <p>{(()=>{if(commentCountArray[postNameArray.indexOf(title)] === 1){return '1 comment'} else return `${commentCountArray[postNameArray.indexOf(title)]} comments`})()}</p>
                </div>
                <div>
                  <div></div>
                  <p>Share</p>
                </div>
                <div>
                  <div></div>
                  <p>Save</p>
                </div>
              </div>
            </section>
           </div>)
      }
    })
    return resultArray
  }
  return (
    <div className={`posts-container ${postStyle}`}>
      {generatePosts()}
    </div>
  )
}

export default Posts
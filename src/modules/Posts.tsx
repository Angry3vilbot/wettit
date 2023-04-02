import React from 'react'
import moment from 'moment'
import '../react-app-env.d.ts'
import '../styles/home/posts.css'
import '../styles/home/posts-compact.css'
import '../styles/home/posts-classic.css'

type Props = {
  postStyle: string,
  posts: Array<Post>
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

interface Subwettit extends Object {
  title: String,
  logo: Buffer,
}

function Posts({ postStyle, posts }: Props) {
  function revealFullPost(ev){
    //? Future me here, for now I have no idea if there is a better way of doing it, will think about it later.
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
      //? Instead of this whole mess, I will be using API calls to an external Express API.
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

    if(posts){
      posts.forEach((post) => {
        let style = {
          background: `center / contain no-repeat url(${post.formatted_subwettit.logo})`
        }
        let flair = {
          backgroundColor: `${post.flairColor}`
        }
        if(post.content) {
          resultArray.push(<div className='post text-post' key={Math.random()}>
            <section className='upvote-column'>
              <div className='upvote' onClick={(ev) => vote(ev, 'up')}></div>
              <p className='post-score'>{convertScore(post.score)}</p>
              <div className='downvote' onClick={(ev) => vote(ev, 'down')}></div>
            </section>
            <section className='post-content-container'>
              <div className='post-content-info-bar'>
                <div className='post-subwettit-info'>
                  <div className='post-subwettit-image' style={style}></div>
                  <a href='bruh.com'><h5>{post.formatted_subwettit.title}</h5></a>
                </div>
                <div className='post-user-info'>
                  <p>Posted by <span>u/{post.author}</span> {moment(post.date).fromNow()} ago</p>
                </div>
              </div>
              <div className='post-classic-miniature text-miniature'></div>
              <div className='post-title'>
                <h2>{post.title}</h2>
                <div style={flair}><p>{post.flair}</p></div>
              </div>
              <div className='post-content'>{post.content}</div>
              <div className='post-footer'>
                <div className='post-fullscreen-button-container' onClick={revealFullPost}>
                  <i></i>
                  <i></i>
                </div>
                  <div>
                    <i></i>
                    <p>{(()=>{if(post.comments.length === 1){return '1 comment'} else return `${post.comments.length} comments`})()}</p>
                  </div>
                  <div>
                    <i></i>
                    <p>Share</p>
                  </div>
                  <div>
                    <i></i>
                    <p>Save</p>
                  </div>
                </div>
              </section>
            </div>)
          } else {
            resultArray.push(
            <div className='post file-post' key={Math.random()}>
              <section className='upvote-column'>
                <div className='upvote' onClick={(ev) => vote(ev, 'up')}></div>
                  <p className='post-score'>{convertScore(post.score)}</p>
                <div className='downvote' onClick={(ev) => vote(ev, 'down')}></div>
              </section>
              
              <section className='post-content-container'>
                <div className='post-content-info-bar'>
                  <div className='post-subwettit-info'>
                    <div className='post-subwettit-image' style={style}></div>
                    <a href='bruh.com'><h5>{post.formatted_subwettit.title}</h5></a>
                  </div>
                  <div className='post-user-info'>
                    <p>Posted by <span>u/{post.author}</span> {moment(post.date).fromNow()} ago</p>
                  </div>
                </div>
                {/*//TODO Needs to be changed to the proper image data */}
                <div className='post-classic-miniature'><img src={`data/${post.image}`}></img></div>
                <div className='post-title'>
                  <h2>{post.title}</h2>
                  <div style={flair}><p>{post.flair}</p></div>
                </div>
                {/*//TODO Needs to be changed to the proper image data */}
                <div className='post-content'><img src={`data/${post.image}`}/></div>

                <div className='post-footer'>
                  {/*//? These empty divs are used for icons, they should be changed out for <i> tags */}
                  <div className='post-fullscreen-button-container' onClick={revealFullPost}>
                    <i></i>
                    <i></i>
                  </div>
                  <div>
                    <div></div>
                    <p>{(()=>{if(post.comments.length === 1){return '1 comment'} else return `${post.comments.length} comments`})()}</p>
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
    }
    return resultArray
  }

  return (
    <div className={`posts-container ${postStyle}`}>
      {generatePosts()}
    </div>
  )
}

export default Posts
import React, { Component } from 'react';
import './MemeDetails.css';
import axios from 'axios';
import { FacebookShareButton, FacebookIcon, TwitterShareButton, TwitterIcon } from 'react-share';
import { TimelineMax } from 'gsap';
import { Link } from 'react-router-dom';
import {connect} from 'react-redux';
import IziToast from 'izitoast';
const ENV = require('../../frontenv');
class MemeDetails extends Component {
  constructor(props, context) {
    super(props);
    this.state = {
      commentPage:1,
      memeDetails:'',
      liked:false,
      clickable:true,
    };
  }
  componentDidMount() {
    this.props.dispatch({
      type: 'MOUNT_COMP',
      val: 'details'
    })
    let tl = new TimelineMax();
        tl.to(window, .5, {scrollTo:0});
    axios.get(ENV.REACT_APP_BACKEND+'/api/getMemeDetails/'+this.props.match.params.id + '?commentPage='+this.state.commentPage).then((response)=>{
      this.setState({
        memeDetails:response.data
      })
    });
    setTimeout(() => {
      this.likedStatus();
    }, 800);
  }
  likedStatus() {
    if (this.props.user) {
      axios.get(ENV.REACT_APP_BACKEND+'/api/likes/'+this.props.match.params.id+'/'+this.props.user.id).then((response)=>{
        if (response.data) {
          this.setState({
            liked:true,
          })
        }
      })
    }
  }
  componentWillReceiveProps(props) {
  }

  componentWillUpdate(prevProps, prevState) {
    if (prevState.method && this.props.match.params.id != prevState.method) {
      axios.get(ENV.REACT_APP_BACKEND+'/api/getMemeDetails/'+prevState.method + '?commentPage='+this.state.commentPage).then((response)=>{
        this.setState({
          memeDetails:response.data,
          liked:false,
        })
        setTimeout(() => {
          this.likedStatus();
        }, 800);
        let tl = new TimelineMax();
            tl.to(window, 0, {scrollTo:0});
      });
    }
  }
  componentDidUpdate() {
    if (this.state.method !== this.props.match.params.id) {
      axios.get(ENV.REACT_APP_BACKEND+'/api/getMemeDetails/'+this.props.match.params.id + '?commentPage='+this.state.commentPage).then((response)=>{
        this.setState({
          memeDetails:response.data,
          liked:false,
          method: this.props.match.params.id
        })
        setTimeout(() => {
          this.likedStatus();
        }, 800);
        let tl = new TimelineMax();
            tl.to(window, 0, {scrollTo:0});
      });
    }
  }
  featureMeme(meme) {
    console.log(meme);
    axios.post(ENV.REACT_APP_BACKEND+'/api/featureMeme?id='+meme.id).then((response)=>{
      console.log(response);
    })
  }
  hoverTag(num) {
    let tl = new TimelineMax();
    tl.to(`.meme-tag-${num}`, .1, {color:'hsla(0,0%,100%,.6)', borderColor:'hsla(0,0%,100%,.4)'});
  }
  leaveTag(num) {
    let tl = new TimelineMax();
    tl.to(`.meme-tag-${num}`, .1, {color:'hsla(0,0%,100%,.3)', borderColor:'hsla(0,0%,100%,.1)'});
  }
  hoverUsername(target) {
    let tl = new TimelineMax();
    tl.to(target, .1, {color: 'hsla(0,0%,100%,1)'});
  }
  leaveUsername(target) {
    let tl = new TimelineMax();
    tl.to(target, .1, {color: 'hsla(0,0%,100%,.6)'});
  }
  hoverSocialMedia(target) {
    let tl = new TimelineMax();
    tl.to(`.meme-details-${target}-hover`, .1, {opacity:1})
  }
  leaveSocialMedia(target) {
    let tl = new TimelineMax();
    tl.to(`.meme-details-${target}-hover`, .1, {opacity:.7})
  }
  hoverButton(target) {
    let tl = new TimelineMax();
    tl.to(`.meme-details-details-${target}`, .1, {backgroundColor:'black', borderColor:'black'})
  }
  leaveButton(target) {
    let tl = new TimelineMax();
    tl.to(`.meme-details-details-${target}`, .1, {backgroundColor:'#080d11', borderColor:'#242424'})
  }
  hoverStats(target) {
    if (target==='likes' && !this.state.liked) {
      let tl = new TimelineMax();
      tl.to(`.meme-details-details-${target}`, .1, {opacity:1});
    } else {
      let tl = new TimelineMax();
      tl.to(`.meme-details-details-${target}`, .1, {opacity:1});
    }
  }
  leaveStats(target) {
    if (target==='likes' && !this.state.liked) {
      let tl = new TimelineMax();
      tl.to(`.meme-details-details-${target}`, .1, {opacity:.5});
    } else if (target==='likes' && this.state.liked){
    } else {
      let tl = new TimelineMax();
      tl.to(`.meme-details-details-${target}`, .1, {opacity:.5});
    }
  }
  likeMeme() {
    let state = this.state
    if (this.props.user && !state.liked && state.clickable) {
      this.setState({
        liked:true,
        clickable:false,
        memeDetails:Object.assign({}, state.memeDetails, {details:Object.assign({}, state.memeDetails.details, {likes:state.memeDetails.details.likes+1})})
      })
      axios.post(ENV.REACT_APP_BACKEND+'/api/like/'+this.props.match.params.id, {user:this.props.user}).then((response)=>{
        this.setState({
          memeDetails: Object.assign({}, state.memeDetails, {details:response.data[0]}),
          clickable:true
        })
      }).catch((err)=>{
        console.log(err)
        this.setState({
          liked:false,
          clickable:true,
          memeDetails:Object.assign({}, state.memeDetails, {details:Object.assign({}, state.memeDetails.details, {likes:state.memeDetails.details.likes})})
        })
      })
    } else if (this.props.user && this.state.liked && this.state.clickable) {
      this.setState({
        liked:false,
        clickable:false,
        memeDetails:Object.assign({}, state.memeDetails, {details:Object.assign({}, state.memeDetails.details, {likes:state.memeDetails.details.likes-1})})
      })
      axios.post(ENV.REACT_APP_BACKEND+'/api/unlike/'+this.props.match.params.id, {user:this.props.user}).then((response)=>{
        this.setState({
          memeDetails: Object.assign({}, state.memeDetails, {details:response.data[0]}),
          clickable:true
        })
      }).catch((err)=>{
        console.log(err)
        this.setState({
          liked:false,
          clickable:true,
          memeDetails:Object.assign({}, state.memeDetails, {details:Object.assign({}, state.memeDetails.details, {likes:state.memeDetails.details.likes})})
        })
      })
    } else {
      IziToast.show({
        title:'Not Logged In!',
        message:'Please log in before liking memes.',
        timeout:2000,
        color:'red',
        class:'izishow-login',
        theme:'light'
      })
    }
  }
  render() {
    let match = this.props.match,
        props = this.props,
        state = this.state,
        context = this.context,
        image,
        caption,
        details,
        comments;
        if (state.memeDetails && state.memeDetails.details) {
          if (state.memeDetails.details.picture) {
            image = (
              <img src={state.memeDetails.details.picture} style={{width:'100%', height:'auto', borderTopRightRadius:'10px', borderTopLeftRadius:'10px'}} className='meme-details-image-section-image'/>
            )
          }
          if (state.memeDetails.details.caption) {
            caption = (
              <div className='meme-details-caption'>
                {state.memeDetails.details.caption}
              </div>
            )
          }
          if (state.memeDetails.details && state.memeDetails.details.username) {
            details = (
              <section className='meme-details-details-section'>
                <div className='meme-details-details-left-side'>
                  <div className='meme-details-details-top-container'>
                  {state.memeDetails.tags.length>0? (
                    <div className='meme-details-details-tags'>
                      {state.memeDetails.tags.map((el, i)=>{
                        return (
                          <Link to={`/app/tags/${el.tag_text}`} key={i} onMouseLeave={()=>{this.leaveTag(i)}} onMouseEnter={()=>{this.hoverTag(i)}} className={`meme-details-details-tag-el meme-tag-${i}`}> 
                            #{el.tag_text}
                          </Link>
                        )
                      })}
                    </div>
                  ): null}
                    <div className='meme-details-details-right-side'>
                      <div onClick={()=>{this.likeMeme()}} style={state.liked?{opacity:1}:{opacity:.5}} className='meme-details-details-likes' onMouseLeave={()=>{this.leaveStats('likes')}} onMouseEnter={()=>{this.hoverStats('likes')}}>
                        {state.liked? (<div className='meme-details-likes-image'/>):(<img src='https://ifunny.co/images/icons/smile-small.svg' style={{height:'22px', width:'22px', minHeight:'22px', minWidth:'22px'}}/>)}
                        <p style={state.liked?{color:'#fc0'}:{color:'white'}} className='meme-details-details-likes-count'>{state.memeDetails.details.likes}</p>
                      </div>
                      <div className='meme-details-details-comments' onMouseLeave={()=>{this.leaveStats('comments')}} onMouseEnter={()=>{this.hoverStats('comments')}}>
                        <img className='meme-details-details-comments-image' src='https://ifunny.co/images/icons/comments.svg' style={{height:'22px', width:'22px'}}/>
                        <p className='meme-details-details-comment-count'>{state.memeDetails.details.comments}</p>
                      </div>
                    </div>
                  </div>
                  <div className='meme-details-details-username'>
                    by <p onMouseLeave={(e)=>{this.leaveUsername(e.target)}} onMouseEnter={(e)=>{this.hoverUsername(e.target)}} className='meme-details-details-username-text'>{state.memeDetails.details.username}</p>
                  </div>
                  <div className='meme-details-details-bottom-container'>  
                    <div className='meme-details-details-social-media'>
                      <div style={{opacity:.7, zIndex:2}} onMouseEnter={(e)=>{this.hoverSocialMedia('fb')}} onMouseLeave={(e)=>{this.leaveSocialMedia('fb')}} className='meme-details-fb-hover'>
                        <FacebookShareButton 
                          style={{height:'36px', width:'36px', borderRadius:'50%', outline:'none', cursor:'pointer'}}
                          url={'https://classyfd.github.io/deliwin2.0'} 
                          quote={state.memeDetails.details.caption} 
                          windowWidth={800}
                          windowHeight={530}
                          hashtag={'#iFunny'}>      
                          <FacebookIcon size={36} round/>
                        </FacebookShareButton>
                      </div>
                      <div style={{opacity:.7}} onMouseEnter={(e)=>{this.hoverSocialMedia('tt')}} onMouseLeave={(e)=>{this.leaveSocialMedia('tt')}} className='meme-details-tt-hover'>
                        <TwitterShareButton 
                          style={{height:'36px', width:'36px', borderRadius:'50%', outline:'none', cursor:'pointer'}}
                          title={state.memeDetails.details.caption}
                          hashtags={state.memeDetails.tags.map((el)=>{return el.tag_text})}
                          windowWidth={800}
                          windowHeight={530}
                          url={'http://classyfd.github.io/deliwin2.0'}
                          >   
                          <TwitterIcon size={36} round/>
                        </TwitterShareButton>
                      </div>
                      {this.props.user.user_type==='admin'?
                          (<div className={`meme-details-details-more`} onMouseLeave={(e)=>{this.leaveButton('more')}} onMouseEnter={(e)=>{this.hoverButton('more')}}>
                            <div onClick={()=>{this.featureMeme(state.memeDetails.details)}} className='meme-details-details-featured-image'/>
                          </div>):null}
                    </div>
                    <div className='meme-details-details-arrows'>
                      <div onClick={()=>{this.setState({method:state.memeDetails.prev_id}),this.props.history.push(`/app/memes/${state.memeDetails.prev_id}`)}} className='meme-details-details-back-arrow' onMouseLeave={(e)=>{this.leaveButton('back-arrow')}} onMouseEnter={(e)=>{this.hoverButton('back-arrow')}}>
                        <img className='meme-details-details-back-arrow-image' src='https://ifunny.co/images/icons/arrow-back.svg' style={{height:'14px', width:'8px'}}/>
                      </div>
                      <div onClick={()=>{this.setState({method:state.memeDetails.next_id}),this.props.history.push(`/app/memes/${state.memeDetails.next_id}`)}} className='meme-details-details-forward-arrow' onMouseLeave={(e)=>{this.leaveButton('forward-arrow')}} onMouseEnter={(e)=>{this.hoverButton('forward-arrow')}}>
                        <img className='meme-details-details-forward-arrow-image' src='https://ifunny.co/images/icons/arrow-forward.svg' style={{height:'14px', width:'8px'}}/>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            )
          }
        }
        
    return (
      <main className='MemeDetails'>
        <section className='meme-details-image-section'>
          {image}
        </section>
        <section className='meme-details-caption-section'>
          {caption}
        </section>
        <section className='meme-details-meme-details-section'>
          {details}
        </section>
        <section className='meme-details-meme-comments-section'>
          
        </section>
      </main>
    )
  }
}

function mapStateToProps(state) {
  return {
    user: state.sessionUser
  }
}

export default connect(mapStateToProps)(MemeDetails);
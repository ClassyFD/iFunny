import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import { FacebookShareButton, FacebookIcon, TwitterShareButton, TwitterIcon } from 'react-share';
import { TimelineMax, Power2 } from 'gsap';
import DownArrow from '../../Images/Icons/down_arrow.svg';
import LoadingDot from '../../Images/Icons/loading_dot.svg';
import IziToast from 'izitoast';
import axios from 'axios';
import ENV from '../../frontenv';
import './Profile.css';

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      limit: 10,
      memes: '',
      memeStatus:true,
      clickable:true,
      loadMore:10
    };
  }

  componentDidMount() {
    let loadingtl = new TimelineMax({
      repeat:-1
    });
    loadingtl.staggerTo('.collective-dots-el', .3, {top:10, height:20, width:20}, .1)
    .staggerTo('.collective-dots-el', .3, {top:30, height:15, width:15}, .1, '-=.1');
    let {props, state} = this;
    this.props.dispatch({
      type:'MOUNT_COMP',
      val:'profile-'+this.props.match.params.id
    })
    axios.get(ENV.REACT_APP_BACKEND+'/api/getUserProfile/'+this.props.match.params.id).then((response)=>{
      let res = response.data[0].json_build_object;
      if (res.memes && res.memes.length > 0) {
        res.memes.sort((a, b)=>{
          return b.id - a.id;
        })
      }
      this.setState({
        memes: res.memes,
        user: res.user
      })
      let tl = new TimelineMax({
        repeat: -1
      });
      tl.to('.collective-load-more-arrow-1', .5, {height: '100px', width: '100px', top: '70px', ease:Power2.easeOut})
        .to('.collective-load-more-arrow-2', .5, {top:'110px', ease:Power2.easeOut}, '-=.5')
        .to('.collective-load-more-arrow-3', .5, {top:'190px', height: '0px', width: '0px', ease:Power2.easeOut}, '-=.5')
      let ttl = new TimelineMax({
        repeat: -1,
        yoyo:true
      })
      ttl.to('.collective-load-more-title', .8, {top:'15px'})
    }).catch((err)=>{
      if (err) {
        console.log(err)
        this.setState({memeStatus:false})
      }
    })
  }

  componentWillReceiveProps(props) {
  }
  hoverStats(target, num, id) {
    if (target==='likes' && this.state.likeArr && !this.state.likeArr.includes(id)) {
      let tl = new TimelineMax();
      tl.to(`.meme-details-details-${target}-${num}`, .1, {opacity:1});
    } else {
      let tl = new TimelineMax();
      tl.to(`.meme-details-details-${target}-${num}`, .1, {opacity:1});
    }
  }
  leaveStats(target, num, id) {
    if (target==='likes' && this.state.likeArr && !this.state.likeArr.includes(id)) {
      let tl = new TimelineMax();
      tl.to(`.meme-details-details-${target}-${num}`, .1, {opacity:.5});
    } else if (target==='likes' && this.state.likeArr && this.state.likeArr.includes(id)){
    } else {
      let tl = new TimelineMax();
      tl.to(`.meme-details-details-${target}-${num}`, .1, {opacity:.5});
    }
  }
  hoverTag(num, num2) {
    let tl = new TimelineMax();
    tl.to(`.meme-tag-${num}-${num2}`, .1, {color:'hsla(0,0%,100%,.6)', borderColor:'hsla(0,0%,100%,.4)'});
  }
  leaveTag(num, num2) {
    let tl = new TimelineMax();
    tl.to(`.meme-tag-${num}-${num2}`, .1, {color:'hsla(0,0%,100%,.3)', borderColor:'hsla(0,0%,100%,.1)'});
  }
  hoverSocialMedia(target, num) {
    let tl = new TimelineMax();
    tl.to(`.meme-details-${target}-${num}-hover`, .1, {opacity:.7})
  }
  leaveSocialMedia(target, num) {
    let tl = new TimelineMax();
    tl.to(`.meme-details-${target}-${num}-hover`, .1, {opacity:1})
  }
  hoverButton(target, num) {
    let tl = new TimelineMax();
    tl.to(`.meme-details-details-${target}-${num}`, .1, {backgroundColor:'black', borderColor:'black'})
  }
  leaveButton(target, num) {
    let tl = new TimelineMax();
    tl.to(`.meme-details-details-${target}-${num}`, .1, {backgroundColor:'#080d11', borderColor:'#242424'})
  }
  enterLoadMore() {
    let tl = new TimelineMax();
    tl.to('.collective-load-more', .3, {backgroundColor:'#080d11'})
  }
  leaveLoadMore() {
    let tl = new TimelineMax();
    tl.to('.collective-load-more', .3, {backgroundColor:'#171a1e'})
  }
  likeMeme(id) {
    let state = this.state,
        props = this.props;
    if (props.user && state.likeArr && !state.likeArr.includes(id) && state.clickable) {
      this.setState({
        clickable:false,
        likeArr: state.likeArr.concat(id)
      })
      axios.post(ENV.REACT_APP_BACKEND+'/api/like/'+id, {user:props.user, type:state.limit}).then((response)=>{
        this.setState({
          likeArr:state.likeArr.concat(id),
          clickable:true,
          memes:response.data
        })
      }).catch((err)=>{
        console.log(err)
        this.setState({
          clickable:true,
          likeArr:state.likeArr.filter((el, i)=>{
            return el!==id
          })
        })
      })
    } else if (props.user && state.likeArr.includes(id) && state.clickable) {
      this.setState({
        clickable:false,
        likeArr: state.likeArr.filter((el, i)=>{
          return el!==id
        })
      })
      axios.post(ENV.REACT_APP_BACKEND+'/api/unlike/'+id, {user:props.user, type:state.limit}).then((response)=>{
        this.setState({
          likeArr:state.likeArr.filter((el, i)=>{
            return el!==id
          }),
          clickable:true,
          memes:response.data
        })
      }).catch((err)=>{
        console.log(err)
        this.setState({
          clickable:true,
          likeArr:state.likeArr.concat(id)
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
  loadMore() {
    let tl = new TimelineMax();
    axios.get(ENV.REACT_APP_BACKEND + '/api/getMemes?limit='+this.state.limit + 10).then((response)=>{
      if (this.state.loadMore === response.data.length) {
        this.setState({
          loadMore:1
        })
        tl.to('.collective-load-more', 0, {backgroundColor:'#171a1e'})
      } else {
        this.setState({
          memes:response.data,
          loadMore:response.data.length,
          limit: this.state.limit+10
        })
      }
    })
    setTimeout(() => {
      this.likedStatus();
    }, 800);
  }
  enterLoadMore() {
    let tl = new TimelineMax();
    tl.to('.collective-load-more', .3, {backgroundColor:'#080d11'})
      .to('.collective-load-more-title', .3, {textShadow:'1px 1px white'}, '-=.3')
  }
  leaveLoadMore() {
    let tl = new TimelineMax();
    tl.to('.collective-load-more', .3, {backgroundColor:'#171a1e'})
      .to('.collective-load-more-title', .3, {textShadow:'1px 1px gray'}, '-=.3')
  }
  featureMeme(meme) {
    if (meme.featured == 1) {
      IziToast.show({
        theme: 'dark',
        title: 'Are you sure you want to remove this meme from featured?',
        position: 'center',
        class:'izishow-login',
        buttons: [
            ['<button>Yes, remove.</button>', (instance, toast)=>{
              instance.hide({}, toast, 'buttonName');
              axios.post(ENV.REACT_APP_BACKEND+'/api/unfeatureMeme?id='+meme.id + '&user=' + meme.user_id + '&limit=' + this.state.limit).then((response)=>{
                this.state.memes.map((el, i)=>{
                  if (el.id === meme.id) {
                    el.featured = 0;
                  }
                })
                IziToast.show({
                  title:'This meme has been removed from featured!',
                  timeout:2000,
                  color:'green',
                  class:'izishow-login',
                  theme:'light'
                })
              }).catch((err)=>{
                IziToast.show({
                  color:'red',
                  title:'Error',
                  message:'Failed to remove meme. Please check your internet connection!',
                  position:'bottomRight',
                  class:'izishow-login',
                })
              })
            }],
            ['<button>No, keep.</button>', (instance, toast)=>{
                instance.hide({}, toast, 'buttonName');
            }, true]
        ],
        onOpening: (instance, toast)=>{
          this.setState({
            instance: true
          })
        },
        onClosing: (instance, toast, closedBy)=>{
          this.setState({
            instance: false
          })
        }
      });
    } else {
      axios.post(ENV.REACT_APP_BACKEND+'/api/featureMeme?id='+meme.id + '&user=' + meme.user_id).then((response)=>{
        this.state.memes.map((el, i)=>{
          if (el.id === meme.id) {
            el.featured = 1;
          }
        })
        IziToast.show({
          title:'Featured!',
          message:'Check the featured page to see this meme at the top!',
          timeout:2000,
          color:'green',
          class:'izishow-login',
          theme:'light'
        })
      })
    }
    this.forceUpdate();
  }
  hoverHeadline(target) {
    let tl = new TimelineMax();
    tl.to(target, .2, {opacity:1});
  }
  leaveHeadline(target) {
    let tl = new TimelineMax();
    tl.to(target, .2, {opacity:.7});
  }
  render() {
    let {state, props} = this,
        details,
        memes = (
          <section className='collective-loading'>
            <div className='collective-loading-text'>
              loading memes
            </div>
            <div className='collective-loading-dots'>
              <img src={LoadingDot} className='collective-dot-1 collective-dots-el'/>
              <img src={LoadingDot} className='collective-dot-2 collective-dots-el'/>
              <img src={LoadingDot} className='collective-dot-3 collective-dots-el'/>
            </div>
          </section>
        ),
        loadMore;
        if (this.state.user) {
          details = (
            <section className={`profile-detail-section`}>
              <div style={{backgroundImage: state.user.cover_photo? `url('${state.user.cover_photo}')`:`url('https://img.ifcdn.com/user_covers/bcb604832ae943605c2e8e38ecdbdc6694c2662b_0.jpg?1389824103')`}} className={`profile-cover-picture`}/>
              <div className={`profile-bottom-container`}>
                <div style={{backgroundImage: state.user.profile_picture? `url('${state.user.profile_picture}')`:`url('https://ifunny.co/images/icons/profile.svg')`}} className={`profile-picture`}/>
                <h1 className={`profile-username-heading`}>
                  {state.user.username? state.user.username : 'unknown user...'}
                </h1>
                <div className={`profile-subs-container`}>
                  <h2 className={`profile-subscribers-heading`}>
                    {state.user.subscribers}
                  </h2>
                  <h3 className={`profile-subscribers-text-heading`}>
                    subscribers
                  </h3>
                  <h3 className={`profile-dot-heading`}>
                    •
                  </h3>
                  <h2 className={`profile-subscriptions-heading`}>
                    {state.user.subscriptions}
                  </h2>
                  <h3 className={`profile-subscriptions-text-heading`}>
                    subscriptions
                  </h3>
                </div>
                <h3 style={state.user&&props.user&&state.user.id===props.user.id?{cursor:'pointer'}:{cursor:'default'}} onClick={()=>{state.user&&props.user&&state.user.id===props.user.id?this.editHeadline():null}} onMouseEnter={()=>{state.user&&props.user&&state.user.id===props.user.id?this.hoverHeadline('.profile-headline-edit'):null}} onMouseLeave={()=>{state.user&&props.user&&state.user.id===props.user.id?this.leaveHeadline('.profile-headline-edit'):null}} className={`profile-headline-heading`}>
                  {state.user && state.user.headline?
                  (<div className={`profile-headline-edit`}>
                    {state.user.headline}
                  </div>):state.user&&props.user&&!state.user.headline&&state.user.id===props.user.id?
                  (<div className={`profile-headline-edit`}>
                    [ add headline ]
                  </div>):null}
                </h3>
                {state.user.featured > 0?(<div className={`profile-featured-container`}>
                  <h2 className={`profile-star-heading`}/>
                  <h2 className={`profile-featured-heading`}>
                    {state.user.featured}
                  </h2>
                  <h2 className={`profile-featured-text-heading`}>
                    featured
                  </h2>
                </div>):null}
              </div>
            </section>
          )
        }
        if (state.memes &&state.loadMore%10 === 0 && state.memes.length > 0 && state.memeStatus && state.limit < state.memes.length) {
          loadMore = (
            <div onClick={()=>{this.setState({limit: this.state.limit+10})}} onMouseEnter={()=>{this.enterLoadMore()}} onMouseLeave={()=>{this.leaveLoadMore()}} className='collective-load-more'>
              <div className='collective-load-more-title'>
                Load More
              </div>
                <img src={DownArrow} className='collective-load-more-arrow-1'/>
                <img src={DownArrow} className='collective-load-more-arrow-2'/>
                <img src={DownArrow} className='collective-load-more-arrow-3'/>
            </div>
          )
        } else {
          loadMore = null;
        }
        if (!state.memeStatus) {
          memes = (
            <div className='collective-memes-failed'>
              <div className='collective-memes-failed-top'>
                memes failed to load
              </div>
              <div className='collective-memes-failed-bottom'>
                :(
              </div>
            </div>
          )
        } else if (state.memes) {
          memes = (
            state.memes.map((el, i)=>{
              if (i < state.limit) {
                return (
                  <main className='meme-details-meme-els' key={i}>
                  <Link to={`/app/memes/${el.id}`} className='meme-details-image-section'>
                    <img src={el.picture} style={{width:'100%', height:'auto', borderTopRightRadius:'10px', borderTopLeftRadius:'10px'}} className='meme-details-image-section-image'/>
                  </Link>
                  <section className='meme-details-caption-section'>
                    {el.caption?(
                      <div className='meme-details-caption'>
                        {el.caption}
                      </div>
                      ) : null
                    }
                  </section>
                  <section className='meme-details-meme-details-section'>
                    <section className='meme-details-details-section'>
                      <div style={el.tags?null:{display:'flex', alignItems:'space-around'}} className={'meme-details-details-left-side'}>
                        <div style={el.tags?null:{width:'auto'}} className='meme-details-details-top-container'>
                        {el.tags && el.tags.length>0? (
                          <div className='meme-details-details-tags'>
                            {el.tags.map((el, index)=>{
                              return (
                                <Link to={`/app/tags/${el.tag_text}`} key={index} onMouseLeave={()=>{this.leaveTag(i, index)}} onMouseEnter={()=>{this.hoverTag(i, index)}} className={`meme-details-details-tag-el meme-tag-${i}-${index}`}> 
                                  #{el.tag_text}
                                </Link>
                              )
                            })}
                          </div>
                        ): null}
                          <div className='meme-details-details-right-side'>
                            <div onClick={()=>{this.likeMeme(el.id)}} style={state.likeArr && state.likeArr.includes(el.id)?{opacity:1}:{opacity:.5}} className={`meme-details-details-likes meme-details-details-likes-${i}`} onMouseLeave={()=>{this.leaveStats('likes', i, el.id)}} onMouseEnter={()=>{this.hoverStats('likes', i, el.id)}}>
                              {state.likeArr && state.likeArr.includes(el.id)? (<div className='meme-details-likes-image'/>):(<img src='https://ifunny.co/images/icons/smile-small.svg' style={{height:'22px', width:'22px', minHeight:'22px', minWidth:'22px'}}/>)}
                              <p style={state.likeArr && state.likeArr.includes(el.id)?{color:'#fc0'}:{color:'white'}} className='meme-details-details-likes-count'>{el.likes}</p>
                            </div>
                            <Link to={`/app/memes/${el.id}`} className={`meme-details-details-comments meme-details-details-comments-${i}`} onMouseLeave={()=>{this.leaveStats('comments', i)}} onMouseEnter={()=>{this.hoverStats('comments', i)}}>
                              <img className='meme-details-details-comments-image' src='https://ifunny.co/images/icons/comments.svg' style={{height:'22px', width:'22px'}}/>
                              <p className='meme-details-details-comment-count'>{el.comments}</p>
                            </Link>
                          </div>
                        </div>
                        <div className='meme-details-details-bottom-container'>  
                          <div style={el.tags?null:{marginTop:'20px'}} className='meme-details-details-social-media'>
                            <div style={{opacity:1}} onMouseEnter={(e)=>{this.hoverSocialMedia('fb', i)}} onMouseLeave={(e)=>{this.leaveSocialMedia('fb', i)}} className={`meme-details-fb-hover meme-details-fb-${i}-hover`}>
                              <FacebookShareButton 
                                style={{height:'36px', width:'36px', borderRadius:'50%', outline:'none', cursor:'pointer'}}
                                url={ENV.REACT_APP_FRONTEND+`/app/memes/${el.id}`} 
                                quote={el.caption} 
                                windowWidth={800}
                                windowHeight={530}
                                hashtag={'#iFunny'}>      
                                <FacebookIcon size={36} round/>
                              </FacebookShareButton>
                            </div>
                            <div style={{opacity:1}} onMouseEnter={(e)=>{this.hoverSocialMedia('tt', i)}} onMouseLeave={(e)=>{this.leaveSocialMedia('tt', i)}} className={`meme-details-tt-hover meme-details-tt-${i}-hover`}>
                              <TwitterShareButton 
                                style={{height:'36px', width:'36px', borderRadius:'50%', outline:'none', cursor:'pointer'}}
                                title={el.caption}
                                hashtags={el.tags? el.tags.map((el)=>{return el.tag_text}) : ['iFunny']}
                                windowWidth={800}
                                windowHeight={530}
                                url={ENV.REACT_APP_FRONTEND+`/app/memes/${el.id}`}
                                >   
                                <TwitterIcon size={36} round/>
                              </TwitterShareButton>
                            </div>
                            {props.user.user_type==='admin'?
                              (<div className={`meme-details-details-more meme-details-details-more-${i}`} onMouseLeave={(e)=>{this.leaveButton('more', i)}} onMouseEnter={(e)=>{this.hoverButton('more', i)}}>
                                <div onClick={()=>{this.featureMeme(el)}} className='meme-details-details-featured-image'/>
                              </div>):null}
                          </div>
                        </div>
                      </div>
                    </section>
                  </section>
                </main>
                )
              }
            })
          )
        }
    return (
      <main className='Profile'>
        {details}
        <section className={`profile-count-section`}>
          {state.memes? state.memes.length: 0} memes
        </section>
        {memes}
        {loadMore}
      </main>
    )
  }
}
function mapStateToProps(state) {
  return {
    user:state.sessionUser
  }
}
export default withRouter(connect(mapStateToProps)(Profile));
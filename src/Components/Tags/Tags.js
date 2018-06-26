import React, { Component } from 'react';
import axios from 'axios';
import { FacebookShareButton, FacebookIcon, TwitterShareButton, TwitterIcon } from 'react-share';
import { TimelineMax, Power2 } from 'gsap';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import LoadingDot from '../../Images/Icons/loading_dot.svg';
import DownArrow from '../../Images/Icons/down_arrow.svg';
import IziToast from 'izitoast';
import './Tags.css';
const ENV = require('../../frontenv');
class Tags extends Component {
  constructor(props) {
    super(props);
    this.state = {
      memes:'',
      limit:10,
      loadMore:10,
      method:'',
      results:0,
      memeStatus:true
    };
  }

  componentDidMount() {
    let loadingtl = new TimelineMax({
      repeat:-1
    });
    loadingtl.staggerTo('.collective-dots-el', .3, {top:10, height:20, width:20}, .1)
    .staggerTo('.collective-dots-el', .3, {top:30, height:15, width:15}, .1, '-=.1');
    this.props.dispatch({
      type: 'MOUNT_COMP',
      val: 'tags'
    })
    axios.get(ENV.REACT_APP_BACKEND+'/api/getMemesByTag?tag='+this.props.match.params.tag+'&limit='+this.state.limit).then((response)=>{
      this.setState({
        memes:response.data,
        loadMore:response.data.length
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
        this.setState({
          memeStatus:false
        })
      }
    })
    let ltl = new TimelineMax();
    setTimeout(() => {
      this.likedStatus();
    }, 800);
    setTimeout(() => {
      ltl.to(window, 1, {scrollTo:0})
    }, 100);
    this.getResults();
  }
  likedStatus() {
    let likeArr = [];
    if (this.props.user) {
      axios.get(ENV.REACT_APP_BACKEND+'/api/checkLikes/'+this.props.user.id + '?offset='+this.state.limit).then((response)=>{
        if (response.data && this.state.memes) {
          this.state.memes.map((el, i)=>{
            response.data.map((resEl, resI)=>{
              if (el.id === resEl.meme_id) {
                likeArr.push(el.id);
              }
            })
          })
          this.setState({
            likeArr
          })
        }
      })
    }
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
    axios.get(ENV.REACT_APP_BACKEND+'/api/getMemesByTag?tag='+this.props.match.params.tag+'&limit='+this.state.limit + 10).then((response)=>{
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
    this.getResults();
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

  componentWillReceiveProps(props) {
  }
  componentWillUpdate(prevProps, prevState) {

  }
  componentDidUpdate() {
    if (this.state.method !== this.props.match.params.tag) {
      axios.get(ENV.REACT_APP_BACKEND+'/api/getMemesByTag?tag='+this.props.match.params.tag+'&limit='+this.state.limit).then((response)=>{
        this.setState({
          memes:response.data,
          loadMore:response.data.length,
          method:this.props.match.params.tag
        })
        this.getResults();
        setTimeout(() => {
          this.likedStatus();
        }, 800);
        let tl = new TimelineMax();
        tl.to(window, 0, {scrollTo:0});
        let itl = new TimelineMax();
        itl.to('.collective-load-more-arrow-1', 0, {height: '0px', width: '0px', top: '70px', ease:Power2.easeOut})
          .to('.collective-load-more-arrow-2', 0, {top:'70px', ease:Power2.easeOut})
          .to('.collective-load-more-arrow-3', 0, {top:'110px', height: '100px', width: '100px', ease:Power2.easeOut})
        let ctl = new TimelineMax({
          repeat: -1
        });
        ctl.to('.collective-load-more-arrow-1', .5, {height: '100px', width: '100px', top: '70px', ease:Power2.easeOut})
        .to('.collective-load-more-arrow-2', .5, {top:'110px', ease:Power2.easeOut}, '-=.5')
        .to('.collective-load-more-arrow-3', .5, {top:'190px', height: '0px', width: '0px', ease:Power2.easeOut}, '-=.5')    
      });
    }
  }
  getResults() {
    axios.get(ENV.REACT_APP_BACKEND+'/api/getResults?tag='+this.props.match.params.tag).then((response)=>{
      this.setState({
        results:response.data[0].count >= 999949 ? (response.data[0].count/1000000).toFixed(2) + 'M results' : response.data[0].count >= 1000 ? (response.data[0].count/1000).toFixed(2) + 'K results' : response.data[0].count !=1? response.data[0].count + ' results' : response.data[0].count + ' result'
      })
    })
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
  render() {
    let state = this.state,
        props = this.props,
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
    if (state.loadMore%10 === 0 && state.memes.length>0 && state.memeStatus) {
      loadMore = (
        <div onClick={()=>{this.loadMore()}} onMouseEnter={()=>{this.enterLoadMore()}} onMouseLeave={()=>{this.leaveLoadMore()}} className='collective-load-more'>
          <div className='collective-load-more-title'>
            Load More
          </div>
            <img src={DownArrow} className='collective-load-more-arrow-1'/>
            <img src={DownArrow} className='collective-load-more-arrow-2'/>
            <img src={DownArrow} className='collective-load-more-arrow-3'/>
        </div>
      )
    } else {
      loadMore = (
        null
      )
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
                  <div style={el.tag_arr?null:{display:'flex', alignItems:'space-around'}} className={'meme-details-details-left-side'}>
                    <div style={el.tag_arr?null:{width:'auto'}} className='meme-details-details-top-container'>
                    {el.tag_arr && el.tag_arr.length>0? (
                      <div className='meme-details-details-tags'>
                        {el.tag_arr.map((el, index)=>{
                          return (
                            <Link to={`/app/tags/${el}`} key={index} onMouseLeave={()=>{this.leaveTag(i, index)}} onMouseEnter={()=>{this.hoverTag(i, index)}} className={`meme-details-details-tag-el meme-tag-${i}-${index}`}> 
                              #{el}
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
                      <div style={el.tag_arr?null:{marginTop:'20px'}} className='meme-details-details-social-media'>
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
                            hashtags={el.tag_arr? el.tag_arr.map((el)=>{return el}) : ['iFunny']}
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
        })
      )
    }
    return (
      <main className='Tags'>
        <section className='tags-top-section'>
          <div className='tags-top-section-title'>
            #{props.match.params.tag}
          </div>
          <div className='tags-top-section-results'>
            {state.results} found
          </div>
        </section>
        <section className='tags-memes-section'>
          {memes}
          {loadMore}
        </section>
      </main>
    )
  }
}
function mapStateToProps(state) {
  return {
    user:state.sessionUser
  }
}
export default connect(mapStateToProps)(Tags);
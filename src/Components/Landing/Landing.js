import React, { Component } from 'react';
import { Switch, Route, Link, Redirect } from 'react-router-dom';
import { TimelineMax } from 'gsap';
import { StickyContainer, Sticky } from 'react-sticky-modified';
import { connect } from 'react-redux'
import Privacy from '../Privacy/Privacy';
import Terms from '../Terms/Terms';
import Featured from '../Featured/Featured';
import About from '../About/About';
import Search from '../Search/Search';
import Tags from '../Tags/Tags';
import MemeDetails from '../MemeDetails/MemeDetails';
import Collective from '../Collective/Collective';
import Profile from '../Profile/Profile';
import axios from 'axios';
import moment from 'moment';
import LoadingDot from '../../Images/Icons/loading_dot.svg';
import ENV from '../../frontenv';
import './Landing.css';


class Landing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      url:'',
      tags:[],
      memeStatus:true,
      mountedComp:''
    };
  }

  componentWillMount() {
    let date = new Date();
    date = moment(date).subtract(30, 'days').utc().format('MM-DD-YYYY')
    axios.get(ENV.REACT_APP_BACKEND+`/api/getTrendingTags?date=${date}`).then((response)=>{
      this.setState({
        tags:response.data,
      })
      if (response.data.length < 14) {
        date = moment(date).subtract(90, 'days').utc().format('MM-DD-YYYY')
        axios.get(ENV.REACT_APP_BACKEND+`/api/getTrendingTags?date=${date}`).then((response)=>{
          this.setState({
            tags:response.data,
          })
          if (response.data.length < 14) {
            date = moment(date).subtract(99999, 'days').utc().format('MM-DD-YYYY')
            axios.get(ENV.REACT_APP_BACKEND+`/api/getTrendingTags?date=${date}`).then((response)=>{
              this.setState({
                tags:response.data,
              })
            }).catch((err)=>{
              if (err) {
                this.setState({
                  memeStatus:false
                })
              }
            })
          }
        }).catch((err)=>{
          if (err) {
            this.setState({
              memeStatus:false
            })
          }
        })
      }
    }).catch((err)=>{
      if (err) {
        this.setState({
          memeStatus:false
        })
      }
    })
    let urlArr = [
      'https://ifunny.co/images/banner.en-1.png',
      'https://ifunny.co/images/banner.en-2.png',
      'https://ifunny.co/images/banner.en-3.png', 
      'https://ifunny.co/images/banner.en-4.png', 
      'https://ifunny.co/images/banner.en-5.png', 
      'https://ifunny.co/images/banner.en-6.png',
      'https://ifunny.co/images/banner.en-7.png', 
      'https://ifunny.co/images/banner.en-8.png', 
      'https://ifunny.co/images/banner.en-9.png', 
      'https://ifunny.co/images/banner.en-10.png',
      'https://ifunny.co/images/banner.en-11.png',
      'https://ifunny.co/images/banner.en-12.png', 
      'https://ifunny.co/images/banner.en-13.png', 
      'https://ifunny.co/images/banner.en-14.png', 
      'https://ifunny.co/images/banner.en-15.png'
    ]
    let rand = Math.floor(Math.random() * (14 - 0 + 1));
    this.setState({
      url:urlArr[rand]
    })
  }
  componentDidMount() {
  }

  componentWillReceiveProps(props) {
    let tl = new TimelineMax();
    if (this.state.mountedComp !== props.comp) {
      tl.to(`.landing-sticky-selector`, .5, {color:'hsla(0,0%,100%,.3)'});
    }
    tl.to(`.landing-sticky-section-${props.comp}`, .5, {color:'#ffcc00', opacity:1}, this.state.mountedComp!==props.comp?'-=.5':'-=0');
    this.setState({
      mountedComp:props.comp
    })
  }
  hoverCam() {
    let tl = new TimelineMax();
    tl.to(`.landing-right-side-cam`, .2, {opacity:.7});
  }
  leaveCam() {
    let tl = new TimelineMax();
    tl.to(`.landing-right-side-cam`, .2, {opacity:1});
  }
  hoverSocialMedia(target) {
    let tl = new TimelineMax();
    tl.to(`.landing-sticky-section-${target}`, .2, {opacity:.7});
  }
  leaveSocialMedia(target) {
    let tl = new TimelineMax();
    tl.to(`.landing-sticky-section-${target}`, .2, {opacity:1});
  }
  hoverChef() {
    let tl = new TimelineMax();
    tl.to('.landing-sticky-section-chef', .2, {opacity:.8});
  }
  leaveChef() {
    let tl = new TimelineMax();
    tl.to('.landing-sticky-section-chef', .2, {opacity:.3});
  }
  hoverTab(target) {
    if (this.props.comp!==target) {
      let tl = new TimelineMax();
      tl.to(`.landing-sticky-section-${target}`, .2, {opacity:.6, color: 'white'});
    }
  }
  leaveTab(target) {
    if (this.props.comp!==target) {
      let tl = new TimelineMax();
      tl.to(`.landing-sticky-section-${target}`, .2, {opacity:'.3', color:'white'});
    }
  }
  hoverTag(num) {
    let tl = new TimelineMax();
    tl.to(`.meme-trending-tag-${num}`, .2, {borderColor:'rgba(255,204,0,.7)'})
  }
  leaveTag(num) {
    let tl = new TimelineMax();
    tl.to(`.meme-trending-tag-${num}`, .2, {borderColor:'rgba(255,204,0,.3)'})
  }
  hoverLink(target) {
    let tl = new TimelineMax();
    tl.to(`.landing-right-section-app-bottom-${target}`, .3, {backgroundColor:'black'})
      .to(`.landing-${target==='left'?'app-store':target==='middle'?'google-play':'amazon'}-image`, .3, {opacity:1}, '-=.3')
      .to(`.landing-${target==='left'?'app-store':target==='middle'?'google-play':'amazon'}-text`, .3, {opacity:1}, '-=.3');
  }
  leaveLink(target) {
    let tl = new TimelineMax();
    tl.to(`.landing-right-section-app-bottom-${target}`, .3, {backgroundColor:'#080d11'})
      .to(`.landing-${target==='left'?'app-store':target==='middle'?'google-play':'amazon'}-image`, .3, {opacity:.5}, '-=.3')
      .to(`.landing-${target==='left'?'app-store':target==='middle'?'google-play':'amazon'}-text`, .3, {opacity:.5}, '-=.3');
  }
  
  render() {
    let trendingTags = (
      <section className='landing-loading'>
        <div className='landing-loading-text'>
          loading Tags...
        </div>
      </section>
    ),
      state = this.state;
    if (!state.memeStatus) {
      trendingTags = (
        <div className='landing-loading'>
          <div className='landing-loading-text'>
            Tags failed to load
          </div>
          <div className='landing-loading-bottom'>
            :(
          </div>
        </div>
      )
    } else if (state.tags.length>0 && state.memeStatus) {
      trendingTags = state.tags.map((el, i)=>{
        return (
          <Link to={`/app/tags/${el.tag_text}`} key={i} onMouseLeave={()=>{this.leaveTag(i)}} onMouseEnter={()=>{this.hoverTag(i)}} className={`landing-tag-el meme-trending-tag-${i}`}> 
            #{el.tag_text}
          </Link>
        )
      }) 
    }
    return (
      <StickyContainer className='Landing'>
        <div className='landing-main-container'>
          <section className='landing-left-section'>
            <Switch>
              <Route exact path={'/app'} component={Featured}/>
              <Route path={'/app/privacy'} component={Privacy}/>
              <Route path={'/app/collective'} component={Collective}/>
              <Route path={'/app/terms'} component={Terms}/>
              <Route path={'/app/about'} component={About}/>
              <Route path={'/app/search'} component={Search}/>
              <Route path={'/app/tags/:tag'} component={Tags}/>
              <Route path={'/app/memes/:id'} component={MemeDetails}/>
              <Route path={'/app/profile/:id'} component={Profile}/>
              <Redirect from='*' to='/404'/>
            </Switch>
          </section>
          <section className='landing-right-section'>
          <h1 className='landing-right-section-title'>
            daily dose of fun
          </h1> 
          <div className='landing-right-section-app-container'>
            <div className='landing-right-section-app-top'>
              <div style={{background:`url(${this.state.url})`, backgroundSize:'cover', height:'160px', width: '300px'}} className='landing-right-section-app-top-image'/>
            </div>
            <div className='landing-right-section-app-bottom'>
              <a href={'https://itunes.apple.com/US/app/id429610587?mt=8'} target='_blank' onMouseLeave={(e)=>{this.leaveLink('left')}} onMouseEnter={(e)=>{this.hoverLink('left')}} className='landing-right-section-app-bottom-left'>
                <div className='landing-app-store-image'/>
                <h1 className='landing-app-store-text'>App Store</h1>
              </a>
              <a href={'https://play.google.com/store/apps/details?id=mobi.ifunny&referrer=af_tranid%3Dk2ZChZCLF3kQeeAhTrHdcA%26pid%3Difunny_co%26c%3Dsidebar_daily_googleplay'} target='_blank' onMouseLeave={(e)=>{this.leaveLink('middle')}} onMouseEnter={(e)=>{this.hoverLink('middle')}} className='landing-right-section-app-bottom-middle'>
                <div className='landing-google-play-image'/>
                <h1 className='landing-google-play-text'>Google Play</h1>
              </a>
              <a href={'https://www.amazon.com/Okrujnost-iFunny/dp/B00DY76ZC8'} target='_blank' onMouseLeave={(e)=>{this.leaveLink('right')}} onMouseEnter={(e)=>{this.hoverLink('right')}} className='landing-right-section-app-bottom-right'>
                <div className='landing-amazon-image'/>
                <h1 className='landing-amazon-text'>Amazon</h1>
              </a>
            </div>
          </div>
          <div onMouseEnter={()=>{this.hoverCam()}} onMouseLeave={()=>{this.leaveCam()}} className='landing-right-side-cam'/>
          <Sticky className='landing-right-side-sticky' topOffset={320} stickyStyle={{top:'80px', marginLeft:'0px'}}>
            <section className='landing-sticky-section'>
              <h1 className='landing-sticky-section-tags-title'>
                trending tags
              </h1>
              <div className='landing-sticky-section-tags'>
                {trendingTags}
              </div>
              <div className='landing-sticky-section-line'/>
              <h1 className='landing-sticky-section-follow-title'>
                follow iFunny
              </h1>
              <div className='landing-sticky-section-follow-buttons'>
                <div onMouseEnter={()=>{this.hoverSocialMedia('facebook')}} onMouseLeave={()=>{this.leaveSocialMedia('facebook')}} title="Like iFunny's Page on Facebook!" className='landing-sticky-section-facebook'/>
                <div onMouseEnter={()=>{this.hoverSocialMedia('twitter')}} onMouseLeave={()=>{this.leaveSocialMedia('twitter')}} title="Follow @iFunny on Twitter!" className='landing-sticky-section-twitter'/>
                <div onMouseEnter={()=>{this.hoverSocialMedia('instagram')}} onMouseLeave={()=>{this.leaveSocialMedia('instagram')}} title="Follow @iFunny on Instagram!"className='landing-sticky-section-instagram'/>
              </div>
              <a href={'https://twitter.com/iFunnyChef'} target='_blank' onMouseEnter={()=>{this.hoverChef()}} onMouseLeave={()=>{this.leaveChef()}} className='landing-sticky-section-chef'>
                <div className='landing-sticky-section-chef-logo'/>
                <h1 className='landing-sticky-section-chef-title'>
                  iFunnyChef
                </h1>
              </a>
              <div className='landing-sticky-section-links'>
                <Link onMouseEnter={()=>{this.hoverTab('privacy')}} onMouseLeave={()=>{this.leaveTab('privacy')}} to='/app/privacy' className='landing-sticky-section-privacy landing-sticky-selector'>
                  privacy
                </Link>
                <h1 className='landing-sticky-section-dot'>
                  •
                </h1>
                <Link onMouseEnter={()=>{this.hoverTab('terms')}} onMouseLeave={()=>{this.leaveTab('terms')}} to='/app/terms' className='landing-sticky-section-terms landing-sticky-selector'>
                  terms
                </Link>
              </div>
              <h1 className='landing-sticky-section-copyright'>
                © iFunny 2018
              </h1>
              <a href={'https://classyfd.github.io/Portfolio'} onMouseEnter={()=>{this.hoverTab('cloned')}} onMouseLeave={()=>{this.leaveTab('cloned')}} target='_blank' className='landing-sticky-section-cloned landing-sticky-section-cloned'>
                Cloned by: Fernando De la Vega
              </a>

            </section>
          </Sticky>
          </section>
        </div>
      </StickyContainer>
    )
  }
}
function mapStateToProps(state) {
  return {
    comp: state.mountedComp
  }
}
export default connect(mapStateToProps)(Landing);
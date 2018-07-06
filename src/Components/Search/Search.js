import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';
import moment from 'moment';
import './Search.css';
import LoadingDot from '../../Images/Icons/loading_dot.svg';
import { TimelineMax } from 'gsap';
import ENV from '../../frontenv';

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      options:[],
      inputVal:'',
      inputResults:'',
      user:'popular',
      focus:false,
      tab:'tags',
      popularTags:[],
      popularStatus:true,
    };
  }

  componentDidMount() {
    let loadingtl = new TimelineMax({
      repeat:-1
    });
    this.props.dispatch({
      type: 'MOUNT_COMP',
      val: 'search'
    })
    loadingtl.staggerTo('.search-dots-el', .3, {top:10, height:20, width:20}, .1)
    .staggerTo('.search-dots-el', .3, {top:30, height:15, width:15}, .1, '-=.1');
    if (this.props.user) {
      this.setState({
        user:this.props.user.id
      })
    }
    let tl = new TimelineMax();
    tl.to(window, .5, {scrollTo:0});
    let date = new Date;
    date = moment(date).subtract(30, 'days').utc().format('MM-DD-YYYY')
    axios.get(ENV.REACT_APP_BACKEND+`/api/getMainSearches?date=${date}`).then((response)=>{
      this.setState({
        popularTags:response.data
      })
      if (response.data.length < 14) {
        date = moment(date).subtract(90, 'days').utc().format('MM-DD-YYYY')
        axios.get(ENV.REACT_APP_BACKEND+`/api/getMainSearches?date=${date}`).then((response)=>{
          this.setState({
            popularTags:response.data
          })
          if (response.data.length < 14) {
            date = moment(date).subtract(99999, 'days').utc().format('MM-DD-YYYY')
            axios.get(ENV.REACT_APP_BACKEND+`/api/getMainSearches?date=${date}`).then((response)=>{
              this.setState({
                popularTags:response.data
              })
            }).catch((err)=>{
              console.log(err);
              this.setState({
                popularStatus:false
              })
            })
          }
        }).catch((err)=>{
          console.log(err);
          this.setState({
            popularStatus:false
          })
        })
      }
    }).catch((err)=>{
      console.log(err);
      this.setState({
        popularStatus:false
      })
    })
    let ltl = new TimelineMax();
    ltl.to(window, .5, {scrollTo:0});
  }

  componentWillReceiveProps(props) {
  }
  postSearch(text, type) {
    let date = new Date;
    date = moment(date).utc()
    if (this.state.user!=='popular') {
      axios.post(ENV.REACT_APP_BACKEND+'/api/postRecentSearch', {text, user:this.state.user, type, date}).then((response)=>{
        
      })
    }
  }
  handleInput(val) {
    this.setState({
      inputVal:val
    })
    let user = this.state.user;
    if (this.state.tab==='tags') {
      val.length > 0 ?
      axios.get(ENV.REACT_APP_BACKEND+`/api/getSearchResults?tag=${val}`).then((response)=>{      
        this.setState({
          searchResults: response.data,
        })
      }) :
      axios.get(ENV.REACT_APP_BACKEND+`/api/getRecentSearches?user=${user}`).then((response)=>{    
        this.setState({
          searchResults: response.data,
        })
      })
    } else {
      val.length > 0 ?
      axios.get(ENV.REACT_APP_BACKEND+`/api/getUserSearchResults?user=${val}`).then((response)=>{      
        this.setState({
          searchResults: response.data,
        })
      }) :
      axios.get(ENV.REACT_APP_BACKEND+`/api/getRecentSearches?user=${user}`).then((response)=>{
        this.setState({
          searchResults: response.data,
        })
      })    
    }
  }
  focusContainer() {
    this.setState({
      focus:true
    })
    let tl = new TimelineMax();
    setTimeout(() => {
      tl.to(`.search-options-${this.state.tab}`, .2, {backgroundColor:'hsla(0,0%,100%,.12)', color:'white'}, '-=.2');
    }, 10);
    let user = 'popular';
    if (this.props.user && this.state.inputVal.length < 1) {
      user = this.props.user.id;
      axios.get(ENV.REACT_APP_BACKEND+`/api/getRecentSearches?user=${user}`).then((response)=>{
        response.data.map((el, i)=>{
          if (el.type===1 && !el.user_id) {
            axios.post(ENV.REACT_APP_BACKEND+'/api/updateOwnerId', {user:el.tag_text}).then((response)=>{
              el.user_id = response.data.id
            })
          }
        })       
        this.setState({
          searchResults: response.data,
        })
      })
    } else if (!this.props.user && this.state.inputVal < 1) {
      axios.get(ENV.REACT_APP_BACKEND+`/api/getRecentSearches?user=${user}`).then((response)=>{       
        this.setState({
          searchResults: response.data,
        })
      })
    }
  }
  blurContainer() {
    if (window.innerHeight <= 812 && this.state.inputVal) {
    } else {
      this.setState({
        focus:false
      })
    }
  }
  selectOption(option) {
    let tl = new TimelineMax();
    tl.to(`.search-options-selector`, .2, {backgroundColor:'transparent', color:'hsla(0%, 0%, 100%, .6)'})
      .to(`.search-options-${option}`, .2, {backgroundColor:'hsla(0,0%,100%,.12)', color:'white'}, '-=.2');
    if (option==='ifunnyers' && this.state.inputVal.length > 0) {
      axios.get(ENV.REACT_APP_BACKEND+`/api/getUserSearchResults?user=${this.state.inputVal}`).then((response)=>{        
        this.setState({
          searchResults: response.data,
        })
      })
    } else if (option==='tags' && this.state.inputVal.length > 0) {
      axios.get(ENV.REACT_APP_BACKEND+`/api/getSearchResults?tag=${this.state.inputVal}`).then((response)=>{        
        this.setState({
          searchResults: response.data,
        })
      })
    }
  }
  resultMouseEnter(num) {
    let tl = new TimelineMax();
    tl.to(`.search-result-el-selector`, .2, {backgroundColor:'#171a1e'})
      .to(`.search-result-el-${num}`, .2, {backgroundColor:'#080d11'}, '-=.2')
  }
  resultMouseLeave(num) {
    let tl = new TimelineMax();
    tl.to(`.search-result-el-${num}`, .2, {backgroundColor:'#171a1e'})
  }
  popularTagHover(num) {
    let tl = new TimelineMax();
    tl.to(`.popular-tags-selector`, .2, {opacity:1})
      .to(`.popular-tags-${num}`, .2, {opacity:.6}, '-=.2')
  }
  popularTagLeave(num) {
    let tl = new TimelineMax();
      tl.to(`.popular-tags-${num}`, .2, {opacity:1})
  }
  enterClear() {
    let tl = new TimelineMax();
    tl.to('.search-text-clear', .2, {color:'hsla(0%, 0%, 100%, .6)'})
  }
  leaveClear() {
    let tl = new TimelineMax();
    tl.to('.search-text-clear', .2, {color:'hsla(0%, 0%, 100%, .3)'})
  }
  clearResults() {
    axios.delete(ENV.REACT_APP_BACKEND+`/api/deleteRecentSearches?user=${this.props.user.id}`).then((response)=>{
      this.setState({
        searchResults:[]
      })
    })
  }
  render() {
    let state = this.state,
        props = this.props,
        options = state.inputResults,
        optionsInFocus,
        popularTags = (
          <section className='search-loading'>
            <div className='search-loading-text'>
              loading popular tags
            </div>
            <div className='search-loading-dots'>
              <img src={LoadingDot} className='search-dot-1 search-dots-el'/>
              <img src={LoadingDot} className='search-dot-2 search-dots-el'/>
              <img src={LoadingDot} className='search-dot-3 search-dots-el'/>
            </div>
          </section>
        );
    if (state.searchResults && state.focus && state.searchResults[0] && state.searchResults[0].tag_text) {
      options = state.searchResults.map((el, i)=>{
        return (
          <Link onMouseEnter={()=>{this.resultMouseEnter(i)}} onMouseLeave={()=>{this.resultMouseLeave(i)}} onMouseDown={(e)=>{e.preventDefault()}} onClick={()=>{state.user!=='popular' && !el.date?this.postSearch(el.tag_text, 2):null}} to={`/app/${el.type && el.type===1?'profile':'tags'}/${el.type && el.type===1?el.user_id:el.tag_text}`} key={i} className={`search-result-el search-result-el-${i} search-result-el-selector`}>
            <div className='search-result-el-tag-left-container'>
              <div style={{backgroundImage:`url(${el.type && el.type===1?'https://ifunny.co/images/icons/user.svg':'https://ifunny.co/images/icons/hashtag.svg'})`}} className='search-result-el-tag-left-container-icon'/>
              <div className='search-result-el-tag-left-container-tag'>
                {el.tag_text}
              </div>
            </div>
            {state.user==='popular' || state.user!=='popular' && state.searchResults[0] && !state.searchResults[0].date?<div className='search-result-el-tag-number'>
              {el.count >= 999949 ? (el.count/1000000).toFixed(2) + 'M results' : el.count >= 1000 ? (el.count/1000).toFixed(2) + 'K results' : el.count !=1? el.count + ' results' : el.count + ' result'}
            </div>: null}
          </Link>
        )
      })
    } else if (state.searchResults && state.focus && state.tab==='ifunnyers' && state.searchResults[0] && state.searchResults[0].tag_text) {
      options = state.searchResults.map((el, i)=>{
        return (
          <Link onMouseEnter={()=>{this.resultMouseEnter(i)}} onMouseLeave={()=>{this.resultMouseLeave(i)}} onMouseDown={(e)=>{e.preventDefault()}} onClick={()=>{state.user!=='popular' && !el.date?this.postSearch(el.tag_text, 2):null}} to={`/app/${el.type && el.type===1?'profile':'tags'}/${el.type && el.type===1?el.user_id:el.tag_text}`} key={i} className={`search-result-el search-result-el-${i} search-result-el-selector`}>
            <div className='search-result-el-tag-left-container'>
              <div style={{backgroundImage:`url(${el.type && el.type===1?'https://ifunny.co/images/icons/user.svg':'https://ifunny.co/images/icons/hashtag.svg'})`}} className='search-result-el-tag-left-container-icon'/>
              <div className='search-result-el-tag-left-container-tag'>
                {el.tag_text}
              </div>
            </div>
            {state.user==='popular' || state.user!=='popular' && state.searchResults[0] && !state.searchResults[0].date?<div className='search-result-el-tag-number'>
              {el.count >= 999949 ? (el.count/1000000).toFixed(2) + 'M results' : el.count >= 1000 ? (el.count/1000).toFixed(2) + 'K results' : el.count !=1? el.count + ' results' : el.count + ' result'}
            </div>: null}
          </Link>
        )
      })
    } else if (state.searchResults && state.focus && state.tab==='ifunnyers' && state.inputVal.length > 0) {
      options = state.searchResults.map((el, i)=>{
        return (
          <Link onMouseEnter={()=>{this.resultMouseEnter(i)}} onClick={()=>{state.user!=='popular' && !el.date?this.postSearch(el.username, 1):null}} onMouseLeave={()=>{this.resultMouseLeave(i)}} onMouseDown={(e)=>{e.preventDefault()}} key={i} className={`search-result-el-users search-result-el-${i} search-result-el-selector`} to={`/app/profile/${el.id}`}>
            <div className='search-result-el-tag-left-container'>
              <div className='search-result-el-tag-left-container-picture-container'>
                <div style={{backgroundImage: `url(${el.profile_picture? el.profile_picture:'https://ifunny.co/images/icons/user.svg'})`, height:el.profile_picture? '32px':'16px', width:el.profile_picture? '32px':'16px'}} className='search-result-el-tag-left-container-picture'/>
              </div>
              <div className='search-result-el-tag-left-container-tag'>
                {el.username}
              </div>
            </div>
            <div className='search-result-el-tag-number'>
              {el.memes >= 999949 ? (el.memes/1000000).toFixed(2) + 'M works' : el.memes >= 1000 ? (el.memes/1000).toFixed(2) + 'K works' : el.memes !=1? el.memes + ' works' : el.memes + ' work'}
            </div>
          </Link>
        )
      })
    } 
    if (state.focus) {
      optionsInFocus = (
        <div onMouseDown={(e)=>{e.preventDefault()}} className='search-options-in-focus'>
          <div onClick={()=>{
            this.setState({
              tab:'tags'
            });
            this.selectOption('tags')
          }} className='search-options-tags search-options-selector'>
            tags
          </div>
          <div onClick={()=>{
            this.setState({
              tab:'ifunnyers'
            });
            this.selectOption('ifunnyers')
          }} className='search-options-ifunnyers search-options-selector'>
            iFunnyers
          </div>
        </div>
      )
    }
    if (!state.popularStatus && !state.focus) {
      popularTags = (
        <div className=''>
          <div className='landing-loading'>
          <div className='landing-loading-text'>
            Popular tags failed to load
          </div>
          <div className='landing-loading-bottom'>
            :(
          </div>
        </div>
        </div>
      )
    } else if (!state.focus && state.popularStatus && state.popularTags.length>0) {
      popularTags = (
        <section className='search-popular-tags-section'>
          {state.popularTags.map((el, i)=>{
            return (
              <Link key={i} onMouseLeave={()=>{this.popularTagLeave(i)}} onMouseEnter={()=>{this.popularTagHover(i)}} to={`/app/tags/${el.tag_text}`} style={{backgroundImage: `linear-gradient(rgba(0,0,0,.5),rgba(0,0,0,.5)), url(${el.pictures[0]})`, backgroundSize:'cover', backgroundRepeat:'none', backgroundPosition:'center center'}} className={`search-popular-tags-el popular-tags-selector popular-tags-${i}`}>
                <div className='search-popular-tags-text'>
                  #{el.tag_text}
                </div>
              </Link>
            )
          })}
        </section>
      )
    } else if (state.focus) {
      popularTags = (
        null
      )
    }
    return (
      <main className='Search'>
        <section className='search-top-section'>
          <div onFocus={()=>{this.focusContainer()}} onBlur={()=>{this.blurContainer()}} className='search-focus-container'>
            <input onKeyUp={(e)=>{this.handleInput(e.target.value)}} className='search-main-input' placeholder='search' defaultValue=''>
            </input>
            {optionsInFocus}
            {this.state.inputVal.length < 1 && this.state.user!=='popular' && this.state.focus?(
              <div className='search-text-container'>
                <div className='search-text-title'>
                  recent searches
                </div>
                <div onMouseDown={(e)=>{e.preventDefault()}} onClick={()=>{this.clearResults()}} onMouseEnter={()=>{this.enterClear()}} onMouseLeave={()=>{this.leaveClear()}} className='search-text-clear'>
                  clear
                </div>
              </div>
            ):this.state.inputVal.length < 1 && this.state.user==='popular' && this.state.focus?(
              <div className='search-text-title'>
                popular tags
              </div>
            ): <div className='search-text-container'/>}
          </div>
          {options}
        </section>
        <section className='search-bottom-section'>
          {popularTags}
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
export default connect(mapStateToProps)(Search);